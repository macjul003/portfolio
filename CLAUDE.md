# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Julian (macjulian.com) — a single static page styled as a dictionary entry.

## Architecture

Next.js 15 App Router with TypeScript and CSS Modules. Static export (`output: 'export'`) for GitHub Pages deployment. Custom domain configured via `public/CNAME`.

**Key files:**
- `app/layout.tsx` — Root layout (Google Fonts via `<link>`, metadata)
- `app/page.tsx` — Home page (server component, no client JS)
- `app/page.module.css` — Scoped styles (CSS Modules with camelCase)
- `app/globals.css` — Reset, CSS vars, body centering, `@keyframes fadeIn`

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Static export to `out/`

## Design Tokens (CSS custom properties in `:root`)

`--cream` #f5f0eb (bg), `--red` #8B1A1A (hover), `--text` #2c2c2c, `--gray` #8a8580, `--light-gray` #d4cfc9, `--link` #6b6560

Fonts: Zalando Sans (body), STIX Two Text (heading) — Google Fonts. Max-width 620px, mobile breakpoint at 480px.
