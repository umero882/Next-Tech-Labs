import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  WifiOff,
  KeyRound,
  Fingerprint,
  FolderLock,
  StickyNote,
  Clock,
  Cloud,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusDot } from '@/components/ui/StatusDot';
import { fadeUp, stagger } from '@/lib/motion';

const SHOT = (n) => `/projects/password-manager/pw-${n}.jpeg`;

const heroShots = [SHOT(1), SHOT(6), SHOT(8)];

const features = [
  {
    icon: ShieldCheck,
    title: 'AES-256 encryption',
    body: 'Military-grade cryptography keeps every credential, note, and TOTP seed encrypted at rest. Same standard banks and governments use.',
  },
  {
    icon: WifiOff,
    title: 'Offline-first',
    body: 'Your vault lives on-device. No mandatory cloud, no telemetry. Open and unlock with zero network — even in airplane mode.',
  },
  {
    icon: KeyRound,
    title: 'Generator that gets used',
    body: 'Length 8–32, with toggles for upper, lower, numeric, and symbol classes. One-tap copy, instant strength feedback.',
  },
  {
    icon: StickyNote,
    title: 'Secure Notes — with reminders',
    body: 'Encrypted notes for recovery codes, license keys, card expiries. Optional reminders surface rotating credentials before they break.',
  },
  {
    icon: Fingerprint,
    title: 'Biometric unlock',
    body: 'Face ID and fingerprint open the vault in under a second. Master password remains the cryptographic root — biometrics are a gate, not a substitute.',
  },
  {
    icon: FolderLock,
    title: 'Categories that fit real life',
    body: 'Social, Finance, Work, Shopping, Email, Development, Other. Browse by use, not by alphabetical username.',
  },
];

const deepDives = [
  {
    label: '01 / VAULT',
    eyebrow: 'A home screen that respects scale',
    title: 'Your credentials, organized by intent.',
    body:
      'The vault opens to a search bar and category strip — no infinite list, no ad bait. When the vault is empty, the empty state is a teacher, not an apology. When it’s full, the search index is local and instant.',
    shot: SHOT(6),
  },
  {
    label: '02 / GENERATOR',
    eyebrow: 'Strong by default',
    title: 'A password generator you’ll actually use.',
    body:
      'Slide for length. Toggle character classes. Strength reads in plain language, not entropy bits. Copy with one tap and the clipboard auto-clears 30 seconds later — long enough to paste, short enough to stay safe.',
    shot: SHOT(8),
  },
  {
    label: '03 / NOTES',
    eyebrow: 'For everything that isn’t a password',
    title: 'Secure notes with optional reminders.',
    body:
      'Recovery codes. License keys. Card expiries. The kind of sensitive data that the rest of the category dumps into a single "notes" field. Here it’s a first-class object — encrypted, categorized, and remind-able.',
    shot: SHOT(7),
  },
  {
    label: '04 / SECURITY',
    eyebrow: 'Sane defaults, real controls',
    title: 'Auto-lock, 2FA, haptic feedback, clear clipboard.',
    body:
      'Auto-lock at 30 seconds. Clipboard clears at 30 seconds. Haptic feedback confirms every state change. Two-factor authentication is one switch away. None of this is buried six menus deep.',
    shot: SHOT(13),
  },
];

const security = [
  'AES-256 encryption at rest',
  'PBKDF2 key derivation from master password',
  'Local-first storage — no servers required',
  'Auto-lock after 30 seconds of inactivity',
  'Clipboard auto-clears after copy',
  'Optional 2FA on master password',
  'Biometric gate (Face ID / Fingerprint) on Premium',
  'Encrypted local backup (export / import)',
];

const stack = [
  'React Native',
  'Expo',
  'TypeScript',
  'AES-256',
  'expo-secure-store',
  'expo-local-authentication',
  'Google Play Production',
];

export default function PasswordManagerPage() {
  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 0%, rgba(39,196,90,0.18) 0%, transparent 55%),
              radial-gradient(at 80% 100%, rgba(127,77,243,0.18) 0%, transparent 50%),
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
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.75} /> All projects
          </Link>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Headline column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="lg:col-span-7"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="label-mono px-2.5 py-1 rounded-md bg-bg-secondary border border-border text-text-secondary tabular">
                  P-07
                </span>
                <StatusDot status="live" className="px-2.5 py-1 rounded-md bg-bg-secondary border border-border" />
                <Badge variant="muted">Google Play · Production</Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-7 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.05] tracking-tight"
              >
                Password Vault.
                <br />
                <span className="text-text-muted">Locked. Local. Yours.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                A focused, offline-first password manager — AES-256 encrypted, biometric-gated, with a
                first-class secure-notes feature the rest of the category neglects. Shipped to Google Play
                production after closed-testing review.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
                <Link to="/contact">
                  <Button size="lg">
                    Build something like this <ArrowRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg">
                    See features
                  </Button>
                </a>
              </motion.div>

              <motion.dl
                variants={fadeUp}
                className="mt-12 grid grid-cols-3 gap-x-6 gap-y-2 max-w-lg"
              >
                <Stat k="Encryption" v="AES-256" />
                <Stat k="Network" v="Offline-first" />
                <Stat k="Channel" v="Play Store" />
              </motion.dl>
            </motion.div>

            {/* Icon + featured screenshot column */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto w-full max-w-sm">
                {/* Glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 blur-3xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(39,196,90,0.45) 0%, transparent 65%)',
                  }}
                />
                <PhoneFrame src={SHOT(6)} alt="Password Vault home screen" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────── PHONE SHOWCASE ───────────── */}
      <section className="border-b border-border bg-bg-primary">
        <Container className="py-16 md:py-24">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <SectionLabel number="·" label="THE APP" />
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-text-primary tracking-tight max-w-3xl leading-tight">
                Three taps from a clean install to a usable vault.
              </h2>
            </div>
            <p className="text-text-muted max-w-md leading-relaxed">
              No mandatory account. No 12-screen onboarding. Set a master password, the vault is yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {heroShots.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <PhoneFrame src={src} alt={`Password Vault screen ${i + 1}`} />
                <p className="mt-5 label-mono text-text-muted">
                  {['ONBOARDING', 'VAULT', 'GENERATOR'][i]}
                </p>
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
            Six features. Every one of them <span className="text-accent">earns its place.</span>
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
                <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">
                  {d.body}
                </p>
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
                  <PhoneFrame src={d.shot} alt={d.title} />
                </div>
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* ───────────── SECURITY DOSSIER ───────────── */}
      <section className="border-b border-border bg-bg-secondary/40">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionLabel number="·" label="SECURITY POSTURE" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Defaults that already won the argument.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                Every default in this app was chosen so that the typical user is safe even if they never
                open the settings screen.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
                <PostureStat icon={Clock} k="Auto-lock" v="30s" />
                <PostureStat icon={Cloud} k="Backup" v="Local" />
                <PostureStat icon={ShieldCheck} k="At rest" v="AES-256" />
                <PostureStat icon={Smartphone} k="Network" v="None required" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {security.map((s) => (
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
              <SectionLabel number="·" label="PREMIUM" />
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
                Free is enough.
                <br />
                Premium is for the people who keep adding.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl">
                The free tier holds five credentials — enough for most people to evaluate trust before they
                upgrade. Premium unlocks unlimited storage, encrypted cloud sync, biometric unlock, and
                breach alerts.
              </p>

              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
                {[
                  'Unlimited credentials',
                  'Encrypted cloud sync',
                  'Biometric unlock',
                  'Breach alerts',
                  'Priority categories (Finance, Work…)',
                  '3-day free trial',
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
                  <p className="label-mono text-text-muted">PREMIUM</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-6xl font-semibold text-text-primary tabular">
                      $4.99
                    </span>
                    <span className="text-text-muted">/ month</span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">
                    or <span className="text-text-secondary tabular">$34.99</span>/year — saves 40%
                  </p>

                  <div className="mt-8 pt-6 border-t border-border space-y-3">
                    <PriceRow label="Free trial" v="3 days" />
                    <PriceRow label="Cancel" v="Anytime" />
                    <PriceRow label="Devices" v="Unlimited (Premium)" />
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
                Built on the same stack we use everywhere.
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-md">
                React Native + Expo, encrypted secure storage, native biometrics. Shipped through Google Play’s
                closed-testing review and graduated into production access.
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
                  <SpecRow k="Status" v={<StatusDot status="live" />} />
                  <SpecRow k="Year" v="2025" mono />
                  <SpecRow k="Channel" v="Google Play" />
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
                Everything users need to evaluate trust before they install — and to find help once they do.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/projects/password-manager/support"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Support
              </Link>
              <Link
                to="/projects/password-manager/privacy"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/projects/password-manager/terms"
                className="label-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:text-accent hover:border-[var(--color-accent-border)] transition-colors"
              >
                Terms
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
              radial-gradient(at 30% 30%, rgba(127,77,243,0.18) 0%, transparent 55%),
              radial-gradient(at 70% 80%, rgba(39,196,90,0.18) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative py-24 md:py-32 text-center">
          <SectionLabel number="·" label="WORK WITH US" className="justify-center" />
          <h2 className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-3xl mx-auto">
            Have a security-first app that needs shipping?
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-xl mx-auto">
            We build production mobile apps with the same opinions you’ve seen on this page —
            encrypted defaults, offline-first behavior, and a Google Play release process that already works.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/contact">
              <Button size="lg">
                Start a project <ArrowRight size={14} strokeWidth={2} />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg">
                See more work
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function PhoneFrame({ src, alt }) {
  return (
    <div className="relative rounded-[2.25rem] border border-border bg-bg-secondary p-2 shadow-2xl shadow-black/50">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-bg-primary z-10" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block w-full rounded-[1.85rem] aspect-[9/19] object-cover object-top"
      />
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <>
      <div className="col-span-1">
        <dt className="label-mono text-text-muted">{k}</dt>
        <dd className="mt-1 font-mono text-text-primary text-sm tabular">{v}</dd>
      </div>
    </>
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
