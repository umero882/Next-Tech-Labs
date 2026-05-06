import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageSquare, FileText, Shield, Bug, Sparkles } from 'lucide-react';
import { PasswordManagerLegalLayout } from './PasswordManagerLegalLayout';

const faqs = [
  {
    q: 'I forgot my master password — can you reset it?',
    a: (
      <>
        For your security, your master password is never stored on our servers and we cannot recover it. If
        you’ve enabled phone-lock authentication, you can reset your master password from the lock screen
        using your device’s biometric or PIN. Otherwise, you’ll need to reset the vault, which permanently
        deletes the local data.
      </>
    ),
  },
  {
    q: 'How is my data encrypted?',
    a: (
      <>
        All vault data is encrypted on your device using AES-256 with a key derived from your master password
        via PBKDF2. Your master password never leaves your device unencrypted, and our servers only ever see
        encrypted data. We use a zero-knowledge architecture: only you can decrypt your vault.
      </>
    ),
  },
  {
    q: 'Does Password Vault work offline?',
    a: 'Yes. The app is local-first and fully functional offline. Cloud backup and sync are optional features that only run when you choose to enable them.',
  },
  {
    q: 'How do I enable Face ID / Touch ID / fingerprint unlock?',
    a: (
      <>
        After unlocking your vault, open <strong>Profile → Security → Biometric Unlock</strong> and toggle it
        on. You’ll be prompted to authenticate once to enable it.
      </>
    ),
  },
  {
    q: 'How do I cancel my Premium subscription?',
    a: (
      <>
        Subscriptions are managed by your device’s app store, not by us.
        <br />
        • <strong>iOS:</strong> Settings → [Your Name] → Subscriptions → Password Vault → Cancel.
        <br />
        • <strong>Android:</strong> Google Play Store → Menu → Subscriptions → Password Vault → Cancel.
      </>
    ),
  },
  {
    q: 'How do I delete my account and all my data?',
    a: (
      <>
        Open <strong>Profile → Account → Delete Account</strong>. This permanently removes your account and
        any associated cloud data. Local vault data is wiped at the same time.
      </>
    ),
  },
  {
    q: 'Can I export my passwords?',
    a: (
      <>
        Yes. Open <strong>Profile → Backup &amp; Export → Export Vault to File</strong> to create an
        encrypted backup file you can store anywhere. Imports are supported from the same screen.
      </>
    ),
  },
  {
    q: "I'm having trouble with two-factor authentication.",
    a: (
      <>
        Make sure your device clock is set to “Set automatically” — TOTP codes are time-based and a clock
        skew will cause every code to fail. If you’ve lost access to your authenticator app, contact us at{' '}
        <a className="text-accent hover:underline" href="mailto:help@nextechlabs.org?subject=2FA%20Recovery">
          help@nextechlabs.org
        </a>{' '}
        for recovery options.
      </>
    ),
  },
];

const resources = [
  {
    icon: Shield,
    title: 'Privacy Policy',
    sub: 'How we handle your data',
    to: '/projects/password-manager/privacy',
  },
  {
    icon: FileText,
    title: 'Terms of Use',
    sub: 'Service terms and conditions',
    to: '/projects/password-manager/terms',
  },
  {
    icon: Sparkles,
    title: 'Feature Request',
    sub: 'Suggest something new',
    href: 'mailto:help@nextechlabs.org?subject=Feature%20Request',
  },
  {
    icon: Bug,
    title: 'Report a Bug',
    sub: 'Help us improve',
    href: 'mailto:help@nextechlabs.org?subject=Bug%20Report',
  },
];

export default function PasswordManagerSupportPage() {
  return (
    <PasswordManagerLegalLayout
      eyebrow="SUPPORT"
      title="We’re here to help with your secure password manager."
      subtitle="Email us, browse the FAQ, or jump to the resources below. Replies typically land within 1–2 business days."
    >
      {/* Contact card */}
      <div className="mt-2 rounded-2xl border border-border bg-bg-secondary p-6 md:p-8 flex flex-wrap items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent inline-flex items-center justify-center">
          <Mail size={22} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="label-mono text-text-muted">EMAIL</p>
          <a
            href="mailto:help@nextechlabs.org?subject=Password%20Vault%20Support"
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
    </PasswordManagerLegalLayout>
  );
}
