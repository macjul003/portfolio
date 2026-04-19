---
title: "ClayStack: Making liquid staking simple enough for first-time DeFi users"
date: "2026-03-01"
description: Designed the end-to-end experience for a liquid staking protocol — from a raw functional V1 to a one-click swap model that made ETH and MATIC staking accessible to users who had never touched DeFi.
client: ClayStack
role: Product Design · UX Research · User Testing
tags: [DeFi, Web App, Product Design]
color: "#12102a"
---

ClayStack was a liquid staking protocol that let users stake ETH or MATIC across multiple chains and receive a liquid token — csETH or csMATIC — in return. Those tokens could then be used across other DeFi protocols to earn additional yield.

It sounds straightforward. Nothing about it was.

I joined as the sole designer and stayed for three years — from the first pixel to the day it wound down. This is the story of how we turned one of DeFi's most technically complex products into something a first-time user could understand in under a minute.

## The Problem

Liquid staking was new territory. There were no established patterns to reference, no Mobbin screenshots to study. ClayStack was among the first protocols in the space, which meant every flow, every interface decision, and every piece of user education had to be built from scratch.

The core challenges:

**Explaining what liquid staking actually is.** Users needed to grasp that they'd receive a token in exchange for staking — and that this token could be used elsewhere to earn more. That's not an easy idea to communicate without jargon.

**Multi-chain complexity.** Stake on one network, mint on another. MATIC was deposited on Polygon but staked on Ethereum. No product had solved this interaction cleanly at the time.

**Real-time reward visibility.** Users needed to see that staking was working — even when token values fluctuated constantly and making a concrete earnings claim was impossible.

**Instant withdrawals.** Not natively possible. The default was waiting for the protocol to cycle through epochs, which could take days. That was never going to fly.

All of this had to feel effortless. Even though nothing behind the scenes was.

## Designing Without a Map

I started by putting myself in the user's position.

*If I were staking for the first time, what would I want to know? What would make me feel confident enough to commit real money?*

That question became my design compass. Before touching any interface, I mapped the full journey as a series of user stories: Stake an asset. Withdraw. Claim rewards. For each action, I detailed every step, every edge case, and every failure state — including what could go wrong and what the UI should do about it.

These stories became the product foundation. They helped prioritise which flows to build first, forced early decisions about multi-chain complexity, and ensured every screen had a job to do.

## Three Versions to Get It Right

**Version 1 — Raw and functional.** The first version exposed every step: select an asset, approve tokens, stake, receive csTokens. It worked. But it was clunky. Too many prompts, too many MetaMask pop-ups, too much assumed knowledge. It gave us a baseline — and something to improve.

**Version 2 — One-click simplicity.** We stripped everything back. Removed the mint step, eliminated approval friction, and collapsed the entire stake flow into a single action. In closed testing, it looked like a win. Maze reports showed high success rates. The flow felt seamless.

Then I sat next to real users.

I ran moderated sessions — real people, real devices, no instructions upfront. I asked them to try staking. I watched. And what surfaced was that the simplicity had masked too much. Users could complete the steps. They didn't understand what they were doing or why.

That's when it crystallised: **good UX isn't just about speed. It's about clarity, trust, and control.**

**Version 3 — The swap mental model.** I redesigned around a frame users already understood: a token swap. One token goes in, another comes out. Rewards grow. You stay in control. Every animation, tooltip, and state message was built to keep users oriented — even when the blockchain took time to respond. No spinning loaders with no context. Always feedback, always forward.

## Rewards That Made Sense

Tracking DeFi rewards is rarely straightforward. Token values fluctuate constantly, and you can't just tell a user "you earned 10 ETH this month." That number is always changing.

Our solution: instead of showing arbitrary APY figures, we compared csETH to ETH. If csETH equalled 1.02 ETH, the user's rewards were growing — full stop. We also built a reward calculator that let users simulate earnings over time. A simple tool, but it set expectations honestly and gave users something concrete to reason about.

## Instant Withdrawals

Instant withdrawals weren't supposed to be possible. The default required waiting for the protocol's epoch cycle — potentially days.

We invented a workaround: a withdrawal pool that siphoned a portion of incoming deposits and routed those funds to users who wanted to exit immediately. Behind the scenes, pure engineering creativity. In the UI: a single toggle labelled "Instant Withdraw." No complexity surfaced. Just a switch.

## Multi-Chain, Without the Headaches

Supporting ETH and Polygon meant MATIC staking required users to deposit on Polygon while the protocol staked on Ethereum. Gas fees on ETH made smaller deposits painful, which is why Polygon support mattered — but the network switching was a UX landmine.

At the time, MetaMask didn't handle automatic network switching. Rather than throwing errors or breaking flows, we nudged users with a clear, non-alarming prompt that explained what needed to happen and why. No dead ends. Always a path forward.

## Making It Foolproof

Errors in Web3 are expensive — you can lose gas, send tokens to the wrong address, or get stuck mid-transaction. I designed every edge case to feel safe and recoverable.

Instead of error banners that screamed at users, the UI nudged them gently back on track. Every transaction state — pending, confirming, complete — was communicated clearly. No state was left ambiguous. If the network was slow, the user knew it. If something needed their attention, it was surfaced calmly.

## Collaboration

I was the sole designer, but I never worked in isolation. I collaborated directly with the CEO, CTO, and engineering team — iterating fast, testing often. We ran Discord polls with the community, asked constantly what was confusing, and let user feedback reshape decisions that had already been made.

Some flows came from specs. Others emerged entirely from interview sessions. It was always a mix: listen, translate, simplify.

## What I Learned

ClayStack was my first real product. It taught me to break complex systems into digestible flows, to test assumptions early rather than defend them, and to treat simplicity not as a design aesthetic but as a form of respect for the user's time and trust.

I also learned to lead without being asked to. As the sole designer across three years, I owned the process end to end — setting the direction, bridging product and engineering, and staying accountable to the users who were putting real money on the line.

The product didn't just get built. It shipped. It was used. It helped people stake their assets in ways they hadn't before. And every version was better than the last — not because we got smarter, but because we kept listening.
