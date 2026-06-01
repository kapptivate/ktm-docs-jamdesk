#!/usr/bin/env python3
"""Extract a structured feature inventory and screenshots from a video via Gemini.

Usage:
    python extract_features.py VIDEO [--model gemini-2.5-pro] [--output DIR]
                                     [--fps N] [--quiet]

Run it with uv — no global installs. uv builds an isolated, cached environment
from the inline dependencies declared below:

    uv run extract_features.py VIDEO [--model ...] [--output ...] [--fps N]

The only requirements are `uv` on PATH and GEMINI_API_KEY (or GOOGLE_API_KEY) in
the environment. ffmpeg ships with the bundled imageio-ffmpeg dependency, so it
doesn't need a system install (a system ffmpeg on PATH is used if present).
"""
# /// script
# requires-python = ">=3.10"
# dependencies = ["google-genai", "pydantic", "imageio-ffmpeg"]
# ///
from __future__ import annotations

import argparse
import json
import mimetypes
import os
import re
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    from google import genai
    from google.genai import types
    from pydantic import BaseModel
except ImportError as exc:  # pragma: no cover - dependency hint
    sys.exit(f"Missing dependency: {exc}\nInstall with: pip install google-genai pydantic")


class Feature(BaseModel):
    name: str
    description: str
    source: str            # "voice" | "visual" | "both"
    timestamps: list[str]  # one or more "MM:SS" moments where the feature is shown


PROMPT = """You are analyzing a product demo / screen-recording video to build documentation.

Identify every distinct product feature or capability in the video — whether it is
SPOKEN about in the narration/audio, SHOWN on screen, or both. Be exhaustive but do
not list the same feature twice.

For each feature, return:
- name: a short, specific title (e.g. "Secret variables", not "a feature").
- description: a thorough explanation of what it does and how it is used, written so a
  reader who has not seen the video understands it. Fold in details from the narration.
- source: "voice" if only described in audio, "visual" if only shown on screen, "both".
- timestamps: one or more moments (format MM:SS, or HH:MM:SS for long videos) where the
  feature is best SHOWN on screen — these are used to grab screenshots. Pick the clearest
  frame(s). Include several if the feature unfolds across multiple screens; one is fine
  if a single frame captures it.

Order features by when they first appear. Every timestamp must fall within the video."""


def log(msg: str, quiet: bool) -> None:
    if not quiet:
        print(msg, file=sys.stderr)


def parse_timestamp(ts: str) -> float | None:
    """Convert 'SS', 'MM:SS', or 'HH:MM:SS' to seconds. None if unparseable."""
    ts = ts.strip()
    if not re.fullmatch(r"\d{1,2}(:\d{1,2}){0,2}", ts):
        return None
    seconds = 0
    for part in ts.split(":"):
        seconds = seconds * 60 + int(part)
    return float(seconds)


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:40] or "feature"


def upload_and_wait(client, video: Path, quiet: bool):
    log(f"Uploading {video.name} ...", quiet)
    uploaded = client.files.upload(file=str(video))
    while uploaded.state and uploaded.state.name == "PROCESSING":
        log("  processing video ...", quiet)
        time.sleep(5)
        uploaded = client.files.get(name=uploaded.name)
    if uploaded.state and uploaded.state.name == "FAILED":
        sys.exit("Gemini failed to process the video.")
    return uploaded


def detect_project() -> str | None:
    """Find a Google Cloud project: env var first, then the active gcloud config."""
    proj = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if proj:
        return proj
    try:
        out = subprocess.run(
            ["gcloud", "config", "get-value", "project"], capture_output=True, text=True
        )
        proj = (out.stdout or "").strip()
        if proj and proj != "(unset)":
            return proj
    except Exception:
        pass
    return None


def make_client(project: str | None, location: str | None, quiet: bool):
    """Return (client, use_vertex). Prefer an API key; else Vertex AI via ADC."""
    has_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    force_vertex = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "").lower() in ("1", "true", "yes")

    if has_key and not force_vertex and not project:
        log("Auth: Gemini Developer API (API key).", quiet)
        return genai.Client(), False

    project = project or detect_project()
    location = location or os.environ.get("GOOGLE_CLOUD_LOCATION") or "global"
    if not project:
        sys.exit(
            "No GEMINI_API_KEY found and no Google Cloud project for Vertex AI.\n"
            "Either export GEMINI_API_KEY, or set a project with "
            "`gcloud config set project <id>` (after `gcloud auth application-default "
            "login`), or pass --project."
        )
    log(f"Auth: Vertex AI via ADC (project={project}, location={location}).", quiet)
    return genai.Client(vertexai=True, project=project, location=location), True


def guess_mime(video: Path) -> str:
    mime, _ = mimetypes.guess_type(str(video))
    return mime or "video/mp4"


def inline_video_part(video: Path, fps: int | None, max_mb: float, quiet: bool):
    """Build an inline video Part for Vertex AI (which has no File API).

    Vertex caps the request size, so if the video is larger than max_mb we send a
    downscaled temporary copy *for analysis only*. Screenshots are grabbed elsewhere
    from the original file, so they keep full resolution.
    """
    upload = video
    size_mb = video.stat().st_size / 1_000_000
    if size_mb > max_mb:
        tmp = Path(tempfile.gettempdir()) / f"{video.stem}-analysis-1280p.mp4"
        log(f"  {size_mb:.0f} MB exceeds the ~{max_mb:.0f} MB inline cap; downscaling a temp "
            "copy for analysis (screenshots stay full-res)...", quiet)
        subprocess.run(
            [ffmpeg_exe(), "-y", "-i", str(video), "-vf", "scale=1280:-2",
             "-c:v", "libx264", "-crf", "32", "-preset", "veryfast", "-an",
             str(tmp), "-loglevel", "error"],
            capture_output=True,
        )
        if tmp.exists() and tmp.stat().st_size > 0:
            upload = tmp
            log(f"  analysis copy: {tmp.stat().st_size / 1_000_000:.0f} MB", quiet)
        else:
            log("  downscale failed; sending the original (may exceed the cap).", quiet)
    part = types.Part(inline_data=types.Blob(data=upload.read_bytes(), mime_type=guess_mime(video)))
    if fps:
        part.video_metadata = types.VideoMetadata(fps=fps)
    return part


def upload_to_gcs(video: Path, bucket: str, quiet: bool) -> str | None:
    """Upload the full-quality video to GCS and return its gs:// URI.

    Vertex AI has no File API, so a Cloud Storage URI is how you send a large video
    at full quality (no compression). Returns None on failure so the caller can fall
    back to an inline upload.
    """
    uri = f"gs://{bucket}/video-feature-extractor/{video.name}"
    log(f"  uploading full-quality video to {uri} ...", quiet)
    result = subprocess.run(
        ["gcloud", "storage", "cp", str(video), uri], capture_output=True, text=True
    )
    if result.returncode != 0:
        log(f"  GCS upload failed ({result.stderr.strip()}); falling back to inline.", quiet)
        return None
    return uri


def delete_gcs(uri: str, quiet: bool) -> None:
    subprocess.run(["gcloud", "storage", "rm", uri], capture_output=True)


def analyze(video: Path, model: str, fps: int | None, project: str | None,
            location: str | None, max_upload_mb: float, bucket: str | None,
            quiet: bool) -> list[Feature]:
    client, use_vertex = make_client(project, location, quiet)

    gcs_uri = None
    if use_vertex:
        # Full quality via a GCS URI when a bucket is configured; otherwise inline
        # (auto-downscaled past the size cap).
        if bucket:
            gcs_uri = upload_to_gcs(video, bucket, quiet)
        if gcs_uri:
            video_part = types.Part(
                file_data=types.FileData(file_uri=gcs_uri, mime_type=guess_mime(video))
            )
            if fps:
                video_part.video_metadata = types.VideoMetadata(fps=fps)
        else:
            video_part = inline_video_part(video, fps, max_upload_mb, quiet)
    else:
        # Gemini Developer API: the File API handles full-quality uploads up to 2 GB.
        uploaded = upload_and_wait(client, video, quiet)
        if fps:
            video_part = types.Part(
                file_data=types.FileData(file_uri=uploaded.uri, mime_type=uploaded.mime_type),
                video_metadata=types.VideoMetadata(fps=fps),
            )
        else:
            video_part = uploaded

    try:
        log(f"Analyzing with {model} ...", quiet)
        response = client.models.generate_content(
            model=model,
            contents=[video_part, PROMPT],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=list[Feature],
            ),
        )
        usage = getattr(response, "usage_metadata", None)
        if usage:
            log(
                f"Tokens: prompt={usage.prompt_token_count} "
                f"output={usage.candidates_token_count} total={usage.total_token_count}",
                quiet,
            )
        features = response.parsed
        if not features:
            features = [Feature(**item) for item in json.loads(response.text or "[]")]
        return features
    except Exception as exc:
        sys.exit(f"Gemini analysis failed: {exc}")
    finally:
        if gcs_uri:
            delete_gcs(gcs_uri, quiet)


def ffmpeg_exe() -> str:
    """Locate ffmpeg: prefer one on PATH, else the binary bundled with imageio-ffmpeg."""
    from shutil import which

    found = which("ffmpeg")
    if found:
        return found
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("No ffmpeg available. Run via `uv run` so imageio-ffmpeg is installed.")


def grab_frame(ffmpeg: str, video: Path, seconds: float, out: Path, quiet: bool) -> bool:
    out.parent.mkdir(parents=True, exist_ok=True)
    # webp is encoded with libwebp's quality scale; png/jpeg use -q:v.
    quality = ["-quality", "85"] if out.suffix == ".webp" else ["-q:v", "2"]
    cmd = [
        ffmpeg, "-y", "-ss", str(seconds), "-i", str(video),
        "-frames:v", "1", *quality, str(out), "-loglevel", "error",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not out.exists():
        log(f"  ffmpeg could not grab a frame at {seconds:.0f}s: {result.stderr.strip()}", quiet)
        return False
    return True


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Extract features + screenshots from a video via the Gemini API."
    )
    ap.add_argument("video", type=Path, help="Path to the video file")
    ap.add_argument("--model", default="gemini-3.1-pro-preview",
                    help="Gemini model (default: gemini-3.1-pro-preview). "
                         "Try gemini-3.5-flash for a faster, cheaper pass.")
    ap.add_argument("--project",
                    help="Google Cloud project for Vertex AI (default: gcloud config / "
                         "GOOGLE_CLOUD_PROJECT). Ignored when GEMINI_API_KEY is used.")
    ap.add_argument("--location",
                    help="Vertex AI location (default: GOOGLE_CLOUD_LOCATION or 'global').")
    ap.add_argument("--output", type=Path,
                    help="Output directory (default: <video-name>-features/)")
    ap.add_argument("--fps", type=int,
                    help="Sampling FPS sent to Gemini (default: model default, ~1)")
    ap.add_argument("--format", choices=["png", "webp"], default="png",
                    help="Screenshot format (default: png). Use webp for docs sites.")
    ap.add_argument("--screenshot-source", type=Path,
                    help="Video to grab screenshots from (default: the analyzed video). Point at "
                         "the original full-res file if analysis runs on a downscaled copy.")
    ap.add_argument("--gcs-bucket", default=os.environ.get("GEMINI_VIDEO_BUCKET"),
                    help="GCS bucket name for full-quality upload on Vertex AI (no compression). "
                         "Defaults to $GEMINI_VIDEO_BUCKET. Without it, large videos fall back to "
                         "a downscaled inline upload.")
    ap.add_argument("--max-upload-mb", type=float, default=18.0,
                    help="Vertex inline size cap (only used when no --gcs-bucket); larger videos "
                         "are auto-downscaled for analysis only, never for screenshots (default: 18).")
    ap.add_argument("--quiet", action="store_true", help="Suppress progress output")
    args = ap.parse_args()

    if not args.video.exists():
        sys.exit(f"Video not found: {args.video}")
    ffmpeg = ffmpeg_exe()
    shot_src = args.screenshot_source or args.video
    if not shot_src.exists():
        sys.exit(f"Screenshot source not found: {shot_src}")

    out_dir = args.output or (Path.cwd() / f"{args.video.stem}-features")
    shots_dir = out_dir / "screenshots"
    out_dir.mkdir(parents=True, exist_ok=True)

    features = analyze(args.video, args.model, args.fps, args.project, args.location,
                       args.max_upload_mb, args.gcs_bucket, args.quiet)
    log(f"Found {len(features)} features.", args.quiet)

    records = []
    for index, feat in enumerate(features, 1):
        shots = []
        for ts in feat.timestamps:
            seconds = parse_timestamp(ts)
            if seconds is None:
                log(f"  skipping unparseable timestamp: {ts!r}", args.quiet)
                continue
            fname = f"{index:02d}-{slugify(feat.name)}-{ts.replace(':', '-')}.{args.format}"
            if grab_frame(ffmpeg, shot_src, seconds, shots_dir / fname, args.quiet):
                shots.append({"timestamp": ts, "path": f"screenshots/{fname}"})
        records.append({
            "name": feat.name,
            "description": feat.description,
            "source": feat.source,
            "screenshots": shots,
        })

    (out_dir / "features.json").write_text(
        json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        f"# Features in {args.video.name}",
        "",
        f"_Extracted with {args.model} on {datetime.now(timezone.utc).date()}._",
        "",
    ]
    for index, rec in enumerate(records, 1):
        lines += [
            f"## {index}. {rec['name']}",
            "",
            f"**Source:** {rec['source']}",
            "",
            rec["description"],
            "",
        ]
        for shot in rec["screenshots"]:
            lines.append(f"![{rec['name']} at {shot['timestamp']}]({shot['path']})")
        lines.append("")

    (out_dir / "features.md").write_text("\n".join(lines), encoding="utf-8")

    print(str(out_dir))


if __name__ == "__main__":
    main()
