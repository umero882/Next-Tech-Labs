/**
 * Writes `public/sitemap.xml` from the route table + content data.
 *
 * Runs as `prebuild` so the file lands in `public/` before Vite copies it into
 * `dist/`, which also means the dev server serves the same file. It imports the
 * data modules directly — they are pure, alias-free ESM, so plain Node can read
 * them without the bundler.
 *
 * Regenerate after adding a route, a project, or a post:
 *   node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { posts } from '../src/data/blog.js';
import { projects } from '../src/data/projects.js';

const SITE = 'https://nextechlabs.org';

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, '../public/sitemap.xml');

/** Today in YYYY-MM-DD, used as lastmod for pages without their own date. */
const today = new Date().toISOString().slice(0, 10);

/** @type {Array<{path: string, changefreq: string, priority: string, lastmod?: string}>} */
const entries = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/projects/first-bite/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/categories', changefreq: 'monthly', priority: '0.6' },
  { path: '/tech', changefreq: 'monthly', priority: '0.6' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/terms', changefreq: 'yearly', priority: '0.2' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.2' },

  // App support / legal pages the store listings link to.
  { path: '/projects/first-bite/support', changefreq: 'monthly', priority: '0.5' },
  { path: '/projects/first-bite/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/projects/first-bite/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/projects/first-bite/delete-account', changefreq: 'yearly', priority: '0.3' },
  { path: '/projects/password-manager/support', changefreq: 'monthly', priority: '0.5' },
  { path: '/projects/password-manager/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/projects/password-manager/terms', changefreq: 'yearly', priority: '0.3' },
];

for (const project of projects) {
  entries.push({
    path: `/projects/${project.id}`,
    changefreq: 'monthly',
    priority: project.featured ? '0.8' : '0.6',
  });
}

for (const post of posts) {
  entries.push({
    path: `/projects/first-bite/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.updated || post.published,
  });
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) =>
    [
      '  <url>',
      `    <loc>${SITE}${e.path}</loc>`,
      `    <lastmod>${e.lastmod || today}</lastmod>`,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(outFile, xml, 'utf8');
console.log(`sitemap.xml — ${entries.length} URLs → public/sitemap.xml`);
