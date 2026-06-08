#!/usr/bin/env node
// Derive "introduced in version" per MCP tool from the kapptivate-cli git history.
//
// The live MCP server and the ktm CLI do not expose a per-item version, so this needs the
// CLI *source* repo. It enumerates current tools from source (`NewTool("<name>"`), maps each
// tool's introducing commit to the earliest release tag that contains it, and writes
// mcp/.catalog/since.json (consumed by generate.mjs at render time).
//
// Self-contained (no dependency on the generated catalog), so it can run before generate.mjs.
//
// Locating the CLI repo (first that exists wins):
//   1. $KAPPTIVATE_CLI_DIR
//   2. ./.kapptivate-cli        (CI: actions/checkout path)
//   3. ../kapptivate-cli        (local sibling clone)
// The checkout MUST have full history and tags (CI: fetch-depth: 0, fetch-tags: true).
//
// Run:  node scripts/derive-since.mjs
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { writeJSON } from './lib/util.mjs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');

function resolveCliDir() {
  const candidates = [
    process.env.KAPPTIVATE_CLI_DIR,
    path.join(ROOT, '.kapptivate-cli'),
    path.resolve(ROOT, '..', 'kapptivate-cli'),
  ].filter(Boolean);
  for (const c of candidates) {
    if (existsSync(path.join(c, '.git')) || existsSync(path.join(c, 'HEAD'))) return c;
  }
  throw new Error(
    'kapptivate-cli git checkout not found. Set KAPPTIVATE_CLI_DIR, or place it at ' +
      '../kapptivate-cli or ./.kapptivate-cli. Full history + tags are required.'
  );
}

const CLI = resolveCliDir();
const git = (args) =>
  execFileSync('git', ['-C', CLI, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();

console.log(`Deriving versions from ${CLI}`);
try {
  if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
    console.warn('! Shallow clone detected — version derivation needs full history + tags (use fetch-depth: 0, fetch-tags: true).');
  }
} catch {
  /* older git without --is-shallow-repository */
}

/** Reduce a messy tag (v1.3.1-test.v2.beta.4) to a clean display version (v1.3.1). */
function normalizeTag(tag) {
  const m = (tag || '').match(/v?(\d+)\.(\d+)\.(\d+)/);
  return m ? `v${m[1]}.${m[2]}.${m[3]}` : null;
}

/** Current MCP tool names, enumerated from source (excluding the deactivated widgets file). */
function toolNames() {
  let out = '';
  try {
    // tools_widgets.go holds deactivated tools that the server never registers — skip them.
    out = git(['grep', '-hE', 'NewTool\\("[a-z0-9_]+"', '--', 'internal/mcp', ':!internal/mcp/tools_widgets.go']);
  } catch {
    out = ''; // git grep exits non-zero when there are no matches
  }
  const names = new Set();
  for (const line of out.split('\n')) {
    const m = line.match(/NewTool\("([a-z0-9_]+)"/);
    if (m) names.add(m[1]);
  }
  return [...names].sort();
}

function sinceForTool(name) {
  let commit = '';
  try {
    commit = git(['log', '--reverse', '--format=%H', '-S', `NewTool("${name}"`, '--', 'internal/mcp']).split('\n')[0];
  } catch {
    return null;
  }
  if (!commit) return null;
  let tag = '';
  try {
    tag = git(['tag', '--contains', commit, '--sort=v:refname']).split('\n').filter(Boolean)[0];
  } catch {
    return null;
  }
  return normalizeTag(tag);
}

const names = toolNames();
if (!names.length) {
  throw new Error(`No NewTool("...") definitions found under internal/mcp in ${CLI}.`);
}

const since = {};
let found = 0;
for (const name of names) {
  const v = sinceForTool(name);
  if (v) {
    since[name] = v;
    found++;
  }
  process.stdout.write(`\r  deriving… ${found}/${names.length}`);
}
process.stdout.write('\n');

const sorted = {};
for (const k of Object.keys(since).sort()) sorted[k] = since[k];
await writeJSON(path.join(ROOT, 'mcp/.catalog/since.json'), sorted);
console.log(`Wrote mcp/.catalog/since.json (${found}/${names.length} tools with a known version).`);
