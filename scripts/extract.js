#!/usr/bin/env node
/**
 * One-time migration: extracts PAGE objects from existing HTML files
 * into content/*.json. Safe to re-run — files are overwritten.
 *
 * Usage: node scripts/extract.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const root       = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');

const files = fs.readdirSync(root)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .sort();

let extracted = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');

  const start = html.indexOf('const PAGE = {');
  if (start === -1) { console.warn(`  skip  ${file} — no PAGE object`); continue; }

  const scriptEnd = html.indexOf('</script>', start);
  let jsText = html.slice(start + 'const PAGE = '.length, scriptEnd).trim();
  if (jsText.endsWith(';')) jsText = jsText.slice(0, -1);

  const ctx = {};
  try {
    vm.runInNewContext(`__p = ${jsText}`, ctx);
  } catch (e) {
    console.error(`  error  ${file}: ${e.message}`);
    continue;
  }

  const slug = path.basename(file, '.html');
  fs.writeFileSync(
    path.join(contentDir, `${slug}.json`),
    JSON.stringify(ctx.__p, null, 2) + '\n'
  );
  console.log(`  ✓  content/${slug}.json`);
  extracted++;
}

console.log(`\nExtracted ${extracted} of ${files.length} pages.`);
