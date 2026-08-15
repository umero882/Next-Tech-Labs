import { AlertTriangle, Info, ShieldAlert, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Article typography for blog posts.
 *
 * Deliberately separate from `pages/projects/legalProse.jsx`: legal pages are
 * dense and small, articles are read top-to-bottom at a larger size with
 * scroll-margin on headings so the in-page table of contents lands correctly.
 */

/** @param {{children: React.ReactNode}} props */
export function Lead({ children }) {
  return (
    <p className="mt-2 mb-8 text-text-secondary text-lg md:text-xl leading-relaxed">{children}</p>
  );
}

/**
 * @param {Object} props
 * @param {string} props.id Anchor target — must match the table-of-contents entry.
 */
export function H2({ id, children }) {
  return (
    <h2
      id={id}
      className="mt-14 mb-4 font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight scroll-mt-24"
    >
      {children}
    </h2>
  );
}

export function H3({ id, children }) {
  return (
    <h3
      id={id}
      className="mt-9 mb-2 font-display text-lg md:text-xl font-semibold text-text-primary tracking-tight scroll-mt-24"
    >
      {children}
    </h3>
  );
}

/** @param {{className?: string}} props */
export function P({ className, children }) {
  return (
    <p className={cn('my-5 text-text-secondary text-[17px] leading-[1.75]', className)}>
      {children}
    </p>
  );
}

export function UL({ children }) {
  return (
    <ul className="my-5 ml-6 list-disc space-y-2.5 text-text-secondary text-[17px] leading-[1.7] marker:text-accent">
      {children}
    </ul>
  );
}

export function OL({ children }) {
  return (
    <ol className="my-5 ml-6 list-decimal space-y-2.5 text-text-secondary text-[17px] leading-[1.7] marker:text-accent marker:font-mono">
      {children}
    </ol>
  );
}

/** @param {{href: string}} props */
export function A({ href, children }) {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-accent hover:underline underline-offset-4 decoration-[var(--color-accent-border)]"
    >
      {children}
    </a>
  );
}

export function Strong({ children }) {
  return <strong className="text-text-primary font-semibold">{children}</strong>;
}

const calloutTones = {
  note: {
    icon: Info,
    wrap: 'border-l-[var(--color-accent)]',
    chip: 'bg-accent-light text-accent',
  },
  success: {
    icon: Check,
    wrap: 'border-l-[var(--color-success)]',
    chip: 'bg-success-light text-[var(--color-success)]',
  },
  warn: {
    icon: AlertTriangle,
    wrap: 'border-l-[var(--color-warning)]',
    chip: 'bg-warning-light text-[var(--color-warning)]',
  },
  danger: {
    icon: ShieldAlert,
    wrap: 'border-l-[var(--color-error)]',
    chip: 'bg-[rgba(248,81,73,0.10)] text-[var(--color-error)]',
  },
};

/**
 * Pull-out block. `danger` is reserved for genuine emergency instructions —
 * this is a children's-health blog, so the loudest style stays scarce.
 *
 * @param {Object} props
 * @param {'note'|'success'|'warn'|'danger'} [props.tone='note']
 * @param {string} [props.title]
 */
export function Callout({ tone = 'note', title, children }) {
  const t = calloutTones[tone] ?? calloutTones.note;
  const Icon = t.icon;

  return (
    <aside
      className={cn(
        'my-8 rounded-xl border border-border border-l-4 bg-bg-secondary p-5 md:p-6',
        t.wrap,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn('mt-0.5 flex-none w-8 h-8 rounded-lg inline-flex items-center justify-center', t.chip)}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          {title && (
            <p className="font-display text-base font-semibold text-text-primary">{title}</p>
          )}
          <div className="text-text-secondary leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * Citation list rendered at the foot of a post. Real sources, linked — the
 * single biggest trust signal a health article can carry.
 *
 * @param {{items: Array<{label: string, href: string}>}} props
 */
export function Sources({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="mt-14 pt-8 border-t border-border">
      <p className="label-mono text-text-muted">SOURCES</p>
      <ul className="mt-4 space-y-2">
        {items.map((s) => (
          <li key={s.href} className="text-sm text-text-muted leading-relaxed">
            <A href={s.href}>{s.label}</A>
          </li>
        ))}
      </ul>
    </section>
  );
}
