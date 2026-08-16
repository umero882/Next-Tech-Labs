import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, LifeBuoy } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/sections/ContactForm';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import { resolveSupport } from '@/lib/nav';
import { company } from '@/data/company';
import { fadeUp, stagger } from '@/lib/motion';
import ProjectComingSoonPage from '@/pages/projects/ProjectComingSoonPage';

/** Projects with a support page — these get a "try support first" pointer. */
const SUPPORT_PAGES = new Set(['first-bite', 'password-manager']);

export default function ProjectContactPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useSeo({
    title: project ? `Contact ${project.name} | Next Tech Labs` : 'Not found | Next Tech Labs',
    description: project
      ? `Get in touch about ${project.name} — bugs, feedback, account questions, or press.`
      : '',
    path: `/projects/${id}/contact`,
    noindex: project?.status !== 'live',
  });

  // Reuses the placeholder's 404 branch rather than duplicating one.
  if (!project) return <ProjectComingSoonPage section="A contact page" />;

  const { email } = resolveSupport(project);

  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <SectionLabel number="·" label="CONTACT" />
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05]"
        >
          Talk to the {project.name} team.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-text-secondary text-lg leading-relaxed">
          The person who built it reads this. Expect a reply within 1–2 business
          days.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            <Mail size={14} strokeWidth={1.75} /> {email}
          </a>
          {SUPPORT_PAGES.has(project.id) && (
            <Link
              to={`/projects/${project.id}/support`}
              className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
            >
              <LifeBuoy size={14} strokeWidth={1.75} /> Troubleshooting & FAQ
            </Link>
          )}
          <a
            href={company.channels.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
          >
            WhatsApp {company.channels.whatsappLabel}
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <ContactForm variant="product" project={project} />
        </motion.div>
      </motion.div>
    </Container>
  );
}
