import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { H2, H3, P, UL, A, Strong } from '@/pages/projects/legalProse';
import { company } from '@/data/company';

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 25% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 80% 100%, rgba(127,77,243,0.14) 0%, transparent 50%)
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
            <span className="label-mono text-text-muted">PRIVACY POLICY</span>
          </div>

          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-3xl">
            What we collect on this site, and what we don’t.
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed max-w-2xl">
            This policy describes how the studio's portfolio site at{' '}
            <A href="https://nextechlabs.org">nextechlabs.org</A> handles information. This site is a
            marketing surface — it has no accounts, no shopping cart, and no advertising trackers.
          </p>
          <p className="mt-4 label-mono text-text-muted tabular">
            Effective date: 7 May 2026 · Last updated: 7 May 2026
          </p>

          <div className="mt-8 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-success)] p-5 max-w-3xl">
            <P>
              <Strong>The short version:</Strong> we don't run analytics, we don't use third‑party
              advertising or tracking SDKs, and the only personal data we ever see is what you choose to
              type into our contact form or email to us.
            </P>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-20 max-w-3xl">
        <H2>1. Who we are</H2>
        <P>
          “Next Tech Labs”, “we”, “us”, “our” means <Strong>Next Tech Labs Inc.</Strong> Reach us at{' '}
          <A href={`mailto:${company.channels.email}`}>{company.channels.email}</A>.
        </P>

        <H2>2. Information we collect</H2>

        <H3>Information you give us</H3>
        <UL>
          <li>
            <Strong>Contact form / email.</Strong> Your name, email, optional company, optional project
            type / budget / timeline, and the message you write. Used only to reply to your inquiry.
          </li>
          <li>
            <Strong>WhatsApp message you initiate.</Strong> Standard WhatsApp metadata visible to the
            recipient (your phone number, profile name).
          </li>
        </UL>

        <H3>Information collected automatically</H3>
        <UL>
          <li>
            <Strong>Server access logs.</Strong> Our reverse proxy (Traefik) records IP address, request
            URL, user‑agent, and response code for security and operational diagnostics. Logs are kept on
            the operator's VPS for ≤ 30 days and not exported anywhere.
          </li>
          <li>
            <Strong>TLS handshake.</Strong> Standard cryptographic information needed to serve HTTPS.
          </li>
        </UL>

        <H3>Information we explicitly do <em>not</em> collect</H3>
        <UL>
          <li>No analytics SDKs (Google Analytics, Plausible, etc.).</li>
          <li>No advertising or marketing trackers, no Facebook Pixel, no LinkedIn Insight tag.</li>
          <li>No cookies set by the application itself.</li>
          <li>No fingerprinting, no session replay, no heatmaps.</li>
          <li>No third‑party data brokers — your data is never sold or rented.</li>
        </UL>

        <H2>3. Third‑party services we depend on</H2>

        <P>
          The site uses the bare minimum of third‑party services to function. Each is listed for
          transparency:
        </P>

        <div className="my-6 rounded-xl border border-border bg-bg-secondary overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-accent-light">
              <tr>
                <th className="text-left px-4 py-3 font-mono text-text-primary">Service</th>
                <th className="text-left px-4 py-3 font-mono text-text-primary">Purpose</th>
                <th className="text-left px-4 py-3 font-mono text-text-primary">Data shared</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                [
                  'Google Fonts',
                  'Serve Bricolage Grotesque, Geist, JetBrains Mono webfonts',
                  'Your IP address (to Google), as required to fetch the font files',
                ],
                [
                  "Let's Encrypt (ISRG)",
                  'TLS certificates for the domain',
                  'Domain name only',
                ],
                [
                  'Hostinger',
                  'VPS hosting and DNS for nextechlabs.org',
                  'Standard server-access metadata',
                ],
                [
                  'GitHub',
                  'Public source code repository (only relevant if you visit the repo)',
                  'Whatever GitHub records about visitors to the public repo',
                ],
              ].map(([s, p, d]) => (
                <tr key={s} className="text-text-secondary">
                  <td className="px-4 py-3 align-top">{s}</td>
                  <td className="px-4 py-3 align-top">{p}</td>
                  <td className="px-4 py-3 align-top">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2>4. How we use what you send us</H2>
        <UL>
          <li><Strong>Reply to your inquiry.</Strong> The only purpose.</li>
          <li>
            <Strong>Operational records.</Strong> We keep the message thread until either party closes the
            conversation, or until we no longer need it for the engagement we discussed.
          </li>
        </UL>
        <P>
          We <Strong>do not</Strong> add you to any mailing list. We <Strong>do not</Strong> use your data
          to train any model. We <Strong>do not</Strong> share it with anyone outside the studio without
          your explicit, prior consent.
        </P>

        <H2>5. Where data lives</H2>
        <UL>
          <li>Server logs and contact submissions reach our VPS hosted at Hostinger.</li>
          <li>Email replies travel through standard email infrastructure and end up in our inbox.</li>
          <li>No external CRM, no marketing automation tool.</li>
        </UL>

        <H2>6. Your rights</H2>
        <P>
          You have the right to access, correct, or delete any personal data you've sent us. To exercise
          these rights, email us at{' '}
          <A href={`mailto:${company.channels.email}?subject=Data%20Request`}>
            {company.channels.email}
          </A>
          .
        </P>
        <P>
          If you are in the EU, UK, California, or another region with specific data‑protection laws, you
          may have additional rights including the right to lodge a complaint with your local
          data‑protection authority.
        </P>

        <H2>7. Security</H2>
        <P>
          The site is served over HTTPS only with TLS certificates issued by Let's Encrypt. The
          administration interface is firewalled at the cloud edge, gated behind two‑factor authentication,
          and reachable only via private network or a TLS‑fronted FQDN with strong access controls.
        </P>

        <H2>8. Children</H2>
        <P>
          The site is not directed at children under 13 and we don't knowingly collect personal data from
          them. If you believe a child has sent us data, email us and we will delete it promptly.
        </P>

        <H2>9. Changes to this policy</H2>
        <P>
          We may update this Privacy Policy as the site evolves. Material changes will be reflected in the
          “Last updated” date above. Continued use of the site after a change is your acknowledgement of
          the updated policy.
        </P>

        <H2>10. Contact</H2>
        <P>
          Questions, concerns, or requests about your data? Email us at{' '}
          <A href={`mailto:${company.channels.email}?subject=Privacy%20Question`}>
            {company.channels.email}
          </A>
          . We aim to reply within 1–2 business days.
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
          Looking for the Password Vault product privacy policy?{' '}
          <Link to="/projects/password-manager/privacy" className="text-accent hover:underline">
            See the product‑specific Privacy Policy
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
