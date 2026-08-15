import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatPostDate, postPath } from '@/lib/blog';
import { cn } from '@/lib/cn';

/**
 * Blog index card. The whole card is one link — the title is the anchor text
 * search engines see, so it stays a real heading inside the link.
 *
 * @param {Object} props
 * @param {Object} props.post          Entry from `data/blog.js`.
 * @param {boolean} [props.featured=false] Wider treatment for the lead post.
 * @param {string} [props.className]
 */
export function BlogCard({ post, featured = false, className }) {
  return (
    <article className={cn('h-full', className)}>
      <Link
        to={postPath(post.slug)}
        className={cn(
          'group flex h-full flex-col rounded-2xl border border-border bg-bg-secondary',
          'p-6 md:p-7 transition-all hover:border-[var(--color-accent-border)] hover:-translate-y-0.5',
          featured && 'md:p-9',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <Badge variant="muted">{post.topic}</Badge>
          <ArrowUpRight
            size={16}
            strokeWidth={1.75}
            className="flex-none text-text-muted group-hover:text-accent transition-colors"
          />
        </div>

        <h2
          className={cn(
            'mt-5 font-display font-semibold text-text-primary tracking-tight leading-snug',
            featured ? 'text-2xl md:text-3xl' : 'text-xl',
          )}
        >
          {post.headline}
        </h2>

        <p
          className={cn(
            'mt-3 text-text-secondary leading-relaxed',
            featured ? 'text-[17px] max-w-2xl' : 'text-[15px]',
          )}
        >
          {post.description}
        </p>

        <div className="mt-6 pt-5 border-t border-border-muted flex items-center gap-4 label-mono text-text-muted">
          <time dateTime={post.published} className="tabular">
            {formatPostDate(post.published)}
          </time>
          <span className="inline-flex items-center gap-1.5 tabular">
            <Clock size={12} strokeWidth={1.75} /> {post.readingMinutes} min
          </span>
        </div>
      </Link>
    </article>
  );
}
