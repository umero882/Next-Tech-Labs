/**
 * Per-route SEO descriptors. Pure — no React, no DOM, no aliases.
 *
 * Each function returns exactly the options object `hooks/useSeo.js` takes, so
 * there is ONE definition of a route's metadata with two consumers:
 *
 *   - the React page, which applies it at runtime via useSeo()
 *   - scripts/prerender.mjs, which bakes it into static HTML at build time
 *
 * That shared definition is the whole point of this file. If a page builds its
 * own tags inline, the prerendered HTML and the rendered page drift apart and
 * nobody notices until a link preview looks wrong.
 */
import { posts } from '../data/blog.js';
import { projects } from '../data/projects.js';
import { BLOG_BASE, postPath, sortPostsByDate } from './blog.js';
import {
  buildArticleJsonLd,
  buildBlogJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMobileAppJsonLd,
} from './seo.js';

const SUFFIX = ' | Next Tech Labs';

export const BLOG_TITLE = 'Baby Allergens & Starting Solids — The First Bite Blog';
export const BLOG_DESCRIPTION =
  'Evidence-based guides on introducing the Big 9 allergens, starting solids, and spotting a reaction — from the team behind the First Bite app for iOS and Android.';

/** The First Bite project entry — the source of truth for store links + icon. */
export function firstBiteApp() {
  return projects.find((p) => p.id === 'first-bite');
}

/** MobileApplication JSON-LD for a project, or null when it isn't store-listed. */
function appJsonLd(app) {
  if (!app) return null;
  return buildMobileAppJsonLd({
    name: app.name,
    description: app.tagline,
    path: `/projects/${app.id}`,
    image: app.cover?.image,
    appStore: app.links?.appStore,
    playStore: app.links?.playStore,
  });
}

function crumbs(trail) {
  return buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'First Bite', path: '/projects/first-bite' },
    ...trail,
  ]);
}

/** `/projects/first-bite` — the app showcase page. */
export function firstBiteSeo() {
  const app = firstBiteApp();
  return {
    title: `First Bite — Baby Allergen Introduction & First Foods App${SUFFIX}`,
    description:
      'First Bite is a free iOS and Android app for evidence-based allergen introduction: Big 9 protocols, an AI label scanner, caregiver sync, and a clinician-ready reaction log.',
    path: '/projects/first-bite',
    image: '/projects/first-bite-icon.png',
    keywords: [
      'baby allergen introduction app',
      'food allergy tracker for babies',
      'baby first foods app',
      'allergen introduction tracker',
      'first bite app',
    ],
    jsonLd: [
      appJsonLd(app),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'First Bite', path: '/projects/first-bite' },
      ]),
    ],
  };
}

/** `/projects/first-bite/blog` — the article index. */
export function blogIndexSeo() {
  const app = firstBiteApp();
  const ordered = sortPostsByDate(posts);

  return {
    title: `${BLOG_TITLE}${SUFFIX}`,
    description: BLOG_DESCRIPTION,
    path: BLOG_BASE,
    image: app?.cover?.image,
    keywords: [
      'baby allergen introduction',
      'starting solids',
      'baby food allergy',
      'first bite app',
      'baby led weaning',
    ],
    jsonLd: [
      buildBlogJsonLd({
        path: BLOG_BASE,
        name: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        posts: ordered,
      }),
      crumbs([{ name: 'Blog', path: BLOG_BASE }]),
      appJsonLd(app),
    ],
  };
}

/**
 * `/projects/first-bite/blog/:slug` — a single article.
 * @param {Object} post Entry from `data/blog.js`.
 */
export function blogPostSeo(post) {
  const app = firstBiteApp();
  const path = postPath(post.slug);
  const image = app?.cover?.image;

  return {
    title: `${post.title}${SUFFIX}`,
    description: post.description,
    path,
    image,
    type: 'article',
    keywords: post.keywords,
    published: post.published,
    updated: post.updated,
    jsonLd: [
      buildArticleJsonLd({
        title: post.title,
        description: post.description,
        path,
        image,
        published: post.published,
        updated: post.updated,
        keywords: post.keywords,
      }),
      buildFaqJsonLd(post.faqs),
      crumbs([
        { name: 'Blog', path: BLOG_BASE },
        { name: post.headline, path },
      ]),
      appJsonLd(app),
    ],
  };
}

/**
 * Every route the prerenderer should bake. Kept here so adding a post or a
 * project page automatically extends the prerender set.
 *
 * @returns {Array<{path: string, seo: Object}>}
 */
export function prerenderRoutes() {
  return [
    { path: '/projects/first-bite', seo: firstBiteSeo() },
    { path: BLOG_BASE, seo: blogIndexSeo() },
    ...posts.map((p) => ({ path: postPath(p.slug), seo: blogPostSeo(p) })),
  ];
}
