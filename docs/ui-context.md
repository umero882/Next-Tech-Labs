# UI Context — Next Tech Labs Portfolio

> The design language. If you're touching anything visual, this is the contract.

---

## 1. Aesthetic direction: "Engineered Editorial"

Imagine a technical journal published by a software lab — not a SaaS landing page. Specifically:

- **Dark theme as the default and only theme** (M4 may add a light variant; ship dark first).
- **Numbered sections** like an article: `01 / WORK`, `02 / SERVICES`, `03 / ABOUT`. These act as wayfinding and as a tone-setter.
- **Mixed type system**: an expressive grotesque display face for headlines + a precise mono for metadata, page numbers, project codes. Body in a refined sans.
- **Subtle dot grid backdrop** on key sections, never a hero gradient wash.
- **Purple as a precise highlight**, not a fill. It appears on: active nav, primary CTA hover, "live" status dots, link arrows. That's it.
- **Asymmetry over symmetry** — project cards in a 2- or 3-column grid where some span wider; copy aligned to a 12-column rhythm but not centered.
- **Editorial micro-copy**: every section has a label, a kicker, and a body. No dropped-in marketing slogans.

### What we are deliberately rejecting
- ❌ Purple-to-pink gradients
- ❌ Glowing neon edges, animated particles, "AI-shimmer" backgrounds
- ❌ Centered hero with a single CTA and a feature trio underneath
- ❌ Glass-morphism cards with translucent blur on every surface
- ❌ Generic vendor logos in a "trusted by" row (we don't have those, and wouldn't display them this way if we did)

---

## 2. Color tokens (locked — do not modify)

These are the contract. They live in `src/styles/index.css` as Tailwind 4 `@theme` tokens.

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `--color-bg-primary` | `#0D1117` | Page background |
| `--color-bg-secondary` | `#161B22` | Cards, surfaces |
| `--color-bg-tertiary` | `#21262D` | Elevated, modals, hover surfaces |

### Text
| Token | Hex | Use |
|---|---|---|
| `--color-text-primary` | `#FFFFFF` | Headlines, primary copy |
| `--color-text-secondary` | `#C8C8C8` | Body, descriptions |
| `--color-text-muted` | `#8B949E` | Metadata, captions, placeholders |

### Accent (purple)
| Token | Hex | Use |
|---|---|---|
| `--color-accent` | `#7F4DF3` | Primary CTAs, active states, link accents |
| `--color-accent-hover` | `#9D6FF5` | Hover state |
| `--color-accent-active` | `#6B3DD4` | Pressed state |
| `--color-accent-light` | `rgba(127,77,243,0.10)` | Tinted backgrounds (active nav pill, badge backgrounds) |
| `--color-accent-border` | `rgba(127,77,243,0.40)` | Outlined-on-dark borders |

### Status
| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#27C45A` | "Live" status dot, success messages |
| `--color-success-light` | `rgba(39,196,90,0.10)` | Success-tinted bg |
| `--color-warning` | `#D29922` | "Beta" status dot |
| `--color-error` | `#F85149` | Error states |
| `--color-info` | `#58A6FF` | Informational accents (rare) |

### Borders & dividers
| Token | Hex | Use |
|---|---|---|
| `--color-border` | `#30363D` | Default borders |
| `--color-border-muted` | `#21262D` | Subtle separators |

### Tailwind utility names
The `@theme` block exposes these as: `bg-bg-primary`, `bg-bg-secondary`, `text-text-primary`, `text-text-secondary`, `text-text-muted`, `bg-accent`, `text-accent`, `border-accent`, `bg-success`, `text-success`, etc.

---

## 3. Typography

Three typefaces. All loaded from Google Fonts via `<link>` in `index.html` with `display=swap` and proper preconnect.

| Role | Family | Why this one |
|---|---|---|
| Display (headlines) | **Bricolage Grotesque** | Variable, expressive, geometric with personality. Avoids the Inter/Geist plague; reads as designed, not defaulted. |
| Body | **Geist Sans** | Clean modern grotesque, distinct enough from Inter to feel intentional, ships with refined optical sizes. |
| Mono (labels, code, metadata) | **JetBrains Mono** | Strong character set, excellent at small sizes for the editorial labels (`01 / WORK`, version tags, project codes). |

Tailwind utilities: `font-display`, `font-sans`, `font-mono` (configured in `@theme`).

### Type scale
- Display XL (hero): 84px / 1.0 / -0.04em / 600, Bricolage Grotesque
- Display L (page titles): 56px / 1.05 / -0.03em / 600
- Display M (section heads): 36px / 1.1 / -0.02em / 600
- H3 (card titles): 22px / 1.25 / -0.01em / 600, Geist Sans
- Body L: 18px / 1.6 / 0 / 400, Geist Sans
- Body: 16px / 1.6 / 0 / 400
- Caption / Mono: 13px / 1.4 / 0.05em / 500, JetBrains Mono UPPERCASE for labels

### Rules
- Headlines may set `letter-spacing` tighter than default; body never does.
- Editorial labels are uppercase, tracked +0.05em, in mono. Always pair with a number prefix and a slash: `01 / WORK`.
- Italic Bricolage Grotesque is reserved for one word per page maximum (used as accent, not decoration).
- Numbers in metadata (years, counts) use `font-feature-settings: "tnum"` for tabular alignment.

---

## 4. Spacing & layout

- **8-point grid.** Spacing values are multiples of 4 (Tailwind defaults align to this).
- **Container**: `max-w-7xl mx-auto px-6 md:px-8 lg:px-12`. Use the `<Container>` primitive — never rebuild this.
- **Section vertical rhythm**: `py-24 md:py-32` between major sections.
- **12-column intent**: not enforced via grid utilities but components compose to imply rhythm.

---

## 5. Components — visual rules

### Button
- **Primary**: solid `bg-accent`, white text, `rounded-full`, `px-5 py-2.5`, mono label, on hover `bg-accent-hover` and shadow `0 0 0 4px rgba(127,77,243,0.15)`.
- **Outline**: transparent, `border border-accent`, `text-accent`, fills with `bg-accent-light` on hover.
- **Ghost**: transparent, `text-text-secondary`, on hover `text-accent` and `bg-accent-light`.
- **Always include focus ring**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary`.

### Card
- `bg-bg-secondary border border-border rounded-2xl`
- Hover: `border-accent/40` and translate `y: -2px` via framer-motion. Never use box-shadow glow.
- Padding: `p-6 md:p-8`.
- The `borderCurve: 'continuous'` analogue isn't available in CSS — accept default rounding.

### Project card (special)
- Top row: project code (`P-04` mono) + status dot (green/amber/grey).
- Cover area: 4:3 ratio, CSS-only — gradient or pattern based on `cover.tokens` from data, no images yet.
- Title in display sans, tagline in body, stack as mono badges.
- Hover: arrow icon translates 4px right, border tints accent.

### Badge
- `inline-flex items-center px-2.5 py-1 rounded-md`
- `text-[11px] font-mono uppercase tracking-wider`
- Variant `outline`: `border border-border text-text-muted`
- Variant `accent`: `bg-accent-light text-accent border border-accent/30`
- Variant `success`: `bg-success/10 text-success border border-success/30`

### Section label (the editorial label)
- Mono, uppercase, tracked +0.05em, `text-text-muted` for the number, `text-text-primary` for the word, `text-accent` for the slash.
- Format: `<span class="text-text-muted">01</span><span class="text-accent"> / </span><span class="text-text-primary">WORK</span>`

### Grid backdrop
- 1px dot per 32px tile, `rgba(255,255,255,0.04)`. Apply via repeating radial-gradient on a `before` pseudo or background-image on a wrapper. Mask top/bottom with `mask-image: linear-gradient(...)` for a fade.
- Used on Hero and About hero only — sparingly.

---

## 6. Motion

Library: `framer-motion` v12.

### Defaults
- Easing: `[0.22, 1, 0.36, 1]` (smooth expo-out). One eased curve everywhere.
- Duration: `0.4s` default; `0.6s` for hero entrance staggers; `0.2s` for hover micro-states.
- Always honor `useReducedMotion()` — if true, set `transition={{ duration: 0 }}` and skip transforms.

### Patterns
- **Section reveal**: `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 24 }`, `viewport={{ once: true, margin: '-80px' }}`.
- **Stagger** for grids: parent `staggerChildren: 0.06`, children `delayChildren: 0.1`.
- **Hover lift**: `whileHover={{ y: -2 }}` on cards, `whileTap={{ scale: 0.97 }}` on buttons.
- **Marquee tech-stack ticker**: linear `repeat: Infinity`, `duration: 40s`. Use `motion.div` with a `useScroll`-based pause if user prefers.

No: bouncy springs (this is editorial, not playful), confetti, parallax that breaks scroll, scroll-jacking on mobile.

---

## 7. Copy voice

### Five rules
1. **Specific over abstract.** "Multi-tenant marketplace shipping in 6 GCC countries" beats "scalable enterprise solution."
2. **Verbs over adjectives.** Tell the reader what got done, not how it felt.
3. **Numbers in mono.** When you write "5 training tracks" or "2026," surface those numbers in `font-mono` so they read as data.
4. **One idea per sentence.** Long sentences stack clauses. Cut, then cut again.
5. **No jargon-as-decoration.** "Modular monorepo with Hasura-backed GraphQL" is fine when it's true and load-bearing. "Cutting-edge AI-driven solutions" is never fine.

### Forbidden phrases (auto-reject on review)
- "Welcome to my portfolio"
- "Let's dive in"
- "Innovative solutions"
- "Cutting-edge"
- "Synergize" / "synergy"
- "Leverage" (verb form)
- "Empower"
- "In today's fast-paced world"
- "We are passionate about..."
- Any opener with an emoji (🚀, ✨, 💡)

### Acceptable openers
- A noun. ("Software, shipped.")
- A number. ("16 products, one rig.")
- A claim. ("We build the products people actually use.")
- A specific example. ("Last quarter we shipped a recruitment marketplace for the Gulf.")

---

## 8. Iconography

Library: `lucide-react`.

- Stroke width: `1.75` (slightly heavier than default for legibility on dark bg).
- Size: 16 for inline, 20 for buttons, 24 for section heads.
- Color: inherits from text — set via Tailwind text classes, never `color={}` prop.
- Avoid icon zoo: pick one per concept and reuse.

Common icons used in this project:
- `ArrowUpRight` — outbound link / project card affordance
- `ArrowRight` — internal next CTA
- `Sparkles` — featured / highlighted (sparingly)
- `Github`, `Linkedin`, `Youtube`, `Instagram` — social
- `Mail`, `MessageCircle` (WhatsApp), `Phone` — contact
- `Code2`, `Smartphone`, `Brain`, `Server`, `Newspaper`, `Wrench` — category icons

---

## 9. Imagery policy

- **No stock photography.** Ever.
- **No team photos** at launch (single-operator brand reads stronger as wordmark + work, not portrait).
- **Cover art** for project cards is CSS-generated until M2 lands handcrafted SVG/Canvas covers. The placeholder system uses `cover.tokens` from data to generate distinctive gradients — different per project — so no two cards look the same.

---

## 10. Accessibility — visual layer

- All foreground/background pairs verified against the `#0D1117` base for AA at minimum:
  - Body text (`#C8C8C8` on `#0D1117`) → 11.2:1 ✅
  - Muted (`#8B949E` on `#0D1117`) → 5.4:1 ✅
  - Accent (`#7F4DF3` on `#0D1117`) → 4.8:1 ✅ (use only for ≥ 14px text)
- Focus ring is always visible — never `outline: none` without a `:focus-visible` replacement.
- Animations respect `prefers-reduced-motion`.
- No information conveyed by color alone — status dots pair with text labels.

---

## 11. The one-thing test

Before any UI change ships, ask: **what is the one thing the visitor will remember from this page?**

- Home → the headline + the dense, characterful project grid.
- Projects → the filter snap and the asymmetric grid rhythm.
- Project detail → the big project code + the highlights list.
- Services → the four service blocks reading like chapter starts.
- About → the rig (the actual VPS infrastructure) under "How it's hosted."
- Contact → the WhatsApp button — region-correct, low-friction.

If the answer is "I'm not sure," the page isn't done.
