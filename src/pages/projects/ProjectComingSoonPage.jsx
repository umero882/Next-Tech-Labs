import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';

/**
 * Stands in for a nav item a project has not earned yet.
 *
 * The nav shows these items for every project so the shape never changes
 * between products. Clicking one lands here rather than doing nothing, which on
 * a phone is indistinguishable from a broken tap.
 */
export default function ProjectComingSoonPage({ section = 'This page' }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const project = projects.find((p) => p.id === id);

  useSeo({
    title: project
      ? `${section} — ${project.name} | Next Tech Labs`
      : 'Not found | Next Tech Labs',
    description: `${section} for ${project?.name ?? 'this project'} is not published yet.`,
    path: pathname,
    noindex: true,
  });

  if (!project) {
    return (
      <Container className="py-32 text-center">
        <SectionLabel number="404" label="NOT FOUND" />
        <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-text-primary">
          That project doesn't exist.
        </h1>
        <Link to="/projects" className="inline-block mt-8">
          <Button variant="outline">
            <ArrowLeft size={14} /> All projects
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-24 md:py-32 max-w-2xl">
      <SectionLabel number="·" label="COMING SOON" />
      <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05]">
        {section} for {project.name} isn't published yet.
      </h1>
      <p className="mt-5 text-text-secondary text-lg leading-relaxed">
        It's on the list. In the meantime the product page has the full picture,
        and we read every message sent through the contact form.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to={`/projects/${project.id}`}>
          <Button size="md">
            {project.name} overview <ArrowRight size={14} strokeWidth={2} />
          </Button>
        </Link>
        <Link to={`/projects/${project.id}/contact`}>
          <Button size="md" variant="outline">
            <Mail size={14} strokeWidth={2} /> Contact
          </Button>
        </Link>
      </div>
    </Container>
  );
}
