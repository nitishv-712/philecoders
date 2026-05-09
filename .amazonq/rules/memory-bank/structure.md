# Project Structure

## Directory Layout
```
website/
├── src/
│   └── app/                  # Next.js App Router root
│       ├── layout.tsx        # Root layout (HTML shell, fonts, global styles)
│       ├── page.tsx          # Home page (route: /)
│       ├── globals.css       # Global CSS + Tailwind base styles
│       └── favicon.ico
├── public/                   # Static assets served at /
│   └── *.svg                 # SVG icons (file, globe, next, vercel, window)
├── .amazonq/rules/memory-bank/  # AI assistant context docs
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.mjs        # PostCSS + Tailwind CSS v4 plugin
└── package.json
```

## Core Components & Relationships
- `layout.tsx` — wraps every page; sets `<html>`, `<body>`, loads Geist fonts, applies `antialiased`
- `page.tsx` — home route rendered inside the root layout
- `globals.css` — imported once in layout; defines Tailwind layers and CSS custom properties

## Architectural Patterns
- Next.js App Router (file-system routing under `src/app/`)
- Server Components by default; opt into client with `"use client"` directive
- `@/*` path alias maps to `src/*` for clean imports
- No custom API routes or additional route segments yet — single-page structure
