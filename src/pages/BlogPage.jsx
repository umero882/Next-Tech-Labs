import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { BlogCard } from '@/components/blog/BlogCard';
import { DownloadCta } from '@/components/blog/DownloadCta';
import { useSeo } from '@/hooks/useSeo';
import { posts } from '@/data/blog';
import { projects } from '@/data/projects';
import { BLOG_BASE, postTopics, sortPostsByDate } from '@/lib/blog';
import { buildBlogJsonLd, buildBreadcrumbJsonLd, buildMobileAppJsonLd } from '@/lib/seo';
import { fadeUp, stagger } from '@/lib/motion';

const TITLE = 'Baby Allergens & Starting Solids — The First Bite Blog';
const DESCRIPTION =
  'Evidence-based guides on introducing the Big 9 allergens, starting solids, and spotting a reaction — from the team behind the First Bite app for iOS and Android.';

export default function BlogPage() {
  const ordered = sortPostsByDate(posts);
  const [lead, ...rest] = ordered;
  const topics = postTopics(ordered);
  const app = projects.find((p) => p.id === 'first-bite');

  useSeo({
    title: `${TITLE} | Next Tech Labs`,
    description: DESCRIPTION,
    path: BLOG_BASE,
    image: app?.cover?.image,
    keywords: [
      'baby allergen introduction',
      'starting solids',
      'baby food allergy',
      'first bite app',
      'baby led weaning',
    ],
    jsonLd: [
      buildBlogJsonLd({
        path: BLOG_BASE,
        name: TITLE,
        description: DESCRIPTION,
        posts: ordered,
      }),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'First Bite', path: '/projects/first-bite' },
      { name: 'Blog', path: BLOG_BASE },
      ]),
      app &&
        buildMobileAppJsonLd({
          name: app.name,
          description: app.tagline,
          path: `/projects/${app.id}`,
          image: app.cover?.image,
          appStore: app.links?.appStore,
          playStore: app.links?.playStore,
        }),
    ],
  });

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 15% 0%, rgba(39,196,90,0.16) 0%, transparent 55%),
              radial-gradient(at 85% 100%, rgba(127,77,243,0.16) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-14 md:pt-20 pb-14 md:pb-16">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <SectionLabel number="·" label="THE BLOG" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-4xl md:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] max-w-4xl"
            >
              Allergen introduction, starting solids,
              <br className="hidden md:block" />{' '}
              <span className="text-text-muted">and the bits nobody explains.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              Practical, evidence-based guides for a baby&rsquo;s first 1,000 days — written by the
              team that builds <Link to="/projects/first-bite" className="text-accent hover:underline underline-offset-4">First Bite</Link>,
              the allergy-prevention app for iOS and Android.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9">
              <p className="label-mono text-text-muted mb-3">GET THE APP — FREE</p>
              <StoreBadges
                appStore={app?.links?.appStore}
                playStore={app?.links?.playStore}
                appName="First Bite"
                size="lg"
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-2">
              <span className="label-mono text-text-muted mr-1">TOPICS</span>
              {topics.map((t) => (
                <Badge key={t} variant="muted">
                  {t}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ───────────── POSTS ───────────── */}
      <Container className="py-16 md:py-20">
        {lead && (
          <div className="mb-6">
            <BlogCard post={lead} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>

      {/* ───────────── DOWNLOAD CTA ───────────── */}
      <Container className="pb-20 md:pb-28">
        <DownloadCta
          title="Stop tracking nine allergens in your head"
          body="First Bite runs the 3-to-5 day waiting windows, nudges you when an introduced allergen is about to lapse, syncs the log across every caregiver, and scans a label to tell you whether it is safe for your baby right now."
        />
      </Container>

      {/* ───────────── STUDIO CTA ───────────── */}
      <section className="border-t border-border">
        <Container className="py-14 flex flex-wrap items-center justify-between gap-6">
          <p className="text-text-secondary max-w-xl leading-relaxed">
            Next Tech Labs builds production mobile, web, and AI products — First Bite is one of
            them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects">
              <Button variant="outline" size="md">
                See our work
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="md">
                Start a project <ArrowRight size={14} strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
