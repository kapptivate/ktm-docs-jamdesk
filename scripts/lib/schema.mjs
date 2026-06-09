// Convert MCP JSON Schema (inputSchema) into renderable parameter rows.
import { oneLine, placeholderForType } from './util.mjs';

/** Format a JSON Schema property into a human type string, inlining enums and array item types. */
export function formatType(p) {
  if (!p) return 'any';
  let t = Array.isArray(p.type) ? p.type.join(' | ') : p.type;
  if (!t && Array.isArray(p.enum)) t = 'string';
  if (Array.isArray(p.enum) && p.enum.length) {
    return `${t || 'string'} (${p.enum.join(' | ')})`;
  }
  if (t === 'array' && p.items && p.items.type) return `${p.items.type}[]`;
  return t || 'any';
}

function rowFor(name, p, requiredSet) {
  return {
    name,
    type: formatType(p),
    required: requiredSet.has(name),
    default: p && p.default,
    description: oneLine((p && p.description) || ''),
  };
}

function objectRows(schema) {
  const props = (schema && schema.properties) || {};
  const required = new Set((schema && schema.required) || []);
  return Object.keys(props).map((n) => rowFor(n, props[n] || {}, required));
}

/**
 * Turn an inputSchema into a top-level row list plus any nested-object subtables.
 * Returns { rows, subtables: [{ title, rows }] }. Property order is preserved from the schema.
 */
export function paramsFromInputSchema(inputSchema) {
  const props = (inputSchema && inputSchema.properties) || {};
  const required = new Set((inputSchema && inputSchema.required) || []);
  const rows = [];
  const subtables = [];
  for (const name of Object.keys(props)) {
    const p = props[name] || {};
    rows.push(rowFor(name, p, required));
    if (p.type === 'object' && p.properties) {
      subtables.push({ title: `\`${name}\` object fields`, rows: objectRows(p) });
    } else if (p.type === 'array' && p.items && p.items.type === 'object' && p.items.properties) {
      subtables.push({ title: `\`${name}\` item fields`, rows: objectRows(p.items) });
    }
  }
  return { rows, subtables };
}

/** Synthesize a minimal example arguments object from the schema's required params (or first two). */
export function exampleArgs(inputSchema) {
  const props = (inputSchema && inputSchema.properties) || {};
  const required = (inputSchema && inputSchema.required) || [];
  const names = required.length ? required : Object.keys(props).slice(0, 2);
  const out = {};
  for (const n of names) {
    const p = props[n] || {};
    out[n] = placeholderForType(p.type, p.enum);
  }
  return out;
}
