import { motion } from 'motion/react'
import type { Project, ProjectBlock } from './projects'

function ProjectCover({ project }: { project: Project }) {
  if (project.visual === 'ping-pan') {
    return (
      <img
        src="/ping-pan-hero.jpg"
        alt="Ping Pan game artwork"
        width="1920"
        height="620"
      />
    )
  }

  if (project.visual === 'tape-machine') {
    return (
      <img
        src="/tape-machine-vst.png"
        alt="Tape Machine VST interface"
        width="1383"
        height="1062"
      />
    )
  }

  return (
    <div className="story-tp-cover" aria-label="tp.games host, join, play flow">
      <div className="tp-logo">TP</div>
      <div className="tp-steps" aria-hidden="true">
        <span>HOST</span>
        <i>→</i>
        <span>JOIN</span>
        <i>→</i>
        <span>PLAY</span>
      </div>
    </div>
  )
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

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <main className={`project-story ${project.visual}-story`}>
      <motion.div
        className="story-intro"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <a className="story-back" href="#work">
          ← All projects
        </a>
        <span className="section-badge">{project.label}</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
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

      <motion.div
        className="story-cover"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08 }}
      >
        <ProjectCover project={project} />
      </motion.div>

      <div className="story-layout">
        <aside className="story-nav" aria-label="On this page">
          <strong>On this page</strong>
          {project.sections.map((section) => (
            <a
              key={section.id}
              href={`#/projects/${project.slug}/${section.id}`}
            >
              {section.title}
            </a>
          ))}
        </aside>

        <article className="story-article">
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
        </article>
      </div>
    </main>
  )
}
