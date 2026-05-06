import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';
import { buildCoverStyle } from '@/lib/cover';
import { cn } from '@/lib/cn';

/**
 * @param {{ project: import('@/data/projects').Project, wide?: boolean }} props
 */
export function ProjectCard({ project, wide = false }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn('group', wide && 'md:col-span-2')}
    >
      <Link
        to={`/projects/${project.id}`}
        className={cn(
          'block h-full rounded-2xl overflow-hidden',
          'bg-bg-secondary border border-border',
          'transition-colors duration-300',
          'hover:border-[var(--color-accent-border)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        )}
      >
        {/* Cover */}
        <div
          className={cn(
            'relative w-full',
            wide ? 'aspect-[16/9]' : 'aspect-[4/3]',
          )}
          style={buildCoverStyle(project.cover)}
        >
          <div className="absolute inset-0 flex items-start justify-between p-5">
            <span className="label-mono text-text-primary/80 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md">
              {project.code}
            </span>
            <StatusDot status={project.status} className="bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-secondary to-transparent" />
        </div>

        {/* Body */}
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl md:text-[26px] font-semibold text-text-primary leading-tight tracking-tight">
                {project.name}
              </h3>
              <p className="mt-2 text-text-secondary text-[15px] leading-relaxed max-w-prose">
                {project.tagline}
              </p>
            </div>

            <motion.span
              variants={{ rest: { x: 0, y: 0 }, hover: { x: 4, y: -4 } }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-none w-9 h-9 inline-flex items-center justify-center rounded-full border border-border text-text-muted group-hover:text-accent group-hover:border-[var(--color-accent-border)]"
              aria-hidden="true"
            >
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </motion.span>
          </div>

          {/* Stack chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, wide ? 6 : 4).map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
            {project.stack.length > (wide ? 6 : 4) && (
              <Badge variant="outline">+{project.stack.length - (wide ? 6 : 4)}</Badge>
            )}
          </div>

          {/* Meta line */}
          <div className="mt-6 pt-5 border-t border-border-muted flex items-center justify-between">
            <span className="label-mono text-text-muted tabular">{project.year}</span>
            <span className="label-mono text-text-muted truncate max-w-[60%] text-right">
              {project.client}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
