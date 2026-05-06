import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { fadeUp, stagger } from '@/lib/motion';

const groups = [
  {
    label: 'Frontend',
    items: ['React 19', 'React Native', 'Expo SDK 55', 'Vite 8', 'Next.js', 'Tailwind CSS 4', 'Framer Motion'],
    blurb: 'Where the user lives. Component libraries, animations, and cross-platform behavior shared between web and native.',
  },
  {
    label: 'Data & API',
    items: ['Hasura GraphQL', 'Apollo Client 4', 'PostgreSQL', 'Firebase Auth', 'Firestore', 'Stripe'],
    blurb: 'Typed schemas, role-aware permissions, and payment flows already battle-tested in production.',
  },
  {
    label: 'AI & Media',
    items: ['Claude API', 'Remotion', 'Voice AI', 'Generative Video', 'Playwright'],
    blurb: 'Where AI does real work — agentic loops, video composition pipelines, browser automation.',
  },
  {
    label: 'Infra & Ops',
    items: ['Docker', 'Nginx', 'PM2', 'Prometheus', 'Grafana', 'Loki', 'Hostinger VPS', 'Nx Monorepo'],
    blurb: 'The rig that runs every product on this site — hardened, monitored, observable.',
  },
];

function countUsage(tech) {
  return projects.filter((p) =>
    p.stack.some((s) => s.toLowerCase().includes(tech.toLowerCase().split(' ')[0])),
  ).length;
}

export default function TechPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <SectionLabel number="04" label="TECH" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0]">
            One stack,<br />
            <span className="italic font-normal text-accent">across every product.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            We don’t pivot the architecture per brief. The same modular layers underwrite every project —
            which is why we ship them.
          </p>
        </Container>
      </section>

      {/* Stack groups */}
      <Container className="py-20 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {groups.map((g) => (
            <motion.div
              key={g.label}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-bg-secondary p-7 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="label-mono">
                  <span className="text-accent">·</span>{' '}
                  <span className="text-text-primary">{g.label.toUpperCase()}</span>
                </p>
                <span className="label-mono text-text-muted tabular">
                  {g.items.length} layers
                </span>
              </div>
              <p className="mt-4 text-text-secondary leading-relaxed">{g.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {g.items.map((t) => {
                  const n = countUsage(t);
                  return (
                    <Badge key={t} variant="muted" className="gap-1.5">
                      <span>{t}</span>
                      {n > 0 && (
                        <span className="text-text-muted tabular text-[10px]">×{n}</span>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Why this stack */}
      <section className="border-t border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel number="·" label="WHY THIS STACK" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Boring is a feature.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                Every layer here is chosen because it survives long-term. We don’t adopt the framework of
                the month. We adopt the framework that still works in three years.
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg">
                    Talk stack with us <ArrowRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
              </div>
            </div>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Production-tested', 'Every layer ships in a real product on this site.'],
                ['Cross-platform', 'Domain logic shared between web and native — no duplicate stacks.'],
                ['Typed, end-to-end', 'TypeScript on app code, GraphQL on the wire, Postgres at rest.'],
                ['Observable', 'Prometheus / Grafana / Loki on every prod deploy.'],
                ['Cost-aware', 'Self-hosted on Hostinger VPS. No vendor lock to recurring SaaS bills.'],
                ['Region-fluent', 'Stripe routing and Arabic-aware copy baked into the defaults.'],
              ].map(([t, body]) => (
                <li key={t} className="rounded-xl border border-border bg-bg-primary p-5">
                  <p className="font-display font-semibold text-text-primary">{t}</p>
                  <p className="mt-1 text-text-secondary text-sm leading-relaxed">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
