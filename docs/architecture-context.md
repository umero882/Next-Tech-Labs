# Architecture Context — Next Tech Labs Portfolio

> The map of the codebase. Read this before adding any new file.

---

## 1. What this app is, structurally

A **static, client-rendered SPA**. No backend, no auth, no API. All data lives in JS modules under `src/data/`. Routing is client-side via React Router 7 in **declarative mode** (no SSR loaders required).

Built artifact: a `dist/` folder containing static HTML/JS/CSS. Deploys anywhere static hosting is supported (Netlify, Vercel static, Cloudflare Pages, S3 + CloudFront, GitHub Pages, Hostinger static, plain Nginx).

---

## 2. Directory tree (canonical)

```
nexttech-portfolio/
├── docs/                        # The 6 governance files. Source of truth for AI work.
│   ├── ai-workflow-rules.md
│   ├── architecture-context.md  ← you are here
│   ├── code-standards.md
│   ├── progress-tracker.md
│   ├── project-overview.md
│   └── ui-context.md
│
├── public/                      # Static assets served as-is (favicon, og image, robots.txt)
│
├── src/
│   ├── main.jsx                 # React 19 entry, mounts <App />, sets up router
│   ├── App.jsx                  # Router root, defines route table
│   ├── styles/
│   │   └── index.css            # Tailwind 4 entry + @theme tokens (brand colors, fonts)
│   │
│   ├── data/                    # Pure data, no React. Single source of truth for content.
│   │   ├── projects.js          # Every showcased project (the heart of the site)
│   │   ├── services.js          # What Next Tech Labs sells
│   │   ├── company.js           # Brand info, contact channels, social links
│   │   └── tech-stack.js        # Technologies used across projects (for filters + badges)
│   │
│   ├── lib/                     # Pure functions. No React. No side effects in module scope.
│   │   ├── cn.js                # className merger (clsx + tailwind-merge style)
│   │   ├── format.js            # Number/date formatters
│   │   └── filter.js            # Project filter / sort helpers
│   │
│   ├── hooks/                   # Reusable React hooks. Each hook in its own file.
│   │   ├── useScrollProgress.js
│   │   ├── useReducedMotion.js
│   │   └── useProjectFilter.js
│   │
│   ├── components/
│   │   ├── ui/                  # Atomic primitives. shadcn-style API. No business logic.
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── SectionLabel.jsx     # The "01 / PROJECTS" editorial labels
│   │   │   ├── GridBackdrop.jsx     # The subtle dot/grid background
│   │   │   └── MarqueeRow.jsx
│   │   │
│   │   ├── layout/              # App shell. Used by every page.
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── RootLayout.jsx
│   │   │
│   │   ├── sections/            # Page-level composed sections. Compose UI primitives + data.
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedProjects.jsx
│   │   │   ├── ServicesPreview.jsx
│   │   │   ├── StatsBand.jsx
│   │   │   ├── TechStackTicker.jsx
│   │   │   └── CallToAction.jsx
│   │   │
│   │   └── projects/            # Anything specific to rendering project entries.
│   │       ├── ProjectCard.jsx
│   │       ├── ProjectGrid.jsx
│   │       ├── ProjectFilters.jsx
│   │       └── ProjectMeta.jsx
│   │
│   └── pages/                   # One file per route. Composes sections.
│       ├── HomePage.jsx
│       ├── ProjectsPage.jsx
│       ├── ProjectDetailPage.jsx
│       ├── ServicesPage.jsx
│       ├── AboutPage.jsx
│       └── ContactPage.jsx
│
├── index.html                   # Vite entry HTML, sets <html lang>, fonts preconnect, meta
├── package.json                 # All deps as "latest"
├── vite.config.js               # @tailwindcss/vite + @vitejs/plugin-react
├── jsconfig.json                # Path aliases (@/* → src/*)
├── .gitignore
└── README.md
```

---

## 3. Layers (the four-layer model from the modular-app-architecture skill)

This portfolio uses a **simplified** version of the canonical four layers because there is no backend:

| Canonical layer | Portfolio incarnation | Lives in |
|---|---|---|
| UI Layer | React components | `components/{ui,layout,sections,projects}/`, `pages/` |
| Domain Layer | Filter/sort logic, project model invariants | `hooks/`, `lib/filter.js` |
| API Layer | **N/A** — replaced by static data modules | `data/` |
| Utils Layer | Pure helpers | `lib/` |

The dependency direction is strictly downward; see `ai-workflow-rules.md §3`.

---

## 4. Data model

### Project (the central entity)

```js
{
  id: 'kebab-case-unique',          // Used in URLs: /projects/:id
  name: 'Display Name',
  tagline: 'One-liner for cards',   // ≤ 80 chars
  description: 'Paragraph for detail view',
  category: 'mobile' | 'web' | 'ai-saas' | 'media' | 'tools' | 'infra',
  status: 'live' | 'beta' | 'in-development' | 'concept',
  year: 2026,
  client: 'NextechLabs internal' | string,   // Self-built or for whom
  stack: ['React Native', 'Firebase', ...],   // Tags shown as badges
  highlights: ['bullet 1', 'bullet 2', ...],  // Outcomes / what makes it interesting
  links: { live?: url, repo?: url, case_study?: path },
  featured: boolean,                          // Surface on home page
  cover: { type: 'gradient' | 'pattern', tokens: [...] }  // No image deps; CSS-only covers
}
```

### Service

```js
{ id, title, summary, deliverables: [...], iconName: 'Lucide icon name' }
```

### Company

```js
{ name, legalName, tagline, manifesto, founded, location, brands: [...], channels: { email, whatsapp, ... }, socials: [...] }
```

These shapes are validated only at runtime by the consuming components — there's no Zod schema. If the shape needs to change, update `projects.js` first, then update consumers.

---

## 5. Routing

React Router 7 declarative mode. Routes registered in `App.jsx`.

| Path | Component | Purpose |
|---|---|---|
| `/` | `HomePage` | Hero + featured projects + services preview + CTA |
| `/projects` | `ProjectsPage` | Full filterable grid |
| `/projects/:id` | `ProjectDetailPage` | Single project deep-dive |
| `/services` | `ServicesPage` | What we offer |
| `/about` | `AboutPage` | Company story + tech stack + brands |
| `/contact` | `ContactPage` | Channels (email, WhatsApp, social). No form (no backend). |
| `*` | inline 404 | Minimal not-found block, links back to `/` |

`<RootLayout />` wraps every route and renders `<Navbar />` and `<Footer />` around the `<Outlet />`.

---

## 6. State management

There is essentially no global state. Each page manages its own:

- **`ProjectsPage`** owns the filter state via `useProjectFilter()` (category, search query, sort).
- **Navbar** owns its mobile-menu open/close state.
- **No** Redux, Zustand, Jotai, or Context provider for app state. If a future feature needs cross-route state, escalate via `progress-tracker.md` before adding one.

---

## 7. Styling architecture

- **Tailwind 4 CSS-first** config: brand tokens live in `src/styles/index.css` under `@theme {}`.
- All components style themselves through Tailwind utility classes only.
- Component variants use the `cn()` helper in `lib/cn.js` (tiny clsx + tailwind-merge wrapper).
- One-off motion values may use inline `style={{...}}` (e.g. for framer-motion animation targets); structural styling never does.
- Animations: `framer-motion` for component-scoped motion; tailwind utility classes (`transition-*`, `animate-*`) for hover/focus and CSS-only effects.

The full design language is documented in `ui-context.md`.

---

## 8. Build & deploy

```bash
npm install         # All "latest" packages resolved into lockfile
npm run dev         # Vite dev server, port 5173
npm run build       # Production build → dist/
npm run preview     # Local preview of production build
```

Deploy: drop `dist/` on any static host. No environment variables required. No build-time secrets.

---

## 9. Why this architecture is right for this product

- **No backend** removes 80% of typical web-app failure modes.
- **Static data modules** mean adding a project is a one-file PR and instantly previewable.
- **Modular layers** mean a future swap (e.g. moving to a CMS, or splitting into a marketing site + dashboard) only changes the `data/` boundary — components stay.
- **Same color and component primitives as the rest of the Next Tech Labs ecosystem** (per the `modular-app-architecture` skill) means a future shared design package can absorb `components/ui/*` with zero rework.
