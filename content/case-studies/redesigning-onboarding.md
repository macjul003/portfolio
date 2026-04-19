---
title: Redesigning Onboarding for a Fintech App
date: "2025-12-01"
description: How reducing friction in the first five minutes cut drop-off by 40% and increased activation.
client: Fintech startup
role: Lead Product Designer
tags: [Fintech, UX Research, Mobile]
color: "#1a1a2e"
---

## The problem

New users were signing up but never completing their first transaction. Analytics showed a 62% drop-off between account creation and the first deposit — a gap that cost the business dearly and left users without the value they came for.

The hypothesis: the onboarding flow was asking for too much, too soon.

## Research

I ran five usability sessions with first-time users and three interviews with users who had churned within the first week. The pattern was consistent:

- **Information overload** — KYC fields, risk questionnaires, and bank linking all lived on one long screen
- **Trust deficit** — users hesitated at the bank connection step without sufficient context about security
- **No sense of progress** — there was no indication of how far along they were or what came next

> "I felt like I was filling out a loan application, not opening a savings account."
> — Usability participant, session 3

## Design decisions

### Progressive disclosure over completeness

I split the flow into three distinct phases: identity, funding, and preferences. Only identity was required upfront. Funding and preferences could be completed later, nudged via in-app prompts.

This felt risky — would users fund their accounts if we didn't force it immediately? The data said yes. Getting users to their first meaningful moment (seeing a projected balance) was worth more than getting all their data on day one.

### Making security visible

The bank connection step received a dedicated screen with a single focus: explaining how the integration works, what data is accessed, and what isn't. We added logos of trusted partners and a plain-English breakdown of permissions.

Completion rate on this step went from 54% to 81%.

### Progress through momentum

A subtle step indicator replaced the blank top bar. More importantly, each step ended with a small confirmation — an animation, a summary card — before moving on. Small wins that made the process feel like progress, not a checklist.

## Outcome

After the redesign shipped:

- **Drop-off reduced by 40%** in the first session
- **Time-to-first-deposit** dropped from 4.2 days to 1.8 days
- **Support tickets** related to onboarding confusion fell 55%

## What I'd do differently

The research phase was compressed to two weeks. With more time, I would have run a longitudinal study to understand retention past day 30 — activation metrics don't always predict long-term engagement. That's still an open question.
