import { Lead, H2, H3, P, UL, Strong, Callout, A } from '@/components/blog/prose';
import { DownloadCta } from '@/components/blog/DownloadCta';

export const sections = [
  { id: 'definitions', label: 'What each one actually means' },
  { id: 'choking', label: 'The choking question' },
  { id: 'iron', label: 'The iron question' },
  { id: 'allergens', label: 'Allergens work either way' },
  { id: 'combined', label: 'The combined approach' },
  { id: 'safety', label: 'Non-negotiable safety rules' },
];

export const sources = [
  {
    label: 'Fangupo et al., "A Baby-Led Approach to Eating Solids and Risk of Choking" (BLISS), Pediatrics, 2016',
    href: 'https://publications.aap.org/pediatrics/article/138/4/e20160772/52418',
  },
  {
    label: 'American Academy of Pediatrics — Starting Solid Foods (HealthyChildren.org)',
    href: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx',
  },
  {
    label: 'NHS — Your baby’s first solid foods',
    href: 'https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/',
  },
];

export default function Post() {
  return (
    <>
      <Lead>
        The internet presents this as an identity choice. It is not. It is a texture decision with a
        couple of genuine trade-offs, and the evidence on the two questions parents actually care
        about — choking and iron — is more reassuring and more boring than the arguments suggest.
      </Lead>

      <H2 id="definitions">What each one actually means</H2>
      <P>
        <Strong>Baby-led weaning (BLW)</Strong> skips purees. From the start of solids the baby is
        offered soft, graspable pieces of family food and feeds themselves. No spoon, no stages.
      </P>
      <P>
        <Strong>Spoon-feeding</Strong> starts with smooth purees and moves through mash and lumps to
        finger foods over several months, with an adult holding the spoon at the beginning.
      </P>
      <P>
        Both are recognised as acceptable. Neither is a medical requirement.
      </P>

      <H2 id="choking">The choking question</H2>
      <P>
        This is the objection that stops most families, and it is worth taking seriously — then
        looking at what was measured. The BLISS trial, a randomised study in New Zealand, compared a
        baby-led approach with conventional spoon-feeding and did{' '}
        <Strong>not find a higher rate of choking</Strong> in the baby-led group, provided the
        approach included explicit guidance on safe food forms.
      </P>
      <P>
        The caveat inside that finding is the whole ballgame: <em>provided the food is prepared
        safely</em>. Unsupervised BLW with badly cut food is not what was studied.
      </P>
      <Callout tone="warn" title="Gagging is not choking">
        <p>
          Gagging is loud — coughing, retching, watering eyes, a red face — and it is the reflex doing
          its job, pushing food forward. It happens more visibly in BLW simply because the baby meets
          texture sooner. <Strong>Choking is quiet:</Strong> no sound, no effective cough, possibly a
          blue tinge. Learn the difference, and take an infant first-aid course, before the first
          meal.
        </p>
      </Callout>

      <H2 id="iron">The iron question</H2>
      <P>
        This is the more substantive trade-off. A baby&rsquo;s own iron stores run low around six
        months, and studies of baby-led weaning have raised questions about whether self-fed babies
        reliably take in enough iron early on — because a baby gumming a strip of beef swallows less
        of it than a baby who is spoon-fed pureed beef.
      </P>
      <P>
        This is solvable rather than disqualifying. If you go baby-led, be deliberate:
      </P>
      <UL>
        <li>Offer an iron-rich food at <em>every</em> meal, not most of them</li>
        <li>Soft meat strips, lentil or bean patties, tofu fingers, iron-fortified cereal on a loaded spoon</li>
        <li>Pair with vitamin C — fruit, tomato, peppers — to improve plant-iron absorption</li>
      </UL>

      <H2 id="allergens">Allergens work either way</H2>
      <P>
        Allergen introduction is about <Strong>exposure and frequency, not texture</Strong>. Thinned
        peanut butter on a loaded spoon and peanut puffs held in a fist deliver the same protein.
      </P>
      <P>
        What does not change with method: one new allergen at a time, three to five days between
        them, mornings at home. The{' '}
        <A href="/projects/first-bite/blog/baby-allergen-introduction-schedule">Big 9 introduction schedule</A> applies
        identically to both, and the{' '}
        <A href="/projects/first-bite/blog/when-to-introduce-peanut-butter-to-baby">peanut walkthrough</A> lists safe
        forms for spoon and hand.
      </P>

      <DownloadCta variant="strip" title="Same allergen plan, either feeding style" />

      <H2 id="combined">The combined approach most families land on</H2>
      <P>
        Purists on both sides will dislike this, but the common real-world pattern is a mix, and
        there is no evidence it confuses a baby or slows either skill.
      </P>
      <UL>
        <li>One spoon-fed iron-rich element per meal — cereal, pureed meat, lentils</li>
        <li>One or two soft finger foods on the tray alongside it, from day one</li>
        <li>Let the baby take the loaded spoon whenever they reach for it</li>
        <li>Shift the ratio toward self-feeding as the pincer grip arrives around eight or nine months</li>
      </UL>

      <H3>Where each one genuinely wins</H3>
      <P>
        <Strong>Baby-led:</Strong> earlier oral-motor practice, self-regulation of appetite, one meal
        cooked for the whole family, and much less separate food preparation.
      </P>
      <P>
        <Strong>Spoon-fed:</Strong> certainty about how much was eaten — which matters for iron, for
        premature babies, and for anyone whose pediatrician is watching weight gain.
      </P>

      <H2 id="safety">Non-negotiable safety rules</H2>
      <UL>
        <li><Strong>Always upright, always supervised.</Strong> Never in a car seat, never reclined, never in a moving vehicle.</li>
        <li><Strong>Squash test.</Strong> Food must flatten between your finger and thumb with light pressure.</li>
        <li><Strong>Finger shapes, not coins.</Strong> Round slices are the worst possible shape for an airway. Quarter grapes and cherry tomatoes lengthways.</li>
        <li><Strong>Nothing hard or crunchy.</Strong> No raw carrot or apple chunks, no whole nuts, no popcorn.</li>
        <li><Strong>One eater at a time.</Strong> Do not let an older sibling hand over their food.</li>
      </UL>
      <P>
        Whichever method you pick, the first month is described in more detail in{' '}
        <A href="/projects/first-bite/blog/starting-solids-first-foods-for-baby">starting solids: the first month</A>.
      </P>
    </>
  );
}
