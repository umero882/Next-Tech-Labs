import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { BlogCard } from '@/components/blog/BlogCard';
import { DownloadCta } from '@/components/blog/DownloadCta';
import { Sources } from '@/components/blog/prose';
import {
  ArticleMeta,
  FaqSection,
  KeyTakeaways,
  MedicalDisclaimer,
  TableOfContents,
} from '@/components/blog/articleBlocks';
import { useSeo } from '@/hooks/useSeo';
import { posts } from '@/data/blog';
import { findPost, postPath, relatedPosts } from '@/lib/blog';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMobileAppJsonLd,
} from '@/lib/seo';
import { projects } from '@/data/projects';
import { fadeUp, stagger } from '@/lib/motion';

import * as peanut from '@/pages/blog/posts/when-to-introduce-peanut-butter-to-baby';
import * as schedule from '@/pages/blog/posts/baby-allergen-introduction-schedule';
import * as solids from '@/pages/blog/posts/starting-solids-first-foods-for-baby';
import * as reactions from '@/pages/blog/posts/signs-of-food-allergy-in-babies';
import * as blw from '@/pages/blog/posts/baby-led-weaning-vs-purees';

/**
 * Post prose modules, keyed by slug. Statically imported: the whole blog is one
 * lazy route chunk, and five text modules are cheaper than five extra requests.
 * Split to `lazy()` per post if this list passes ~20.
 */
const postModules = {
  'when-to-introduce-peanut-butter-to-baby': peanut,
  'baby-allergen-introduction-schedule': schedule,
  'starting-solids-first-foods-for-baby': solids,
  'signs-of-food-allergy-in-babies': reactions,
  'baby-led-weaning-vs-purees': blw,
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = findPost(posts, slug);
  const mod = postModules[slug];

  if (!post || !mod) return <PostNotFound />;

  const Body = mod.default;
  const app = projects.find((p) => p.id === post.app);
  const related = relatedPosts(posts, post, 2);
  const path = postPath(post.slug);

  return (
    <>
      <PostSeo post={post} app={app} path={path} />

      {/* ───────────── HEADER ───────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 0%, rgba(39,196,90,0.14) 0%, transparent 55%),
              radial-gradient(at 85% 100%, rgba(127,77,243,0.14) 0%, transparent 50%)
            `,
          }}
        />
        <Container className="relative pt-10 md:pt-14 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 label-mono text-text-muted">
            <Link to="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <ChevronRight size={12} strokeWidth={1.75} />
            <span className="text-text-secondary">{post.topic}</span>
          </nav>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-8 max-w-3xl">
            <motion.div variants={fadeUp}>
              <Badge variant="muted">{post.topic}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-3xl md:text-5xl font-semibold text-text-primary tracking-tight leading-[1.08]"
            >
              {post.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-text-secondary text-lg leading-relaxed max-w-2xl"
            >
              {post.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <ArticleMeta post={post} />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ───────────── ARTICLE ───────────── */}
      <Container className="py-12 md:py-16">
        <div className="max-w-3xl">
          <KeyTakeaways items={post.takeaways} />
          <TableOfContents sections={mod.sections} />

          <article>
            <Body />
          </article>

          <Sources items={mod.sources} />
          <FaqSection faqs={post.faqs} />
          <MedicalDisclaimer />

          <DownloadCta className="mt-14" appId={post.app} />
        </div>
      </Container>

      {/* ───────────── RELATED ───────────── */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <Container className="py-16 md:py-20">
            <SectionLabel number="·" label="KEEP READING" />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ───────────── STUDIO CTA ───────────── */}
      <section className="border-t border-border">
        <Container className="py-14 flex flex-wrap items-center justify-between gap-6">
          <p className="text-text-secondary max-w-xl leading-relaxed">
            First Bite is built by Next Tech Labs — a studio shipping mobile, web, and AI products.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects/first-bite">
              <Button variant="outline" size="md">
                How it&rsquo;s built
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

/**
 * Structured data + head tags for a post. Split out so the page body stays
 * readable — this is all metadata, none of it renders.
 *
 * @param {{post: Object, app?: Object, path: string}} props
 */
function PostSeo({ post, app, path }) {
  const image = app?.cover?.image;

  const jsonLd = [
    buildArticleJsonLd({
      title: post.title,
      description: post.description,
      path,
      image,
      published: post.published,
      updated: post.updated,
      keywords: post.keywords,
    }),
    buildFaqJsonLd(post.faqs),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.headline, path },
    ]),
  ];

  if (app) {
    jsonLd.push(
      buildMobileAppJsonLd({
        name: app.name,
        description: app.tagline,
        path: `/projects/${app.id}`,
        image: app.cover?.image,
        appStore: app.links?.appStore,
        playStore: app.links?.playStore,
      }),
    );
  }

  useSeo({
    title: `${post.title} | Next Tech Labs`,
    description: post.description,
    path,
    image,
    type: 'article',
    keywords: post.keywords,
    published: post.published,
    updated: post.updated,
    jsonLd,
  });

  return null;
}

function PostNotFound() {
  useSeo({
    title: 'Article not found | Next Tech Labs',
    description: 'That article does not exist. Browse the First Bite blog instead.',
    path: '/blog',
    noindex: true,
  });

  return (
    <Container className="py-32 text-center">
      <SectionLabel number="404" label="NOT FOUND" className="justify-center" />
      <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-text-primary">
        That article doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 text-text-muted">It may have been renamed, or never published.</p>
      <Link to="/blog" className="inline-block mt-8">
        <Button variant="outline">
          <ArrowLeft size={14} /> All articles
        </Button>
      </Link>
    </Container>
  );
}
