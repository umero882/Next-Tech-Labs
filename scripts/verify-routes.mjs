/**
 * Post-build assertions.
 *
 * An SPA answers 200 for any path, so an HTTP check proves nothing about
 * routing here. What can be proven from the build output is that each route
 * pattern actually reached the bundle, and that the sitemap lists exactly the
 * pages meant to be indexed.
 *
 * Run after `npm run build`:  node scripts/verify-routes.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '../dist');
const sitemapFile = resolve(here, '../public/sitemap.xml');

/**
 * Route patterns that must survive into the shipped JS.
 *
 * Checked delimiter-bounded, not by bare substring: 'projects/first-bite/blog'
 * is a prefix of 'projects/first-bite/blog/:slug', and 'projects/:id' is a
 * prefix of 'projects/:id/blog', so a substring check would keep passing after
 * the route it names was deleted -- exactly the regression this file exists to
 * catch.
 */
const ROUTE_EXPECTATIONS = [
  'projects/:id/blog',
  'projects/first-bite/blog',
  'projects/:id/about',
  'projects/:id/contact',
  'projects/:id',
];

/** True when `route` appears in `js` as a complete quoted string literal. */
function routeInBundle(js, route) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`["'\`]${escaped}["'\`]`).test(js);
}

/** Paths the sitemap must list. */
const SITEMAP_REQUIRED = [
  '/projects/first-bite',
  '/projects/first-bite/blog',
];

/** Paths the sitemap must never list — placeholders and noindex pages. */
const SITEMAP_FORBIDDEN = [
  '/projects/password-manager/blog',
  '/projects/tidyspace/blog',
  '/projects/tidyspace/about',
];

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) failures++;
};

// ── bundle ──────────────────────────────────────────────────
const assetsDir = join(distDir, 'assets');
const js = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(join(assetsDir, f), 'utf8'))
  .join('\n');

console.log(`bundle: ${readdirSync(assetsDir).filter((f) => f.endsWith('.js')).length} JS chunk(s)`);
for (const route of ROUTE_EXPECTATIONS) {
  check(routeInBundle(js, route), `route in bundle: ${route}`);
}

// ── sitemap ─────────────────────────────────────────────────
const sitemap = readFileSync(sitemapFile, 'utf8');
for (const path of SITEMAP_REQUIRED) {
  check(sitemap.includes(`<loc>https://nextechlabs.org${path}</loc>`), `sitemap lists ${path}`);
}
for (const path of SITEMAP_FORBIDDEN) {
  check(!sitemap.includes(`<loc>https://nextechlabs.org${path}</loc>`), `sitemap omits ${path}`);
}

console.log(failures === 0 ? '\nall checks passed' : `\n${failures} check(s) FAILED`);
process.exit(failures === 0 ? 0 : 1);
