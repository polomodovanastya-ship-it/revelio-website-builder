import type { ReportMeta } from '@/lib/reports'

export function ReportJsonLd({ report }: { report: ReportMeta }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: report.title,
    description: report.summary,
    inLanguage: 'ru',
    url: `https://revelio.tech/research/${report.slug}`,
    author: { '@type': 'Organization', name: 'ООО «Ревелио»' },
    publisher: { '@type': 'Organization', name: 'ООО «Ревелио»', url: 'https://revelio.tech' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  )
}
