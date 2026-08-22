#!/usr/bin/env node
/**
 * Gives every First Bite blog post a cover photograph.
 *
 *   node tools/blog-covers/generate.mjs                  # every post missing one
 *   node tools/blog-covers/generate.mjs starting-solids-first-foods-for-baby
 *   node tools/blog-covers/generate.mjs --force <slug>   # redraw one that has one
 *   node tools/blog-covers/generate.mjs --dry-run        # print prompts, spend nothing
 *
 * Per post: reads the article (scene.mjs) to decide what the picture shows,
 * turns that into a prompt (prompt.mjs), asks an image model for it, and writes
 * a WebP and a JPEG into `public/projects/first-bite/blog/covers/`.
 *
 * HOW THIS DIFFERS FROM THE OTHER BLOG'S GENERATOR
 * ------------------------------------------------
 * Ethiopian Maids' covers are drawn on a server by a systemd timer, written to
 * a directory nginx serves, and recorded by writing `cover_image_url` back to
 * Hasura. None of that applies here. This blog is five files in a git repo:
 * there is no database to write to, no timer worth running for a post a month,
 * and the covers belong in the repo beside the posts they illustrate. So this
 * runs on a laptop, on demand, and the output is committed. The feed generator
 * finds the files by name — `<slug>.webp` — and needs telling nothing.
 *
 * WHY TWO FORMATS
 * ---------------
 * The page gets the WebP because it is half the bytes. Instagram's publishing
 * endpoint accepts JPEG and refuses WebP — that is Meta's server, not ours, so
 * there is no flag to set. Same crop, same picture, two files.
 *
 * WHY sharp AND NOT cwebp
 * -----------------------
 * The other generator shells out to cwebp/dwebp/cjpeg because it runs on a
 * Debian box where those are one apt-get away. This one runs wherever the
 * person editing the blog is sitting, and telling them to build libwebp for
 * Windows to publish a blog post is not a reasonable ask.
 *
 * COSTS REAL MONEY — a few cents an image. It never redraws a post that already
 * has a cover unless --force says so, so a repeat run spends nothing.
 *
 * Needs OPENROUTER_API_KEY in the environment.
 */

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { posts as allPosts } from '../../src/data/blog.js';
import { coverPrompt } from './prompt.mjs';
import { chooseScene, settingFor, summarise } from './scene.mjs';

const MODEL = process.env.COVER_MODEL || 'openai/gpt-5-image';
const KEY = process.env.OPENROUTER_API_KEY || '';
const APP = 'first-bite';

const WIDTH = Number(process.env.COVER_WIDTH || 1024);
const ASPECT = 3 / 2;
const WEBP_QUALITY = Number(process.env.COVER_QUALITY || 82);
const JPEG_QUALITY = Number(process.env.COVER_JPEG_QUALITY || 86);

const here = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(here, `../../public/projects/${APP}/blog/covers`);

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));

// Slugs become filenames. A post is data, and data must never be able to write
// outside the directory it was meant to write into.
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Which posts this run is for, oldest first so the "already used" list grows in order. */
export function selectPosts(all, { slugs = [], force = false, existing = new Set() } = {}) {
  return all
    .filter((post) => post.app === APP)
    .filter((post) => (slugs.length ? slugs.includes(post.slug) : true))
    .filter((post) => force || !existing.has(post.slug))
    .sort((a, b) => a.published.localeCompare(b.published));
}

/** Slugs that already have a cover on disk. */
async function existingCovers() {
  try {
    const files = await readdir(OUT_DIR);
    return new Set(
      files.filter((f) => f.endsWith('.webp')).map((f) => f.slice(0, -'.webp'.length)),
    );
  } catch (err) {
    if (err.code === 'ENOENT') return new Set();
    throw err;
  }
}

/** Ask the model for the picture. Returns the raw PNG bytes. */
async function draw(prompt, fetchImpl = fetch) {
  const res = await fetchImpl('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${KEY}`,
      'content-type': 'application/json',
      'http-referer': 'https://nextechlabs.org',
      'x-title': 'First Bite blog covers',
    },
    body: JSON.stringify({
      model: MODEL,
      modalities: ['image', 'text'],
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${body?.error?.message || ''}`.trim());

  const images = body.choices?.[0]?.message?.images || [];
  const url = images[0]?.image_url?.url || '';
  const match = /^data:image\/[a-z+]+;base64,(.+)$/i.exec(url);
  if (!match) {
    const said = body.choices?.[0]?.message?.content;
    throw new Error(
      `no image came back${said ? ` — model said: ${String(said).slice(0, 160)}` : ''}`,
    );
  }
  return { bytes: Buffer.from(match[1], 'base64'), cost: body.usage?.cost };
}

/**
 * One picture, two files.
 *
 * The model returns a square regardless of what the prompt asks for, so the
 * crop happens here — centre, 3:2, which is inside Instagram's accepted range
 * and close enough to 1.91:1 to serve as an og:image too.
 */
export async function encode(pngBytes, slug, sharp) {
  const height = Math.round(WIDTH / ASPECT);
  const base = sharp(pngBytes).resize(WIDTH, height, { fit: 'cover', position: 'attention' });

  const webpFile = join(OUT_DIR, `${slug}.webp`);
  const jpegFile = join(OUT_DIR, `${slug}.jpg`);

  await base.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpFile);
  await base.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpegFile);

  return {
    webp: (await stat(webpFile)).size,
    jpeg: (await stat(jpegFile)).size,
  };
}

async function main() {
  console.log('First Bite blog covers');

  if (!DRY_RUN && !KEY) {
    console.error('\nOPENROUTER_API_KEY is not set — nothing can be drawn.');
    console.error('Set it, or pass --dry-run to see the prompts without spending anything.');
    return 2;
  }

  // Choosing the scene is itself a model call, so a dry run with no key
  // cannot make one. Rather than fail, it shows the prompt around a
  // placeholder scene: the style and the safety rules are the part worth
  // reading before spending anything, and they are identical whatever the
  // scene turns out to be.
  const stubScene = {
    setting: '(the model would choose the setting here)',
    people: '(and who is in it)',
    action: '(and what they are doing)',
    props: '(and what is on the table)',
    framing: '(and how it is framed)',
  };

  for (const slug of only) {
    if (!SAFE_SLUG.test(slug)) {
      console.error(`\nrefusing to use "${slug}" as a filename`);
      return 2;
    }
  }

  const existing = await existingCovers();
  const chosen = selectPosts(allPosts, { slugs: only, force: FORCE, existing });

  if (!chosen.length) {
    const why = only.length ? 'no post matched' : 'every post already has a cover';
    console.log(`\n${why} — nothing to do. Use --force to redraw.`);
    return 0;
  }

  // What the finished covers already show, so the next one is told to differ.
  const taken = [];
  let spent = 0;
  let drawn = 0;
  let failed = 0;

  let sharp = null;
  if (!DRY_RUN) {
    try {
      ({ default: sharp } = await import('sharp'));
    } catch {
      console.error('\nsharp is not installed — run: npm install --save-dev sharp');
      return 2;
    }
    await mkdir(OUT_DIR, { recursive: true });
  }

  for (const post of chosen) {
    console.log(`\n  ${post.slug}`);
    try {
      const stubbed = DRY_RUN && !KEY;
      const scene = stubbed ? stubScene : await chooseScene(post, taken, KEY);
      if (!stubbed) taken.push(summarise(scene));
      const prompt = coverPrompt(scene, post);

      if (DRY_RUN) {
        console.log(`    setting family: ${settingFor(post)}`);
        console.log(prompt.replace(/^/gm, '      '));
        continue;
      }

      const { bytes, cost } = await draw(prompt);
      const sizes = await encode(bytes, post.slug, sharp);
      spent += cost || 0;
      drawn += 1;
      console.log(
        `    ${summarise(scene)}`.slice(0, 140),
      );
      console.log(
        `    webp ${(sizes.webp / 1024).toFixed(0)}KB  jpeg ${(sizes.jpeg / 1024).toFixed(0)}KB` +
          (cost ? `  $${cost.toFixed(3)}` : ''),
      );
    } catch (err) {
      failed += 1;
      console.error(`    ! ${err.message}`);
    }
  }

  if (DRY_RUN) {
    console.log(`\n${chosen.length} prompt(s) shown. Nothing drawn, nothing spent.`);
    return 0;
  }

  console.log(
    `\n${drawn} cover(s) written to public/projects/${APP}/blog/covers` +
      (spent ? `, $${spent.toFixed(2)}` : '') +
      (failed ? `. ${failed} failed.` : '.'),
  );
  console.log('Run `npm run feed` and commit the images to publish them.');
  return failed ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => process.exit(code));
}

export const _internals = { OUT_DIR, ASPECT, WIDTH, draw };
