/**
 * Bakes per-route <head> metadata into static HTML at build time.
 *
 * WHY THIS EXISTS — and what it deliberately does NOT do.
 *
 * Googlebot renders our JavaScript: verified 2026-08-17 against Google's live
 * renderer, which picked up the runtime-injected title, canonical and all four
 * JSON-LD blocks (see docs/progress-tracker.md). So this is NOT for Google, and
 * it is not a substitute for the SPA.
 *
 * It is for the consumers that read raw HTML and never execute JS: Slack,
 * LinkedIn, WhatsApp and iMessage link unfurls, and the crawlers behind AI
 * answer engines. Those saw only the site-wide defaults — every article
 * unfurled as "Next Tech Labs — software, shipped."
 *
 * Scope: <head> only. The body stays <div id="root"></div> and React boots
 * normally, so there is no SSR bundle, no hydration, and no change to how the
 * app runs. Full body prerendering would need react-dom/server and is a much
 * larger change; if AI crawlers ever need the article text, that's the upgrade.
 *
 * Route metadata comes from lib/routeSeo.js — the exact same descriptors the
 * React pages pass to useSeo(), so the baked HTML cannot drift from the
 * rendered page.
 *
 * Runs as `postbuild`. Standalone: `npm run prerender` (after a build).
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, absoluteUrl, toIsoDateTime } from '../src/lib/seo.js';
import { prerenderRoutes } from '../src/lib/routeSeo.js';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '../dist');
const templatePath = join(dist, 'index.html');

if (!existsSync(templatePath)) {
  console.error('prerender: dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');

/** Escape a value for use inside a double-quoted HTML attribute. */
function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape text content. `<` and `&` are enough for <title>. */
function text(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * JSON-LD must not contain a literal `</script>`. Escaping the slash keeps the
 * JSON valid while making the sequence unparseable as a closing tag.
 */
function jsonLdScript(block) {
  const json = JSON.stringify(block).replace(/<\//g, '<\\/');
  // data-prerendered is the handshake with hooks/useSeo.js: when React mounts it
  // strips these and injects its own, so a hydrated page never carries the same
  // structured data twice.
  return `    <script type="application/ld+json" data-prerendered="1">${json}</script>`;
}

/** Build the full replacement <head> fragment for one route. */
function headFor(seo) {
  const url = absoluteUrl(seo.path || '/');
  const image = absoluteUrl(seo.image || SITE.defaultImage);
  const type = seo.type || 'website';

  const tags = [
    `    <title>${text(seo.title)}</title>`,
    `    <meta name="description" content="${attr(seo.description)}" />`,
    seo.keywords?.length
      ? `    <meta name="keywords" content="${attr(seo.keywords.join(', '))}" />`
      : null,
    `    <meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `    <link rel="canonical" href="${attr(url)}" />`,
    '',
    `    <meta property="og:title" content="${attr(seo.title)}" />`,
    `    <meta property="og:description" content="${attr(seo.description)}" />`,
    `    <meta property="og:type" content="${attr(type)}" />`,
    `    <meta property="og:url" content="${attr(url)}" />`,
    `    <meta property="og:site_name" content="${attr(SITE.name)}" />`,
    `    <meta property="og:locale" content="${attr(SITE.locale)}" />`,
    `    <meta property="og:image" content="${attr(image)}" />`,
  ];

  if (type === 'article') {
    tags.push(
      `    <meta property="article:published_time" content="${attr(toIsoDateTime(seo.published))}" />`,
      `    <meta property="article:modified_time" content="${attr(toIsoDateTime(seo.updated || seo.published))}" />`,
      `    <meta property="article:publisher" content="${attr(SITE.name)}" />`,
    );
  }

  tags.push(
    '',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${attr(seo.title)}" />`,
    `    <meta name="twitter:description" content="${attr(seo.description)}" />`,
    `    <meta name="twitter:image" content="${attr(image)}" />`,
    '',
    ...(seo.jsonLd || []).filter(Boolean).map(jsonLdScript),
  );

  return tags.filter((t) => t !== null).join('\n');
}

/**
 * Swap the template's site-wide head block for this route's.
 *
 * The template's defaults sit between the <title> and the fonts comment. We
 * replace that whole span rather than patching tag by tag, so a tag added to
 * index.html can never survive into a route page with a stale value.
 */
const DEFAULTS_START = '    <title>';
const DEFAULTS_END = '    <!-- Fonts:';

function render(seo) {
  const start = template.indexOf(DEFAULTS_START);
  const end = template.indexOf(DEFAULTS_END);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      'prerender: could not locate the default head block in index.html. ' +
        'Expected a <title> followed by the "<!-- Fonts:" comment — update the ' +
        'markers in this script if index.html changed.',
    );
  }

  return `${template.slice(0, start)}${headFor(seo)}\n\n${template.slice(end)}`;
}

const routes = prerenderRoutes();
let written = 0;

for (const route of routes) {
  const html = render(route.seo);
  const outDir = join(dist, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf8');
  written += 1;
}

console.log(`prerender — ${written} routes baked into dist/**/index.html`);
for (const r of routes) console.log(`  ${r.path}`);
