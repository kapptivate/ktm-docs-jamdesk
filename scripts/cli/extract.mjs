// CLI introspection adapter: walk the `ktm` Cobra command tree via `--help` and normalize it.
// Works on any ktm binary (local native build or the prod Linux binary in CI) — same help format.
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { oneLine, slugify, readJSON } from '../lib/util.mjs';

const SKIP = new Set(['help', 'completion']);
const SECTION_LABELS = ['Usage:', 'Aliases:', 'Examples:', 'Available Commands:', 'Flags:', 'Global Flags:'];

/** Resolve a runnable ktm binary: $KTM_BIN if set, else download $KTM_CLI_URL to a temp file. */
async function ensureBinary({ bin, url }) {
  if (bin) return bin;
  if (!url) throw new Error('CLI: set KTM_BIN (path) or KTM_CLI_URL (download)');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CLI: download failed ${res.status} from ${url}`);
  const file = path.join(os.tmpdir(), 'ktm-docs-cli-bin');
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  await fs.chmod(file, 0o755);
  return file;
}

function runHelp(bin, pathArr) {
  try {
    return execFileSync(bin, [...pathArr, '--help'], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  } catch (err) {
    // Cobra prints help to stdout even when the process exits non-zero in some shells.
    if (err.stdout) return err.stdout.toString();
    throw new Error(`CLI: '${['ktm', ...pathArr, '--help'].join(' ')}' failed: ${err.message}`);
  }
}

function parseFlags(lines) {
  const out = [];
  for (const ln of lines) {
    const m = ln.match(/^\s*(?:-(\w), )?--([\w-]+)(?:\s+([A-Za-z][\w[\]]*))?\s{2,}(.*)$/);
    if (!m) continue;
    const [, short, long, type, descRaw] = m;
    if (long === 'help') continue;
    let desc = descRaw.trim();
    let def = null;
    const dm = desc.match(/\(default (.+)\)\s*$/);
    if (dm) {
      def = dm[1].replace(/^"|"$/g, '');
      desc = desc.slice(0, dm.index).trim();
    }
    out.push({ short: short || null, long, type: type || 'bool', default: def, description: oneLine(desc) });
  }
  return out;
}

function parsePositional(usageLine) {
  const args = [];
  const re = /(<[^>]+>|\[[^\]]+\])/g;
  let m;
  while ((m = re.exec(usageLine))) {
    const tok = m[1];
    if (/\[(flags|command)\]/.test(tok)) continue;
    args.push({ name: tok.slice(1, -1), required: tok.startsWith('<') });
  }
  return args;
}

function parseHelp(text) {
  const lines = text.split('\n');
  const sections = { _desc: [] };
  let cur = '_desc';
  for (const ln of lines) {
    const t = ln.trim();
    if (SECTION_LABELS.includes(t)) {
      cur = t;
      sections[cur] = [];
      continue;
    }
    if (/^Use ".*--help"/.test(t)) {
      cur = '_footer';
      sections[cur] = [];
      continue;
    }
    (sections[cur] ||= []).push(ln);
  }
  const desc = (sections._desc || []).join('\n').trim();
  const usageLines = (sections['Usage:'] || []).map((l) => l.trim()).filter(Boolean);
  const leafUsage = usageLines.find((u) => u.includes('[flags]')) || usageLines.find((u) => !u.includes('[command]')) || usageLines[0] || '';
  const subs = (sections['Available Commands:'] || [])
    .map((l) => {
      // Single space is enough: Cobra pads the longest name in a group with just one space.
      const m = l.match(/^\s{2,}(\S+)\s+(.*)$/);
      return m ? { name: m[1], short: oneLine(m[2]) } : null;
    })
    .filter(Boolean)
    .filter((s) => !SKIP.has(s.name));
  return {
    ownShort: desc.split('\n')[0].trim(),
    description: desc,
    usage: leafUsage,
    hasSub: usageLines.some((u) => u.includes('[command]')),
    subs,
    flags: parseFlags(sections['Flags:'] || []),
    globalFlags: parseFlags(sections['Global Flags:'] || []),
    examples: (sections['Examples:'] || []).join('\n').replace(/^\n+|\n+$/g, ''),
    aliases: oneLine((sections['Aliases:'] || []).join(' ')),
    args: parsePositional(leafUsage),
  };
}

function walk(bin, pathArr, shortFromParent, sink, globalFlagsRef) {
  const parsed = parseHelp(runHelp(bin, pathArr));
  if (!globalFlagsRef.value.length && parsed.globalFlags.length) globalFlagsRef.value = parsed.globalFlags;
  const node = {
    path: pathArr,
    name: ['ktm', ...pathArr].join(' '),
    summary: oneLine(shortFromParent || parsed.ownShort),
    description: parsed.description,
    usage: parsed.usage || ['ktm', ...pathArr].join(' '),
    aliases: parsed.aliases,
    args: parsed.args,
    flags: parsed.flags,
    isLeaf: !parsed.hasSub,
    subcommands: parsed.subs.map((s) => s.name),
  };
  sink.push(node);
  for (const s of parsed.subs) walk(bin, [...pathArr, s.name], s.short, sink, globalFlagsRef);
}

/** Walk the tree from the binary, or read a previously captured catalog (file mode). */
export async function introspectCli({ mode = 'binary', bin, url, file }) {
  if (mode === 'file') {
    const data = await readJSON(file);
    return { nodes: data.nodes || data.items || [], globalFlags: data.globalFlags || [], topOrder: data.topOrder || [] };
  }
  const exe = await ensureBinary({ bin, url });
  const root = parseHelp(runHelp(exe, []));
  const nodes = [];
  const globalFlagsRef = { value: [] };
  const topOrder = root.subs.map((s) => s.name);
  for (const s of root.subs) walk(exe, [s.name], s.short, nodes, globalFlagsRef);
  return { nodes, globalFlags: globalFlagsRef.value, topOrder };
}

/** Normalize the walked tree into the deterministic CLI catalog IR. */
export function normalizeCli({ nodes, globalFlags, topOrder }, { source }) {
  const items = nodes.map((n) => ({
    id: n.path.join('_'),
    name: n.name,
    path: n.path,
    top: n.path[0],
    slug: n.path.map(slugify).join('/'),
    summary: n.summary,
    description: n.description,
    usage: n.usage,
    aliases: n.aliases,
    args: n.args,
    flags: n.flags,
    isLeaf: n.isLeaf,
    subcommands: n.subcommands,
  }));
  return {
    catalog: {
      meta: { kind: 'cli', source, cliName: 'ktm', count: items.length },
      globalFlags,
      topOrder,
      items,
    },
    warnings: [],
  };
}
