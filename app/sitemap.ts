import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/journal'
import { getAllWorkItems } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://macjulian.com'

  const staticRoutes = [
    '/',
    '/about',
    '/work',
    '/journal',
    '/built',
    '/now',
    '/writing',
    '/motion-lab',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1.0 : 0.8,
  }))

  const journalRoutes = getAllArticles().map((a) => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }))

  const workRoutes = getAllWorkItems()
    .filter((w) => !w.draft)
    .map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: new Date(w.date),
      changeFrequency: 'never' as const,
      priority: 0.7,
    }))

  return [...staticRoutes, ...journalRoutes, ...workRoutes]
}
