#!/usr/bin/env node
/**
 * Build: reads content/*.json → generates city-month HTML files
 * and updates the PAGES array in index.html.
 *
 * Usage:  node scripts/build.js
 *         npm run build
 *
 * Adding a new city: create content/{city}-{month}.json, run build.
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
  <link rel="stylesheet" href="assets/style.css?v=7" />
</head>

<body>
<div id="page-root"></div>

<script>
const PAGE = ${JSON.stringify(page, null, 2)};
</script>
<script src="assets/render.js?v=7"></script>
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

const entries = [];
for (const file of jsonFiles) {
  const slug = path.basename(file, '.json');
  const page = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
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
console.log('\nBuild complete.');
