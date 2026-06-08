// Shared utilities for the documentation generator. Zero dependencies (Node 18+).
import { promises as fs } from 'node:fs';
import path from 'node:path';

/** Read and parse a JSON file. */
export async function readJSON(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

/** Read a JSON file, returning `fallback` if it does not exist. */
export async function readJSONOptional(file, fallback) {
  try {
    return await readJSON(file);
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

/** Write a string to a file, creating parent directories. Returns true if the content changed. */
export async function writeFileEnsured(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  let prev = null;
  try {
    prev = await fs.readFile(file, 'utf8');
  } catch {
    /* new file */
  }
  if (prev === content) return false;
  await fs.writeFile(file, content);
  return true;
}

/** Write a value as pretty JSON with a trailing newline. */
export async function writeJSON(file, value) {
  return writeFileEnsured(file, JSON.stringify(value, null, 2) + '\n');
}

/** Recursively delete a directory if it exists. */
export async function rmDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

/** List `.mdx` files under a directory (recursive), relative to it. Empty if missing. */
export async function listMdx(dir) {
  const out = [];
  async function walk(d, rel) {
    let entries;
    try {
      entries = await fs.readdir(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) await walk(path.join(d, e.name), r);
      else if (e.name.endsWith('.mdx')) out.push(r);
    }
  }
  await walk(dir, '');
  return out.sort();
}

/** Slugify a string for use in a file path or URL segment. */
export function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Collapse all runs of whitespace (including newlines) into single spaces. */
export function oneLine(s) {
  return String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
}

/** First sentence / first line of a description, for use as a one-line summary. */
export function summarize(description) {
  const text = String(description == null ? '' : description).trim();
  if (!text) return '';
  const firstPara = text.split(/\n\s*\n/)[0].trim();
  const firstLine = firstPara.split('\n')[0].trim();
  const m = firstLine.match(/^(.*?[.!?])(\s|$)/);
  return oneLine(m ? m[1] : firstLine);
}

/** Escape a value for safe inclusion in a Markdown table cell. */
export function escapeCell(s) {
  return oneLine(s)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}

/** Escape text used in MDX prose (outside code) so JSX braces/angle-brackets do not break parsing. */
export function escapeProse(s) {
  return String(s == null ? '' : s)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}

/** Deterministic placeholder value for a JSON type, used to synthesize example payloads. */
export function placeholderForType(type, enumValues) {
  if (Array.isArray(enumValues) && enumValues.length) return enumValues[0];
  switch (type) {
    case 'number':
    case 'integer':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return 'string';
  }
}
