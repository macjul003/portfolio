---
title: Bringing User Context into Every AI Chat
date: "2026-02-10"
description: Designed an MVP that imports, structures, and injects personal context across AI tools — making responses feel genuinely personalised.
client: Symmetry AI
role: Lead Product Designer
tags: [AI, Chrome Extension, Web App]
color: "#1c3a2e"
---

## The problem

AI assistants are powerful but stateless. Every conversation starts from zero — the model knows nothing about who you are, what you're working on, or how you like to communicate. Users were copy-pasting context into every session, then abandoning the tools when the effort outweighed the benefit.

## Research

I interviewed 18 regular AI tool users across different professions. The core finding: context fatigue. People weren't quitting because the AI was bad — they were quitting because *they* had to do too much work to make it good.

Three patterns emerged:

- **Contextual amnesia** — every new chat felt like meeting a stranger
- **Formatting friction** — users didn't know how to structure context for best results
- **Trust gap** — uncertainty about what the AI actually "knew" vs. what it ignored

## Design decisions

### Structured context profiles

Instead of a freeform text dump, I designed a profile system with discrete fields: role, communication style, current projects, background. Each field had a short example to reduce blank-page anxiety.

The key insight: structure doesn't constrain — it removes decisions. Users filled profiles faster and reported higher confidence that their context was being used.

### One-click injection

A Chrome extension surfaced the profile as a floating panel on any AI tool. A single click prepended the relevant context block to the current chat. No copy-paste, no formatting decisions.

### Transparency layer

A small indicator showed which context fields were active in the current session. This addressed the trust gap: users could see exactly what the AI "knew" and adjust before sending.

## Outcome

- **74% of beta users** completed their profile in the first session
- **Session length** increased 2.3× compared to the previous product
- **Churn at day 7** dropped from 61% to 29%
