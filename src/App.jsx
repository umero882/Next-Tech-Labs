import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { BLOG_BASE } from '@/lib/blog';
import { RootLayout } from '@/components/layout/RootLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

// Lazy-load pages to keep the initial JS payload trim.
const HomePage          = lazy(() => import('@/pages/HomePage'));
const ProjectsPage      = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const PMSupport         = lazy(() => import('@/pages/projects/PasswordManagerSupportPage'));
const PMPrivacy         = lazy(() => import('@/pages/projects/PasswordManagerPrivacyPage'));
const PMTerms           = lazy(() => import('@/pages/projects/PasswordManagerTermsPage'));
const FBPrivacy         = lazy(() => import('@/pages/projects/FirstBitePrivacyPage'));
const FBTerms           = lazy(() => import('@/pages/projects/FirstBiteTermsPage'));
const FBDelete          = lazy(() => import('@/pages/projects/FirstBiteDeleteAccountPage'));
const FBSupport         = lazy(() => import('@/pages/projects/FirstBiteSupportPage'));
const BlogPage          = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage      = lazy(() => import('@/pages/BlogPostPage'));
const ProjectSoon       = lazy(() => import('@/pages/projects/ProjectComingSoonPage'));
const ProjectAbout      = lazy(() => import('@/pages/projects/ProjectAboutPage'));
const ProjectContact    = lazy(() => import('@/pages/projects/ProjectContactPage'));
const CategoriesPage    = lazy(() => import('@/pages/CategoriesPage'));
const TechPage          = lazy(() => import('@/pages/TechPage'));
const ServicesPage      = lazy(() => import('@/pages/ServicesPage'));
const AboutPage         = lazy(() => import('@/pages/AboutPage'));
const ContactPage       = lazy(() => import('@/pages/ContactPage'));
const TermsPage         = lazy(() => import('@/pages/TermsPage'));
const PrivacyPage       = lazy(() => import('@/pages/PrivacyPage'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <span className="label-mono text-text-muted">Loading…</span>
    </div>
  );
}

/**
 * /blog/<slug> → the same article under First Bite.
 *
 * Those five URLs are published and indexed, so they keep working. `Navigate`
 * cannot interpolate a param on its own, hence the component. Delete this once
 * /blog carries the studio's own posts and the redirect would start shadowing
 * them.
 */
function LegacyPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`${BLOG_BASE}/${slug}`} replace />;
}

function NotFound() {
  return (
    <Container className="py-32 text-center">
      <SectionLabel number="404" label="NOT FOUND" />
      <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-text-primary">
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
            path="projects/password-manager/support"
            element={
              <Suspense fallback={<PageFallback />}>
                <PMSupport />
              </Suspense>
            }
          />
          <Route
            path="projects/password-manager/privacy"
            element={
              <Suspense fallback={<PageFallback />}>
                <PMPrivacy />
              </Suspense>
            }
          />
          <Route
            path="projects/password-manager/terms"
            element={
              <Suspense fallback={<PageFallback />}>
                <PMTerms />
              </Suspense>
            }
          />
          <Route
            path="projects/first-bite/privacy"
            element={
              <Suspense fallback={<PageFallback />}>
                <FBPrivacy />
              </Suspense>
            }
          />
          <Route
            path="projects/first-bite/terms"
            element={
              <Suspense fallback={<PageFallback />}>
                <FBTerms />
              </Suspense>
            }
          />
          <Route
            path="projects/first-bite/delete-account"
            element={
              <Suspense fallback={<PageFallback />}>
                <FBDelete />
              </Suspense>
            }
          />
          <Route
            path="projects/first-bite/support"
            element={
              <Suspense fallback={<PageFallback />}>
                <FBSupport />
              </Suspense>
            }
          />
          {/*
            The blog belongs to First Bite, so it lives under First Bite. These
            two sit above `projects/:id` because that dynamic route would
            otherwise swallow them.

            /blog stays reserved for Next Tech Labs' own writing and redirects
            here in the meantime, which is also what keeps the five URLs already
            indexed at /blog/<slug> alive. nginx serves the real 301s (see
            nginx.conf); these client routes cover in-app navigation and
            `npm run dev`, where nginx is not in the loop.
          */}
          <Route
            path="projects/first-bite/blog"
            element={
              <Suspense fallback={<PageFallback />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="projects/first-bite/blog/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BlogPostPage />
              </Suspense>
            }
          />
          {/*
            Gated project pages. These sit above `projects/:id` because that
            dynamic route would swallow them, and below the static
            `projects/first-bite/blog` routes, which React Router already ranks
            higher than `projects/:id/blog` — static segments beat dynamic ones.
          */}
          <Route
            path="projects/:id/blog"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectSoon section="A blog" />
              </Suspense>
            }
          />
          <Route
            path="projects/:id/about"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectAbout />
              </Suspense>
            }
          />
          <Route
            path="projects/:id/contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProjectContact />
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
          <Route path="blog" element={<Navigate to={BLOG_BASE} replace />} />
          <Route path="blog/:slug" element={<LegacyPostRedirect />} />
          <Route
            path="categories"
            element={
              <Suspense fallback={<PageFallback />}>
                <CategoriesPage />
              </Suspense>
            }
          />
          <Route
            path="tech"
            element={
              <Suspense fallback={<PageFallback />}>
                <TechPage />
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
          <Route
            path="terms"
            element={
              <Suspense fallback={<PageFallback />}>
                <TermsPage />
              </Suspense>
            }
          />
          <Route
            path="privacy"
            element={
              <Suspense fallback={<PageFallback />}>
                <PrivacyPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
