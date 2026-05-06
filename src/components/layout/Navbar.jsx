import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const links = [
  { to: '/',           label: 'Home', end: true },
  { to: '/projects',   label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/tech',       label: 'Tech' },
  { to: '/contact',    label: 'Contact' },
  { to: '/about',      label: 'About' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'bg-bg-primary/80 backdrop-blur-xl',
        'border-b border-border',
      )}
    >
      <Container className="flex items-center justify-between h-16">
        {/* Wordmark */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 group">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
            Next Tech<span className="text-accent">.</span>Labs
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'label-mono px-3 py-2 rounded-md transition-colors',
                  isActive
                    ? 'text-accent bg-accent-light'
                    : 'text-text-secondary hover:text-text-primary',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden md:block">
            <Button size="sm">
              Start a project <ArrowUpRight size={14} strokeWidth={2} />
            </Button>
          </Link>

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
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn(
                      'py-3 label-mono',
                      isActive ? 'text-accent' : 'text-text-secondary',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={closeMenu} className="mt-3">
                <Button size="md" className="w-full">
                  Start a project <ArrowUpRight size={14} strokeWidth={2} />
                </Button>
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
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
