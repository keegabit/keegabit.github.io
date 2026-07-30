# Keegabit Portfolio

The personal portfolio of Keegan: software developer, indie game maker, and
creative technologist.

The site is designed mobile-first as a monochrome CRT terminal with a short boot
sequence, scanline effects, responsive layouts, and accessible reduced-motion
behavior.

## Stack

- React 19
- TypeScript 6
- Vite 8
- Motion for React
- Oxlint
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

To make the development server available to other devices on your network:

```bash
pnpm dev --host 0.0.0.0
```

## Quality checks

```bash
pnpm lint
pnpm build
```

The production build is generated in `dist/` and deployed to GitHub Pages by the
repository workflow.
