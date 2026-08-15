/**
 * Blog selectors. Pure — no React, no side effects.
 */

/** Site-relative path for a post slug. */
export function postPath(slug) {
  return `/blog/${slug}`;
}

/** Newest first. Does not mutate the input. */
export function sortPostsByDate(list = []) {
  return [...list].sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function findPost(list = [], slug) {
  return list.find((p) => p.slug === slug);
}

/**
 * The post's own `related` slugs first, topped up with same-topic posts so the
 * block is never half-empty when a slug goes stale.
 */
export function relatedPosts(list = [], post, limit = 2) {
  if (!post) return [];
  const picked = (post.related || [])
    .map((slug) => findPost(list, slug))
    .filter(Boolean);

  const fallback = sortPostsByDate(list).filter(
    (p) => p.slug !== post.slug && !picked.some((x) => x.slug === p.slug),
  );

  return [...picked, ...fallback].slice(0, limit);
}

/** Distinct topics in publication order, for the index page filter rail. */
export function postTopics(list = []) {
  return [...new Set(list.map((p) => p.topic))];
}

/** "6 July 2026" — stable across locales we care about, no timezone drift. */
export function formatPostDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
