import { type ReactNode, useEffect, useState } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import './App.css'
import ProjectCard from './ProjectCard'
import ProjectPage from './ProjectPage'
import { projects, projectsBySlug } from './projects'

const socialLinks = [
  ['GitHub', 'https://github.com/keegabit', 'blue'],
  ['X / Twitter', 'https://x.com/keegabit', 'purple'],
  ['YouTube', 'https://www.youtube.com/@keegabit', 'red'],
]

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [hash, setHash] = useState(() => window.location.hash)
  const projectSlug = hash.match(/^#\/projects\/([^/]+)/)?.[1]
  const activeProject = projectSlug ? projectsBySlug[projectSlug] : undefined

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = activeProject
      ? `${activeProject.title} — keegabit`
      : 'keegabit — playful software'
  }, [activeProject])

  useEffect(() => {
    if (!activeProject) return

    const sectionId = hash.match(/^#\/projects\/[^/]+\/([^/]+)/)?.[1]
    if (sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView()
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeProject, hash])

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-shell" id="top">
        <header>
          <a className="brand" href="#top" aria-label="Keegabit, back to top">
            <span>K</span>
            keegabit
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#links">Links</a>
          </nav>
        </header>

        {activeProject ? (
          <ProjectPage project={activeProject} />
        ) : (
        <main>
          <section className="hero">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 130, damping: 16 }}
            >
              <h1>I make software with personality.</h1>
              <p>Code, games, and fun ideas.</p>
              <motion.a
                className="chunky-button green-button"
                href="#work"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={{ y: 4 }}
              >
                See my work
              </motion.a>
            </motion.div>

            <motion.div
              className="hero-avatar-card"
              initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{
                delay: reduceMotion ? 0 : 0.12,
                type: 'spring',
                stiffness: 160,
                damping: 14,
              }}
            >
              <img
                src="/keegabit-avatar.png"
                alt="Keegan smiling over a pool table"
                width="500"
                height="500"
              />
              <span className="online-dot" aria-label="Online" />
              <strong>Hi, I’m Keegan.</strong>
            </motion.div>
          </section>

          <section className="work-section" id="work">
            <Reveal className="section-heading">
              <span className="section-badge">Portfolio</span>
              <h2>Things I’ve made</h2>
            </Reveal>

            <div className="project-grid">
              {projects.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>

          <section className="links-section" id="links">
            <Reveal>
              <span className="section-badge">Say hello</span>
              <h2>Find me online</h2>
            </Reveal>
            <div className="social-links">
              {socialLinks.map(([label, href, color], index) => (
                <motion.a
                  key={label}
                  className={`social-button ${color}-social`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={{ y: 3 }}
                >
                  {label}
                  <span>↗</span>
                </motion.a>
              ))}
            </div>
          </section>
        </main>
        )}

        <footer>
          <span className="footer-mark">K</span>
          <p>© {new Date().getFullYear()} Keegan</p>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
