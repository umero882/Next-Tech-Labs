import { useEffect } from 'react';
import { SITE, absoluteUrl } from '@/lib/seo';

/**
 * Writes per-route SEO tags into <head> and reverses every change on unmount.
 *
 * This app is a client-rendered SPA, so `index.html` can only carry site-wide
 * defaults. Google renders JS and picks these up; every tag we touch is
 * restored when the route unmounts so pages can never leak metadata into each
 * other.
 *
 * @param {Object} seo
 * @param {string} seo.title            Full <title> text (write it, don't template it).
 * @param {string} seo.description      Meta description, ~150-160 chars.
 * @param {string} [seo.path]           Site-relative path used for canonical + og:url.
 * @param {string} [seo.image]          OG image path. Defaults to SITE.defaultImage.
 * @param {'website'|'article'} [seo.type='website']
 * @param {string[]} [seo.keywords]
 * @param {string} [seo.published]      ISO date, articles only.
 * @param {string} [seo.updated]        ISO date, articles only.
 * @param {boolean} [seo.noindex=false]
 * @param {Array<Object>} [seo.jsonLd]  Structured-data objects, injected as ld+json.
 */
export function useSeo(seo) {
  // Serialize once so the effect has a stable primitive dep and can rebuild its
  // own config — no stale closures, no re-running on every parent render.
  const key = JSON.stringify(seo ?? {});

  useEffect(() => {
    const config = JSON.parse(key);
    const {
      title,
      description,
      path,
      image,
      type = 'website',
      keywords,
      published,
      updated,
      noindex = false,
      jsonLd = [],
    } = config;

    /** Reversal stack — popped in LIFO order on cleanup. */
    const undo = [];

    const setAttr = (el, attr, value) => {
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, value);
      undo.push(() => (prev === null ? el.removeAttribute(attr) : el.setAttribute(attr, prev)));
    };

    /** Update an existing head tag in place, or create (and later remove) one. */
    const head = (tagName, keyAttr, keyValue, attrs) => {
      let el = document.head.querySelector(`${tagName}[${keyAttr}="${keyValue}"]`);
      if (!el) {
        el = document.createElement(tagName);
        el.setAttribute(keyAttr, keyValue);
        document.head.appendChild(el);
        undo.push(() => el.remove());
      }
      Object.entries(attrs).forEach(([k, v]) => setAttr(el, k, v));
    };

    const meta = (name, content) => content && head('meta', 'name', name, { content });
    const og = (property, content) => content && head('meta', 'property', property, { content });

    if (title) {
      const prevTitle = document.title;
      document.title = title;
      undo.push(() => { document.title = prevTitle; });
    }

    const url = absoluteUrl(path || '/');
    const img = absoluteUrl(image || SITE.defaultImage);

    meta('description', description);
    if (keywords?.length) meta('keywords', keywords.join(', '));
    meta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    head('link', 'rel', 'canonical', { href: url });

    og('og:title', title);
    og('og:description', description);
    og('og:type', type);
    og('og:url', url);
    og('og:image', img);
    og('og:site_name', SITE.name);
    og('og:locale', SITE.locale);
    if (type === 'article') {
      og('article:published_time', published);
      og('article:modified_time', updated || published);
      og('article:publisher', SITE.name);
    }

    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', title);
    meta('twitter:description', description);
    meta('twitter:image', img);

    jsonLd.filter(Boolean).forEach((block, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = `${path || 'route'}-${i}`;
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      undo.push(() => script.remove());
    });

    return () => {
      for (let i = undo.length - 1; i >= 0; i -= 1) undo[i]();
    };
  }, [key]);
}
