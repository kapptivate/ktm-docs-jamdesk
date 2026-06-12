// Scrub internal implementation details from upstream tool/command descriptions
// before they reach the published docs.
//
// The MCP server's tool descriptions and the ktm --help text are written by the
// platform team and sometimes mention internal service names (kcollections),
// backend REST routes ("Backed by POST /kcollections/api/..."), or spec history.
// Those belong in internal docs, not here. sanitizeText() removes them; scanLeaks()
// is the safety net that flags anything a new upstream wording slips past.

// An internal route is /api/... or /kcollections/... at the start of a word —
// a full URL like https://example.com/api/health does not match.
const ROUTE_IN = /(^|[\s"(])\/(?:api|kcollections)\//;

export function sanitizeText(input) {
  if (!input) return input;
  let s = String(input);

  // "Backed by METHOD /route ..." sentences (usually a closing paragraph).
  s = s.replace(/Backed by (?:GET|POST|PUT|PATCH|DELETE)[\s\S]*?\.(?=\s|$)/g, '');

  // Parentheticals that contain an internal route, e.g.
  // "(soft-delete via POST /kcollections/api/...)" or "(Note: /api/v2/tests/?kind=2 ...)".
  s = s.replace(/\s*\(([^()]*)\)/g, (m, inner) => (ROUTE_IN.test(' ' + inner) ? '' : m));

  // "... via the V3 endpoint /api/..." phrases inside an otherwise useful sentence.
  s = s.replace(/\s+via the [^.\n]{0,40}endpoint\s*\n?\s*\/(?:api|kcollections)\/[^\s.]*/g, '');

  // Any remaining sentence that still names an internal route, whether the route
  // opens the sentence or sits mid-sentence.
  s = s.replace(/(^|\n|\.\s+)(?:[^.\n]*\s)?\/(?:api|kcollections)\/[^.]*\.(?=\s|$)/g, '$1');

  // Spec-history chatter, e.g. "— the earlier v100 spec said ... corrected in v100.1."
  s = s.replace(/\s*[—–-]\s*the earlier[\s\S]*?spec said[\s\S]*?\.(?=\s|$)/g, '.');

  // Internal service name. "(kcollections service)" disappears; prose mentions
  // ("the kcollections service") become "the collections service".
  s = s.replace(/\s*\(kcollections service\)/g, '');
  s = s.replace(/\bkcollections\b/g, 'collections');

  // Tidy only the artifacts the removals above can create. No generic whitespace
  // collapsing: descriptions contain intentionally aligned plain-text blocks.
  s = s
    .replace(/\. {2,}/g, '. ')
    .replace(/([^\s.]) +\.(?=\s|$)/g, '$1.')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return s;
}

/** Sanitize the human-prose fields of catalog items (summaries and descriptions only). */
export function sanitizeItems(items) {
  return items.map((i) => ({
    ...i,
    summary: sanitizeText(i.summary),
    description: sanitizeText(i.description),
  }));
}

const LEAK_PATTERNS = [
  { re: /\bkcollections\b/i, label: 'internal service name "kcollections"' },
  { re: /Backed by (?:GET|POST|PUT|PATCH|DELETE)/, label: '"Backed by <METHOD> <route>"' },
  { re: /(^|[\s"(])\/kcollections\//, label: 'internal /kcollections/ route' },
  { re: /(^|[\s"(])\/api\/v?\d?[a-z0-9_/{}?=&.-]*/i, label: 'internal /api/ route' },
  { re: /app\.clickup\.com|clickup\.com\/t\//i, label: 'ClickUp ticket link' },
  { re: /linear\.app\/kapptivate/i, label: 'internal Linear link' },
  { re: /spec said/i, label: 'internal spec history' },
];

/** Return the labels of internal-leak patterns found in a rendered file. */
export function scanLeaks(text) {
  const found = [];
  for (const { re, label } of LEAK_PATTERNS) if (re.test(text)) found.push(label);
  return found;
}
