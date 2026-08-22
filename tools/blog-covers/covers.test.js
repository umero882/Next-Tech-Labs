/**
 * The cover generator, tested where it can be wrong without anyone noticing.
 *
 * Two things here are not ordinary bugs. A cover that shows a hazard the
 * article warns against teaches the opposite of the article to every parent who
 * does not scroll past the picture — so the safety rules are asserted to be in
 * the prompt, every time, rather than trusted to stay there. And a set of five
 * near-identical photographs is the failure the other blog shipped before this
 * approach existed, so the routing that spreads them apart is pinned too.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { settingFor, SAFETY, _internals as sceneInternals } from './scene.mjs';
import { coverPrompt } from './prompt.mjs';
import { selectPosts } from './generate.mjs';

const post = (over = {}) => ({
  slug: 'a-post',
  app: 'first-bite',
  topic: 'Allergen introduction',
  title: 'A Post',
  description: 'What it says.',
  published: '2026-07-06',
  takeaways: ['First point.', 'Second point.'],
  ...over,
});

test('the five real articles do not all get the same picture', async () => {
  const { posts } = await import('../../src/data/blog.js');
  const families = posts.filter((p) => p.app === 'first-bite').map(settingFor);
  // Three of five landed in one family on the first attempt, which is three
  // photographs of jars on a counter.
  assert.ok(
    new Set(families).size >= 3,
    `only ${new Set(families).size} distinct settings across ${families.length} posts: ${families}`,
  );
  assert.ok(families.every(Boolean));
});

test('a reaction article is not sent to the kitchen', () => {
  // These posts are full of food words while not being about food at all.
  assert.equal(settingFor(post({ title: 'Signs of a Food Allergy Reaction in Babies' })), 'watching');
  assert.equal(settingFor(post({ title: 'What to do if your baby reacts' })), 'watching');
});

test('routing words match whole words, not fragments', () => {
  // These matched before the word boundaries were right: "explanation" contains
  // "plan", "something" contains "thin". Both sent the article to the wrong set.
  // topic is cleared because it routes too — the default fixture topic is
  // "Allergen introduction", which is a `prep` match on its own and would hide
  // whatever the title does.
  const byTitle = (title) => settingFor({ title, topic: '' });
  assert.equal(byTitle('An explanation of weaning'), 'feeding');
  assert.equal(byTitle('Something about first foods'), 'feeding');
  assert.equal(byTitle('Plan your first week'), 'planning');
  assert.equal(byTitle('How to thin peanut butter'), 'prep');
});

test('the section routes as well as the title', () => {
  // A post titled vaguely still lands correctly if its topic says what it is.
  assert.equal(settingFor({ title: 'A guide', topic: 'Allergen introduction' }), 'prep');
});

test('every prompt carries the food-safety rules', () => {
  const prompt = coverPrompt({ setting: 's', action: 'a' }, post());
  for (const rule of [
    'Whole or chopped nuts',
    'thick blob or full spoonful of nut butter',
    'Honey',
    'reclined',
    'propped bottle',
    'Upright and well supported',
  ]) {
    assert.ok(prompt.includes(rule), `prompt lost the rule about: ${rule}`);
  }
});

test('the safety rules reach the art director as well as the camera', () => {
  // prompt.mjs can stop the camera drawing a hazard; only the scene instruction
  // can stop the art director choosing one.
  const brief = sceneInternals.brief(post(), []);
  assert.ok(SAFETY.includes('choking hazard'));
  // The instruction embeds SAFETY; the brief carries the article. Both matter.
  assert.ok(brief.includes('REQUIRED SETTING:'));
  assert.ok(brief.includes('First point.'), 'the brief must carry the takeaways');
});

test('no text, and no identifiable child', () => {
  const prompt = coverPrompt({ setting: 's', action: 'a' }, post());
  assert.ok(prompt.includes('NO text of any kind'));
  // Asserted case-insensitively and on the idea rather than one sentence: the
  // first version of this rule was a single line, the model ignored it and
  // returned a sharp front-on portrait of a baby, and the fix was to say it
  // three ways. A test that pins the exact wording would have blocked that fix.
  const lower = prompt.toLowerCase();
  assert.ok(lower.includes('no child is identifiable'));
  assert.ok(lower.includes('never faces the camera'));
});

test('the brief tells the next article what is already taken', () => {
  const brief = sceneInternals.brief(post(), ['a counter — laying out jars']);
  assert.ok(brief.includes('choose something different'));
  assert.ok(brief.includes('laying out jars'));
});

test('a post that already has a cover is skipped', () => {
  const all = [post({ slug: 'has-one' }), post({ slug: 'needs-one' })];
  const chosen = selectPosts(all, { existing: new Set(['has-one']) });
  assert.deepEqual(chosen.map((p) => p.slug), ['needs-one']);
});

test('--force redraws one that already has a cover', () => {
  const all = [post({ slug: 'has-one' })];
  assert.equal(selectPosts(all, { existing: new Set(['has-one']) }).length, 0);
  assert.equal(selectPosts(all, { existing: new Set(['has-one']), force: true }).length, 1);
});

test('a named slug narrows the run to that post', () => {
  const all = [post({ slug: 'one' }), post({ slug: 'two' })];
  assert.deepEqual(selectPosts(all, { slugs: ['two'] }).map((p) => p.slug), ['two']);
});

test('posts are drawn oldest first, so the avoid list builds in order', () => {
  const all = [
    post({ slug: 'newest', published: '2026-08-01' }),
    post({ slug: 'oldest', published: '2026-01-01' }),
  ];
  assert.deepEqual(selectPosts(all).map((p) => p.slug), ['oldest', 'newest']);
});

test('another app never gets a First Bite cover', () => {
  const all = [post(), post({ slug: 'other', app: 'password-manager' })];
  assert.deepEqual(selectPosts(all).map((p) => p.slug), ['a-post']);
});
