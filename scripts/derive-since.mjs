#!/usr/bin/env node
// Derive "introduced in version" per MCP tool from the kapptivate-cli git history.
//
// The live MCP server and the ktm CLI do not expose a per-item version, so this is a
// one-time / periodic bootstrap that needs the CLI *source* repo. It maps each tool's
// introducing commit (first appearance of `NewTool("<name>"`) to the earliest release
// tag that contains it, and writes mcp/.catalog/since.json (consumed by generate.mjs).
//
// Run:  node scripts/derive-since.mjs   (env KAPPTIVATE_CLI_DIR to override the repo path)
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readJSON, writeJSON } from './lib/util.mjs';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const CLI = process.env.KAPPTIVATE_CLI_DIR || '/Users/yashazari/Desktop/Workspace/kapptivate-cli';

const git = (args) =>
  execFileSync('git', ['-C', CLI, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();

/** Reduce a messy tag (v1.3.1-test.v2.beta.4) to a clean display version (v1.3.1). */
function normalizeTag(tag) {
  if (!tag) return null;
  const m = tag.match(/v?(\d+)\.(\d+)\.(\d+)/);
  return m ? `v${m[1]}.${m[2]}.${m[3]}` : null;
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

const catalog = await readJSON(path.join(ROOT, 'mcp/.catalog/catalog.json'));
const since = {};
let found = 0;
for (const item of catalog.items) {
  const v = sinceForTool(item.name);
  if (v) {
    since[item.name] = v;
    found++;
  }
  process.stdout.write(`\r  deriving… ${found} of ${catalog.items.length}`);
}
process.stdout.write('\n');

// Sort keys for a deterministic file.
const sorted = {};
for (const k of Object.keys(since).sort()) sorted[k] = since[k];
await writeJSON(path.join(ROOT, 'mcp/.catalog/since.json'), sorted);
console.log(`Wrote mcp/.catalog/since.json (${found}/${catalog.items.length} tools with a known version).`);
