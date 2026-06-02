import { FirstBiteLegalLayout } from './FirstBiteLegalLayout';
import { H2, P, UL, A, Strong, LegalEmphasis } from './legalProse';

export default function FirstBiteTermsPage() {
  return (
    <FirstBiteLegalLayout
      eyebrow="TERMS OF SERVICE"
      title="The agreement for using First Bite."
      subtitle="These Terms govern your use of the First Bite mobile application. By creating an account or using the app, you agree to them."
      effective="Effective date: 2 June 2026 · Last updated: 2 June 2026"
      callout={
        <P>
          <Strong>Read this first:</Strong> First Bite helps you organize allergen introduction and flag risk
          — it does not replace your pediatrician or allergist, and it does not diagnose anything. For any
          severe reaction, call your local emergency number immediately.
        </P>
      }
    >
      <H2>1. Acceptance</H2>
      <P>
        First Bite is operated by Next Tech Labs ("we", "us"). By downloading, accessing, or using the app you
        agree to these Terms and to our{' '}
        <A href="/projects/first-bite/privacy">Privacy Policy</A>. If you do not agree, do not use the app.
      </P>

      <H2>2. Eligibility</H2>
      <P>
        You must be at least 18 years old and the parent or legal guardian of the child whose information you
        enter, or otherwise authorized to act on that child's behalf. You are responsible for the accuracy of
        the information you provide.
      </P>

      <H2>3. Not medical advice</H2>
      <LegalEmphasis>
        First Bite is an educational and tracking tool, not a medical device or healthcare provider. Its
        protocols, suggestions, and AI scanner verdicts are informational, are based on published guidance
        such as NIAID, LEAP, and EAT, and may be incomplete or wrong for your situation.
      </LegalEmphasis>
      <UL>
        <li>Always consult your pediatrician or allergist before introducing allergens, especially if your baby is at elevated risk.</li>
        <li>The AI Safety Scanner flags risk; it does not guarantee a food is safe. Never rely on it alone for a child with a known severe allergy.</li>
        <li>
          For breathing difficulty, swelling, or any severe reaction, stop and call your local emergency
          number immediately — the app's triage prompts are guidance, not a diagnosis.
        </li>
      </UL>

      <H2>4. Your account and caregivers</H2>
      <UL>
        <li>You are responsible for keeping your login credentials secure and for activity under your account.</li>
        <li>
          When you invite caregivers, you are authorizing them to view and, depending on their role, add data
          for the baby profiles you share. You can revoke access at any time.
        </li>
        <li>Only invite people you trust with your child's health information.</li>
      </UL>

      <H2>5. Subscriptions and billing</H2>
      <UL>
        <li>
          Core features — unlimited logging and the full food database — are <Strong>free</Strong>.
        </li>
        <li>
          Premium features are offered by subscription (monthly or annual) and are purchased through{' '}
          <Strong>Apple In-App Purchase</Strong> or <Strong>Google Play Billing</Strong>, managed via
          RevenueCat.
        </li>
        <li>
          Subscriptions renew automatically unless cancelled at least 24 hours before the period ends. Manage
          or cancel from your Apple ID or Google Play account settings.
        </li>
        <li>
          Refunds are handled by Apple or Google under their respective policies; we do not process payments
          directly.
        </li>
      </UL>

      <H2>6. Acceptable use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>Use the app for anyone other than a child you are authorized to care for.</li>
        <li>Reverse-engineer, scrape, or abuse the AI scanner or other services.</li>
        <li>Upload content you have no right to share, or content that is unlawful or harmful.</li>
        <li>Interfere with the app's operation or attempt to access other families' data.</li>
      </UL>

      <H2>7. Intellectual property</H2>
      <P>
        The app, its content, and its protocols are owned by Next Tech Labs and its licensors. The data you
        enter about your family remains yours; you grant us the limited rights needed to operate the service
        for you (storage, processing, sync, and scanning as described in the Privacy Policy).
      </P>

      <H2>8. Disclaimers</H2>
      <P>
        The app is provided "as is" and "as available," without warranties of any kind to the fullest extent
        permitted by law. We do not warrant that the food database, derivative mappings, protocols, or scanner
        results are complete, accurate, or error-free.
      </P>

      <H2>9. Limitation of liability</H2>
      <P>
        To the fullest extent permitted by law, Next Tech Labs is not liable for any indirect, incidental, or
        consequential damages arising from your use of the app, or from reliance on its educational content or
        scanner results. Nothing in these Terms limits liability that cannot be limited by law.
      </P>

      <H2>10. Termination</H2>
      <P>
        You may stop using the app and delete your account at any time. We may suspend or terminate access if
        you violate these Terms or to protect users or the service.
      </P>

      <H2>11. Changes</H2>
      <P>
        We may update these Terms as the product changes. Continued use after an update means you accept the
        revised Terms. The "last updated" date above always reflects the current version.
      </P>

      <H2>12. Contact</H2>
      <P>
        Questions about these Terms? Email{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Terms">help@nextechlabs.org</A>.
      </P>
    </FirstBiteLegalLayout>
  );
}
