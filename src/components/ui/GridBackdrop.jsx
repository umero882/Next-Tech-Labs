import { cn } from '@/lib/cn';

/**
 * Decorative dot-grid backdrop. Place inside a relative parent.
 * Pure CSS — no images.
 */
export function GridBackdrop({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 grid-backdrop',
        className,
      )}
    />
  );
}
