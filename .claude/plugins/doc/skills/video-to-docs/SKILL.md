---
name: video-to-docs
description: >-
  Turn a product demo video into reviewed documentation changes on a docs site.
  Use this skill whenever the user wants to create or update docs FROM a video
  or screen recording — e.g. "document this demo in the docs", "update the docs
  from this walkthrough", "turn this recording into doc pages", "add what this
  video shows to the documentation". It extracts the video's features and
  screenshots (via the extract-product-doc-from-videos skill), scans the
  existing docs, proposes a change set, confirms it with the user, deep-reads
  the affected pages and their links, plans, and then writes the pages —
  following the docs project's own conventions. Prefer
  this over the bare extractor whenever the goal is actual documentation, not
  just a feature list.
---

# Video to docs

## Why this exists

A demo video is a great source of truth for documentation — but dumping its
features into a docs site blindly creates duplicates, off-style pages, and
content in the wrong place. This skill turns a video into *reviewed, well-placed*
doc changes. The flow is: **extract → understand the existing docs → propose →
confirm → deep-read the affected docs → plan → write**. The human stays in
control at the proposal and review gates; you never silently rewrite existing
docs.

It builds on `extract-product-doc-from-videos` (the extraction half) and adds the
judgment: where each feature belongs, what's new vs. already covered, and how to
write it in the project's voice.

## Prerequisites

- Run from the **root of a docs project** — it must have a `docs.json` (Jamdesk /
  Mintlify navigation) and ideally a `CLAUDE.md` describing the project's writing
  and component conventions. This skill reads both at runtime; it is **not** hard
  wired to any one repo.
- The extractor's prerequisites apply (`uv` + Gemini access). See the
  `extract-product-doc-from-videos` skill.

## The workflow

Work through these steps in order. Don't skip the proposal and review gates —
they're what keep the output trustworthy.

### 1. Extract the video

Run the sibling extractor, asking for web-ready screenshots. If the video clearly
maps to existing page(s) — the filename or the user's request names a feature the
docs already cover — pass those pages with `--docs`: Gemini then tags each feature
with a coverage verdict (`new` / `covered` / `outdated`) and a gap note, which
catches stale doc claims you'd otherwise have to diff by hand.

```bash
uv run "${CLAUDE_PLUGIN_ROOT}/skills/extract-product-doc-from-videos/scripts/extract_features.py" <video> \
  --format webp --output /tmp/video-to-docs-extract [--docs <related-page.mdx> ...]
```

Pass the **original** video — don't pre-downscale it. For the best analysis on
Vertex (no API key), set `$GEMINI_VIDEO_BUCKET` (or add `--gcs-bucket <name>`) so
the full-quality video is uploaded to Cloud Storage rather than downscaled. Either
way the extractor always grabs screenshots from the original, so they stay full
resolution — if you shrink the input yourself, the screenshots come out pixelated.

Read `/tmp/video-to-docs-extract/features.md` and `features.json`. These are the
**candidate** features and screenshots — a draft, not ground truth.

**Always write a sidecar inventory file next to the source video**, named
`<video-stem>.md` in the same directory as the video, so every processed video
leaves a durable record. Start from the extractor's `features.md` and make it
standalone:

- Drop the `/tmp` screenshot embeds and keep each feature's **timestamps**
  instead, so the file doesn't point at paths that won't exist later.
- Right under the `_Extracted with …_` line, add a gap-analysis line naming the
  pages you ran `--docs` against, e.g.
  `` _Full-quality (GCS) analysis. Gap analysis against: `path/a.mdx`, `path/b.mdx`_ ``
  (say "Full-quality (GCS) analysis." only when you ran with a GCS bucket;
  drop the "Gap analysis against" clause if you ran without `--docs`).
- Leave room for a `## Verification notes (read before reusing)` section at the
  end; you fill it in at step 8, once values are checked against frames.

If sidecar files already exist in that directory, match their exact formatting so
the inventory stays consistent video to video.

### 2. Learn the existing docs

Read `docs.json` to understand the site's structure (tabs, groups, pages) and
read the project's `CLAUDE.md` for its conventions (page template, allowed
components, image format, navigation rules, "what's next" policy, etc.). Then, for
each extracted feature, find related existing content: search page titles and
descriptions, and grep the repo for the feature's keywords. For a large site, fan
out with Explore subagents rather than reading every page. Build a map: each
feature → the page(s) that already cover it, or "no coverage".

### 3. Propose a change set

Classify each feature as one of: **NEW page**, **NEW section** in an existing
page, **UPDATE** existing content, or **SKIP** (already well covered). Seed the
classification from the extractor's coverage verdicts when `--docs` was used, but
verify them — they're a draft like everything else. Present a concise table to the
user — feature → action → target path → one-line rationale — and note which
screenshots you'd use. Call out **discrepancies** explicitly: where the video
contradicts a doc claim (changed UI, renamed options, removed behavior), quote the
stale claim so the user can rule on it. This is the first gate.

### 4. Interview to resolve ambiguity

Where a mapping is genuinely uncertain — a feature could fit several pages, might
be internal-only, or its naming is unclear — ask the user with AskUserQuestion.
Don't guess on decisions that change the site's structure. Watch for concepts the
user flags as internal: don't expose them in the docs.

### 5. Let the user add

Explicitly invite the user to adjust: features the video missed that they want
documented, features to drop, or different placements. The video is a starting
point, not the full scope.

### 6. Deep-read the affected docs

Once the change set is agreed, explore its whole neighborhood before planning a
single edit. Step 2's title-and-grep scan was enough to *place* features; it is
not enough to *write* them compliantly. Read in full:

- **The target pages themselves**, plus their siblings in the same nav group —
  new content must read like the pages around it (structure, components, tone,
  image captions).
- **Inbound links**: grep the repo for links to each target path (inline links
  and "What's Next?" cards). These pages' claims and links may need updating
  when a page gains sections, moves, or changes meaning.
- **Outbound links**: where the target pages already send readers, so a new
  section doesn't duplicate or contradict a linked deep-dive.

For a large neighborhood, fan out Explore subagents. The output is a compliance
map: per file, what must change, which cross-links and `docs.json` entries are
affected, and any existing claim the new content would duplicate or contradict.
Surface contradictions to the user; don't silently fix them.

### 7. Plan

Produce a tight, ordered plan grounded in the deep-read: files to create, files
to edit (with what changes), cross-link updates (inbound links and "What's
Next?" cards), screenshots to copy into the project's image directory (as
webp), `docs.json` navigation edits, and redirects if any page moves. Confirm it.

### 8. Write

Implement, deferring to the project's conventions (its `CLAUDE.md` and any
`jamdesk` skill present):

- Author MDX with correct frontmatter (`title`, `description`) and only real,
  documented components — never invent components.
- Open each major section with one or two sentences on what the feature is *for*
  (the user value), then detail the capabilities — unless the project's
  conventions say otherwise.
- Copy the chosen screenshots from the extract dir into the project's image
  directory as `.webp`; embed them as plain markdown images (these stay zoomable)
  unless the project's conventions say otherwise.
- Wire new pages into `docs.json` in the right group.
- Finish the video's sidecar inventory file from step 1: add the
  `## Verification notes (read before reusing)` section recording which frames
  confirmed each concrete value or option list, which claims are voice-only or
  unverified, and how the screenshots were produced (e.g. grabbed as PNG and
  converted with `cwebp` when the extractor's webp encoder is disabled).
- Validate with the project's checks (for Jamdesk: `jamdesk validate` and
  `jamdesk broken-links`).
- If a dev server is running, restart it — newly added images are synced at
  startup, not by hot reload.
- Tell the user where to review (the local dev URL) and iterate on their feedback.
- Commit and push only when the user explicitly asks.

## Principles

- **The extraction is a draft, not truth.** Verify timestamps against the
  screenshots; a mis-timed frame can show a transition — re-grab or raise `--fps`.
  Frames are auto-nudged to the steadiest nearby moment so the cursor isn't a
  blurry mid-move smear, but still reject any screenshot with a blurry pointer.
- **Verify concrete values on-screen before writing them.** Exact option lists
  (operators, presets, statuses, counts) are the easiest thing for the extraction
  to gloss over or hallucinate from narration. Read them off the screenshots; if a
  value isn't visible in any frame, ask the user instead of guessing. Grab extra
  frames from the video when a menu or dropdown wasn't captured open.
- **Read before you overwrite.** If the video contradicts current docs, surface
  the discrepancy and let the user decide; don't silently replace content.
- **Respect internal-only concepts** the user flags — keep them out of the docs.
- **Stay in the project's voice.** Match the surrounding pages' tone, structure,
  and component usage rather than imposing a generic style.
