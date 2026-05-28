import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ followUps: [] });
  }

  const { messages } = await req.json();
  const recent = (messages as { role: string; content: string }[]).slice(-4);
  const context = recent
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Julian'}: ${m.content}`)
    .join('\n');

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Based on this conversation about Julian Samuel (a product designer), generate exactly 3 short follow-up questions a visitor might naturally ask next. Each should be specific to what was just discussed, feel natural, and be under 10 words. Return only the 3 questions, one per line, no numbering, bullets, or punctuation at the end.

Conversation:
${context}`,
      maxOutputTokens: 80,
    });

    const followUps = text
      .split('\n')
      .map(q => q.replace(/^[-\d.)\s]+/, '').trim())
      .filter(q => q.length > 0)
      .slice(0, 3);

    return Response.json({ followUps });
  } catch {
    return Response.json({ followUps: [] });
  }
}
