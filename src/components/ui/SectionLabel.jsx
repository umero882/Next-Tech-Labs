import { cn } from '@/lib/cn';

/**
 * Editorial label: "01 / WORK"
 *
 * @param {Object} props
 * @param {string} props.number e.g. "01"
 * @param {string} props.label  e.g. "WORK"
 */
export function SectionLabel({ number, label, className }) {
  return (
    <p className={cn('label-mono', className)}>
      <span className="text-text-muted tabular">{number}</span>
      <span className="text-accent"> / </span>
      <span className="text-text-primary">{label}</span>
    </p>
  );
}
