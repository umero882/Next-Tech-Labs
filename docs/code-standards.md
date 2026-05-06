# Code Standards — Next Tech Labs Portfolio

> How individual files are written. Enforced by review (no linter rules cover all of these).

---

## 1. Language & runtime

- JavaScript only. JSX in `.jsx`, modules in `.js`. No TypeScript in this repo (yet — see `progress-tracker.md`).
- Target: modern evergreen browsers (Chrome / Edge / Safari last 2). No IE, no legacy polyfills.
- Node ≥ 22 LTS for tooling. Vite 8 requires Node 20.19+ minimum.

---

## 2. Imports

Order, separated by a blank line between groups:

```jsx
// 1. React + framework
import { useState, useMemo } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// 2. Third-party libs
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

// 3. Internal — alias paths only (@/...)
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';

// 4. Styles (rare; only for the global Tailwind entry)
```

- **Always use `@/` aliases** for internal imports. Relative imports (`../../`) are forbidden in `src/`.
- Default imports only for React components. Everything else is a named export.
- No barrel files (`index.js` re-exports). Import from the source module.

---

## 3. Component anatomy

Every component follows this exact shape:

```jsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * One-line purpose.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {'primary'|'ghost'|'outline'} [props.variant='primary']
 * @param {React.ReactNode} props.children
 */
export function Button({ label, variant = 'primary', children, className, ...rest }) {
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    ghost:   'bg-transparent text-text-secondary hover:bg-accent-light hover:text-accent',
    outline: 'bg-transparent text-accent border border-accent hover:bg-accent-light',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
        'font-mono text-sm tracking-tight',
        'transition-colors duration-200',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children ?? label}
    </motion.button>
  );
}
```

Rules:
1. **Named export, no `default`.** Exception: `pages/*` may default-export for lazy-loading later.
2. **JSDoc the prop type** every time. No PropTypes runtime checks (we removed prop-types — TS later replaces this).
3. `className` prop accepted on every component, merged via `cn()` last so callers can override.
4. Rest props (`...rest`) forwarded to the root element so consumers can attach `onClick`, `aria-*`, etc.
5. Variants live in a local `const variants = {...}` object, not in a switch statement, not in `clsx` calls.
6. Pull tokens from Tailwind's `@theme` (e.g. `bg-accent`, `text-text-primary`) — never raw hex.

---

## 4. Hooks

```js
// src/hooks/useProjectFilter.js
import { useMemo, useState } from 'react';
import { filterProjects } from '@/lib/filter';

/**
 * Manages category + search state for a project list.
 *
 * @param {Array} allProjects
 * @returns {{
 *   filtered: Array,
 *   category: string,
 *   query: string,
 *   setCategory: (c: string) => void,
 *   setQuery: (q: string) => void,
 *   reset: () => void,
 * }}
 */
export function useProjectFilter(allProjects) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterProjects(allProjects, { category, query }),
    [allProjects, category, query],
  );

  const reset = () => { setCategory('all'); setQuery(''); };

  return { filtered, category, query, setCategory, setQuery, reset };
}
```

Rules:
1. One hook per file. Filename matches the export name exactly.
2. Always memoize derived data with `useMemo`.
3. Never call a hook inside a conditional, loop, or callback.
4. Hooks return objects (named keys), not arrays — except for the `useState`-mirror pattern (`[value, setValue]`).

---

## 5. Pure modules (`lib/`, `data/`)

- No React imports.
- No top-level side effects.
- Functions are pure: same input → same output, no mutation of arguments.
- Data modules export a single named const matching the filename:

```js
// src/data/projects.js
export const projects = [/* ... */];
```

---

## 6. Tailwind class style

- Group classes by purpose, separated by spaces in the same string. No need to alphabetize.
- Order within a className string: layout → spacing → sizing → typography → color → border/effects → state/responsive.
- Multi-line classNames use template literals **only** when conditional logic is needed; otherwise keep on one line.
- For variants and conditional classes, use `cn()` — never string concatenation.

```jsx
// Good
<div className={cn(
  'flex items-center gap-3 px-4 py-2',
  'rounded-full border border-border',
  'text-sm font-mono text-text-secondary',
  isActive && 'border-accent text-accent',
)} />

// Bad
<div className={`flex items-center gap-3 px-4 py-2 ${isActive ? 'border-accent' : 'border-border'}`} />
```

---

## 7. Motion (framer-motion)

- Import only `motion`, `AnimatePresence`, `useScroll`, `useTransform`, `useReducedMotion`.
- Reusable variants live in `src/lib/motion.js` (create when needed).
- Always wrap entrance animations with `useReducedMotion()` check or use `transition={{ duration: 0 }}` fallback.
- Default `transition`: `{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }` (a soft expo-out). Tweak only with intent.

```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
```

---

## 8. Accessibility floor

Every component:

- Has visible focus styles (`focus-visible:ring-2 focus-visible:ring-accent`).
- Uses semantic HTML (`<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<section>`).
- Provides `alt` text for any image (we have very few — all decorative ones use `alt=""` and `aria-hidden="true"`).
- Maintains contrast ≥ AA on the dark background (4.5:1 for normal text, 3:1 for large/UI).
- Does not rely on color alone — pair with icons, text, or shape.

Run `npm run build && npx serve dist` and audit with Lighthouse before declaring "done" on any page.

---

## 9. Comments & doc

- Doc the **why**, not the **what**. The code shows the what.
- Top of every component: a one-line JSDoc summary + `@param` for every non-obvious prop.
- TODO markers: `// TODO(area): description` — and add a matching entry in `progress-tracker.md`. Floating TODOs without a tracker entry are deleted on review.

---

## 10. Anti-patterns flagged on review

| Smell | Fix |
|---|---|
| `style={{ color: '#7F4DF3' }}` | Use `text-accent` |
| `<div onClick={...}>` | Use `<button>` (or `role="button"` + key handling) |
| Inline subcomponent function defined inside another component | Extract to `components/ui/` or co-locate as a separate file |
| `useEffect` for derived data | Use `useMemo` |
| Passing 6+ props down 3+ levels | Compose with children, or use a section-level component |
| `key={index}` on a list of mutable items | Use a stable id from the data |
| Importing from `node_modules` paths directly | Always use the package name |
| 200+ line component | Split it. There's never an exception. |

---

## 11. Performance budget per page

- Initial JS payload (gzipped): ≤ 180 KB
- LCP on 4G simulated: ≤ 2.5s
- CLS: ≤ 0.05
- Lighthouse Mobile: Perf ≥ 90, A11y ≥ 95

If a change pushes any of these over budget, the change does not ship until trimmed.
