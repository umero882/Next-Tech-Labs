import { cn } from '@/lib/cn';

/**
 * @param {Object} props
 * @param {'outline'|'accent'|'success'|'warning'|'muted'} [props.variant='outline']
 */
export function Badge({ variant = 'outline', className, children, ...rest }) {
  const variants = {
    outline: 'border border-border text-text-muted bg-transparent',
    accent:  'border border-[var(--color-accent-border)] text-accent bg-accent-light',
    success: 'border border-success/30 text-success bg-success-light',
    warning: 'border border-warning/30 text-warning bg-warning-light',
    muted:   'border border-border-muted text-text-muted bg-bg-tertiary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md',
        'text-[11px] font-mono uppercase tracking-wider whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
