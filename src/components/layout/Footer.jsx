import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { company } from '@/data/company';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary mt-24">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <SectionLabel number="∞" label="THE STUDIO" />
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mt-4 leading-tight">
              {company.tagline}
            </h3>
            <p className="text-text-muted mt-4 max-w-md">
              {company.location}
            </p>
          </div>

          {/* Links */}
          <FooterColumn
            title="Site"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/projects' },
              { label: 'Categories', href: '/categories' },
              { label: 'Tech', href: '/tech' },
              { label: 'Contact', href: '/contact' },
              { label: 'About', href: '/about' },
            ]}
          />

          <FooterColumn
            title="Channels"
            items={[
              { label: 'Email', href: `mailto:${company.channels.email}`, external: true },
              { label: 'WhatsApp', href: company.channels.whatsapp, external: true },
              ...company.socials.map((s) => ({
                label: s.name,
                href: s.url,
                external: true,
              })),
            ]}
          />
        </div>

        {/* Hairline */}
        <div className="mt-16 pt-6 border-t border-border-muted flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="label-mono text-text-muted">
            Copyright © {new Date().getFullYear()} Next Tech Labs Inc. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/terms" className="label-mono text-text-muted hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="label-mono text-text-muted hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="label-mono text-text-muted hover:text-accent transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="md:col-span-3">
      <SectionLabel number="·" label={title.toUpperCase()} />
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link to={item.href} className="text-text-secondary hover:text-accent transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
