export function H2({ children, id }) {
  return (
    <h2
      id={id}
      className="mt-12 mb-4 font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight scroll-mt-24"
    >
      {children}
    </h2>
  );
}

export function H3({ children }) {
  return (
    <h3 className="mt-7 mb-2 font-display text-lg font-semibold text-text-primary tracking-tight">
      {children}
    </h3>
  );
}

export function P({ children, className = '' }) {
  return (
    <p className={`my-4 text-text-secondary leading-relaxed ${className}`}>{children}</p>
  );
}

export function UL({ children }) {
  return (
    <ul className="my-4 ml-6 list-disc space-y-2 text-text-secondary leading-relaxed marker:text-text-muted">
      {children}
    </ul>
  );
}

export function OL({ children }) {
  return (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-text-secondary leading-relaxed marker:text-text-muted">
      {children}
    </ol>
  );
}

export function A({ href, children }) {
  const external = href?.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-accent hover:underline underline-offset-4 decoration-[var(--color-accent-border)]"
    >
      {children}
    </a>
  );
}

export function Strong({ children }) {
  return <strong className="text-text-primary font-semibold">{children}</strong>;
}

export function LegalEmphasis({ children }) {
  return (
    <p className="my-4 uppercase text-xs tracking-wider font-semibold text-text-primary leading-relaxed">
      {children}
    </p>
  );
}
