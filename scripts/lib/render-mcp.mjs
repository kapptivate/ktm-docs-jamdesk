// Render a normalized MCP catalog into MDX pages.
import {
  frontmatter,
  BANNER,
  paramTable,
  annotationCallout,
  codeBlock,
  card,
  columns,
  whatsNext,
  relatedSection,
  page,
} from './mdx.mjs';
import { paramsFromInputSchema, exampleArgs } from './schema.mjs';
import { escapeProse } from './util.mjs';

const TOOLS_DIR = 'mcp/tools';

export function toolPagePath(item) {
  return `${TOOLS_DIR}/${item.categorySlug}/${item.name}`;
}

function groupByCategory(catalog) {
  const map = {};
  for (const item of catalog.items) (map[item.category] ||= []).push(item);
  return map;
}

/** Related links: overlay entries plus tools referenced by name in this tool's description. */
function relatedLinksMcp(item, ctx, o) {
  const links = [];
  const seen = new Set();
  for (const r of o.related || []) {
    if (r && r.href && !seen.has(r.href)) {
      links.push(r);
      seen.add(r.href);
    }
  }
  const hrefByName = (ctx && ctx.hrefByName) || new Map();
  const desc = item.description || '';
  const hits = [];
  for (const [name, href] of hrefByName) {
    if (name === item.name || seen.has(href)) continue;
    const idx = desc.search(new RegExp('\\b' + name + '\\b'));
    if (idx >= 0) hits.push({ name, href, idx });
  }
  hits.sort((a, b) => a.idx - b.idx);
  for (const h of hits.slice(0, 6)) {
    if (!seen.has(h.href)) {
      links.push({ title: `\`${h.name}\``, href: h.href });
      seen.add(h.href);
    }
  }
  return links;
}

/** Full MDX page for a single tool. */
export function renderToolPage(item, ctx = {}) {
  const params = paramsFromInputSchema(item.inputSchema);
  const o = item.overlay || {};
  const lead = escapeProse(o.summary || item.summary || `Kapptivate MCP tool \`${item.name}\`.`);

  const sections = [
    frontmatter({
      title: item.name,
      description: item.summary || `Kapptivate MCP tool ${item.name}.`,
      sidebarTitle: item.name,
    }),
    BANNER,
    lead,
    annotationCallout(item.annotations),
  ];

  // Parameters
  if (params.rows.length) {
    const parts = ['## Parameters', '', paramTable(params.rows)];
    for (const st of params.subtables) {
      parts.push('', `**${st.title}**`, '', paramTable(st.rows, { requiredColumn: false }));
    }
    sections.push(parts.join('\n'));
  } else {
    sections.push('## Parameters\n\nThis tool takes no arguments.');
  }

  // Example
  if (Array.isArray(o.examples) && o.examples.length) {
    const parts = ['## Example'];
    for (const ex of o.examples) {
      if (ex.title) parts.push('', `**${escapeProse(ex.title)}**`);
      parts.push('', codeBlock(ex.lang || 'json', ex.code));
    }
    sections.push(parts.join('\n'));
  } else {
    const args = exampleArgs(item.inputSchema);
    sections.push(
      [
        '## Example arguments',
        '',
        'Illustrative arguments an agent supplies when calling this tool:',
        '',
        codeBlock('json', JSON.stringify(args, null, 2)),
      ].join('\n')
    );
  }

  // Full description (verbatim, fenced so LLM-oriented text with braces/tags never breaks MDX),
  // unless a human overlay supplies clean prose.
  if (o.description) {
    sections.push(['## Description', '', o.description].join('\n'));
  } else {
    let body = (item.description || '').trim();
    const sum = (item.summary || '').trim();
    if (sum && body.startsWith(sum)) body = body.slice(sum.length).trim(); // drop the lead sentence repeated above
    if (body) sections.push(['## Description', '', codeBlock('text', body)].join('\n'));
  }

  // Notes (overlay only)
  const notes = o.notes || [];
  if (notes.length) {
    sections.push(['## Notes', '', ...notes.map((n) => `- ${n}`)].join('\n'));
  }

  // Related: overlay links plus tools referenced in this tool's description.
  const rel = relatedSection(relatedLinksMcp(item, ctx, o));
  if (rel) sections.push(rel);

  sections.push(
    whatsNext([
      card({
        title: 'All MCP tools',
        icon: 'robot',
        href: '/mcp/tools/overview',
        body: 'Browse the full tool reference by category.',
      }),
      card({
        title: 'Connect a client',
        icon: 'plug',
        href: '/mcp/connect',
        body: 'Point Claude, Cursor, or Claude Code at the server.',
      }),
    ])
  );

  return { path: toolPagePath(item), content: page(sections) };
}

/** The tools landing page: one card per category. */
export function renderToolsOverview(catalog) {
  const byCat = groupByCategory(catalog);
  const cards = [];
  for (const c of catalog.categories.order) {
    const items = byCat[c];
    if (!items || !items.length) continue;
    const meta = catalog.categories.meta[c];
    cards.push(
      card({
        title: c,
        icon: meta.icon,
        href: '/' + toolPagePath(items[0]),
        body: `${meta.description} (${items.length} tools)`,
      })
    );
  }
  const sections = [
    frontmatter({
      title: 'MCP tools reference',
      description: `All ${catalog.items.length} Kapptivate MCP tools, grouped by category.`,
      sidebarTitle: 'Overview',
    }),
    BANNER,
    `The Kapptivate MCP server exposes **${catalog.items.length} tools** across ${cards.length} categories. Pick a category to browse, or use the sidebar.`,
    ['## Browse by category', '', columns(cards, 2)].join('\n'),
    whatsNext([
      card({
        title: 'Connect a client',
        icon: 'plug',
        href: '/mcp/connect',
        body: 'Set up Claude, Cursor, or Claude Code against the server.',
      }),
      card({
        title: 'Core concepts',
        icon: 'sitemap',
        href: '/mcp/concepts',
        body: 'Operators, products, variables, and the safety model.',
      }),
    ]),
  ];
  return { path: `${TOOLS_DIR}/overview`, content: page(sections) };
}

/** Nav `pages` array for the generated "Tools Reference" group. */
export function navPages(catalog) {
  const byCat = groupByCategory(catalog);
  const pages = [`${TOOLS_DIR}/overview`];
  for (const c of catalog.categories.order) {
    const items = byCat[c];
    if (!items || !items.length) continue;
    pages.push({ group: c, pages: items.map(toolPagePath) });
  }
  return pages;
}

/** All page artifacts for the MCP catalog: [{path, content}]. */
export function renderMcp(catalog) {
  const ctx = { hrefByName: new Map(catalog.items.map((i) => [i.name, '/' + toolPagePath(i)])) };
  return [renderToolsOverview(catalog), ...catalog.items.map((i) => renderToolPage(i, ctx))];
}
