import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { REPORT_SLUGS, getReport, type ReportMeta } from '@/lib/reports'
import { ReportRenderer } from '@/components/research/report-renderer'

export const dynamicParams = false

export function generateStaticParams() {
  return REPORT_SLUGS.map((slug) => ({ slug }))
}

function buildReportMetadata(r: ReportMeta): Metadata {
  const url = `https://revelio.tech/research/${r.slug}`
  const description = r.summary.slice(0, 160)
  return {
    title: { absolute: `${r.title} — Ревелио` },
    description,
    alternates: { canonical: url },
    openGraph: { title: r.title, description, url, type: 'article' },
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const report = getReport(slug)
  if (!report) return {}
  return buildReportMetadata(report)
}

export default async function ResearchReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const report = getReport(slug)
  if (!report) notFound()
  return <ReportRenderer report={report} />
}
