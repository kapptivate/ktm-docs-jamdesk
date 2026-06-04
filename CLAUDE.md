# Documentation Project

Jamdesk docs project. Pages are MDX (Markdown + React components). Config is in `docs.json`.

## How This Project Works

- `docs.json`: navigation structure, theme, colors, branding. Pages must be listed here to appear in the sidebar.
- `*.mdx` files: documentation pages. Every page needs `title` and `description` frontmatter.
- `images/`: static assets. Always use `.webp` format.
- `snippets/`: reusable MDX fragments. Import with `<Snippet file="name.mdx" />`.

## Running the Dev Server (avoid leaking processes)

`jamdesk dev` does not reliably reap its child `next-server` processes. Stacking servers pegs the CPU and can take the Mac down. Follow these rules:

- **Never start a second server blindly.** Before launching, run `pgrep -fl next-server`. If anything is already running, reuse it — don't start another.
- **Only restart when new image *files* are added** to `images/` (they sync at startup, not hot reload). MDX, `docs.json`, and content edits hot-reload — no restart needed.
- **When you must restart, kill first, then start one.** Run `pkill -f "jamdesk dev"; pkill -f next-server` and confirm with `pgrep -fl next-server` (expect nothing) before starting a single new server.
- **Don't leave a server running for hours.** The leak accumulates over long-lived sessions. Start it for review, then stop it.
- Prefer asking the user to run `! npx jamdesk dev` themselves over launching a long-lived background process.

## Page Template

Every page follows this structure:

    ---
    title: Clear, Specific Title
    description: One sentence. Used in search results and social previews.
    ---

    Opening paragraph: what this page covers and who it's for. No heading needed.

    ## First Section

    Content. Use components where they help, not for decoration.

    ## What's Next?

    <Columns cols={2}>
      <Card title="Related Page" icon="arrow-right" href="/path">

        Why the reader would go here next

</Card>
</Columns>

The opening paragraph comes right after frontmatter, with no heading before it. "What's Next?" is always the last section. Card descriptions explain why, not what ("Set up search for your docs", not "Search configuration page").

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
3. Link to it from related pages via "What's Next?" cards

**If you skip step 2, the page won't show up in the sidebar.** Read `docs.json` before creating pages so you understand the navigation structure.

## Before You're Done

Check your work:
- [ ] Frontmatter has both `title` and `description`
- [ ] Opening paragraph exists (no heading before it)
- [ ] Page ends with "What's Next?" cards
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
