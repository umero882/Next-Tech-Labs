import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, stagger } from '@/lib/motion';
import { projects } from '@/data/projects';

export function Hero() {
  const liveCount = projects.filter((p) => p.status === 'live').length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <section className="relative overflow-hidden">
      <GridBackdrop />

      <Container className="pt-20 md:pt-28 pb-20 md:pb-28">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={fadeUp}>
            <SectionLabel number="00" label="NEXT TECH LABS" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display font-semibold text-text-primary tracking-tight leading-[0.96] text-[44px] sm:text-[56px] md:text-[80px] lg:text-[96px]"
          >
            We build the products{' '}
            <span className="italic font-normal text-accent">people</span>{' '}
            actually use.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-text-secondary text-lg md:text-xl leading-relaxed"
          >
            A software studio shipping mobile, web, AI, and infrastructure products. Same modular
            architecture across every project. Same rig running every deployment. Same operator
            answering the email.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/projects">
              <Button size="lg">
                See the work
                <ArrowRight size={16} strokeWidth={2} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Start a project
                <ArrowUpRight size={16} strokeWidth={2} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <Stat n={String(projects.length).padStart(2, '0')} label="Projects shipped & shipping" />
          <Stat n={String(liveCount).padStart(2, '0')} label="In production today" />
          <Stat n={String(featuredCount).padStart(2, '0')} label="Featured cases" />
          <Stat n="01" label="Studio. One operator. One rig." />
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <motion.div variants={fadeUp} className="border-l border-border pl-5">
      <p className="font-display text-5xl md:text-6xl font-semibold text-text-primary tabular tracking-tight">
        {n}
      </p>
      <p className="mt-3 text-sm text-text-muted leading-snug max-w-[16ch]">{label}</p>
    </motion.div>
  );
}
