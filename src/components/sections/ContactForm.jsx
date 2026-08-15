import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { company } from '@/data/company';
import { resolveSupport } from '@/lib/nav';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/cn';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const SITE_HOST = 'nextechlabs.org';

const projectTypes = [
  { value: '', label: 'Select a category…', disabled: true },
  { value: 'mobile', label: 'Mobile app (iOS / Android)' },
  { value: 'web', label: 'Web app / SaaS' },
  { value: 'ai-saas', label: 'AI-driven product' },
  { value: 'media', label: 'Media / content production' },
  { value: 'infra', label: 'Infrastructure / DevOps' },
  { value: 'other', label: 'Something else' },
];

const budgets = [
  { value: '', label: 'Not sure yet' },
  { value: '<10k',     label: 'Under $10k' },
  { value: '10-25k',   label: '$10k – $25k' },
  { value: '25-50k',   label: '$25k – $50k' },
  { value: '50-100k',  label: '$50k – $100k' },
  { value: '100k+',    label: '$100k+' },
];

const timelines = [
  { value: '',         label: 'Just exploring' },
  { value: 'asap',     label: 'ASAP — fire is on' },
  { value: '1-3m',     label: 'Within 1–3 months' },
  { value: '3-6m',     label: '3–6 months' },
  { value: '6m+',      label: '6+ months out' },
];

/**
 * Topics for a product's own contact form.
 *
 * Bug reports and billing only make sense for something shipped, so they are
 * added when the project is live. Budget and timeline — the studio's questions —
 * are the wrong thing to ask a parent asking whether a food is safe.
 */
function productTopics(project) {
  const shipped = project?.status === 'live';
  return [
    { value: '', label: 'What is this about?…', disabled: true },
    ...(shipped
      ? [
          { value: 'bug', label: 'Something is broken' },
          { value: 'account', label: 'Account & billing' },
        ]
      : []),
    { value: 'feedback', label: 'Feedback & feature request' },
    { value: 'press', label: 'Press & partnerships' },
    { value: 'other', label: 'Something else' },
  ];
}

function validate({ name, email, projectType, message }, variant) {
  const errors = {};
  if (!name.trim()) errors.name = 'Tell us what to call you.';
  if (!email.trim()) errors.email = 'We need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That doesn’t look like a valid email.';
  if (!projectType) {
    errors.projectType = variant === 'product' ? 'Pick the closest topic.' : 'Pick the category that best fits.';
  }
  if (!message.trim()) errors.message = 'A paragraph or two is plenty.';
  else if (message.trim().length < 20) errors.message = 'Give us a bit more — at least 20 characters.';
  return errors;
}

export function ContactForm({ variant = 'studio', project = null }) {
  // Every product submit path reads project.id and project.name, so the product
  // variant is meaningless without one. Degrade to the studio form rather than
  // throwing -- this app has no error boundary, so a throw would blank the page
  // instead of just losing a field set.
  const isProduct = variant === 'product' && project != null;

  if (import.meta.env?.DEV && variant === 'product' && !project) {
    console.warn(
      'ContactForm: variant="product" requires a `project` prop — falling back to the studio form.',
    );
  }
  const { email: recipient, formKey } = isProduct
    ? resolveSupport(project)
    : { email: company.channels.email, formKey: resolveSupport(null).formKey };

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    consent: false,
    _trap: '', // honeypot — bots fill this in, humans never see it
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | mailto

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (form._trap) return; // bot
    const v = validate(form, variant);
    if (Object.keys(v).length) {
      setErrors(v);
      const first = document.getElementById(`cf-${Object.keys(v)[0]}`);
      first?.focus();
      return;
    }

    setStatus('sending');

    const sourcePath = isProduct ? `/projects/${project.id}/contact` : '/contact';
    const label = isProduct ? project.name : 'Studio';
    const subject = isProduct
      ? `[${project.name}] ${form.projectType || 'inquiry'} — ${form.name}`
      : `[${form.projectType || 'inquiry'}] ${form.name} — ${form.company || 'personal'}`;

    if (formKey) {
      try {
        // Web3Forms binds an access key to a destination inbox, which is how a
        // static site routes each product's mail somewhere different. Extra
        // fields are echoed into the email body.
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: formKey,
            subject,
            from_name: form.name,
            email: form.email,
            message: form.message,
            product: label,
            topic: form.projectType,
            ...(isProduct
              ? {}
              : { company: form.company, budget: form.budget, timeline: form.timeline }),
            source: `${SITE_HOST}${sourcePath}`,
          }),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        setStatus('success');
        setForm((f) => ({
          ...f,
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          consent: false,
        }));
      } catch {
        setStatus('error');
      }
    } else {
      // No key configured — compose the message in the visitor's mail client
      // instead, addressed to whichever inbox this form belongs to.
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        isProduct ? `Product: ${project.name}` : form.company && `Company: ${form.company}`,
        isProduct ? `Topic: ${form.projectType}` : `Project type: ${form.projectType}`,
        !isProduct && form.budget && `Budget: ${form.budget}`,
        !isProduct && form.timeline && `Timeline: ${form.timeline}`,
        '',
        form.message,
      ]
        .filter(Boolean)
        .join('\n');
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
    }
  }

  // Success card
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--color-accent-border)] bg-bg-secondary p-8 md:p-10 text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-success-light text-[var(--color-success)] inline-flex items-center justify-center">
          <Check size={24} strokeWidth={2.25} />
        </div>
        <h3 className="mt-5 font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
          Got it. We’ll be in touch.
        </h3>
        <p className="mt-3 text-text-secondary leading-relaxed max-w-md mx-auto">
          We read every message and reply within 1–2 business days. If it’s urgent, ping us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 label-mono text-accent hover:underline"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={fadeUp}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-bg-secondary p-6 md:p-8 lg:p-10 space-y-6"
    >
      {/* Honeypot — visually hidden but reachable to bots */}
      <div aria-hidden="true" className="hidden">
        <label>
          Don’t fill this out:
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form._trap}
            onChange={(e) => set('_trap', e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          id="name"
          label="Name"
          required
          value={form.name}
          onChange={(v) => set('name', v)}
          error={errors.name}
          placeholder="Jane Doe"
          autoComplete="name"
        />
        <Field
          id="email"
          type="email"
          label="Email"
          required
          value={form.email}
          onChange={(v) => set('email', v)}
          error={errors.email}
          placeholder="jane@company.com"
          autoComplete="email"
        />
      </div>

      {!isProduct && (
        <Field
          id="company"
          label="Company"
          hint="Optional"
          value={form.company}
          onChange={(v) => set('company', v)}
          placeholder="Your org or brand"
          autoComplete="organization"
        />
      )}

      <SelectField
        id="projectType"
        label={isProduct ? 'Topic' : 'Project type'}
        required
        value={form.projectType}
        onChange={(v) => set('projectType', v)}
        options={isProduct ? productTopics(project) : projectTypes}
        error={errors.projectType}
      />

      {!isProduct && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            id="budget"
            label="Budget"
            hint="Optional"
            value={form.budget}
            onChange={(v) => set('budget', v)}
            options={budgets}
          />
          <SelectField
            id="timeline"
            label="Timeline"
            hint="Optional"
            value={form.timeline}
            onChange={(v) => set('timeline', v)}
            options={timelines}
          />
        </div>
      )}

      <TextareaField
        id="message"
        label={isProduct ? 'What’s going on?' : 'What are you trying to build?'}
        required
        value={form.message}
        onChange={(v) => set('message', v)}
        error={errors.message}
        placeholder={
          isProduct
            ? 'What happened, what you expected, and the device you’re on if it’s a bug.'
            : 'A paragraph is plenty. The clearer the goal, the better the first reply.'
        }
        rows={6}
      />

      <div className="flex items-start gap-3">
        <input
          id="cf-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border bg-bg-tertiary text-accent focus:ring-accent focus:ring-offset-0"
        />
        <label htmlFor="cf-consent" className="text-sm text-text-secondary leading-relaxed">
          I agree to be contacted about this inquiry. We don’t add you to any list. See our{' '}
          <a
            href="/privacy"
            className="text-accent hover:underline"
          >
            privacy approach
          </a>
          .
        </label>
      </div>

      {status === 'error' && (
        <div className="flex gap-3 items-start rounded-xl border border-[#F85149]/40 bg-[#F85149]/5 p-4">
          <AlertCircle size={16} className="mt-0.5 text-[var(--color-error)] flex-none" />
          <p className="text-sm text-text-secondary leading-relaxed">
            Something went wrong sending the message. Try again, or email us directly at{' '}
            <a href={`mailto:${recipient}`} className="text-accent hover:underline">
              {recipient}
            </a>
            .
          </p>
        </div>
      )}

      {status === 'mailto' && (
        <div className="flex gap-3 items-start rounded-xl border border-[var(--color-accent-border)] bg-accent-light p-4">
          <Check size={16} className="mt-0.5 text-accent flex-none" />
          <p className="text-sm text-text-secondary leading-relaxed">
            We opened your email client with the message pre-filled. Hit send to deliver it — or reply here
            if it didn’t open.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-text-muted">
          Required fields marked with <span className="text-accent">*</span>. We reply within 1–2 business days.
        </p>
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={14} strokeWidth={2} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={14} strokeWidth={2} />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}

function Field({ id, label, type = 'text', value, onChange, error, hint, required, ...rest }) {
  return (
    <div>
      <Label id={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={`cf-${id}`}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `cf-${id}-err` : undefined}
        className={inputClasses(error)}
        {...rest}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, error, hint, required }) {
  return (
    <div>
      <Label id={id} required={required} hint={hint}>
        {label}
      </Label>
      <select
        id={`cf-${id}`}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `cf-${id}-err` : undefined}
        className={inputClasses(error)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

function TextareaField({ id, label, value, onChange, error, required, rows = 5, ...rest }) {
  return (
    <div>
      <Label id={id} required={required}>
        {label}
      </Label>
      <textarea
        id={`cf-${id}`}
        name={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `cf-${id}-err` : undefined}
        className={cn(inputClasses(error), 'resize-y min-h-[140px]')}
        {...rest}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

function Label({ id, children, required, hint }) {
  return (
    <label htmlFor={`cf-${id}`} className="flex items-baseline justify-between mb-2">
      <span className="label-mono text-text-secondary">
        {children}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {hint && <span className="text-xs text-text-muted">{hint}</span>}
    </label>
  );
}

function ErrorText({ id, error }) {
  if (!error) return null;
  return (
    <p id={`cf-${id}-err`} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
      {error}
    </p>
  );
}

function inputClasses(error) {
  return cn(
    'w-full rounded-xl px-4 py-3',
    'bg-bg-primary border text-text-primary placeholder-text-muted',
    'transition-colors',
    'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30',
    error ? 'border-[var(--color-error)]' : 'border-border hover:border-text-muted',
  );
}
