// Render a normalized CLI catalog into MDX pages.
import { frontmatter, BANNER, table, codeBlock, card, columns, whatsNext, page } from './mdx.mjs';
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

function detailsBlock(item) {
  const desc = (item.description || '').trim();
  if (!desc) return null;
  // Drop the first line when it merely repeats the summary.
  const lines = desc.split('\n');
  if (lines[0].trim() === (item.summary || '').trim()) lines.shift();
  const body = lines.join('\n').trim();
  if (!body) return null;
  return ['## Details', '', escapeProse(body)].join('\n');
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
  return [renderCommandsOverview(catalog), ...catalog.items.map((i) => renderCommandPage(i, { byId }))];
}
