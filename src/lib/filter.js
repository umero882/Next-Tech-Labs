/**
 * Filter projects by category and free-text query.
 *
 * @param {Array} projects
 * @param {{ category?: string, query?: string }} opts
 * @returns {Array}
 */
export function filterProjects(projects, { category = 'all', query = '' } = {}) {
  const q = query.trim().toLowerCase();

  return projects.filter((p) => {
    const inCategory = category === 'all' || p.category === category;
    if (!inCategory) return false;
    if (!q) return true;

    const haystack = [
      p.name,
      p.tagline,
      p.description,
      p.client,
      ...(p.stack ?? []),
      ...(p.highlights ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}

/**
 * Group projects by category for indexed views.
 */
export function groupByCategory(projects) {
  return projects.reduce((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});
}

/**
 * Stable sort: featured first, then by year desc, then by name asc.
 */
export function sortShowcase(projects) {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.year !== b.year) return b.year - a.year;
    return a.name.localeCompare(b.name);
  });
}
