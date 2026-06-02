#!/usr/bin/env python3
"""Hand-redact docs screenshots in CleanShot X, bridging webp <-> png.

CleanShot's `open-annotate` only accepts PNG/JPEG, and docs images are webp. This
converts the webp to a temporary PNG, opens it in CleanShot's Annotate tool, waits
for you to blur and Save (press Cmd+S, which overwrites the opened PNG), then
converts the result back to webp in place — keeping a one-time `.bak` of the
original.

Modes:
  # one image, blocking until you save in CleanShot:
  uv run --with imageio-ffmpeg redact.py images/products-list.webp

  # background HTTP bridge for the browser userscript (Option-click an image):
  uv run --with imageio-ffmpeg redact.py --serve --root . --port 7777

  # manual fallback: apply an already-blurred png/webp onto a target webp:
  uv run --with imageio-ffmpeg redact.py --apply /path/blurred.png images/x.webp

Requires macOS (`open` + the cleanshot:// scheme) and ffmpeg, which is bundled when
you run via `uv run --with imageio-ffmpeg`.
"""
# /// script
# requires-python = ">=3.10"
# dependencies = ["imageio-ffmpeg"]
# ///
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import threading
import time
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

STAGING = Path("/tmp/jd-redact")
POLL_SECONDS = 1.0
TIMEOUT_SECONDS = 900  # 15 minutes to blur + save before a watch gives up


def ffmpeg_exe() -> str:
    found = shutil.which("ffmpeg")
    if found:
        return found
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("No ffmpeg. Re-run with: uv run --with imageio-ffmpeg redact.py ...")


def convert(src: Path, dst: Path) -> None:
    """webp<->png via ffmpeg. webp is written at quality 90 (matches the docs)."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    quality = ["-quality", "90"] if dst.suffix == ".webp" else ["-q:v", "2"]
    subprocess.run(
        [ffmpeg_exe(), "-y", "-i", str(src), *quality, str(dst), "-loglevel", "error"],
        check=True,
    )


def backup_once(webp: Path) -> None:
    """Preserve the earliest original — never clobber an existing .bak."""
    bak = webp.with_suffix(webp.suffix + ".bak")
    if not bak.exists():
        shutil.copy2(webp, bak)


def open_in_cleanshot(png: Path) -> None:
    url = "cleanshot://open-annotate?filepath=" + urllib.parse.quote(str(png))
    subprocess.run(["open", url], check=True)


def wait_and_apply(png: Path, webp: Path, start_mtime: float, log=print) -> bool:
    """Block until CleanShot overwrites `png`, then convert it back onto `webp`."""
    deadline = time.time() + TIMEOUT_SECONDS
    while time.time() < deadline:
        time.sleep(POLL_SECONDS)
        try:
            mtime = png.stat().st_mtime
        except FileNotFoundError:
            continue
        if mtime > start_mtime:
            # Let the file settle — CleanShot may still be writing it.
            size = png.stat().st_size
            time.sleep(POLL_SECONDS)
            if png.stat().st_size != size:
                continue
            convert(png, webp)
            log(f"✔ redacted -> {webp}  (restart `jamdesk dev` to preview)")
            return True
    log(f"⏱ timed out waiting for a CleanShot save of {png.name}. "
        f"Export your blurred image, then run: redact.py --apply <file> {webp}")
    return False


def redact_one(webp: Path, root: Path | None, block: bool, log=print) -> dict:
    webp = webp.resolve()
    if not webp.exists():
        raise FileNotFoundError(webp)
    backup_once(webp)
    png = STAGING / (webp.stem + ".png")
    convert(webp, png)
    start_mtime = png.stat().st_mtime
    open_in_cleanshot(png)
    log(f"→ opened {png} in CleanShot. Blur it, then press Cmd+S to save.")
    if block:
        ok = wait_and_apply(png, webp, start_mtime, log)
        return {"file": str(webp), "applied": ok}
    threading.Thread(
        target=wait_and_apply, args=(png, webp, start_mtime, log), daemon=True
    ).start()
    return {"file": str(webp), "watching": True}


def resolve_target(raw: str, root: Path) -> Path:
    """Map a browser path ('/images/x.webp' or '/_jd/images/x.webp') to disk,
    confined to <root>/images to block path traversal."""
    p = urllib.parse.unquote(raw)
    i = p.find("/images/")
    rel = p[i + 1:] if i >= 0 else p.lstrip("/")
    target = (root / rel).resolve()
    images_root = (root / "images").resolve()
    if not str(target).startswith(str(images_root) + os.sep):
        raise ValueError(f"refusing path outside {images_root}: {target}")
    return target


def make_handler(root: Path):
    class Handler(BaseHTTPRequestHandler):
        def _cors(self):
            self.send_header("Access-Control-Allow-Origin", "*")

        def do_OPTIONS(self):  # noqa: N802 (stdlib naming)
            self.send_response(204)
            self._cors()
            self.end_headers()

        def do_GET(self):  # noqa: N802
            parsed = urllib.parse.urlparse(self.path)
            if parsed.path != "/redact":
                self.send_response(404)
                self._cors()
                self.end_headers()
                return
            raw = (urllib.parse.parse_qs(parsed.query).get("path") or [""])[0]
            try:
                target = resolve_target(raw, root)
                if not target.exists():
                    raise FileNotFoundError(target)
                redact_one(target, root, block=False,
                           log=lambda m: print(m, flush=True))
                body = json.dumps({"ok": True, "file": str(target)}).encode()
                code = 200
            except Exception as exc:
                body = json.dumps({"ok": False, "error": str(exc)}).encode()
                code = 400
            self.send_response(code)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_):  # silence default per-request logging
            pass

    return Handler


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Hand-redact docs webp screenshots via CleanShot X."
    )
    ap.add_argument("image", nargs="?", type=Path, help="webp to redact (one-shot)")
    ap.add_argument("--serve", action="store_true",
                    help="run the HTTP bridge for the browser userscript")
    ap.add_argument("--root", type=Path, default=Path.cwd(),
                    help="docs project root (default: current dir)")
    ap.add_argument("--port", type=int, default=7777)
    ap.add_argument("--apply", nargs=2, metavar=("BLURRED", "TARGET_WEBP"),
                    help="convert an already-blurred image onto a target webp")
    args = ap.parse_args()

    if args.apply:
        src, dst = Path(args.apply[0]), Path(args.apply[1])
        backup_once(dst.resolve())
        convert(src, dst)
        print(f"✔ applied {src} -> {dst}")
        return
    if args.serve:
        STAGING.mkdir(parents=True, exist_ok=True)
        root = args.root.resolve()
        httpd = ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(root))
        print(f"redact bridge on http://127.0.0.1:{args.port}  root={root}")
        print("Option-click an image in the docs (userscript installed) to blur it.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nbye")
        return
    if args.image:
        redact_one(args.image, args.root.resolve(), block=True)
        return
    ap.print_help()


if __name__ == "__main__":
    main()
