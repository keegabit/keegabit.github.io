import { useEffect, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import './App.css'

const socialLinks = [
  { label: 'GitHub', handle: '@keegabit', href: 'https://github.com/keegabit' },
  { label: 'X / Twitter', handle: '@keegabit', href: 'https://x.com/keegabit' },
  {
    label: 'Instagram',
    handle: '@keegabit',
    href: 'https://www.instagram.com/keegabit/',
  },
  {
    label: 'YouTube',
    handle: '@keegabit',
    href: 'https://www.youtube.com/@keegabit',
  },
  {
    label: 'TikTok',
    handle: '@keegabit',
    href: 'https://www.tiktok.com/@keegabit',
  },
  {
    label: 'Discord',
    handle: 'Join the server',
    href: 'https://discord.gg/FpP7g6D5uP',
  },
]

const disciplines = [
  {
    number: '01',
    title: 'Web & product',
    copy: 'Interfaces that are clear, fast, and full of thoughtful little details.',
    tools: 'React · TypeScript · Design systems',
  },
  {
    number: '02',
    title: 'Games & worlds',
    copy: 'Playful systems, satisfying interactions, and ideas you can get lost in.',
    tools: 'C++ · Unreal · Godot · Unity',
  },
  {
    number: '03',
    title: 'Sound & art',
    copy: 'The visual and sonic layer that gives a project its own personality.',
    tools: 'FL Studio · 3D · Creative tooling',
  },
]

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })
  const entranceDelay = shouldReduceMotion ? 0 : 1

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowIntro(false), 1350)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {showIntro && !shouldReduceMotion ? (
          <motion.div
            className="intro"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              KEEGABIT
            </motion.p>
            <div className="intro-track">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.82, delay: 0.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="site-shell" id="top">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Keegabit, back to top">
            K<span>●</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a className="nav-cta" href="#connect">
              Connect
            </a>
          </nav>
        </header>

        <main>
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: entranceDelay + 0.05, duration: 0.55 }}
              >
                <span className="status-dot" />
                Developer · Game maker · Creative technologist
              </motion.div>

              <h1 id="hero-title">
                <motion.span
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: entranceDelay + 0.08,
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  I build playful
                </motion.span>
                <motion.span
                  className="hero-title-accent"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: entranceDelay + 0.18,
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  digital things.
                </motion.span>
              </h1>

              <motion.p
                className="hero-intro"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: entranceDelay + 0.34, duration: 0.62 }}
              >
                I’m Keegan—a software developer and indie game maker turning
                curious ideas into things people can use, play, and remember.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: entranceDelay + 0.46, duration: 0.55 }}
              >
                <motion.a
                  className="button button-primary"
                  href="#work"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See what I make <span aria-hidden="true">↓</span>
                </motion.a>
                <motion.a
                  className="text-link"
                  href="https://github.com/keegabit"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                >
                  Explore my GitHub <span aria-hidden="true">↗</span>
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              className="hero-stage"
              initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: entranceDelay + 0.12,
                type: 'spring',
                stiffness: 110,
                damping: 17,
              }}
              aria-hidden="true"
            >
              <div className="stage-grid" />
              <motion.div
                className="stage-card stage-card-code"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -9, 0], rotate: [-5, -3, -5] }
                }
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>BUILDING WITH</span>
                <strong>CODE + CURIOSITY</strong>
              </motion.div>
              <div className="portrait-frame">
                <img
                  src="/keegabit-avatar.png"
                  alt=""
                  width="500"
                  height="500"
                />
              </div>
              <motion.div
                className="stage-card stage-card-play"
                animate={
                  shouldReduceMotion ? undefined : { y: [0, 8, 0], rotate: [5, 3, 5] }
                }
                transition={{
                  duration: 4.2,
                  delay: 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span>CURRENT MODE</span>
                <strong>MAKE IT FUN</strong>
              </motion.div>
              <motion.span
                className="orbit-ball"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: [0, 76, 116, 35, 0],
                        y: [0, -74, 8, 60, 0],
                        rotate: [0, 180, 360, 540, 720],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
              <span className="stage-note">PHX · AZ</span>
            </motion.div>

            <div className="scroll-cue" aria-hidden="true">
              <span>Scroll to explore</span>
              <i />
            </div>
          </section>

          <div className="ticker" aria-label="Skills and interests">
            <div className="ticker-track">
              <span>React</span>
              <i>●</i>
              <span>TypeScript</span>
              <i>●</i>
              <span>C++</span>
              <i>●</i>
              <span>Unreal</span>
              <i>●</i>
              <span>Godot</span>
              <i>●</i>
              <span>Music</span>
              <i>●</i>
              <span>Art</span>
              <i>●</i>
              <span aria-hidden="true">React</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">TypeScript</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">C++</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">Unreal</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">Godot</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">Music</span>
              <i aria-hidden="true">●</i>
              <span aria-hidden="true">Art</span>
              <i aria-hidden="true">●</i>
            </div>
          </div>

          <section className="work-section section" id="work">
            <Reveal className="section-heading">
              <div>
                <span className="section-number">01 / Selected work</span>
                <h2>Made to be played.</h2>
              </div>
              <p>
                A finished game built around experimentation, satisfying
                physics, and the joy of finding your own solution.
              </p>
            </Reveal>

            <Reveal>
              <motion.article
                className="project-card"
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <a
                  className="project-image"
                  href="https://store.steampowered.com/app/3973980/Ping_Pan/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Ping Pan on Steam"
                >
                  <img
                    src="/ping-pan-hero.jpg"
                    alt="Illustrated Ping Pan scene with a ping pong ball bouncing between household objects"
                    width="1920"
                    height="620"
                  />
                  <span className="project-launch" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <div className="project-details">
                  <div>
                    <span className="project-kicker">Released on Steam · 2025</span>
                    <h3>Ping Pan</h3>
                  </div>
                  <div className="project-summary">
                    <p>
                      Place objects. Bounce balls. Land it in the cup. A
                      creative physics puzzler with handcrafted levels,
                      multiple solutions, and a level editor.
                    </p>
                    <div className="tag-list" aria-label="Project features">
                      <span>Game design</span>
                      <span>Physics</span>
                      <span>Level editor</span>
                    </div>
                    <a
                      className="project-link"
                      href="https://store.steampowered.com/app/3973980/Ping_Pan/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Play on Steam <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          </section>

          <section className="disciplines-section section">
            <Reveal className="section-heading compact">
              <div>
                <span className="section-number">02 / What I do</span>
                <h2>One brain, many tabs.</h2>
              </div>
            </Reveal>

            <div className="discipline-grid">
              {disciplines.map((discipline, index) => (
                <Reveal key={discipline.title} delay={index * 0.08}>
                  <motion.article
                    className={`discipline-card discipline-card-${index + 1}`}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -8, rotate: index - 1 }
                    }
                    whileTap={{ scale: 0.985 }}
                  >
                    <span>{discipline.number}</span>
                    <h3>{discipline.title}</h3>
                    <p>{discipline.copy}</p>
                    <small>{discipline.tools}</small>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="about-section section" id="about">
            <Reveal className="about-photo-wrap">
              <motion.div
                className="about-photo"
                whileHover={shouldReduceMotion ? undefined : { rotate: -2, scale: 1.015 }}
              >
                <img
                  src="/keegabit-avatar.png"
                  alt="Keegan leaning over a pool table and smiling at the camera"
                  width="500"
                  height="500"
                />
                <span>Yep, that’s me.</span>
              </motion.div>
            </Reveal>

            <Reveal className="about-copy" delay={0.08}>
              <span className="section-number">03 / About me</span>
              <h2>Serious about the craft. Never too serious.</h2>
              <p className="about-lead">
                I love making things—software, games, music, art—and learning
                whatever the next idea demands.
              </p>
              <p>
                My favorite work lives where engineering and creativity overlap:
                technically solid, visually distinct, and enjoyable from the
                first interaction. I care about the details because the details
                are what make software feel human.
              </p>
              <div className="about-meta">
                <div>
                  <span>Based in</span>
                  <strong>Phoenix, Arizona</strong>
                </div>
                <div>
                  <span>Usually doing</span>
                  <strong>Building · Learning · Shipping</strong>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="connect-section section" id="connect">
            <Reveal>
              <span className="section-number light">04 / Find me online</span>
              <h2>
                Have something
                <br />
                <em>weird</em> in mind?
              </h2>
              <p>
                Good. Those are usually the interesting ideas. Come say hello,
                follow along, or see what I’m building next.
              </p>
            </Reveal>

            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.045, duration: 0.5 }}
                  whileHover={
                    shouldReduceMotion ? undefined : { x: 6, backgroundColor: '#f7f3e9' }
                  }
                  whileTap={{ scale: 0.985 }}
                >
                  <span>
                    <strong>{social.label}</strong>
                    <small>{social.handle}</small>
                  </span>
                  <i aria-hidden="true">↗</i>
                </motion.a>
              ))}
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="brand footer-brand" href="#top" aria-label="Back to top">
            K<span>●</span>
          </a>
          <p>Designed & built with curiosity.</p>
          <p>© {new Date().getFullYear()} Keegan</p>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
