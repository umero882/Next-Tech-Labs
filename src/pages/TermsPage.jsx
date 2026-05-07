import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { H2, H3, P, UL, A, Strong } from '@/pages/projects/legalProse';
import { company } from '@/data/company';

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 0%, rgba(127,77,243,0.16) 0%, transparent 55%),
              radial-gradient(at 80% 100%, rgba(39,196,90,0.14) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-12 md:pt-20 pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.75} /> Home
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge variant="muted">Next Tech Labs Inc.</Badge>
            <span className="label-mono text-text-muted">·</span>
            <span className="label-mono text-text-muted">TERMS OF SERVICE</span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-3xl">
            The agreement between you and Next Tech Labs.
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed max-w-2xl">
            These Terms govern your use of <A href="https://nextechlabs.org">nextechlabs.org</A>, the
            studio's portfolio website. The site is informational and does not require an account.
          </p>
          <p className="mt-4 label-mono text-text-muted tabular">
            Effective date: 7 May 2026 · Last updated: 7 May 2026
          </p>
        </Container>
      </section>

      <Container className="py-14 md:py-20 max-w-3xl">
        <H2>1. Who we are</H2>
        <P>
          “Next Tech Labs”, “we”, “us”, “our” means <Strong>Next Tech Labs Inc.</Strong>, the studio that
          designs and operates this site. Reach us at{' '}
          <A href={`mailto:${company.channels.email}`}>{company.channels.email}</A>.
        </P>

        <H2>2. The site</H2>
        <P>
          This is a marketing and portfolio website. It does not provide a software service to you, store
          accounts, accept payments, or process orders. References on the site to specific products
          (Password Vault, Ethiopian Maids, etc.) point to separate offerings governed by their own terms.
        </P>

        <H2>3. Acceptable use</H2>
        <P>You agree not to:</P>
        <UL>
          <li>Use the site to violate any law or third‑party right.</li>
          <li>Attempt to disrupt, attack, or gain unauthorized access to the site or its infrastructure.</li>
          <li>Scrape, mirror, or republish substantial portions of the site without our written consent.</li>
          <li>Misrepresent the studio, its work, or its team.</li>
        </UL>

        <H2>4. Intellectual property</H2>
        <P>
          All content on the site — including written copy, graphics, logos, and code — is owned by
          Next Tech Labs Inc. or its licensors and protected by copyright and trademark law. Project covers
          and screenshots remain the property of their respective owners.
        </P>
        <P>
          The source code of this website is published publicly at{' '}
          <A href="https://github.com/umero882/Next-Tech-Labs">github.com/umero882/Next-Tech-Labs</A>{' '}
          under the licence stated in that repository. Nothing in these Terms grants you any rights in our
          trademarks or branding.
        </P>

        <H2>5. Inquiries you send us</H2>
        <P>
          When you fill out the <A href="/contact">contact form</A> or email us, you give us permission to
          read, retain, and reply to that message. We do not subscribe you to any list, share your message
          with third parties, or use it for advertising. See our{' '}
          <A href="/privacy">Privacy Policy</A> for the full posture.
        </P>

        <H2>6. Third‑party links</H2>
        <P>
          The site links out to third‑party services (GitHub, social platforms, Google Fonts, etc.). We are
          not responsible for the content, terms, or privacy practices of those services. Visiting them is
          at your own discretion.
        </P>

        <H2>7. Disclaimer</H2>
        <P>
          The site is provided <Strong>as‑is</Strong>, without warranty of any kind. We don’t warrant that
          the site will be uninterrupted, error‑free, or free of harmful components. Project status labels
          (“live”, “beta”, “concept”) reflect our honest assessment but are not guarantees.
        </P>

        <H2>8. Limitation of liability</H2>
        <P>
          To the maximum extent permitted by law, Next Tech Labs Inc. and its affiliates will not be liable
          for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits
          or revenue, arising out of or related to your use of the site.
        </P>

        <H2>9. Changes</H2>
        <P>
          We may update these Terms as the site evolves. When we make material changes we will update the
          “Last updated” date above. Continuing to use the site after changes are posted means you accept
          the updated Terms.
        </P>

        <H2>10. Governing law</H2>
        <P>
          These Terms are governed by the laws of the jurisdiction in which Next Tech Labs Inc. is
          established, without regard to its conflict‑of‑laws provisions, and except where prohibited by the
          mandatory consumer‑protection laws of your country of residence.
        </P>

        <H2>11. Contact</H2>
        <P>
          Questions? Email us at{' '}
          <A href={`mailto:${company.channels.email}?subject=Terms%20Question`}>
            {company.channels.email}
          </A>
          .
        </P>

        <footer className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-sm text-text-muted">
          <p className="tabular">
            Copyright © {new Date().getFullYear()} Next Tech Labs Inc. All rights reserved.
          </p>
          <a
            href={`mailto:${company.channels.email}`}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <Mail size={14} strokeWidth={1.75} /> {company.channels.email}
          </a>
        </footer>
      </Container>

      <Container className="pb-16">
        <SectionLabel number="·" label="ALSO" className="mb-3" />
        <p className="text-text-muted text-sm">
          Looking for the Password Vault product terms?{' '}
          <Link to="/projects/password-manager/terms" className="text-accent hover:underline">
            See the product‑specific Terms of Use
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
