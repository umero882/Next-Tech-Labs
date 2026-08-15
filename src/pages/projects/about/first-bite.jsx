import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Stethoscope } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useSeo } from '@/hooks/useSeo';
import { fadeUp, stagger } from '@/lib/motion';

const principles = [
  {
    icon: Stethoscope,
    title: 'Follow the evidence, name the source',
    body: 'The protocols come from the LEAP and EAT trials and the 2017 NIAID addendum guidelines, and the app says so where it matters. Where the evidence is thin or a baby is higher risk, it routes to "ask your pediatrician" instead of inventing confidence it does not have.',
  },
  {
    icon: ShieldCheck,
    title: 'Refuse to guess',
    body: 'The scanner reads labels, menus and recipes, and when it cannot confirm something it says so rather than returning a comfortable "safe". A false negative on an allergen is not a rounding error, so uncertainty is surfaced, never smoothed over.',
  },
  {
    icon: Users,
    title: 'Feeding a baby is a team sport',
    body: 'Co-parents, grandparents, nannies and daycare all feed the same child, and the record only helps if it is the same record. Everyone invited sees the same log in real time, at the permission level you chose for them.',
  },
];

export default function FirstBiteAboutPage({ project }) {
  useSeo({
    title: 'About First Bite — why we built it | Next Tech Labs',
    description:
      'First Bite exists because allergy-prevention guidance changed in 2015 and most parents never heard. How the app approaches evidence, uncertainty, and the people who feed the baby.',
    path: '/projects/first-bite/about',
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 85% 100%, rgba(127,77,243,0.14) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-16 md:pt-24 pb-14">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Badge variant="muted">Next Tech Labs · First Bite</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05]"
            >
              The guidance changed. Most parents never heard.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary text-xl leading-snug"
            >
              For decades the advice was to delay peanuts, eggs and milk. The
              trials that overturned it landed in 2015 and 2016 — and the
              waiting-room advice took years to catch up, when it caught up at
              all. First Bite exists to close that gap for one family at a time.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-20 max-w-3xl">
        <SectionLabel number="01" label="WHY IT EXISTS" />
        <div className="mt-5 space-y-5 text-text-secondary text-lg leading-relaxed">
          <p>
            The LEAP trial found that introducing peanut early to infants at
            higher risk cut peanut allergy dramatically compared with avoiding
            it. The EAT study pushed on the same question across several
            allergens, and in 2017 the NIAID addendum guidelines rewrote the
            official advice around early introduction.
          </p>
          <p>
            None of that reaches a tired parent at 6am. What reaches them is a
            half-remembered rule from a relative, a conflicting search result,
            and a jar of something they are now afraid to open. The information
            problem is not that the science is missing — it is that nobody
            translated it into what to do on a Tuesday morning.
          </p>
          <p>
            First Bite is that translation: which allergen next, how long to
            wait, what to watch for, and whether the thing in your hand is safe
            for this specific baby today.
          </p>
        </div>

        <div className="mt-16">
          <SectionLabel number="02" label="HOW WE BUILD IT" />
          <div className="mt-6 space-y-8">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="mt-1 flex-none w-9 h-9 rounded-xl bg-accent-light text-accent inline-flex items-center justify-center">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-text-primary">{title}</h2>
                  <p className="mt-2 text-text-secondary leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionLabel number="03" label="WHO BUILDS IT" />
          <div className="mt-5 space-y-5 text-text-secondary text-lg leading-relaxed">
            <p>
              First Bite is built by Next Tech Labs, a small software studio
              working across the GCC and East Africa. It runs on the same
              architecture and the same infrastructure as the studio's other
              products, which is why a team this size can ship and maintain it
              on both stores.
            </p>
            <p>
              There is no support department. The person who wrote the code
              answers the email — reach them through the{' '}
              <Link to="/projects/first-bite/contact" className="text-accent hover:underline">
                contact form
              </Link>{' '}
              or the{' '}
              <Link to="/projects/first-bite/support" className="text-accent hover:underline">
                support page
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-success)] p-6">
          <p className="label-mono text-text-muted">IMPORTANT</p>
          <p className="mt-3 text-text-secondary leading-relaxed">
            First Bite is not a medical device and does not provide medical
            advice, diagnosis or treatment. It organises information and flags
            risk. Decisions about your baby's diet — especially where there is a
            family history of allergy, existing eczema, or a previous reaction —
            belong with your pediatrician or allergist.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link to="/projects/first-bite">
            <Button size="md">
              What {project.name} does <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </Link>
          <Link to="/projects/first-bite/blog">
            <Button size="md" variant="outline">
              Read the guides
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
