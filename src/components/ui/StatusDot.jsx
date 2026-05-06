import { cn } from '@/lib/cn';

const config = {
  live:             { color: 'bg-success', label: 'Live' },
  beta:             { color: 'bg-warning', label: 'Beta' },
  'in-development': { color: 'bg-accent',  label: 'In Dev' },
  concept:          { color: 'bg-text-muted', label: 'Concept' },
};

export function StatusDot({ status = 'concept', className }) {
  const { color, label } = config[status] ?? config.concept;
  return (
    <span className={cn('inline-flex items-center gap-2 label-mono text-text-muted', className)}>
      <span className={cn('relative flex h-2 w-2')}>
        {status === 'live' && (
          <span
            className={cn('absolute inset-0 rounded-full opacity-60 animate-ping', color)}
            style={{ animationDuration: '2s' }}
          />
        )}
        <span className={cn('relative inline-block h-2 w-2 rounded-full', color)} />
      </span>
      {label}
    </span>
  );
}
