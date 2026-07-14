import { ReportSectionCard, Badge, impactTone } from '../primitives'
import type { ReportRisk } from '@/lib/report-api'

// 05 Риски
export function RisksSection({ risks }: { risks: ReportRisk[] }) {
  return (
    <ReportSectionCard number="05" title="Риски">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Риск
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Влияние
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Комментарий
              </th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-b-0">
                <td className="py-2.5 font-medium text-foreground">{r.risk}</td>
                <td className="py-2.5">
                  <Badge tone={impactTone(r.impact)}>{r.impact}</Badge>
                </td>
                <td className="py-2.5 text-muted-foreground">{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  )
}
