#!/usr/bin/env node
/**
 * Build: reads content/*.json → generates city-month HTML files
 * and updates the PAGES array in index.html.
 *
 * Usage:  node scripts/build.js
 *         npm run build
 *
 * Adding a new city: create content/{city}-{month}.json, run build.
 *
 * Content must satisfy content/content-standard.md. Structural violations
 * fail the build; length targets warn. Nothing reaches the site unvalidated.
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const root       = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');

const MONTH_ORDER = [
  'January', 'February', 'March',     'April',   'May',      'June',
  'July',    'August',   'September', 'October', 'November', 'December',
];

// ── Archetype palette ────────────────────────────────────────────────
// Accent color encodes archetype rather than city, so color means the same
// thing everywhere and the landing page filter reads as a color legend.
// Derived here, never authored in content. See content/content-standard.md.
const ARCHETYPE_PALETTE = {
  Electric: '#c08a2e',
  Open:     '#4f8fa8',
  Local:    '#b05c35',
  Quiet:    '#7d7a70',
  Raw:      '#8a6a4a',
  Slow:     '#5f8a63',
};

const dimOf = (hex) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},.15)`;
};

// ── Validation ───────────────────────────────────────────────────────
// Structural: absence produces a wrong or broken site, so the build stops.
const REQUIRED = [
  'city', 'month', 'storyline', 'archetype', 'season', 'thesis', 'metadata',
  'scene', 'sceneAnchors', 'locals', 'localWord', 'changes',
  'start', 'stop', 'returns', 'remember', 'seasonalContrast',
];

// Completeness: the renderer omits these cleanly, so the page is correct but
// unfinished. Both reference pages carry them, so new work should too — but an
// older page missing one is a backlog item, not a build failure.
const EXPECTED = ['ritual'];

const METADATA_KEYS = [
  'comfort', 'daylight', 'energy', 'momentum', 'socialHours', 'streetLife',
];

// Word-count ranges taken from the two reference pages. Warnings only.
const WORD_TARGETS = {
  thesis:   [11, 19],
  scene:    [82, 122],
  locals:   [61, 101],
  changes:  [45, 59],
  start:    [47, 71],
  stop:     [37, 58],
  returns:  [31, 71],
  remember: [ 9, 17],
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const words   = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;

function validate(slug, page, seenCities) {
  const errors = [];
  const warnings = [];
  const err  = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);

  for (const field of REQUIRED) {
    if (page[field] === undefined || page[field] === null || page[field] === '') {
      err(`missing required field "${field}"`);
    }
  }
  // Everything below reads fields that may be absent; bail while the shape is unknown.
  if (errors.length) return { errors, warnings };

  for (const field of EXPECTED) {
    if (!page[field]) warn(`no "${field}" — both reference pages have one`);
  }

  if (!MONTH_ORDER.includes(page.month)) {
    err(`month "${page.month}" is not a calendar month`);
  }
  if (!ARCHETYPE_PALETTE[page.archetype]) {
    err(`archetype "${page.archetype}" is not one of ${Object.keys(ARCHETYPE_PALETTE).join(', ')}`);
  }

  // One city, one month. A repeat means the city has already used its slot.
  const prior = seenCities.get(page.city);
  if (prior) {
    err(`city "${page.city}" already appears in ${prior}; a city gets one month`);
  } else {
    seenCities.set(page.city, page.month);
  }

  const expected = `${slugify(page.city)}-${slugify(page.month)}`;
  if (slug !== expected) {
    err(`filename "${slug}.json" disagrees with its contents; expected "${expected}.json"`);
  }

  const mk = Object.keys(page.metadata).sort();
  if (mk.join() !== METADATA_KEYS.join()) {
    err(`metadata keys are [${mk}]; expected [${METADATA_KEYS}]`);
  } else {
    for (const [k, v] of Object.entries(page.metadata)) {
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        err(`metadata.${k} is ${JSON.stringify(v)}; expected an integer 1–5`);
      }
    }
  }

  if (!Array.isArray(page.sceneAnchors) || page.sceneAnchors.length !== 3) {
    err(`sceneAnchors has ${page.sceneAnchors && page.sceneAnchors.length} entries; expected exactly 3`);
  } else {
    page.sceneAnchors.forEach((a, i) => {
      if (!a.place || !a.text) err(`sceneAnchors[${i}] needs both "place" and "text"`);
      else if (words(a.text) < 35 || words(a.text) > 60) {
        warn(`sceneAnchors[${i}] ("${a.place}") is ${words(a.text)} words; target 35–60`);
      }
    });
  }

  for (const k of ['term', 'translation', 'body']) {
    if (!page.localWord[k]) err(`localWord.${k} is missing`);
  }
  if (page.ritual && !page.ritual.body) err('ritual is present but has no body');

  const sc = page.seasonalContrast;
  if (!sc.items || sc.items.length !== 3) {
    err(`seasonalContrast.items has ${sc.items && sc.items.length} entries; expected exactly 3`);
  } else {
    const current = sc.items.filter(i => i.current);
    if (current.length !== 1) {
      err(`seasonalContrast has ${current.length} items marked current; expected exactly 1`);
    } else if (current[0].label !== page.month) {
      err(`seasonalContrast current item is "${current[0].label}" but the page is ${page.month}`);
    }
    sc.items.forEach((i, n) => {
      if (words(i.body) < 6 || words(i.body) > 20) {
        warn(`seasonalContrast.items[${n}] ("${i.label}") is ${words(i.body)} words; target 6–20`);
      }
    });
  }

  for (const [field, [lo, hi]] of Object.entries(WORD_TARGETS)) {
    const n = words(page[field]);
    if (n < lo || n > hi) warn(`${field} is ${n} words; target ${lo}–${hi}`);
  }
  for (const [field, [lo, hi]] of [['localWord.translation', [5, 13]], ['localWord.body', [13, 35]], ['ritual.body', [9, 21]]]) {
    const [a, b] = field.split('.');
    if (!page[a]) continue;
    const n = words(page[a][b]);
    if (n < lo || n > hi) warn(`${field} is ${n} words; target ${lo}–${hi}`);
  }

  if (page.accentColor || page.accentColorDim) {
    warn('accentColor/accentColorDim are derived from archetype and ignored; remove them');
  }

  return { errors, warnings };
}

// ── HTML template ────────────────────────────────────────────────────
function pageHtml(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.city} — ${page.month} \xB7 The Local Season</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="assets/style.v8.css" />
</head>

<body>
<div id="page-root"></div>

<script>
const PAGE = ${JSON.stringify(page, null, 2)};
</script>
<script src="assets/render.v9.js"></script>
</body>
</html>
`;
}

// ── Read all content files ────────────────────────────────────────────
const jsonFiles = fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.json'))
  .sort();

if (!jsonFiles.length) {
  console.error('No JSON files found in content/. Run scripts/extract.js first.');
  process.exit(1);
}

// ── Validate everything before writing anything ──────────────────────
const seenCities = new Map();
const loaded = [];
let failed = 0;
let warnCount = 0;

for (const file of jsonFiles) {
  const slug = path.basename(file, '.json');
  const page = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
  const { errors, warnings } = validate(slug, page, seenCities);

  for (const w of warnings) console.warn(`  !  ${slug}: ${w}`);
  warnCount += warnings.length;

  if (errors.length) {
    failed++;
    for (const e of errors) console.error(`  ✗  ${slug}: ${e}`);
    continue;
  }
  loaded.push({ slug, page });
}

if (failed) {
  console.error(`\n${failed} file(s) failed validation. Nothing was written.`);
  console.error('See content/content-standard.md for the required shape.');
  process.exit(1);
}
if (warnCount) console.warn('');

// ── Write pages ──────────────────────────────────────────────────────
const entries = [];
for (const { slug, page } of loaded) {
  // Presentation is derived, not authored.
  page.accentColor    = ARCHETYPE_PALETTE[page.archetype];
  page.accentColorDim = dimOf(page.accentColor);
  entries.push({ slug, page });

  fs.writeFileSync(path.join(root, `${slug}.html`), pageHtml(page));
  console.log(`  ✓  ${slug}.html`);
}

// ── Sort by calendar month for the index ────────────────────────────
entries.sort((a, b) => {
  const diff = MONTH_ORDER.indexOf(a.page.month) - MONTH_ORDER.indexOf(b.page.month);
  return diff !== 0 ? diff : a.page.city.localeCompare(b.page.city);
});

// ── Update PAGES array in index.html ─────────────────────────────────
const indexPath   = path.join(root, 'index.html');
const indexSource = fs.readFileSync(indexPath, 'utf8');

const pagesRows = entries.map(({ slug, page }) =>
  `    { month: ${JSON.stringify(page.month)}, city: ${JSON.stringify(page.city)}, ` +
  `storyline: ${JSON.stringify(page.storyline)}, archetype: ${JSON.stringify(page.archetype)}, ` +
  `season: ${JSON.stringify(page.season)}, thesis: ${JSON.stringify(page.thesis)}, ` +
  `accent: ${JSON.stringify(page.accentColor)}, href: ${JSON.stringify(slug + '.html')} }`
).join(',\n');

const pagesStart = indexSource.indexOf('  var PAGES = [');
const pagesEnd   = indexSource.indexOf('];', pagesStart) + 2;

if (pagesStart === -1 || pagesEnd === 1) {
  console.error('Could not locate PAGES array in index.html.');
  process.exit(1);
}

const newIndex =
  indexSource.slice(0, pagesStart) +
  `  var PAGES = [\n${pagesRows},\n  ];` +
  indexSource.slice(pagesEnd);

fs.writeFileSync(indexPath, newIndex);
console.log(`  ✓  index.html  (${entries.length} cities)`);

// ── Update the page table in README.md ───────────────────────────────
// Generated rather than hand-kept; a manual list is the first thing to rot.
const readmePath = path.join(root, 'README.md');
const readme     = fs.readFileSync(readmePath, 'utf8');
const START = '<!-- pages:start';
const END   = '<!-- pages:end -->';
const rs = readme.indexOf(START);
const re = readme.indexOf(END, rs);

if (rs === -1 || re === -1) {
  console.warn('  !  README.md has no pages:start/pages:end markers; table not updated');
} else {
  const table = [
    '| Month | City | Storyline | Archetype |',
    '|-------|------|-----------|-----------|',
    ...entries.map(({ slug, page }) =>
      `| ${page.month} | **${page.city}** (\`${slug}.html\`) | ${page.storyline} | ${page.archetype} |`),
  ].join('\n');

  const head = readme.slice(0, readme.indexOf('-->', rs) + 3);
  fs.writeFileSync(readmePath, `${head}\n${table}\n${readme.slice(re)}`);
  console.log('  ✓  README.md  (page table)');
}

// ── Summary ──────────────────────────────────────────────────────────
const byMonth = new Map(MONTH_ORDER.map(m => [m, 0]));
for (const { page } of entries) byMonth.set(page.month, byMonth.get(page.month) + 1);
const empty = MONTH_ORDER.filter(m => !byMonth.get(m));

console.log('\nBuild complete.');
console.log(`  ${entries.length} cities across ${MONTH_ORDER.length - empty.length} months`);
if (empty.length) console.log(`  open months: ${empty.join(', ')}`);
if (warnCount) {
  console.log(`  ${warnCount} warning(s) — content below the standard, see content/content-standard.md`);
}
