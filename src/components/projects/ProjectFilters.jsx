import { Search, X } from 'lucide-react';
import { categories } from '@/data/tech-stack';
import { cn } from '@/lib/cn';

/**
 * @param {Object} props
 * @param {string} props.category
 * @param {string} props.query
 * @param {(c: string) => void} props.onCategoryChange
 * @param {(q: string) => void} props.onQueryChange
 * @param {() => void} props.onReset
 * @param {number} props.totalCount
 * @param {number} props.filteredCount
 */
export function ProjectFilters({
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onReset,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          strokeWidth={1.75}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, stack, or outcome…"
          className={cn(
            'w-full h-12 pl-11 pr-12 rounded-full',
            'bg-bg-secondary border border-border',
            'text-text-primary placeholder:text-text-muted',
            'font-sans text-[15px]',
            'transition-colors',
            'focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30',
          )}
          aria-label="Search projects"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 inline-flex items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent-light"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const active = c.id === category;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onCategoryChange(c.id)}
              className={cn(
                'inline-flex items-center px-3.5 py-1.5 rounded-full',
                'label-mono transition-colors',
                'border',
                active
                  ? 'bg-accent-light text-accent border-[var(--color-accent-border)]'
                  : 'bg-transparent text-text-secondary border-border hover:text-text-primary hover:border-text-muted',
              )}
              aria-pressed={active}
            >
              {c.label}
            </button>
          );
        })}

        {(category !== 'all' || query) && (
          <button
            type="button"
            onClick={onReset}
            className="ml-1 label-mono text-text-muted hover:text-accent transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Count */}
      <p className="label-mono text-text-muted tabular">
        Showing <span className="text-text-primary">{filteredCount}</span> of{' '}
        <span className="text-text-primary">{totalCount}</span> projects
      </p>
    </div>
  );
}
