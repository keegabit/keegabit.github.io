import { motion, useReducedMotion } from 'motion/react'
import ProjectVisual from './ProjectVisual'
import type { Project } from './projects'

export default function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="project-card"
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={{ scale: 0.99 }}
    >
      <a
        className="project-art"
        href={`#/projects/${project.slug}`}
        aria-label={`Read the ${project.title} project story`}
      >
        <ProjectVisual project={project} shared />
      </a>

      <div className="project-copy">
        <div>
          <span className={`tiny-label ${project.card.labelColor}-label`}>
            {project.label}
          </span>
          <h3>{project.title}</h3>
          <p>{project.card.summary}</p>
        </div>
        <a
          className={`chunky-button ${project.card.buttonColor}-button`}
          href={`#/projects/${project.slug}`}
        >
          Read the story →
        </a>
      </div>
    </motion.article>
  )
}
