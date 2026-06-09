// Human-authored enrichment applied on top of the generated catalog.
// The overlay is a committed JSON file; editing it never gets clobbered by regeneration.
//
// Shape:
// {
//   "tools":   { "<name>":    { summary?, description?, examples?: [{title?, lang?, code}], notes?: [string], related?: [{title, href}] } },
//   "commands":{ "<id>":      { summary?, description?, examples?: [string], notes?: [string], related?: [{title, href}] } }
// }
import { readJSONOptional } from './util.mjs';

export async function loadOverlay(file) {
  // Resilient by design: a malformed overlay must never break an auto-update — warn and skip.
  try {
    const o = await readJSONOptional(file, {});
    return o || {};
  } catch (err) {
    console.warn(`! overlay ${file} is not valid JSON — ignoring it (${err.message})`);
    return {};
  }
}

/** Attach the matching overlay entry to each item under `item.overlay`. `bucket` is "tools" or "commands". */
export function attachOverlay(items, overlay, bucket) {
  const map = (overlay && overlay[bucket]) || {};
  return items.map((item) => ({ ...item, overlay: map[item.id] || map[item.name] || {} }));
}
