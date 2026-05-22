# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Julian (macjulian.com) — dark-themed, sidebar-nav layout with multiple pages, an AI chat panel (JulianLM), a photo map, and a journal.

## Architecture

Next.js 15 App Router, TypeScript, CSS Modules. Static export (`output: 'export'`) deployed to GitHub Pages. Custom domain via `public/CNAME`.

**Key files:**
- `app/layout.tsx` — Root layout: Google Fonts, Phosphor icon CDN, sidebar + AskPanel wrappers
- `app/globals.css` — Reset, CSS vars, shell/sidebar/layout styles
- `app/page.tsx` — Home (server component): bio, case studies grid, ActivityTerminal
- `app/components/Sidebar.tsx` — Sticky icon nav + JulianLM trigger (client)
- `app/components/AskPanel.tsx` — Slide-in AI chat panel with keyword-matched responses (client)
- `app/components/AskPanelContext.tsx` — Open/close state shared between Sidebar and AskPanel
- `lib/journal.ts` — Reads markdown files from `content/journal/`, parses with gray-matter + marked
- `lib/photos.ts` — Photo data utilities
- `public/photo-data.json` — GPS-tagged photo metadata for the map
- `scripts/generate-photos.ts` — Runs pre-build to generate photo-data.json from EXIF

## Pages

- `/` — Home: signature, bio, case studies grid, activity terminal, footer
- `/about` — About: prose + photo
- `/work` — Case studies list
- `/work/symmetry` — Full Symmetry case study
- `/photos` — Mapbox photo map with lightbox
- `/journal` — Markdown blog (content lives in `content/journal/`)
- `/journal/[slug]` — Individual article
- `/built` — Side projects
- `/motion-lab` — Motion/animation playground

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Static export to `out/` (runs generate-photos.ts first)

## Design Tokens (CSS custom properties in `:root`)

`--bg` #0a0a0a, `--text` #ffffff, `--gray` #666, `--light-gray` #1e1e1e, `--accent` #4f8ef7, `--sidebar-w` 72px

Fonts: Inter 300/400/500 (body), Playwrite GB S (cursive name heading) — Google Fonts. Main content max-width ~680px. Mobile breakpoint at 640px.

## Icons

Always use Phosphor Icons for any icon. Use `@phosphor-icons/react` for React components, or the `ph-bold` / `ph-fill` CSS classes from the Phosphor web CDN already loaded in `app/layout.tsx`.
