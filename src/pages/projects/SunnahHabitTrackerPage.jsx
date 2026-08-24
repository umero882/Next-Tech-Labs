import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Ear,
  Flame,
  Languages,
  Mic,
  Moon,
  Quote,
  ShieldCheck,
  Sparkles,
  Trophy,
  WifiOff,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusDot } from '@/components/ui/StatusDot';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { useSeo } from '@/hooks/useSeo';
import { sunnahHabitSeo } from '@/lib/routeSeo';
import { fadeUp, stagger } from '@/lib/motion';

const ASSET = (n) => `/projects/sunnah-habit-tracker/${n}`;

/** The app's own legal microsite — the URLs the app and the store forms link to. */
const LEGAL = 'https://sunnah.nextechlabs.tech';

/**
 * Store badges for an app that is in closed testing on both platforms.
 *
 * No URLs are passed on purpose: `StoreBadges` renders its grayscale
 * "Coming soon" state, which is the honest slot until a public listing exists.
 */
function SunnahBadges(props) {
  return <StoreBadges appName="Sunnah Habit Tracker" {...props} />;
}

const features = [
  {
    icon: Moon,
    title: 'Prayer times, computed here',
    body: 'The five prayer times are calculated on the device with adhan from your coordinates and your chosen calculation method — GPS when you allow it, Mecca as the fallback. The Next Prayer card counts down; the prayer row cycles on-time, late, missed.',
  },
  {
    icon: Flame,
    title: 'Habits with a real streak engine',
    body: 'Adopt a template or write your own, then check in against a per-day count. Streak and XP live in a timezone-safe engine in the shared core package, so crossing midnight in a new country does not silently break a run.',
  },
  {
    icon: WifiOff,
    title: 'Offline-first check-ins',
    body: 'Every check-in updates the screen immediately and lands in a durable mutation queue. Close the app, lose the signal, board a plane — the queue replays in order the moment the connection returns.',
  },
  {
    icon: BookOpen,
    title: "Qur'an, read and heard",
    body: 'The full mushaf with switchable translations, 24 reciters, per-ayah playback, and audio that keeps going with the screen locked. It reopens on the ayah you stopped at, not at the top of the surah.',
  },
  {
    icon: Mic,
    title: "Qa'idah & Tajweed, with a microphone",
    body: '25 modules, 51 lessons and 29 letters gated in order, with spaced-repetition review, a guardian area for a parent or teacher, and recording practice on every letter card.',
  },
  {
    icon: Trophy,
    title: 'Levels, achievements, leaderboard',
    body: 'XP unlocks Basic, then Companion at 500 and Prophetic at 2,500. Achievements fire from a real unlock engine — streaks, ten completions, a five-day fajr run — and the weekly board can be joined without showing your name.',
  },
];

/** The showcase band — one tile per surface a new user actually meets. */
const screens = [
  { src: ASSET('welcome.jpg'), cap: 'ONBOARDING', alt: 'Sunnah Habit Tracker welcome screen' },
  { src: ASSET('habits.jpg'), cap: 'DAILY HABITS', alt: 'Habit list with per-day counts and category filters' },
  { src: ASSET('prayers.jpg'), cap: 'PRAYER TRACKING', alt: "Home screen with next prayer and today's five prayers" },
  { src: ASSET('quran.jpg'), cap: "QUR'AN READER", alt: "Surah Al-Baqarah with translation and reciter audio" },
  { src: ASSET('qaidah.jpg'), cap: "QA'IDAH COURSE", alt: "Qa'idah and Tajweed course with locked module progression" },
  { src: ASSET('profile.jpg'), cap: 'PROFILE & LEVELS', alt: 'Profile with streak, points and XP level card' },
];

const deepDives = [
  {
    label: '01 / RECITATION',
    eyebrow: 'The design decision that survived measurement',
    title: 'A listener that will not flatter a child.',
    body:
      'Tap the microphone, say the letter, and the app reports what it heard. The model is never told which letter was expected — it transcribes, and the server does the comparison. That split exists because the obvious design failed a test: handed the expected letter and three seconds of silence, the model agreed it had heard it six times out of eight. Told nothing to agree with, it reports silence honestly. Low confidence renders as "couldn\'t tell", never as a pass.',
    shot: ASSET('recite.jpg'),
    alt: "Qa'idah letter card with playback and recording controls",
  },
  {
    label: '02 / ASK',
    eyebrow: 'Retrieval, not generation',
    title: 'It cites its source, or it says it does not know.',
    body:
      'Ask a question and the answer comes from a curated corpus of over 500 entries — verses, graded hadith, duas, the names of Allah, and lesson notes — searched in Postgres and returned with source, reference and grade attached. When nothing in the corpus answers the question it says "not covered" and offers the nearest entries instead of writing something plausible about the religion.',
    shot: ASSET('learn.jpg'),
    alt: 'Learn tab with Ask a Question, categories and recommended articles',
  },
  {
    label: '03 / PROGRESS',
    eyebrow: 'Data the user can argue with',
    title: 'Weekly numbers you can check against your own week.',
    body:
      'Overview, Habits, Prayers and Achievements, each backed by the same check-in records. A completion ring for the week, a per-day bar chart, per-habit and per-prayer breakdowns, and a 30-day milestone that tracks real completions rather than app opens. Nothing here is an estimate.',
    shot: ASSET('progress.jpg'),
    alt: 'Progress tab with weekly completion ring and per-day chart',
  },
];

const integrity = [
  'Every Ask answer ships its citations — source, reference, and the hadith grade',
  '"Not covered" is a first-class answer; the corpus is curated, never generated',
  'The pronunciation model is never told the expected letter — the server judges',
  'A low-confidence result reads "couldn\'t tell", never a pass or a fail',
  "Qur'an text and translations come from the Quran.com API, not from a model",
  'All 24 reciters are credited in the app, with their attributions shipped alongside the audio',
  'Location is used on-device to compute prayer times and is never sent anywhere',
  'Changing an email or deleting an account re-authenticates first; AI use is metered per user',
];

const free = [
  'Every habit, streak, reminder and achievement',
  "The full Qur'an — 24 reciters and translations",
  "The whole Qa'idah and Tajweed course",
  'Ask, metered fairly across users',
  'The leaderboard, joinable anonymously',
  'English and Arabic, RTL throughout',
];

const limits = [
  {
    k: 'The listener',
    v: 'Capped per day across all users. Past the cap it says "couldn\'t tell" rather than guessing.',
  },
  {
    k: 'Streaming',
    v: "Qur'an audio and the Level 2 ayah cards need a connection. Everything else works offline.",
  },
  {
    k: 'Reminders',
    v: 'Local notifications only. Remote push waits for the development-client build.',
  },
];

const stack = [
  'Expo SDK 57',
  'React Native',
  'TypeScript (strict)',
  'Expo Router',
  'NativeWind',
  'SuperTokens',
  'Hasura GraphQL',
  'PostgreSQL',
  'TanStack Query',
  'Zustand',
  'adhan',
  'Sentry',
];

export default function SunnahHabitTrackerPage() {
  useSeo(sunnahHabitSeo());

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 16% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 84% 100%, rgba(127,77,243,0.16) 0%, transparent 50%),
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
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={1.75} /> All projects
            </Link>
            <SunnahBadges />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Headline column */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <span className="label-mono px-2.5 py-1 rounded-md bg-bg-secondary border border-border text-text-secondary tabular">
                  P-20
                </span>
                <StatusDot
                  status="beta"
                  className="px-2.5 py-1 rounded-md bg-bg-secondary border border-border"
                />
                <Badge variant="muted">In closed testing — iOS + Android</Badge>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-7">
                <span className="label-mono text-text-muted">
                  SUNNAH HABIT TRACKER — ISLAMIC HABIT BUILDING
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.05] tracking-tight"
              >
                Small consistent deeds,
                <br />
                <span className="text-text-muted">measured honestly.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                A bilingual iOS and Android app for daily Sunnah practice: habits with streaks and XP,
                the five prayers tracked against times computed on the device, the full{' '}
                <span className="text-text-primary">Qur&apos;an</span> with 24 reciters, and a
                Qa&apos;idah course that listens to a learner recite and tells them what it actually
                heard.
              </motion.p>

              <motion.div id="get-the-app" variants={fadeUp} className="mt-10 scroll-mt-24">
                <SunnahBadges size="lg" />
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/contact">
                  <Button size="lg">
                    Build something like this <ArrowRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    See what&apos;s inside
                  </Button>
                </a>
              </motion.div>

              <motion.dl variants={fadeUp} className="mt-12 grid grid-cols-3 gap-x-6 gap-y-2 max-w-lg">
                <Stat k="Platform" v="iOS + Android" />
                <Stat k="Course" v="51 lessons" />
                <Stat k="Reciters" v="24" />
              </motion.dl>
            </motion.div>

            {/* Hero image column */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 blur-3xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 40%, rgba(39,196,90,0.4) 0%, transparent 65%)',
                  }}
                />
                <PhoneFrame src={ASSET('home.jpg')} alt="Sunnah Habit Tracker home screen" />
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
                Five tabs, and none of them is a paywall.
              </h2>
            </div>
            <p className="text-text-muted max-w-md leading-relaxed">
              Habits, prayers, progress, the Qur&apos;an and the whole Qa&apos;idah course ship free —
              no ads, no purchases, no counter that runs out mid-lesson.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6">
            {screens.map((s, i) => (
              <motion.div
                key={s.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <PhoneFrame src={s.src} alt={s.alt} />
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
            Six systems behind one <span className="text-accent">daily checklist.</span>
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
                <p className="mt-6 text-success font-mono text-xs tracking-wider uppercase">
                  {d.eyebrow}
                </p>
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

      {/* ───────────── INTEGRITY DOSSIER ───────────── */}
      <section className="border-b border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel number="·" label="HANDLING THE TEXT" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                An app about the religion should not guess about it.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                Every claim the app makes is traceable to something a human wrote down. Answers carry
                citations; scripture and translations come from a published API; the model that listens
                to recitation is arranged so that it cannot quietly agree with the learner.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                <PostureStat icon={Quote} k="Answers" v="Cited" />
                <PostureStat icon={Ear} k="Listener" v="Blind" />
                <PostureStat icon={ShieldCheck} k="Location" v="On-device" />
                <PostureStat icon={Languages} k="Locales" v="EN + AR" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {integrity.map((s) => (
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

      {/* ───────────── FREE + LIMITS ───────────── */}
      <section className="border-b border-border">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <SectionLabel number="·" label="WHAT IT COSTS" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Free. No ads, no purchases.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">
                Worship tooling that meters worship is a bad trade, so version 1.0 ships whole. The
                running costs — hosted Postgres, the answering service, the listener — sit with the
                studio rather than in front of a lesson.
              </p>

              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
                {free.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-text-secondary">
                    <Sparkles
                      size={14}
                      className="mt-1.5 flex-none text-[var(--color-success)]"
                      strokeWidth={2}
                    />
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
                      'radial-gradient(circle at 30% 0%, rgba(210,153,34,0.16) 0%, transparent 55%)',
                  }}
                />
                <div className="relative">
                  <p className="label-mono text-text-muted">KNOWN LIMITS AT 1.0</p>
                  <ul className="mt-5 space-y-5">
                    {limits.map((l) => (
                      <li key={l.k}>
                        <div className="flex items-center gap-2 text-text-primary">
                          <Clock size={14} strokeWidth={1.75} className="text-text-muted" />
                          <span className="font-mono text-sm">{l.k}</span>
                        </div>
                        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">{l.v}</p>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="mt-8 block">
                    <Button className="w-full" size="lg">
                      Ask about the roadmap <ArrowRight size={14} strokeWidth={2} />
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
                One pnpm monorepo, fourteen feature packages.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                Expo SDK 57 on the New Architecture, feature-first modules over a shared UI, core and
                API layer, SuperTokens issuing the JWTs Hasura verifies against row-level permissions,
                and self-hosted infrastructure on Coolify. Streaks, XP and sync are covered by unit
                tests; CI runs lint, typecheck and tests on every merge.
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
                  <SpecRow k="Languages" v="English + العربية (RTL)" />
                  <SpecRow k="Author" v="Next Tech Labs" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── LEGAL & SUPPORT ───────────── */}
      <section className="border-b border-border">
        <Container className="py-14 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <SectionLabel number="·" label="LEGAL & SUPPORT" />
              <p className="mt-3 text-text-secondary max-w-xl">
                The app carries its own policy site, and these are the exact URLs its settings screen
                and the store forms point at.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Privacy', href: `${LEGAL}/privacy` },
                { label: 'Terms', href: `${LEGAL}/terms` },
                { label: 'Delete account', href: `${LEGAL}/delete-account` },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
                >
                  {l.label}
                </a>
              ))}
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
            Building something where a wrong answer matters?
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
            Sunnah Habit Tracker is what our AI work looks like when the subject does not tolerate a
            confident guess: retrieval with citations, a listener that reports uncertainty, and the
            measurements that settled both. We build the same way for clients.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div>
              <p className="label-mono text-text-muted mb-3">GET THE APP</p>
              <SunnahBadges size="lg" className="justify-center" />
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

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.alt
 */
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

/**
 * @param {Object} props
 * @param {string} props.k
 * @param {string} props.v
 */
function Stat({ k, v }) {
  return (
    <div className="col-span-1">
      <dt className="label-mono text-text-muted">{k}</dt>
      <dd className="mt-1 font-mono text-text-primary text-sm tabular">{v}</dd>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {React.ElementType} props.icon
 * @param {string} props.k
 * @param {string} props.v
 */
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

/**
 * @param {Object} props
 * @param {string} props.k
 * @param {React.ReactNode} props.v
 * @param {boolean} [props.mono=false]
 */
function SpecRow({ k, v, mono = false }) {
  return (
    <div>
      <p className="label-mono text-text-muted mb-1.5">{k}</p>
      <div className={mono ? 'font-mono text-text-primary tabular' : 'text-text-primary'}>{v}</div>
    </div>
  );
}
