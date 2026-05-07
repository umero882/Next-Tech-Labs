import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { techStack } from '@/data/tech-stack';

const CDN = 'https://cdn.simpleicons.org';

function logoUrl({ slug, color }) {
  return color ? `${CDN}/${slug}/${color}` : `${CDN}/${slug}`;
}

export function TechStackTicker() {
  // Duplicate so the marquee is seamless — translate -50% lands the second copy in place
  const items = [...techStack, ...techStack];

  return (
    <section className="py-20 md:py-24 border-t border-border bg-bg-primary overflow-hidden">
      <Container className="mb-10">
        <SectionLabel number="03" label="THE STACK" />
        <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight max-w-2xl leading-tight">
          The same opinions, every time. That's why they ship.
        </h2>
      </Container>

      <div
        className="relative w-full"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <ul
          className="flex w-max animate-marquee items-center"
          aria-label="Stack we use across every project"
        >
          {items.map((tech, i) => (
            <li
              key={`${tech.name}-${i}`}
              className="flex items-center gap-3 px-7 py-2"
            >
              <img
                src={logoUrl(tech)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="28"
                height="28"
                className="h-7 w-7 flex-none object-contain"
                onError={(e) => {
                  // Hide broken icon — leaves the text label as graceful fallback
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="label-mono text-text-secondary whitespace-nowrap">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
