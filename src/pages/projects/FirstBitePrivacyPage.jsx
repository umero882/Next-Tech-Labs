import { FirstBiteLegalLayout } from './FirstBiteLegalLayout';
import { H2, H3, P, UL, A, Strong, LegalEmphasis } from './legalProse';

export default function FirstBitePrivacyPage() {
  return (
    <FirstBiteLegalLayout
      eyebrow="PRIVACY POLICY"
      title="How First Bite handles your family's data."
      subtitle="First Bite is a children's-health app, so it collects sensitive information about your baby. This policy explains exactly what we collect, why, who can see it, and the controls you have over it."
      effective="Effective date: 2 June 2026 · Last updated: 2 June 2026"
      callout={
        <P>
          <Strong>The short version:</Strong> You — the parent or guardian — own the account. Your baby's
          health data and reaction photos are encrypted at rest and are only shared with the caregivers you
          personally invite or the reports you choose to export. We never sell your data, we never serve ads,
          and content you scan or log is never used to train AI models.
        </P>
      }
    >
      <H2>1. Who we are</H2>
      <P>
        First Bite is operated by Next Tech Labs. The account holder must be an adult (18+) acting as the
        parent or legal guardian of the child whose information is entered. First Bite is directed at parents
        and caregivers — not at children. For any question about this policy or your data, contact{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Privacy">help@nextechlabs.org</A>.
      </P>

      <H2>2. Data we collect</H2>

      <H3>Information you provide about your baby</H3>
      <UL>
        <li>
          <Strong>Baby profile</Strong> — name or nickname, date of birth, and the allergens you flag as
          avoid / monitor / safe.
        </li>
        <li>
          <Strong>Risk factors</Strong> — answers to the onboarding questionnaire (eczema severity, existing
          food allergies, family history) used to compute a low or elevated risk tier.
        </li>
        <li>
          <Strong>Food and introduction logs</Strong> — foods introduced, dates, status (safe / reaction /
          skipped), and notes.
        </li>
        <li>
          <Strong>Reaction logs</Strong> — symptoms, severity, timing, and any <Strong>photos</Strong> you
          attach from your camera or photo library.
        </li>
        <li>
          <Strong>Scan content</Strong> — photos of labels, menus, or recipes you submit to the AI Safety
          Scanner, and the verdict it returns.
        </li>
      </UL>

      <H3>Account and caregiver information</H3>
      <UL>
        <li>
          <Strong>Account</Strong> — the email address (and authentication identifier) used to sign in via
          Firebase Authentication.
        </li>
        <li>
          <Strong>Caregivers</Strong> — when you invite a co-parent, grandparent, nanny, or daycare, we store
          the invited email address and the permission level (owner / caregiver / view-only) you assign.
        </li>
      </UL>

      <H3>Purchase information</H3>
      <UL>
        <li>
          <Strong>Subscription status</Strong> — whether your account holds the Premium entitlement, managed
          through RevenueCat. Your actual payment is processed by Apple or Google;{' '}
          <Strong>we never see or store your card or banking details.</Strong>
        </li>
      </UL>

      <H3>Technical data</H3>
      <UL>
        <li>
          <Strong>Diagnostics</Strong> — crash reports and basic error logs (via Sentry) to keep the app
          stable. These are not used to identify you.
        </li>
        <li>
          <Strong>Device tokens</Strong> — used to deliver push and local notifications if you enable them.
        </li>
      </UL>

      <H2>3. How we use your data</H2>
      <UL>
        <li>To run the core features: the food library, introduction tracker, and reaction log.</li>
        <li>
          To generate your risk-stratified allergen protocols and remind you to maintain tolerance over time.
        </li>
        <li>
          To produce AI Safety Scanner verdicts and to auto-correlate reactions with recently eaten foods.
        </li>
        <li>To sync logs, reactions, and protocol progress in real time among the caregivers you invite.</li>
        <li>To generate the clinician-grade reports and share links you explicitly create.</li>
        <li>To manage your subscription entitlement and provide support.</li>
      </UL>
      <P>
        We do <Strong>not</Strong> use your data for advertising, and we do <Strong>not</Strong> sell or rent
        personal information to anyone.
      </P>

      <H2>4. The AI Safety Scanner</H2>
      <P>
        When you run a scan, the relevant image or text is sent over an encrypted connection to our backend,
        which calls the Claude API (Anthropic) to read ingredients and reason about allergens against your
        baby's profile. We send the minimum data needed for the verdict.
      </P>
      <UL>
        <li>Scan content is processed to return a result and to keep your scan history available to you.</li>
        <li>
          Content you submit is <Strong>not used to train AI models</Strong> — neither ours nor the model
          provider's.
        </li>
        <li>
          Verdicts are <Strong>risk flags, not diagnoses.</Strong> When confidence is low the scanner says so
          rather than guessing a false "safe."
        </li>
      </UL>

      <H2>5. Where your data lives and how it's protected</H2>
      <UL>
        <li>
          Authentication is handled by <Strong>Firebase Auth</Strong>; structured data lives in a{' '}
          <Strong>Hasura GraphQL / PostgreSQL</Strong> database scoped per family account with row-level
          permissions.
        </li>
        <li>
          Photos are stored in <Strong>Firebase Storage</Strong> and served through short-lived signed URLs.
        </li>
        <li>Health data and reaction photos are encrypted at rest.</li>
        <li>
          A caregiver can only ever see the babies they have been invited to, at the permission level you set.
        </li>
      </UL>

      <H2>6. Sharing</H2>
      <P>We share your data only in these situations, all of which you control or initiate:</P>
      <UL>
        <li>
          <Strong>Caregivers you invite</Strong> — they see the baby profiles you grant them access to.
        </li>
        <li>
          <Strong>Reports and links you export</Strong> — clinician PDFs and read-only share links are
          generated only when you ask for them.
        </li>
        <li>
          <Strong>Service providers</Strong> — infrastructure partners (Firebase/Google, our database host,
          RevenueCat, Anthropic for scanning, Sentry for diagnostics) who process data on our behalf under
          their own commitments.
        </li>
        <li>
          <Strong>Legal</Strong> — if required by law, or to protect the safety of a child or person.
        </li>
      </UL>

      <H2>7. Children's privacy</H2>
      <P>
        First Bite is intended for use by adults on behalf of their own children. The data about your child is
        provided by you, the parent or guardian. We collect children's information only as needed to deliver
        the features you use, in line with COPPA and GDPR-K principles, and we do not knowingly let children
        create their own accounts. You can delete your child's data at any time (see below).
      </P>

      <H2>8. Your rights and controls</H2>
      <UL>
        <li>
          <Strong>Access &amp; export</Strong> — view your data in the app and export reports at any time.
        </li>
        <li>
          <Strong>Correction</Strong> — edit any profile, log, or reaction record.
        </li>
        <li>
          <Strong>Deletion</Strong> — delete a baby profile, or delete your entire account and associated
          data from the app's settings. Account deletion is permanent.
        </li>
        <li>
          <Strong>Revoke access</Strong> — remove any caregiver's access at any time.
        </li>
        <li>
          <Strong>Notifications</Strong> — turn push and local notifications off in your device settings.
        </li>
      </UL>
      <P>
        To exercise any right you can't complete in-app, email{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Data%20Request">help@nextechlabs.org</A>.
      </P>

      <H2>9. Data retention</H2>
      <P>
        We keep your data while your account is active. When you delete a record it is removed; when you delete
        your account, associated personal data is deleted from our active systems, except where we must retain
        limited records to meet legal or financial obligations. Backups are rotated on a fixed schedule.
      </P>

      <H2>10. Not a medical service</H2>
      <LegalEmphasis>
        First Bite is an educational and tracking tool. It is not a medical device and does not provide
        medical advice, diagnosis, or treatment. Always consult your pediatrician or allergist before
        introducing allergens, and call your local emergency number for any severe reaction.
      </LegalEmphasis>

      <H2>11. Changes to this policy</H2>
      <P>
        We may update this policy as the product evolves. Material changes will be reflected in the "last
        updated" date above and, where appropriate, surfaced in the app.
      </P>

      <H2>12. Contact</H2>
      <P>
        Questions about privacy? Email{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Privacy">help@nextechlabs.org</A>.
      </P>
    </FirstBiteLegalLayout>
  );
}
