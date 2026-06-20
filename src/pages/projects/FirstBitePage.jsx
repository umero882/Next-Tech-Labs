import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  ScanLine,
  Users,
  Bell,
  Utensils,
  FileText,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Baby,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusDot } from '@/components/ui/StatusDot';
import { fadeUp, stagger } from '@/lib/motion';

const ASSET = (n) => `/projects/first-bite/${n}`;

const APP_STORE_URL = 'https://apps.apple.com/us/app/firstbite-baby-first-foods/id6775774829';
// Android listing not live yet — set this once the Play Store URL exists.
const PLAY_STORE_URL = null;

// Official Apple / Google store badges. Google's PNG ships with ~33% transparent
// padding, so it's rendered taller than the App Store SVG to make the visible
// buttons line up at the same height.
function StoreBadges({ size = 'md', className = '' }) {
  const apple = size === 'lg' ? 'h-[52px]' : 'h-11';
  const google = size === 'lg' ? 'h-[78px]' : 'h-[66px]';
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download First Bite on the App Store"
        className="inline-block transition-opacity hover:opacity-80"
      >
        <img src="/badges/app-store.svg" alt="Download on the App Store" className={`${apple} w-auto`} />
      </a>

      {PLAY_STORE_URL ? (
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get First Bite on Google Play"
          className="inline-block transition-opacity hover:opacity-80"
        >
          <img src="/badges/google-play.png" alt="Get it on Google Play" className={`${google} w-auto`} />
        </a>
      ) : (
        <div className="relative inline-block" aria-label="First Bite on Google Play — coming soon">
          <img
            src="/badges/google-play.png"
            alt="Get it on Google Play — coming soon"
            className={`${google} w-auto opacity-30 grayscale`}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-bg-primary/85 border border-border px-2.5 py-0.5 label-mono text-[10px] text-text-secondary whitespace-nowrap">
              Coming soon
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: HeartPulse,
    title: 'Allergen Protocol Engine',
    body: 'Risk-stratified, evidence-based introduction plans for the Big 9 — grounded in the LEAP, EAT, and NIAID guidance. Elevated-risk babies are routed to "consult your pediatrician before peanut," not pushed to self-introduce.',
  },
  {
    icon: ScanLine,
    title: 'AI Safety Scanner',
    body: 'Point the camera at a label, menu, or recipe. Claude vision reads the ingredients and returns a "safe for this baby today?" verdict against the profile — including 200+ hidden derivatives like casein, lecithin, and semolina.',
  },
  {
    icon: Users,
    title: 'Multi-caregiver sync',
    body: 'Invite a co-parent, grandparent, nanny, or daycare with the right permission level. Logs, reactions, and protocol progress sync in real time over Hasura GraphQL subscriptions, with a daily "what baby ate" handoff.',
  },
  {
    icon: Bell,
    title: 'Introduction tracker',
    body: 'The 3–5 day waiting rule is built in. Log a new food and the app surfaces a local notification if you try to introduce a second allergen inside the window. "Introduce next" suggestions follow age and remaining allergens.',
  },
  {
    icon: Utensils,
    title: 'Recipes & meal planner',
    body: 'Every recipe is pre-filtered against your baby\'s allergens. Build a 7-day plan, get an aisle-grouped shopping list, and keep the planner honest about what is and is not yet safe.',
  },
  {
    icon: FileText,
    title: 'Clinician-grade export',
    body: 'One tap produces a PDF of food history, reactions, and protocol progress for the pediatrician or allergist — plus a read-only share link. The appointment starts with the data, not a memory test.',
  },
];

const deepDives = [
  {
    label: '01 / PROTOCOL',
    eyebrow: 'Prevention, not just tracking',
    title: 'Introduce, then maintain — so tolerance actually sticks.',
    body:
      'Most trackers stop at "introduced." First Bite knows that allergens have to stay in the diet on a roughly weekly cadence to maintain tolerance. Each allergen runs a state machine — not started, in progress, introduced, maintaining, lapsed — with a maintenance streak that nudges you before the tolerance window closes.',
    shot: ASSET('plan.jpg'),
    alt: 'First Bite allergen protocol — Big 9 progress and maintenance',
  },
  {
    label: '02 / SCANNER',
    eyebrow: 'A verdict in under three seconds',
    title: 'Is this safe for my baby — right now?',
    body:
      'On-device OCR does the fast first pass; Claude does the reasoning. The scanner accounts for confirmed allergens, not-yet-introduced allergens, and active cooldowns. It flags risk — it never diagnoses. When confidence is low it says "can\'t confirm, check with a human" rather than guessing a false "safe."',
    shot: ASSET('scan.jpg'),
    alt: 'First Bite AI safety scanner',
  },
  {
    label: '03 / CARE TEAM',
    eyebrow: 'One source of truth',
    title: 'Everyone who feeds the baby, on the same page.',
    body:
      'The co-parent, the grandparent, the nanny, the daycare — each invited with owner, caregiver, or view-only access. A caregiver logs a meal or flags a reaction and the primary parent sees it in real time. Offline edits queue and replay on reconnect.',
    shot: ASSET('caregivers.jpg'),
    alt: 'First Bite multi-caregiver invites and clinical report',
  },
];

const safety = [
  'Protocols grounded in LEAP, EAT, PreventADALL, and NIAID 2017 guidance',
  'Pediatric-allergist review of all protocol and triage content',
  'Anaphylaxis red-flag triage surfaces "call 911 now" — never a diagnosis',
  'AI verdicts are risk flags with confidence thresholds and a "can\'t confirm" fallback',
  'Risk-gated allergens require provider confirmation before the app proceeds',
  'Health data and reaction photos encrypted at rest',
  'AI calls send minimal data; user content is never used for training',
  'No PII sold or shared — HIPAA-aware, consumer-wellness design',
];

const stack = [
  'Expo SDK 56',
  'React Native 0.85',
  'React 19',
  'Expo Router',
  'NativeWind',
  'Firebase Auth',
  'Hasura GraphQL',
  'Apollo + graphql-ws',
  'Claude API (vision)',
  'RevenueCat',
];

export default function FirstBitePage() {
  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 18% 0%, rgba(39,196,90,0.18) 0%, transparent 55%),
              radial-gradient(at 82% 100%, rgba(127,77,243,0.16) 0%, transparent 50%),
              linear-gradient(180deg, #0D1117 0%, #0D1117 100%)
            `,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <Container className="relative pt-12 md:pt-20 pb-12 md:pb-16">
          {/* Top bar — back link left, official store badges top-right (standard download slot) */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={1.75} /> All projects
            </Link>
            <StoreBadges />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Headline column */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <span className="label-mono px-2.5 py-1 rounded-md bg-bg-secondary border border-border text-text-secondary tabular">
                  P-19
                </span>
                <StatusDot status="beta" className="px-2.5 py-1 rounded-md bg-bg-secondary border border-border" />
                <Badge variant="muted">Live on the App Store · Android soon</Badge>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-7">
                <span className="label-mono text-text-muted">FIRST BITE — BABY ALLERGY-FREE FOOD</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.05] tracking-tight"
              >
                The allergy-prevention OS
                <br />
                <span className="text-text-muted">for the first 1,000 days.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                A native iOS and Android app that guides parents through evidence-based early-allergen
                introduction, keeps allergens safely in the diet to maintain tolerance, and tells you in one
                tap whether a food, label, or menu is safe for <em className="text-text-primary not-italic">this</em>{' '}
                baby — right now.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10">
                <StoreBadges size="lg" />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/contact">
                  <Button size="lg">
                    Build something like this <ArrowRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    See what's inside
                  </Button>
                </a>
              </motion.div>

              <motion.dl variants={fadeUp} className="mt-12 grid grid-cols-3 gap-x-6 gap-y-2 max-w-lg">
                <Stat k="Platform" v="iOS + Android" />
                <Stat k="Scanner" v="Claude vision" />
                <Stat k="Allergens" v="Big 9 + custom" />
              </motion.dl>
            </motion.div>

            {/* Hero image column */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 blur-3xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 40%, rgba(39,196,90,0.4) 0%, transparent 65%)',
                  }}
                />
                <PhoneFrame src={ASSET('home.jpg')} alt="First Bite home screen" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────── SHOWCASE ───────────── */}
      <section className="border-b border-border bg-bg-primary">
        <Container className="py-16 md:py-24">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <SectionLabel number="·" label="THE APP" />
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-3xl leading-tight">
                Free where it counts. Premium where it pays off.
              </h2>
            </div>
            <p className="text-text-muted max-w-md leading-relaxed">
              Unlimited logging and the full food database are free, forever — no "X free searches then
              locked." The AI scanner, protocols, and caregiver sync are what Premium unlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {[
              { src: ASSET('foods.jpg'), cap: 'FOOD LIBRARY' },
              { src: ASSET('meal-plan.jpg'), cap: 'MEAL PLANNER' },
              { src: ASSET('log.jpg'), cap: 'REACTION LOG' },
            ].map((s, i) => (
              <motion.div
                key={s.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <PhoneFrame src={s.src} alt={s.cap} />
                <p className="mt-5 label-mono text-text-muted">{s.cap}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────── FEATURE GRID ───────────── */}
      <section id="features" className="border-b border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-28">
          <SectionLabel number="·" label="WHAT'S INSIDE" />
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight max-w-4xl leading-tight">
            Six tools for the decisions that <span className="text-accent">keep parents up at night.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl border border-border bg-bg-primary p-7 hover:border-[var(--color-accent-border)] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-success-light text-[var(--color-success)] inline-flex items-center justify-center">
                  <f.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-text-primary tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed text-[15px]">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────────── DEEP DIVES ───────────── */}
      <section className="border-b border-border">
        <Container className="py-20 md:py-28 space-y-24 md:space-y-32">
          {deepDives.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="lg:col-span-7">
                <p className="label-mono">
                  <span className="text-text-muted tabular">{d.label.split(' / ')[0]}</span>
                  <span className="text-accent"> / </span>
                  <span className="text-text-primary">{d.label.split(' / ')[1]}</span>
                </p>
                <p className="mt-6 text-success font-mono text-xs tracking-wider uppercase">{d.eyebrow}</p>
                <h3 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-xl">
                  {d.title}
                </h3>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">{d.body}</p>
              </div>
              <div className="lg:col-span-5">
                <div className="relative max-w-xs mx-auto">
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 blur-3xl opacity-50"
                    style={{
                      background:
                        i % 2 === 0
                          ? 'radial-gradient(circle at 50% 50%, rgba(39,196,90,0.4) 0%, transparent 65%)'
                          : 'radial-gradient(circle at 50% 50%, rgba(127,77,243,0.4) 0%, transparent 65%)',
                    }}
                  />
                  <PhoneFrame src={d.shot} alt={d.alt} />
                </div>
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* ───────────── SAFETY DOSSIER ───────────── */}
      <section className="border-b border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel number="·" label="SAFETY & EVIDENCE" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Built to flag risk — never to diagnose.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                This is a children's-health app, so the defaults are conservative by design. Every protocol
                cites its evidence base and defers to your provider; every AI verdict carries a confidence
                level and a "verify with a human" fallback.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                <PostureStat icon={Stethoscope} k="Reviewed by" v="Allergist" />
                <PostureStat icon={ShieldCheck} k="At rest" v="Encrypted" />
                <PostureStat icon={HeartPulse} k="Triage" v="911-first" />
                <PostureStat icon={Baby} k="Standard" v="NIAID / LEAP" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {safety.map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 items-start text-text-secondary leading-relaxed rounded-xl border border-border bg-bg-primary p-4"
                  >
                    <span className="mt-0.5 flex-none w-5 h-5 rounded-full bg-success-light text-[var(--color-success)] inline-flex items-center justify-center">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── PREMIUM ───────────── */}
      <section className="border-b border-border">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <SectionLabel number="·" label="MONETIZATION" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Trust-first, not paywall-first.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">
                The loudest complaint in this category is paywall resentment. First Bite answers it by
                leaving the core free forever — unlimited logging, the full food database, the basic tracker.
                Premium gates the high-value engines, not the basics.
              </p>

              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
                {[
                  'AI Safety Scanner',
                  'Allergen Protocol Engine + maintenance',
                  'Multi-caregiver / daycare sync',
                  'Clinician-grade PDF + share link',
                  'Unlimited recipes & meal planner',
                  'Multi-baby profiles',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-text-secondary">
                    <Sparkles size={14} className="mt-1.5 flex-none text-[var(--color-success)]" strokeWidth={2} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-border bg-bg-secondary p-8 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 0%, rgba(39,196,90,0.18) 0%, transparent 55%)',
                  }}
                />
                <div className="relative">
                  <p className="label-mono text-text-muted">FREE FOREVER</p>
                  <ul className="mt-4 space-y-2">
                    {['Unlimited food logging', 'Full food database', 'Introduction tracker', '1 baby profile'].map(
                      (f) => (
                        <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                          <Check size={14} className="mt-0.5 flex-none text-[var(--color-success)]" strokeWidth={2.5} />
                          <span>{f}</span>
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-border space-y-3">
                    <PriceRow label="Premium" v="Monthly / annual" />
                    <PriceRow label="Trial" v="Real free trial" />
                    <PriceRow label="Billing" v="Apple IAP / Play" />
                  </div>

                  <Link to="/contact" className="mt-8 block">
                    <Button className="w-full" size="lg">
                      Talk to us about pricing <ArrowRight size={14} strokeWidth={2} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── BUILD SPEC ───────────── */}
      <section className="border-b border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel number="·" label="BUILD" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                One Expo monorepo, fourteen domain packages.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                Expo SDK 56 on the New Architecture, a Firebase + Hasura data graph with GraphQL
                subscriptions for live caregiver sync, Claude vision behind a backend proxy, and RevenueCat
                for native billing. Account deletion, legal links, and store-readiness are done.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-bg-primary p-7 md:p-9">
                <p className="label-mono text-text-muted">Stack</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {stack.map((t) => (
                    <Badge key={t} variant="muted">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                  <SpecRow k="Status" v={<StatusDot status="beta" />} />
                  <SpecRow k="Year" v="2026" mono />
                  <SpecRow k="Platforms" v="iOS 14+ / Android 9+" />
                  <SpecRow k="Author" v="Next Tech Labs" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── LEGAL ───────────── */}
      <section className="border-b border-border">
        <Container className="py-14 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <SectionLabel number="·" label="LEGAL & SUPPORT" />
              <p className="mt-3 text-text-secondary max-w-xl">
                A children's-health app collects sensitive data, so the policies are public and plain. These
                are the URLs the app itself links to from its settings screen.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/projects/first-bite/support"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Support
              </Link>
              <Link
                to="/projects/first-bite/privacy"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/projects/first-bite/terms"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/projects/first-bite/delete-account"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Delete account
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 30% 30%, rgba(39,196,90,0.18) 0%, transparent 55%),
              radial-gradient(at 70% 80%, rgba(127,77,243,0.18) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative py-24 md:py-32 text-center">
          <SectionLabel number="·" label="WORK WITH US" className="justify-center" />
          <h2 className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-3xl mx-auto">
            Have an AI-driven app that needs shipping carefully?
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
            First Bite pairs a real product with real guardrails — evidence-based content, an AI layer that
            refuses to over-claim, and a store-ready Expo build pipeline. We build the same way for clients.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div>
              <p className="label-mono text-text-muted mb-3">GET THE APP</p>
              <StoreBadges size="lg" className="justify-center" />
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Start a project <ArrowRight size={14} strokeWidth={2} />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  See more work
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function PhoneFrame({ src, alt }) {
  return (
    <div className="relative mx-auto w-full max-w-[15rem] rounded-[2rem] border border-border bg-bg-secondary p-1.5 shadow-2xl shadow-black/50">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block w-full rounded-[1.6rem] aspect-[369/800] object-cover object-top"
      />
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div className="col-span-1">
      <dt className="label-mono text-text-muted">{k}</dt>
      <dd className="mt-1 font-mono text-text-primary text-sm tabular">{v}</dd>
    </div>
  );
}

function PostureStat({ icon: Icon, k, v }) {
  return (
    <div className="rounded-xl border border-border bg-bg-primary p-4">
      <div className="flex items-center gap-2 text-text-muted">
        <Icon size={14} strokeWidth={1.75} />
        <span className="label-mono">{k}</span>
      </div>
      <p className="mt-2 font-mono text-text-primary tabular">{v}</p>
    </div>
  );
}

function PriceRow({ label, v }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="text-text-primary tabular font-mono">{v}</span>
    </div>
  );
}

function SpecRow({ k, v, mono = false }) {
  return (
    <div>
      <p className="label-mono text-text-muted mb-1.5">{k}</p>
      <div className={mono ? 'font-mono text-text-primary tabular' : 'text-text-primary'}>{v}</div>
    </div>
  );
}
