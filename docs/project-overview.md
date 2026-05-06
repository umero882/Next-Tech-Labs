# Project Overview — Next Tech Labs Portfolio

> The "what" and "why" of this site. If you only have 5 minutes, read this one.

---

## 1. Product in one sentence

A static portfolio site that showcases the work of **Next Tech Labs** — a software studio shipping mobile, web, AI, and infrastructure products — to prospective clients and collaborators.

---

## 2. Why it exists

- **Sales surface.** Prospective clients (especially in the GCC region, given the studio's footprint) need a single, credible URL to evaluate capability before reaching out.
- **Recruiting & partnerships.** Engineers, designers, and content collaborators evaluating a partnership want to see depth and breadth of work.
- **Brand consolidation.** Next Tech Labs ships under multiple sub-brands (Real News Hub for media, the Maid Book / Ethiopian Maids platform ecosystem for vertical SaaS, internal AI experiments). The portfolio is the place where this all reads as one coherent operation rather than disparate side projects.

---

## 3. Audiences (in priority order)

1. **Prospective B2B clients** — recruitment agencies, training academies, news/media operators, SMEs in MENA. They scan for: relevant case studies, stack legitimacy, proof of delivery.
2. **Prospective collaborators / hires** — engineers and content creators evaluating credibility before responding to outreach. They scan for: technical depth, taste, frequency of shipping.
3. **Existing clients** — checking on what else NTL builds, looking for cross-sell opportunities.
4. **Self / future-Kpanda** — a portfolio is also a forcing function for the operator to keep shipping things worth showing.

We design for #1 and #2. #3 and #4 inherit a working site.

---

## 4. Goals (what success looks like)

| Goal | Measure | Target (90 days post-launch) |
|---|---|---|
| Get qualified inbound | Inbound emails / WhatsApp messages from the site | ≥ 8 / month |
| Establish credibility | Bounce rate on `/projects` and `/about` | ≤ 50% |
| Drive deep engagement | Median session depth | ≥ 3 pages |
| Brand recall | Direct return visits | ≥ 15% of total |
| Performance hygiene | Lighthouse Mobile (Perf, A11y, Best, SEO) | ≥ 90 each |

We don't optimize for vanity metrics (raw traffic, time-on-page) — they don't correlate with the goals above for a B2B portfolio.

---

## 5. Non-goals (explicit out-of-scope)

- ❌ User accounts, login, profile pages
- ❌ A blog or CMS-driven content (Real News Hub has its own platforms; this site links out)
- ❌ E-commerce, paid plans, subscriptions
- ❌ Real-time features, chat, comments
- ❌ Server-side rendering / SSG framework (Next.js, Astro, etc.) — overhead unjustified
- ❌ Native mobile app for the portfolio itself
- ❌ Multi-language at launch (Arabic is M4, see progress-tracker)

---

## 6. Brand identity

### Name
**Next Tech Labs** — full name on first mention, **NTL** acceptable in mono / metadata contexts.

### Tagline (working)
> "We build the products people actually use."

Backup options (do not use without explicit decision):
- "Software, shipped."
- "Studios for stubborn problems."

### Voice
Confident, technical, allergic to fluff. Uses precise nouns (e.g. "Hasura GraphQL," "Expo SDK 55") rather than vague claims ("cutting-edge tech"). Comfortable showing process and constraints. **Never**: "innovative solutions," "synergy," "leveraging," "let's dive in," or any phrase a generic SaaS landing page would use.

### Brand values (operational, not slogans)
1. **Ship.** Every project on this site has shipped, is shipping, or is honestly labelled "concept."
2. **Modularity.** Same architecture, same tokens, same patterns across every product. The portfolio itself eats this dogfood.
3. **Right-sized.** A static site for a static problem; a heavy stack only when the problem demands it.
4. **Region-fluent.** GCC-facing means Arabic-aware, market-aware, regulator-aware.

---

## 7. The portfolio corpus

The site exists to surface, in roughly this priority:

### Tier 1 — Lead with these
- **Maid Book / Ethiopian Maids platform** — multi-sided marketplace (workers, sponsors, agencies) for GCC domestic-worker recruitment. Largest production system shipped; full Expo/Firebase/Hasura/Nx monorepo.
- **Domestic Worker Training Academy** — LMS + Remotion video production system for accredited GCC-bound training across 5 tracks. Real B2B client.
- **Real News Hub** — multi-platform news brand spanning YouTube, Instagram, Facebook, TikTok across politics, sports, technology, AI, science.

### Tier 2 — Strong supporting cast
- **Quran Teacher AI** — voice-driven Islamic-tech app with tajweed analysis and spaced repetition.
- **SentinelAI** — autonomous VPS security agent (Claude API + SSH remediation).
- **ViralMind AI** — mobile-first AI UGC video platform (HeyGen / Arcads competitor).
- **Password Manager** — shipped to Google Play (closed testing → production), with Notes-with-Reminder feature.

### Tier 3 — Breadth & range
- BrandForge, TidySpace, TutorCast, CloudShield, CurrencyFlow, Magi Shop, Faceless YouTube channel (Islamic history), self-improving chatbot, payroll system, solar city cooling feasibility study.

### Tier 4 — Infrastructure proofs
- VPS infrastructure on Hostinger with Docker, Nginx, Prometheus, Grafana, Loki — shown on About page as "this is the rig that runs all of the above."

The full data lives in `src/data/projects.js`. Featured items (Tier 1 + Tier 2) carry `featured: true` and surface on the home page. Categories (`mobile`, `web`, `ai-saas`, `media`, `tools`, `infra`) drive the filter on `/projects`.

---

## 8. Information architecture (what each page does)

| Page | Job | Success signal |
|---|---|---|
| **Home** (`/`) | First impression. Convince the visitor in 8 seconds that this studio is real and relevant. | Scroll past the hero. |
| **Projects** (`/projects`) | Let them browse the body of work. | Filter is used or detail page is opened. |
| **Project detail** (`/projects/:id`) | Deep enough to satisfy a serious evaluator. | They click the live link or contact CTA. |
| **Services** (`/services`) | Translate the work into "what NTL can do for me." | They land on Contact. |
| **About** (`/about`) | Trust. Who is behind this? Where do they operate? What's the rig? | They follow a social link or hit Contact. |
| **Contact** (`/contact`) | Convert. Make it dead-easy to start a conversation. | They send a message. |

---

## 9. Constraints

- **No backend, no auth, no DB.** Static everything.
- **Always-latest deps.** Per `ai-workflow-rules.md §2`.
- **Brand color contract is non-negotiable** — bg `#0D1117`, text `#FFFFFF`/`#C8C8C8`, accent `#7F4DF3`, success `#27C45A`. (See `ui-context.md` for full token list.)
- **Mobile-first** — designed and tested on a 375px width before being widened. The audience is half on phones.
- **GCC-friendly** — fast on patchy 4G, safe on iOS Safari (which is the dominant browser in the region), works offline-friendly via standard caching headers when deployed.

---

## 10. The one thing this site must never do

Look like a generic AI-generated SaaS landing page. The brand is built on shipping real products with strong points of view; the site has to feel made, not generated. That's why the aesthetic direction is committed (see `ui-context.md`) and why the copy voice is enforced in `ai-workflow-rules.md §5`.
