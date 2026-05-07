import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Globe, Sparkles, Tv, Wrench, Server } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data/projects';
import { categories } from '@/data/tech-stack';
import { sortShowcase } from '@/lib/filter';
import { fadeUp, stagger } from '@/lib/motion';

const categoryMeta = {
  mobile:   { icon: Smartphone, blurb: 'Native iOS / Android via Expo + React Native. Production-grade releases on App Store and Google Play.' },
  web:      { icon: Globe,      blurb: 'React 19 + Vite SPAs and Next.js platforms. Role-aware admin, payments, GraphQL data graphs.' },
  'ai-saas':{ icon: Sparkles,   blurb: 'Claude API agents, dual-model loops, generative video, mobile-first AI tooling.' },
  media:    { icon: Tv,         blurb: 'Multi-platform brands across YouTube, Instagram, Facebook, TikTok with AI-assisted pipelines.' },
  tools:    { icon: Wrench,     blurb: 'Daily-use utilities — focused, opinionated, often shipped to family and friends first.' },
  infra:    { icon: Server,     blurb: 'The rig. Docker, Nginx, Prometheus, Grafana, Loki — what keeps every product alive.' },
};

export default function CategoriesPage() {
  const grouped = categories
    .filter((c) => c.id !== 'all')
    .map((c) => ({
      ...c,
      ...categoryMeta[c.id],
      items: sortShowcase(projects.filter((p) => p.category === c.id)),
    }));

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <SectionLabel number="03" label="CATEGORIES" />
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05]">
            Browse the work,<br />
            <span className="italic font-normal text-accent">by surface.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Six surfaces, one architecture. Pick the category that maps to your problem — every entry
            ships on the same modular stack.
          </p>
        </Container>
      </section>

      {/* Categories */}
      <Container className="py-16 md:py-24 space-y-20 md:space-y-24">
        {grouped.map((c) => {
          const Icon = c.icon;
          return (
            <motion.section
              key={c.id}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <motion.div variants={fadeUp} className="lg:col-span-4">
                <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent inline-flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <p className="mt-6 label-mono text-text-muted">{c.label.toUpperCase()}</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
                  {c.label}
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed max-w-md">{c.blurb}</p>

                <div className="mt-6 flex items-center gap-3 text-sm">
                  <span className="label-mono text-text-muted tabular">
                    {c.items.length} {c.items.length === 1 ? 'project' : 'projects'}
                  </span>
                  <span className="text-text-muted">·</span>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 label-mono text-accent hover:text-accent-hover transition-colors"
                  >
                    See all <ArrowRight size={12} strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>

              <motion.ul variants={fadeUp} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.items.length === 0 && (
                  <li className="rounded-xl border border-border-muted bg-bg-secondary/40 p-5 text-text-muted text-sm">
                    Nothing in this category yet.
                  </li>
                )}
                {c.items.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/projects/${p.id}`}
                      className="group block rounded-xl border border-border bg-bg-secondary p-5 hover:border-[var(--color-accent-border)] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="label-mono text-text-muted tabular">{p.code}</p>
                          <h3 className="mt-1 font-display text-lg font-semibold text-text-primary truncate">
                            {p.name}
                          </h3>
                          <p className="mt-1 text-sm text-text-secondary line-clamp-2 leading-relaxed">
                            {p.tagline}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          strokeWidth={1.75}
                          className="flex-none mt-1 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 3).map((t) => (
                          <Badge key={t} variant="muted">
                            {t}
                          </Badge>
                        ))}
                        {p.stack.length > 3 && <Badge variant="outline">+{p.stack.length - 3}</Badge>}
                      </div>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </motion.section>
          );
        })}
      </Container>
    </>
  );
}
