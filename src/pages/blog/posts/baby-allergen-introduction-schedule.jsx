import { Lead, H2, H3, P, UL, OL, Strong, Callout, A } from '@/components/blog/prose';
import { DownloadCta } from '@/components/blog/DownloadCta';

export const sections = [
  { id: 'big-9', label: 'What the Big 9 are' },
  { id: 'rules', label: 'The three rules' },
  { id: 'schedule', label: 'A week-by-week schedule' },
  { id: 'forms', label: 'Safe forms for each allergen' },
  { id: 'maintenance', label: 'Maintenance beats order' },
  { id: 'slips', label: 'Where schedules fall apart' },
];

export const sources = [
  {
    label: 'NIAID — Food Allergy (Addendum Guidelines for the Prevention of Peanut Allergy)',
    href: 'https://www.niaid.nih.gov/diseases-conditions/food-allergy',
  },
  {
    label: 'Perkin et al., "Randomized Trial of Introduction of Allergenic Foods in Breast-Fed Infants" (EAT), New England Journal of Medicine, 2016',
    href: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1514210',
  },
  {
    label: 'American Academy of Pediatrics — Starting Solid Foods (HealthyChildren.org)',
    href: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx',
  },
  {
    label: 'American Academy of Allergy, Asthma & Immunology',
    href: 'https://www.aaaai.org/',
  },
];

export default function Post() {
  return (
    <>
      <Lead>
        Nine allergens, one at a time, with a waiting window between each. On paper that is a tidy
        chart. In a real week — with a nap schedule, a nursery drop-off, and two adults who both
        think the other one did the egg — it is a logistics problem. Here is a schedule built for the
        second version.
      </Lead>

      <H2 id="big-9">What the Big 9 actually are</H2>
      <P>
        In the United States, nine foods are designated major allergens: <Strong>milk, egg, peanut,
        tree nuts, soy, wheat, fish, shellfish, and sesame</Strong>. Sesame joined the list in 2023.
        Between them they account for the large majority of childhood food allergy, which is why
        introduction plans are built around them rather than around foods in general.
      </P>
      <P>
        Everything else — most fruit, most vegetables, grains other than wheat, meat — does not need
        the same ceremony. Introduce those freely, and save the spacing for the nine.
      </P>

      <H2 id="rules">The three rules that matter</H2>
      <OL>
        <li>
          <Strong>One new allergen at a time.</Strong> If two go in together and something happens,
          you have lost the information you were trying to collect.
        </li>
        <li>
          <Strong>Wait 3&ndash;5 days before the next one.</Strong> Long enough to catch a delayed
          reaction, short enough that nine allergens do not take until the first birthday.
        </li>
        <li>
          <Strong>Morning, at home, unhurried.</Strong> You want daylight hours of observation and an
          open pediatrician&rsquo;s office behind you.
        </li>
      </OL>
      <Callout tone="note" title="There is no medically required order">
        <p>
          No guideline specifies a sequence. The order below leads with peanut and egg because those
          two carry the strongest early-introduction evidence, then follows with whatever a typical
          kitchen already cooks. Reorder it to fit your food, not the other way round.
        </p>
      </Callout>

      <H2 id="schedule">A week-by-week schedule</H2>
      <P>
        This assumes solids started around six months and a few simple foods have already gone in
        without incident. Two allergens per week, spaced three to four days apart, puts all nine in
        by roughly week five — then the work becomes maintenance.
      </P>

      <H3>Weeks 1&ndash;2 — the evidence-heavy pair</H3>
      <UL>
        <li>
          <Strong>Peanut</Strong> — thinned peanut butter, peanut puffs, or peanut flour stirred into
          a familiar puree. Never whole nuts.{' '}
          <A href="/blog/when-to-introduce-peanut-butter-to-baby">Full peanut walkthrough here.</A>
        </li>
        <li>
          <Strong>Egg</Strong> — thoroughly cooked. Scrambled, hard-boiled and mashed, or baked into
          a soft strip. No runny yolk, no raw batter.
        </li>
      </UL>

      <H3>Week 3 — the everyday two</H3>
      <UL>
        <li>
          <Strong>Dairy</Strong> — full-fat plain yoghurt or a little cheese. Cow&rsquo;s milk as a
          <em> drink</em> still waits until twelve months; dairy as a food does not.
        </li>
        <li>
          <Strong>Wheat</Strong> — iron-fortified wheat cereal, a soft strip of toast, or well-cooked
          pasta.
        </li>
      </UL>

      <H3>Week 4 — pantry staples</H3>
      <UL>
        <li>
          <Strong>Soy</Strong> — soft tofu, or plain soy yoghurt.
        </li>
        <li>
          <Strong>Sesame</Strong> — tahini thinned into a puree, or hummus. Never a thick spoonful of
          tahini on its own.
        </li>
      </UL>

      <H3>Week 5 — nuts and seafood</H3>
      <UL>
        <li>
          <Strong>Tree nuts</Strong> — smooth almond or cashew butter, thinned. Introduce one nut at
          a time; tolerating almond says nothing about cashew.
        </li>
        <li>
          <Strong>Fish</Strong> — well-cooked, flaked, and checked for bones. Salmon and cod are
          usual starting points; skip high-mercury fish such as swordfish and king mackerel.
        </li>
        <li>
          <Strong>Shellfish</Strong> — well-cooked and finely chopped or blended. Often introduced
          last, simply because it is least likely to be in the fridge.
        </li>
      </UL>

      <DownloadCta variant="strip" title="Nine allergens, nine waiting windows, two caregivers" />

      <H2 id="forms">Safe forms, briefly</H2>
      <P>
        Every allergen on this list has a form that is a choking hazard and a form that is not. The
        rule of thumb: nothing hard, nothing round, nothing sticky enough to cling to the palate.
      </P>
      <UL>
        <li>Nut butters get thinned. Whole and chopped nuts wait until four years old.</li>
        <li>Egg is cooked through — no runny yolk, no raw cake batter.</li>
        <li>Fish is flaked and bone-checked. Shellfish is finely chopped.</li>
        <li>Cheese goes in as soft shreds or melted, not as cubes.</li>
      </UL>

      <H2 id="maintenance">Maintenance beats order</H2>
      <P>
        The order you pick is close to irrelevant. What is <em>not</em> irrelevant is what happens
        after the introduction: tolerance is maintained by ongoing exposure, so each allergen needs
        to stay in the diet on roughly a <Strong>weekly cadence</Strong>.
      </P>
      <P>
        That is the part that quietly fails. Peanut goes in during week one, everyone celebrates,
        and by week six nobody can remember whether the baby has had it since. Nine allergens on a
        weekly rotation is thirty-six touchpoints a month across every adult who feeds the child.
      </P>
      <Callout tone="warn" title="A lapse is not a failure">
        <p>
          If an allergen has slipped out of the rotation for a few weeks and the baby has previously
          tolerated it well, the usual advice is simply to resume it. If it has been a long gap, or
          there was ever a reaction, ask your pediatrician before restarting rather than guessing.
        </p>
      </Callout>

      <H2 id="slips">Where schedules fall apart</H2>
      <UL>
        <li>
          <Strong>Hidden derivatives.</Strong> Casein is dairy. Semolina is wheat. Lecithin is
          usually soy. A label that never says &ldquo;milk&rdquo; can still be a dairy exposure.
        </li>
        <li>
          <Strong>Two caregivers, one memory.</Strong> Nursery fed the baby a biscuit; nobody logged
          it; the waiting window is now meaningless.
        </li>
        <li>
          <Strong>Illness and teething.</Strong> Both muddy the picture. If a baby is unwell, pause
          new allergens and resume when they are back to themselves.
        </li>
        <li>
          <Strong>The appointment.</Strong> Six months later the allergist asks what happened and
          when — and it is all in somebody&rsquo;s head.
        </li>
      </UL>
      <P>
        None of these are knowledge problems. They are record-keeping problems, which is exactly the
        kind of thing worth handing to something that does not forget.
      </P>
    </>
  );
}
