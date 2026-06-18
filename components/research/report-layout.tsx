import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReportEyebrow } from './report-primitives'

export function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <Link
        href="/#reports"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Все исследования
      </Link>
      <div className="mt-8">
        <ReportEyebrow>[ Исследование ]</ReportEyebrow>
      </div>
      {children}
    </div>
  )
}
