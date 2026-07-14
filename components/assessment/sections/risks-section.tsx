import { AlertTriangle } from 'lucide-react'
import { ReportSectionCard } from '../primitives'

// 05 Риски — curated, deduped list of risk sentences from the backend
// (mirrors the PDF); no structured impact/comment, so it's plain text.
export function RisksSection({ risks }: { risks: string[] }) {
  return (
    <ReportSectionCard number="05" title="Риски">
      <ul className="space-y-2">
        {risks.map((r, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-xl bg-destructive/5 px-3 py-2.5 text-sm text-foreground"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </ReportSectionCard>
  )
}
