import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { useProjectFilter } from '@/hooks/useProjectFilter';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const { filtered, category, query, setCategory, setQuery, reset } =
    useProjectFilter(projects);

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <SectionLabel number="01" label="WORK" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0]">
            Every project,<br />
            <span className="italic font-normal text-accent">every</span> tier.
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Filter by category or search by stack, client, or outcome. Live products and concept
            pieces are both included — labelled honestly.
          </p>
        </Container>
      </section>

      {/* Filters + grid */}
      <section className="py-16 md:py-20">
        <Container>
          <ProjectFilters
            category={category}
            query={query}
            onCategoryChange={setCategory}
            onQueryChange={setQuery}
            onReset={reset}
            totalCount={projects.length}
            filteredCount={filtered.length}
          />

          <div className="mt-10 md:mt-12">
            <ProjectGrid projects={filtered} />
          </div>
        </Container>
      </section>
    </>
  );
}
