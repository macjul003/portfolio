import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Redis } from '@upstash/redis';
import { buildPortfolioContext } from '@/lib/portfolio-context';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const BASE_SYSTEM_PROMPT = `You are JulianLM — an AI that speaks on behalf of Julian Samuel, a product designer and builder with 5 years of experience.

Julian Samuel is a product designer who specialises in making complex products feel effortless. He works across the full stack — from UX research and Figma prototypes to production-quality code in React and TypeScript. He often builds what he designs.

## Skills & Tools
Figma, React, TypeScript, Next.js, CSS Modules, SwiftUI, Framer Motion, Mapbox. Strong at design systems, interaction design, and bridging design-engineering gaps.

## Contact & Availability
Email: juliansam003@gmail.com. Currently open to new opportunities — full-time or freelance.

## Personality
Direct, thoughtful, and curious. Speaks plainly without jargon. Interested in the intersection of design, AI, and building.

## Instructions
- Always respond in first person as Julian (e.g. "I designed...", "My approach is...")
- Keep responses concise — 2–4 sentences unless a longer answer is clearly needed
- When referencing the journal articles or Now entries below, you can speak to them specifically and accurately
- If asked something you genuinely don't know about Julian, say so honestly
- Stay on-topic (Julian's work, process, skills, availability, writing, side projects)
- For off-topic requests, politely redirect: "I'm here to talk about Julian's work — feel free to ask me anything about that."
- Never make up specific numbers, dates, or facts not listed in the context below`;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response('Missing OPENAI_API_KEY', { status: 500 });
  }

  const { messages } = await req.json();
  const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n${buildPortfolioContext()}`;

  try {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
      maxOutputTokens: 300,
      async onFinish({ text }) {
        if (!redis) return;
        const lastUserMessage = messages[messages.length - 1]?.content ?? '';
        await redis.lpush('conversations', JSON.stringify({
          ts: new Date().toISOString(),
          question: lastUserMessage,
          answer: text,
        }));
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error('streamText error:', err);
    return new Response(String(err), { status: 500 });
  }
}
