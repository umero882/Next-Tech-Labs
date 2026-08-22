/**
 * Writes `public/projects/first-bite/blog/feed.json` from the blog data.
 *
 * The blog is static: posts live in `src/data/blog.js` and their prose in
 * `pages/blog/posts/<slug>.jsx`, so the only machine-readable thing the site
 * published was a sitemap — a list of URLs and nothing about what is at them.
 * Anything downstream that wanted a post's title, date or subject had to scrape
 * the rendered page for it.
 *
 * This is that missing contract. Today's consumer is PyRunner's
 * `blog-to-social`, which queues an article to Instagram and Facebook; it was
 * written against a Hasura-backed blog and reads `blog_posts` records, so this
 * emits that same field set rather than inventing a third shape for a single
 * caller to translate. The names are generic enough to mean the same thing here.
 *
 * Runs as `prebuild`, like the sitemap, so the file lands in `public/` before
 * Vite copies it into `dist/` and the dev server serves the identical file.
 * nginx resolves it as a real file — `try_files $uri ...` matches before the SPA
 * fallback, so `/projects/first-bite/blog/feed.json` is never the app shell.
 *
 * Regenerate after adding or editing a post:
 *   node scripts/generate-blog-feed.mjs
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

import { posts } from '../src/data/blog.js';

const SITE = 'https://nextechlabs.org';
const APP = 'first-bite';
const BLOG_PATH = `/projects/${APP}/blog`;

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, `../public/projects/${APP}/blog`);
const coverDir = resolve(outDir, 'covers');
const outFile = resolve(outDir, 'feed.json');

/**
 * A date a consumer can order by and compare against "now".
 *
 * `published` is a bare YYYY-MM-DD. Left as-is, anything parsing it as a
 * datetime gets midnight in whatever zone it assumes, and a post published
 * today reads as due or not-yet-due depending on which. Pin it to UTC and say so.
 */
export function isoDate(day) {
  return `${day}T00:00:00Z`;
}

/**
 * The article as prose, for a consumer that has to summarise it.
 *
 * The real body is a React tree and cannot be read outside the bundler, so this
 * sends what the post itself declares are its main points. For summarising —
 * which is what a social caption is — the takeaways are better source than the
 * full text anyway: they are the article's own answer to "what does this say",
 * already written by a human.
 */
export function bodyOf(post) {
  const lines = [post.description];
  if (post.takeaways?.length) {
    lines.push('', ...post.takeaways.map((t) => `- ${t}`));
  }
  return lines.join('\n');
}

/**
 * Tags, which are not the same thing as keywords.
 *
 * `keywords` are long-tail search phrases — "when to introduce peanut butter to
 * baby". A consumer that turns tags into hashtags produces
 * #whentointroducepeanutbuttertobaby from that: unreadable, unfollowed, and it
 * reads as spam. Only a phrase short enough to be a label is a tag, so anything
 * over two words is left to `keywords`, where it belongs.
 *
 * The topic leads, because it is the one label every post is guaranteed to have.
 */
export function tagsOf(post) {
  const short = (post.keywords || []).filter((k) => k.trim().split(/\s+/).length <= 2);
  return [...new Set([post.topic, ...short].filter(Boolean))];
}

/**
 * The cover for a post, or null if it has not been drawn.
 *
 * Covers are files in the repo named after the slug — `tools/blog-covers`
 * writes them — so nothing has to record which posts have one. The `.webp` is
 * what the page should load; a consumer that needs a JPEG swaps the extension,
 * because a `.jpg` is written beside every `.webp`.
 *
 * The query string is a hash of the file's own bytes. Facebook and Instagram
 * cache an image against its URL and are slow to look again, so a redrawn cover
 * would keep sharing as the old picture forever without one. Hashing the
 * content rather than stamping the time means the URL is stable across
 * checkouts and rebuilds, and changes exactly when the picture does.
 */
export function coverFor(slug, dir = coverDir, read = readFileSync) {
  try {
    const bytes = read(resolve(dir, `${slug}.webp`));
    const v = createHash('sha1').update(bytes).digest('hex').slice(0, 8);
    return `${SITE}${BLOG_PATH}/covers/${slug}.webp?v=${v}`;
  } catch {
    return null;
  }
}

/** The feed as a value, so a test can check it without writing a file. */
export function buildFeed(all = posts) {
  const items = all
    .filter((post) => post.app === APP)
    .sort((a, b) => a.published.localeCompare(b.published))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.topic || '',
      audience: 'parents',
      tags: tagsOf(post),
      // The full search phrases stay, under the name that describes them. They
      // are for anything doing SEO work; they are not tags.
      keywords: post.keywords || [],
      published_at: isoDate(post.published),
      updated_at: post.updated ? isoDate(post.updated) : null,
      url: `${SITE}${BLOG_PATH}/${post.slug}`,
      // null when the post has no cover drawn yet — never the site's og:image,
      // which is one app icon shared by every page and a PNG besides, which
      // Instagram refuses. A consumer has to be able to tell there is no
      // artwork rather than be handed something that only looks like some.
      cover_image_url: coverFor(post.slug),
      body_md: bodyOf(post),
    }));

  return { site: SITE, blog: `${SITE}${BLOG_PATH}`, count: items.length, posts: items };
}

// Only write when run as a script, so importing this in a test writes nothing.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const feed = buildFeed();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, `${JSON.stringify(feed, null, 2)}\n`, 'utf8');
  console.log(`blog feed: ${feed.count} post(s) -> public${BLOG_PATH}/feed.json`);
}
