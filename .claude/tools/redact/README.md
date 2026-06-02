# Redact docs screenshots in CleanShot X

Blur confidential data (emails, names, phone numbers) in docs screenshots by hand,
without leaving the dev preview. Docs images are `.webp`; CleanShot's Annotate tool
only opens PNG/JPEG — so this bridges `webp → png → (you blur) → webp` and keeps a
one-time `.bak` of each original.

## One-off, from the terminal

```bash
# from the docs project root
uv run --with imageio-ffmpeg .claude/tools/redact/redact.py images/products-list.webp
```

It opens a PNG copy in CleanShot. Blur what you need, **press Cmd+S** (saves over the
opened PNG), and the script writes the result back to `images/products-list.webp`.
Restart `jamdesk dev` to see it (images sync at startup, not on hot reload).

## Click-to-redact in the dev preview

1. **Start the bridge** (leave it running) from the docs root:
   ```bash
   uv run --with imageio-ffmpeg .claude/tools/redact/redact.py --serve
   ```
2. **Install the userscript** `redact.user.js` in Tampermonkey (or paste its body as
   a bookmarklet). It's scoped to `localhost:3001`.
3. On any docs page, **Option-click** an image → it opens in CleanShot. Blur, Cmd+S,
   and the bridge converts it back onto the real `images/*.webp`.

## Manual fallback

If CleanShot exports the blurred image elsewhere instead of overwriting the PNG:

```bash
uv run --with imageio-ffmpeg .claude/tools/redact/redact.py --apply ~/Desktop/blurred.png images/products-list.webp
```

## Notes

- **Backups:** the first redaction of a file copies it to `<name>.webp.bak`. Re-runs
  don't overwrite that backup, so the earliest original is always recoverable.
- **macOS only** — uses `open` and the `cleanshot://` URL scheme.
- **ffmpeg** comes from `imageio-ffmpeg` via `uv run --with imageio-ffmpeg`; a system
  ffmpeg on PATH is used if present.
