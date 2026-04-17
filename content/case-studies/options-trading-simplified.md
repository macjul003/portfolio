---
title: Simplifying Options Trading with AI-Driven Strategies
date: "2025-11-20"
description: Abstracted complex derivatives strategies into a simple deposit-and-earn flow — cutting time-to-first-trade from 6 days to same-day.
client: Ithaca Protocol
role: Product Designer
tags: [Fintech, Web App, DeFi]
color: "#0d1f3c"
---

## The problem

Options trading is genuinely complex — Greeks, expiries, strike prices, implied volatility. Most retail users either got lost before their first trade or made uninformed decisions that led to losses, then left.

The challenge: make a sophisticated financial product accessible without dumbing it down to the point of being useless.

## Research

I reviewed onboarding drop-off across 4,200 signups and ran structured interviews with 12 users who had churned in the first two weeks. The data split clearly:

- Users with a trading background dropped off at *execution* — the UI was slow and required too many clicks per trade
- Users without a background dropped off at *comprehension* — they didn't understand what they were buying

Two separate audiences, two separate problems.

## Design decisions

### Strategy templates over raw instruments

For new users, I designed pre-configured strategy cards: "Earn yield on ETH," "Hedge a long position," "Speculate on volatility." Each card showed expected outcome, max loss, and a plain-language explanation — no Greeks visible by default.

Advanced users could still access the raw order book via a toggle. The complexity didn't disappear — it stepped aside.

### Progressive detail disclosure

Tapping a strategy card expanded into a three-step flow: choose asset → set amount → review and confirm. Risk parameters were surfaced as plain statements: "Your maximum loss is X." The math was there for those who wanted it; the decision was available to everyone.

### Real-time position clarity

Post-trade, I redesigned the portfolio view to show each position as a timeline: what you put in, what you stand to earn, when it settles. No confusing P&L notation — just a clear picture of where things stood.

## Outcome

- **Time-to-first-trade** dropped from 6.1 days to same-day for 68% of new users
- **Strategy template adoption**: 81% of new users placed their first trade through a template
- **Support volume** related to "I don't understand my position" fell 44%
