import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { projects } from '@/data/projects';
import { sortShowcase } from '@/lib/filter';
import { buildCoverStyle } from '@/lib/cover';
import { fadeUp, stagger } from '@/lib/motion';

const customPages = {
  'password-manager': lazy(() => import('@/pages/projects/PasswordManagerPage')),
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const CustomPage = customPages[id];
  if (CustomPage) {
    return (
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <span className="label-mono text-text-muted">Loading…</span>
          </div>
        }
      >
        <CustomPage />
      </Suspense>
    );
  }

  if (!project) {
    return (
      <Container className="py-32 text-center">
        <SectionLabel number="404" label="NOT FOUND" />
        <h1 className="mt-6 font-display text-5xl font-semibold text-text-primary">
          That project doesn't exist.
        </h1>
        <p className="mt-4 text-text-muted">It may have been renamed or never shipped.</p>
        <Link to="/projects" className="inline-block mt-8">
          <Button variant="outline">
            <ArrowLeft size={14} /> Back to all work
          </Button>
        </Link>
      </Container>
    );
  }

  const related = sortShowcase(
    projects.filter((p) => p.id !== project.id && p.category === project.category),
  ).slice(0, 3);

  return (
    <>
      {/* Cover band */}
      <section
        className="relative h-72 md:h-96 lg:h-[28rem] border-b border-border overflow-hidden"
        style={buildCoverStyle(project.cover)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        <Container className="relative h-full flex flex-col justify-end pb-10 md:pb-14">
          <div className="flex items-center gap-3">
            <span className="label-mono px-2.5 py-1 rounded-md bg-black/30 backdrop-blur text-text-primary tabular">
              {project.code}
            </span>
            <StatusDot
              status={project.status}
              className="px-2.5 py-1 rounded-md bg-black/30 backdrop-blur"
            />
          </div>
        </Container>
      </section>

      {/* Headline + meta */}
      <Container className="pt-12 md:pt-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 label-mono text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.75} /> All projects
        </Link>

        <motion.div variants={stagger} initial="hidden" animate="show" className="mt-6 max-w-4xl">
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary leading-[1.05] tracking-tight"
          >
            {project.name}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-text-secondary text-xl md:text-2xl leading-snug max-w-3xl"
          >
            {project.tagline}
          </motion.p>
        </motion.div>
      </Container>

      {/* Body grid */}
      <Container className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
        {/* Left: long description */}
        <article className="lg:col-span-8">
          <SectionLabel number="·" label="OVERVIEW" />
          <p className="mt-5 text-text-secondary text-lg leading-relaxed">
            {project.description}
          </p>

          {project.highlights?.length > 0 && (
            <div className="mt-12">
              <SectionLabel number="·" label="HIGHLIGHTS" />
              <ul className="mt-5 space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 items-start text-text-secondary leading-relaxed"
                  >
                    <span className="mt-1.5 flex-none w-5 h-5 rounded-full bg-accent-light text-accent inline-flex items-center justify-center">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Right: meta */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <div className="border border-border rounded-2xl p-6 md:p-8 bg-bg-secondary space-y-6">
            <Meta label="Category" value={project.category.replace('-', ' / ').toUpperCase()} />
            <Meta label="Year" value={project.year} mono />
            <Meta label="Client" value={project.client} />
            <Meta label="Status" value={<StatusDot status={project.status} />} />

            <div>
              <p className="label-mono text-text-muted mb-3">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Badge key={t} variant="muted">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <Link to="/contact" className="block">
              <Button className="w-full" size="md">
                Build something like this
                <ArrowRight size={14} strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </aside>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border py-20 md:py-24">
          <Container>
            <div className="mb-10">
              <SectionLabel number="·" label="RELATED WORK" />
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
                More from the {project.category.replace('-', ' / ')} practice.
              </h2>
            </div>
            <ProjectGrid projects={related} />
          </Container>
        </section>
      )}
    </>
  );
}

function Meta({ label, value, mono = false }) {
  return (
    <div>
      <p className="label-mono text-text-muted mb-1.5">{label}</p>
      <div className={mono ? 'font-mono text-text-primary tabular' : 'text-text-primary'}>
        {value}
      </div>
    </div>
  );
}
