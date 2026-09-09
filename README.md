# Kapptivate product documentation

The source for [docs.kapptivate.com](https://docs.kapptivate.com), built with
[Jamdesk](https://jamdesk.com). Pages are MDX (Markdown plus React components), the
navigation and theme live in `docs.json`, and Jamdesk deploys automatically on every push
to `main`.

The site is bilingual. Every English page has a French counterpart under `fr/`, and both
are declared in `docs.json` under `navigation.languages`.

## Layout

```
docs.json              Navigation, theme, colors, SEO. A page is invisible until listed here.
introduction.mdx       Landing page
quickstart.mdx         First test, end to end

concepts/              Interface, core concepts
tests/                 Writing tests, plus tests/actions/ (the Actions Library)
executions/            Running tests and reading results
monitoring/            Monitors and status
alerting/              Alerts and incidents
analytics/             Dashboards, exports, mail reports, metrics
agents-devices/        Agents, devices, channels
administration/        Accounts, teams, API keys
hardware/              On-premise robot install and operations
guides/ questions/     Task guides and FAQ
ai/                    AI features
mcp/ cli/              GENERATED reference, see below

fr/                    French mirror of everything above
images/                Static assets, .webp only (plus a few .svg logos)
scripts/               Reference generator (see below)
.claude/tools/redact/  Blur confidential data in screenshots
```

Tabs in the sidebar: Docs, Actions Library, MCP, CLI, Guides & Questions, Hardware,
Changelog.

## Local preview

```bash
npm install
npx jamdesk dev          # http://localhost:3001
npx jamdesk validate     # MDX and frontmatter check
npx jamdesk broken-links # link check
```

`jamdesk dev` does not reliably reap its child `next-server` processes, and stacked servers
will peg the CPU. Before starting one, run `pgrep -fl next-server` and reuse whatever is
already up. To restart, run `pkill -f "jamdesk dev"; pkill -f next-server` first. Only a
restart picks up **new image files**, since `images/` syncs at startup rather than on hot
reload; MDX and `docs.json` edits hot-reload fine.

Current `broken-links` baseline: 25 broken links in 922 pages, all of them French section
anchors. A higher number means the change under review introduced a dead link.

## Generated reference: MCP and CLI

`mcp/` and `cli/` are **generated, not hand-written**. Generated pages carry a "do not edit"
banner. The generator introspects the live production surfaces: a `tools/list` call against
the MCP server, and the `ktm` binary's `--help` tree.

```bash
npm run docs:generate        # both
npm run docs:generate:mcp
npm run docs:generate:cli
npm run docs:check           # fail if the committed output is stale
```

Human enrichment goes in `mcp/.catalog/overlay.json` and `cli/.catalog/overlay.json`, never
in the generated MDX, which the next run would overwrite.

The `Sync MCP & CLI docs` GitHub Action (manual dispatch) runs the same generator against
production and opens a pull request with the diff.

## Writing conventions

Full house style lives in `CLAUDE.md`. The essentials:

- **Frontmatter:** `title` and `description` are both required on every page.
- **Structure:** opening paragraph right after the frontmatter with no heading above it,
  and a `## What's Next?` card grid as the last section.
- **Adding a page:** create the `.mdx`, add its path without the extension to `docs.json`,
  add the French counterpart under `fr/`, and link to it from a related page. Skip the
  `docs.json` step and the page will not appear in the sidebar.
- **French pages** carry French alt text, not the English alt text copied over.
- **Images** are `.webp` in `images/`. Convert with `cwebp` (`brew install webp libtiff`).
- **No snippets.** The renderer's snippet support only handles inline formatting, so
  headings, tables, code fences, lists, and components all collapse. When two pages need
  the same content, duplicate it and keep both in sync by hand.
- **Components** are limited to the set listed in `CLAUDE.md`. There is no `<CodeBlock>`,
  `<Alert>`, or `<Section>`, and raw HTML is out.

## Screenshots

Screenshots are captured from the live platform at a device pixel ratio of 2, or with the
browser zoomed to 175% as a fallback, so a 956px CSS content column lands around 1568px
wide. Never route a capture through a chat client: the paste pipeline downsizes it. Write
the file to disk instead.

To blur customer data (emails, names, MSISDNs) before committing:

```bash
uv run --with imageio-ffmpeg .claude/tools/redact/redact.py images/products-list.webp
```

It bridges webp to PNG, opens the copy in CleanShot's Annotate tool, and writes the blurred
result back over the `.webp` once you press Cmd+S. The first redaction of a file keeps a
`.bak` of the original, which `.gitignore` excludes. See
`.claude/tools/redact/README.md` for the click-to-redact bridge and the manual fallback.

## Migration tracker

`MIGRATION.md` audits every article from the old help center (help.kapptivate.com) against
this site, with a status per article. Keep it current when migrating or retiring content.
