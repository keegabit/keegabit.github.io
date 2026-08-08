import { AnimatePresence, motion } from 'motion/react'
import ProjectVisual from './ProjectVisual'
import { projects, type Project, type ProjectBlock } from './projects'

const projectPanelVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 90,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -90,
  }),
}

function ContentBlock({ block }: { block: ProjectBlock }) {
  if (block.type === 'paragraph') {
    return <p>{block.text}</p>
  }

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className="story-figure">
        <img src={block.src} alt={block.alt} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    )
  }

  if (block.type === 'code') {
    return (
      <figure className="story-code">
        {block.caption && <figcaption>{block.caption}</figcaption>}
        <pre>
          <code data-language={block.language}>{block.code}</code>
        </pre>
      </figure>
    )
  }

  if (block.type === 'embed') {
    return (
      <div className="story-embed">
        <iframe src={block.src} title={block.title} loading="lazy" allowFullScreen />
      </div>
    )
  }

  return (
    <aside className="story-callout">
      <strong>{block.title}</strong>
      <p>{block.text}</p>
    </aside>
  )
}

export default function ProjectPage({
  project,
  isDetailNavigation,
  navigationDirection,
  onNavigationComplete,
}: {
  project: Project
  isDetailNavigation: boolean
  navigationDirection: number
  onNavigationComplete: () => void
}) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug)
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main className={`project-story ${project.visual}-story`}>
      <motion.article
        className="project-story-card"
        layoutId={
          isDetailNavigation ? undefined : `project-card-${project.slug}`
        }
        transition={{ type: 'spring', stiffness: 130, damping: 24 }}
      >
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={navigationDirection}
        >
          <motion.div
            key={project.slug}
            className="story-project-panel"
            custom={navigationDirection}
            variants={projectPanelVariants}
            initial={isDetailNavigation ? 'enter' : false}
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onAnimationComplete={(definition) => {
              if (isDetailNavigation && definition === 'center') {
                onNavigationComplete()
              }
            }}
          >
        <section className="story-hero">
          <ProjectVisual project={project} shared={!isDetailNavigation} />
          <a className="story-back" href="#work">
            ← Back
          </a>
          <motion.div
            className="story-hero-copy"
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, type: 'spring', stiffness: 130, damping: 18 }}
          >
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <span className="section-badge">{project.label}</span>
          {project.externalLink && (
            <a
              className="chunky-button blue-button"
              href={project.externalLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.externalLink.label} ↗
            </a>
          )}
          </motion.div>
        </section>

        <div className="story-content">
          <nav className="story-nav" aria-label="Explore this project">
            <strong>Explore</strong>
            {project.sections.map((section) => (
              <a
                key={section.id}
                href={`#/projects/${project.slug}/${section.id}`}
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="story-article">
            {project.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.blocks.map((block, index) => (
                  <ContentBlock key={`${section.id}-${block.type}-${index}`} block={block} />
                ))}
              </section>
            ))}

            <a className="story-end-link" href="#work">
              ← Back to all projects
            </a>
          </div>

        </div>
          </motion.div>
        </AnimatePresence>
      </motion.article>

      <nav className="story-project-pagination" aria-label="More projects">
        <a
          className="previous-project"
          href={`#/projects/${previousProject.slug}`}
          aria-label={`Previous project: ${previousProject.title}`}
          title={`Previous: ${previousProject.title}`}
        >
          <span className="pagination-arrow" aria-hidden="true">←</span>
          <span className="pagination-label">Previous</span>
          <span className="pagination-name">{previousProject.title}</span>
        </a>
        <a
          className="next-project"
          href={`#/projects/${nextProject.slug}`}
          aria-label={`Next project: ${nextProject.title}`}
          title={`Next: ${nextProject.title}`}
        >
          <span className="pagination-name">{nextProject.title}</span>
          <span className="pagination-label">Next</span>
          <span className="pagination-arrow" aria-hidden="true">→</span>
        </a>
      </nav>
    </main>
  )
}
