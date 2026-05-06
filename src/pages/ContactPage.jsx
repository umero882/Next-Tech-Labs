import { motion } from 'framer-motion';
import { Mail, MessageCircle, ArrowUpRight, Play, AtSign, Radio, Globe, Code2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { company } from '@/data/company';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/cn';

// Lucide v1.x removed brand icons. We use neutral editorial glyphs and let the
// label do the brand work — consistent with the "engineered editorial" voice.
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
        <Container className="pt-20 md:pt-28 pb-16 md:pb-20">
          <SectionLabel number="04" label="CONTACT" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0] max-w-4xl">
            Send us a paragraph.{' '}
            <span className="italic font-normal text-accent">We'll send one back.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            No forms. No funnels. Pick the channel you actually use.
          </p>
        </Container>
      </section>

      {/* Primary channels */}
      <Container className="py-16 md:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          <ChannelCard
            href={`mailto:${company.channels.email}`}
            icon={Mail}
            label="Email"
            value={company.channels.email}
            note="The slow channel. We read every one."
          />
          <ChannelCard
            href={company.channels.whatsapp}
            icon={MessageCircle}
            label="WhatsApp"
            value={company.channels.whatsappLabel}
            note="The fast channel. Region-correct, no install."
            external
          />
        </motion.div>

        {/* Socials */}
        <div className="mt-16">
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
        'group block p-7 md:p-8 rounded-2xl',
        'border border-border bg-bg-secondary',
        'transition-colors hover:border-[var(--color-accent-border)] hover:bg-bg-tertiary',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-accent-light text-accent inline-flex items-center justify-center">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={1.75}
          className="text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <p className="mt-6 label-mono text-text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight break-all">
        {value}
      </p>
      <p className="mt-3 text-text-secondary text-sm leading-relaxed">{note}</p>
    </motion.a>
  );
}
