import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Globe,
  Sparkles,
  Server,
} from 'lucide-react';
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
              className="mt-6 font-display font-semibold text-text-primary tracking-tight leading-[1.04] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
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

          {/* Brand composition column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <BrandVisual />
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

/* ─────────────────────────────────────────────────────────
   BrandVisual

   Plays a 5s Remotion-rendered intro on first visit (cached via
   sessionStorage so it doesn't replay on every nav back to home),
   then crossfades into the static BrandComposition. The intro's last
   frame and the static composition were designed to match, so the
   handover is visually seamless. Respects prefers-reduced-motion by
   skipping the video entirely.
   ───────────────────────────────────────────────────────── */
function BrandVisual() {
  // Honor prefers-reduced-motion; otherwise always show the intro on load.
  // (No sessionStorage gating any more — it caused the intro to silently
  // disappear after a single play in the same tab.)
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'video';
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return 'static';
    return 'video';
  });
  const videoRef = useRef(null);

  useEffect(() => {
    if (phase !== 'video') return;
    const v = videoRef.current;
    if (!v) return;

    // Defer play() so the headline copy lands first. Without this, the video
    // can buffer + auto-finish during initial page load, leaving the user
    // staring at the static composition with no animation.
    const startTimer = setTimeout(() => {
      v.play().catch(() => {});
    }, 700);

    // Safety net: if the `ended` event never fires (stalled buffer, autoplay
    // refused, etc.) reveal the interactive static composition anyway.
    const fallback = setTimeout(() => setPhase('static'), 8000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fallback);
    };
  }, [phase]);

  return (
    <div className="relative w-full max-w-[440px] aspect-square">
      <AnimatePresence initial={false} mode="wait">
        {phase === 'video' ? (
          <motion.video
            key="intro"
            ref={videoRef}
            src="/intro.mp4"
            // No poster — we want frame 0 (dark bg) so the canvas reads as
            // empty until the intro draws in. Showing the poster up-front
            // would spoil the reveal.
            muted
            playsInline
            preload="auto"
            onEnded={() => setPhase('static')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            aria-label="Next Tech Labs intro animation"
          />
        ) : (
          <motion.div
            key="static"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <BrandComposition />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   BrandComposition

   Center: NTL monogram (mirrors /favicon.svg).
   Around it: four practice tiles (Mobile, Web, AI, Infra) with brand colors.
   Faint dotted lines connect each tile back to the center, signalling
   "same modular architecture across every surface" — which is the studio's
   thesis. Each tile bobs on its own rhythm so the composition feels alive
   without distracting from the headline copy.
   ───────────────────────────────────────────────────────── */
function BrandComposition() {
  return (
    <div className="relative w-full max-w-[440px] aspect-square">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(127,77,243,0.45) 0%, transparent 55%), radial-gradient(circle at 70% 80%, rgba(39,196,90,0.30) 0%, transparent 60%), radial-gradient(circle at 25% 25%, rgba(88,166,255,0.20) 0%, transparent 50%)',
        }}
      />

      {/* Connector lines (dotted), behind everything */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          ['12,18', '50,50'],
          ['88,18', '50,50'],
          ['12,82', '50,50'],
          ['88,82', '50,50'],
        ].map(([a, b], i) => {
          const [x1, y1] = a.split(',');
          const [x2, y2] = b.split(',');
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(127,77,243,0.35)"
              strokeWidth="0.25"
              strokeDasharray="0.6 0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
            />
          );
        })}
      </svg>

      {/* Practice tiles — corners of the diamond */}
      <PracticeTile
        icon={Smartphone}
        label="Mobile"
        accent="#27C45A"
        position="top-2 left-0 sm:left-2"
        delay={0.35}
        bob={[0, -6, 0]}
      />
      <PracticeTile
        icon={Globe}
        label="Web"
        accent="#58A6FF"
        position="top-2 right-0 sm:right-2"
        delay={0.5}
        bob={[0, -8, 0]}
      />
      <PracticeTile
        icon={Sparkles}
        label="AI"
        accent="#7F4DF3"
        position="bottom-2 left-0 sm:left-2"
        delay={0.65}
        bob={[0, -7, 0]}
      />
      <PracticeTile
        icon={Server}
        label="Infra"
        accent="#D29922"
        position="bottom-2 right-0 sm:right-2"
        delay={0.8}
        bob={[0, -5, 0]}
      />

      {/* Center monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Slow rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 -m-3 rounded-3xl border border-dashed border-[var(--color-accent-border)]"
          />
          {/* Pulse halo */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl bg-accent/15 blur-md"
          />

          {/* The mark */}
          <div
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-bg-secondary border border-border flex items-center justify-center shadow-2xl shadow-black/50"
            aria-label="Next Tech Labs monogram"
          >
            <svg width="68" height="68" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M16 46 V18 L32 38 V18 H40"
                stroke="#7F4DF3"
                strokeWidth="5"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
              <circle cx="46" cy="46" r="3.5" fill="#27C45A" />
            </svg>
          </div>

          {/* Tiny tag */}
          <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 label-mono text-text-muted whitespace-nowrap">
            <span className="text-text-primary">Next Tech</span>
            <span className="text-accent">.</span>
            <span className="text-text-primary">Labs</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function PracticeTile({ icon: Icon, label, accent, position, delay, bob }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${position}`}
    >
      <motion.div
        animate={{ y: bob }}
        transition={{
          duration: 6 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="rounded-2xl border border-border bg-bg-secondary/95 backdrop-blur p-3 sm:p-4 shadow-xl shadow-black/40 flex items-center gap-2.5 min-w-[110px]"
      >
        <span
          className="w-9 h-9 rounded-xl inline-flex items-center justify-center flex-none"
          style={{ background: `${accent}1f`, color: accent }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="label-mono" style={{ color: accent }}>
            {label}
          </p>
          <p className="text-[11px] text-text-muted leading-tight mt-0.5">Practice</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ n, label }) {
  return (
    <motion.div variants={fadeUp} className="border-l border-border pl-5">
      <p className="font-display text-4xl md:text-5xl font-semibold text-text-primary tabular tracking-tight">
        {n}
      </p>
      <p className="mt-3 text-sm text-text-muted leading-snug max-w-[16ch]">{label}</p>
    </motion.div>
  );
}
