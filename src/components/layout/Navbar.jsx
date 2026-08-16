import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  STUDIO_NAV_ITEMS,
  matchProjectRoute,
  projectNavItems,
  projectCta,
} from '@/lib/nav';
import { cn } from '@/lib/cn';

const STUDIO_CTA = { label: 'Start a project', to: '/contact' };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setOpen(false);

  // Inside a project, the whole nav belongs to that product. The wordmark stays
  // as the way back to the studio, and "Home" means the main site.
  const project = matchProjectRoute(pathname);
  const items = project ? projectNavItems(project) : STUDIO_NAV_ITEMS;
  const cta = project ? projectCta(project) : STUDIO_CTA;

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'bg-bg-primary/80 backdrop-blur-xl',
        'border-b border-border',
      )}
    >
      <Container className="flex items-center justify-between h-16 gap-4">
        {/* Wordmark, plus the product whose nav this is */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group flex-none">
            <Logo />
            <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
              Next Tech<span className="text-accent">.</span>Labs
            </span>
          </Link>
          {project && (
            <span className="hidden sm:flex items-center gap-2.5 min-w-0">
              <span className="text-text-muted" aria-hidden="true">/</span>
              <span className="label-mono text-text-muted truncate">{project.name}</span>
            </span>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          <NavItems items={items} variant="desktop" />
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2 flex-none">
          {cta && (
            <Link to={cta.to} className="hidden md:block">
              <Button size="sm">
                {cta.label} <ArrowUpRight size={14} strokeWidth={2} />
              </Button>
            </Link>
          )}

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-text-primary hover:bg-bg-tertiary"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-bg-primary"
          >
            <Container className="py-4 flex flex-col">
              {project && (
                <p className="label-mono text-text-muted pb-2">{project.name}</p>
              )}
              <NavItems items={items} variant="mobile" onNavigate={closeMenu} />
              {cta && (
                <Link to={cta.to} onClick={closeMenu} className="mt-3">
                  <Button size="md" className="w-full">
                    {cta.label} <ArrowUpRight size={14} strokeWidth={2} />
                  </Button>
                </Link>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * One renderer for both the desktop bar and the mobile sheet — they used to
 * carry duplicated markup that drifted.
 */
function NavItems({ items, variant, onNavigate }) {
  return items.map((item) => (
    <NavLink
      key={item.key ?? item.to}
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          variant === 'desktop'
            ? 'label-mono px-3 py-2 rounded-md transition-colors'
            : 'py-3 label-mono',
          isActive
            ? variant === 'desktop'
              ? 'text-accent bg-accent-light'
              : 'text-accent'
            : 'text-text-secondary hover:text-text-primary',
        )
      }
    >
      <span className="inline-flex items-center gap-1.5">
        {item.label}
        {item.soon && <SoonChip />}
      </span>
    </NavLink>
  ));
}

/** Marks a page the project has not published yet, before the click. */
function SoonChip() {
  return (
    <span className="label-mono text-[10px] leading-none px-1.5 py-0.5 rounded-full border border-border text-text-muted">
      soon
    </span>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0D1117" stroke="#30363D" />
      <path
        d="M16 46 V18 L32 38 V18 H40"
        stroke="#7F4DF3"
        strokeWidth="4"
        fill="none"
        strokeLinecap="square"
      />
      <circle cx="46" cy="46" r="3" fill="#27C45A" />
    </svg>
  );
}
