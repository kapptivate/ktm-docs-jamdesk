// Inject a generator-owned group into a parsed docs.json without disturbing curated groups.

/** Locate the tab list the generator owns. Supports the flat schema (`navigation.tabs`) and
 *  the i18n schema (`navigation.languages[].tabs`). The generated MCP/CLI reference is
 *  English-only, so in the i18n case we target the `en` language; the `fr` mirror's nav is
 *  owned by the translation pipeline, not this generator. */
function ownedTabs(doc) {
  const nav = doc.navigation || {};
  if (Array.isArray(nav.tabs)) return nav.tabs;
  if (Array.isArray(nav.languages)) {
    const en = nav.languages.find((l) => l.language === 'en');
    if (en && Array.isArray(en.tabs)) return en.tabs;
    throw new Error("docs.json: no 'en' language in navigation.languages");
  }
  throw new Error('docs.json: navigation.tabs or navigation.languages missing');
}

/**
 * Mutate `doc` in place: replace (or create) a named group's `pages` within a given tab.
 * Only the targeted group is touched; curated groups are left intact. Pure (no I/O) so the
 * caller controls reading/serializing docs.json and can apply several groups in one pass.
 */
export function applyNav(doc, { tab, group, icon, pages, afterGroup }) {
  const tabs = ownedTabs(doc);
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
