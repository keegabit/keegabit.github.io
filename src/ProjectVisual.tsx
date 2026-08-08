import { motion } from 'motion/react'
import type { Project } from './projects'

export default function ProjectVisual({
  project,
  shared = false,
}: {
  project: Project
  shared?: boolean
}) {
  return (
    <motion.div
      className={`project-visual project-visual-${project.visual}`}
      layoutId={shared ? `project-visual-${project.slug}` : undefined}
      transition={{ type: 'spring', stiffness: 130, damping: 24 }}
    >
      <div className="project-visual-media">
        {project.visual === 'ping-pan' && (
          <img
            src="/ping-pan-hero.jpg"
            alt="Ping Pan game artwork"
            width="1920"
            height="620"
          />
        )}

        {project.visual === 'tape-machine' && (
          <img
            src="/tape-machine-vst.png"
            alt="Tape Machine VST interface"
            width="1383"
            height="1062"
          />
        )}

        {project.visual === 'handwritten-outreach' && (
          <img
            src="/handwritten-outreach-robot.jpg"
            alt="Letter-writing robot putting a personalized message onto paper"
            width="1368"
            height="2048"
          />
        )}

        {project.visual === 'dum-daw' && (
          <img
            src="/dum-daw.png"
            alt="DumDAW digital audio workstation interface"
            width="1906"
            height="1011"
          />
        )}

        {project.visual === 'tp-games' && (
          <div className="tp-visual-content" aria-label="tp.games host, join, play flow">
            <div className="tp-logo">TP</div>
            <div className="tp-steps" aria-hidden="true">
              <span>HOST</span>
              <i>→</i>
              <span>JOIN</span>
              <i>→</i>
              <span>PLAY</span>
            </div>
          </div>
        )}
      </div>

      {project.card.badge && (
        <span className="project-visual-badge">{project.card.badge}</span>
      )}
    </motion.div>
  )
}
