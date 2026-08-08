export type ProjectBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'code'; code: string; language?: string; caption?: string }
  | { type: 'callout'; title: string; text: string }
  | { type: 'embed'; src: string; title: string }

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
  visual: 'ping-pan' | 'tp-games' | 'tape-machine'
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
    visual: 'tape-machine',
    sections: [
      {
        id: 'what-it-is',
        title: 'What it is',
        blocks: [
          {
            type: 'paragraph',
            text: 'Tape Machine is a Windows VST3 audio effect for FL Studio and other compatible hosts. It combines tape-style saturation and modulation with a separate lo-fi Degrade stage.',
          },
          {
            type: 'image',
            src: '/tape-machine-vst.png',
            alt: 'Tape Machine plugin interface',
            caption: 'The interface groups tape processing, metering, and degradation controls into a hardware-inspired panel.',
          },
        ],
      },
      {
        id: 'why-it-exists',
        title: 'Why I made it',
        blocks: [
          {
            type: 'paragraph',
            text: 'I wanted one hands-on effect that could make clean digital audio feel warmer and less static, then push it further into intentional lo-fi texture when a track needs more character.',
          },
        ],
      },
      {
        id: 'how-it-was-made',
        title: 'How it was made',
        blocks: [
          {
            type: 'paragraph',
            text: 'The plugin is written in C++20 with JUCE 9 and CMake. Its controls are organized around coloration, transport movement, noise, parallel mixing, gain staging, and an independently bypassable degradation stage.',
          },
          {
            type: 'list',
            items: [
              '64-bit VST3 plugin and standalone Windows app',
              'Tape-style drive, saturation, bias, wow, flutter, hiss, and tone controls',
              'Host automation and project-state recall through JUCE parameter management',
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
