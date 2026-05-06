# AI Workflow Rules — Next Tech Labs Portfolio

> Hard rules for any AI assistant (Claude, Cursor, Copilot, etc.) operating on this repo.
> These rules win over default model behavior and over individual conversation context.

---

## 0. Read order before any change

When a task arrives, the assistant **must** read these in order before writing code:

1. `docs/project-overview.md` — what this product is and who it's for
2. `docs/architecture-context.md` — how the code is organized
3. `docs/code-standards.md` — how individual files must be written
4. `docs/ui-context.md` — design tokens, fonts, motion, copy voice
5. `docs/progress-tracker.md` — what's done, what's next, what's blocked
6. `docs/ai-workflow-rules.md` — this file (rules of engagement)

Skipping any of these is a defect.

---

## 1. Stack lock — non-negotiable

| Concern | Choice | Forbidden alternatives |
|---|---|---|
| Framework | React 19 + Vite 8 | Next.js, Remix, Astro, CRA |
| Routing | React Router 7 (data router) | Next App Router, TanStack Router, custom |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) | CSS-in-JS, Sass, vanilla CSS modules, Tailwind 3 config files |
| Components | Hand-rolled in `src/components/ui` matching shadcn API | Importing `@/components/ui` from npm packages, MUI, Chakra, AntD |
| Icons | `lucide-react` | Heroicons, Font Awesome, react-icons, custom SVG sets |
| Motion | `framer-motion` (v12) | GSAP, react-spring, anime.js, raw CSS keyframes for component motion |
| Lists | `react-window` v2 when ≥ 200 items | virtuoso, infinite scrollers without virtualization |
| Search inputs | `use-debounce` | lodash debounce, hand-rolled timeouts |
| Backend | **None.** Static site. | Firebase, Hasura, Supabase, any API layer |
| Auth | **None.** | Anything |
| Data | Static JS modules in `src/data` | Fetched JSON, CMS, headless backends |

If a request requires breaking the lock, the assistant **stops and asks**. It does not silently swap.

---

## 2. Always-latest dependency rule

- Every `package.json` entry uses `"latest"` as the version specifier.
- `npm install` resolves to the actual current version, which is captured in `package-lock.json`.
- The lockfile **is** committed; that is the reproducibility mechanism, not pinned ranges in `package.json`.
- When adding a new dep: `npm i <pkg>@latest`. Never `npm i <pkg>@x.y.z`.
- Exception: if a `latest` resolves to a broken release, downgrade to the previous good major in `package.json`, file an entry in `progress-tracker.md` under "Tech debt", and revert as soon as upstream is fixed.

---

## 3. Modularity contract

Every new piece of code answers four questions before being written:

1. **Layer**: is this a `data/`, `lib/`, `hooks/`, `components/ui/`, `components/layout/`, `components/sections/`, `components/projects/`, or `pages/` concern? It must live in exactly one.
2. **Reuse**: will this be used by ≥ 2 callers? If yes → `components/ui` or `lib`. If no → keep it co-located with the page that uses it (still inside `src/`, never inline a 200-line subcomponent in a page file).
3. **Boundary**: does it import from a layer above it? Forbidden — see the dependency rule below.
4. **Surface**: what is the smallest prop API that solves this? Default to fewer props, sensible defaults, composable children.

### Layer dependency rule (allowed direction only)

```
pages → components/sections → components/projects → components/ui
                                                  ↘
            components/layout ──────────────────→ components/ui
                                                  ↘
                       hooks ───────────────────→ lib
                                                  ↘
                       data ────────────────────→ lib
```

A `ui` primitive **never** imports a `section`. A `lib` helper **never** imports a `hook`. If you feel the urge, the design is wrong — escalate.

---

## 4. File and naming conventions

- File extensions: `.jsx` for React components, `.js` for pure modules, `.css` only for `src/styles/index.css` (Tailwind entry).
- Component file: PascalCase, one default export matching the filename. `ProjectCard.jsx` exports `ProjectCard`.
- Hook file: camelCase starting with `use`. One named export.
- Data file: kebab-case, exports a named const matching the file. `projects.js` → `export const projects = [...]`.
- Route segments are pages, lowercase: `pages/HomePage.jsx`, `pages/ProjectsPage.jsx`.

---

## 5. Definition of done (per task)

A task is not done until **all** of these are true:

- [ ] Code matches `code-standards.md`.
- [ ] No import crosses a layer boundary the wrong way (see §3).
- [ ] No new dependency was added without `@latest` and a `progress-tracker.md` entry.
- [ ] All copy passes the voice rules in `ui-context.md` (no "Welcome to my portfolio", no emoji-spam, no AI-tells like "Let's dive in").
- [ ] The page builds with zero console errors and zero React key warnings.
- [ ] The change is reflected in `progress-tracker.md` under the right section.
- [ ] Lighthouse mobile score ≥ 90 for Performance and Accessibility on the affected route.

---

## 6. Forbidden actions (will be reverted on sight)

- Adding a backend, API route, or env-var-based secret. This site is static.
- Adding analytics or trackers without an explicit user request.
- Importing a UI library that ships its own design system (MUI, Chakra, AntD, Bootstrap, DaisyUI).
- Hard-coding a project entry inside a component. Projects live in `src/data/projects.js` only.
- Inlining `<style>` blocks or `style={{...}}` for anything beyond a one-off motion value. Tailwind is the styling system.
- Replacing the color palette tokens in `src/styles/index.css`. Those are brand contract.
- Generating placeholder Lorem Ipsum. Pull real copy from `data/projects.js` and `data/company.js`.
- Adding TypeScript without a discussion in `progress-tracker.md` first.

---

## 7. When the user gives an ambiguous request

Order of operations:

1. Look up `progress-tracker.md` to see if it's already a tracked item.
2. If still ambiguous, ask **one** sharp clarifying question.
3. If the user says "you decide", default to the most modular, most reversible option — and document the decision in `progress-tracker.md` under "Decisions log".

---

## 8. Commit / change discipline

Each logical change = one commit message in the form:

```
<area>: <imperative verb> <thing>

<one-line why, optional>
```

Areas: `home`, `projects`, `services`, `about`, `contact`, `ui`, `layout`, `data`, `docs`, `chore`, `deps`, `style`.

Examples:
- `projects: add SentinelAI to data with security category`
- `ui: extract Badge component, replace 4 inline spans`
- `deps: bump tailwindcss to latest, migrate config to CSS-first`

---

## 9. Escalation triggers — stop and ask the human

- A request would require a backend.
- A request would require pinning a dep below `latest`.
- A request introduces a new top-level folder under `src/`.
- A request asks to remove or rename one of the six core docs in `docs/`.
- A request would change brand copy (company name, tagline, voice).

Stopping costs nothing; getting these wrong costs a half-day of cleanup.
