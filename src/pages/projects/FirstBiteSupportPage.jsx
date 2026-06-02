import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageSquare, Shield, FileText, Trash2, Bug, Sparkles } from 'lucide-react';
import { FirstBiteLegalLayout } from './FirstBiteLegalLayout';

const faqs = [
  {
    q: 'Is First Bite medical advice?',
    a: (
      <>
        No. First Bite is an educational and tracking tool — it flags risk against your baby's profile, it
        does not diagnose. Always confirm allergen introduction with your pediatrician or allergist, and for
        any severe reaction (breathing difficulty, swelling) call your local emergency number immediately.
      </>
    ),
  },
  {
    q: 'How does the AI Safety Scanner work — can I trust it?',
    a: (
      <>
        On-device text recognition reads the ingredients, then Claude reasons about them against your baby's
        confirmed allergens, not-yet-introduced allergens, and active cooldowns — including hidden derivatives
        like casein or lecithin. Verdicts are <strong>risk flags, never a diagnosis.</strong> When confidence
        is low it says “can't confirm — check with a human” rather than guessing a false “safe,” so never rely
        on it alone for a child with a known severe allergy.
      </>
    ),
  },
  {
    q: 'The scanner says it “needs the installable app build.”',
    a: (
      <>
        Live camera label-scanning runs only in the full installable build of the app. In the meantime you can
        paste or type an ingredient list into the <strong>Scan</strong> screen and get the same safety verdict.
      </>
    ),
  },
  {
    q: "What's free, and what's Premium?",
    a: (
      <>
        Unlimited food logging, the full food database, and the basic introduction tracker are{' '}
        <strong>free forever</strong>. Premium unlocks the AI Safety Scanner, the Allergen Protocol Engine with
        maintenance tracking, multi-caregiver and daycare sync, the clinician-grade PDF report, and the recipe
        and meal planner.
      </>
    ),
  },
  {
    q: 'How do I cancel my Premium subscription?',
    a: (
      <>
        Subscriptions are billed by the app store, not by us.
        <br />• <strong>iOS:</strong> Settings → [Your Name] → Subscriptions → First Bite → Cancel.
        <br />• <strong>Android:</strong> Google Play Store → Subscriptions → First Bite → Cancel.
      </>
    ),
  },
  {
    q: 'How do I invite a co-parent, grandparent, nanny, or daycare?',
    a: (
      <>
        Open <strong>Profile → Caregivers → Invite</strong>, enter their email, and choose a role —{' '}
        <strong>owner</strong>, <strong>caregiver</strong>, or <strong>view-only</strong>. Logs, reactions, and
        protocol progress then sync between you in real time, with a daily “what baby ate” handoff.
      </>
    ),
  },
  {
    q: 'How do I export a report for my pediatrician?',
    a: (
      <>
        Open <strong>Profile → Clinical report → Export for your pediatrician</strong>. First Bite generates a
        PDF of foods introduced, Big-9 protocol status, and reactions, ready to share via the native share
        sheet or a read-only link.
      </>
    ),
  },
  {
    q: 'How do I add another baby or switch between profiles?',
    a: (
      <>
        Tap <strong>+ Add</strong> on the profile chips at the top of the Home or Profile screen to create
        another baby, then tap a chip to switch. Multiple babies are a Premium feature.
      </>
    ),
  },
  {
    q: 'How do I delete my account and all my data?',
    a: (
      <>
        Open <strong>Profile</strong>, scroll to the bottom, and tap <strong>Delete account</strong> — it
        permanently erases your account, every baby, log, reaction, photo, protocol, and meal plan. Full detail
        is on the{' '}
        <Link className="text-accent hover:underline" to="/projects/first-bite/delete-account">
          account-deletion page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Reminders and notifications aren't showing up.",
    a: (
      <>
        Make sure notifications are enabled for First Bite in your device settings. Reminders drive the
        cooldown timers and the reintroduction nudges that keep introduced allergens in the diet, so they're
        worth turning on.
      </>
    ),
  },
];

const resources = [
  { icon: Shield, title: 'Privacy Policy', sub: 'How we handle your data', to: '/projects/first-bite/privacy' },
  { icon: FileText, title: 'Terms of Service', sub: 'Service terms and conditions', to: '/projects/first-bite/terms' },
  { icon: Trash2, title: 'Delete account', sub: 'Remove your account and data', to: '/projects/first-bite/delete-account' },
  { icon: Bug, title: 'Report a bug', sub: 'Help us improve', href: 'mailto:help@nextechlabs.org?subject=First%20Bite%20Bug%20Report' },
  { icon: Sparkles, title: 'Feature request', sub: 'Suggest something new', href: 'mailto:help@nextechlabs.org?subject=First%20Bite%20Feature%20Request' },
];

export default function FirstBiteSupportPage() {
  return (
    <FirstBiteLegalLayout
      eyebrow="SUPPORT"
      title="Help with First Bite."
      subtitle="Email us, browse the FAQ, or jump to the resources below. We typically reply within 1–2 business days."
    >
      {/* Contact card */}
      <div className="mt-2 rounded-2xl border border-border bg-bg-secondary p-6 md:p-8 flex flex-wrap items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-success-light text-[var(--color-success)] inline-flex items-center justify-center">
          <Mail size={22} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="label-mono text-text-muted">EMAIL</p>
          <a
            href="mailto:help@nextechlabs.org?subject=First%20Bite%20Support"
            className="mt-1 block font-display text-xl md:text-2xl font-semibold text-text-primary hover:text-accent transition-colors break-all"
          >
            help@nextechlabs.org
          </a>
          <p className="mt-2 text-sm text-text-muted">We aim to reply within 1–2 business days.</p>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-14">
        <div className="flex items-center gap-3">
          <MessageSquare size={18} strokeWidth={1.75} className="text-accent" />
          <h2 className="font-display text-2xl font-semibold text-text-primary tracking-tight">
            Frequently asked
          </h2>
        </div>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <li key={f.q} className="py-6">
              <p className="font-display text-lg font-semibold text-text-primary">{f.q}</p>
              <p className="mt-2 text-text-secondary leading-relaxed">{f.a}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Resources */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-text-primary tracking-tight">Resources</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map((r) => {
            const Icon = r.icon;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-tertiary text-accent inline-flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="text-text-muted group-hover:text-accent transition-colors"
                  />
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-text-primary">{r.title}</p>
                <p className="mt-1 text-sm text-text-muted">{r.sub}</p>
              </>
            );
            const className =
              'group block rounded-xl border border-border bg-bg-secondary p-5 hover:border-[var(--color-accent-border)] hover:-translate-y-0.5 transition-all';
            return r.to ? (
              <Link key={r.title} to={r.to} className={className}>
                {inner}
              </Link>
            ) : (
              <a key={r.title} href={r.href} className={className}>
                {inner}
              </a>
            );
          })}
        </div>
      </section>
    </FirstBiteLegalLayout>
  );
}
