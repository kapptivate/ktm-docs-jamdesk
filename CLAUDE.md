# Documentation Project

Jamdesk docs project. Pages are MDX (Markdown + React components). Config is in `docs.json`.

## How This Project Works

- `docs.json`: navigation structure, theme, colors, branding. Pages must be listed here to appear in the sidebar.
- `*.mdx` files: documentation pages. Every page needs `title` and `description` frontmatter.
- `images/`: static assets. Always use `.webp` format.
- `snippets/`: **avoid for content.** The renderer's snippet support is too limited: imported markdown snippets are rendered by a naive helper (`PlainMdxSnippet` in `jamdesk/vendored/scripts/compile-snippets.cjs`) that only handles paragraphs, bold, italic, and inline code. Headings, tables, fenced code blocks, lists, and components all break (everything collapses into inline text). The `<Snippet>` component is NOT supported either. When two pages need the same content, duplicate it in both pages and keep them in sync manually.

## Running the Dev Server (avoid leaking processes)

`jamdesk dev` does not reliably reap its child `next-server` processes. Stacking servers pegs the CPU and can take the Mac down. Follow these rules:

- **Never start a second server blindly.** Before launching, run `pgrep -fl next-server`. If anything is already running, reuse it — don't start another.
- **Only restart when new image *files* are added** to `images/` (they sync at startup, not hot reload). MDX, `docs.json`, and content edits hot-reload — no restart needed.
- **When you must restart, kill first, then start one.** Run `pkill -f "jamdesk dev"; pkill -f next-server` and confirm with `pgrep -fl next-server` (expect nothing) before starting a single new server.
- **Don't leave a server running for hours.** The leak accumulates over long-lived sessions. Start it for review, then stop it.
- Prefer asking the user to run `! npx jamdesk dev` themselves over launching a long-lived background process.

### What actually freezes the Mac (measured 2026-09-15)

macOS resource reports (`/Library/Logs/DiagnosticReports/node_*.diag`) for the crashes of 9, 11 and 14 September all show the same single `node` process:

- **45001 wakeups in 4 seconds** (12703/s) against a system limit of 150/s. The file watcher spins on its own writes.
- **2147 MB of file backed memory dirtied in 550 s** (3.9 MB/s) against a 24.86 KB/s limit, all of it Turbopack cache churn.
- **Vnodes available falling from 75% to 30%.** That kernel resource running out is what turns a slow machine into a hard freeze, leaving only the power button (`forceReset-base+socd` markers confirm it).

Page weight is not the cause. The heaviest image in the repo is 1.1 MB and all of `images/` is 15 MB.

The dev workspace lives **outside the repo**, in `~/.jamdesk/workspaces/<project>-<hash>/`, and its `.next` cache reached 716 MB. It sits in the home folder, so Spotlight indexes it while Turbopack rewrites it. A `.metadata_never_index` marker now sits at `~/.jamdesk/` to keep the indexer out of that loop.

Maintenance, in order of usefulness:

- `npx jamdesk dev --clean` wipes the workspace cache before starting.
- After a crash a stale `.jamdesk-dev.lock` holding a dead PID stays behind in the workspace. Check it with `ps -p <pid>` and delete it.
- Abandoned workspaces pile up. One left from July held 573 MB of dead cache. Audit with `du -sh ~/.jamdesk/workspaces/*`.

**Upgrading jamdesk fixes it.** Tested 1.1.205 against this content on 2026-09-15: the dev server starts fast and trips no system limit at all, where 1.1.126 blew through the wakeups limit within 4 seconds of every session. The fix is not in the CLI, whose process handling is byte-for-byte the same (no `killpg`, same `SIGTERM`/`SIGKILL`/cleanup paths, so stacked servers are still worth avoiding). It comes from the vendored Next.js going 16.2.6 to 16.3.4, which settles the Turbopack watcher.

Two caveats that cost time when testing this:

- 1.1.205 pulls `commander@15`, which wants Node >= 22.12. This machine runs Node 20, so `npm install` warns `EBADENGINE`. It works anyway.
- `~/.jamdesk` is shared by every project, not per repo, and `jamdesk validate` rewrites its dependency tree to match whichever CLI version ran last. Two versions pointed at the same home directory reinstall over each other on every command, so testing an upgrade in a "throwaway" clone still mutates the real environment.

## Page Template

Every page follows this structure:

    ---
    title: Clear, Specific Title
    description: One sentence. Used in search results and social previews.
    ---

    Opening paragraph: what this page covers and who it's for. No heading needed.

    ## First Section

    Content. Use components where they help, not for decoration.

    ## What's next?

    <Columns cols={2}>
      <Card title="Related Page" icon="arrow-right" href="/path">

        Why the reader would go here next

</Card>
</Columns>

The opening paragraph comes right after frontmatter, with no heading before it. "What's next?" is always the last section. Card descriptions explain why, not what ("Set up search for your docs", not "Search configuration page").

## Writing Style

Start with why. What problem does this page solve? Show that first, then walk through how to use the feature.

Use progressive disclosure: a simple example near the top, advanced options tucked into Accordions or later sections.

Active voice. "Run this command", not "This command should be run".

No em dashes (—). Rewrite with a comma, colon, period, or parentheses instead.

One idea per paragraph. If you reach for "also" or "additionally", start a new paragraph instead.

Code examples must actually work. Never show partial code or pseudocode. Every block should be complete and copy-pasteable.

Write like a person. Skip filler like "It's important to note that", "This allows you to", or "seamlessly". Drop the hedging ("you might want to consider"). Read your output back, and if it sounds like a chatbot wrote it, rewrite it shorter and more direct.

## Components

Layout: Card, Columns, Tabs, Tab, Accordion, AccordionGroup, Steps, Step, Expandable, Frame, CodeGroup
Callouts: Note, Info, Warning, Tip, Check, Danger

When to use each:

| Component | Use for | Don't use for |
|-----------|---------|---------------|
| Tabs | Mutually exclusive choices (npm/yarn, languages) | Sequential content |
| Steps | Ordered procedures | Unordered lists of features |
| Accordion | Optional/advanced detail | Core content readers need |
| Card (in Columns) | Navigation links, feature grids | Inline content |
| Note/Tip/Warning | Important context the reader might miss | Every other paragraph |

Cards always go inside Columns:

    <Columns cols={2}>
      <Card title="Page Title" icon="icon-name" href="/path">

        Brief description

</Card>
</Columns>

Icons are Font Awesome Light names: "rocket", "code", "terminal", "book-open", "gear"

## Adding Pages

1. Create the `.mdx` file
2. Add the page path (no `.mdx` extension) to `docs.json` in the right navigation group
3. Link to it from related pages via "What's next?" cards

**If you skip step 2, the page won't show up in the sidebar.** Read `docs.json` before creating pages so you understand the navigation structure.

## Before You're Done

Check your work:
- [ ] Frontmatter has both `title` and `description`
- [ ] Opening paragraph exists (no heading before it)
- [ ] Page ends with "What's next?" cards
- [ ] New pages are added to `docs.json` navigation
- [ ] Code examples are complete and copy-pasteable
- [ ] No invented components; only the ones listed above
- [ ] No raw HTML tags; use MDX components
- [ ] Images use `.webp` format

## Common Mistakes

- Inventing components like `<CodeBlock>`, `<Alert>`, or `<Section>`. They don't exist. Use the components listed above.
- Wrapping code in components. Code blocks are standard Markdown triple backticks. Don't wrap them in `<CodeGroup>` unless you're showing multiple language alternatives.
- Skipping description frontmatter. Every page needs it; it appears in search results and link previews.
- Using `<Card>` without `<Columns>`. Cards must be inside a `<Columns>` wrapper.
- Writing "click here" links. Use descriptive link text: [Migration guide](/setup/migration), not [click here](/setup/migration).
