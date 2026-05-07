import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { projects } from '@/data/projects';
import { sortShowcase } from '@/lib/filter';

export function FeaturedProjects() {
  const featured = sortShowcase(projects.filter((p) => p.featured)).slice(0, 6);

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <Container>
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <SectionLabel number="01" label="WORK" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight leading-[1.1]">
              The work that defines<br className="hidden md:inline" /> the studio.
            </h2>
          </div>

          <Link
            to="/projects"
            className="hidden md:inline-flex items-center gap-2 label-mono text-text-secondary hover:text-accent transition-colors group"
          >
            All projects
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <ProjectGrid projects={featured} asymmetric />

        <Link
          to="/projects"
          className="md:hidden mt-8 inline-flex items-center gap-2 label-mono text-text-secondary"
        >
          All projects <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </Container>
    </section>
  );
}
