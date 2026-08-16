import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ProjectComingSoonPage from '@/pages/projects/ProjectComingSoonPage';
import { projects } from '@/data/projects';

/**
 * About content, one module per project — same registry shape
 * `ProjectDetailPage` uses for custom product pages.
 *
 * `site.about` in the project data decides whether the nav item reads live or
 * `soon`. This registry decides what the route renders. A declaration that runs
 * ahead of its content degrades to the placeholder rather than crashing.
 */
const aboutPages = {
  'first-bite': lazy(() => import('@/pages/projects/about/first-bite')),
};

export default function ProjectAboutPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const Content = aboutPages[id];

  if (!project || !Content) return <ProjectComingSoonPage section="An about page" />;

  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="label-mono text-text-muted">Loading…</span>
        </div>
      }
    >
      <Content project={project} />
    </Suspense>
  );
}
