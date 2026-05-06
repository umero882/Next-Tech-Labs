# Next Tech Labs — Portfolio

A static, web-only portfolio site showcasing the work of **Next Tech Labs** — a software studio shipping mobile, web, AI, and infrastructure products.

No backend. No auth. No CMS. Just React, Vite, Tailwind, and a deliberately tight design system.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Run dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

> Requires Node 20.19+ (Vite 8 minimum).

---

## Project rules — read these first

The full governance lives in `docs/`:

1. [`docs/ai-workflow-rules.md`](./docs/ai-workflow-rules.md) — hard rules for any AI/dev working on this repo
2. [`docs/architecture-context.md`](./docs/architecture-context.md) — directory map, layers, routing
3. [`docs/code-standards.md`](./docs/code-standards.md) — per-file conventions
4. [`docs/progress-tracker.md`](./docs/progress-tracker.md) — what's done, what's next
5. [`docs/project-overview.md`](./docs/project-overview.md) — what this site is and who it's for
6. [`docs/ui-context.md`](./docs/ui-context.md) — design tokens, fonts, motion, voice

If you're an AI assistant editing this repo: read all six in that order before writing any code.

---

## Stack

- **React 19** + **Vite 8**
- **React Router 7** (declarative)
- **Tailwind CSS 4** — CSS-first `@theme` config in `src/styles/index.css`
- **framer-motion 12** for entrance and hover motion
- **lucide-react** for iconography
- **use-debounce** + **react-window** (added when search-heavy lists arrive)
- **clsx** + **tailwind-merge** via the `cn()` helper

All deps written as `"latest"` per the always-latest rule. The lockfile is the pin. See `docs/ai-workflow-rules.md §2`.

---

## Adding a project

1. Open `src/data/projects.js`.
2. Append a new object matching the existing schema (see `docs/architecture-context.md §4`).
3. Pick a `cover` variant: `mesh`, `stripes`, `grid`, or `orb` — and supply 2–3 hex colors in `cover.tokens`.
4. If it should appear on the home page, set `featured: true`.
5. Save. The Projects page picks it up immediately.

No DB, no API, no migration. That's the whole point.

---

## Adding a page

1. Create `src/pages/MyPage.jsx`. Default-export the page component.
2. Compose existing sections from `src/components/sections/*` and primitives from `src/components/ui/*`.
3. Wire the route in `src/App.jsx`.
4. Add a nav entry in `src/components/layout/Navbar.jsx` if it should be in primary nav.

---

## Deployment

The build output (`dist/`) is fully static. Drop it on any static host:

- Hostinger static hosting (NTL's existing rig) ✓
- Netlify drop ✓
- Vercel static ✓
- Cloudflare Pages ✓
- Plain Nginx ✓
- S3 + CloudFront ✓

No environment variables. No build secrets.

For client-side routing on a static host, configure a fallback to `/index.html` for unknown paths (e.g. Netlify `_redirects`: `/*  /index.html  200`, or Nginx `try_files`).

---

## Brand contract (do not modify without discussion)

| Token | Value |
|---|---|
| Background | `#0D1117` |
| Text primary | `#FFFFFF` |
| Text secondary | `#C8C8C8` |
| Accent | `#7F4DF3` |
| Success | `#27C45A` |

All other tokens live in `src/styles/index.css` under `@theme`. Tailwind utilities (`bg-bg-primary`, `text-accent`, etc.) are generated from those tokens — never hard-code hex in components.

---

## Aesthetic direction: "Engineered Editorial"

A technical journal, not a SaaS landing page. Bricolage Grotesque headlines, JetBrains Mono metadata, Geist Sans body. Numbered section labels (`01 / WORK`). Subtle dot-grid backdrops. Purple as a precise highlight, never a gradient wash.

See `docs/ui-context.md` for the full design language.

---

## License

Private. © Next Tech Labs.
