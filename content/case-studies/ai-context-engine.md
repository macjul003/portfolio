---
title: "Symmetry: Bringing user context into every AI chat"
date: "2026-04-01"
description: A Chrome extension that brings scattered context into every AI chat, without disrupting the tools users already live in.
client: Symmetry AI
role: Research, UX Design, User Testing, Prototype
tags: [AI, Chrome Extension, Web App]
color: "#1c3a2e"
---

## The problem

AI power users bounce between ChatGPT, Claude, Gemini, and Perplexity daily — but their context lives somewhere else entirely. In Slack threads, Notion docs, meeting notes, half-finished drafts. None of it makes it into the chat.

This isn't a memory problem. It's a context distribution problem: scattered context combined with weak prompts means AI responses that feel generic even when the model is capable of doing better.

The secondary issue: most users don't know how to write effectively for AI. Even when context is available, they don't know how to use it. So the gap between what AI *could* do and what it actually delivered stayed wide.

## Research

Early interviews surfaced a pattern we hadn't anticipated: users aren't single types. A product person who also runs growth. A designer who writes. Clean role categorisation was the wrong frame — people needed a system that understood they wore multiple hats.

The biggest design challenge wasn't the extension itself. It was the cold start. An empty knowledge base means nothing to inject, and nothing to inject means no value from day one. That's where most onboarding flows lose people.

The unlock came during competitive research: most AI tools let users export their full conversation history as a data file. Months of prompts, context, and working style — all sitting in a downloadable archive. This changed the onboarding strategy entirely. Instead of asking users to build from scratch, we let them import what already existed.

## The constraint that shaped everything

The extension had one hard rule: enhance the existing workflow, not replace it. No new tabs forced on users. No mandatory setup. No interruptions.

Whatever Symmetry did had to happen *inside* the tools users already lived in — ChatGPT, Claude, Gmail, Google Docs. This constraint kept the product coherent across every surface and every decision.

## Onboarding

All paths in — social, landing page, Chrome Web Store — converged on the same four-step flow:

1. Create your profile
2. Set up your workspace
3. Import your AI work history
4. Install the Chrome extension

Two decisions mattered most here.

**Transparency.** An FAQ explained exactly what was extracted, what was discarded, and why. Users were handing over months of conversation data. They needed to understand the trade before they'd make it.

**Honesty about wait time.** Extraction wasn't instant. Rather than fake loading screens, users got a progress bar and an email when processing was complete. Small thing, but it set the right expectations and prevented the worst kind of churn — people leaving because they thought something was broken.

## Surface 01: The pill

The pill is a small UI injected directly into the input boxes of ChatGPT, Claude, Gemini, and Perplexity. Three actions, always visible:

- **Inject** — Auto mode pulls all relevant context in one click. Review mode surfaces content cards so users can preview and choose before committing.
- **Optimize** — Inactive until the user writes a prompt and presses space. That pause between finishing a thought and hitting send is exactly when the offer lands right.
- **More** — Additional options without cluttering the main surface.

The original design used progressive disclosure — one button at a time, expanding on interaction. Testing broke that fast. The pill kept opening and closing, and it felt unpredictable. Distracting.

The counterintuitive fix: show all three buttons at once. Stillness reads as calm. A tool that doesn't demand your attention feels like a quiet, powerful thing in the corner — not a pop-up waiting to interrupt you.

The injection itself offered two modes because the product had two types of users. Power users want control: they want to see what's being injected and curate it. Casual users want magic: one click, done. Both needed to be first-class experiences, not one as a fallback.

## Surface 02: The composer

The Composer uses a circular icon that appears inside any input field — Gmail, Google Docs, forms, text editors. Same underlying system as the pill, different affordance, broader reach.

Three actions:
- **Generate** — Ask for content; fills the text area directly using the knowledge base.
- **Iterate** — Opens a side panel to create multiple variations before committing.
- **Edit in place** — Select existing text, ask for a rewrite, replaces inline.

Scope was intentionally tight. We contained features to Gmail and Google Docs first and planned progressive expansion. Harder MVP boundary, but the right call — better to do two surfaces well than five surfaces passably.

## Surface 03: The dashboard

The dashboard is a web companion — a place to see everything Symmetry captured, search it, and manage it. Key design decisions:

- Sequential grouping: docs organised chronologically, by source and session
- Inline editing: correct or annotate without leaving list view
- Ask Symmetry: conversational search, not keyword lookup
- Progressive content preview: enough to recognise a doc, not overwhelming

In retrospect, the dashboard was over-scoped. Multiple workspaces, folder systems, a timeline view, a full chat interface — none of it was wrong, but most of it wasn't where the value lived.

## What I'd do differently

I spent too much time on knowledge doc views in the dashboard.

The analogy I keep coming back to: spell check versus dictionary. Users live in the inject experience. They rarely browse stored docs the way they rarely open a dictionary. The right move would have been a much thinner dashboard pass and a deeper investment in the inject flow and Composer — that's where the product actually delivers.

## What worked

The export unlock changed everything. The discovery that users could import months of existing AI conversation history in a single step — instead of building from scratch — removed the cold start problem entirely. It came from competitive research, not user interviews, which is a good reminder to look sideways as well as forward.

The pill's stillness was the other win. Showing all three actions at once felt wrong in theory and right in practice. Users described the tool as "calm" and "unobtrusive" — exactly what a context layer injected into someone else's product should feel like.

The constraint held. Every surface decision came back to the same question: does this enhance an existing workflow, or does it ask the user to adopt a new one? That question kept the product coherent across two very different surfaces over several months of work.

*Product under NDA. Detailed screens available on request.*
