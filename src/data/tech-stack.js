/**
 * The studio's standard stack.
 *
 * Each entry has:
 *   - name: display label (used as alt text and a small caption)
 *   - slug: simpleicons.org slug, served via https://cdn.simpleicons.org/<slug>
 *   - color: optional hex override for icons whose brand color is too dark on
 *            our dark surface (defaults to the brand's color)
 */
export const techStack = [
  { name: 'React 19',       slug: 'react' },
  { name: 'React Native',   slug: 'react' },
  { name: 'Expo SDK 55',    slug: 'expo',          color: 'FFFFFF' },
  { name: 'Vite 8',         slug: 'vite' },
  { name: 'Next.js',        slug: 'nextdotjs',     color: 'FFFFFF' },
  { name: 'Tailwind CSS 4', slug: 'tailwindcss' },
  { name: 'Framer Motion',  slug: 'framer',        color: 'FFFFFF' },
  { name: 'Firebase Auth',  slug: 'firebase' },
  { name: 'Hasura GraphQL', slug: 'hasura' },
  { name: 'Apollo Client 4', slug: 'apollographql', color: 'FFFFFF' },
  { name: 'PostgreSQL',     slug: 'postgresql' },
  { name: 'Nx Monorepo',    slug: 'nx',            color: 'FFFFFF' },
  { name: 'Docker',         slug: 'docker' },
  { name: 'Nginx',          slug: 'nginx' },
  { name: 'Prometheus',     slug: 'prometheus' },
  { name: 'Grafana',        slug: 'grafana' },
  { name: 'Loki',           slug: 'grafana' }, // no Loki icon — Loki is Grafana family
  { name: 'Claude API',     slug: 'anthropic',     color: 'FFFFFF' },
  { name: 'Remotion',       slug: 'remotion',      color: 'FFFFFF' },
  { name: 'Stripe',         slug: 'stripe' },
  { name: 'Playwright',     slug: 'playwright' },
];

export const categories = [
  { id: 'all',     label: 'All work' },
  { id: 'mobile',  label: 'Mobile' },
  { id: 'web',     label: 'Web' },
  { id: 'ai-saas', label: 'AI / SaaS' },
  { id: 'media',   label: 'Media' },
  { id: 'tools',   label: 'Tools' },
  { id: 'infra',   label: 'Infra' },
];
