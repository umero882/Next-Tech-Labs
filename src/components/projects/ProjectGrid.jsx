import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { stagger, fadeUp } from '@/lib/motion';

/**
 * @param {{ projects: Array, asymmetric?: boolean }} props
 */
export function ProjectGrid({ projects, asymmetric = false }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-border rounded-2xl">
        <p className="label-mono text-text-muted">No matching projects.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
    >
      {projects.map((project, i) => (
        <motion.div key={project.id} variants={fadeUp}>
          {/* Make the first project span 2 columns when asymmetric */}
          <ProjectCard project={project} wide={asymmetric && i === 0} />
        </motion.div>
      ))}
    </motion.div>
  );
}
