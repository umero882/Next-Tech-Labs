import { PasswordManagerLegalLayout } from './PasswordManagerLegalLayout';
import { H2, H3, P, UL, A, Strong, LegalEmphasis } from './legalProse';

const toc = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'service', label: 'The Service' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'account', label: 'Account & Master Password' },
  { id: 'license', label: 'License to Use' },
  { id: 'subscription', label: 'Premium Subscriptions' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'user-content', label: 'Your Vault Data' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'third-parties', label: 'Third-Party Services' },
  { id: 'warranty', label: 'Disclaimer of Warranties' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'termination', label: 'Termination' },
  { id: 'changes', label: 'Changes to These Terms' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact' },
];

export default function PasswordManagerTermsPage() {
  return (
    <PasswordManagerLegalLayout
      eyebrow="TERMS OF USE"
      title="The agreement between you and Next Tech Labs."
      subtitle="These Terms form a binding agreement covering your use of the Password Vault mobile application and related services. Please read carefully — by installing or using the App you agree to these Terms."
      effective="Effective date: 5 May 2026 · Last updated: 5 May 2026"
      callout={
        <P>
          <Strong>Plain-language summary.</Strong> The App helps you store passwords and secure notes
          encrypted on your device. You’re responsible for your master password — we cannot recover it.
          Premium subscriptions auto-renew through your device’s app store. The App is provided as-is with
          reasonable best-effort security guarantees.
        </P>
      }
    >
      {/* TOC */}
      <nav
        aria-label="Contents"
        className="my-2 rounded-2xl border border-border bg-bg-secondary p-5 md:p-6"
      >
        <p className="label-mono text-text-muted mb-3">CONTENTS</p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-decimal pl-5 text-sm marker:text-text-muted">
          {toc.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-text-secondary hover:text-accent transition-colors">
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <H2 id="acceptance">1. Acceptance of Terms</H2>
      <P>
        By creating a vault, signing in, or otherwise using the App, you confirm that you have read,
        understood, and agree to these Terms and to our{' '}
        <A href="/projects/password-manager/privacy">Privacy Policy</A>. If you do not agree, do not use the
        App.
      </P>

      <H2 id="service">2. The Service</H2>
      <P>
        Password Vault is a personal password manager that stores passwords, secure notes, and attachments
        in an encrypted vault on your device. Optional features include cloud backup, biometric unlock, and
        two-factor authentication. We reserve the right to add, modify, suspend, or discontinue features at
        any time.
      </P>

      <H2 id="eligibility">3. Eligibility</H2>
      <P>
        You must be at least 13 years old to use the App. If you are between 13 and the age of legal majority
        in your jurisdiction, you must have the consent of a parent or legal guardian. The App is not
        intended for children under 13.
      </P>

      <H2 id="account">4. Account &amp; Master Password</H2>
      <P>
        Optional account features (cloud backup, multi-device sync) require a Next Tech Labs account. You are
        responsible for maintaining the confidentiality of your account credentials and your master
        password.
      </P>
      <div className="my-6 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-warning)] p-5">
        <P className="my-0">
          <Strong>Master password recovery.</Strong> Your master password is never transmitted to our servers
          and is not recoverable by us. If you forget it, you may lose access to your vault unless you have
          enabled phone-lock recovery or maintained a separate exported backup. We strongly recommend keeping
          a written copy of your master password in a secure offline location.
        </P>
      </div>
      <P>
        You agree to notify us immediately at{' '}
        <A href="mailto:help@nextechlabs.org?subject=Security%20Concern">help@nextechlabs.org</A> of any
        unauthorized use of your account or any other security breach. We are not liable for any loss or
        damage arising from your failure to keep your credentials secure.
      </P>

      <H2 id="license">5. License to Use</H2>
      <P>
        Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable,
        revocable license to install and use the App on devices you own or control, solely for your
        personal, non-commercial use. This license does not transfer ownership of any intellectual property
        to you.
      </P>

      <H2 id="subscription">6. Premium Subscriptions</H2>
      <H3>Subscription terms</H3>
      <UL>
        <li>The App offers monthly and annual auto-renewing subscriptions (“Premium”) that unlock additional features.</li>
        <li>Pricing is shown in the App and on the relevant app store. Prices may vary by region, and applicable taxes may be added at checkout.</li>
        <li>Payment is charged to your Apple ID or Google Play account at the start of each billing period.</li>
        <li>Subscriptions automatically renew at the end of each billing period at the then-current price unless cancelled at least 24 hours before the renewal date.</li>
      </UL>

      <H3>How to cancel</H3>
      <P>Subscription management is handled by the relevant app store, not by us:</P>
      <UL>
        <li>
          <Strong>iOS:</Strong> Settings → [Your Name] → Subscriptions → Password Vault → Cancel.
        </li>
        <li>
          <Strong>Android:</Strong> Google Play Store → Menu → Subscriptions → Password Vault → Cancel.
        </li>
      </UL>
      <P>Cancellation takes effect at the end of the current billing period. You retain Premium access until then.</P>

      <H3>Refunds</H3>
      <P>
        Refunds are governed by the policies of the Apple App Store and the Google Play Store. We do not
        directly process refunds. To request a refund, contact the relevant app store.
      </P>

      <H3>Free trials and promotions</H3>
      <P>
        Where free trials or promotional pricing are offered, the trial converts automatically to a paid
        subscription at the end of the trial period unless cancelled before then. Each user is eligible for
        at most one free trial per subscription tier.
      </P>

      <H2 id="acceptable-use">7. Acceptable Use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>Use the App for any unlawful purpose or in violation of any applicable law.</li>
        <li>Reverse engineer, decompile, or disassemble the App, except to the extent permitted by applicable law.</li>
        <li>Distribute, resell, sublicense, lease, or otherwise transfer the App.</li>
        <li>Attempt to gain unauthorized access to our systems, other users’ accounts, or any data not belonging to you.</li>
        <li>Use the App to store, transmit, or process material that is illegal, infringing, malicious, or abusive.</li>
        <li>Interfere with or disrupt the integrity, security, or performance of the App or related services.</li>
        <li>Use any automated means to access the App in a manner that places undue load on our systems.</li>
      </UL>

      <H2 id="user-content">8. Your Vault Data</H2>
      <P>
        You retain all ownership of the data you store in the App (“Vault Data”). Because the App uses
        zero-knowledge encryption, we cannot access, view, or use your Vault Data for any purpose. You are
        solely responsible for the legality, accuracy, and consequences of the data you store.
      </P>
      <P>
        You are responsible for maintaining your own backups of important data. While we make reasonable
        efforts to protect cloud-backed encrypted data, we do not guarantee against data loss.
      </P>

      <H2 id="ip">9. Intellectual Property</H2>
      <P>
        The App, including all software, designs, text, graphics, trademarks, and logos, is owned by Next
        Tech Labs or its licensors and is protected by copyright, trademark, and other intellectual property
        laws. Nothing in these Terms grants you any right to our trademarks or branding.
      </P>

      <H2 id="third-parties">10. Third-Party Services</H2>
      <P>
        The App relies on third-party services (Firebase, RevenueCat, Apple App Store, Google Play Store) to
        operate. Your use of those services is subject to their own terms, listed in our{' '}
        <A href="/projects/password-manager/privacy">Privacy Policy</A>. We are not responsible for, and do
        not control, the practices of any third party.
      </P>

      <H2 id="warranty">11. Disclaimer of Warranties</H2>
      <LegalEmphasis>
        THE APP IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
        INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        AND NON-INFRINGEMENT.
      </LegalEmphasis>
      <P>
        We do not warrant that the App will be uninterrupted, error-free, secure, or free of viruses or
        other harmful components. While we apply industry-standard encryption and security practices, no
        system can be guaranteed perfectly secure. Use of the App is at your own risk.
      </P>

      <H2 id="liability">12. Limitation of Liability</H2>
      <LegalEmphasis>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEXT TECH LABS AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND
        AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
        INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO
        YOUR USE OF THE APP.
      </LegalEmphasis>
      <P>
        In no event will our aggregate liability exceed the greater of (a) the amount you paid us in the 12
        months preceding the claim, or (b) USD 50.
      </P>
      <P>
        Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of these
        limitations may not apply to you.
      </P>

      <H2 id="indemnification">13. Indemnification</H2>
      <P>
        You agree to indemnify, defend, and hold harmless Next Tech Labs and its affiliates from any claims,
        damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of (a) your
        use or misuse of the App, (b) your violation of these Terms, or (c) your violation of any third-party
        rights.
      </P>

      <H2 id="termination">14. Termination</H2>
      <P>
        You may stop using the App at any time and delete your account through the in-app option at{' '}
        <em>Profile → Account → Delete Account</em>. We may suspend or terminate your access if we
        reasonably believe you have violated these Terms or if continuing to provide the App becomes
        commercially impracticable.
      </P>
      <P>
        Sections that by their nature should survive termination — including the disclaimer of warranties,
        limitation of liability, indemnification, intellectual-property, and governing-law provisions — will
        survive.
      </P>

      <H2 id="changes">15. Changes to These Terms</H2>
      <P>
        We may update these Terms from time to time. When we make material changes, we will update the “Last
        updated” date at the top of this page and, where appropriate, notify you in the App. Continuing to
        use the App after changes are posted means you accept the updated Terms. If you disagree with the
        changes, your only remedy is to stop using the App.
      </P>

      <H2 id="governing-law">16. Governing Law</H2>
      <P>
        These Terms are governed by the laws of the jurisdiction in which Next Tech Labs is established,
        without regard to its conflict-of-laws provisions. Any disputes shall be resolved in the courts
        located in that jurisdiction, except where prohibited by mandatory consumer-protection laws of your
        country of residence.
      </P>

      <H2 id="contact">17. Contact</H2>
      <P>
        Questions about these Terms? Email us at{' '}
        <A href="mailto:help@nextechlabs.org?subject=Terms%20Question">help@nextechlabs.org</A>.
      </P>
    </PasswordManagerLegalLayout>
  );
}
