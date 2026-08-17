# Project-Scoped Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Inside any `/projects/<id>` route, the top navbar becomes that product's own nav — Home, Product, Blog, About, Contact — and the studio's chrome stops advertising a product's content as the company's.

**Architecture:** One pure module (`src/lib/nav.js`) owns every link the site renders in its chrome, both studio and per-project. `Navbar` asks it what to draw based on the current pathname. Pages a project has not earned still appear in the nav, marked `soon`, and resolve to a real placeholder page instead of a dead click. Contact delivery routes per project through Web3Forms access keys, falling back to `mailto:` when no key is configured.

**Tech Stack:** React 19, React Router 6, Vite 7, Tailwind 4, framer-motion, lucide-react. Tests run on Node's built-in runner (`node --test`) — no new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-15-project-scoped-navigation-design.md`

**One deviation from the spec.** The spec names the module `src/lib/project-nav.js`.
It is `src/lib/nav.js` here because it also owns the *studio* link arrays — which
is what lets a unit test assert that studio chrome never points into a product,
making the original leak impossible to reintroduce quietly. A file owning both
link sets should not be named for only one of them.

## Global Constraints

- **No new runtime dependencies.** Verification uses Node's built-in `node --test`; the repo gains a `test` script but no package.
- **`src/lib/nav.js` must load outside Vite.** It is imported by `node --test` and may be imported by `scripts/`. Use **relative** imports (`../data/projects.js`), never the `@/` alias, and guard `import.meta.env?.` with optional chaining — `import.meta.env` is undefined in plain Node.
- **Nav paths are derived, never hand-written.** Always `` `/projects/${project.id}/blog` ``, so a declaration cannot point at a route that does not exist.
- **Coming-soon pages are `noindex, nofollow`** and stay out of `sitemap.xml`.
- **Studio chrome must never link into `/projects/<id>/…`.** This is the leak the whole change exists to fix; Task 1 adds a unit test that fails if it returns.
- **A Web3Forms access key is not a secret.** It is a public routing token that authorises only "deliver a message to this inbox". It belongs in `src/data/projects.js`, committed.
- ~~**Destination addresses use plus-aliases** into the existing inbox — `help+firstbite@nextechlabs.org` — so no new mailboxes are needed.~~ **Corrected 2026-08-16:** this domain's mail server rejects plus-addressed recipients (`550 5.1.1 … User unknown in virtual mailbox table`). Every project uses plain `help@nextechlabs.org`; per-project routing comes from `support.formKey` only. See the spec's Addressing section.
- **`help@nextechlabs.org` appears 39 times**, including on store-reviewed support and legal pages. Do not change any *published* address in this work; only add `support.email` values used by forms.
- Existing route order matters: every `projects/:id/*` route must sit **above** `projects/:id` in `App.jsx`, and below the static `projects/first-bite/*` routes.

---

## File Structure

**Create**
| File | Responsibility |
|---|---|
| `src/lib/nav.js` | Every chrome link on the site: studio arrays, project nav model, CTA, support resolution. Pure, no React. |
| `src/lib/nav.test.js` | `node --test` unit tests for the above, including the anti-leak invariant. |
| `src/pages/projects/ProjectComingSoonPage.jsx` | Shared placeholder for unearned pages. `noindex`. |
| `src/pages/projects/ProjectAboutPage.jsx` | Route shell: resolves the per-project About content module or falls back to coming-soon. |
| `src/pages/projects/ProjectContactPage.jsx` | Route shell: product-variant contact form + support-page link. |
| `src/pages/projects/about/first-bite.jsx` | First Bite's About content. |
| `scripts/verify-routes.mjs` | Post-build assertions: routes present in the bundle, sitemap correct. |

**Modify**
| File | Change |
|---|---|
| `src/data/projects.js` | Add `site` and `support` to First Bite and Password Manager. |
| `src/components/layout/Navbar.jsx` | Draw from `lib/nav.js`; swap to project nav; share one item renderer between desktop and mobile. |
| `src/components/layout/Footer.jsx` | Site links come from `lib/nav.js`; the First Bite blog link goes. |
| `src/components/layout/RootLayout.jsx` | Scroll to a hash target instead of the top when the URL carries one. |
| `src/components/sections/ContactForm.jsx` | `variant` prop; Web3Forms delivery; per-project recipient; fix the privacy link and the `source` domain. |
| `src/pages/ContactPage.jsx` | Pass `variant="studio"` explicitly. |
| `src/App.jsx` | Three new routes above `projects/:id`. |
| `src/pages/projects/FirstBitePage.jsx` | `id="get-the-app"` on the store-badge block. |
| `src/pages/projects/PasswordManagerPage.jsx` | `id="get-the-app"` on the store-badge block. |
| `src/pages/ProjectDetailPage.jsx` | `id="get-the-app"` on the aside links block, so the anchor never dangles. |
| `scripts/generate-sitemap.mjs` | About pages where declared; Contact pages for `live` projects. |
| `package.json` | `"test": "node --test src/"` and `"verify": "node scripts/verify-routes.mjs"`. |

**Coverage boundary, stated honestly:** unit tests cover the nav model, which is where the logic and the regression risk live. `verify-routes.mjs` covers routes reaching the bundle and sitemap correctness. Component rendering internals are not covered — the repo has no DOM test runner and this work does not add one. Task 9 includes a manual click-through to close that gap.

---

### Task 1: The nav model

**Files:**
- Create: `src/lib/nav.js`
- Create: `src/lib/nav.test.js`
- Modify: `src/data/projects.js` (First Bite entry ~line 204, Password Manager entry ~line 180)
- Modify: `package.json` (scripts block)

**Interfaces:**
- Consumes: `projects` from `src/data/projects.js`, `company` from `src/data/company.js`.
- Produces:
  - `STUDIO_NAV_ITEMS: Array<{to: string, label: string, end?: boolean}>`
  - `FOOTER_SITE_LINKS: Array<{label: string, href: string}>`
  - `matchProjectRoute(pathname: string) → project | null`
  - `projectNavItems(project) → Array<{key: 'home'|'product'|'blog'|'about'|'contact', label: string, to: string, end: boolean, soon: boolean}>`
  - `projectCta(project) → {label: string, to: string} | null`
  - `resolveSupport(project) → {email: string, formKey: string|null}`

- [ ] **Step 1: Add the test script**

In `package.json`, add to `scripts` (keep the existing entries):

```json
    "test": "node --test src/",
    "verify": "node scripts/verify-routes.mjs",
```

- [ ] **Step 2: Declare the two projects' pages and support routing**

In `src/data/projects.js`, in the `first-bite` entry, after the `links: { … }` block and before `featured: true`, add:

```js
    site: { blog: true, about: true },
    support: {
      email: 'help+firstbite@nextechlabs.org',
      // Web3Forms access key — a public routing token, not a credential. It
      // authorises exactly one thing: deliver a message to the address above.
      // Null until the key is created; the form falls back to mailto meanwhile.
      formKey: null,
    },
```

In the `password-manager` entry, in the same position, add:

```js
    site: { blog: false, about: false },
    support: { email: 'help+passwordmanager@nextechlabs.org', formKey: null },
```

Leave the other 17 projects untouched — they fall back by design.

- [ ] **Step 3: Write the failing tests**

Create `src/lib/nav.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { projects } from '../data/projects.js';
import { company } from '../data/company.js';
import {
  STUDIO_NAV_ITEMS,
  FOOTER_SITE_LINKS,
  matchProjectRoute,
  projectNavItems,
  projectCta,
  resolveSupport,
} from './nav.js';

const byId = (id) => projects.find((p) => p.id === id);
const firstBite = byId('first-bite');
const passwordManager = byId('password-manager');
const tidyspace = byId('tidyspace');

test('studio chrome never links into a product', () => {
  for (const item of [...STUDIO_NAV_ITEMS.map((i) => i.to), ...FOOTER_SITE_LINKS.map((i) => i.href)]) {
    assert.ok(
      !item.startsWith('/projects/'),
      `${item} puts a product's page in studio chrome — that is the leak this module exists to prevent`,
    );
  }
});

test('matchProjectRoute resolves a project from any of its sub-routes', () => {
  assert.equal(matchProjectRoute('/projects/first-bite')?.id, 'first-bite');
  assert.equal(matchProjectRoute('/projects/first-bite/blog')?.id, 'first-bite');
  assert.equal(matchProjectRoute('/projects/first-bite/blog/some-slug')?.id, 'first-bite');
  assert.equal(matchProjectRoute('/projects/password-manager/terms')?.id, 'password-manager');
});

test('matchProjectRoute ignores the index, unknown slugs and studio routes', () => {
  assert.equal(matchProjectRoute('/projects'), null);
  assert.equal(matchProjectRoute('/projects/'), null);
  assert.equal(matchProjectRoute('/projects/not-a-real-project'), null);
  assert.equal(matchProjectRoute('/'), null);
  assert.equal(matchProjectRoute('/about'), null);
  assert.equal(matchProjectRoute(''), null);
});

test('every project gets the same five items in the same order', () => {
  for (const project of projects) {
    assert.deepEqual(
      projectNavItems(project).map((i) => i.key),
      ['home', 'product', 'blog', 'about', 'contact'],
      `${project.id} has the wrong nav shape`,
    );
  }
});

test('home and product match exactly so they do not stay lit on sub-routes', () => {
  const items = Object.fromEntries(projectNavItems(firstBite).map((i) => [i.key, i]));
  assert.equal(items.home.end, true);
  assert.equal(items.product.end, true);
  assert.equal(items.blog.end, false);
});

test('paths are derived from the project id', () => {
  const items = Object.fromEntries(projectNavItems(firstBite).map((i) => [i.key, i]));
  assert.equal(items.home.to, '/');
  assert.equal(items.product.to, '/projects/first-bite');
  assert.equal(items.blog.to, '/projects/first-bite/blog');
  assert.equal(items.about.to, '/projects/first-bite/about');
  assert.equal(items.contact.to, '/projects/first-bite/contact');
});

test('declared pages read live, undeclared ones read soon but still route', () => {
  const fb = Object.fromEntries(projectNavItems(firstBite).map((i) => [i.key, i]));
  assert.equal(fb.blog.soon, false);
  assert.equal(fb.about.soon, false);

  const pm = Object.fromEntries(projectNavItems(passwordManager).map((i) => [i.key, i]));
  assert.equal(pm.blog.soon, true);
  assert.equal(pm.about.soon, true);
  assert.equal(pm.blog.to, '/projects/password-manager/blog');

  const ts = Object.fromEntries(projectNavItems(tidyspace).map((i) => [i.key, i]));
  assert.equal(ts.blog.soon, true, 'a project with no site block defaults to soon');
});

test('home, product and contact are never soon, for any project', () => {
  for (const project of projects) {
    for (const item of projectNavItems(project)) {
      if (['home', 'product', 'contact'].includes(item.key)) {
        assert.equal(item.soon, false, `${project.id}: ${item.key} must always be live`);
      }
    }
  }
});

test('the app CTA appears only where there is an app to get', () => {
  assert.deepEqual(projectCta(firstBite), {
    label: 'Get the app',
    to: '/projects/first-bite#get-the-app',
  });
  assert.equal(projectCta(tidyspace), null);
});

test('support falls back to the studio inbox until a project declares its own', () => {
  assert.equal(resolveSupport(firstBite).email, 'help+firstbite@nextechlabs.org');
  assert.equal(resolveSupport(tidyspace).email, company.channels.email);
  assert.equal(resolveSupport(tidyspace).formKey, null);
});
```

- [ ] **Step 4: Run the tests to verify they fail**

```bash
cd "C:/dev/Next Tech Labs" && npm test
```

Expected: FAIL — `Cannot find module './nav.js'`.

- [ ] **Step 5: Write the module**

Create `src/lib/nav.js`:

```js
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
```

- [ ] **Step 6: Run the tests to verify they pass**

```bash
cd "C:/dev/Next Tech Labs" && npm test
```

Expected: PASS, 10 tests.

- [ ] **Step 7: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/lib/nav.js src/lib/nav.test.js src/data/projects.js package.json
git commit -m "feat(nav): add the project-scoped nav model

Centralises every chrome link, studio and per-project, so the navbar can swap
by route. The studio arrays live here too, which lets a test assert that studio
chrome never links into a product -- the leak that put First Bite's blog in the
company navbar."
```

---

### Task 2: Navbar swaps, studio chrome stops leaking

**Files:**
- Modify: `src/components/layout/Navbar.jsx` (replace lines 1–123)
- Modify: `src/components/layout/Footer.jsx:23-34`
- Modify: `src/components/sections/ContactForm.jsx:273`

**Interfaces:**
- Consumes: `STUDIO_NAV_ITEMS`, `FOOTER_SITE_LINKS`, `matchProjectRoute`, `projectNavItems`, `projectCta` from Task 1.
- Produces: nothing new for later tasks.

- [ ] **Step 1: Rewrite the Navbar**

Replace the whole of `src/components/layout/Navbar.jsx` above the `Logo` function (i.e. lines 1–123, keeping `Logo` as it is at the bottom of the file) with:

```jsx
import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  STUDIO_NAV_ITEMS,
  matchProjectRoute,
  projectNavItems,
  projectCta,
} from '@/lib/nav';
import { cn } from '@/lib/cn';

const STUDIO_CTA = { label: 'Start a project', to: '/contact' };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setOpen(false);

  // Inside a project, the whole nav belongs to that product. The wordmark stays
  // as the way back to the studio, and "Home" means the main site.
  const project = matchProjectRoute(pathname);
  const items = project ? projectNavItems(project) : STUDIO_NAV_ITEMS;
  const cta = project ? projectCta(project) : STUDIO_CTA;

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'bg-bg-primary/80 backdrop-blur-xl',
        'border-b border-border',
      )}
    >
      <Container className="flex items-center justify-between h-16 gap-4">
        {/* Wordmark, plus the product whose nav this is */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group flex-none">
            <Logo />
            <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
              Next Tech<span className="text-accent">.</span>Labs
            </span>
          </Link>
          {project && (
            <span className="hidden sm:flex items-center gap-2.5 min-w-0">
              <span className="text-text-muted" aria-hidden="true">/</span>
              <span className="label-mono text-text-muted truncate">{project.name}</span>
            </span>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          <NavItems items={items} variant="desktop" />
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2 flex-none">
          {cta && (
            <Link to={cta.to} className="hidden md:block">
              <Button size="sm">
                {cta.label} <ArrowUpRight size={14} strokeWidth={2} />
              </Button>
            </Link>
          )}

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-tertiary"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-bg-primary"
          >
            <Container className="py-4 flex flex-col">
              {project && (
                <p className="label-mono text-text-muted pb-2">{project.name}</p>
              )}
              <NavItems items={items} variant="mobile" onNavigate={closeMenu} />
              {cta && (
                <Link to={cta.to} onClick={closeMenu} className="mt-3">
                  <Button size="md" className="w-full">
                    {cta.label} <ArrowUpRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * One renderer for both the desktop bar and the mobile sheet — they used to
 * carry duplicated markup that drifted.
 */
function NavItems({ items, variant, onNavigate }) {
  return items.map((item) => (
    <NavLink
      key={item.key ?? item.to}
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          variant === 'desktop'
            ? 'label-mono px-3 py-2 rounded-md transition-colors'
            : 'py-3 label-mono',
          isActive
            ? variant === 'desktop'
              ? 'text-accent bg-accent-light'
              : 'text-accent'
            : 'text-text-secondary hover:text-text-primary',
        )
      }
    >
      <span className="inline-flex items-center gap-1.5">
        {item.label}
        {item.soon && <SoonChip />}
      </span>
    </NavLink>
  ));
}

/** Marks a page the project has not published yet, before the click. */
function SoonChip() {
  return (
    <span className="label-mono text-[10px] leading-none px-1.5 py-0.5 rounded-full border border-border text-text-muted">
      soon
    </span>
  );
}
```

Leave the existing `Logo` function at the bottom of the file untouched.

- [ ] **Step 2: Point the footer at the shared list**

In `src/components/layout/Footer.jsx`, add to the imports:

```jsx
import { FOOTER_SITE_LINKS } from '@/lib/nav';
```

Then replace the whole `<FooterColumn title="Site" items={[…]} />` block (lines 23–34) with:

```jsx
          <FooterColumn title="Site" items={FOOTER_SITE_LINKS} />
```

- [ ] **Step 3: Stop the studio contact form citing a product's privacy page**

In `src/components/sections/ContactForm.jsx:273`, change:

```jsx
            href="/projects/password-manager/privacy"
```

to:

```jsx
            href="/privacy"
```

- [ ] **Step 4: Verify the leak is gone and the model still holds**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build
```

Expected: tests PASS, build succeeds.

Then confirm no studio chrome file names a product path:

```bash
cd "C:/dev/Next Tech Labs" && grep -n "projects/first-bite\|projects/password-manager" src/components/layout/Navbar.jsx src/components/layout/Footer.jsx src/components/sections/ContactForm.jsx
```

Expected: no output.

- [ ] **Step 5: Eyeball it**

```bash
cd "C:/dev/Next Tech Labs" && npm run dev
```

Visit `/` (studio nav, no Blog item), then `/projects/first-bite` (project nav, `/ First Bite` beside the wordmark, `Get the app` CTA), then `/projects/tidyspace` (project nav, Blog and About both showing `soon`, no CTA), then `/projects` (studio nav again). Stop the server.

- [ ] **Step 6: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/components/layout/Navbar.jsx src/components/layout/Footer.jsx src/components/sections/ContactForm.jsx
git commit -m "feat(nav): give each project its own navbar

Inside /projects/<id> the top bar becomes that product's -- Home, Product, Blog,
About, Contact -- with the wordmark as the way back. Desktop and mobile now
share one item renderer instead of duplicated markup.

Also removes the two studio-chrome leaks this makes fixable: the navbar and
footer no longer advertise First Bite's blog as the company's, and the contact
form's consent line cites /privacy instead of a product's privacy page."
```

---

### Task 3: Make the Get-the-app CTA land somewhere

**Files:**
- Modify: `src/components/layout/RootLayout.jsx` (replace lines 1–23)
- Modify: `src/pages/projects/FirstBitePage.jsx` (the first `<FirstBiteBadges … />` usage in the hero)
- Modify: `src/pages/projects/PasswordManagerPage.jsx` (its hero store-badge block)
- Modify: `src/pages/ProjectDetailPage.jsx:137` (the `<aside>` element)

**Interfaces:**
- Consumes: `projectCta` from Task 1 produces `/projects/<id>#get-the-app`; this task supplies the target.
- Produces: a DOM element with `id="get-the-app"` on every page reachable as `/projects/<id>`.

- [ ] **Step 1: Teach RootLayout about hashes**

Replace the whole of `src/components/layout/RootLayout.jsx` with:

```jsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function RootLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // No hash: ordinary navigation, start at the top.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    // With a hash, scrolling to the top would fight the anchor. The target may
    // not exist yet -- routes are lazy, so the page can still be resolving --
    // so retry for about a second before giving up.
    //
    // A malformed fragment (hand-edited URL, truncated paste) makes
    // decodeURIComponent throw. This app has no error boundary, so an uncaught
    // throw here would blank the whole page rather than just miss a scroll. The
    // value is only ever an id lookup, so the raw fragment is a fine fallback.
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }

    let frames = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (frames++ < 60) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-secondary">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Anchor First Bite's store badges**

Each page carries three badge blocks; the anchor goes on the prominent hero pair,
not the small strip at the top. An id must be unique per page, so change exactly
one.

In `src/pages/projects/FirstBitePage.jsx:239-241`, replace:

```jsx
              <motion.div variants={fadeUp} className="mt-10">
                <FirstBiteBadges size="lg" />
              </motion.div>
```

with:

```jsx
              <motion.div id="get-the-app" variants={fadeUp} className="mt-10 scroll-mt-24">
                <FirstBiteBadges size="lg" />
              </motion.div>
```

`scroll-mt-24` keeps the target clear of the sticky 4rem navbar. Leave the
usages at lines 202 and 653 alone.

- [ ] **Step 3: Anchor Password Manager's store badges**

Same shape. In `src/pages/projects/PasswordManagerPage.jsx:193-195`, replace:

```jsx
              <motion.div variants={fadeUp} className="mt-10">
                <StoreBadges size="lg" />
              </motion.div>
```

with:

```jsx
              <motion.div id="get-the-app" variants={fadeUp} className="mt-10 scroll-mt-24">
                <StoreBadges size="lg" />
              </motion.div>
```

Leave the usages at lines 156 and 254 alone. Note this page defines its own
local `StoreBadges` at line 657 — it is not the shared `@/components/ui/StoreBadges`.

- [ ] **Step 4: Give the generic detail page the same anchor**

In `src/pages/ProjectDetailPage.jsx:137`, change:

```jsx
        <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
```

to:

```jsx
        <aside id="get-the-app" className="lg:col-span-4 lg:sticky lg:top-24 self-start scroll-mt-24">
```

This page renders for any project without a custom page. The CTA only shows for projects with store links — none of which use this page today — but anchoring it means a future store-linked project cannot produce a dangling hash.

- [ ] **Step 5: Verify**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build
```

Expected: PASS and a clean build.

Then check the id is unique per page:

```bash
cd "C:/dev/Next Tech Labs" && grep -c 'id="get-the-app"' src/pages/projects/FirstBitePage.jsx src/pages/projects/PasswordManagerPage.jsx src/pages/ProjectDetailPage.jsx
```

Expected: `1` for each file.

- [ ] **Step 6: Eyeball it**

`npm run dev`, go to `/projects/first-bite/blog`, click `Get the app` in the navbar. Expected: lands on the First Bite page scrolled to the store badges, not the top. Stop the server.

- [ ] **Step 7: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/components/layout/RootLayout.jsx src/pages/projects/FirstBitePage.jsx src/pages/projects/PasswordManagerPage.jsx src/pages/ProjectDetailPage.jsx
git commit -m "feat(nav): scroll to the hash target instead of the top

The Get-the-app CTA points at /projects/<id>#get-the-app, which the layout's
unconditional scroll-to-top would have overridden on every cross-page jump.
Retries for ~1s because lazy routes may still be resolving when the effect runs."
```

---

### Task 4: Coming-soon pages and the gated routes

**Files:**
- Create: `src/pages/projects/ProjectComingSoonPage.jsx`
- Create: `scripts/verify-routes.mjs`
- Modify: `src/App.jsx` (lazy imports near line 28; routes above `projects/:id` at line 170)

**Interfaces:**
- Consumes: nothing from earlier tasks at runtime; pairs with the `soon` flag Task 1 produces.
- Produces: `ProjectComingSoonPage` as a default export taking `{ section?: string }`, reused by `ProjectAboutPage` in Task 5. `scripts/verify-routes.mjs` exposes a `ROUTE_EXPECTATIONS` array that Tasks 5, 7 and 8 extend.

- [ ] **Step 1: Write the placeholder page**

Create `src/pages/projects/ProjectComingSoonPage.jsx`:

```jsx
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';

/**
 * Stands in for a nav item a project has not earned yet.
 *
 * The nav shows these items for every project so the shape never changes
 * between products. Clicking one lands here rather than doing nothing, which on
 * a phone is indistinguishable from a broken tap.
 */
export default function ProjectComingSoonPage({ section = 'This page' }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const project = projects.find((p) => p.id === id);

  useSeo({
    title: project
      ? `${section} — ${project.name} | Next Tech Labs`
      : 'Not found | Next Tech Labs',
    description: `${section} for ${project?.name ?? 'this project'} is not published yet.`,
    path: pathname,
    noindex: true,
  });

  if (!project) {
    return (
      <Container className="py-32 text-center">
        <SectionLabel number="404" label="NOT FOUND" />
        <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-text-primary">
          That project doesn't exist.
        </h1>
        <Link to="/projects" className="inline-block mt-8">
          <Button variant="outline">
            <ArrowLeft size={14} /> All projects
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-24 md:py-32 max-w-2xl">
      <SectionLabel number="·" label="COMING SOON" />
      <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05]">
        {section} for {project.name} isn't published yet.
      </h1>
      <p className="mt-5 text-text-secondary text-lg leading-relaxed">
        It's on the list. In the meantime the product page has the full picture,
        and we read every message sent through the contact form.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to={`/projects/${project.id}`}>
          <Button size="md">
            {project.name} overview <ArrowRight size={14} strokeWidth={2} />
          </Button>
        </Link>
        <Link to={`/projects/${project.id}/contact`}>
          <Button size="md" variant="outline">
            <Mail size={14} strokeWidth={2} /> Contact
          </Button>
        </Link>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Wire the gated routes**

In `src/App.jsx`, add to the lazy imports (after the `BlogPostPage` line, ~line 21):

```jsx
const ProjectSoon       = lazy(() => import('@/pages/projects/ProjectComingSoonPage'));
```

Then, immediately **after** the `projects/first-bite/blog/:slug` route and **before** the `projects/:id` route (i.e. between lines 169 and 170), insert:

```jsx
          {/*
            Gated project pages. These sit above `projects/:id` because that
            dynamic route would swallow them, and below the static
            `projects/first-bite/blog` routes, which React Router already ranks
            higher than `projects/:id/blog` — static segments beat dynamic ones.
          */}
          <Route
            path="projects/:id/blog"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectSoon section="A blog" />
              </Suspense>
            }
          />
```

- [ ] **Step 3: Write the build verifier**

Create `scripts/verify-routes.mjs`:

```js
/**
 * Post-build assertions.
 *
 * An SPA answers 200 for any path, so an HTTP check proves nothing about
 * routing here. What can be proven from the build output is that each route
 * pattern actually reached the bundle, and that the sitemap lists exactly the
 * pages meant to be indexed.
 *
 * Run after `npm run build`:  node scripts/verify-routes.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '../dist');
const sitemapFile = resolve(here, '../public/sitemap.xml');

/**
 * Route patterns that must survive into the shipped JS.
 *
 * Checked delimiter-bounded, not by bare substring: 'projects/first-bite/blog'
 * is a prefix of 'projects/first-bite/blog/:slug', and 'projects/:id' is a
 * prefix of 'projects/:id/blog', so a substring check would keep passing after
 * the route it names was deleted -- exactly the regression this file exists to
 * catch.
 */
const ROUTE_EXPECTATIONS = [
  'projects/:id/blog',
  'projects/first-bite/blog',
  'projects/:id',
];

/** True when `route` appears in `js` as a complete quoted string literal. */
function routeInBundle(js, route) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`["'\`]${escaped}["'\`]`).test(js);
}

/** Paths the sitemap must list. */
const SITEMAP_REQUIRED = [
  '/projects/first-bite',
  '/projects/first-bite/blog',
];

/** Paths the sitemap must never list — placeholders and noindex pages. */
const SITEMAP_FORBIDDEN = [
  '/projects/password-manager/blog',
  '/projects/tidyspace/blog',
  '/projects/tidyspace/about',
];

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) failures++;
};

// ── bundle ──────────────────────────────────────────────────
const assetsDir = join(distDir, 'assets');
const js = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(join(assetsDir, f), 'utf8'))
  .join('\n');

console.log(`bundle: ${readdirSync(assetsDir).filter((f) => f.endsWith('.js')).length} JS chunk(s)`);
for (const route of ROUTE_EXPECTATIONS) {
  check(routeInBundle(js, route), `route in bundle: ${route}`);
}

// ── sitemap ─────────────────────────────────────────────────
const sitemap = readFileSync(sitemapFile, 'utf8');
for (const path of SITEMAP_REQUIRED) {
  check(sitemap.includes(`<loc>https://nextechlabs.org${path}</loc>`), `sitemap lists ${path}`);
}
for (const path of SITEMAP_FORBIDDEN) {
  check(!sitemap.includes(`<loc>https://nextechlabs.org${path}</loc>`), `sitemap omits ${path}`);
}

console.log(failures === 0 ? '\nall checks passed' : `\n${failures} check(s) FAILED`);
process.exit(failures === 0 ? 0 : 1);
```

- [ ] **Step 4: Run it**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build && npm run verify
```

Expected: tests PASS, build succeeds, all verifier checks PASS.

- [ ] **Step 5: Confirm First Bite's blog still wins its route**

```bash
cd "C:/dev/Next Tech Labs" && npm run dev
```

Visit `/projects/first-bite/blog` — expected: the real blog index, not the placeholder. Then `/projects/password-manager/blog` — expected: the coming-soon page. Then `/projects/nonsense/blog` — expected: "That project doesn't exist." Stop the server.

This is the highest-risk step in the plan: if route ranking were wrong, First Bite's blog would silently become a placeholder.

- [ ] **Step 6: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/pages/projects/ProjectComingSoonPage.jsx scripts/verify-routes.mjs src/App.jsx
git commit -m "feat(nav): coming-soon pages for unearned project sections

Every project's nav shows the same five items, so Blog and About need somewhere
to land for projects that have neither. Adds a noindex placeholder and a
post-build verifier that asserts First Bite's real blog still outranks the
generic projects/:id/blog route."
```

---

### Task 5: The About page

**Files:**
- Create: `src/pages/projects/ProjectAboutPage.jsx`
- Create: `src/pages/projects/about/first-bite.jsx`
- Modify: `src/App.jsx` (lazy imports; new route beside the blog one from Task 4)
- Modify: `scripts/verify-routes.mjs` (`ROUTE_EXPECTATIONS`, `SITEMAP_REQUIRED`)

**Interfaces:**
- Consumes: `ProjectComingSoonPage` (default export, `{section}` prop) from Task 4.
- Produces: `ProjectAboutPage` default export; the `aboutPages` registry pattern later projects extend.

- [ ] **Step 1: Write the route shell**

Create `src/pages/projects/ProjectAboutPage.jsx`:

```jsx
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ProjectComingSoonPage from '@/pages/projects/ProjectComingSoonPage';
import { projects } from '@/data/projects';

/**
 * About content, one module per project — same registry shape
 * `ProjectDetailPage` uses for custom product pages.
 *
 * `site.about` in the project data decides whether the nav item reads live or
 * `soon`. This registry decides what the route renders. A declaration that runs
 * ahead of its content degrades to the placeholder rather than crashing.
 */
const aboutPages = {
  'first-bite': lazy(() => import('@/pages/projects/about/first-bite')),
};

export default function ProjectAboutPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const Content = aboutPages[id];

  if (!project || !Content) return <ProjectComingSoonPage section="An about page" />;

  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="label-mono text-text-muted">Loading…</span>
        </div>
      }
    >
      <Content project={project} />
    </Suspense>
  );
}
```

- [ ] **Step 2: Write First Bite's About content**

Create `src/pages/projects/about/first-bite.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Stethoscope } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useSeo } from '@/hooks/useSeo';
import { fadeUp, stagger } from '@/lib/motion';

const principles = [
  {
    icon: Stethoscope,
    title: 'Follow the evidence, name the source',
    body: 'The protocols come from the LEAP and EAT trials and the 2017 NIAID addendum guidelines, and the app says so where it matters. Where the evidence is thin or a baby is higher risk, it routes to "ask your pediatrician" instead of inventing confidence it does not have.',
  },
  {
    icon: ShieldCheck,
    title: 'Refuse to guess',
    body: 'The scanner reads labels, menus and recipes, and when it cannot confirm something it says so rather than returning a comfortable "safe". A false negative on an allergen is not a rounding error, so uncertainty is surfaced, never smoothed over.',
  },
  {
    icon: Users,
    title: 'Feeding a baby is a team sport',
    body: 'Co-parents, grandparents, nannies and daycare all feed the same child, and the record only helps if it is the same record. Everyone invited sees the same log in real time, at the permission level you chose for them.',
  },
];

export default function FirstBiteAboutPage({ project }) {
  useSeo({
    title: 'About First Bite — why we built it | Next Tech Labs',
    description:
      'First Bite exists because allergy-prevention guidance changed in 2015 and most parents never heard. How the app approaches evidence, uncertainty, and the people who feed the baby.',
    path: '/projects/first-bite/about',
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 85% 100%, rgba(127,77,243,0.14) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-16 md:pt-24 pb-14">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Badge variant="muted">Next Tech Labs · First Bite</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05]"
            >
              The guidance changed. Most parents never heard.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary text-xl leading-snug"
            >
              For decades the advice was to delay peanuts, eggs and milk. The
              trials that overturned it landed in 2015 and 2016 — and the
              waiting-room advice took years to catch up, when it caught up at
              all. First Bite exists to close that gap for one family at a time.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-20 max-w-3xl">
        <SectionLabel number="01" label="WHY IT EXISTS" />
        <div className="mt-5 space-y-5 text-text-secondary text-lg leading-relaxed">
          <p>
            The LEAP trial found that introducing peanut early to infants at
            higher risk cut peanut allergy dramatically compared with avoiding
            it. The EAT study pushed on the same question across several
            allergens, and in 2017 the NIAID addendum guidelines rewrote the
            official advice around early introduction.
          </p>
          <p>
            None of that reaches a tired parent at 6am. What reaches them is a
            half-remembered rule from a relative, a conflicting search result,
            and a jar of something they are now afraid to open. The information
            problem is not that the science is missing — it is that nobody
            translated it into what to do on a Tuesday morning.
          </p>
          <p>
            First Bite is that translation: which allergen next, how long to
            wait, what to watch for, and whether the thing in your hand is safe
            for this specific baby today.
          </p>
        </div>

        <div className="mt-16">
          <SectionLabel number="02" label="HOW WE BUILD IT" />
          <div className="mt-6 space-y-8">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="mt-1 flex-none w-9 h-9 rounded-xl bg-accent-light text-accent inline-flex items-center justify-center">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">{title}</h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionLabel number="03" label="WHO BUILDS IT" />
          <div className="mt-5 space-y-5 text-text-secondary text-lg leading-relaxed">
            <p>
              First Bite is built by Next Tech Labs, a small software studio
              working across the GCC and East Africa. It runs on the same
              architecture and the same infrastructure as the studio's other
              products, which is why a team this size can ship and maintain it
              on both stores.
            </p>
            <p>
              There is no support department. The person who wrote the code
              answers the email — reach them through the{' '}
              <Link to="/projects/first-bite/contact" className="text-accent hover:underline">
                contact form
              </Link>{' '}
              or the{' '}
              <Link to="/projects/first-bite/support" className="text-accent hover:underline">
                support page
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-success)] p-6">
          <p className="label-mono text-text-muted">IMPORTANT</p>
          <p className="mt-3 text-text-secondary leading-relaxed">
            First Bite is not a medical device and does not provide medical
            advice, diagnosis or treatment. It organises information and flags
            risk. Decisions about your baby's diet — especially where there is a
            family history of allergy, existing eczema, or a previous reaction —
            belong with your pediatrician or allergist.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/projects/first-bite">
            <Button size="md">
              What {project.name} does <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </Link>
          <Link to="/projects/first-bite/blog">
            <Button size="md" variant="outline">
              Read the guides
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Step 3: Wire the route**

In `src/App.jsx`, add to the lazy imports beside `ProjectSoon`:

```jsx
const ProjectAbout      = lazy(() => import('@/pages/projects/ProjectAboutPage'));
```

Then add, directly after the `projects/:id/blog` route added in Task 4:

```jsx
          <Route
            path="projects/:id/about"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectAbout />
              </Suspense>
            }
          />
```

- [ ] **Step 4: Extend the verifier**

In `scripts/verify-routes.mjs`, add `'projects/:id/about'` to `ROUTE_EXPECTATIONS`.

Do **not** touch `SITEMAP_REQUIRED` — the sitemap entries arrive in Task 8, and
adding the expectation now would make `npm run verify` exit non-zero for reasons
outside this task.

- [ ] **Step 5: Verify**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build && npm run verify
```

Expected: tests PASS, build succeeds, **all** verifier checks PASS.

- [ ] **Step 6: Eyeball it**

`npm run dev`. Visit `/projects/first-bite/about` — expected: the written page, First Bite's navbar, About highlighted. Visit `/projects/password-manager/about` — expected: coming-soon. Stop the server.

- [ ] **Step 7: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/pages/projects/ProjectAboutPage.jsx src/pages/projects/about/first-bite.jsx src/App.jsx scripts/verify-routes.mjs
git commit -m "feat(nav): per-project about pages, starting with First Bite

Content lives one module per project behind a registry, the same shape
ProjectDetailPage uses for custom product pages. A project that declares
site.about without shipping content degrades to the placeholder."
```

---

### Task 6: Contact form variants and per-project delivery

**Files:**
- Modify: `src/components/sections/ContactForm.jsx` (lines 1–137 substantially; the field components below line 325 are untouched)
- Modify: `src/pages/ContactPage.jsx` (its `<ContactForm />` usage)

**Interfaces:**
- Consumes: `resolveSupport(project)` from Task 1.
- Produces: `<ContactForm variant="studio" | "product" project={project?} />`. `variant` defaults to `'studio'`, so the existing usage keeps working unchanged.

- [ ] **Step 1: Replace the top of ContactForm**

In `src/components/sections/ContactForm.jsx`, replace everything from line 1 through the end of `function validate` (line 49) with:

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { company } from '@/data/company';
import { resolveSupport } from '@/lib/nav';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/cn';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const SITE_HOST = 'nextechlabs.org';

const projectTypes = [
  { value: '', label: 'Select a category…', disabled: true },
  { value: 'mobile', label: 'Mobile app (iOS / Android)' },
  { value: 'web', label: 'Web app / SaaS' },
  { value: 'ai-saas', label: 'AI-driven product' },
  { value: 'media', label: 'Media / content production' },
  { value: 'infra', label: 'Infrastructure / DevOps' },
  { value: 'other', label: 'Something else' },
];

const budgets = [
  { value: '', label: 'Not sure yet' },
  { value: '<10k',     label: 'Under $10k' },
  { value: '10-25k',   label: '$10k – $25k' },
  { value: '25-50k',   label: '$25k – $50k' },
  { value: '50-100k',  label: '$50k – $100k' },
  { value: '100k+',    label: '$100k+' },
];

const timelines = [
  { value: '',         label: 'Just exploring' },
  { value: 'asap',     label: 'ASAP — fire is on' },
  { value: '1-3m',     label: 'Within 1–3 months' },
  { value: '3-6m',     label: '3–6 months' },
  { value: '6m+',      label: '6+ months out' },
];

/**
 * Topics for a product's own contact form.
 *
 * Bug reports and billing only make sense for something shipped, so they are
 * added when the project is live. Budget and timeline — the studio's questions —
 * are the wrong thing to ask a parent asking whether a food is safe.
 */
function productTopics(project) {
  const shipped = project?.status === 'live';
  return [
    { value: '', label: 'What is this about?…', disabled: true },
    ...(shipped
      ? [
          { value: 'bug', label: 'Something is broken' },
          { value: 'account', label: 'Account & billing' },
        ]
      : []),
    { value: 'feedback', label: 'Feedback & feature request' },
    { value: 'press', label: 'Press & partnerships' },
    { value: 'other', label: 'Something else' },
  ];
}

function validate({ name, email, projectType, message }, variant) {
  const errors = {};
  if (!name.trim()) errors.name = 'Tell us what to call you.';
  if (!email.trim()) errors.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That doesn’t look like a valid email.';
  if (!projectType) {
    errors.projectType = variant === 'product' ? 'Pick the closest topic.' : 'Pick the category that best fits.';
  }
  if (!message.trim()) errors.message = 'A paragraph or two is plenty.';
  else if (message.trim().length < 20) errors.message = 'Give us a bit more — at least 20 characters.';
  return errors;
}
```

- [ ] **Step 2: Replace the component's signature and submit handler**

Replace `export function ContactForm() {` through the end of `onSubmit` (the old lines 51–137) with:

```jsx
export function ContactForm({ variant = 'studio', project = null }) {
  // Every product submit path reads project.id and project.name, so the product
  // variant is meaningless without one. Degrade to the studio form rather than
  // throwing -- this app has no error boundary, so a throw would blank the page
  // instead of just losing a field set.
  const isProduct = variant === 'product' && project != null;

  if (import.meta.env?.DEV && variant === 'product' && !project) {
    console.warn(
      'ContactForm: variant="product" requires a `project` prop — falling back to the studio form.',
    );
  }

  const { email: recipient, formKey } = isProduct
    ? resolveSupport(project)
    : { email: company.channels.email, formKey: resolveSupport(null).formKey };

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    consent: false,
    _trap: '', // honeypot — bots fill this in, humans never see it
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | mailto

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (form._trap) return; // bot
    const v = validate(form, variant);
    if (Object.keys(v).length) {
      setErrors(v);
      const first = document.getElementById(`cf-${Object.keys(v)[0]}`);
      first?.focus();
      return;
    }

    setStatus('sending');

    const sourcePath = isProduct ? `/projects/${project.id}/contact` : '/contact';
    const label = isProduct ? project.name : 'Studio';
    const subject = isProduct
      ? `[${project.name}] ${form.projectType || 'inquiry'} — ${form.name}`
      : `[${form.projectType || 'inquiry'}] ${form.name} — ${form.company || 'personal'}`;

    if (formKey) {
      try {
        // Web3Forms binds an access key to a destination inbox, which is how a
        // static site routes each product's mail somewhere different. Extra
        // fields are echoed into the email body.
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: formKey,
            subject,
            from_name: form.name,
            email: form.email,
            message: form.message,
            product: label,
            topic: form.projectType,
            ...(isProduct
              ? {}
              : { company: form.company, budget: form.budget, timeline: form.timeline }),
            source: `${SITE_HOST}${sourcePath}`,
          }),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        setStatus('success');
        setForm((f) => ({
          ...f,
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          consent: false,
        }));
      } catch {
        setStatus('error');
      }
    } else {
      // No key configured — compose the message in the visitor's mail client
      // instead, addressed to whichever inbox this form belongs to.
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        isProduct ? `Product: ${project.name}` : form.company && `Company: ${form.company}`,
        isProduct ? `Topic: ${form.projectType}` : `Project type: ${form.projectType}`,
        !isProduct && form.budget && `Budget: ${form.budget}`,
        !isProduct && form.timeline && `Timeline: ${form.timeline}`,
        '',
        form.message,
      ]
        .filter(Boolean)
        .join('\n');
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  }
```

- [ ] **Step 3: Make the studio-only fields conditional**

In the returned JSX, replace the `<Field id="company" … />` block (old lines 212–220) with:

```jsx
      {!isProduct && (
        <Field
          id="company"
          label="Company"
          hint="Optional"
          value={form.company}
          onChange={(v) => set('company', v)}
          placeholder="Your org or brand"
          autoComplete="organization"
        />
      )}
```

Replace the `<SelectField id="projectType" … />` block (old lines 222–230) with:

```jsx
      <SelectField
        id="projectType"
        label={isProduct ? 'Topic' : 'Project type'}
        required
        value={form.projectType}
        onChange={(v) => set('projectType', v)}
        options={isProduct ? productTopics(project) : projectTypes}
        error={errors.projectType}
      />
```

Replace the budget/timeline grid (old lines 232–249) with:

```jsx
      {!isProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            id="budget"
            label="Budget"
            hint="Optional"
            value={form.budget}
            onChange={(v) => set('budget', v)}
            options={budgets}
          />
          <SelectField
            id="timeline"
            label="Timeline"
            hint="Optional"
            value={form.timeline}
            onChange={(v) => set('timeline', v)}
            options={timelines}
          />
        </div>
      )}
```

Replace the `<TextareaField id="message" … />` label prop so it reads:

```jsx
        label={isProduct ? 'What’s going on?' : 'What are you trying to build?'}
```

and its `placeholder` prop:

```jsx
        placeholder={
          isProduct
            ? 'What happened, what you expected, and the device you’re on if it’s a bug.'
            : 'A paragraph is plenty. The clearer the goal, the better the first reply.'
        }
```

- [ ] **Step 4: Point the error-state fallback at the right inbox**

In the `status === 'error'` block (old lines 282–293), replace both occurrences of `company.channels.email` with `recipient`:

```jsx
            <a href={`mailto:${recipient}`} className="text-accent hover:underline">
              {recipient}
            </a>
```

- [ ] **Step 5: Make the studio page explicit**

In `src/pages/ContactPage.jsx`, change its `<ContactForm />` usage to:

```jsx
<ContactForm variant="studio" />
```

- [ ] **Step 6: Verify**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build
```

Expected: tests PASS, build succeeds.

Confirm the dead env var is gone and the wrong domain with it:

```bash
cd "C:/dev/Next Tech Labs" && grep -rn "VITE_CONTACT_ENDPOINT\|nexttechlabs.com" src/
```

Expected: no output.

- [ ] **Step 7: Eyeball the studio form is unchanged**

`npm run dev`, visit `/contact`. Expected: the same form as before — company, project type, budget, timeline — and the consent line now links to `/privacy`. Submitting opens the mail client addressed to `help@nextechlabs.org`. Stop the server.

- [ ] **Step 8: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/components/sections/ContactForm.jsx src/pages/ContactPage.jsx
git commit -m "feat(contact): product variant and per-project delivery

One component, two field sets: the studio keeps project type, budget and
timeline; a product asks for a topic instead, because budget is the wrong
question for someone asking whether a food is safe.

Delivery moves from VITE_CONTACT_ENDPOINT -- a single URL that cannot express
per-project routing, and which was set in no env, build arg or CI secret -- to
Web3Forms access keys resolved per project, still falling back to mailto."
```

---

### Task 7: The project contact page

**Files:**
- Create: `src/pages/projects/ProjectContactPage.jsx`
- Modify: `src/App.jsx` (lazy import; route beside the other two)
- Modify: `scripts/verify-routes.mjs` (`ROUTE_EXPECTATIONS`, `SITEMAP_REQUIRED`)

**Interfaces:**
- Consumes: `<ContactForm variant="product" project={project} />` from Task 6; `resolveSupport` from Task 1.
- Produces: `ProjectContactPage` default export.

- [ ] **Step 1: Write the page**

Create `src/pages/projects/ProjectContactPage.jsx`:

```jsx
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, LifeBuoy } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/sections/ContactForm';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import { resolveSupport } from '@/lib/nav';
import { company } from '@/data/company';
import { fadeUp, stagger } from '@/lib/motion';
import ProjectComingSoonPage from '@/pages/projects/ProjectComingSoonPage';

/** Projects with a support page — these get a "try support first" pointer. */
const SUPPORT_PAGES = new Set(['first-bite', 'password-manager']);

export default function ProjectContactPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useSeo({
    title: project ? `Contact ${project.name} | Next Tech Labs` : 'Not found | Next Tech Labs',
    description: project
      ? `Get in touch about ${project.name} — bugs, feedback, account questions, or press.`
      : '',
    path: `/projects/${id}/contact`,
    noindex: project?.status !== 'live',
  });

  // Reuses the placeholder's 404 branch rather than duplicating one.
  if (!project) return <ProjectComingSoonPage section="A contact page" />;

  const { email } = resolveSupport(project);

  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <SectionLabel number="·" label="CONTACT" />
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05]"
        >
          Talk to the {project.name} team.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-text-secondary text-lg leading-relaxed">
          The person who built it reads this. Expect a reply within 1–2 business
          days.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            <Mail size={14} strokeWidth={1.75} /> {email}
          </a>
          {SUPPORT_PAGES.has(project.id) && (
            <Link
              to={`/projects/${project.id}/support`}
              className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
            >
              <LifeBuoy size={14} strokeWidth={1.75} /> Troubleshooting & FAQ
            </Link>
          )}
          <a
            href={company.channels.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            WhatsApp {company.channels.whatsappLabel}
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <ContactForm variant="product" project={project} />
        </motion.div>
      </motion.div>
    </Container>
  );
}
```

- [ ] **Step 2: Wire the route**

In `src/App.jsx`, add to the lazy imports:

```jsx
const ProjectContact    = lazy(() => import('@/pages/projects/ProjectContactPage'));
```

and, directly after the `projects/:id/about` route:

```jsx
          <Route
            path="projects/:id/contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectContact />
              </Suspense>
            }
          />
```

- [ ] **Step 3: Extend the verifier**

In `scripts/verify-routes.mjs`, add `'projects/:id/contact'` to `ROUTE_EXPECTATIONS`.

Do **not** touch `SITEMAP_REQUIRED` — Task 8 owns those entries.

- [ ] **Step 4: Verify**

```bash
cd "C:/dev/Next Tech Labs" && npm test && npm run build && npm run verify
```

Expected: tests PASS, build succeeds, **all** verifier checks PASS.

- [ ] **Step 5: Eyeball it**

`npm run dev`, visit `/projects/first-bite/contact`. Expected: topic select showing "Something is broken" and "Account & billing" (First Bite is `live`), no budget or timeline fields, `help+firstbite@nextechlabs.org` shown, a troubleshooting link. Then `/projects/tidyspace/contact` — expected: no bug/billing topics (concept status), `help@nextechlabs.org`, no troubleshooting link. Stop the server.

- [ ] **Step 6: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add src/pages/projects/ProjectContactPage.jsx src/App.jsx scripts/verify-routes.mjs
git commit -m "feat(nav): per-project contact pages

Universal across all 19 projects -- the form is data-driven, so no project needs
new content to have a working contact route. Support stays out of the top nav
and is reachable from here."
```

---

### Task 8: Sitemap

**Files:**
- Modify: `scripts/generate-sitemap.mjs` (the project loop, lines 50–56)
- Modify: `scripts/verify-routes.mjs` (`SITEMAP_REQUIRED`)

**Interfaces:**
- Consumes: `site.about` and `status` from the project data (Task 1).
- Produces: sitemap entries the Task 4 verifier asserts. This task owns every
  `SITEMAP_REQUIRED` entry for the new pages — Tasks 5 and 7 deliberately left
  them out so `npm run verify` stayed green throughout.

- [ ] **Step 1: Extend the project loop**

In `scripts/generate-sitemap.mjs`, replace the loop at lines 50–56 with:

```js
for (const project of projects) {
  entries.push({
    path: `/projects/${project.id}`,
    changefreq: 'monthly',
    priority: project.featured ? '0.8' : '0.6',
  });

  // About pages only where one is actually written.
  if (project.site?.about) {
    entries.push({
      path: `/projects/${project.id}/about`,
      changefreq: 'monthly',
      priority: '0.6',
    });
  }

  // Every project has a contact route, but a concept project's is a thin page
  // with nothing to rank for. Index the shipped ones only.
  if (project.status === 'live') {
    entries.push({
      path: `/projects/${project.id}/contact`,
      changefreq: 'yearly',
      priority: '0.4',
    });
  }
}
```

- [ ] **Step 2: Assert the new entries in the verifier**

In `scripts/verify-routes.mjs`, extend `SITEMAP_REQUIRED` so it reads:

```js
const SITEMAP_REQUIRED = [
  '/projects/first-bite',
  '/projects/first-bite/blog',
  '/projects/first-bite/about',
  '/projects/first-bite/contact',
];
```

- [ ] **Step 3: Regenerate and verify**

```bash
cd "C:/dev/Next Tech Labs" && npm run sitemap && npm run build && npm run verify
```

Expected: the sitemap reports a higher URL count than before, and **every** verifier check PASSes.

- [ ] **Step 4: Confirm placeholders stayed out**

```bash
cd "C:/dev/Next Tech Labs" && grep -c "/about</loc>\|/contact</loc>" public/sitemap.xml && grep -n "tidyspace/about\|password-manager/blog" public/sitemap.xml
```

Expected: a count on the first command; **no output** from the second.

- [ ] **Step 5: Commit**

```bash
cd "C:/dev/Next Tech Labs"
git add scripts/generate-sitemap.mjs scripts/verify-routes.mjs public/sitemap.xml
git commit -m "feat(seo): list project about and contact pages in the sitemap

About pages where one is written, contact pages for shipped products only --
a concept project's contact route is a thin page with nothing to rank for.
Coming-soon placeholders stay out and carry noindex."
```

---

### Task 9: Full verification and deploy

**Files:** none modified.

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Clean full run**

```bash
cd "C:/dev/Next Tech Labs" && rm -rf dist && npm test && npm run build && npm run verify
```

Expected: tests PASS, build succeeds, all verifier checks PASS.

- [ ] **Step 2: Manual click-through**

`npm run dev`, then walk this list — the component-rendering gap the automated tests do not cover:

| Path | Expect |
|---|---|
| `/` | Studio nav. **No Blog item.** |
| `/projects` | Studio nav — the index belongs to the studio. |
| `/projects/first-bite` | First Bite nav, `/ First Bite` by the wordmark, `Get the app` CTA. Product highlighted. |
| `/projects/first-bite/blog` | Real blog index. Blog highlighted, Product **not**. |
| `/projects/first-bite/about` | The written About page. |
| `/projects/first-bite/contact` | Product form, topic select, no budget/timeline. |
| `/projects/first-bite/support` | Existing support page, First Bite nav on top. |
| `/projects/password-manager` | Its nav, Blog and About marked `soon`, `Get the app` CTA. |
| `/projects/password-manager/blog` | Coming-soon page. |
| `/projects/tidyspace` | Its nav, `soon` on two items, **no CTA** (no store links). |
| `/projects/nonsense` | 404 with **studio** nav, not a fake product shell. |
| Mobile width, any project page | Menu opens, project name shown, `soon` chips render, tapping closes it. |

Stop the server.

- [ ] **Step 3: Commit anything outstanding, then deploy**

```bash
cd "C:/dev/Next Tech Labs" && git status --short
```

If clean, push and deploy. Deployment is Coolify — the app UUID and the deploy call are recorded in `docs/INFRA.md`; the deploy endpoint is `GET /api/v1/deploy?uuid=<uuid>` against the public Coolify FQDN.

```bash
cd "C:/dev/Next Tech Labs" && git push origin main
```

- [ ] **Step 4: Verify in production, not in the build**

Once the deploy reports finished, check the live site — a green build is not proof of a shipped route:

```bash
node -e "
const paths = [
  '/projects/first-bite/about',
  '/projects/first-bite/contact',
  '/projects/password-manager/blog',
];
const base = 'https://nextechlabs.org';
(async () => {
  const shell = await (await fetch(base + '/projects/first-bite/about')).text();
  const entry = (shell.match(/src=\"(\/assets\/index-[^\"]+\.js)\"/) || [])[1];
  const js = await (await fetch(base + entry)).text();
  console.log('entry bundle:', entry);
  for (const needle of ['projects/:id/about', 'projects/:id/contact', 'projects/:id/blog']) {
    console.log((js.includes(needle) ? 'YES ' : 'no  ') + needle);
  }
  for (const p of paths) {
    const r = await fetch(base + p);
    console.log(r.status, p);
  }
})();
"
```

Expected: `YES` for all three route patterns, `200` for all three paths.

- [ ] **Step 5: Confirm the leak is gone in production**

Load `https://nextechlabs.org/` and confirm the navbar has no Blog item, then `https://nextechlabs.org/projects/first-bite` and confirm the navbar is First Bite's.

---

## Open item, not blocking

`support.formKey` is `null` for both declared projects, so every contact form uses its `mailto:` path. Turning on real delivery is:

1. Create a Web3Forms access key per destination address and verify each address.
2. Paste each key into the matching `support.formKey` in `src/data/projects.js`.
3. Commit, deploy.

No code changes, and the site is complete without it.
