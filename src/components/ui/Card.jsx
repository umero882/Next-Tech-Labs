import { cn } from '@/lib/cn';

export function Card({ className, children, ...rest }) {
  return (
    <div
      className={cn(
        'bg-bg-secondary border border-border rounded-2xl',
        'transition-colors duration-300',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
