import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const tabs = [
  { to: '/projects/password-manager/support', label: 'Support' },
  { to: '/projects/password-manager/privacy', label: 'Privacy' },
  { to: '/projects/password-manager/terms', label: 'Terms' },
];

export function PasswordManagerLegalLayout({
  eyebrow,
  title,
  subtitle,
  effective,
  callout,
  children,
}) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 25% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 80% 100%, rgba(127,77,243,0.14) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-12 md:pt-16 pb-10">
          <Link
            to="/projects/password-manager"
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.75} /> Password Vault overview
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge variant="muted">Next Tech Labs · Password Vault</Badge>
            <span className="label-mono text-text-muted">·</span>
            <span className="label-mono text-text-muted">{eyebrow}</span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-3xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-text-secondary text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          {effective && (
            <p className="mt-4 label-mono text-text-muted tabular">{effective}</p>
          )}

          {callout && (
            <div className="mt-8 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-success)] p-5 max-w-3xl">
              {callout}
            </div>
          )}

          <nav
            aria-label="Password Vault legal pages"
            className="mt-10 flex flex-wrap gap-2"
          >
            {tabs.map((t) => {
              const active = pathname === t.to;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={cn(
                    'label-mono px-3 py-1.5 rounded-full border transition-colors',
                    active
                      ? 'bg-accent-light border-[var(--color-accent-border)] text-accent'
                      : 'border-border text-text-secondary hover:text-text-primary hover:border-text-muted',
                  )}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </section>

      <Container className="py-14 md:py-20 max-w-3xl">
        <article className="prose-pm">{children}</article>

        <footer className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-sm text-text-muted">
          <p className="tabular">
            © {new Date().getFullYear()} Next Tech Labs · Password Vault
          </p>
          <a
            href="mailto:help@nextechlabs.org"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail size={14} strokeWidth={1.75} /> help@nextechlabs.org
          </a>
        </footer>
      </Container>
    </div>
  );
}
