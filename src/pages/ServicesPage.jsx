import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { CallToAction } from '@/components/sections/CallToAction';
import { services } from '@/data/services';
import { serviceIcons } from '@/lib/service-icons';
import { fadeUp, stagger } from '@/lib/motion';

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <GridBackdrop />
        <Container className="pt-20 md:pt-28 pb-16 md:pb-20">
          <SectionLabel number="02" label="SERVICES" />
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold text-text-primary tracking-tight leading-[1.0] max-w-4xl">
            Four practices,<br /> one stack,{' '}
            <span className="italic font-normal text-accent">one rig.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            We don't pivot the architecture for every brief. The same modular layers underwrite
            every product, which is why we can ship them.
          </p>
        </Container>
      </section>

      {/* Services list */}
      <Container className="py-20 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-16 md:space-y-24"
        >
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <motion.article
                key={s.id}
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6"
              >
                {/* Index + icon */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-text-muted tabular">
                      0{i + 1} / 0{services.length}
                    </span>
                  </div>
                  <div className="mt-5 w-14 h-14 rounded-2xl bg-accent-light text-accent inline-flex items-center justify-center">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Body */}
                <div className="lg:col-span-9">
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight leading-[1.05]">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-text-secondary text-lg leading-relaxed max-w-2xl">
                    {s.summary}
                  </p>

                  <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 items-start text-text-secondary text-[15px] leading-relaxed"
                      >
                        <span className="mt-1 flex-none w-4 h-4 rounded-full bg-accent-light text-accent inline-flex items-center justify-center">
                          <Check size={10} strokeWidth={2.75} />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-20 pt-10 border-t border-border flex flex-wrap items-center gap-4">
          <Link to="/projects">
            <Button variant="outline" size="lg">
              See it shipped
              <ArrowUpRight size={16} strokeWidth={2} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg">
              Brief us
              <ArrowUpRight size={16} strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </Container>

      <CallToAction />
    </>
  );
}
