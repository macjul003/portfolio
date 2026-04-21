---
title: "Symmetry: Bringing user context into every AI chat"
date: "2026-04-01"
description: A Chrome extension that brings scattered context into every AI chat, without disrupting the tools users already live in.
client: Symmetry AI
role: Research, UX Design, Design System, User Testing
tags: [AI, Chrome Extension, Web App]
color: "#1c3a2e"
team: "2 Co-founders · 2 Engineers · 1 Designer (me)"
timeline: "Nov 2025 — Feb 2026 · ~4 months"
---

Symmetry is a Chrome extension and web dashboard that turns scattered context — Slack threads, meeting notes, old ChatGPT conversations, half-written docs — into the background knowledge behind every AI chat, wherever that happens to be: ChatGPT, Claude, Gemini, Perplexity.

## The Problem

AI power users don't get the answers they need because the AI has no idea who they are, what they're working on, or what decisions they've already made. Every new chat starts from zero — and users have normalised that as "just what AI is capable of."

But it's not a memory problem. It's a scatter problem.

AI memory is getting better. That's not the gap. The gap is that **context lives everywhere except in the chat** — across tabs, notes, drafts, old conversations. Nothing follows the user from tool to tool.

Two problems, stacked:

1. **Scattered context.** Knowledge lives across Slack, Notion, drafts, and chat histories. Nothing follows the user from tool to tool.
2. **Weak prompts.** Most users don't know how to write for AI — so even the context they *do* have doesn't land.

The opportunity: bring the right context into the chat automatically, and help users communicate it better before they hit send.

## Process

I joined when the only thing that existed was a rough prototype. I owned the end-to-end design process — research through engineering handoff.

Three research findings changed the direction of the entire product:

**A — Users weren't a single type.** Many worked across domains — a product person who also runs growth, a designer who also writes. Assuming clean role categories was wrong, and forced a rethink of how we weighted context injection.

**B — The biggest barrier wasn't the extension. It was the cold start.** An empty knowledge base means nothing to inject. We had to solve this before any UI for the extension itself mattered.

**C — Every major AI tool lets users export their history.** Competitive research turned what looked like a month of manual entry into a one-step import. This became the backbone of onboarding.

## The Core Constraint

The extension had one hard rule: enhance the user's existing workflow — not ask them to adopt a new one.

No new tabs. No mandatory setup. No interruptions. Whatever Symmetry did, it had to happen *inside* the tools users were already in.

Every spec, every flow, every piece of microcopy went through one filter: *"Does this enhance the existing workflow, or ask users to adopt a new one?"*

## Onboarding

The core problem was the cold start: an empty knowledge base means nothing to inject. Every other surface — the Pill, the Composer, the Panel — only works once there's something to pull from. Onboarding had to solve this first.

**Exploration 1: ask users to add context manually.** Show a blank knowledge base on install; prompt users to fill it in, doc by doc, over time.

> Nobody would do this. Setup fatigue on day one. Dead feature by week two.

**Exploration 2: passive capture from the start.** Read everything the user does across AI tools and build context silently in the background.

> Too invasive. It broke the trust we were trying to build. And the knowledge base would still be empty for the first few weeks.

**The export unlock.** Competitive research surfaced something I hadn't expected: every major AI tool already lets users export their full conversation history as a data file. Months of context, sitting in a downloadable archive. Instead of asking users to build from scratch, we let them import what already existed — filtered to what's actually relevant.

Two deliberate decisions inside the flow:

- **Transparency.** An FAQ explained exactly what was extracted and what was discarded. Users were handing over months of conversation data. They needed to understand the trade before they'd make it.
- **Honesty about wait time.** Extraction wasn't instant. Users got a progress bar and an email when complete. No fake loading screens — that's how you lose people to "I thought it was broken."

## Surface 01 — The Pill

A small UI injected into the input boxes of ChatGPT, Claude, Gemini, and Perplexity. Four parts: a status indicator, an Inject button, an Optimize button, and a More menu.

**The decision that took the longest to get right.**

My first version used progressive disclosure — one button at a time, expanding on interaction. Technically cleaner. Fewer affordances competing for attention.

> In internal testing, the pill kept opening and closing. Testers called it distracting and unpredictable.

I tried hover triggers, click-to-expand, timed transitions. None of them felt still. The pill was always doing something.

**The answer was to do less. Show all three buttons. Always.**

Counterintuitive on paper, right in practice. Stillness read as calm. The pill felt like a tool sitting quietly in the corner — not something demanding attention. Users described it as "unobtrusive." That's a feature.

**Inside Inject — two modes, one button.**

Users self-selected based on how much they trusted the system yet:

1. **Review and Inject.** Surfaces content cards before committing. Users preview and choose what to attach. The mode for new users — trust is built by making the system legible.
2. **Auto Inject.** One tap, done. Best-fit context pulled silently into the chat. The mode for users who've been through Review enough times to trust the picks.

For the ICP — AI-native users, engineers, heavy power users — we shipped hotkeys alongside both modes. Our heaviest users wouldn't be clicking UI. They'd be typing.

**Optimize — timing is everything.**

Inactive when the input was empty. Lit up the moment a user wrote a prompt and pressed space. That pause between finishing a thought and hitting send is exactly the right moment to offer improvement. The timing was intentional.

## Surface 02 — The Side Panel

Some moments need more than a pill. Users wanted to *talk to* their context, not just inject it.

The Side Panel slid in from the right of any AI chat. A persistent companion, one keystroke away. Three things it could do:

1. **Chat with Symmetry.** Ask questions about your own context. *"What did I decide about the pricing page?"* The panel answered from the knowledge base.
2. **Retrieve manually.** Search or browse specific docs, pull the exact piece rather than trusting the auto-pick.
3. **Edit and tailor.** Refine a piece of context before injecting — trim it, add framing, reshape it for the prompt you're about to write.

This is where the trust curve actually completed. Review and Inject showed *what* was being picked. The Panel showed *why*, and let users shape it before it hit the chat. Invisibility for the pill; control for the panel. Both from the same knowledge base.

## Surface 03 — The Composer

Same underlying system as the Pill. Different affordance, broader reach.

A circular icon that appeared inside any text area in the browser — Gmail, Google Docs, forms. Three actions: Generate (fill the text area from the knowledge base), Iterate (open the side panel for variations before committing), and Edit in place (select existing text, ask for a rewrite, it replaces inline).

**Late in the project, the Composer started showing up where it shouldn't.**

Highlight-to-edit and context injection bled into every page, every input, every form. The UX became aggressive. That was the exact opposite of the core constraint.

> Shipping this as-is would break the product's own design principle in its first week.

**Solution: contain it to Gmail and Google Docs for MVP.** Expand progressively from there. A harder boundary at the scope line, but the right one. Shipping a contained version of a powerful feature beats shipping a broken version of an ambitious one.

## Surface 04 — The Dashboard

The web companion — a place to see everything Symmetry captured, search it, manage it, and ask questions about it.

Four key decisions:

- **Sequential grouping.** Docs organised chronologically, by source and session.
- **Inline editing.** Correct or annotate without leaving list view.
- **Ask Symmetry.** Conversational search, not just keyword lookup.
- **Progressive content preview.** Enough to recognise a doc. Not enough to overwhelm.

In hindsight, the dashboard was over-scoped. Multiple workspaces, folder systems, a timeline view, a full chat interface. None of it was wrong — but most of it wasn't where the value lived. The right move would have been a much thinner dashboard pass and a deeper investment in the Pill and Composer, where the product actually delivered.

## Outcomes

The Chrome extension and dashboard shipped as a full internal MVP — used daily by the team across ChatGPT, Claude, and Gemini during the final build phase. Four things came out of it:

1. **The export-based onboarding held up.** Testers who imported their AI history got meaningful injections from their very first prompt. The single biggest research bet, validated.
2. **The pill's stillness was the right call.** The earlier progressive-disclosure version came up in every session as distracting. Once we shipped the three-button static pill, no one mentioned it again. Invisibility as a feature.
3. **The Composer over-reach was caught in internal testing, not in the wild.** Containing it to Gmail and Docs was a direct result of daily use by the team — it saved us from shipping an MVP that broke its own core constraint in its first week.
4. **A clearer read on who the power user actually was.** The team's engineers were some of the heaviest AI users — but lived in their IDE, not the browser. The Chrome extension couldn't reach them where they actually worked. This reshaped the post-MVP roadmap around native surfaces.

## Reflection

**The export unlock.** A strategic insight from research that changed how the product onboards users entirely. Not a UI decision — a product direction shift that came out of the design process. The reminder to look sideways at what competitors have already solved, not just forward at what users say they want.

**The pill's stillness.** Resisting progressive disclosure when it created friction. Showing all three buttons at once felt wrong on paper and right in practice. The lesson: calm is a design quality worth designing for, not just an outcome you stumble into.

**Holding the constraint.** Every decision filtered through one question — does this enhance the existing workflow, or ask users to adopt a new one? That question kept the product coherent across two very different surfaces, over several months of work, across a team of five. Constraints aren't limits. They're the thing that keeps a product from becoming everything and nothing.
