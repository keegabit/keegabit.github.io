import { motion } from 'motion/react'
import ProjectVisual from './ProjectVisual'
import type { Project, ProjectBlock } from './projects'

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

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <main className={`project-story ${project.visual}-story`}>
      <motion.article
        className="project-story-card"
        layoutId={`project-card-${project.slug}`}
        transition={{ type: 'spring', stiffness: 130, damping: 24 }}
      >
        <section className="story-hero">
          <ProjectVisual project={project} shared />
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
      </motion.article>
    </main>
  )
}
