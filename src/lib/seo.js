/**
 * SEO primitives — pure. No React, no DOM access.
 *
 * These builders produce plain objects/strings; `hooks/useSeo.js` is the only
 * thing that writes to <head>. Keeping them separate means the sitemap script
 * (plain Node, no bundler) can import from here too.
 */

export const SITE = {
  url: 'https://nextechlabs.org',
  name: 'Next Tech Labs',
  locale: 'en_US',
  // TODO(seo): replace with a real 1200x630 OG card once the generator in M2
  // lands — this one is square, which social cards crop.
  defaultImage: '/intro-poster.png',
};

/** Absolute URL for a site-relative path. Passes through URLs that are already absolute. */
export function absoluteUrl(path = '/') {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * BlogPosting schema for a single article.
 * @param {{title: string, description: string, path: string, image?: string,
 *          published: string, updated?: string, author?: string, keywords?: string[]}} post
 */
export function buildArticleJsonLd(post) {
  const url = absoluteUrl(post.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image || SITE.defaultImage)],
    datePublished: post.published,
    dateModified: post.updated || post.published,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: post.author || SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.svg') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
  };
}

/**
 * FAQPage schema. Answers must be plain text — no JSX, no markup.
 * @param {Array<{q: string, a: string}>} faqs
 */
export function buildFaqJsonLd(faqs = []) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * BreadcrumbList schema.
 * @param {Array<{name: string, path: string}>} crumbs Ordered, root first.
 */
export function buildBreadcrumbJsonLd(crumbs = []) {
  if (!crumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Blog schema for an index page listing posts. */
export function buildBlogJsonLd({ path, name, description, posts = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': absoluteUrl(path),
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.published,
      dateModified: p.updated || p.published,
      url: absoluteUrl(`/blog/${p.slug}`),
    })),
  };
}

/**
 * SoftwareApplication schema for a store-listed mobile app. Drives the app
 * knowledge panel and lets the store links surface as sitelinks.
 *
 * No aggregateRating here on purpose — we don't fabricate review counts.
 *
 * @param {{name: string, description: string, path: string, image?: string,
 *          appStore?: string, playStore?: string, category?: string}} app
 */
export function buildMobileAppJsonLd(app) {
  const sameAs = [app.appStore, app.playStore].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: app.name,
    description: app.description,
    applicationCategory: app.category || 'HealthApplication',
    operatingSystem: 'iOS, Android',
    url: absoluteUrl(app.path),
    image: absoluteUrl(app.image || SITE.defaultImage),
    installUrl: sameAs,
    ...(sameAs.length ? { sameAs } : {}),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}
