// Inject a generator-owned group into a parsed docs.json without disturbing curated groups.

/**
 * Mutate `doc` in place: replace (or create) a named group's `pages` within a given tab.
 * Only the targeted group is touched; curated groups are left intact. Pure (no I/O) so the
 * caller controls reading/serializing docs.json and can apply several groups in one pass.
 */
export function applyNav(doc, { tab, group, icon, pages, afterGroup }) {
  const tabs = doc.navigation && doc.navigation.tabs;
  if (!Array.isArray(tabs)) throw new Error('docs.json: navigation.tabs missing');
  const t = tabs.find((x) => x.tab === tab);
  if (!t) throw new Error(`docs.json: tab "${tab}" not found`);
  t.groups = t.groups || [];

  let g = t.groups.find((x) => x.group === group);
  if (!g) {
    g = { group };
    if (icon) g.icon = icon;
    g.pages = [];
    const afterIdx = afterGroup ? t.groups.findIndex((x) => x.group === afterGroup) : -1;
    if (afterIdx >= 0) t.groups.splice(afterIdx + 1, 0, g);
    else t.groups.push(g);
  }
  if (icon) g.icon = icon;
  g.pages = pages;
  return doc;
}
