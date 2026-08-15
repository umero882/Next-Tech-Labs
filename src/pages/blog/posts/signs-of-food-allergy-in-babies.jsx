import { Lead, H2, H3, P, UL, OL, Strong, Callout, A } from '@/components/blog/prose';
import { DownloadCta } from '@/components/blog/DownloadCta';

export const sections = [
  { id: 'emergency', label: 'The emergency signs, first' },
  { id: 'timing', label: 'Timing tells you a lot' },
  { id: 'mild', label: 'What a mild reaction looks like' },
  { id: 'not-allergy', label: 'Things that look like allergy but are not' },
  { id: 'what-to-do', label: 'What to do, in order' },
  { id: 'record', label: 'What to record while it happens' },
];

export const sources = [
  {
    label: 'American Academy of Allergy, Asthma & Immunology — Food allergy resources',
    href: 'https://www.aaaai.org/',
  },
  {
    label: 'NIAID — Food Allergy',
    href: 'https://www.niaid.nih.gov/diseases-conditions/food-allergy',
  },
  {
    label: 'American Academy of Pediatrics — Food Allergies in Children (HealthyChildren.org)',
    href: 'https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Food-Allergies-in-Children.aspx',
  },
];

export default function Post() {
  return (
    <>
      <Lead>
        Most parents introducing a new food are watching for something and are not entirely sure
        what. This is the short version: what an emergency looks like, what a mild reaction looks
        like, and what is almost certainly neither.
      </Lead>

      <Callout tone="danger" title="If any of these are happening right now, stop reading">
        <p>
          Difficulty breathing, wheeze or a persistent cough, swelling of the lips, tongue, or
          throat, repeated vomiting, widespread hives with distress, sudden pallor, limpness, or
          unresponsiveness — <Strong>call your local emergency number immediately</Strong>. Do not
          drive to the clinic. Do not wait to see whether it settles. If adrenaline has been
          prescribed for your child, use it as instructed and still call.
        </p>
      </Callout>

      <H2 id="emergency">The emergency signs, first</H2>
      <P>
        Anaphylaxis in infants is harder to spot than in adults, because a baby cannot tell you their
        throat feels tight and because floppiness reads as sleepiness. The pattern that matters is{' '}
        <Strong>two or more body systems reacting at once</Strong>, or any breathing or circulation
        involvement on its own.
      </P>
      <UL>
        <li><Strong>Breathing:</Strong> wheeze, stridor, persistent cough, a hoarse or changed cry</li>
        <li><Strong>Circulation:</Strong> pallor, blue tinge, floppiness, unresponsiveness</li>
        <li><Strong>Skin:</Strong> widespread hives, swelling of the lips, eyelids, or tongue</li>
        <li><Strong>Gut:</Strong> repeated vomiting, sudden severe distress</li>
      </UL>

      <H2 id="timing">Timing tells you a lot</H2>
      <P>
        Classic immediate food allergy — the IgE-mediated kind — starts fast.{' '}
        <Strong>Minutes, and nearly always within two hours.</Strong> That single fact rules a lot of
        things in and out.
      </P>
      <UL>
        <li>
          <Strong>Within 2 hours</Strong> — consistent with an immediate allergic reaction. This is
          the window to be watching in.
        </li>
        <li>
          <Strong>Later the same day</Strong> — more likely a digestive intolerance, a viral rash, or
          coincidence. Some non-IgE reactions do run slower, so it still deserves a mention to your
          pediatrician.
        </li>
        <li>
          <Strong>The next day</Strong> — very unlikely to be an immediate food allergy to yesterday&rsquo;s
          new food.
        </li>
      </UL>
      <P>
        This is exactly why guidance says to introduce one allergen at a time, in the morning, and to
        leave three to five days before the next.
      </P>

      <H2 id="mild">What a mild reaction looks like</H2>
      <P>Most first reactions are mild, and most look like one or two of these:</P>
      <UL>
        <li>A few hives or welts, particularly somewhere the food never touched</li>
        <li>Redness or swelling around the mouth or eyes</li>
        <li>A single vomit shortly after eating</li>
        <li>Sudden runny nose, sneezing, or itchy eyes with no other cold symptoms</li>
        <li>Unusual fussiness or scratching at the face and ears right after a new food</li>
      </UL>
      <P>
        Mild does not mean ignorable. A mild first reaction can be followed by a more significant
        second one, which is why the food stops until a clinician says otherwise.
      </P>

      <DownloadCta
        variant="strip"
        title="Log the reaction while it's in front of you"
      />

      <H2 id="not-allergy">Things that look like allergy but usually are not</H2>

      <H3>Redness exactly where the food sat</H3>
      <P>
        Tomato, citrus, strawberry, and other acidic foods commonly leave a red ring precisely where
        they touched the skin. It fades within an hour and there are no other symptoms. That is
        contact irritation, not allergy.
      </P>

      <H3>A nappy rash after a new food</H3>
      <P>
        Acidic foods change stool acidity and can irritate the skin at the other end. Uncomfortable,
        not allergic.
      </P>

      <H3>Gagging on a new texture</H3>
      <P>
        Loud, dramatic, red-faced gagging is a protective reflex, not a reaction, and not choking.
        Choking is quiet.
      </P>

      <H3>Eczema that flares generally</H3>
      <P>
        Eczema and food allergy travel together, but a general flare a day later is not the same as a
        reaction. Persistent eczema is worth its own conversation with your pediatrician — it changes
        the allergen-introduction plan.
      </P>

      <H2 id="what-to-do">What to do, in order</H2>
      <OL>
        <li>
          <Strong>If any emergency sign is present</Strong> — call emergency services. Everything else
          waits.
        </li>
        <li>
          <Strong>Otherwise, stop the food</Strong> and remove what is left within reach.
        </li>
        <li>
          <Strong>Note the time</Strong> the food was eaten and the time symptoms started.
        </li>
        <li>
          <Strong>Photograph any rash</Strong> — it will fade long before the appointment.
        </li>
        <li>
          <Strong>Stay with the baby</Strong> for a full two hours, watching for escalation.
        </li>
        <li>
          <Strong>Call your pediatrician</Strong> before that food is offered again. Do not re-challenge
          a suspected allergen at home without guidance.
        </li>
      </OL>

      <H2 id="record">What to record while it happens</H2>
      <P>
        An allergist&rsquo;s first questions are always the same, and they are always about details
        nobody remembers three weeks later. Capture these in the moment:
      </P>
      <UL>
        <li>The exact food and brand, plus the full ingredient list</li>
        <li>How much was actually eaten</li>
        <li>Time eaten, time symptoms started, time they resolved</li>
        <li>Every symptom, and which part of the body</li>
        <li>Anything given — antihistamine, adrenaline — and when</li>
        <li>Photos, in decent light</li>
      </UL>
      <P>
        Whether that lives in a notes app, a paper diary, or a{' '}
        <A href="/projects/first-bite">purpose-built log</A> matters less than that it exists before
        the appointment rather than during it.
      </P>
    </>
  );
}
