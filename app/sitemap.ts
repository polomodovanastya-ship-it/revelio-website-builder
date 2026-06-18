import type { MetadataRoute } from 'next'

// Hardcoded 1:1 with prod public/sitemap.xml (12 URLs). Standalone in A:
// do NOT import lib/reports.ts (not created until E; E refactors this file).
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://revelio.tech'
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/evaluate`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/legal`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/research/loyalty-azs-2026`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/research/ux-b2b-travel-2026`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/research/cdp-comparison-2026`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/for_ai`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacts`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/consulting`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/it-procurement-as-a-service`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/1-click-estimate`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/mvp-in-2-weeks`, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
