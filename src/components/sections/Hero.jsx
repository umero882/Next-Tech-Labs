import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel number="00" label="NEXT TECH LABS" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display font-semibold text-text-primary tracking-tight leading-[0.96] text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px]"
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

          {/* Visual column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <HeroShowcase />
          </motion.div>
        </div>

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

function HeroShowcase() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Glow behind the phone */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(127,77,243,0.42) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(39,196,90,0.35) 0%, transparent 60%)',
        }}
      />

      {/* Phone frame */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-[2.25rem] border border-border bg-bg-secondary p-2 shadow-2xl shadow-black/50 mx-auto"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-bg-primary z-10" />
        <img
          src="/projects/password-manager/pw-6.jpeg"
          alt="Password Vault — one of Next Tech Labs' shipped products"
          loading="eager"
          fetchPriority="high"
          className="block w-full rounded-[1.85rem] aspect-[9/19] object-cover object-top"
        />
      </motion.div>

      {/* Floating annotations */}
      <Annotation
        icon={ShieldCheck}
        label="AES-256, offline-first"
        className="absolute -left-6 top-12 hidden md:flex"
        delay={0.6}
      />
      <Annotation
        icon={Sparkles}
        label="Shipped to Google Play"
        className="absolute -right-6 bottom-16 hidden md:flex"
        delay={0.85}
      />
    </div>
  );
}

function Annotation({ icon: Icon, label, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`items-center gap-2 rounded-full border border-border bg-bg-secondary/95 backdrop-blur px-3 py-2 shadow-lg shadow-black/40 ${className}`}
    >
      <span className="w-6 h-6 rounded-full bg-accent-light text-accent inline-flex items-center justify-center">
        <Icon size={12} strokeWidth={2} />
      </span>
      <span className="label-mono text-text-secondary whitespace-nowrap">{label}</span>
    </motion.div>
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
