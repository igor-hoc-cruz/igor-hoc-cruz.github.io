/**
 * build.mjs
 * ---------------------------------------------------------------------------
 * Generates the two static pages served by GitHub Pages:
 *   index.html     English
 *   pt/index.html  Portuguese
 *
 * Usage:  node build.mjs
 * Edit text in src/content.mjs, structure in src/template.mjs,
 * look in assets/site.css, behaviour in assets/site.js.
 * ---------------------------------------------------------------------------
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './src/template.mjs';

const here = dirname(fileURLToPath(import.meta.url));

const pages = [
  { lang: 'en', file: 'index.html', root: '' },
  { lang: 'pt', file: 'pt/index.html', root: '../' },
];

for (const { lang, file, root } of pages) {
  const out = join(here, file);
  mkdirSync(dirname(out), { recursive: true });
  const html = renderPage(lang, root);
  writeFileSync(out, html);
  console.log(`built ${file} (${html.length} bytes)`);
}
