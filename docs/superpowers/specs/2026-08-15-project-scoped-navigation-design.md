# Project-scoped navigation

**Date:** 2026-08-15
**Status:** approved, not yet implemented
**Repo:** Next Tech Labs portfolio site

## Problem

Next Tech Labs holds many products, but the site has one navbar. A visitor who
opens `/projects/first-bite` still sees the studio's nav — Products, Categories,
Tech — with no way to reach anything belonging to the product they are looking
at. The product has a marketing page, a blog, a support page and legal pages,
and none of them are reachable from the top of the screen.

The current navbar makes this worse in the other direction: its "Blog" link
points at `/projects/first-bite/blog`, so the studio's chrome advertises one
product's blog as if it were the company's. Same for the footer. A product's
content leaked upward into the parent brand because there was no place to put
it.

Both problems have one fix: **inside a project, the top nav belongs to that
project.**

## Scope

In: the top navbar, a per-project nav model, two new page types, a
coming-soon placeholder, per-project contact delivery, and the studio-chrome
fixes this makes possible.

Out: the footer (stays studio-wide), per-project theming, a studio blog,
and adding Support to the top nav.

## 1. The nav model

Inside any resolved project route, the navbar becomes:

```
Next Tech.Labs / First Bite    Home  Product  Blog  About  Contact   [Get the app]
```

Five items, fixed order, same five for every project:

| Item | Target | Availability |
|---|---|---|
| Home | `/` — the main site | universal |
| Product | `/projects/<id>` | universal |
| Blog | `/projects/<id>/blog` | declared |
| About | `/projects/<id>/about` | declared |
| Contact | `/projects/<id>/contact` | universal |

"Home" means the main site, not the product's landing page. The wordmark stays
top-left and also returns to `/`; the muted `/ First Bite` after it identifies
whose nav this is, which the five generic labels otherwise never say.

**Scope detection.** `/projects` (the index) and `/projects/<unknown-slug>` keep
the studio nav — only a slug that resolves to a real project switches. Every
path under a resolved project stays in that project's nav, including its blog,
support and legal pages.

**The CTA.** `Start a project` is a studio ask and is wrong inside a product. It
becomes `Get the app` → `/projects/<id>#get-the-app` when the project has store
links, and is omitted otherwise. Today only First Bite and Password Manager have
store links, and both have custom product pages.

## 2. Coming soon

Blog and About appear for every project whether or not it has them. An item a
project has not earned is marked `soon` in the nav and resolves to a real page —
project name, which section is coming, and buttons to Product and Contact —
rather than a disabled item that silently does nothing when tapped on a phone.

| | Home | Product | Blog | About | Contact |
|---|---|---|---|---|---|
| First Bite | yes | yes | yes | new | new |
| Password Manager | yes | yes | soon | soon | new |
| Other 17 projects | yes | yes | soon | soon | new |

Coming-soon pages are `noindex, nofollow` and stay out of the sitemap.

## 3. Data shape

Two optional keys per project in `src/data/projects.js`:

```js
{
  id: 'first-bite',
  // …
  site: { blog: true, about: true },
  support: { email: 'help+firstbite@nextechlabs.org', formKey: '<web3forms key>' },
}
```

`site` declares which of the two gated pages exist. Paths are always **derived**
(`/projects/${id}/blog`), never written by hand, so a declaration cannot point at
a route that does not exist.

`support` is resolved with fallbacks, so every project works before any of this
is filled in:

- `support.email` → falls back to `company.channels.email`
- `support.formKey` → falls back to `VITE_WEB3FORMS_KEY` → falls back to `null`

A `null` form key means the contact form uses its `mailto:` path. Nothing is
blocked on external accounts existing.

## 4. `src/lib/project-nav.js`

A pure module — no React, no side effects — matching the shape of the existing
`lib/blog.js`.

```js
/** The project whose route this pathname is inside, or null. */
export function matchProjectRoute(pathname)   // → project | null

/** The five nav items for a project, in order. */
export function projectNavItems(project)      // → [{ key, label, to, end, soon }]

/** Destination inbox and form key for a project, with fallbacks applied. */
export function resolveSupport(project)       // → { email, formKey }
```

`matchProjectRoute` splits the pathname, requires the first segment to be
`projects`, requires a second segment, and looks it up by `id`. Unknown slugs
return `null`.

`end: true` is set on Home and Product. Without it, `/` matches every route and
`/projects/first-bite` stays highlighted while you are on `/blog`, `/about` or
`/contact`.

## 5. Navbar

`Navbar.jsx` currently hardcodes one `links` array and renders it twice —
desktop and mobile — with duplicated markup. It becomes:

1. Compute `project = matchProjectRoute(pathname)` once.
2. Derive `{ items, cta, brandSuffix }` from that — project nav or studio nav.
3. Render the shared item list into both the desktop bar and the mobile sheet.

Extracting the list rendering removes the existing duplication and keeps the
file near its current size despite doing more.

`RootLayout` scrolls to top on every pathname change, which would fight the
`#get-the-app` CTA when navigating from a sub-page. It gains one condition: when
the location carries a hash, scroll that element into view instead of jumping to
the top. Both product pages get `id="get-the-app"` on their store-badge blocks,
and `ProjectDetailPage` gets the same id on its links block so the anchor can
never dangle.

## 6. New routes and pages

```
projects/:id/about     → ProjectAboutPage
projects/:id/contact   → ProjectContactPage
projects/:id/blog      → ProjectComingSoonPage
```

The existing explicit `projects/first-bite/blog` and
`projects/first-bite/blog/:slug` routes still win over `projects/:id/blog`:
React Router ranks static segments above dynamic ones. All three sit above
`projects/:id`, which would otherwise swallow them.

**`ProjectAboutPage`** — the app's own story: why it exists, the method behind
it, who builds it, what is next.

Content lives one module per project at `src/pages/projects/about/<id>.jsx`,
lazily loaded through a registry keyed by project id — the same pattern
`ProjectDetailPage` already uses for `customPages`. First Bite's is written as
part of this work, drawn from its existing material.

`site.about` remains the single source of truth for the *nav*: it decides whether
the item reads live or `soon`. The page itself falls back to coming-soon when no
content module is registered, so a declaration that runs ahead of its content
degrades to the placeholder instead of crashing the route.

**`ProjectContactPage`** — universal. Carries the product-variant form (§7) and,
where the project has a support page, a line linking to it for troubleshooting.
Support stays out of the top nav; this is how it is reachable from inside the
product.

**`ProjectComingSoonPage`** — shared fallback, `noindex`.

## 7. Contact form: one component, two variants

`ContactForm.jsx` is 424 lines with the studio's fields hardcoded. It is not
forked; the field schema is extracted and the component takes a `variant`:

**`studio`** (unchanged) — project type, budget, timeline.

**`product`** — name, email, topic, message. Topics: Feedback & feature request,
Press & partnerships, Something else — plus Bug report and Account & billing when
the project's `status` is `live`. Budget and timeline are the wrong questions for
a parent asking whether a food is safe.

Validation, honeypot and the idle/sending/success/error states are shared.

### Delivery

`VITE_CONTACT_ENDPOINT` is removed. It named a per-form URL, which cannot express
per-project routing, and it is currently set in no `.env`, no build arg and no CI
secret — so the studio form already falls back to `mailto:` in production and
removing it changes no live behaviour.

In its place, Web3Forms: the endpoint is constant, and the **access key** binds a
submission to a destination inbox. One key per project routes each product's mail
to its own address with no backend, which this static site does not have.

```
formKey present → POST https://api.web3forms.com/submit
                  { access_key, subject, from_name, email, message, …extras }
formKey null    → mailto: the resolved support address, subject and body prefilled
```

Web3Forms echoes arbitrary extra fields into the email body, so `product`,
`topic` and the source path travel with every submission.

**Addressing.** ~~Destination addresses use plus-aliases —
`help+firstbite@nextechlabs.org` — which Gmail delivers to the inbox already
being read, where a filter labels them.~~

**Corrected 2026-08-16 — this was wrong.** A real submission through the shipped
form bounced:

```
550 5.1.1 Recipient address rejected: User unknown in virtual mailbox table
```

`nextechlabs.org` resolves recipients from an explicit virtual mailbox table and
does not expand `+` suffixes, so the plus-aliases were never real addresses. Worse,
the failure is silent from the visitor's side — the bounce goes to the sender, so
the form shows success while the mail dies.

Every project now uses plain `help@nextechlabs.org`, and `src/lib/nav.test.js`
asserts no project routes support mail through a plus-alias. Per-project routing
comes from `support.formKey` alone, which is where it always belonged. Real
per-project inboxes would need a mailbox or alias entry created server-side first.

**On the key being in git.** A Web3Forms access key is a public routing token,
not a credential: it is designed to sit in client-side HTML, it authorises
nothing but "deliver a message to this inbox", and it cannot read mail or change
the destination. It is not a secret under the repo's no-secrets rule. The real
consequence is that anyone can post to it, which is a spam vector — mitigated by
the form's existing honeypot, and by Web3Forms' captcha if it becomes a problem
in practice.

**Published addresses.** `help@nextechlabs.org` appears 39 times across the site,
including the First Bite and Password Manager support, privacy and legal pages
that Apple and Google reviewed. Page URLs do not change, so no store
resubmission is triggered, but any address placed on those pages must stay
monitored. Plus-aliases into the existing inbox satisfy this by construction.

## 8. Studio-chrome fixes carried along

Direct consequences of the product having its own nav:

- **Blog is removed from the studio navbar and footer.** Both point at
  `/projects/first-bite/blog` today. The studio has no blog; advertising a
  product's as the company's is the leak this design exists to fix. First Bite's
  blog is reachable from First Bite's nav.
- The nginx `/blog` → First Bite 301 **stays**. It protects five indexed article
  URLs. It is simply no longer linked from anywhere.
- `ContactForm` reports `source: 'nexttechlabs.com/contact'`, a domain the studio
  does not own. Corrected to the real host and path.

## 9. SEO and sitemap

New pages call the existing `useSeo` hook. `generate-sitemap.mjs` gains:

- `/projects/<id>/about` for every project declaring `site.about`
- `/projects/<id>/contact` for every project whose `status` is `live`

Coming-soon pages are excluded from the sitemap and carry `noindex, nofollow`.
Contact pages for concept and in-development projects are omitted as thin.

## 10. Verification

The repo has no test runner — `package.json` defines dev, build, preview and
sitemap only. This design does not add one. Verification is:

1. `npm run build`, then serve `dist` and assert against it:
   - each project's five nav routes resolve
   - `/projects` and an unknown slug keep the studio nav
   - coming-soon pages carry `noindex`
   - the sitemap contains the new real pages and none of the placeholders
   - no route in the built bundle points at `/projects/first-bite/blog` from
     studio chrome
2. A bundle-content check, since an SPA returns 200 for any path — grep the
   built JS for the new route strings.
3. Manual click-through of First Bite's five nav items and one coming-soon item.

## 11. Needs a decision before delivery is live

Creating Web3Forms keys requires an account and per-address verification, which
only the account holder can do. Until keys exist, every contact form uses its
`mailto:` path and the site ships complete. Turning delivery on afterwards is a
data edit in `projects.js` with no code change and no redeploy of anything else.

## Follow-ups, deliberately not in this work

- Scoping the footer to the active project.
- Writing About content for projects beyond First Bite.
- A studio blog at `/blog`, which would retire the nginx redirect and the two
  legacy client routes — both already carry comments saying so.
