import { cn } from '@/lib/cn';

/**
 * Official Apple / Google download badges for a store-listed app.
 *
 * Google's PNG ships with ~33% transparent padding, so it is rendered taller
 * than the App Store SVG to make the *visible* buttons line up at equal height.
 * A missing store URL renders a grayed "Coming soon" badge rather than
 * disappearing, so the slot keeps its shape while one platform is in review.
 *
 * @param {Object} props
 * @param {string} [props.appStore]   Apple App Store listing URL.
 * @param {string} [props.playStore]  Google Play listing URL.
 * @param {string} props.appName      Used in the aria-labels.
 * @param {'md'|'lg'} [props.size='md']
 * @param {string} [props.className]
 */
export function StoreBadges({ appStore, playStore, appName, size = 'md', className, ...rest }) {
  const apple = size === 'lg' ? 'h-[52px]' : 'h-11';
  const google = size === 'lg' ? 'h-[78px]' : 'h-[66px]';

  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-2', className)} {...rest}>
      {appStore ? (
        <a
          href={appStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download ${appName} on the App Store`}
          className="inline-block transition-opacity hover:opacity-80"
        >
          <img
            src="/badges/app-store.svg"
            alt="Download on the App Store"
            className={cn(apple, 'w-auto')}
          />
        </a>
      ) : (
        <ComingSoon src="/badges/app-store.svg" alt="App Store" height={apple} appName={appName} />
      )}

      {playStore ? (
        <a
          href={playStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get ${appName} on Google Play`}
          className="inline-block transition-opacity hover:opacity-80"
        >
          <img
            src="/badges/google-play.png"
            alt="Get it on Google Play"
            className={cn(google, 'w-auto')}
          />
        </a>
      ) : (
        <ComingSoon
          src="/badges/google-play.png"
          alt="Google Play"
          height={google}
          appName={appName}
        />
      )}
    </div>
  );
}

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {string} props.height Tailwind height class.
 * @param {string} props.appName
 */
function ComingSoon({ src, alt, height, appName }) {
  return (
    <div className="relative inline-block" aria-label={`${appName} on ${alt} — coming soon`}>
      <img
        src={src}
        alt={`${alt} — coming soon`}
        className={cn(height, 'w-auto opacity-30 grayscale')}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-full bg-bg-primary/85 border border-border px-2.5 py-0.5 label-mono text-[10px] text-text-secondary whitespace-nowrap">
          Coming soon
        </span>
      </span>
    </div>
  );
}
