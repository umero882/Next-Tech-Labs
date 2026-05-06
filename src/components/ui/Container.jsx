import { cn } from '@/lib/cn';

/**
 * Page-width wrapper. Always use this — never reinvent.
 */
export function Container({ as: As = 'div', className, children, ...rest }) {
  return (
    <As
      className={cn('mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12', className)}
      {...rest}
    >
      {children}
    </As>
  );
}
