import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { LayoutGroup, MotionConfig, motion, useReducedMotion } from 'motion/react'
import './App.css'
import ProjectCard from './ProjectCard'
import ProjectPage from './ProjectPage'
import { projects, projectsBySlug } from './projects'

const socialLinks = [
  ['GitHub', 'https://github.com/keegabit', 'blue'],
  ['X / Twitter', 'https://x.com/keegabit', 'purple'],
  ['YouTube', 'https://www.youtube.com/@keegabit', 'red'],
]

const seenProjectsKey = 'keegabit-seen-projects'

function getSeenProjects() {
  try {
    const storedProjects = JSON.parse(
      window.localStorage.getItem(seenProjectsKey) ?? '[]',
    )
    return Array.isArray(storedProjects)
      ? storedProjects.filter((slug): slug is string => typeof slug === 'string')
      : []
  } catch {
    return []
  }
}

function getProjectSlug(hash: string) {
  return hash.match(/^#\/projects\/([^/]+)/)?.[1]
}

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
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const [heroCopyHeight, setHeroCopyHeight] = useState<number>()
  const [hash, setHash] = useState(() => window.location.hash)
  const hashRef = useRef(hash)
  const [seenProjectSlugs, setSeenProjectSlugs] = useState(getSeenProjects)
  const [projectNavigation, setProjectNavigation] = useState({
    isDetailNavigation: false,
    direction: 1,
  })
  const projectSlug = getProjectSlug(hash)
  const activeProject = projectSlug ? projectsBySlug[projectSlug] : undefined

  useLayoutEffect(() => {
    if (activeProject || !heroCopyRef.current) return

    const heroCopy = heroCopyRef.current
    const matchCardToCopy = () => {
      setHeroCopyHeight(Math.round(heroCopy.getBoundingClientRect().height))
    }

    matchCardToCopy()
    const observer = new ResizeObserver(matchCardToCopy)
    observer.observe(heroCopy)
    return () => observer.disconnect()
  }, [activeProject])

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash
      const previousSlug = getProjectSlug(hashRef.current)
      const nextSlug = getProjectSlug(nextHash)
      const isDetailNavigation = Boolean(
        previousSlug && nextSlug && previousSlug !== nextSlug,
      )

      let direction = 1
      if (isDetailNavigation && previousSlug && nextSlug) {
        const previousIndex = projects.findIndex(
          (project) => project.slug === previousSlug,
        )
        const followingProject = projects[(previousIndex + 1) % projects.length]
        direction = followingProject.slug === nextSlug ? 1 : -1
      }

      setProjectNavigation({ isDetailNavigation, direction })
      hashRef.current = nextHash
      setHash(nextHash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = activeProject
      ? `${activeProject.title} | keegabit`
      : 'keegabit | playful software'
  }, [activeProject])

  useEffect(() => {
    if (!activeProject) return

    setSeenProjectSlugs((current) => {
      if (current.includes(activeProject.slug)) return current

      const next = [...current, activeProject.slug]
      try {
        window.localStorage.setItem(seenProjectsKey, JSON.stringify(next))
      } catch {
        // Browsing still works when storage is unavailable.
      }
      return next
    })
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
          <a className="brand" href="#top" aria-label="keegabit.dev, back to top">
            <span>K</span>
            keegabit.dev
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#links">Links</a>
          </nav>
        </header>

        <LayoutGroup>
          {activeProject ? (
            <ProjectPage
              project={activeProject}
              seenProjectSlugs={seenProjectSlugs}
              isDetailNavigation={projectNavigation.isDetailNavigation}
              navigationDirection={projectNavigation.direction}
              onNavigationComplete={() =>
                setProjectNavigation((current) => ({
                  ...current,
                  isDetailNavigation: false,
                }))
              }
            />
          ) : (
          <main>
          <section className="hero">
            <motion.div
              ref={heroCopyRef}
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
              style={heroCopyHeight ? { height: heroCopyHeight } : undefined}
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
                width="1254"
                height="1254"
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
        </LayoutGroup>

        <footer>
          <span className="footer-mark">K</span>
          <p>© {new Date().getFullYear()} Keegan</p>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
