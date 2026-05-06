import { motion } from 'framer-motion';
import { Server, Cpu, Activity, FileText, Network, Database } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { Badge } from '@/components/ui/Badge';
import { CallToAction } from '@/components/sections/CallToAction';
import { TechStackTicker } from '@/components/sections/TechStackTicker';
import { company } from '@/data/company';
import { fadeUp, stagger } from '@/lib/motion';

const rigItems = [
  { key: 'host',       label: 'Host',         icon: Server },
  { key: 'runtime',    label: 'Runtime',      icon: Cpu },
  { key: 'proxy',      label: 'Reverse proxy', icon: Network },
  { key: 'metrics',    label: 'Metrics',      icon: Activity },
  { key: 'dashboards', label: 'Dashboards',   icon: Database },
  { key: 'logs',       label: 'Logs',         icon: FileText },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-20 md:pb-28">
          <SectionLabel number="03" label="ABOUT" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-text-primary tracking-tight leading-[0.98] max-w-5xl">
            One studio.{' '}
            <span className="italic font-normal text-accent">One operator.</span>{' '}
            One rig.
          </h1>
          <p className="mt-8 text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
            {company.manifesto}
          </p>
        </Container>
      </section>

      {/* Brands */}
      <section className="py-20 md:py-24 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel number="·" label="BRANDS" />
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
                Two brands<br /> under one roof.
              </h2>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {company.brands.map((b, i) => (
                <motion.div
                  key={b.name}
                  variants={fadeUp}
                  className="border border-border rounded-2xl p-7 bg-bg-secondary"
                >
                  <span className="label-mono text-text-muted tabular">
                    0{i + 1} / 0{company.brands.length}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-text-primary">
                    {b.name}
                  </h3>
                  <p className="mt-1 label-mono text-accent">{b.role}</p>
                  <p className="mt-4 text-text-secondary leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* The Rig */}
      <section className="py-20 md:py-24 border-b border-border bg-bg-primary">
        <Container>
          <div className="max-w-3xl mb-12 md:mb-14">
            <SectionLabel number="·" label="THE RIG" />
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
              The infrastructure that hosts everything you've seen.
            </h2>
            <p className="mt-5 text-text-secondary text-lg leading-relaxed">
              No magic. A production-grade VPS, hardened with the same opinions we productize for
              clients. Boring on purpose, monitored on principle.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
          >
            {rigItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  variants={fadeUp}
                  className="bg-bg-secondary p-7 hover:bg-bg-tertiary transition-colors"
                >
                  <Icon size={20} strokeWidth={1.75} className="text-accent" />
                  <p className="mt-5 label-mono text-text-muted">{item.label}</p>
                  <p className="mt-2 font-display text-xl text-text-primary">
                    {company.rig[item.key]}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <p className="mt-8 label-mono text-text-muted">
            Same opinions productized in <span className="text-accent">CloudShield</span> and{' '}
            <span className="text-accent">SentinelAI</span>.
          </p>
        </Container>
      </section>

      <TechStackTicker />
      <CallToAction />
    </>
  );
}
