import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

// Lazy-load pages to keep the initial JS payload trim.
const HomePage          = lazy(() => import('@/pages/HomePage'));
const ProjectsPage      = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const ServicesPage      = lazy(() => import('@/pages/ServicesPage'));
const AboutPage         = lazy(() => import('@/pages/AboutPage'));
const ContactPage       = lazy(() => import('@/pages/ContactPage'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="label-mono text-text-muted">Loading…</span>
    </div>
  );
}

function NotFound() {
  return (
    <Container className="py-32 text-center">
      <SectionLabel number="404" label="NOT FOUND" />
      <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary">
        Nothing here.
      </h1>
      <p className="mt-4 text-text-muted">The page you wanted doesn't exist.</p>
      <Link to="/" className="inline-block mt-8">
        <Button>Take me home</Button>
      </Link>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="projects/:id"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectDetailPage />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<PageFallback />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
