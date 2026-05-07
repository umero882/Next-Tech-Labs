import { motion } from 'framer-motion';
import { Mail, MessageCircle, ArrowUpRight, Play, AtSign, Radio, Globe, Code2, Clock, Shield, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { ContactForm } from '@/components/sections/ContactForm';
import { company } from '@/data/company';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/cn';

const socialIcon = {
  youtube:   Play,
  instagram: AtSign,
  facebook:  Globe,
  tiktok:    Radio,
  github:    Code2,
  linkedin:  Globe,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <SectionLabel number="04" label="CONTACT" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0] max-w-4xl">
            Tell us what you’re building.{' '}
            <span className="italic font-normal text-accent">We’ll tell you how we’d ship it.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Use the form for project inquiries — or pick the channel below if you’d rather skip it.
          </p>
        </Container>
      </section>

      {/* Form + sidebar */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Form */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            <SectionLabel number="·" label="PROJECT INQUIRY" />
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
              Start with a paragraph.
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed max-w-xl">
              The more concretely you describe the goal, the better the first reply. Don’t worry about the
              budget or timeline fields — we’ll work with what you have.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Sidebar — channels + meta */}
          <motion.aside
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-4"
          >
            <ChannelCard
              href={`mailto:${company.channels.email}?subject=Hello%20from%20the%20site`}
              icon={Mail}
              label="Email"
              value={company.channels.email}
              note="We read every one and reply within 1–2 business days."
            />
            <ChannelCard
              href={company.channels.whatsapp}
              icon={MessageCircle}
              label="WhatsApp"
              value={company.channels.whatsappLabel}
              note="The fast channel. Region-correct, no install."
              external
            />

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-bg-secondary p-6 md:p-7 space-y-4"
            >
              <p className="label-mono text-text-muted">WHAT TO EXPECT</p>
              <ul className="space-y-3 text-sm text-text-secondary">
                <ExpectItem icon={Clock}>
                  <Strong>Reply in 1–2 business days.</Strong> Usually faster on weekdays.
                </ExpectItem>
                <ExpectItem icon={MapPin}>
                  <Strong>{company.location}</Strong> Comfortable working across timezones.
                </ExpectItem>
                <ExpectItem icon={Shield}>
                  <Strong>No spam, no list.</Strong> Your message is read by the operator, not a CRM.
                </ExpectItem>
              </ul>
            </motion.div>
          </motion.aside>
        </div>

        {/* Socials — only renders when company.socials has entries */}
        {company.socials.length > 0 && (
        <div className="mt-20 md:mt-24">
          <SectionLabel number="·" label="ELSEWHERE" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
            Or follow the work.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {company.socials.map((s) => {
              const Icon = socialIcon[s.id] ?? ArrowUpRight;
              return (
                <motion.a
                  key={s.id}
                  variants={fadeUp}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group flex items-center justify-between gap-3 px-4 py-4 rounded-xl',
                    'border border-border bg-bg-secondary',
                    'transition-colors hover:border-[var(--color-accent-border)] hover:bg-bg-tertiary',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.75} className="text-accent" />
                    <span className="label-mono text-text-secondary group-hover:text-text-primary">
                      {s.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.75}
                    className="text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
        )}
      </Container>
    </>
  );
}

function ChannelCard({ href, icon: Icon, label, value, note, external }) {
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group block p-6 md:p-7 rounded-2xl',
        'border border-border bg-bg-secondary',
        'transition-colors hover:border-[var(--color-accent-border)] hover:bg-bg-tertiary',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-xl bg-accent-light text-accent inline-flex items-center justify-center">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <ArrowUpRight
          size={16}
          strokeWidth={1.75}
          className="text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <p className="mt-5 label-mono text-text-muted">{label}</p>
      <p className="mt-1.5 font-display text-xl md:text-2xl font-semibold text-text-primary tracking-tight break-all">
        {value}
      </p>
      <p className="mt-2 text-text-secondary text-sm leading-relaxed">{note}</p>
    </motion.a>
  );
}

function ExpectItem({ icon: Icon, children }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-0.5 w-7 h-7 rounded-lg bg-bg-tertiary text-accent inline-flex items-center justify-center flex-none">
        <Icon size={14} strokeWidth={1.75} />
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function Strong({ children }) {
  return <span className="text-text-primary font-medium">{children}</span>;
}
