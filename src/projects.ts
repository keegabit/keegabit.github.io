export type ProjectBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'code'; code: string; language?: string; caption?: string }
  | { type: 'callout'; title: string; text: string }
  | { type: 'embed'; src: string; title: string }
  | {
      type: 'architecture'
      title: string
      ariaLabel: string
      lanes: Array<{
        label: string
        steps: Array<{
          title: string
          text: string
          tone?: 'success' | 'warning'
        }>
      }>
    }

export type ProjectSection = {
  id: string
  title: string
  blocks: ProjectBlock[]
}

export type Project = {
  slug: string
  title: string
  label: string
  summary: string
  card: {
    summary: string
    labelColor: 'green' | 'blue' | 'purple'
    buttonColor: 'yellow' | 'blue' | 'purple'
    badge?: string
  }
  visual: 'ping-pan' | 'tp-games' | 'tape-machine' | 'handwritten-outreach'
  externalLink?: {
    label: string
    href: string
  }
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    slug: 'ping-pan',
    title: 'Ping Pan',
    label: 'Game',
    summary: 'A playful physics puzzle game built around timing, motion, and satisfying chain reactions.',
    card: {
      summary: 'A playful physics puzzle game.',
      labelColor: 'green',
      buttonColor: 'yellow',
      badge: 'Released',
    },
    visual: 'ping-pan',
    externalLink: {
      label: 'Play on Steam',
      href: 'https://store.steampowered.com/app/3973980/Ping_Pan/',
    },
    sections: [
      {
        id: 'what-it-is',
        title: 'What it is',
        blocks: [
          {
            type: 'paragraph',
            text: 'Ping Pan is a compact physics puzzle game. Each interaction is simple to understand, but the movement of the objects creates surprising outcomes that reward timing and experimentation.',
          },
          {
            type: 'image',
            src: '/ping-pan-hero.jpg',
            alt: 'Ping Pan gameplay artwork',
            caption: 'The game turns a familiar tabletop setup into a physics playground.',
          },
        ],
      },
      {
        id: 'why-it-exists',
        title: 'Why I made it',
        blocks: [
          {
            type: 'paragraph',
            text: 'I wanted to make a focused game where a small set of rules could create expressive, funny, and occasionally chaotic moments. The goal was immediate play rather than a long explanation.',
          },
        ],
      },
      {
        id: 'automation-architecture',
        title: 'Automation architecture',
        blocks: [
          {
            type: 'paragraph',
            text: 'The automation can run on a daily schedule or another configurable interval. Each run looks for upcoming client moments, decides which ones deserve a letter, and creates a durable job that can wait safely until the robot is ready.',
          },
          {
            type: 'architecture',
            title: 'From CRM moment to mailed letter',
            ariaLabel: 'Architecture workflow from a scheduled CRM scan through AI letter generation, queueing, robot writing, retries, and CRM status updates',
            lanes: [
              {
                label: '1. Trigger and qualify',
                steps: [
                  {
                    title: 'Scheduled workflow',
                    text: 'Runs daily or on a configurable interval.',
                  },
                  {
                    title: 'CRM event scan',
                    text: 'Finds birthdays, home anniversaries, and approved milestones.',
                  },
                  {
                    title: 'Eligibility rules',
                    text: 'Checks consent, address quality, cooldowns, and duplicate sends.',
                  },
                ],
              },
              {
                label: '2. Create the letter',
                steps: [
                  {
                    title: 'Context package',
                    text: 'Sends only the client details needed for the note.',
                  },
                  {
                    title: 'Letter service',
                    text: 'Drafts the message and creates handwriting instructions.',
                  },
                  {
                    title: 'Content check',
                    text: 'Validates the output or requests optional human review.',
                  },
                ],
              },
              {
                label: '3. Queue and write',
                steps: [
                  {
                    title: 'Durable letter queue',
                    text: 'Stores the job with a due date and unique send key.',
                  },
                  {
                    title: 'Robot worker',
                    text: 'Claims one job when the writing station is online.',
                  },
                  {
                    title: 'Preflight check',
                    text: 'Confirms paper, pen, workspace, and supported layout.',
                  },
                  {
                    title: 'Write the letter',
                    text: 'Streams the machine-ready handwriting path to the robot.',
                  },
                ],
              },
              {
                label: '4. Close the loop',
                steps: [
                  {
                    title: 'Ready to mail',
                    text: 'Marks a successful letter for postage and fulfillment.',
                    tone: 'success',
                  },
                  {
                    title: 'Update the CRM',
                    text: 'Records the touchpoint and its completion status.',
                    tone: 'success',
                  },
                  {
                    title: 'Retry or alert',
                    text: 'If writing fails, returns the job with backoff and alerts an operator.',
                    tone: 'warning',
                  },
                ],
              },
            ],
          },
          {
            type: 'callout',
            title: 'Why the queue matters',
            text: 'Letter generation and physical writing do not need to happen at the same speed. The queue keeps every approved job safe when the robot is busy, offline, out of paper, or waiting for an operator.',
          },
        ],
      },
      {
        id: 'how-it-was-made',
        title: 'How it was made',
        blocks: [
          {
            type: 'paragraph',
            text: 'The experience was shaped around a physics-first loop: read the scene, choose the moment, launch the action, and quickly try again. The visual language keeps trajectories and collisions easy to follow.',
          },
          {
            type: 'list',
            items: [
              'Short attempts with quick resets',
              'Readable motion and collision feedback',
              'A compact scope built for iteration and polish',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'tp-games',
    title: 'tp.games',
    label: 'Platform',
    summary: 'Instant multiplayer games that turn any shared screen and a few phones into game night.',
    card: {
      summary: 'Instant multiplayer games for any screen.',
      labelColor: 'blue',
      buttonColor: 'blue',
    },
    visual: 'tp-games',
    externalLink: {
      label: 'Visit tp.games',
      href: 'https://tp.games/',
    },
    sections: [
      {
        id: 'what-it-is',
        title: 'What it is',
        blocks: [
          {
            type: 'paragraph',
            text: 'tp.games is a browser-based multiplayer platform. One person hosts a game on a shared screen, everyone else joins from a phone, and the group can start playing without installing anything.',
          },
          {
            type: 'callout',
            title: 'The whole flow',
            text: 'Host → join → play. The product is designed to make that path as short and obvious as possible.',
          },
        ],
      },
      {
        id: 'why-it-exists',
        title: 'Why I made it',
        blocks: [
          {
            type: 'paragraph',
            text: 'Party games are better when the setup disappears. I wanted the screen people already have and the phones already in their hands to be everything the group needs.',
          },
        ],
      },
      {
        id: 'how-it-was-made',
        title: 'How it was made',
        blocks: [
          {
            type: 'paragraph',
            text: 'The platform separates the shared game view from each player’s private controls. Room codes and clear device roles keep joining simple, while the web-based delivery makes each game immediately available.',
          },
          {
            type: 'list',
            items: [
              'A shared host screen for the room',
              'Phone-based player controls',
              'Fast joining with no download step',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'tape-machine',
    title: 'Tape Machine',
    label: 'Audio plugin',
    summary: 'A Windows VST3 that adds tape warmth, movement, compression, and optional digital degradation.',
    card: {
      summary: 'A tape-inspired VST for warm, characterful sound.',
      labelColor: 'purple',
      buttonColor: 'purple',
    },
    visual: 'tape-machine',
    sections: [
      {
        id: 'what-it-is',
        title: 'What it is',
        blocks: [
          {
            type: 'paragraph',
            text: 'Tape Machine is a Windows VST3 audio effect designed for FL Studio and other compatible hosts. It adds the warmth, movement, compression, and imperfections commonly associated with analog tape recording.',
          },
          {
            type: 'paragraph',
            text: 'The main tape section provides saturation, bias coloration, tone shaping, wow, flutter, hiss, parallel mixing, and output control. A separate Degrade section adds optional digital lo-fi processing through bit-depth reduction, sample-rate reduction, nonlinear coloration, and filtering.',
          },
          {
            type: 'image',
            src: '/tape-machine-vst.png',
            alt: 'Tape Machine plugin interface',
            caption: 'Animated reels, analog VU meters, LED meters, metal controls, and grouped processing sections give the plugin a hardware-inspired interface.',
          },
          {
            type: 'paragraph',
            text: 'The reels follow the host transport and only rotate during playback. Every knob supports FL Studio’s native right-click automation and controller menu.',
          },
        ],
      },
      {
        id: 'why-it-exists',
        title: 'Why I made it',
        blocks: [
          {
            type: 'paragraph',
            text: 'I wanted one hands-on effect that could make clean digital audio feel warmer and less static, then push it further into intentional lo-fi texture when a track needs more character, without forcing producers to build that sound from a long chain of separate effects.',
          },
        ],
      },
      {
        id: 'how-it-was-made',
        title: 'How it was made',
        blocks: [
          {
            type: 'paragraph',
            text: 'Tape Machine is written in C++20 using JUCE 9 and built with CMake. It produces a 64-bit VST3 plugin and a standalone Windows application.',
          },
          {
            type: 'list',
            items: [
              'Matched mono and stereo layouts',
              'No MIDI input and no audio-thread memory allocation',
              'Atomic values for metering and transport-driven interface animation',
            ],
          },
        ],
      },
      {
        id: 'signal-path',
        title: 'Signal path',
        blocks: [
          {
            type: 'paragraph',
            text: 'The processor moves from tape coloration into modulation, then keeps the optional degradation stage and master bypass latency-aligned.',
          },
          {
            type: 'code',
            language: 'text',
            caption: 'Audio signal flow',
            code: `Input
  → Drive
  → Biased nonlinear saturation
  → Head-bump enhancement
  → Tape tone filtering
  → Hiss generation
  → Wow/flutter delay modulation
  → DC blocking
  → Latency-aligned dry/wet mix
  → Optional Degrade stage
  → Output gain
  → Latency-aligned master bypass`,
          },
          {
            type: 'callout',
            title: 'Host latency',
            text: 'The transport model uses a nominal 6 ms delay and reports that latency to the host for plugin-delay compensation.',
          },
        ],
      },
      {
        id: 'tape-processing',
        title: 'Tape processing',
        blocks: [
          {
            type: 'list',
            items: [
              'Drive applies up to 24 dB of gain before the nonlinear tape stage.',
              'Saturation uses a gain-preserving hyperbolic-tangent transfer curve for gradual harmonic generation and compression.',
              'Bias offsets the nonlinear transfer curve to introduce asymmetric, even-order harmonics.',
              'Head bump adds a low-frequency resonance centered around approximately 92 Hz.',
              'Tone applies a variable low-pass response ranging from roughly 2.4 kHz to 20 kHz.',
              'Wow uses low-frequency delay modulation around 0.38 Hz, with an additional slow transport wander component.',
              'Flutter adds faster delay modulation around 6.15 Hz.',
              'Hiss generates filtered pseudo-random noise with an adjustable level.',
              'Mix blends the processed and latency-aligned dry paths.',
            ],
          },
        ],
      },
      {
        id: 'degrade-processing',
        title: 'Degrade processing',
        blocks: [
          {
            type: 'paragraph',
            text: 'The independently bypassable Degrade stage can move from subtle digital grit to overt lo-fi processing.',
          },
          {
            type: 'list',
            items: [
              'Adjustable clipping and quantization headroom',
              '4–24-bit amplitude quantization',
              'Sample-and-hold rate reduction from 1–48 kHz',
              'Post-reduction low-pass filtering',
              'Odd/even nonlinear harmonic shaping',
              'Independent output compensation and DC blocking',
              'Smoothed bypass crossfading',
            ],
          },
        ],
      },
      {
        id: 'plugin-integration',
        title: 'Plugin integration',
        blocks: [
          {
            type: 'paragraph',
            text: 'Parameters are managed through JUCE’s AudioProcessorValueTreeState so the plugin behaves like a native part of the host rather than an isolated effect.',
          },
          {
            type: 'list',
            items: [
              'FL Studio automation support',
              'Project-state and preset recall',
              'Smoothed parameter changes',
              'Standard VST3 automation gestures',
              'Native FL Studio parameter context menus on right-click',
              'Controller linking and automation-clip creation',
            ],
          },
        ],
      },
      {
        id: 'web-version',
        title: 'Coming to the web',
        blocks: [
          {
            type: 'paragraph',
            text: 'I am also working on a browser-supported version of Tape Machine. The goal is to make the same sound engine available beyond desktop plugin hosts without rewriting the DSP in JavaScript or creating a separate, less capable effect.',
          },
          {
            type: 'image',
            src: '/tape-machine-web-architecture.png',
            alt: 'Architecture diagram showing the Tape Machine C++ DSP core targeting both JUCE VST3 and a WebAssembly audio worklet for compatible web DAWs',
            caption: 'One portable C++ DSP core supports the existing JUCE VST3 build and the in-progress browser path.',
          },
          {
            type: 'paragraph',
            text: 'For the web version, the portable C++ DSP core is compiled to WebAssembly with Emscripten. The processor runs inside an AudioWorklet so real-time audio stays off the browser’s main interface thread, while an HTML, CSS, and Canvas interface provides the controls and visual feedback.',
          },
          {
            type: 'paragraph',
            text: 'A WAM 2 adapter connects those pieces and makes the effect usable inside compatible web-based DAWs. This structure lets the desktop and browser versions share the audio engine while each platform gets an interface and plugin layer built for its environment.',
          },
          {
            type: 'callout',
            title: 'Work in progress',
            text: 'The current focus is preserving the character and behavior of the desktop plugin while making the processing reliable in a browser’s real-time audio environment.',
          },
        ],
      },
      {
        id: 'validation',
        title: 'Validation',
        blocks: [
          {
            type: 'paragraph',
            text: 'Automated DSP regression tests protect the parts of the signal path where small changes can create audible or timing-related failures.',
          },
          {
            type: 'list',
            items: [
              'Saturation stability and symmetry',
              'Low-level gain behavior',
              'Fixed-delay accuracy',
              'Reported host-latency alignment',
            ],
          },
          {
            type: 'callout',
            title: 'Technical definition',
            text: 'Tape Machine is a musical tape-saturation, transport-modulation, and digital-degradation VST3, not a fully physical magnetic hysteresis simulation.',
          },
        ],
      },
    ],
  },
  {
    slug: 'handwritten-outreach',
    title: 'The AI Robot That Writes Sales Letters',
    label: 'Sales automation',
    summary: 'An AI-powered letter-writing robot that turns CRM moments into timely, personal client outreach.',
    card: {
      summary: 'A robot that turns CRM moments into handwritten sales follow-ups.',
      labelColor: 'blue',
      buttonColor: 'blue',
      badge: 'Built for sales',
    },
    visual: 'handwritten-outreach',
    sections: [
      {
        id: 'what-it-is',
        title: 'What it is',
        blocks: [
          {
            type: 'paragraph',
            text: 'This AI-powered sales automation system creates and physically writes personalized letters for clients. It uses meaningful details already stored in a CRM, including a birthday, a home purchase date, or another relationship milestone, to make each note relevant to the person receiving it.',
          },
          {
            type: 'image',
            src: '/handwritten-outreach.jpg',
            alt: 'A personalized handwritten letter produced by the letter-writing robot',
            caption: 'The finished output is a real ink-on-paper letter, created from CRM context and written by the machine.',
          },
          {
            type: 'paragraph',
            text: 'A custom AI model creates the handwriting, and the robot turns that output into a physical note. The result combines software-driven scale with a medium that still feels personal, intentional, and memorable.',
          },
        ],
      },
      {
        id: 'why-it-exists',
        title: 'Why I made it',
        blocks: [
          {
            type: 'paragraph',
            text: 'Relationship-based sales depends on thoughtful follow-up, but the moments that make outreach meaningful are easy to miss. Writing every note by hand also creates a choice between maintaining relationships and spending time on the next sale. I built this system to remove that tradeoff.',
          },
          {
            type: 'callout',
            title: 'The business value',
            text: 'It turns passive CRM data into a repeatable client-retention and referral touchpoint. Salespeople can stay present for birthdays, home anniversaries, and other important moments without adding hours of repetitive administrative work.',
          },
          {
            type: 'paragraph',
            text: 'A physical letter can stand out where another automated email disappears. The system was designed to help sales teams remain memorable, strengthen long-term client relationships, and create natural reasons to reconnect after a transaction is complete.',
          },
        ],
      },
      {
        id: 'how-it-was-made',
        title: 'How it was made',
        blocks: [
          {
            type: 'paragraph',
            text: 'The project connects three distinct parts: CRM context, a custom handwriting model, and a physical writing robot. Client and milestone data determine when a letter is useful and what it should acknowledge; the model turns the message into handwriting; and the machine reproduces it with real ink on paper.',
          },
          {
            type: 'list',
            items: [
              'CRM-driven triggers for relevant client milestones',
              'A custom AI model trained to generate handwriting',
              'Machine-ready output for a physical letter-writing robot',
              'A repeatable workflow designed for sales teams',
            ],
          },
        ],
      },
    ],
  },
]

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>
