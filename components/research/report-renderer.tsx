import type { ReportMeta } from '@/lib/reports'
import { ReportLayout } from './report-layout'
import { ReportJsonLd } from './report-json-ld'

export function ReportRenderer({ report }: { report: ReportMeta }) {
  return (
    <ReportLayout>
      <report.Body />
      <ReportJsonLd report={report} />
    </ReportLayout>
  )
}
