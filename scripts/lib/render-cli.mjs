// Render a normalized CLI catalog into MDX pages.
import { frontmatter, BANNER, table, codeBlock, card, columns, whatsNext, relatedSection, page } from './mdx.mjs';
import { escapeProse, escapeCell } from './util.mjs';

const CMD_DIR = 'cli/commands';

const pagePath = (item) => `${CMD_DIR}/${item.slug}`;
const flagName = (f) => (f.short ? `-${f.short}, ` : '') + `--${f.long}`;
const flagType = (t) => (t === 'bool' ? 'boolean' : t === 'strings' || t === 'stringArray' ? 'string[]' : t || 'string');

function flagTable(flags) {
  const rows = flags.map((f) => [
    `\`${escapeCell(flagName(f))}\``,
    flagType(f.type),
    f.default !== null && f.default !== undefined && f.default !== '' ? `\`${escapeCell(f.default)}\`` : '—',
    escapeCell(f.description) || '—',
  ]);
  return table(['Flag', 'Type', 'Default', 'Description'], rows);
}

/** Drop flag-entry lines (and a bare "Label:" header that only introduces them) that merely
 *  duplicate the Flags table; keep genuinely additive prose (schemas, workflows, output fields). */
function stripFlagDoc(body) {
  const lines = body.split('\n');
  // A real flag-doc entry is indented and column-aligned (>=2 spaces before its description),
  // unlike a prose line that merely wraps onto a "--flag ..." continuation.
  const isFlag = (l) => /^\s+--[a-z][\w-]*(?:\s{2,}|\s*$)/.test(l);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (isFlag(lines[i])) continue;
    // Drop a label line (e.g. "Filters:", "Sources (exactly one required):") that only introduces a flag list.
    if (lines[i].trim().endsWith(':') && isFlag(lines[i + 1] || '')) continue;
    out.push(lines[i]);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function detailsBlock(item) {
  const desc = (item.description || '').trim();
  if (!desc) return null;
  // Drop the first line when it merely repeats the summary, then strip flag-list duplication.
  const lines = desc.split('\n');
  if (lines[0].trim() === (item.summary || '').trim()) lines.shift();
  const body = stripFlagDoc(lines.join('\n').trim());
  if (!body) return null;
  return ['## Details', '', escapeProse(body)].join('\n');
}

/** Related links: overlay entries plus other commands referenced as "ktm ..." in the description. */
function relatedLinksCli(item, ctx, o) {
  const links = [];
  const seen = new Set();
  for (const r of o.related || []) {
    if (r && r.href && !seen.has(r.href)) {
      links.push(r);
      seen.add(r.href);
    }
  }
  const hrefByPath = (ctx && ctx.hrefByPath) || new Map();
  const self = item.path.join(' ');
  const re = /\bktm ((?:[a-z][\w-]*(?: |$)){1,5})/g;
  const desc = item.description || '';
  let m;
  while ((m = re.exec(desc))) {
    const words = m[1].trim().split(/\s+/);
    for (let len = Math.min(words.length, 4); len >= 1; len--) {
      const key = words.slice(0, len).join(' ');
      const href = hrefByPath.get(key);
      if (href && key !== self && !seen.has(href)) {
        links.push({ title: `\`ktm ${key}\``, href });
        seen.add(href);
        break;
      }
    }
  }
  // Also resolve quoted command references like 'operators list' or "ci run".
  const qre = /['"]([a-z][\w-]*(?: [a-z][\w-]*){0,3})['"]/g;
  while ((m = qre.exec(desc))) {
    const words = m[1].trim().split(/\s+/);
    for (let len = Math.min(words.length, 4); len >= 1; len--) {
      const key = words.slice(0, len).join(' ');
      const href = hrefByPath.get(key);
      if (href && key !== self && !seen.has(href)) {
        links.push({ title: `\`ktm ${key}\``, href });
        seen.add(href);
        break;
      }
    }
  }
  return links.slice(0, 8);
}

/** A single command page (leaf or parent). */
export function renderCommandPage(item, ctx) {
  const o = item.overlay || {};
  const last = item.path[item.path.length - 1];
  const sections = [
    frontmatter({ title: item.name, description: item.summary || item.name, sidebarTitle: last }),
    BANNER,
    escapeProse(o.summary || item.summary || item.name),
  ];
  if (item.aliases) sections.push(`<Note>Aliases: ${escapeProse(item.aliases)}</Note>`);

  sections.push(['## Usage', '', codeBlock('bash', item.usage)].join('\n'));

  if (item.isLeaf) {
    if (item.args && item.args.length) {
      const rows = item.args.map((a) => [`\`${escapeCell(a.name)}\``, a.required ? 'Yes' : 'No']);
      sections.push(['## Arguments', '', table(['Argument', 'Required'], rows)].join('\n'));
    }
    if (item.flags && item.flags.length) {
      sections.push(['## Flags', '', flagTable(item.flags)].join('\n'));
    }
    const examples = o.examples ? o.examples.join('\n\n') : item.examples;
    if (examples) sections.push(['## Examples', '', codeBlock('bash', examples)].join('\n'));
  } else {
    // Parent: list subcommands as cards.
    const cards = item.subcommands
      .map((name) => ctx.byId[[...item.path, name].join('_')])
      .filter(Boolean)
      .map((child) =>
        card({
          title: child.path[child.path.length - 1],
          icon: 'angle-right',
          href: '/' + pagePath(child),
          body: child.summary || child.name,
        })
      );
    if (cards.length) sections.push(['## Subcommands', '', columns(cards, 2)].join('\n'));
  }

  const details = o.description ? ['## Details', '', o.description].join('\n') : detailsBlock(item);
  if (details) sections.push(details);

  if (o.notes && o.notes.length) {
    sections.push(['## Notes', '', ...o.notes.map((n) => `- ${n}`)].join('\n'));
  }

  // Related: overlay links plus other commands referenced in the description.
  const rel = relatedSection(relatedLinksCli(item, ctx, o));
  if (rel) sections.push(rel);

  sections.push(
    `<Note>\n  Global flags (\`--output\`, \`--debug\`, \`--host\`, …) apply to every command. See the [command reference overview](/cli/commands/overview).\n</Note>`
  );

  sections.push(
    whatsNext([
      card({ title: 'All commands', icon: 'terminal', href: '/cli/commands/overview', body: 'Browse the full CLI reference.' }),
      card({ title: 'Get started', icon: 'rocket', href: '/cli/getting-started', body: 'Install the CLI and authenticate.' }),
    ])
  );

  return { path: pagePath(item), content: page(sections) };
}

/** The command reference landing page: global flags + a card per top-level command. */
export function renderCommandsOverview(catalog) {
  const tops = catalog.topOrder
    .map((t) => catalog.items.find((i) => i.path.length === 1 && i.path[0] === t))
    .filter(Boolean);
  const cards = tops.map((t) =>
    card({ title: t.path[0], icon: 'angle-right', href: '/' + pagePath(t), body: t.summary || t.name })
  );
  const sections = [
    frontmatter({
      title: 'CLI command reference',
      description: `Every ktm command, grouped by resource (${tops.length} top-level commands).`,
      sidebarTitle: 'Overview',
    }),
    BANNER,
    `The \`ktm\` CLI groups commands by resource. It exposes **${catalog.items.length} commands** across ${tops.length} top-level groups. Pick a group below, or use the sidebar.`,
  ];
  if (catalog.globalFlags && catalog.globalFlags.length) {
    sections.push(
      ['## Global flags', '', 'These flags apply to every command:', '', flagTable(catalog.globalFlags)].join('\n')
    );
  }
  sections.push(['## Commands', '', columns(cards, 2)].join('\n'));
  sections.push(
    whatsNext([
      card({ title: 'Get started', icon: 'rocket', href: '/cli/getting-started', body: 'Install the CLI and authenticate.' }),
      card({ title: 'CI/CD', icon: 'gear', href: '/cli/ci-cd', body: 'Run tests from your pipeline.' }),
    ])
  );
  return { path: `${CMD_DIR}/overview`, content: page(sections) };
}

/** Nav `pages` for the generated "Command Reference" group, grouped by top-level command. */
export function navPages(catalog) {
  const pages = [`${CMD_DIR}/overview`];
  for (const top of catalog.topOrder) {
    const group = catalog.items.filter((i) => i.top === top);
    if (!group.length) continue;
    if (group.length === 1) pages.push(pagePath(group[0]));
    else pages.push({ group: top, pages: group.map(pagePath) });
  }
  return pages;
}

/** All page artifacts for the CLI catalog. */
export function renderCli(catalog) {
  const byId = Object.fromEntries(catalog.items.map((i) => [i.id, i]));
  const hrefByPath = new Map(catalog.items.map((i) => [i.path.join(' '), '/' + pagePath(i)]));
  const ctx = { byId, hrefByPath };
  return [renderCommandsOverview(catalog), ...catalog.items.map((i) => renderCommandPage(i, ctx))];
}
