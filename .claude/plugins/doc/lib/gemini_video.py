"""Shared helpers for the doc plugin's video skills.

Gemini auth (API key or Vertex/ADC), full-quality video upload (GCS, or inline
with an auto-downscale fallback), and ffmpeg frame grabbing. The per-skill
scripts import this module and declare the runtime dependencies
(google-genai, pydantic, imageio-ffmpeg) in their own PEP 723 headers.
"""
from __future__ import annotations

import mimetypes
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from google import genai
from google.genai import types


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
    return slug[:40] or "shot"


def ffmpeg_exe() -> str:
    """Prefer a system ffmpeg, else the binary bundled with imageio-ffmpeg."""
    from shutil import which

    found = which("ffmpeg")
    if found:
        return found
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def guess_mime(video: Path) -> str:
    mime, _ = mimetypes.guess_type(str(video))
    return mime or "video/mp4"


def detect_project() -> str | None:
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
            "Set GEMINI_API_KEY, or run `gcloud config set project <id>` "
            "(after `gcloud auth application-default login`), or pass --project."
        )
    log(f"Auth: Vertex AI via ADC (project={project}, location={location}).", quiet)
    return genai.Client(vertexai=True, project=project, location=location), True


def _upload_to_gcs(video: Path, bucket: str, quiet: bool) -> str | None:
    uri = f"gs://{bucket}/doc-video-skills/{video.name}"
    log(f"  uploading full-quality video to {uri} ...", quiet)
    result = subprocess.run(
        ["gcloud", "storage", "cp", str(video), uri], capture_output=True, text=True
    )
    if result.returncode != 0:
        log(f"  GCS upload failed ({result.stderr.strip()}); falling back to inline.", quiet)
        return None
    return uri


def delete_gcs(uri: str | None, quiet: bool) -> None:
    if uri:
        subprocess.run(["gcloud", "storage", "rm", uri], capture_output=True)


def _inline_part(video: Path, fps: int | None, max_mb: float, quiet: bool):
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
    part = types.Part(inline_data=types.Blob(data=upload.read_bytes(), mime_type=guess_mime(video)))
    if fps:
        part.video_metadata = types.VideoMetadata(fps=fps)
    return part


def video_part(client, use_vertex: bool, video: Path, fps: int | None,
               max_mb: float, bucket: str | None, quiet: bool):
    """Return (part, gcs_uri). gcs_uri is non-None only when an object was uploaded
    and must be deleted after analysis — pass it to delete_gcs()."""
    if not use_vertex:
        log(f"Uploading {video.name} via the File API ...", quiet)
        uploaded = client.files.upload(file=str(video))
        while uploaded.state and uploaded.state.name == "PROCESSING":
            time.sleep(5)
            uploaded = client.files.get(name=uploaded.name)
        if uploaded.state and uploaded.state.name == "FAILED":
            sys.exit("Gemini failed to process the video.")
        if fps:
            return types.Part(
                file_data=types.FileData(file_uri=uploaded.uri, mime_type=uploaded.mime_type),
                video_metadata=types.VideoMetadata(fps=fps),
            ), None
        return uploaded, None

    gcs_uri = _upload_to_gcs(video, bucket, quiet) if bucket else None
    if gcs_uri:
        part = types.Part(file_data=types.FileData(file_uri=gcs_uri, mime_type=guess_mime(video)))
        if fps:
            part.video_metadata = types.VideoMetadata(fps=fps)
        return part, gcs_uri
    return _inline_part(video, fps, max_mb, quiet), None


def steadiest_second(ffmpeg: str, video: Path, target: float, quiet: bool,
                     window: float = 0.5, fps: int = 12) -> float:
    """Find the moment near `target` with the least motion, so the on-screen cursor
    is at rest rather than mid-movement (a moving cursor grabs as a blurry smear).

    Scans a short window centred on `target`, measuring frame-to-frame change with
    ffmpeg (tblend difference + signalstats). Returns the second with the lowest
    change. Falls back to `target` unchanged if scoring fails for any reason, so the
    worst case is the old single-grab behaviour.
    """
    start = max(0.0, target - window / 2)
    vf = (f"fps={fps},scale=480:-2,tblend=all_mode=difference,"
          "signalstats,metadata=print:file=-")
    cmd = [
        ffmpeg, "-hide_banner", "-ss", f"{start:.3f}", "-t", f"{window:.3f}",
        "-i", str(video), "-an", "-vf", vf, "-f", "null", "-",
    ]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    except Exception:
        return target

    best_t, best_v, cur_t = None, None, None
    for line in (res.stdout + "\n" + res.stderr).splitlines():
        m = re.search(r"pts_time:([0-9.]+)", line)
        if m:
            cur_t = float(m.group(1))
            continue
        m = re.search(r"signalstats\.YAVG=([0-9.]+)", line)
        if m and cur_t is not None and (best_v is None or float(m.group(1)) < best_v):
            best_v, best_t = float(m.group(1)), cur_t
    if best_t is None:
        return target
    # Input seeking usually rebases timestamps to ~0; if they came back absolute
    # (already near target), use them directly instead of re-adding `start`.
    return best_t if best_t > window + 0.05 else start + best_t


def grab_frame(ffmpeg: str, video: Path, seconds: float, out: Path, quiet: bool,
               steady: bool = True) -> bool:
    out.parent.mkdir(parents=True, exist_ok=True)
    if steady:
        seconds = steadiest_second(ffmpeg, video, seconds, quiet)
    quality = ["-quality", "90"] if out.suffix == ".webp" else ["-q:v", "2"]
    cmd = [
        ffmpeg, "-y", "-ss", str(seconds), "-i", str(video),
        "-frames:v", "1", *quality, str(out), "-loglevel", "error",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not out.exists():
        log(f"  ffmpeg could not grab a frame at {seconds:.0f}s: {result.stderr.strip()}", quiet)
        return False
    return True
