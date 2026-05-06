import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Button primitive.
 *
 * @param {Object} props
 * @param {'primary'|'outline'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  asChild = false,
  ...rest
}) {
  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-[0_0_0_0_rgba(127,77,243,0)] hover:shadow-[0_0_0_4px_rgba(127,77,243,0.18)]',
    outline:
      'bg-transparent text-accent border border-accent hover:bg-accent-light',
    ghost:
      'bg-transparent text-text-secondary hover:bg-accent-light hover:text-accent',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full',
        'font-mono font-medium tracking-tight',
        'transition-[background-color,box-shadow,color] duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        'disabled:opacity-40 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
