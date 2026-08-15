/**
 * Blog post metadata. Pure data — zero imports, so the sitemap script can
 * import this file directly in plain Node.
 *
 * The prose for each post lives in `pages/blog/posts/<slug>.jsx` and is wired
 * to this list by `slug` in `pages/BlogPostPage.jsx`. Metadata stays here
 * because the index page, the sitemap, and the JSON-LD builders all need it
 * without pulling a React tree.
 *
 * `faqs[].a` is plain text on purpose — it is emitted verbatim into FAQPage
 * structured data, which rejects markup.
 */
export const posts = [
  {
    slug: 'when-to-introduce-peanut-butter-to-baby',
    app: 'first-bite',
    topic: 'Allergen introduction',
    title: 'When to Introduce Peanut Butter to a Baby — Safely, Step by Step',
    headline: 'When to introduce peanut butter to a baby',
    description:
      'Guidelines now say early is safer than late. Here is when to start peanut, how much counts as a serving, and how to keep it in the diet so tolerance holds.',
    keywords: [
      'when to introduce peanut butter to baby',
      'peanut introduction 6 months',
      'baby peanut allergy prevention',
      'LEAP study peanut',
      'NIAID peanut guidelines',
    ],
    published: '2026-07-06',
    updated: '2026-08-11',
    readingMinutes: 8,
    takeaways: [
      'For most babies, peanut goes in at around 6 months — once solids are established, not before.',
      'Severe eczema or a known egg allergy changes the plan: get a pediatrician or allergist involved first.',
      'Thinned peanut butter or peanut puffs. Never whole nuts or a thick blob of peanut butter — both are choking hazards.',
      'Introduction is not the finish line. Peanut has to stay in the diet roughly weekly for tolerance to hold.',
    ],
    faqs: [
      {
        q: 'At what age can a baby have peanut butter?',
        a: 'Most babies can start peanut around 6 months of age, once they are eating other solid foods and can sit with support. Peanut butter must be thinned with water, breast milk, formula, or a puree the baby already tolerates — never given as a thick spoonful, and never as a whole or chopped nut.',
      },
      {
        q: 'How much peanut does a baby need to prevent an allergy?',
        a: 'The trial that shaped current guidance used roughly 2 grams of peanut protein spread across the week, which is about 2 teaspoons of peanut butter total. What matters more than the exact amount is the consistency: small servings a few times a week, kept up over months rather than a single tasting.',
      },
      {
        q: 'My baby has severe eczema. Should I still introduce peanut early?',
        a: 'Early introduction is generally still the goal, but severe eczema or a known egg allergy puts a baby in the higher-risk group, and current guidance is to talk to your pediatrician or an allergist first. They may recommend testing or a supervised first feed rather than starting at home.',
      },
      {
        q: 'What if my baby reacts to peanut?',
        a: 'Stop the food and contact your pediatrician. Mild reactions such as a few hives around the mouth usually appear within minutes to two hours. Any trouble breathing, swelling of the lips or tongue, repeated vomiting, or sudden floppiness is an emergency — call your local emergency number immediately.',
      },
    ],
    related: ['baby-allergen-introduction-schedule', 'signs-of-food-allergy-in-babies'],
  },

  {
    slug: 'baby-allergen-introduction-schedule',
    app: 'first-bite',
    topic: 'Allergen introduction',
    title: 'The Big 9 Allergen Introduction Schedule for Babies',
    headline: 'A Big 9 allergen introduction schedule that actually fits a real week',
    description:
      'A week-by-week order for introducing the nine major food allergens to your baby, how long to wait between them, and why maintenance matters more than the order.',
    keywords: [
      'baby allergen introduction schedule',
      'big 9 allergens babies',
      'order to introduce allergens to baby',
      'how long to wait between new foods baby',
      'allergen introduction chart',
    ],
    published: '2026-07-14',
    updated: '2026-08-11',
    readingMinutes: 9,
    takeaways: [
      'There is no medically required order. Start with the two that carry the most evidence — peanut and egg — then work through the rest.',
      'One new allergen at a time, with a 3-to-5 day watch window before the next one.',
      'Introduce in the morning, at home, when you are not rushing out the door.',
      'Nine allergens at one new food every few days is roughly a 6-to-8 week project, not a weekend.',
    ],
    faqs: [
      {
        q: 'What are the Big 9 allergens?',
        a: 'Milk, egg, peanut, tree nuts, soy, wheat, fish, shellfish, and sesame. Sesame was added as the ninth major allergen in the United States in 2023. Together these account for the large majority of childhood food allergies, which is why introduction plans are built around them.',
      },
      {
        q: 'How long should I wait between introducing new allergens?',
        a: 'Wait 3 to 5 days after a new allergen before introducing the next one. Non-allergen foods such as most fruits and vegetables do not need the same spacing. The waiting window exists so that if a reaction happens, you know which food caused it rather than having to guess between three.',
      },
      {
        q: 'Does the order I introduce allergens in matter?',
        a: 'Not medically. No guideline specifies a required order. Many families start with peanut and egg because those two have the strongest evidence behind early introduction, then move through dairy, wheat, soy, tree nuts, sesame, fish, and shellfish based on what the family already cooks.',
      },
      {
        q: 'Do I have to keep feeding an allergen after I introduce it?',
        a: 'Yes, and this is the step most trackers skip. Tolerance is maintained by ongoing exposure, so an allergen that goes in once and then disappears for two months has not really been established. Aim to keep each introduced allergen in the diet on roughly a weekly cadence.',
      },
    ],
    related: ['when-to-introduce-peanut-butter-to-baby', 'starting-solids-first-foods-for-baby'],
  },

  {
    slug: 'starting-solids-first-foods-for-baby',
    app: 'first-bite',
    topic: 'Starting solids',
    title: 'Starting Solids: What to Feed a 6-Month-Old in the First Month',
    headline: 'Starting solids: the first month, without the overwhelm',
    description:
      'Readiness signs, what to serve in weeks one to four, textures by age, and the foods to keep off the tray entirely. A calm plan for a baby\'s first month of solids.',
    keywords: [
      'baby first foods 6 months',
      'starting solids schedule',
      'signs baby is ready for solids',
      'what to feed a 6 month old',
      'first foods for baby',
    ],
    published: '2026-07-23',
    updated: '2026-08-12',
    readingMinutes: 8,
    takeaways: [
      'Around 6 months, and readiness is behaviour, not a birthday: steady head control, sitting with support, reaching for food.',
      'Milk stays the main source of nutrition through the first year. Solids are practice and exposure.',
      'Iron-rich foods first — meat, lentils, fortified cereal — because a baby\'s own iron stores are running low by 6 months.',
      'No honey before 12 months, no whole nuts, no cow\'s milk as a drink, no added salt or sugar.',
    ],
    faqs: [
      {
        q: 'When is a baby ready to start solids?',
        a: 'Around 6 months, when the baby can hold their head steady, sit upright with support, bring objects to their mouth, and shows real interest in food. Age alone is not the signal. Babies born early are usually assessed on corrected age, so check with your pediatrician.',
      },
      {
        q: 'What should a baby eat in the first week of solids?',
        a: 'One simple, iron-rich, single-ingredient food offered once a day is plenty. Iron-fortified cereal, pureed meat, lentils, or a soft vegetable all work. Volume in the first week is often a teaspoon or two, and most of the meal ends up on the bib. That is normal and expected.',
      },
      {
        q: 'Which foods should babies never have?',
        a: 'No honey before 12 months because of infant botulism risk. No whole nuts, popcorn, whole grapes, or raw hard vegetable chunks because of choking risk. No cow\'s milk as a main drink before 12 months, no added salt or sugar, and no unpasteurised dairy or juice.',
      },
      {
        q: 'How much should a 6-month-old eat?',
        a: 'Far less than parents expect. Start at one small meal a day and build toward two or three by 8 to 9 months. Breast milk or formula remains the primary nutrition through the first year, so let the baby set the pace and stop when they turn away.',
      },
    ],
    related: ['baby-allergen-introduction-schedule', 'baby-led-weaning-vs-purees'],
  },

  {
    slug: 'signs-of-food-allergy-in-babies',
    app: 'first-bite',
    topic: 'Reactions',
    title: 'Signs of a Food Allergy Reaction in Babies — and What to Do',
    headline: 'Signs of a food allergy reaction in babies',
    description:
      'How to tell a mild reaction from an emergency, the timing that separates allergy from intolerance, and the exact steps to take when a baby reacts to a new food.',
    keywords: [
      'signs of food allergy in babies',
      'baby allergic reaction symptoms',
      'infant anaphylaxis signs',
      'baby hives after eating',
      'food allergy vs intolerance baby',
    ],
    published: '2026-08-01',
    updated: '2026-08-12',
    readingMinutes: 7,
    takeaways: [
      'Most immediate allergic reactions start within minutes and almost always within two hours of eating.',
      'Breathing difficulty, swelling of the lips or tongue, repeated vomiting, pallor, or floppiness means emergency services now — not a phone call to the clinic.',
      'Hives around the mouth alone, right where a wet food touched the skin, is often contact irritation rather than a true allergy.',
      'Photograph and log the reaction while it is happening. Memory two weeks later is not evidence an allergist can use.',
    ],
    faqs: [
      {
        q: 'How quickly does a food allergy reaction appear in babies?',
        a: 'Immediate-type reactions usually begin within minutes and nearly always within two hours of eating the food. Symptoms that appear the next day are more often digestive intolerance, a viral rash, or an eczema flare than a classic IgE-mediated food allergy.',
      },
      {
        q: 'What are the emergency signs of anaphylaxis in an infant?',
        a: 'Difficulty breathing, wheeze, persistent cough, swelling of the lips, tongue, or throat, repeated vomiting, widespread hives with distress, sudden paleness, limpness, or unresponsiveness. Any one of these needs emergency services immediately — do not drive to the clinic and do not wait to see if it settles.',
      },
      {
        q: 'Is a rash around the mouth a food allergy?',
        a: 'Often not. Acidic and wet foods such as tomato, citrus, and strawberry commonly cause redness exactly where they touch the skin, which fades within an hour. A true allergic reaction more often includes hives away from the contact area, or symptoms in another system such as vomiting or breathing.',
      },
      {
        q: 'What should I do after a mild reaction?',
        a: 'Stop the food, note the exact time, the amount eaten, the symptoms, and how long they lasted, and photograph any rash. Contact your pediatrician before offering that food again. Do not re-challenge a suspected allergen at home without guidance from your clinician.',
      },
    ],
    related: ['when-to-introduce-peanut-butter-to-baby', 'baby-allergen-introduction-schedule'],
  },

  {
    slug: 'baby-led-weaning-vs-purees',
    app: 'first-bite',
    topic: 'Starting solids',
    title: 'Baby-Led Weaning vs Purées: What the Evidence Actually Says',
    headline: 'Baby-led weaning vs purées',
    description:
      'Choking risk, iron intake, allergen exposure, and mess. An evidence-based comparison of baby-led weaning and spoon-feeding — and why most families end up doing both.',
    keywords: [
      'baby led weaning vs purees',
      'is baby led weaning safe',
      'baby led weaning choking risk',
      'blw vs spoon feeding',
      'baby led weaning first foods',
    ],
    published: '2026-08-08',
    updated: '2026-08-12',
    readingMinutes: 7,
    takeaways: [
      'Controlled studies have not found baby-led weaning to raise choking risk when foods are prepared to safe shapes and sizes.',
      'Purées make iron intake easier to guarantee early on; finger foods build self-regulation and oral-motor skill.',
      'Allergen introduction works with either method. Allergens are about exposure and frequency, not texture.',
      'Gagging is loud, noisy, and normal. Choking is quiet. Learn the difference before the first meal.',
    ],
    faqs: [
      {
        q: 'Is baby-led weaning safe?',
        a: 'Controlled research has not shown a higher choking rate for baby-led weaning compared with spoon-feeding, provided food is prepared safely: soft enough to squash between finger and thumb, cut into long finger shapes rather than coins, with grapes and cherry tomatoes quartered lengthways.',
      },
      {
        q: 'Which is better for iron, baby-led weaning or purées?',
        a: 'Purées and fortified cereals make it easier to be sure a baby actually swallowed enough iron in the early weeks, which matters because natural iron stores run low around 6 months. Baby-led weaning can meet iron needs too, but it takes deliberate menu choices such as soft meat strips and lentil patties.',
      },
      {
        q: 'Can I mix baby-led weaning and spoon-feeding?',
        a: 'Yes, and most families do. A common pattern is a spoon-fed iron-rich food alongside one or two soft finger foods on the tray. There is no evidence that combining the two confuses a baby or slows their progress with either.',
      },
      {
        q: 'What is the difference between gagging and choking?',
        a: 'Gagging is loud — coughing, retching, watering eyes, sometimes a red face — and it is a protective reflex that pushes food forward. Choking is quiet: no sound, no effective cough, and a baby who may look panicked or turn blue. Silence is the warning sign to act on.',
      },
    ],
    related: ['starting-solids-first-foods-for-baby', 'baby-allergen-introduction-schedule'],
  },
];
