# Technology Stack

## Languages & Versions
- TypeScript 5.x (`strict` mode, target ES2017)
- TSX/JSX via `react-jsx` transform (no explicit React import needed)

## Core Frameworks & Libraries
| Package | Version | Role |
|---|---|---|
| next | 16.2.6 | Framework (App Router) |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM renderer |
| tailwindcss | ^4 | Utility-first CSS |
| @tailwindcss/postcss | ^4 | Tailwind PostCSS integration |

## Build & Tooling
- **Module system**: ESNext modules, `moduleResolution: bundler`
- **PostCSS**: configured via `postcss.config.mjs` with `@tailwindcss/postcss`
- **TypeScript**: `isolatedModules: true`, `noEmit: true` (Next.js handles emit)
- **Path alias**: `@/*` → `src/*`

## Development Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

## Important Notes
- Next.js 16 may have breaking changes from earlier versions — check `node_modules/next/dist/docs/` before using unfamiliar APIs (see AGENTS.md)
- No linter (ESLint) or formatter (Prettier) config present — add if needed
- No test runner configured
