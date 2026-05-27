import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const entries = await redis.lrange('conversations', 0, -1);
  const parsed = entries.map((e) => (typeof e === 'string' ? JSON.parse(e) : e));

  return Response.json(parsed);
}
