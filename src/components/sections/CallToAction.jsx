import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { fadeUp } from '@/lib/motion';
import { company } from '@/data/company';

export function CallToAction() {
  return (
    <section className="relative py-28 md:py-36 border-t border-border overflow-hidden">
      <GridBackdrop />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-4xl"
        >
          <SectionLabel number="04" label="START A PROJECT" />

          <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0]">
            Have something{' '}
            <span className="italic font-normal text-accent">stubborn</span>{' '}
            you want shipped?
          </h2>

          <p className="mt-8 text-text-secondary text-lg max-w-xl leading-relaxed">
            Send a paragraph about the problem. We'll send back a paragraph about how we'd solve it.
            If we both like the paragraphs, we keep going.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${company.channels.email}`}>
              <Button size="lg">
                <Mail size={16} strokeWidth={2} />
                {company.channels.email}
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                All channels
                <ArrowUpRight size={16} strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
