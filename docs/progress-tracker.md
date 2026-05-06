# Progress Tracker — Next Tech Labs Portfolio

> Living document. Update on every meaningful change. Never delete entries — move them between sections.
> Date format: YYYY-MM-DD.

---

## Status snapshot

| Metric | Value |
|---|---|
| Phase | M1 — Initial scaffold |
| Last updated | 2026-05-06 |
| Next milestone | M2 — Polish + real cover art per project |
| Live URL | _not deployed yet_ |
| Lighthouse (Mobile) | _not measured yet — capture on first deploy_ |

---

## Roadmap (milestones)

### M1 — Initial scaffold _(in progress)_
- [x] Project rules: 6 doc files in `docs/`
- [x] Vite 8 + React 19 + Tailwind 4 baseline
- [x] Brand tokens in `@theme`
- [x] Static data: `projects.js`, `services.js`, `company.js`, `tech-stack.js`
- [x] UI primitives: Button, Badge, Card, Container, SectionLabel, GridBackdrop
- [x] Layout: Navbar, Footer, RootLayout
- [x] Pages: Home, Projects, Project Detail, Services, About, Contact
- [x] Routing wired in `App.jsx`

### M2 — Polish & content (planned)
- [ ] Replace gradient covers with handcrafted CSS art per project (one signature visual each)
- [ ] Add OG image generator script for social sharing (build-time)
- [ ] Real demo links / case study PDFs for the 3 strongest projects
- [ ] Add a "Brands" subsection on About showing Real News Hub + NextechLabs as parent + brand
- [ ] Smooth scroll-jacked hero on desktop only (respects reduced-motion)
- [ ] WhatsApp click-to-chat with prefilled message on Contact

### M3 — Distribution (planned)
- [ ] Deploy to Hostinger static hosting via `dist/` upload, behind Cloudflare
- [ ] Custom domain: nexttechlabs.com (or .ae if AE-targeted)
- [ ] Configure 301 redirects from old paths if any
- [ ] Submit sitemap.xml to Google Search Console + Bing
- [ ] Add JSON-LD `Organization` and `Person` schema

### M4 — Iteration & growth (planned)
- [ ] Per-project case study pages (long-form, MDX or static markdown rendering)
- [ ] Light theme variant (toggle, persisted to `localStorage`)
- [ ] i18n: Arabic locale (RTL support) — relevant for GCC-facing brand
- [ ] Blog section if Real News Hub or Islamic-history content needs a home

---

## Active tasks (this week)

_Move items here when started, move out when done._

- [ ] _none — M1 just landed_

---

## Done log

### 2026-05-06
- ✅ Bootstrapped repo with the modular architecture skill (web-only profile, no Firebase/Hasura since no backend)
- ✅ All 6 governance docs authored
- ✅ Vite 8 + React 19 + Tailwind 4 (CSS-first `@theme`) configured
- ✅ Brand tokens locked: bg `#0D1117`, accent `#7F4DF3`, success `#27C45A`
- ✅ Initial project corpus seeded from the NextechLabs / Real News Hub portfolio (17 entries across mobile, web, AI/SaaS, media, infra, tools)
- ✅ All deps written as `"latest"` per the always-latest rule. Resolved versions: React 19.2.5, Vite 8.0.10, React Router 7.15.0, Tailwind 4.2.4, framer-motion 12.38.0, lucide-react 1.14.0
- ✅ Production build verified: 76 KB gzipped initial JS, 51 KB gzipped lazy chunk per page — under the 180 KB budget
- ✅ Routes lazy-loaded via `React.lazy` + `Suspense` for code-splitting
- ✅ Static icon mapping (`lib/service-icons.js`) replaces dynamic `Icons[name]` lookup so tree-shaking actually trims lucide-react

---

## Decisions log

> Capture every non-obvious technical or design decision so future-you / future-AI doesn't redebate it.

### 2026-05-06 — No backend, ever (in this repo)
**Context**: Could have wired Firebase Auth + Hasura per the canonical modular-app-architecture skill.
**Decision**: This is a static showcase only. Backend explicitly out of scope.
**Why**: No user-generated data, no auth, no analytics-by-default. Static deployment maximizes uptime, minimizes cost, and removes failure modes. Contact CTA goes to mailto/WhatsApp.
**Reversal cost**: Low — `data/` boundary already isolates content.

### 2026-05-06 — JavaScript, not TypeScript (for now)
**Context**: Modular architecture skill is JS-friendly; user preferences specify `.jsx` and `.js`.
**Decision**: Stay JS. JSDoc props instead of TS types.
**Why**: Faster scaffolding, fewer build steps, lower friction for the user's solo dev flow.
**Reversal cost**: Medium — bulk-convert with `tsc --init` and rename when the project crosses ~30 components or ~5 contributors.

### 2026-05-06 — Tailwind 4 CSS-first config, not `tailwind.config.js`
**Context**: Tailwind 4 supports both, but the JS config path is now legacy.
**Decision**: All theme tokens live in `src/styles/index.css` under `@theme {}`.
**Why**: Single source of truth, less ceremony, better hot-reload, future-proof.
**Reversal cost**: Trivial.

### 2026-05-06 — Aesthetic direction: "Engineered Editorial"
**Context**: Required brand colors are dark navy + purple, which can feel generic. Frontend-design skill warns against AI-default purple-on-anything.
**Decision**: Treat the dark theme as a **technical journal** — Bricolage Grotesque headlines, Geist Mono metadata, numbered section labels (`01 / PROJECTS`), subtle dot grid backdrop, purple used as a precise highlight only on CTAs and active states. No gradient washes.
**Why**: Distinguishes from generic SaaS dark-mode templates while honoring the brand color contract.
**Reversal cost**: Low — fonts and accent rules are tokenized.

### 2026-05-06 — Neutral glyphs for social channels (lucide v1 dropped brand icons)
**Context**: lucide-react 1.x removed all brand-shape icons (GitHub, LinkedIn, YouTube, Instagram, Facebook) over trademark concerns.
**Decision**: Use neutral editorial glyphs (`Play`, `AtSign`, `Globe`, `Radio`, `Code2`) and let the text label do the brand identification. Don't pin lucide back to 0.x — `latest` rule wins, and the editorial voice already favors text over decoration.
**Why**: Honors `@latest` rule and matches the design direction (text-first, glyph as accent).
**Reversal cost**: Trivial — swap the map in `pages/ContactPage.jsx` if lucide brings them back.

### 2026-05-06 — All deps `"latest"` in `package.json`
**Context**: Updated `modular-app-architecture` skill mandates this.
**Decision**: Use `"latest"`. Lockfile is the pin.
**Why**: Skill rule. Also trivially reproducible via committed `package-lock.json`.
**Reversal cost**: Trivial — re-run `npm install` after pinning.

---

## Tech debt

_Things knowingly deferred. Each entry has an owner and an exit criterion._

- **No TS types** — exit when contributor count > 1 or component count > 30. Owner: tech lead.
- **CSS-only project covers** — placeholder gradient generator stands in until per-project art lands in M2. Owner: design.
- **No analytics** — by design, but if a marketing need emerges, choose privacy-first (Plausible / Umami self-hosted on the existing VPS), not GA. Owner: product.
- **No automated test suite** — acceptable while site is single-author and content-only. Add Vitest + React Testing Library if interactive features grow (filter, search, modal flows). Owner: tech lead.

---

## Blockers

_None._

---

## Open questions

- Do we want a separate **Brands** page (Real News Hub, NextechLabs as a brand under Kpanda Holding-style umbrella)? Currently planned as a section on About.
- Should case studies be inline on `/projects/:id` or split to `/projects/:id/case-study`? Defaulting to inline until copy length forces a split.
- Localization: does Arabic ship in M4 or wait until traffic data justifies it?

---

## How to update this file

When you finish a task:
1. Move the checkbox from the relevant milestone section into "Done log" with today's date.
2. If a decision was made, append to "Decisions log".
3. If something is deferred, add to "Tech debt" with an owner and exit criterion.
4. If you hit a wall, add to "Blockers" and note who can unblock.

Updating this file **is** part of the task. A change without a tracker update is incomplete.
