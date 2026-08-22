/**
 * Turns the scene chosen in scene.mjs into an image prompt.
 *
 * The division of labour matters. WHAT to photograph is decided by reading the
 * article (scene.mjs). This file only says HOW to photograph it, plus the
 * guard-rails — and the guard-rails are the reason this file is long.
 *
 *  - TEXT. Every image model writes gibberish on labels, jars and charts, and
 *    this subject is full of all three. Banned three ways, because saying it
 *    once does not take.
 *  - SAFETY, repeated from scene.mjs on purpose. The art director can be told
 *    not to choose a bowl of whole peanuts; the camera still has to be told not
 *    to draw one, because "a baby trying peanut butter" reaches for the nut
 *    every time. A cover that shows the hazard its own article warns about is
 *    worse than no cover: most people never read past the picture.
 *  - CHILDREN. This blog cannot avoid photographing infants, so the rule is not
 *    "no children" but "no identifiable child": faces turned, angled, or softly
 *    out of focus. Nobody's baby ends up as stock.
 *  - REALISM. Left unsaid, the model returns a spotless white studio kitchen
 *    with a laughing baby and no food in sight — which is nobody's kitchen and
 *    tells a parent nothing.
 */

import { SAFETY } from './scene.mjs';

const STYLE = [
  'Natural editorial photography, photojournalistic rather than posed stock.',
  'Soft daylight from a window, shallow depth of field, warm realistic colour.',
  'A real family kitchen or home: some clutter, worn wood, a tea towel, food that looks handled rather than styled.',
  // The model returns a square whatever ratio is asked for, and the encoder
  // crops to 3:2 afterwards — so the useful instruction is about where the
  // subject sits, not what shape to draw.
  'Compose for a wide crop: keep the subject and the action in the middle horizontal band, nothing important in the top or bottom fifth.',
  'The FOOD is the subject and must be fully visible and the largest thing in the frame. Shoot down onto the work surface, or across it at food level.',
  'Never frame a standing adult with the work happening below the bottom edge — a torso with the food cropped out is a failed photograph for this blog, whatever else is right about it.',
].join(' ');

const RULES = [
  'CRITICAL: the image contains NO text of any kind.',
  'No words, letters, numbers, signage, logos, watermarks, product labels, jar labels, packaging, handwriting, screens showing text, or charts with writing.',
  'If a label, chart, screen or paper appears in the scene, it is blank.',
  // The child, protected.
  'CRITICAL: no child is identifiable. An infant is seen from behind, over the shoulder, cropped at the chin, or thrown softly out of focus.',
  'A baby NEVER faces the camera. No front-on portrait of an infant, no sharp focus on an infant face, no eye contact with the lens. If the baby is the nearest thing to the camera, it is the back of the head.',
  'The same for adults: hands, forearms, torso, or a face turned away or cropped. Hands are the preferred subject.',
  'Hands doing the work are welcome as the main subject; a close crop on hands and food is often the better picture.',
  'No brand names, no packaging, no medical logos, no national flags.',
  'Not a studio. No seamless white background, no perfectly styled flat-lay, no laughing-baby stock cliché.',
].join(' ');

/**
 * @param {object} scene from chooseScene(): setting, people, action, props, framing
 * @param {object} post  the article, for one line of context
 */
export function coverPrompt(scene, post = {}) {
  return [
    'A photograph for the top of a magazine article about feeding babies.',
    `The article is about: ${post.title || ''}`,
    '',
    'THE PHOTOGRAPH:',
    `Setting: ${scene.setting}`,
    `People: ${scene.people || 'an adult, and at most one infant'}`,
    `Action: ${scene.action}`,
    scene.props ? `In frame: ${scene.props}` : '',
    scene.framing ? `Framing: ${scene.framing}` : '',
    '',
    STYLE,
    RULES,
    // Last, so it is the most recent thing in the context window.
    SAFETY,
  ]
    .filter(Boolean)
    .join('\n');
}

export const _internals = { STYLE, RULES };
