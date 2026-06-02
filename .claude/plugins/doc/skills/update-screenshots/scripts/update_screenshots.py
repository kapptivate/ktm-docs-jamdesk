#!/usr/bin/env python3
"""Locate and re-grab specific screenshots from a (new) video using Gemini.

Given a JSON list of target screenshots — each with a path and a description of
what it should show — this asks Gemini where each one appears in the video, then
grabs N full-resolution candidate frames per target into a staging directory. The
calling skill picks the best candidate and overwrites the real image.

Run with uv:
    uv run update_screenshots.py VIDEO --targets-file targets.json
        [--candidates 2] [--gcs-bucket NAME] [--staging DIR] [--model ...] [--quiet]
"""
# /// script
# requires-python = ">=3.10"
# dependencies = ["google-genai", "pydantic", "imageio-ffmpeg"]
# ///
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

# Shared helpers live at the plugin root: doc/lib/gemini_video.py
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "lib"))
import gemini_video as gv  # noqa: E402

from google.genai import types  # noqa: E402
from pydantic import BaseModel  # noqa: E402


class ShotMatch(BaseModel):
    index: int
    timestamps: list[str]   # best-first, "MM:SS"


PROMPT_TEMPLATE = """You are locating specific UI screenshots inside a product video.

Below is a numbered list of screenshots, each described by what it must clearly show.
For EACH item, return its index and up to {n} timestamps (format MM:SS, best first)
where that exact screen or state is most clearly and cleanly visible. Prefer steady,
fully-rendered frames — avoid blurry frames, mid-transition moments, and animations.
Favour moments when the mouse cursor is at rest (resting on or just after clicking an
element) over moments mid-movement, since a moving cursor captures as a blurry smear.
If an item never appears in the video, return an empty timestamps list for it.

Screenshots:
{items}"""


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Re-grab specific screenshots from a video via the Gemini API."
    )
    ap.add_argument("video", type=Path, help="Path to the (new) video")
    ap.add_argument("--targets-file", type=Path, required=True,
                    help='JSON list: [{"path": "images/x.webp", "description": "what it shows"}]')
    ap.add_argument("--candidates", type=int, default=2,
                    help="Candidate frames to grab per screenshot (default: 2)")
    ap.add_argument("--staging", type=Path, default=Path("/tmp/screenshot-candidates"),
                    help="Where candidate frames + manifest.json are written")
    ap.add_argument("--model", default="gemini-3.1-pro-preview")
    ap.add_argument("--gcs-bucket", default=os.environ.get("GEMINI_VIDEO_BUCKET"),
                    help="GCS bucket for full-quality upload on Vertex (default: $GEMINI_VIDEO_BUCKET)")
    ap.add_argument("--max-upload-mb", type=float, default=18.0)
    ap.add_argument("--project")
    ap.add_argument("--location")
    ap.add_argument("--no-steady", action="store_true",
                    help="Grab exactly at the located timestamp instead of nudging to the "
                         "nearest still moment (the default avoids a blurry, mid-move cursor).")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    if not args.video.exists():
        sys.exit(f"Video not found: {args.video}")
    targets = json.loads(args.targets_file.read_text())
    if not targets:
        sys.exit("No targets in --targets-file.")
    ffmpeg = gv.ffmpeg_exe()
    args.staging.mkdir(parents=True, exist_ok=True)

    items = "\n".join(f"{i}. {t['description']}" for i, t in enumerate(targets))
    prompt = PROMPT_TEMPLATE.format(n=args.candidates, items=items)

    client, use_vertex = gv.make_client(args.project, args.location, args.quiet)
    part, gcs_uri = gv.video_part(
        client, use_vertex, args.video, None, args.max_upload_mb, args.gcs_bucket, args.quiet
    )
    try:
        gv.log(f"Locating {len(targets)} screenshot(s) with {args.model} ...", args.quiet)
        response = client.models.generate_content(
            model=args.model,
            contents=[part, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=list[ShotMatch],
            ),
        )
        matches = response.parsed
        if not matches:
            matches = [ShotMatch(**m) for m in json.loads(response.text or "[]")]
    except Exception as exc:
        sys.exit(f"Gemini lookup failed: {exc}")
    finally:
        gv.delete_gcs(gcs_uri, args.quiet)

    by_index = {m.index: m.timestamps for m in matches}
    manifest = []
    for i, target in enumerate(targets):
        wanted = (by_index.get(i) or [])[:args.candidates]
        stem = Path(target["path"]).stem
        candidates = []
        for ts in wanted:
            seconds = gv.parse_timestamp(ts)
            if seconds is None:
                continue
            out = args.staging / f"{stem}__{ts.replace(':', '-')}.webp"
            if gv.grab_frame(ffmpeg, args.video, seconds, out, args.quiet,
                             steady=not args.no_steady):
                candidates.append({"timestamp": ts, "file": str(out)})
        manifest.append({
            "path": target["path"],
            "description": target["description"],
            "candidates": candidates,
        })
        gv.log(f"  {target['path']}: {len(candidates)} candidate(s)", args.quiet)

    manifest_path = args.staging / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(str(manifest_path))


if __name__ == "__main__":
    main()
