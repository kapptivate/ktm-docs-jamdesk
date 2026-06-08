// MCP introspection adapter: produce a normalized catalog from the live server (or a saved dump).
// Zero dependencies — uses global fetch (Node 18+). Validated against the streamable-HTTP server.
import { readJSON, summarize } from '../lib/util.mjs';

const PROTOCOL = '2025-06-18';

/** Parse a JSON-RPC response body that may be plain JSON or an SSE stream. */
function parseRpc(text, contentType) {
  const t = (text || '').trim();
  if (!t) return null;
  const isSse = (contentType && contentType.includes('text/event-stream')) || /^(event|data):/m.test(t);
  if (isSse) {
    const data = t
      .split('\n')
      .filter((l) => l.startsWith('data:'))
      .map((l) => l.slice(5).trim())
      .filter(Boolean);
    return data.length ? JSON.parse(data[data.length - 1]) : null;
  }
  return JSON.parse(t);
}

async function post(url, headers, body) {
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok && res.status !== 202) {
    throw new Error(`MCP request failed (${res.status} ${res.statusText}): ${text.slice(0, 300)}`);
  }
  return { res, json: parseRpc(text, res.headers.get('content-type') || '') };
}

/** Live introspection: initialize → notifications/initialized → tools/list (paginated). */
export async function introspectLive({ url, apiKey }) {
  if (!apiKey) throw new Error('KAPPTIVATE_API_KEY is required for live MCP introspection');
  const base = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    'X-Kapptivate-API-Key': apiKey,
  };

  const init = await post(url, base, {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: PROTOCOL,
      capabilities: {},
      clientInfo: { name: 'kapptivate-docs-generator', version: '1.0.0' },
    },
  });
  if (init.json && init.json.error) throw new Error('initialize: ' + JSON.stringify(init.json.error));
  const serverInfo = (init.json && init.json.result && init.json.result.serverInfo) || {};
  const instructions = (init.json && init.json.result && init.json.result.instructions) || '';

  const headers = { ...base, 'MCP-Protocol-Version': PROTOCOL };
  const sid = init.res.headers.get('mcp-session-id');
  if (sid) headers['Mcp-Session-Id'] = sid;

  await post(url, headers, { jsonrpc: '2.0', method: 'notifications/initialized' });

  const tools = [];
  let cursor;
  do {
    const resp = await post(url, headers, {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: cursor ? { cursor } : {},
    });
    if (resp.json && resp.json.error) throw new Error('tools/list: ' + JSON.stringify(resp.json.error));
    const result = (resp.json && resp.json.result) || {};
    for (const t of result.tools || []) tools.push(t);
    cursor = result.nextCursor;
  } while (cursor);

  return { serverInfo, instructions, tools };
}

/** Offline introspection: read a saved tools/list response (raw array, {tools}, or {result:{tools}}). */
export async function introspectFile({ file }) {
  const data = await readJSON(file);
  const tools = Array.isArray(data) ? data : (data.result && data.result.tools) || data.tools || [];
  const serverInfo = data.serverInfo || (data.result && data.result.serverInfo) || {};
  const instructions = data.instructions || (data.result && data.result.instructions) || '';
  return { serverInfo, instructions, tools };
}

export async function introspectMcp({ mode = 'live', url, apiKey, file }) {
  if (mode === 'file') return introspectFile({ file });
  return introspectLive({ url, apiKey });
}

/** Strip shared boilerplate lead sentences so the summary states the tool's actual purpose. */
function cleanLead(desc) {
  let d = (desc || '').trim();
  d = d.replace(/^Returns compact summaries by default[^.]*\.\s*/i, '');
  d = d.replace(/^Use\s+detail=true[^.]*\.\s*/i, '');
  return d;
}

/** Normalize raw tools into the deterministic catalog IR (sorted by category order, then name). */
export function normalizeMcp({ serverInfo, tools }, categories, { source }) {
  const items = tools.map((t) => {
    const category = categories.assign[t.name] || 'Other';
    const meta = categories.meta[category] || { slug: 'other' };
    return {
      id: t.name,
      name: t.name,
      title: t.title || t.name,
      category,
      categorySlug: meta.slug || 'other',
      summary: summarize(cleanLead(t.description) || t.description || t.title || t.name),
      description: t.description || '',
      annotations: t.annotations || {},
      inputSchema: t.inputSchema || { type: 'object', properties: {} },
    };
  });

  const order = categories.order;
  const idx = (c) => {
    const i = order.indexOf(c);
    return i < 0 ? order.length : i;
  };
  items.sort((a, b) => idx(a.category) - idx(b.category) || a.name.localeCompare(b.name));

  const unmapped = items.filter((i) => i.category === 'Other').map((i) => i.name);
  return {
    catalog: {
      meta: {
        kind: 'mcp',
        source,
        serverName: serverInfo.name || 'ktm',
        serverVersion: serverInfo.version || '',
        count: items.length,
      },
      categories: { order: categories.order, meta: categories.meta },
      items,
    },
    warnings: unmapped.length
      ? [`Unmapped MCP tools (assigned to "Other"): ${unmapped.join(', ')} — add them to scripts/mcp/categories.json`]
      : [],
  };
}
