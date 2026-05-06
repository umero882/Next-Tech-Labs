import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { techStack } from '@/data/tech-stack';

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
        <div className="flex w-max animate-marquee">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center gap-3 px-6 py-2 label-mono text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
