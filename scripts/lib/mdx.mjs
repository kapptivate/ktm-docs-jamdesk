// MDX building blocks shared by the MCP and CLI renderers.
import { escapeCell } from './util.mjs';

/** Banner placed at the top of every generated page so humans know not to edit it. */
export const BANNER =
  '{/* GENERATED FILE — do not edit by hand. Regenerate with: node scripts/generate.mjs */}';

/** Build YAML frontmatter. Values are emitted as double-quoted scalars (JSON strings are valid YAML). */
export function frontmatter({ title, description, sidebarTitle }) {
  const lines = ['---', `title: ${JSON.stringify(title)}`];
  if (description) lines.push(`description: ${JSON.stringify(description)}`);
  if (sidebarTitle) lines.push(`sidebarTitle: ${JSON.stringify(sidebarTitle)}`);
  lines.push('---');
  return lines.join('\n');
}

/** A Markdown table. `headers` is a string[]; `rows` is an array of pre-formatted string[]. */
export function table(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

/** Render a parameter/flag row list into a table. Each row: {name, type, required, default, description}. */
export function paramTable(rows, { requiredColumn = true } = {}) {
  const headers = requiredColumn
    ? ['Field', 'Type', 'Required', 'Description']
    : ['Field', 'Type', 'Description'];
  const body = rows.map((r) => {
    const desc = [escapeCell(r.description)];
    if (r.default !== undefined && r.default !== null && r.default !== '') {
      desc.push(`Default: \`${escapeCell(r.default)}\`.`);
    }
    const cells = [`\`${escapeCell(r.name)}\``, escapeCell(r.type)];
    if (requiredColumn) cells.push(r.required ? 'Yes' : 'No');
    cells.push(desc.join(' ').trim() || '—');
    return cells;
  });
  return table(headers, body);
}

/** A callout summarizing MCP tool safety annotations. */
export function annotationCallout(a = {}) {
  const flags = [];
  flags.push(a.readOnlyHint ? 'Read-only' : 'Writes data');
  if (a.idempotentHint) flags.push('Idempotent');
  if (a.openWorldHint) flags.push('Calls external systems');
  const line = flags.join(' · ');
  if (a.destructiveHint) {
    return `<Warning>\n  **Destructive · ${line}.** This tool can modify or delete data. Review the arguments before letting an agent call it.\n</Warning>`;
  }
  if (a.readOnlyHint) {
    return `<Note>\n  **${line}.** Safe to call: this tool does not modify data.\n</Note>`;
  }
  return `<Info>\n  **${line}.**\n</Info>`;
}

/** A fenced code block. The fence is longer than any backtick run inside, so embedded ``` is safe. */
export function codeBlock(lang, content) {
  const s = String(content == null ? '' : content);
  const longest = (s.match(/`+/g) || []).reduce((m, r) => Math.max(m, r.length), 0);
  const fence = '`'.repeat(Math.max(3, longest + 1));
  return `${fence}${lang}\n${s}\n${fence}`;
}

/** A single Card (must live inside a Columns wrapper). */
export function card({ title, icon, href, body }) {
  return [
    `  <Card title=${JSON.stringify(title)}${icon ? ` icon=${JSON.stringify(icon)}` : ''} href=${JSON.stringify(href)}>`,
    `    ${body}`,
    '  </Card>',
  ].join('\n');
}

/** A Columns grid of cards. */
export function columns(cards, cols = 2) {
  return [`<Columns cols={${cols}}>`, cards.join('\n'), '</Columns>'].join('\n');
}

/** The standard closing "What's Next?" section. `cards` is an array of card() strings. */
export function whatsNext(cards, cols = 2) {
  return [`## What's Next?`, '', columns(cards, cols)].join('\n');
}

/** Join page sections with blank lines and end with a single trailing newline. */
export function page(sections) {
  return sections.filter(Boolean).join('\n\n') + '\n';
}
