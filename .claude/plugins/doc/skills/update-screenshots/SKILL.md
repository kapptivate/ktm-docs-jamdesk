---
name: update-screenshots
description: >-
  Refresh existing documentation screenshots from a new recording. Use this skill
  when the user has re-recorded a demo and wants to replace stale screenshots in
  the docs with fresh ones — e.g. "update the screenshots on the profile page from
  this new video", "these captures are outdated, here's a new recording", "refresh
  the variable screenshots from this mp4". It reads each target screenshot's
  caption from the docs, asks Gemini where that screen appears in the new video,
  grabs full-resolution candidate frames, and — after you pick — overwrites the
  images in place (no MDX changes). For documenting brand-new features instead,
  use video-to-docs; for a raw feature inventory, use extract-product-doc-from-videos.
---

# Update screenshots

## Why this exists

When a UI is re-recorded, the screenshots in the docs go stale — but the docs
already say what each image should show (its caption / alt text). This skill uses
those captions as the spec: it finds each known screenshot inside the new video,
re-grabs it at full resolution, and overwrites the file in place. Because the
filename doesn't change, no MDX is touched — the pages just show the fresh images.

## Prerequisites

- Run from the **root of the docs project** (the one with `docs.json` and the
  `images/` directory).
- The extractor's prerequisites apply (`uv` + Gemini access). For full-quality
  framing on Vertex, set `$GEMINI_VIDEO_BUCKET` (or pass `--gcs-bucket`).

## The workflow

### 1. Decide which screenshots to refresh

Two ways, depending on what the user gives you:

- **By image path** — the user names the files (e.g. `images/account-pat.webp`).
  For each, grep the repo for the filename and read the **alt text** of the place
  it's embedded — that caption is the description of what the shot must show.
- **By page** — the user names a page (e.g. `administration/account/profile`).
  Read the page, list every image it references with its alt text, and ask the
  user (AskUserQuestion) which ones to refresh.

Either way you end up with a list of `{path, description}` targets, where the
description is the existing caption. Don't invent new descriptions — the whole
point is to match what the docs already promise.

### 2. Run the locator

Write the targets to a JSON file and run the script with the new video:

```bash
cat > /tmp/shot-targets.json <<'JSON'
[{"path": "images/account-pat.webp", "description": "the personal access token field in the Profile section"}]
JSON

uv run "${CLAUDE_PLUGIN_ROOT}/skills/update-screenshots/scripts/update_screenshots.py" <new-video> \
  --targets-file /tmp/shot-targets.json --candidates 2
```

It uploads the video full-quality (GCS on Vertex, else inline), asks Gemini for up
to 2 timestamps per target, grabs those frames full-res into a staging dir, and
prints a `manifest.json` mapping each target path to its candidate files.

### 3. Pick the best candidate

For each target, look at the candidate frames (read the image files). A timestamp
can land mid-transition, which is why there are two — choose the clean,
fully-rendered one. Each candidate is already nudged to the least-motion moment
near its timestamp so the mouse pointer is at rest, but still check: reject any
frame with a blurry, mid-movement cursor. Recommend the better candidate, but let
the user make the call when it matters. If a target got **no** candidates, Gemini
didn't find that screen in the new video — tell the user, don't substitute
something wrong.

### 4. Overwrite in place

For each confirmed choice: back up the current image (copy to `<name>.bak`), then
copy the chosen candidate over the real path in `images/`. Same filename → the MDX
and `docs.json` stay untouched.

### 5. Review

Restart the dev server (new image bytes are synced at startup, not by hot reload)
and point the user at the affected pages. Once they're happy, remove the `.bak`
files and the staging dir. Commit only when the user asks.

## Principles

- **Captions are the contract.** Match each shot to what the docs already say it
  shows — don't redefine it.
- **Never overwrite blindly.** Keep a `.bak` until the user confirms, and don't
  replace a shot Gemini couldn't confidently locate.
- **Full resolution always.** Grab from the original new video; never pre-downscale
  it (that's what makes screenshots pixelated).
