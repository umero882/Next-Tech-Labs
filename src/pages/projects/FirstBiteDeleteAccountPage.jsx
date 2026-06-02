import { FirstBiteLegalLayout } from './FirstBiteLegalLayout';
import { H2, P, UL, OL, A, Strong, LegalEmphasis } from './legalProse';

export default function FirstBiteDeleteAccountPage() {
  return (
    <FirstBiteLegalLayout
      eyebrow="ACCOUNT DELETION"
      title="Delete your First Bite account and data."
      subtitle="You can delete your account and everything in it directly from inside the app — no email or form required. This page explains how, what gets removed, and how to request deletion if you can't open the app."
      effective="Effective date: 2 June 2026 · Last updated: 2 June 2026"
      callout={
        <P>
          <Strong>The short version:</Strong> Open First Bite → <Strong>Profile</Strong> tab → scroll to the
          bottom → <Strong>Delete account</Strong>. It permanently erases your account and all data — every
          baby, food log, reaction, photo, protocol, scan, and meal plan. This is immediate and cannot be
          undone.
        </P>
      }
    >
      <H2>1. Delete from inside the app (recommended)</H2>
      <P>This is the fastest route and removes everything at once:</P>
      <OL>
        <li>Open First Bite and make sure you're signed in.</li>
        <li>
          Go to the <Strong>Profile</Strong> tab (bottom-right).
        </li>
        <li>
          Scroll to the bottom and tap <Strong>Delete account</Strong>.
        </li>
        <li>
          Confirm twice — <Strong>"Delete account?"</Strong> then{' '}
          <Strong>"Delete everything"</Strong>.
        </li>
        <li>You're signed out immediately. Your account and all associated data are erased.</li>
      </OL>

      <H2>2. What gets deleted</H2>
      <P>Deleting your account permanently removes:</P>
      <UL>
        <li>Your login / account (Firebase Authentication user).</li>
        <li>Every baby profile in your family.</li>
        <li>All food and introduction logs.</li>
        <li>All reaction records and any reaction photos you uploaded.</li>
        <li>Allergen protocols and maintenance history.</li>
        <li>AI Safety Scanner history.</li>
        <li>Meal plans and shopping lists.</li>
        <li>Caregiver invitations you created, and any caregiver memberships you hold on other families.</li>
        <li>Uploaded images and avatars stored under your account in Firebase Storage.</li>
      </UL>

      <H2>3. What it means for caregivers</H2>
      <P>
        If you are the <Strong>owner</Strong> of a family, deleting your account removes that family and its
        babies for everyone you invited — co-parents, grandparents, nannies, or daycare will lose access. If
        you were invited to someone else's family as a caregiver, only <em>your</em> membership is removed;
        their data is unaffected.
      </P>

      <H2>4. Can't open the app?</H2>
      <P>
        If you've lost access to the app or your device, email{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Account%20Deletion">
          help@nextechlabs.org
        </A>{' '}
        from the email address on your account and ask us to delete it. We'll verify ownership and complete the
        deletion within <Strong>30 days</Strong>.
      </P>

      <H2>5. Subscriptions are separate</H2>
      <LegalEmphasis>
        Deleting your account does not cancel a paid subscription. Apple and Google manage billing — cancel
        First Bite Premium in your iPhone Settings → Apple ID → Subscriptions, or in the Google Play Store →
        Subscriptions, before or after deleting your account.
      </LegalEmphasis>

      <H2>6. Data retention after deletion</H2>
      <P>
        Deletion removes your data from our active systems immediately. Encrypted backups are rotated out on a
        fixed schedule, after which residual copies are gone. We retain only the limited records we are legally
        required to keep (for example, tax or transaction records held by the app stores), and nothing from
        them identifies your baby's health data. See our{' '}
        <A href="/projects/first-bite/privacy">Privacy Policy</A> for full detail.
      </P>

      <H2>7. Contact</H2>
      <P>
        Questions about deleting your account or data? Email{' '}
        <A href="mailto:help@nextechlabs.org?subject=First%20Bite%20Account%20Deletion">
          help@nextechlabs.org
        </A>
        .
      </P>
    </FirstBiteLegalLayout>
  );
}
