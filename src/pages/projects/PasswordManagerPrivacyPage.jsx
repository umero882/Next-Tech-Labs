import { PasswordManagerLegalLayout } from './PasswordManagerLegalLayout';
import { H2, H3, P, UL, A, Strong } from './legalProse';

export default function PasswordManagerPrivacyPage() {
  return (
    <PasswordManagerLegalLayout
      eyebrow="PRIVACY POLICY"
      title="How we collect, use, and protect your data."
      subtitle="This Privacy Policy describes how Next Tech Labs handles information when you use the Password Vault mobile application. Our goal is simple: keep your data private and under your control."
      effective="Effective date: 5 May 2026 · Last updated: 5 May 2026"
      callout={
        <P>
          <Strong>The short version:</Strong> Your vault data — passwords, notes, attachments — is encrypted
          on your device with a key derived from your master password. We never see, store, or have any way
          to decrypt your master password or vault contents. If you choose to enable cloud backup, only
          encrypted data is uploaded.
        </P>
      }
    >
      <H2>1. Who we are</H2>
      <P>
        Password Vault is operated by Next Tech Labs. If you have any questions about this policy or your
        data, contact us at{' '}
        <A href="mailto:help@nextechlabs.org?subject=Privacy%20Question">help@nextechlabs.org</A>.
      </P>

      <H2>2. Data we collect</H2>

      <H3>Data you provide directly</H3>
      <UL>
        <li>
          <Strong>Master password</Strong> — never transmitted or stored. Used only on your device to derive
          the encryption key for your vault.
        </li>
        <li>
          <Strong>Vault contents</Strong> — passwords, secure notes, attachments, categories, and metadata
          you create. Always encrypted on your device before any cloud upload.
        </li>
        <li>
          <Strong>Account information</Strong> (only if you sign up for a Next Tech Labs account): your
          email address, an optional display name, and an optional profile photo. Used to authenticate cloud
          backup and sync.
        </li>
        <li>
          <Strong>Two-factor authentication secret</Strong> (if you enable 2FA): stored encrypted by Firebase
          Authentication.
        </li>
      </UL>

      <H3>Data collected automatically</H3>
      <UL>
        <li>
          <Strong>Crash and diagnostic data</Strong> — anonymized stack traces and device model / OS version
          when the app crashes, used solely to fix bugs. Collected via Firebase Crashlytics. No personal data
          is included.
        </li>
        <li>
          <Strong>Subscription state</Strong> — whether you have an active premium subscription. Managed by
          RevenueCat and the Apple App Store / Google Play Store. We never see your payment details.
        </li>
        <li>
          <Strong>Authentication logs</Strong> — sign-in timestamps and basic device identifiers used for
          security (e.g., to detect suspicious sign-in attempts), retained by Firebase Authentication.
        </li>
      </UL>

      <H3>Data we do NOT collect</H3>
      <UL>
        <li>We do not use third-party advertising or tracking SDKs.</li>
        <li>We do not sell, rent, or share your data with data brokers.</li>
        <li>We do not collect analytics that identify individual users.</li>
        <li>We do not have any way to read your vault contents.</li>
      </UL>

      <H2>3. How your data is encrypted</H2>
      <P>
        Vault data is encrypted using <Strong>AES-256</Strong> with a key derived from your master password
        using <Strong>PBKDF2</Strong> with a high iteration count. This is a zero-knowledge design:
      </P>
      <UL>
        <li>Your master password never leaves your device.</li>
        <li>Encryption and decryption happen entirely on your device.</li>
        <li>
          If cloud backup is enabled, only the already-encrypted ciphertext is uploaded — our servers cannot
          read it.
        </li>
        <li>
          If you forget your master password, we cannot recover your vault. We strongly recommend keeping a
          written copy in a secure location.
        </li>
      </UL>

      <H2>4. How we use your data</H2>
      <P>We use the data described above only for the following purposes:</P>
      <UL>
        <li>
          <Strong>Provide the service</Strong> — store and sync your encrypted vault, authenticate your
          account, deliver premium features.
        </li>
        <li>
          <Strong>Improve reliability</Strong> — diagnose crashes and fix bugs using anonymized error reports.
        </li>
        <li>
          <Strong>Communicate with you</Strong> — respond to support requests you initiate. We do not send
          marketing emails.
        </li>
        <li>
          <Strong>Comply with the law</Strong> — only when legally required.
        </li>
      </UL>

      <H2>5. Third-party services</H2>
      <P>
        The App relies on a small number of third-party services to operate. Each is used for a specific
        purpose and is bound by their own privacy policies:
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
                'Firebase Authentication (Google)',
                'Account sign-in, email verification, 2FA enrollment',
                'Email, display name, hashed password (managed by Firebase, never seen by us)',
              ],
              [
                'Cloud Firestore (Google)',
                'Encrypted cloud backup of your vault',
                'Already-encrypted vault ciphertext only',
              ],
              [
                'Firebase Crashlytics (Google)',
                'Crash reports for fixing bugs',
                'Anonymous stack traces, device model, OS version',
              ],
              [
                'RevenueCat',
                'Subscription state and entitlements',
                'Anonymous user ID, store transaction ID, subscription status',
              ],
              [
                'Apple App Store / Google Play Store',
                'Process subscription payments',
                'Payment details (we never see them)',
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

      <P>
        These services are subject to their own privacy practices:{' '}
        <A href="https://policies.google.com/privacy">Google</A>,{' '}
        <A href="https://www.revenuecat.com/privacy/">RevenueCat</A>,{' '}
        <A href="https://www.apple.com/legal/privacy/">Apple</A>.
      </P>

      <H2>6. Data storage and location</H2>
      <UL>
        <li>Local vault data is stored on your device, protected by AES-256 encryption.</li>
        <li>
          If you enable cloud backup, encrypted data is stored in Google Cloud’s Firestore service, with
          regional storage determined by Google.
        </li>
        <li>Authentication metadata (email, sign-in records) is stored by Firebase Authentication.</li>
      </UL>

      <H2>7. Data retention</H2>
      <UL>
        <li>Local vault data is retained until you delete it or uninstall the App.</li>
        <li>Cloud-backed encrypted vault data is retained until you delete your account or disable backup.</li>
        <li>Account information is retained until you delete your account.</li>
        <li>Crash reports are retained by Firebase Crashlytics for up to 90 days.</li>
        <li>Subscription records are retained as long as required by Apple, Google, and applicable law.</li>
      </UL>

      <H2>8. Your rights</H2>
      <P>You have the following rights with respect to your data:</P>
      <UL>
        <li>
          <Strong>Access</Strong> — view all data you’ve stored from within the App.
        </li>
        <li>
          <Strong>Export</Strong> — export an encrypted backup of your vault to a file at any time via{' '}
          <em>Profile → Backup &amp; Export</em>.
        </li>
        <li>
          <Strong>Delete</Strong> — delete your account and all associated cloud data via{' '}
          <em>Profile → Account → Delete Account</em>. This is immediate and irreversible.
        </li>
        <li>
          <Strong>Opt-out of crash reporting</Strong> — contact us at{' '}
          <A href="mailto:help@nextechlabs.org">help@nextechlabs.org</A> to request that crash reports be
          excluded.
        </li>
      </UL>
      <P>
        If you are in the EU, UK, California, or another region with specific data-protection laws, you may
        have additional rights including the right to lodge a complaint with your local data-protection
        authority. Contact us to exercise any of these rights.
      </P>

      <H2>9. Children’s privacy</H2>
      <P>
        Password Vault is not intended for users under the age of 13. We do not knowingly collect data from
        children under 13. If you believe a child has provided us with personal data, please contact us at{' '}
        <A href="mailto:help@nextechlabs.org">help@nextechlabs.org</A> and we will delete it promptly.
      </P>

      <H2>10. Security</H2>
      <P>
        We implement strong technical safeguards including AES-256 encryption, PBKDF2 key derivation,
        biometric authentication where supported by your device, and zero-knowledge architecture. No system
        is perfectly secure, however, so we recommend:
      </P>
      <UL>
        <li>Choose a strong, unique master password.</li>
        <li>Enable biometric unlock and two-factor authentication where available.</li>
        <li>Keep your device’s operating system up to date.</li>
        <li>Do not share your master password with anyone — including us.</li>
      </UL>

      <H2>11. Changes to this policy</H2>
      <P>
        We may update this Privacy Policy as the App evolves. When we make material changes, we will update
        the “Last updated” date at the top of this page and, where appropriate, notify you within the App.
        Continuing to use the App after changes are posted means you accept the updated policy.
      </P>

      <H2>12. Contact</H2>
      <P>
        Questions, concerns, or requests about your data? Email us at{' '}
        <A href="mailto:help@nextechlabs.org?subject=Privacy%20Question">help@nextechlabs.org</A>. We aim to
        reply within 1–2 business days.
      </P>
    </PasswordManagerLegalLayout>
  );
}
