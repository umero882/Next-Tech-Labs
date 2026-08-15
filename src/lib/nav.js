/**
 * Every link the site's chrome renders — studio and per-project.
 *
 * Centralised for one reason: the navbar and footer used to hard-code a link to
 * First Bite's blog, so the studio advertised one product's writing as the
 * company's. Keeping both link sets here lets a unit test assert that studio
 * chrome never points inside /projects/<id>/, which makes that leak impossible
 * to reintroduce quietly.
 *
 * Imports are relative, not the `@/` alias: `node --test` and the scripts in
 * `scripts/` load this module outside Vite, where the alias does not resolve.
 */
import { projects } from '../data/projects.js';
import { company } from '../data/company.js';

/** The studio's own nav. Nothing here may point into a product. */
export const STUDIO_NAV_ITEMS = [
  { to: '/',           label: 'Home', end: true },
  { to: '/projects',   label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/tech',       label: 'Tech' },
  { to: '/contact',    label: 'Contact' },
  { to: '/about',      label: 'About' },
];

/** The footer's "Site" column. Same rule. */
export const FOOTER_SITE_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Products',   href: '/projects' },
  { label: 'Categories', href: '/categories' },
  { label: 'Tech',       href: '/tech' },
  { label: 'Contact',    href: '/contact' },
  { label: 'About',      href: '/about' },
];

/**
 * The five items every project's nav carries, in order.
 * `gate` names the `site` flag that decides live-vs-soon; null means universal.
 */
const PROJECT_NAV = [
  { key: 'home',    label: 'Home',    path: () => '/',                          end: true,  gate: null },
  { key: 'product', label: 'Product', path: (p) => `/projects/${p.id}`,         end: true,  gate: null },
  { key: 'blog',    label: 'Blog',    path: (p) => `/projects/${p.id}/blog`,    end: false, gate: 'blog' },
  { key: 'about',   label: 'About',   path: (p) => `/projects/${p.id}/about`,   end: false, gate: 'about' },
  { key: 'contact', label: 'Contact', path: (p) => `/projects/${p.id}/contact`, end: false, gate: null },
];

/**
 * The project this pathname sits inside, or null.
 *
 * `/projects` and unknown slugs return null on purpose: the index belongs to the
 * studio, and an unknown slug renders a 404 that should not wear a product's
 * chrome.
 */
export function matchProjectRoute(pathname = '') {
  const [, root, id] = pathname.split('/');
  if (root !== 'projects' || !id) return null;
  return projects.find((p) => p.id === id) ?? null;
}

export function projectNavItems(project) {
  return PROJECT_NAV.map(({ key, label, path, end, gate }) => ({
    key,
    label,
    end,
    to: path(project),
    soon: gate ? !project.site?.[gate] : false,
  }));
}

/** The nav CTA for a project, or null when there is no app to send people to. */
export function projectCta(project) {
  const { appStore, playStore } = project.links ?? {};
  if (!appStore && !playStore) return null;
  return { label: 'Get the app', to: `/projects/${project.id}#get-the-app` };
}

/**
 * Where this project's contact form delivers.
 *
 * `import.meta.env` is undefined outside Vite, hence the optional chain — this
 * module is loaded by `node --test`.
 */
export function resolveSupport(project) {
  return {
    email: project?.support?.email ?? company.channels.email,
    formKey: project?.support?.formKey ?? import.meta.env?.VITE_WEB3FORMS_KEY ?? null,
  };
}
