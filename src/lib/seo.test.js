import { test } from 'node:test';
import assert from 'node:assert/strict';

import { toIsoDateTime, buildArticleJsonLd, absoluteUrl } from './seo.js';

test('toIsoDateTime widens a bare date to ISO 8601 with an offset', () => {
  // Google's Rich Results Test flags a bare YYYY-MM-DD on datePublished as
  // "Invalid datetime value" + "missing a timezone".
  assert.equal(toIsoDateTime('2026-07-06'), '2026-07-06T00:00:00+00:00');
});

test('toIsoDateTime passes through a value that already has a time', () => {
  assert.equal(toIsoDateTime('2026-07-06T09:30:00Z'), '2026-07-06T09:30:00Z');
  assert.equal(toIsoDateTime('2026-07-06T00:00:00+04:00'), '2026-07-06T00:00:00+04:00');
});

test('toIsoDateTime leaves unrecognised input alone rather than corrupting it', () => {
  assert.equal(toIsoDateTime(''), undefined);
  assert.equal(toIsoDateTime(undefined), undefined);
  assert.equal(toIsoDateTime('July 2026'), 'July 2026');
});

test('buildArticleJsonLd emits validated datetimes', () => {
  const ld = buildArticleJsonLd({
    title: 'T',
    description: 'D',
    path: '/projects/first-bite/blog/x',
    published: '2026-07-06',
    updated: '2026-08-11',
  });

  assert.equal(ld.datePublished, '2026-07-06T00:00:00+00:00');
  assert.equal(ld.dateModified, '2026-08-11T00:00:00+00:00');
  assert.equal(ld['@type'], 'BlogPosting');
  assert.equal(ld.url, 'https://nextechlabs.org/projects/first-bite/blog/x');
});

test('buildArticleJsonLd falls back to published when never updated', () => {
  const ld = buildArticleJsonLd({ title: 'T', description: 'D', path: '/x', published: '2026-07-06' });
  assert.equal(ld.dateModified, '2026-07-06T00:00:00+00:00');
});

test('absoluteUrl leaves absolute URLs untouched', () => {
  assert.equal(absoluteUrl('/blog'), 'https://nextechlabs.org/blog');
  assert.equal(absoluteUrl('https://example.com/x'), 'https://example.com/x');
});
