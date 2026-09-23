// Human-authored enrichment applied on top of the generated catalog.
// The overlay is a committed JSON file; editing it never gets clobbered by regeneration.
//
// Shape:
// {
//   "tools":   { "<name>":    { summary?, metaDescription?, description?, examples?: [{title?, lang?, code}], notes?: [string], related?: [{title, href}] } },
//   "commands":{ "<id>":      { summary?, metaDescription?, description?, examples?: [string], notes?: [string], related?: [{title, href}] } },
//   "overview": { description? }   // the section's landing page (cli/commands/overview, mcp/tools/overview)
// }
//
// `summary` is the page's lead paragraph. `metaDescription` is the frontmatter description
// only: it is what Google shows as the snippet and what llms.txt lists, and it is usually
// longer and more explicit than the lead. Without it the description falls back to `summary`,
// then to the upstream one-liner.
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
