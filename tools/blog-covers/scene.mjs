/**
 * Decides WHAT to photograph, by reading the article.
 *
 * Handed a headline and a pile of style rules, an image model returns the same
 * picture every time — for this blog, a smiling baby in a high chair, five
 * times over. So the article is read first: a text model gets the title, the
 * summary and the article's own takeaways, and returns a concrete scene. The
 * piece about spotting a reaction gets a parent looking closely at a cheek; the
 * piece about the introduction schedule gets a week's small jars laid out.
 *
 * It is also told what the other covers already show, and to pick something
 * different. Variety cannot be a style instruction — it has to be a fact about
 * the set.
 *
 * The safety rules live here as well as in prompt.mjs, and that is deliberate.
 * prompt.mjs can stop the camera photographing a hazard; only this can stop the
 * art director choosing one. Asked for "a baby trying peanuts", a model will
 * happily compose a bowl of whole peanuts — the exact thing the article it
 * illustrates calls a choking hazard.
 */

const SCENE_MODEL = process.env.SCENE_MODEL || 'google/gemini-2.5-flash';

/**
 * Infant-feeding safety, written as scene constraints.
 *
 * These are not style preferences. This blog exists to tell parents how to feed
 * a baby without hurting them, and a cover showing the practice the article
 * warns against teaches the opposite of the article to everyone who does not
 * read past the picture. Every rule below is the negative of a sentence that
 * appears in these posts.
 */
export const SAFETY = `
FOOD SAFETY — these are hard constraints, not preferences. This blog tells
parents how to feed an infant safely; a photograph showing an unsafe practice
contradicts the article it sits above, and is read by people who never scroll
further than the picture.

NEVER in frame, in any scene:
- Whole or chopped nuts, whole grapes, popcorn, cherry tomatoes, or any firm
  round food. Every one is a choking hazard for an infant and several of these
  articles say so explicitly.
- RAW HARD VEGETABLE OR FRUIT IN ANY SHAPE. Not chunks, not coins, not sticks,
  not batons, not crudites — raw carrot especially, in any form at all. A model
  told "no raw carrot chunks" will put raw carrot batons on the plate and
  consider the instruction met; it is the same hazard in a different shape.
  NO CARROT AT ALL, in any preparation. Steamed carrot batons are perfectly good
  baby food, but a photograph cannot show "steamed" — three drafts in a row came
  back with carrot sticks that could equally be raw, and a reader cannot tell
  either. On this subject an unverifiable food is a wrong food.
  Use food that is self-evidently soft instead: avocado, ripe banana, roasted
  sweet potato, cooked pear, soft-cooked courgette, flaked fish. If a viewer
  cannot see that it squashes, do not put it in the frame.
- A thick blob or full spoonful of nut butter. It is given thinned and spread
  thinly; the thick version is the hazard the peanut article warns about.
- Honey, in any form, anywhere near an infant. Botulism risk under one year.
- A baby reclined, lying down, in a car seat or on a sofa while eating.
- A propped bottle, or a bottle left with a baby who has no adult with them.
- A baby alone with food. An attentive adult is present in every feeding scene.

ALWAYS, when a baby is eating:
- Upright and well supported in a high chair, able to sit steadily.
- Soft food: purée, thinned nut butter, a soft strip a baby can hold, flakes
  that dissolve. Nothing that keeps its shape under a gum.
- An adult within arm's reach, watching the baby rather than a phone.

The baby is around six to twelve months — sitting up, some hair, not a newborn
and not a toddler running about.`;

const INSTRUCTION = `You are an art director choosing ONE photograph for a blog article about feeding babies.

Read the article. Decide the single most literal, concrete scene that shows what it is actually about. Not a metaphor, not a mood — the thing itself.

The SETTING FAMILY is decided for you and given below as REQUIRED SETTING. It tells you which world the photograph lives in; you choose the specific place inside it and what happens there. Repeating the required setting back is not an answer. Do not move the scene to another kind of room.

Then the ACTION, and this is where a set like this fails. Five articles about feeding babies produce five identical pictures — a smiling baby in a high chair — unless each is directed against the others. So:

- The action must be PHYSICAL and specific: spreading, thinning, mashing, spooning, labelling, laying out, checking a wrist, lifting into a chair, wiping, holding a strip of food, writing on a calendar.
- BANNED: a baby simply sitting and smiling at the camera. A parent simply holding a baby and looking happy. Any picture whose only content is "a cute baby".
- Your action must use a different verb from every scene listed below, in a different place, at a different camera distance. Two articles that share a setting must not share a task.
- AT MOST ONE cover in the whole blog may show a phone, tablet or screen. If any scene listed below already has one, you may not use a screen at all.

${SAFETY}

Answer with JSON only, no prose, no code fence:
{
  "setting": "ONE named place and what makes it that place — 'a kitchen counter beside a sunny window with a chopping board and small bowls'. Never a restatement of the required setting.",
  "people": "who is in frame, their appearance, one sentence. Adults and one baby at most.",
  "action": "what they are physically doing at this instant, one sentence",
  "props": "the objects that make the scene readable, comma separated — every one of them safe for an infant",
  "framing": "camera distance and angle, one short phrase"
}`;

/**
 * Which world this article belongs in.
 *
 * Decided in code rather than by the model, for the same reason the other blog
 * does it: asked to weigh subject against variety, a model drops one of them.
 * Order matters — a reaction article mentions foods, so reactions are tested
 * first or every post becomes a kitchen.
 */
export function settingFor(post) {
  // The title and section only. Including the description pulled three of five
  // posts into 'planning', because every summary on this blog mentions timing
  // somewhere — and three planning covers is three photographs of jars on a
  // counter, which is the failure this whole file exists to avoid.
  const text = `${post.title || ''} ${post.topic || ''}`.toLowerCase();

  // Reactions first: these articles are full of food words but are not about food.
  if (/sign|symptom|reaction|rash|hives|emergency|what to do/.test(text)) return 'watching';

  // Then the ones that are literally about an order of events.
  if (/schedule|chart|timeline|routine|order\b|\bplan\b/.test(text)) return 'planning';

  // Then the act of getting one specific food ready for the first time.
  if (/introduc|prepar|how to make|first taste|\bthin/.test(text)) return 'prep';

  // What is left is the baby eating.
  return 'feeding';
}

const SETTINGS = {
  watching:
    'a parent close to their baby, paying attention to the baby rather than to food — a living room, a bathroom changing area, a paediatric clinic waiting room. Food may be finished or absent. The subject is the parent noticing something.',
  planning:
    'a kitchen counter or small dining table used as a work surface — jars, a written weekly chart, labelled containers, ingredients laid out in order. An adult is the subject. A baby may be absent entirely.',
  prep:
    'a pair of adult hands at a kitchen counter getting one specific food ready for a baby — thinning, mashing, spreading, stirring into a purée. Close in on the hands and the bowl. No highchair, no baby in frame.',
  feeding:
    'a highchair at a kitchen or dining table with a baby eating and an adult beside them, or a kitchen counter where that food is being prepared moments before. The food and the hands are the subject.',
};

/** The article, trimmed to what an art director actually needs. */
function brief(post, avoid) {
  const takeaways = (post.takeaways || []).map((t) => `- ${t}`).join('\n');
  const taken = avoid.length
    ? `\n\nScenes already used on this blog — choose something different:\n${avoid.map((s) => `- ${s}`).join('\n')}`
    : '';

  return `REQUIRED SETTING: ${SETTINGS[settingFor(post)]}

TITLE: ${post.title}
SUMMARY: ${post.description}
SECTION: ${post.topic || ''}

WHAT THE ARTICLE ACTUALLY SAYS:
${takeaways || '(no takeaways recorded)'}${taken}`;
}

function parse(text) {
  const raw = String(text || '')
    .replace(/^```(?:json)?|```$/gm, '')
    .trim();
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error('no JSON in the reply');
  const scene = JSON.parse(raw.slice(start, end + 1));
  if (!scene.setting || !scene.action) throw new Error('scene is missing setting or action');
  return scene;
}

/**
 * @param {object} post    slug, title, description, topic, takeaways
 * @param {string[]} avoid one-liners describing scenes already used
 * @param {string} key     OpenRouter key
 */
export async function chooseScene(post, avoid, key, fetchImpl = fetch) {
  const res = await fetchImpl('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      'http-referer': 'https://nextechlabs.org',
      'x-title': 'First Bite blog covers',
    },
    body: JSON.stringify({
      model: SCENE_MODEL,
      messages: [
        { role: 'system', content: INSTRUCTION },
        { role: 'user', content: brief(post, avoid) },
      ],
    }),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(`scene: ${res.status} ${body?.error?.message || ''}`.trim());
  return parse(body.choices?.[0]?.message?.content);
}

/** One line, for telling the next article what is already taken. */
export function summarise(scene) {
  return `${scene.setting} — ${scene.action}`;
}

export const _internals = { brief, parse, SETTINGS };
