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
