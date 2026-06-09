#!/usr/bin/env node
// Actions-agnostic documentation generator for the Kapptivate MCP server and CLI.
//
// Usage:
//   node scripts/generate.mjs [--source=all|mcp|cli] [--mode=live|file] [--file=PATH] [--check]
//
// Sources are read from prod by default:
//   MCP  — live `tools/list` against $MCP_URL using $KAPPTIVATE_API_KEY (X-Kapptivate-API-Key header).
//   CLI  — the `ktm` binary's --help tree ($KTM_BIN path, or downloaded $KTM_CLI_URL on Linux CI).
//
// --check regenerates in memory and exits non-zero if committed docs are stale (drift gate).
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readJSON, writeFileEnsured, rmDir, listMdx } from './lib/util.mjs';
import { loadOverlay, attachOverlay } from './lib/overlay.mjs';
import { applyNav } from './lib/nav.mjs';
import { introspectMcp, normalizeMcp } from './mcp/introspect.mjs';
import { renderMcp, navPages as mcpNavPages } from './lib/render-mcp.mjs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const MCP_URL = process.env.MCP_URL || 'https://mcp.kapptivate.com/mcp';
const KTM_CLI_URL =
  process.env.KTM_CLI_URL || 'https://kapptivate-tools.s3.fr-par.scw.cloud/k-cli/latest/ktm';

const MANAGED_DIRS = { mcp: 'mcp/tools', cli: 'cli/commands' };
const CATALOG = { mcp: 'mcp/.catalog/catalog.json', cli: 'cli/.catalog/catalog.json' };
const OVERLAY = { mcp: 'mcp/.catalog/overlay.json', cli: 'cli/.catalog/overlay.json' };

function parseArgs(argv) {
  const args = { source: 'all', mode: 'live', check: false };
  for (const a of argv.slice(2)) {
    if (a === '--check') args.check = true;
    else if (a.startsWith('--source=')) args.source = a.slice('--source='.length);
    else if (a.startsWith('--mode=')) args.mode = a.slice('--mode='.length);
    else if (a.startsWith('--file=')) args.file = a.slice('--file='.length);
  }
  return args;
}

// Persist the introspected IR. Drop only `categories` (MCP config derived from categories.json);
// keep meta, items, and the CLI's globalFlags/topOrder so the committed catalog is complete.
const catalogJSON = (catalog) => {
  const { categories, ...rest } = catalog;
  return JSON.stringify(rest, null, 2) + '\n';
};

/** Non-fatal overlay sanity warnings so a stale overlay surfaces without ever blocking a regen. */
function overlayWarnings(overlay, bucket, items, pageHrefs) {
  const map = (overlay && overlay[bucket]) || {};
  const ids = new Set(items.flatMap((i) => [i.id, i.name]));
  const linkRe = bucket === 'tools' ? /\/mcp\/tools\/[\w./-]+/g : /\/cli\/commands\/[\w./-]+/g;
  const noun = bucket === 'tools' ? 'tool' : 'command';
  const warns = [];
  for (const key of Object.keys(map)) {
    if (!ids.has(key)) warns.push(`overlay "${key}" matches no current ${noun} — its curation will be ignored (stale?)`);
    for (const href of JSON.stringify(map[key]).match(linkRe) || []) {
      if (!pageHrefs.has(href)) warns.push(`overlay "${key}" links to a missing page: ${href}`);
    }
  }
  return warns;
}

/** Build the MCP file set. Returns { files: Map<relPath,content>, navGroup, warnings, meta }. */
async function buildMcp(args) {
  const categories = await readJSON(path.join(ROOT, 'scripts/mcp/categories.json'));
  const raw = await introspectMcp({
    mode: args.mode,
    url: MCP_URL,
    apiKey: process.env.KAPPTIVATE_API_KEY,
    file: args.file,
  });
  const { catalog, warnings } = normalizeMcp(raw, categories, {
    source: args.mode === 'file' ? 'mcp-file' : 'mcp-live',
  });
  const overlay = await loadOverlay(path.join(ROOT, OVERLAY.mcp));
  const renderCatalog = { ...catalog, items: attachOverlay(catalog.items, overlay, 'tools') };

  const files = new Map();
  files.set(CATALOG.mcp, catalogJSON(catalog));
  for (const a of renderMcp(renderCatalog)) files.set(`${a.path}.mdx`, a.content);

  const pageHrefs = new Set([...files.keys()].filter((k) => k.endsWith('.mdx')).map((k) => '/' + k.slice(0, -4)));
  return {
    files,
    navGroup: { tab: 'MCP', group: 'Tools Reference', icon: 'robot', pages: mcpNavPages(catalog), afterGroup: 'Get started' },
    warnings: [...warnings, ...overlayWarnings(overlay, 'tools', catalog.items, pageHrefs)],
    meta: catalog.meta,
  };
}

/** Build the CLI file set. */
async function buildCli(args) {
  const { introspectCli, normalizeCli } = await import('./cli/extract.mjs');
  const { renderCli, navPages: cliNavPages } = await import('./lib/render-cli.mjs');
  const raw = await introspectCli({
    mode: args.mode === 'file' ? 'file' : 'binary',
    bin: process.env.KTM_BIN,
    url: KTM_CLI_URL,
    file: args.file,
  });
  const { catalog, warnings } = normalizeCli(raw, { source: 'cli-binary' });
  const overlay = await loadOverlay(path.join(ROOT, OVERLAY.cli));
  const renderCatalog = { ...catalog, items: attachOverlay(catalog.items, overlay, 'commands') };

  const files = new Map();
  files.set(CATALOG.cli, catalogJSON(catalog));
  for (const a of renderCli(renderCatalog)) files.set(`${a.path}.mdx`, a.content);

  const pageHrefs = new Set([...files.keys()].filter((k) => k.endsWith('.mdx')).map((k) => '/' + k.slice(0, -4)));
  return {
    files,
    navGroup: { tab: 'CLI', group: 'Command Reference', icon: 'terminal', pages: cliNavPages(catalog), afterGroup: 'Get started' },
    warnings: [...warnings, ...overlayWarnings(overlay, 'commands', catalog.items, pageHrefs)],
    meta: catalog.meta,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const sources = args.source === 'all' ? ['mcp', 'cli'] : [args.source];

  const builds = [];
  for (const s of sources) {
    if (s === 'mcp') builds.push(['mcp', await buildMcp(args)]);
    else if (s === 'cli') builds.push(['cli', await buildCli(args)]);
    else throw new Error(`unknown --source=${s}`);
  }

  // Merge all generated files, plus the single docs.json mutated for every built nav group.
  const files = new Map();
  for (const [, b] of builds) for (const [k, v] of b.files) files.set(k, v);

  const doc = JSON.parse(await fs.readFile(path.join(ROOT, 'docs.json'), 'utf8'));
  for (const [, b] of builds) applyNav(doc, b.navGroup);
  files.set('docs.json', JSON.stringify(doc, null, 2) + '\n');

  // Report warnings (e.g. unmapped tools).
  for (const [, b] of builds) for (const w of b.warnings) console.warn(`! ${w}`);

  if (args.check) {
    const drift = [];
    for (const [rel, content] of files) {
      let cur = null;
      try {
        cur = await fs.readFile(path.join(ROOT, rel), 'utf8');
      } catch {
        /* missing */
      }
      if (cur !== content) drift.push(cur === null ? `missing: ${rel}` : `changed: ${rel}`);
    }
    // Stale generated pages on disk that the catalog no longer produces.
    for (const [, b] of builds) {
      const dir = MANAGED_DIRS[b.meta.kind];
      for (const rel of (await listMdx(path.join(ROOT, dir))).map((r) => `${dir}/${r}`)) {
        if (!files.has(rel)) drift.push(`stale: ${rel}`);
      }
    }
    if (drift.length) {
      console.error(`\nDocs are out of date (${drift.length}):`);
      for (const d of drift) console.error(`  ${d}`);
      console.error('\nRun: node scripts/generate.mjs --source=all');
      process.exit(1);
    }
    console.log('Docs are up to date.');
    return;
  }

  // Write: clean managed dirs so removed tools/commands leave no stale pages, then write everything.
  for (const [, b] of builds) await rmDir(path.join(ROOT, MANAGED_DIRS[b.meta.kind]));
  let written = 0;
  for (const [rel, content] of files) if (await writeFileEnsured(path.join(ROOT, rel), content)) written++;

  // Ensure an (empty) overlay exists for each source without overwriting human edits.
  for (const [, b] of builds) {
    const ov = path.join(ROOT, OVERLAY[b.meta.kind]);
    try {
      await fs.access(ov);
    } catch {
      const bucket = b.meta.kind === 'mcp' ? 'tools' : 'commands';
      await writeFileEnsured(ov, JSON.stringify({ [bucket]: {} }, null, 2) + '\n');
    }
  }

  for (const [, b] of builds) {
    console.log(`✓ ${b.meta.kind}: ${b.meta.count} ${b.meta.kind === 'mcp' ? 'tools' : 'commands'}` + (b.meta.serverVersion ? ` (server ${b.meta.serverVersion})` : ''));
  }
  console.log(`Wrote ${written} changed file(s) of ${files.size}.`);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
