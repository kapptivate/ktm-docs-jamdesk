---
name: extract-product-doc-from-videos
description: >-
  Turn a product demo or screen-recording video into a structured feature
  inventory plus matching screenshots, using the Gemini API. Use this skill
  whenever the user has a video (demo, walkthrough, tutorial, screen capture)
  and wants to know what it shows — pull out the features, get a feature list,
  or grab annotated screenshots — even if they don't mention Gemini by name.
  Triggers on "analyze this demo video", "what features are in this recording",
  "extract screenshots from this walkthrough", or "turn this MP4 into a feature
  list". It captures features that are SPOKEN in the narration as well as ones
  only SHOWN on screen, and pulls a screenshot for each at the right moment.
  (To go further and write actual documentation pages from a video, use the
  video-to-docs skill, which builds on this one.)
---

# Extract product documentation from videos

## Why this exists

Going through a demo video by hand to capture what it shows is slow: you scrub
back and forth, transcribe the narration, note what's on screen, and screenshot
each feature. This skill does that first pass automatically. Gemini watches the
whole video — audio and visuals — and returns a structured list of features,
each with a description and the timestamps where it's best shown. The script
then grabs a screenshot at each of those moments. You get a Markdown draft, a
JSON file, and a folder of screenshots.

It captures two kinds of features on purpose: things the narrator *talks about*
(even off-screen) and things only *shown* on screen. The `source` field on each
feature tells you which.

## Prerequisites

Nothing is installed globally. The script declares its Python dependencies
inline (PEP 723) and runs with **`uv`**, which builds an isolated, cached
environment on the fly. You need:

- **`uv`** on PATH (`uv --version`). Single binary; see astral.sh/uv.
- **Gemini access**, via either mode (auto-detected):
  - **API key** — `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in the environment.
    Uploads via the File API, so it handles large videos.
  - **Vertex AI (ADC)** — `gcloud auth application-default login` done and a
    project set (`gcloud config set project <id>`, `GOOGLE_CLOUD_PROJECT`, or
    `--project`). Vertex has **no File API**, so the video is sent **inline** —
    keep clips under ~20 MB in this mode, or use API-key mode for big files.

`ffmpeg` does **not** need a system install — the bundled `imageio-ffmpeg`
dependency provides a static binary (a system `ffmpeg` on PATH is used if one
exists).

## Running it

```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/extract-product-doc-from-videos/scripts/extract_features.py" <video> \
  [--model gemini-3.1-pro-preview] [--format webp] [--gcs-bucket NAME] [--output <dir>] [--fps N] [--quiet]
```

- `<video>` — path to the video file (mp4, mov, webm, …).
- `--model` — defaults to `gemini-3.1-pro-preview` (best feature coverage and
  accuracy in testing, ~3× cheaper video tokenization than the 2.5 models). Use
  `gemini-3.5-flash` for the fastest, cheapest pass.
- `--format` — `png` (default) or `webp`. Use `webp` for docs sites.
- `--gcs-bucket` — on Vertex AI, a GCS bucket to upload the **full-quality** video
  to (no compression). Defaults to `$GEMINI_VIDEO_BUCKET`. Strongly recommended for
  reading on-screen text accurately.
- `--output` — output folder. Defaults to `<video-name>-features/`.
- `--fps` — frames-per-second Gemini samples (default ~1). Raise it for
  fast-moving UIs where 1 FPS misses things.

The script prints the output directory path on stdout when done.

## What it produces

- **`features.md`** — one section per feature: title, `source` (voice / visual /
  both), description, and the embedded screenshot(s).
- **`features.json`** — the same data, structured.
- **`screenshots/`** — one image per timestamp, named
  `<index>-<feature-slug>-<timestamp>.<png|webp>`.

## Notes and limits

- Gemini samples ~1 frame per second, so a timestamp can land a beat early or
  late and a screenshot may catch a transition. Skim the frames; re-grab a
  nearby second or raise `--fps` if one missed.
- **Full-quality upload.** API-key mode uses the File API (up to 2 GB, no
  compression). On Vertex (ADC), set `--gcs-bucket` (or `$GEMINI_VIDEO_BUCKET`) to
  upload the original to Cloud Storage and analyze it at full quality — this gives
  the model the sharpest view of on-screen text and detail. The uploaded object is
  deleted after the run. Without a bucket, a video over ~18 MB falls back to a
  downscaled inline copy *for analysis only* (tune with `--max-upload-mb`).
  Screenshots are always grabbed from the original, so they keep full resolution
  in every mode — never pre-downscale the input yourself.
- If a timestamp falls outside the video, ffmpeg grabs the nearest frame or
  skips it — the run logs and continues rather than failing.
