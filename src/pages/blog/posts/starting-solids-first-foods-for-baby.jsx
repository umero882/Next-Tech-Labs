import { Lead, H2, H3, P, UL, OL, Strong, Callout, A } from '@/components/blog/prose';
import { DownloadCta } from '@/components/blog/DownloadCta';

export const sections = [
  { id: 'ready', label: 'Is your baby actually ready?' },
  { id: 'week-one', label: 'Week one: one food, one meal' },
  { id: 'month-one', label: 'The first month, week by week' },
  { id: 'iron', label: 'Why iron comes first' },
  { id: 'never', label: 'What babies should never have' },
  { id: 'normal', label: "What's normal and what isn't" },
];

export const sources = [
  {
    label: 'American Academy of Pediatrics — Starting Solid Foods (HealthyChildren.org)',
    href: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx',
  },
  {
    label: 'NHS — Your baby’s first solid foods',
    href: 'https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/',
  },
  {
    label: 'World Health Organization — Infant and young child feeding',
    href: 'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',
  },
];

export default function Post() {
  return (
    <>
      <Lead>
        The first month of solids is mostly theatre. The baby is not being nourished by solids yet —
        milk is still doing that job. What is actually happening is practice: learning to move food
        backwards, to swallow something that is not liquid, and to meet a handful of the foods that
        matter most.
      </Lead>

      <H2 id="ready">Is your baby actually ready?</H2>
      <P>
        Around six months is the guidance. But readiness is behaviour, not a birthday. Look for all
        of these together:
      </P>
      <UL>
        <li>Steady head control, and able to sit upright with support</li>
        <li>Bringing objects to the mouth deliberately and accurately</li>
        <li>Real interest in what you are eating — watching, reaching, leaning in</li>
        <li>Losing the tongue-thrust reflex that pushes food straight back out</li>
      </UL>
      <P>
        Waking at night, chewing fists, and being a big baby are <em>not</em> readiness signs, though
        they are the three reasons most often given for starting early. If your baby was born
        premature, readiness is usually judged on corrected age — ask your pediatrician.
      </P>

      <H2 id="week-one">Week one: one food, one meal</H2>
      <P>
        Start with a single-ingredient, iron-rich food, once a day, at a time when the baby is alert
        but not ravenous — often about an hour after a milk feed.
      </P>
      <OL>
        <li>Offer one or two teaspoons. That is the whole meal.</li>
        <li>Let the baby set the pace; stop the moment they turn away or clamp shut.</li>
        <li>Repeat the same food for two or three days before switching.</li>
        <li>Keep milk feeds exactly as they were.</li>
      </OL>
      <Callout tone="note" title="Most of it will not be eaten">
        <p>
          In week one, a good outcome is that food went into the mouth and the baby was not upset. The
          quantity is irrelevant. Milk is still supplying essentially all of the nutrition.
        </p>
      </Callout>

      <H2 id="month-one">The first month, week by week</H2>

      <H3>Week 1 — one food, once a day</H3>
      <P>
        Iron-fortified infant cereal mixed thin, or a smooth vegetable puree, or finely pureed meat.
        Single ingredient, no salt, no sugar.
      </P>

      <H3>Week 2 — two foods, once a day</H3>
      <P>
        Add a second and third food, one at a time. This is a reasonable point to bring in the first
        allergens if solids are going smoothly — see the{' '}
        <A href="/projects/first-bite/blog/baby-allergen-introduction-schedule">Big 9 introduction schedule</A>.
      </P>

      <H3>Week 3 — twice a day</H3>
      <P>
        Move to two small meals. Start varying texture — slightly thicker purees, mashed rather than
        blended, or soft finger foods if you are leaning toward{' '}
        <A href="/projects/first-bite/blog/baby-led-weaning-vs-purees">baby-led weaning</A>.
      </P>

      <H3>Week 4 — combinations</H3>
      <P>
        Combine foods the baby has already met individually: sweet potato with lentils, oats with
        pear, chicken with squash. Offer a soft self-feeding item at most meals so hands get involved.
      </P>

      <DownloadCta variant="strip" title="One tracker for foods, allergens, and reactions" />

      <H2 id="iron">Why iron comes first</H2>
      <P>
        A full-term baby is born with an iron store that is largely spent by around six months, and
        breast milk is low in iron. That makes the first solids one of the few genuinely nutritional
        decisions of the month.
      </P>
      <UL>
        <li>Pureed or finely minced red meat, chicken, or liver</li>
        <li>Lentils, chickpeas, and beans, well cooked and mashed</li>
        <li>Iron-fortified infant cereal</li>
        <li>Tofu, and dark leafy greens</li>
      </UL>
      <P>
        Serving a source of vitamin C alongside — a little fruit puree, some tomato, a squeeze of
        citrus in the cooking — improves absorption of the iron in plant foods.
      </P>

      <H2 id="never">What babies should never have</H2>
      <Callout tone="danger" title="Before twelve months">
        <p>
          <Strong>No honey</Strong>, in any form, cooked or raw — infant botulism risk.{' '}
          <Strong>No cow&rsquo;s milk as a main drink</Strong> (as an ingredient in food it is fine).
          No unpasteurised dairy, no unpasteurised juice, no rice drinks.
        </p>
      </Callout>
      <UL>
        <li>
          <Strong>Choking hazards:</Strong> whole nuts, popcorn, whole grapes and cherry tomatoes
          (quarter them lengthways), raw carrot and apple chunks, hard sweets, marshmallows, chunks of
          nut butter.
        </li>
        <li>
          <Strong>Added salt and sugar:</Strong> infant kidneys handle salt poorly, and there is no
          reason to build a taste for sugar this early.
        </li>
        <li>
          <Strong>High-mercury fish:</Strong> swordfish, shark, king mackerel, and marlin.
        </li>
      </UL>

      <H2 id="normal">What&rsquo;s normal and what isn&rsquo;t</H2>
      <P>
        <Strong>Normal:</Strong> gagging with a lot of noise, pulling faces, refusing a food six times
        and eating it on the seventh, greener or stranger nappies, eating almost nothing for two days.
      </P>
      <P>
        <Strong>Worth a call to your pediatrician:</Strong> a rash that spreads beyond where the food
        touched, repeated vomiting after a specific food, blood in the stool, persistent refusal of
        all solids past seven or eight months, or no weight gain.
      </P>
      <Callout tone="danger" title="Emergency signs">
        <p>
          Silence is the warning sign for choking — no cough, no sound, panic in the face. And any
          trouble breathing, swelling of the lips or tongue, repeated vomiting, or a suddenly pale and
          floppy baby means <Strong>call your local emergency number immediately</Strong>. Details on
          telling a reaction from an irritation are in{' '}
          <A href="/projects/first-bite/blog/signs-of-food-allergy-in-babies">signs of a food allergy in babies</A>.
        </p>
      </Callout>
    </>
  );
}
