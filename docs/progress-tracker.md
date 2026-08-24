# Progress Tracker — Next Tech Labs Portfolio

> Living document. Update on every meaningful change. Never delete entries — move them between sections.
> Date format: YYYY-MM-DD.

---

## Status snapshot

| Metric | Value |
|---|---|
| Phase | M3 — Distribution |
| Last updated | 2026-08-24 |
| Next milestone | Submit `sitemap.xml` to Google Search Console + Bing |
| Live URL | https://nextechlabs.org |
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
- [x] Generate `sitemap.xml` + `robots.txt` (2026-08-15 — `scripts/generate-sitemap.mjs`, runs on `prebuild`)
- [ ] **Submit sitemap.xml to Google Search Console + Bing** ← next SEO action, needs account access
- [x] Add JSON-LD (2026-08-15 — `BlogPosting`, `FAQPage`, `BreadcrumbList`, `MobileApplication`, `Blog`)
- [ ] Add JSON-LD `Organization` schema on the home/about pages

### M4 — Iteration & growth (planned)
- [ ] Per-project case study pages (long-form, MDX or static markdown rendering)
- [ ] Light theme variant (toggle, persisted to `localStorage`)
- [ ] i18n: Arabic locale (RTL support) — relevant for GCC-facing brand
- [x] Blog section (2026-08-15 — `/blog` shipped with the First Bite content cluster)
- [ ] ~~Prerender routes to static HTML~~ — **measured 2026-08-17: not needed for Google.** Keep parked unless a non-Google surface justifies it (see Decisions log).

---

## Active tasks (this week)

_Move items here when started, move out when done._

- [ ] _none — M1 just landed_

---

## Done log

### 2026-08-24
- ✅ **Added Sunnah Habit Tracker (`sunnah-habit-tracker`, P-20) to `data/projects.js`** — Islamic habit-building app, `mobile` category, `beta`, featured. Sourced from the repo at `C:\dev\Projects\Sunnah Habit Tracker` (README phase log, `docs/PRD.md`, `docs/RELEASE.md`, `docs/RELEASE_NOTES.md`, `apps/mobile/app.json`, 279 commits) — every number on the page comes from that tree or from the app's own screens, none from guesswork.
- ✅ **Built the showcase page** (`pages/projects/SunnahHabitTrackerPage.jsx`, registered in `ProjectDetailPage` customPages) — hero, a six-tile screen band, six-feature grid, three deep dives (the recitation listener, the cited-answer Ask, the progress tab), an integrity dossier, a free-with-known-limits section, build spec, legal row, CTA. Mirrors the First Bite page pattern and reuses `StoreBadges`, `PhoneFrame`-style framing, `SectionLabel`, `StatusDot`, `Badge`.
- ✅ **Ten real marketing screenshots** copied to `public/projects/sunnah-habit-tracker/` (onboarding, home, prayers, habits, progress, learn, profile, qa'idah, recite, qur'an) plus a 512×512 app icon at `public/projects/sunnah-habit-tracker-icon.png` (107 KB, resized from the app's 1.6 MB `icon.png` with sharp). All ten are used on the page — no dead assets.
- ✅ **SEO**: `sunnahHabitSeo()` in `lib/routeSeo.js`, added to `prerenderRoutes()`, so the route now bakes its own title, canonical, OG/Twitter and 2 JSON-LD blocks into static HTML. `appJsonLd()` takes an optional `applicationCategory` — Sunnah is `LifestyleApplication`, First Bite keeps the `HealthApplication` default.
- ✅ **Fixed `buildMobileAppJsonLd` emitting `installUrl: []`** for an app with no store listing — an empty array asserts the app installs from nowhere. Now `installUrl`/`sameAs` are omitted together when there are no links; First Bite's output is byte-identical.
- ✅ `verify-routes.mjs` now requires `/projects/sunnah-habit-tracker` in the sitemap; the prerender assertions pick the route up automatically. Build green, `npm run verify` all-pass, suite 48/48. Page chunk 25 KB (7.8 KB gzipped); initial JS unchanged at 117 KB gzipped, budget 180 KB.
- ✅ **Deployed and verified live** (`f946b13`, deployment `svc0h4u4txohzf4euh24py1g`, status `finished`). `nextechlabs.org/projects/sunnah-habit-tracker` returns its own prerendered `<title>` and self-referencing canonical, 2 `ld+json` blocks marked `data-prerendered`, `MobileApplication` typed `LifestyleApplication` with **no** empty `installUrl`, and `#root` intact. All 11 new assets serve 200 at their exact byte sizes; live `sitemap.xml` is up to 53 URLs and lists the new route.

### 2026-08-17 (later)
- ✅ **Prerendered per-route `<head>` for the 7 First Bite routes** (`scripts/prerender.mjs`, runs on `postbuild`). Closes the one gap the render test left: link unfurlers and AI crawlers read raw HTML and never run JS, so every article previewed as "Next Tech Labs — software, shipped." with the studio's default image. Now each route ships real title, description, canonical, robots, OG, Twitter and JSON-LD. **Scope is `<head>` only** — body stays `<div id="root"></div>`, React boots unchanged, no SSR bundle, no hydration.
- ✅ **`lib/routeSeo.js` — one definition, two consumers.** The React pages and the prerender script now share the same descriptors, so baked HTML cannot drift from the rendered page. `BlogPage`, `BlogPostPage` and `FirstBitePage` reduced to a single `useSeo(<descriptor>())` call.
- ✅ **Handled the duplicate-structured-data trap.** Prerendered `ld+json` is tagged `data-prerendered`; `useSeo` strips it before injecting its own. Verified in a browser against the real nginx image: **4 blocks before React, 4 after** (0 prerendered, 4 hook-owned), and still 4 with one canonical after client-side navigation to another post.
- ✅ **nginx `try_files $uri $uri/index.html /index.html`** — deliberately not `$uri/`, which makes nginx do its own index handling and 403 on directories without one. Validated against the real config in a container before deploying.
- ✅ Verified live as a JS-less crawler: all 4 prerendered routes return their own `og:title`/canonical/JSON-LD. Regression sweep of 16 routes all 200; both legacy `/blog` → `/projects/first-bite/blog` 301s intact.
- ✅ `verify-routes.mjs` now asserts the prerender on build output (title, self-referencing canonical, ld+json count, `data-prerendered` marker, intact `#root`, no default title). Suite 17/17.
- ⚠️ **Docker layer cache served stale source twice** during local image builds — a test failed against an assertion that no longer exists in the tree, and a later build lost `vite`. `docker build --no-cache` resolved both. Coolify clones fresh so it isn't affected, but don't trust a local image build without `--no-cache`.

### 2026-08-17
- ✅ **Settled the prerendering question with a measurement instead of a guess.** Ran the live peanut post through Google's Rich Results Test (same renderer Googlebot indexes with). Raw HTML is an empty shell — default title, canonical pointing at `/`, zero JSON-LD. After Googlebot renders: correct per-route title, correct canonical, all four JSON-LD blocks, full article body in Google's own screenshot, **3 valid rich-result items**. Conclusion: prerendering is unnecessary for search. Tech-debt entry downgraded, M4 item parked. Detail in the Decisions log.
- ✅ **Fixed the 4 non-critical structured-data warnings it surfaced.** `datePublished`/`dateModified` carried a bare `YYYY-MM-DD`, which Google flags as "Invalid datetime value" + "missing a timezone". Added `toIsoDateTime()` in `lib/seo.js` — posts stay authored as plain dates in `data/blog.js`, and the builder widens them to midnight UTC with an explicit offset. Applied to `BlogPosting`, the `Blog` index listing, and the OG `article:published_time`/`article:modified_time` tags. Re-tested after deploy: **Articles now reports zero issues** (`ddb7e12`).
- ✅ Left the remaining `Missing field "aggregateRating"` warning on Software Apps **deliberately** — we don't invent review data. It resolves itself when the store listings have real ratings worth citing.
- ✅ Tests: 6 new cases in `src/lib/seo.test.js`; suite 16/16 green. `npm run verify` passes.

### 2026-08-15
- ✅ **Shipped `/blog` — an SEO content cluster for the First Bite app.** Five long-form, source-cited articles at `/blog/:slug` targeting high-intent parent search: peanut introduction, the Big 9 allergen schedule, starting solids, food-allergy reaction signs, and baby-led weaning vs purées. Every post carries key takeaways, a table of contents, a visible FAQ that matches its `FAQPage` structured data, a linked sources list, a not-medical-advice disclaimer, a mid-article download strip, and a full App Store + Google Play download CTA. Metadata in `data/blog.js` (pure, importable by Node); prose in `pages/blog/posts/*.jsx`.
- ✅ **Built the SEO layer the site never had.** `lib/seo.js` (pure JSON-LD builders + `SITE` constants) and `hooks/useSeo.js`, which writes per-route `<title>`, description, canonical, robots, OG, Twitter, and `ld+json` into `<head>` and reverses every change on unmount so routes can't leak metadata into each other. Applied to `/blog`, `/blog/:slug`, and the First Bite showcase page.
- ✅ **`sitemap.xml` + `robots.txt`.** `scripts/generate-sitemap.mjs` derives 41 URLs from the route table, `data/projects.js`, and `data/blog.js`; wired to `prebuild` so it regenerates on every build (`npm run sitemap` to run it alone).
- ✅ **Extracted `components/ui/StoreBadges.jsx`** — the official Apple/Google badge pair, previously duplicated inline in `FirstBitePage`. Props-driven with the grayscale "Coming soon" fallback preserved. First Bite page refactored onto it; store URLs for blog CTAs come from `data/projects.js` so the blog can't drift from the showcase.
- ✅ **Internal linking:** Blog added to the Navbar and Footer; a "Guides" section on `/projects/first-bite` surfaces the three latest posts; posts cross-link each other and the app page.
- ✅ Fixed the site-wide `og:image` (it pointed at a non-existent `/og.png`) and added the missing `og:url`, `og:site_name`, `twitter:*`, canonical, and robots defaults in `index.html`.
- ✅ Verified on the production build: `/blog` and every post render, `<title>`/canonical/OG/article dates update per route, JSON-LD blocks are correct and are removed on route change, no horizontal overflow, store links resolve to both live listings. Initial JS still 116 KB gzipped (budget 180 KB); blog chunks 16 KB + 7 KB gzipped.

### 2026-06-27
- ✅ **First Bite is live on Google Play production** (Android passed Google Play production review). Wired the live **Google Play** badge on the showcase page (`pages/projects/FirstBitePage.jsx` — set `PLAY_STORE_URL` → `com.firstbite.app`, retiring the grayscale "Coming soon" fallback), flipped the hero status badge ("Live on the App Store · Android soon" → "Live on the App Store + Google Play"), and updated `data/projects.js` (highlight copy + `links.playStore`). Deployed via Coolify; verified live (deployed `FirstBitePage-DzI_LEym.js` contains the Play URL + new badge, no stale "Android soon"/"Coming soon"; commit `8af8cbb`).

### 2026-06-07
- ✅ Added + deployed a **Download section** to the Password Vault showcase (`/projects/password-manager`) — a live **Google Play** card linking to the production listing (`com.umero882.passwordvault`) and an **App Store "Coming soon"** card. Surfaced the Play link as the hero primary CTA ("Get it on Google Play"). Store marks are inline monochrome SVGs (lucide v1 dropped brand glyphs). Verified live (Play id + "Coming soon" + "GET THE APP" present in deployed `PasswordManagerPage-BDUSw4o2.js`; deployment `ivkgo9lj27e6sopjaus95ey9`).

### 2026-06-02
- ✅ Added **First Bite** (`first-bite`, P-19) to `data/projects.js` — baby allergy-prevention Expo SDK 56 app, `mobile` category, `beta`, featured. Sourced from the repo at `C:\dev\Projects\Firs Bite` (PRD.md / README.md, 130 commits, store-readiness complete).
- ✅ Wired conditional **"Visit live site"** outline button into `ProjectDetailPage` meta aside — renders only when `project.links.live` is set. First Bite live link: `https://coolify.nextechlabs.tech/`. (First project to populate `links`.)
- ✅ Built custom **First Bite showcase page** (`pages/projects/FirstBitePage.jsx`, registered in `ProjectDetailPage` customPages) — hero, app showcase, six-feature grid, three deep dives, safety/evidence dossier, trust-first monetization, build spec. Mirrors the Password Manager page pattern. Uses real app marketing assets copied to `public/projects/first-bite/` (icon + 3 onboarding shots; dropped the 5 MB paywall PNG for perf).
- ✅ Hosted **First Bite Privacy + Terms** at `/projects/first-bite/privacy` and `/projects/first-bite/terms` via `FirstBiteLegalLayout` + `FirstBitePrivacyPage` / `FirstBiteTermsPage` (reusing `legalProse`). Content written for a children's-health app (infant health data, reaction photos, Claude vision scanner, multi-caregiver sharing, RevenueCat, COPPA/GDPR-K, no-diagnosis disclaimers). Routes added to `App.jsx` before `/projects/:id`.
- ✅ Removed First Bite's external `links.live` (it had wrongly pointed at the Coolify admin host `coolify.nextechlabs.tech`); a mobile app has no website, so the showcase page is its web presence. Hero CTA now goes to Contact.
- ✅ Corrected `docs/INFRA.md` Coolify section (dashboard `…​.tech` not `…​.org`; real app uuids; tailnet-only API; actual token path) and deployed to production via the Coolify API. **First Bite is live** at `nextechlabs.org/projects/first-bite` (+ `/privacy`, `/terms`) — verified: assets 200, routes + data present in the deployed bundle (deployment `v6mtdx4v064th44idd7lf73p`).
- ✅ Swapped the First Bite showcase imagery for **seven real Android screenshots** (home, foods, meal plan, reaction log, protocol/Big-9, scanner, caregivers) in phone frames; removed the marketing photos + 910 KB icon. Redeployed and verified all seven serve 200 live (deployment `m11fwxavckmgah8p4z6nkhax`).
- ✅ Repointed First Bite app `apps/mobile/lib/legal.js` to the hosted URLs (`nextechlabs.org/projects/first-bite/privacy` + `/terms`) and set `SUPPORT_EMAIL` → `help@nextechlabs.org` (separate repo; edit only, deploy via their EAS pipeline).
- ✅ Added + deployed **support page** at `/projects/first-bite/support` — contact card, 10-item app-accurate FAQ, resource links. First Bite legal nav now: Support · Privacy · Terms · Delete account. Verified live (route 200, deployment `nbaxk2a2lhxny2vq4l3bspr5`).
- ✅ Added + deployed **account-deletion page** at `/projects/first-bite/delete-account` (App Store 5.1.1(v) / Play data-deletion requirement) — in-app delete steps, exact erasure scope, caregiver/subscription notes, email fallback. Added to legal nav tabs + showcase links. Verified live (route 200, present in deployed bundle; deployment `a4o8c8f11crsf9w12m92znc9`).

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

### 2026-08-24 — Sunnah Habit Tracker ships as `beta` with placeholder store badges
**Context**: The app is finished (all 14 roadmap phases, v1.0, iOS and Android builds run) and the obvious move was to list it `live` like First Bite.
**Decision**: `status: 'beta'`, `links: {}`, hero badge reads "In closed testing — iOS + Android", and both store badges render the grayscale "Coming soon" state.
**Why**: Measured, not assumed. `apps.apple.com/.../id6787725612` and `play.google.com/...?id=com.nextechlabs.sunnah` both return **404** — closed-testing tracks are not public listings. The App Store Connect record exists (ASC 6787725612) and the newest commit in the app repo is a submit profile for the Play closed-testing track, so "in closed testing" is exactly true. Brand value #1 is that everything here has shipped, is shipping, or is honestly labelled.
**Reversal cost**: Trivial. Fill `links.appStore` / `links.playStore` in `data/projects.js`, drop the URLs into `SunnahBadges`, flip `status` to `live`, and the badges, the card, the status dot and the sitemap's contact-route rule all follow.

### 2026-08-24 — Sunnah's legal pages stay on the app's own domain
**Context**: First Bite's privacy/terms/support/delete-account live under `nextechlabs.org/projects/first-bite/*`, so the reflex was to build the same four pages here.
**Decision**: Don't. The showcase page links out to `sunnah.nextechlabs.tech/{privacy,terms,delete-account}`.
**Why**: The app repo already ships and hosts `apps/legal-site` at that domain (verified 200), and those are the URLs the app's settings screen and the store submission forms point at. Copying them onto this site creates two canonical policies that will drift, and Apple/Google would then be reading the copy nobody remembers to update.
**Reversal cost**: Low — the pattern (`FirstBiteLegalLayout` + `legalProse`) is right there if the app ever drops its own site.

### 2026-08-15 — Runtime `<head>` injection, not SSR/prerender (for now)
**Context**: The blog exists to rank. A client-rendered SPA ships one `index.html` with one set of meta tags for every route.
**Decision**: Ship `hooks/useSeo.js`, which writes per-route title/description/canonical/OG/JSON-LD at runtime and reverses itself on unmount. No SSR, no prerender step, no new dependency.
**Why**: Google renders JavaScript and indexes this correctly. A prerender pipeline (`react-dom/server` + a route crawler, or a plugin) is a build-architecture change on a deployed, working site — disproportionate to adding a blog. The gap it leaves is real but narrow: crawlers and social scrapers that *don't* execute JS (Bing historically, Slack/LinkedIn unfurls) see only the site-wide defaults.
**Reversal cost**: Medium. `data/blog.js` is pure and route-addressable, so a prerender pass can enumerate every URL without touching the components. Tracked as an M4 item.

**Verified 2026-08-17 — the assumption held, don't redebate this.** Ran the live peanut post through Google's Rich Results Test, which uses the same Web Rendering Service Googlebot indexes with:

| Check | Raw HTML (no JS) | Googlebot after render |
|---|---|---|
| `<title>` | site-wide default | correct per-route title |
| canonical | `https://nextechlabs.org/` | correct post URL |
| JSON-LD blocks | 0 | 4 (BlogPosting, FAQPage, BreadcrumbList, MobileApplication) |
| Article body | absent | full page, confirmed in Google's own screenshot |

Result: **3 valid rich-result items detected** (Articles, Breadcrumbs, Software Apps). So prerendering buys nothing for Google Search and is not worth the build-architecture change. Revisit only for surfaces that read raw HTML — social unfurls — not for ranking.

### 2026-08-15 — Post metadata in `data/`, post prose in `pages/`
**Context**: The layer rule forbids React imports in `data/`, but articles are JSX.
**Decision**: Metadata (slug, title, description, keywords, dates, takeaways, FAQs) lives in `data/blog.js` with zero imports; the prose lives in `pages/blog/posts/<slug>.jsx` and is keyed by slug in `BlogPostPage`.
**Why**: The index page, the JSON-LD builders, and `scripts/generate-sitemap.mjs` all need post metadata — and the sitemap script is plain Node with no bundler, so it can only import an alias-free, React-free module. Splitting keeps the layer rule intact and makes the sitemap free.
**Reversal cost**: Low.

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
- **No prerendered body HTML** — `<head>` is prerendered for the 7 First Bite routes (2026-08-17), so titles, OG tags and JSON-LD are in the raw HTML. The **body** is still `<div id="root"></div>`, so a JS-less reader gets metadata but not the article prose. Fine for link unfurls and for Google (which renders). Exit if AI-answer-engine crawlers become a meaningful traffic source — that needs `react-dom/server` and a hydration pass, a materially bigger change. Owner: product.
- **Prerender covers First Bite routes only** — `/`, `/projects`, `/about` and the rest still serve the site-wide defaults. Extend `prerenderRoutes()` in `lib/routeSeo.js` when another page needs its own preview. Owner: tech lead.
- **No 1200×630 OG art** — social cards currently reuse square assets (`/intro-poster.png`, the First Bite icon), which platforms crop. Exit when the M2 OG-image generator lands; `SITE.defaultImage` in `lib/seo.js` is the single swap point. Owner: design.
- **Blog posts statically imported** — all five prose modules load in one chunk (16 KB gzipped). Exit at ~20 posts: switch `postModules` in `BlogPostPage.jsx` to `lazy()`. Owner: tech lead.
- **Sunnah Habit Tracker store badges are placeholders** — both listings are in closed testing, so the page ships the grayscale "Coming soon" pair and `links: {}`. Exit when either store listing goes public: set `links.appStore` / `links.playStore`, pass them to `SunnahBadges`, flip `status` to `live`, re-run `npm run sitemap`. Owner: product.
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
