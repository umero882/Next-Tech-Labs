/**
 * The blog feed is a published contract, not an internal file.
 *
 * PyRunner reads it to decide what to post to Instagram and Facebook, and it
 * reads it over HTTP from a build that shipped days ago. So the things worth
 * testing are the ones that would let a bad post through silently: a date a
 * consumer cannot compare against "now", an image that isn't there being
 * reported as one that is, and posts arriving in an order that makes the
 * oldest-first pass publish the newest article.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildFeed, bodyOf, isoDate } from './generate-blog-feed.mjs';

const post = (over = {}) => ({
  slug: 'a-post',
  app: 'first-bite',
  topic: 'Allergen introduction',
  title: 'A Post',
  description: 'What it says.',
  keywords: ['one', 'two'],
  published: '2026-07-06',
  updated: '2026-08-11',
  takeaways: ['First point.', 'Second point.'],
  ...over,
});

test('dates are UTC-pinned, not bare days', () => {
  assert.equal(isoDate('2026-07-06'), '2026-07-06T00:00:00Z');
  const [item] = buildFeed([post()]).posts;
  // A bare "2026-07-06" is parsed as local midnight by some consumers and UTC
  // midnight by others, which decides whether today's post is due.
  assert.match(item.published_at, /Z$/);
  assert.equal(item.updated_at, '2026-08-11T00:00:00Z');
});

test('a post with no updated date says null rather than repeating published', () => {
  const [item] = buildFeed([post({ updated: undefined })]).posts;
  assert.equal(item.updated_at, null);
});

test('cover_image_url is null, never a stand-in image', () => {
  const [item] = buildFeed([post()]).posts;
  // The site's og:image is a single app icon. Handing that back would make
  // every Instagram post carry the same picture, and it is a PNG, which
  // Instagram's publishing endpoint refuses outright.
  assert.equal(item.cover_image_url, null);
});

test('posts come out oldest first', () => {
  const feed = buildFeed([
    post({ slug: 'newest', published: '2026-08-01' }),
    post({ slug: 'oldest', published: '2026-01-01' }),
    post({ slug: 'middle', published: '2026-04-01' }),
  ]);
  assert.deepEqual(
    feed.posts.map((p) => p.slug),
    ['oldest', 'middle', 'newest'],
  );
});

test('only first-bite posts are in the first-bite feed', () => {
  const feed = buildFeed([post(), post({ slug: 'other', app: 'password-manager' })]);
  assert.equal(feed.count, 1);
  assert.equal(feed.posts[0].slug, 'a-post');
});

test('every post carries an absolute URL a link field will accept', () => {
  const [item] = buildFeed([post()]).posts;
  assert.equal(
    item.url,
    'https://nextechlabs.org/projects/first-bite/blog/a-post',
  );
});

test('the body carries the takeaways, which is what a summariser needs', () => {
  const body = bodyOf(post());
  assert.match(body, /What it says\./);
  assert.match(body, /- First point\./);
  assert.match(body, /- Second point\./);
});

test('a post with no takeaways still has a body', () => {
  assert.equal(bodyOf(post({ takeaways: [] })), 'What it says.');
});

test('the feed names where it came from, so a consumer can build links', () => {
  const feed = buildFeed([post()]);
  assert.equal(feed.site, 'https://nextechlabs.org');
  assert.equal(feed.blog, 'https://nextechlabs.org/projects/first-bite/blog');
  assert.equal(feed.count, feed.posts.length);
});

test('the fields blog-to-social selects are all present', () => {
  const [item] = buildFeed([post()]).posts;
  for (const field of [
    'slug',
    'title',
    'description',
    'category',
    'audience',
    'tags',
    'published_at',
    'cover_image_url',
    'body_md',
  ]) {
    assert.ok(field in item, `feed is missing ${field}`);
  }
});
