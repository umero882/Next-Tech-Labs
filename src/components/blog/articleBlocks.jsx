import { Check, Clock, ListTree, Stethoscope } from 'lucide-react';
import { formatPostDate } from '@/lib/blog';

/**
 * Repeating structural blocks of an article page. Every post gets the same
 * frame — takeaways, contents, FAQ, disclaimer — so the layout is consistent
 * and the FAQ markup always matches the FAQPage structured data.
 */

/** @param {{post: Object}} props */
export function ArticleMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 label-mono text-text-muted">
      <time dateTime={post.published} className="tabular">
        {formatPostDate(post.published)}
      </time>
      <span className="inline-flex items-center gap-1.5 tabular">
        <Clock size={12} strokeWidth={1.75} /> {post.readingMinutes} min read
      </span>
      {post.updated && post.updated !== post.published && (
        <span className="tabular">Updated {formatPostDate(post.updated)}</span>
      )}
    </div>
  );
}

/** @param {{items: string[]}} props */
export function KeyTakeaways({ items = [] }) {
  if (!items.length) return null;
  return (
    <section
      aria-label="Key takeaways"
      className="my-10 rounded-2xl border border-border bg-bg-secondary p-6 md:p-7"
    >
      <p className="label-mono text-text-muted">THE SHORT VERSION</p>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 items-start text-text-secondary leading-relaxed">
            <span className="mt-0.5 flex-none w-5 h-5 rounded-full bg-success-light text-[var(--color-success)] inline-flex items-center justify-center">
              <Check size={12} strokeWidth={2.5} />
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** @param {{sections: Array<{id: string, label: string}>}} props */
export function TableOfContents({ sections = [] }) {
  if (sections.length < 3) return null;
  return (
    <nav aria-label="On this page" className="my-10 rounded-2xl border border-border p-6">
      <p className="label-mono text-text-muted inline-flex items-center gap-2">
        <ListTree size={13} strokeWidth={1.75} /> ON THIS PAGE
      </p>
      <ol className="mt-4 space-y-2">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-3 text-[15px]">
            <span className="font-mono text-text-muted tabular flex-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <a href={`#${s.id}`} className="text-text-secondary hover:text-accent transition-colors">
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Visible FAQ. The same `faqs` array feeds the FAQPage JSON-LD — Google only
 * honours FAQ rich results when the answers are on the page, so these two must
 * never diverge.
 *
 * @param {{faqs: Array<{q: string, a: string}>}} props
 */
export function FaqSection({ faqs = [] }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-16">
      <h2
        id="faq"
        className="font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight scroll-mt-24"
      >
        Frequently asked questions
      </h2>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <li key={f.q} className="py-6">
            <h3 className="font-display text-lg font-semibold text-text-primary">{f.q}</h3>
            <p className="mt-2 text-text-secondary leading-relaxed">{f.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MedicalDisclaimer() {
  return (
    <aside className="mt-12 rounded-xl border border-border bg-bg-secondary border-l-4 border-l-[var(--color-warning)] p-5 md:p-6">
      <p className="label-mono text-text-muted inline-flex items-center gap-2">
        <Stethoscope size={13} strokeWidth={1.75} /> NOT MEDICAL ADVICE
      </p>
      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
        This article is general educational information, not medical advice, diagnosis, or treatment,
        and it is no substitute for your own pediatrician or allergist — who knows your baby&rsquo;s
        history. Talk to them before starting allergens, and if your baby has severe eczema, an
        existing food allergy, or any reaction you are unsure about, talk to them first. For a severe
        reaction — trouble breathing, swelling of the lips or tongue, repeated vomiting, sudden
        floppiness — call your local emergency number immediately.
      </p>
    </aside>
  );
}
