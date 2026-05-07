import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { services } from '@/data/services';
import { serviceIcons } from '@/lib/service-icons';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/cn';

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 border-t border-border bg-bg-primary">
      <Container>
        <div className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel number="02" label="SERVICES" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight leading-[1.1]">
            Four practices.<br /> One stack. One rig.
          </h2>
          <p className="mt-5 text-text-secondary text-lg leading-relaxed max-w-xl">
            We don't pivot the architecture for every brief. The same modular layers underwrite
            every product, which is why we can ship them.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <motion.div
                key={s.id}
                variants={fadeUp}
                className={cn(
                  'group bg-bg-secondary p-7 md:p-9',
                  'transition-colors duration-300 hover:bg-bg-tertiary',
                )}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-accent-light text-accent inline-flex items-center justify-center">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="label-mono text-text-muted tabular">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed">{s.summary}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 label-mono text-text-secondary hover:text-accent transition-colors group"
          >
            Read the full services brief
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
