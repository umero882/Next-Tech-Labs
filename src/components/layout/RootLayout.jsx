import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function RootLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // No hash: ordinary navigation, start at the top.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    // With a hash, scrolling to the top would fight the anchor. The target may
    // not exist yet -- routes are lazy, so the page can still be resolving --
    // so retry for about a second before giving up.
    // A malformed fragment (hand-edited URL, truncated paste) makes
    // decodeURIComponent throw. This app has no error boundary, so an uncaught
    // throw here would blank the whole page rather than just miss a scroll.
    // The value is only ever an id lookup, so the raw fragment is a fine
    // fallback.
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }
    let frames = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (frames++ < 60) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-secondary">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
