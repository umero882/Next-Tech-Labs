import { Lead, H2, P, UL, OL, Strong, Callout, A } from '@/components/blog/prose';
import { DownloadCta } from '@/components/blog/DownloadCta';

export const sections = [
  { id: 'why-early', label: 'Why the advice reversed' },
  { id: 'when', label: 'When to start peanut' },
  { id: 'higher-risk', label: 'When to call the doctor first' },
  { id: 'how', label: 'How to serve it safely' },
  { id: 'how-much', label: 'How much, how often' },
  { id: 'maintenance', label: 'The step everyone forgets' },
  { id: 'watching', label: 'What to watch for' },
];

export const sources = [
  {
    label: 'Du Toit et al., "Randomized Trial of Peanut Consumption in Infants at Risk for Peanut Allergy" (LEAP), New England Journal of Medicine, 2015',
    href: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1414850',
  },
  {
    label: 'The LEAP Study — Learning Early About Peanut Allergy',
    href: 'https://www.leapstudy.co.uk/',
  },
  {
    label: 'NIAID — Food Allergy (Addendum Guidelines for the Prevention of Peanut Allergy)',
    href: 'https://www.niaid.nih.gov/diseases-conditions/food-allergy',
  },
  {
    label: 'American Academy of Pediatrics — Starting Solid Foods (HealthyChildren.org)',
    href: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx',
  },
];

export default function Post() {
  return (
    <>
      <Lead>
        If you were a parent fifteen years ago, the advice was to keep peanut away from babies for as
        long as possible. That advice is gone. The current guidance says the opposite — for most
        babies, getting peanut in early and keeping it there is the thing that lowers the odds of a
        peanut allergy.
      </Lead>

      <H2 id="why-early">Why the advice reversed</H2>
      <P>
        In 2015 the LEAP trial followed 640 infants at high risk of peanut allergy — babies with
        severe eczema, egg allergy, or both. Half were given peanut regularly from between four and
        eleven months of age. Half avoided it entirely until they were five.
      </P>
      <P>
        The result was not a small edge. Among the children who avoided peanut, 17% were allergic by
        age five. Among the children who ate it regularly, 3% were. That is roughly an{' '}
        <Strong>80% relative reduction</Strong>, in the group with the most to lose.
      </P>
      <P>
        The EAT study a year later found the same direction of effect in the general infant
        population. By 2017 the US National Institute of Allergy and Infectious Diseases had
        published addendum guidelines built around early introduction, and the &ldquo;wait until
        three&rdquo; era was formally over.
      </P>

      <Callout tone="note" title="What this does not mean">
        <p>
          Early introduction lowers risk. It does not eliminate it, and it is not a treatment for a
          baby who is already allergic. If your baby has already reacted to peanut, none of this
          applies — that is a conversation with an allergist, not a blog post.
        </p>
      </Callout>

      <H2 id="when">When to start peanut</H2>
      <P>
        For most babies: <Strong>around 6 months</Strong>, once solids are already under way. Peanut
        is not a first food. The baby should first be able to sit with support, have steady head
        control, and have taken a few other foods without incident.
      </P>
      <P>
        The practical sequence most families use looks like this:
      </P>
      <OL>
        <li>Start solids around 6 months with a couple of simple, iron-rich single-ingredient foods.</li>
        <li>Once a handful of those have gone in uneventfully, introduce peanut.</li>
        <li>Wait 3&ndash;5 days before the next new allergen, watching for delayed reactions.</li>
        <li>Keep peanut in the rotation from then on — see the maintenance section below.</li>
      </OL>
      <P>
        Do the first serving in the <Strong>morning</Strong>, at home, on a day when you are not
        rushing anywhere, so that you have several clear hours of observation and a pediatrician&rsquo;s
        office that is open.
      </P>

      <H2 id="higher-risk">When to call the doctor first</H2>
      <P>
        Not every baby should start peanut at the kitchen table. Current guidance stratifies by risk,
        and two groups need a clinician involved before the first bite:
      </P>
      <UL>
        <li>
          <Strong>Severe or persistent eczema</Strong> — eczema that needs prescription treatment, or
          that keeps coming back despite it.
        </li>
        <li>
          <Strong>A known egg allergy</Strong> — an existing diagnosed egg allergy raises the
          likelihood of peanut allergy meaningfully.
        </li>
      </UL>
      <P>
        For those babies, a pediatrician or allergist may recommend testing first, a supervised feed
        in the office, or simply an earlier start with a specific plan. The recommendation in this
        group is usually still to introduce peanut — often between four and six months — just not
        unsupervised.
      </P>

      <DownloadCta
        variant="strip"
        title="Not sure which risk group your baby is in?"
      />

      <H2 id="how">How to serve it safely</H2>
      <Callout tone="danger" title="Never whole nuts. Never a thick spoonful.">
        <p>
          Whole and chopped peanuts are a choking hazard for children under four, full stop. A thick
          blob of peanut butter is also a hazard — it can stick to the roof of the mouth. Peanut has
          to be thinned or dissolved.
        </p>
      </Callout>
      <P>Four forms that work, in rough order of how easy they are:</P>
      <UL>
        <li>
          <Strong>Thinned peanut butter.</Strong> Two teaspoons of smooth peanut butter stirred into
          two to three tablespoons of hot water, then cooled. Or thinned with breast milk, formula, or
          a puree the baby already eats.
        </li>
        <li>
          <Strong>Peanut puffs.</Strong> Melt-in-the-mouth peanut snacks designed for infants —
          simple, portioned, and they double as self-feeding practice.
        </li>
        <li>
          <Strong>Peanut flour or powder</Strong> stirred into oatmeal, yoghurt, or a vegetable puree.
        </li>
        <li>
          <Strong>Smooth peanut butter spread thinly</Strong> on a soft finger of toast, for a baby
          who is already handling finger foods well.
        </li>
      </UL>
      <P>
        Use plain, unsweetened peanut butter with no added honey — honey is off the menu entirely
        before twelve months.
      </P>

      <H2 id="how-much">How much, how often</H2>
      <P>
        LEAP used roughly <Strong>2 grams of peanut protein spread across the week</Strong>, which is
        about two level teaspoons of peanut butter in total, given across three or so servings. That
        is the target most guidance now echoes.
      </P>
      <P>
        The first serving is smaller than that on purpose. Offer a small taste — around a
        quarter-teaspoon of the thinned mixture — wait ten to fifteen minutes, and if all is well,
        continue with the rest of the serving.
      </P>
      <P>
        What matters more than hitting a gram target exactly is the <Strong>rhythm</Strong>: small
        amounts, a few times a week, sustained over months.
      </P>

      <H2 id="maintenance">The step everyone forgets</H2>
      <P>
        Introduction is not the finish line. Tolerance is maintained by continued exposure. A baby
        who has peanut once at seven months and then never sees it again until their first birthday
        has not been protected in the way the trials describe — LEAP kept peanut in the diet
        continuously until age five.
      </P>
      <P>
        In practice this means keeping every introduced allergen on a roughly weekly cadence. That is
        easy for the first two weeks and surprisingly hard by month four, when there are eight other
        allergens in rotation, two caregivers, and no shared record of who fed what.
      </P>

      <H2 id="watching">What to watch for</H2>
      <P>
        Most immediate reactions begin within minutes and almost always within two hours. Stay with
        the baby and watch for:
      </P>
      <UL>
        <li>Hives or welts, particularly away from where the food touched the skin</li>
        <li>Swelling of the lips, eyelids, or face</li>
        <li>Repeated vomiting</li>
        <li>Coughing, wheeze, noisy breathing, or a change in the voice or cry</li>
        <li>Sudden pallor, floppiness, or unresponsiveness</li>
      </UL>
      <Callout tone="danger" title="This is an emergency">
        <p>
          Breathing difficulty, swelling of the lips or tongue, repeated vomiting, or a suddenly pale
          and floppy baby means <Strong>call your local emergency number now</Strong>. Do not drive to
          the clinic, and do not wait to see whether it settles.
        </p>
      </Callout>
      <P>
        Mild redness right around the mouth, exactly where a wet food sat on the skin, and gone within
        the hour, is usually contact irritation rather than an allergy. If you are not sure, stop the
        food and ask your pediatrician before offering it again. More detail on telling those apart is
        in{' '}
        <A href="/projects/first-bite/blog/signs-of-food-allergy-in-babies">
          signs of a food allergy reaction in babies
        </A>
        .
      </P>
    </>
  );
}
