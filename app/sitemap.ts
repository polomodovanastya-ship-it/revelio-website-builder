import type { MetadataRoute } from 'next'
import { REPORT_SLUGS, RESEARCH_ENABLED } from '@/lib/reports'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://revelio.tech'

  const researchEntries = RESEARCH_ENABLED
    ? REPORT_SLUGS.map((slug) => ({
        url: `${base}/research/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    : []

  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/evaluate`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/legal`, changeFrequency: 'yearly', priority: 0.3 },
    ...researchEntries,
    { url: `${base}/for_ai`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacts`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/consulting`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/it-procurement-as-a-service`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/1-click-estimate`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/mvp-in-2-weeks`, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
