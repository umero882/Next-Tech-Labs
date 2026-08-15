import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';

/**
 * The conversion block for an article: what the app does about the thing you
 * just read, plus the official store badges.
 *
 * Store URLs come from `data/projects.js` so the blog can never drift out of
 * sync with the showcase page when a listing changes.
 *
 * @param {Object} props
 * @param {string} [props.appId='first-bite'] Project id in `data/projects.js`.
 * @param {string} [props.title]
 * @param {string} [props.body]
 * @param {'card'|'strip'} [props.variant='card'] `strip` is the lighter mid-article version.
 * @param {string} [props.className]
 */
export function DownloadCta({
  appId = 'first-bite',
  title = 'Track allergen introduction without the spreadsheet',
  body = 'First Bite runs the waiting windows, the maintenance reminders, and the reaction log for you — and scans a label to tell you whether it is safe for your baby, right now.',
  variant = 'card',
  className,
}) {
  const app = projects.find((p) => p.id === appId);
  if (!app) return null;

  const detailPath = `/projects/${app.id}`;
  const icon = app.cover?.image;

  if (variant === 'strip') {
    return (
      <aside
        className={cn(
          'my-10 rounded-2xl border border-border bg-bg-secondary p-6',
          'flex flex-wrap items-center justify-between gap-x-8 gap-y-5',
          className,
        )}
      >
        <div className="flex items-center gap-4 min-w-0">
          {icon && (
            <img
              src={icon}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-12 h-12 rounded-xl border border-border object-cover flex-none"
            />
          )}
          <div className="min-w-0">
            <p className="label-mono text-text-muted">GET THE APP</p>
            <p className="mt-1.5 font-display text-lg font-semibold text-text-primary leading-snug">
              {title}
            </p>
          </div>
        </div>
        <StoreBadges
          appStore={app.links?.appStore}
          playStore={app.links?.playStore}
          appName={app.name}
        />
      </aside>
    );
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border bg-bg-secondary p-8 md:p-10',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(39,196,90,0.16) 0%, transparent 55%), radial-gradient(circle at 90% 100%, rgba(127,77,243,0.16) 0%, transparent 50%)',
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          {icon && (
            <img
              src={icon}
              alt={`${app.name} app icon`}
              loading="lazy"
              className="w-14 h-14 rounded-2xl border border-border object-cover flex-none"
            />
          )}
          <div>
            <p className="label-mono text-text-muted">FREE ON iOS &amp; ANDROID</p>
            <p className="mt-1 font-display text-xl font-semibold text-text-primary">{app.name}</p>
          </div>
        </div>

        <h2 className="mt-7 font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight leading-tight max-w-xl">
          {title}
        </h2>
        <p className="mt-4 text-text-secondary leading-relaxed max-w-xl">{body}</p>

        <div className="mt-8">
          <StoreBadges
            appStore={app.links?.appStore}
            playStore={app.links?.playStore}
            appName={app.name}
            size="lg"
          />
        </div>

        <Link
          to={detailPath}
          className="mt-6 inline-flex items-center gap-2 label-mono text-text-secondary hover:text-accent transition-colors"
        >
          See how {app.name} works <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
