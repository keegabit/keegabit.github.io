import { useEffect, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from 'motion/react'
import './App.css'

const links = [
  ['GITHUB', 'https://github.com/keegabit'],
  ['X / TWITTER', 'https://x.com/keegabit'],
  ['YOUTUBE', 'https://www.youtube.com/@keegabit'],
  ['INSTAGRAM', 'https://www.instagram.com/keegabit/'],
  ['TIKTOK', 'https://www.tiktok.com/@keegabit'],
  ['DISCORD', 'https://discord.gg/FpP7g6D5uP'],
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [booting, setBooting] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const timeout = window.setTimeout(() => setBooting(false), 1050)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="crt">
        <AnimatePresence>
          {booting && !reduceMotion ? (
            <motion.div
              className="boot-screen"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                KEEGABIT BIOS v2.0
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                CHECKING MEMORY ........ OK
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62 }}
              >
                LOADING PORTFOLIO ....... OK
              </motion.p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.78 }}
              >
                _
              </motion.span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="terminal-shell" id="top">
          <header className="terminal-header">
            <a href="#top" className="terminal-brand">
              [ KEEGABIT_OS ]
            </a>
            <nav aria-label="Primary navigation">
              <a href="#work">WORK</a>
              <a href="#profile">INFO</a>
              <a href="#links">LINKS</a>
            </nav>
          </header>

          <main>
            <section className="hero terminal-section">
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 1, duration: 0.4 }}
              >
                <p className="status-line">
                  <span />
                  USER ONLINE // PHX_AZ
                </p>
                <p className="prompt">&gt; IDENTIFY USER</p>
                <h1>
                  SOFTWARE DEV
                  <br />
                  GAME MAKER
                </h1>
                <p className="short-copy">&gt; CODE. GAMES. MUSIC.</p>
                <div className="terminal-actions">
                  <motion.a
                    href="#work"
                    className="terminal-button"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    [ VIEW WORK ]
                  </motion.a>
                  <motion.a
                    href="https://github.com/keegabit"
                    target="_blank"
                    rel="noreferrer"
                    className="plain-link"
                    whileHover={{ x: 4 }}
                  >
                    GITHUB ↗
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="system-panel"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 1.12, duration: 0.4 }}
              >
                <div className="panel-title">
                  <span>SYS.MONITOR</span>
                  <span>ONLINE</span>
                </div>
                <div className="radar" aria-hidden="true">
                  <span className="radar-sweep" />
                  <i className="radar-point point-one" />
                  <i className="radar-point point-two" />
                  <b>+</b>
                </div>
                <dl className="system-list">
                  <div>
                    <dt>STATUS</dt>
                    <dd>BUILDING</dd>
                  </div>
                  <div>
                    <dt>PROJECT</dt>
                    <dd>PING PAN</dd>
                  </div>
                  <div>
                    <dt>UPTIME</dt>
                    <dd>ALWAYS</dd>
                  </div>
                </dl>
              </motion.div>
            </section>

            <section className="terminal-section" id="work">
              <Reveal className="section-title">
                <p>[ 01 ]</p>
                <h2>SELECTED_WORK</h2>
              </Reveal>

              <Reveal>
                <article className="project-terminal">
                  <a
                    href="https://store.steampowered.com/app/3973980/Ping_Pan/"
                    target="_blank"
                    rel="noreferrer"
                    className="project-screen"
                    aria-label="View Ping Pan on Steam"
                  >
                    <img
                      src="/ping-pan-hero.jpg"
                      alt="Ping Pan game artwork"
                      width="1920"
                      height="620"
                    />
                    <span>APP_ID: 3973980</span>
                  </a>
                  <div className="project-data">
                    <div>
                      <p className="prompt">&gt; EXECUTE PROJECT</p>
                      <h3>PING PAN</h3>
                    </div>
                    <div>
                      <p>PHYSICS PUZZLE // RELEASED 2025</p>
                      <a
                        href="https://store.steampowered.com/app/3973980/Ping_Pan/"
                        target="_blank"
                        rel="noreferrer"
                        className="terminal-button"
                      >
                        [ OPEN IN STEAM ↗ ]
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </section>

            <section className="terminal-section profile-section" id="profile">
              <Reveal className="section-title">
                <p>[ 02 ]</p>
                <h2>USER_PROFILE</h2>
              </Reveal>

              <div className="profile-grid">
                <Reveal>
                  <div className="profile-image">
                    <img
                      src="/keegabit-avatar.png"
                      alt="Keegan smiling over a pool table"
                      width="500"
                      height="500"
                    />
                    <span>KEEGAN.PNG</span>
                  </div>
                </Reveal>
                <Reveal className="profile-data">
                  <p className="prompt">&gt; DISPLAY BIO</p>
                  <h3>KEEGAN</h3>
                  <p>DEVELOPER. GAME MAKER. ALWAYS LEARNING.</p>
                  <dl>
                    <div>
                      <dt>WEB</dt>
                      <dd>REACT / TYPESCRIPT</dd>
                    </div>
                    <div>
                      <dt>GAMES</dt>
                      <dd>C++ / UNREAL / GODOT</dd>
                    </div>
                    <div>
                      <dt>OTHER</dt>
                      <dd>MUSIC / ART</dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </section>

            <section className="terminal-section" id="links">
              <Reveal className="section-title">
                <p>[ 03 ]</p>
                <h2>COMMS_LINKS</h2>
              </Reveal>

              <div className="link-list">
                {links.map(([label, href], index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{label}</strong>
                    <i>↗</i>
                  </motion.a>
                ))}
              </div>
            </section>
          </main>

          <footer>
            <span>KEEGABIT_OS // {new Date().getFullYear()}</span>
            <span className="cursor">█</span>
          </footer>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
