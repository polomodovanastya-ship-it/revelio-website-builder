import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import { formatHours, toPercent } from '@/lib/report-format'
import type { ReportGroup, ReportTotals } from '@/lib/report-api'

// 03 Сводная оценка
export function GroupsSection({
  groups,
  totals,
  accuracyOverall,
}: {
  groups: ReportGroup[]
  totals: ReportTotals
  accuracyOverall?: string
}) {
  return (
    <ReportSectionCard number="03" title="Сводная оценка">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Группа
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Задач
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Min, ч
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Ожидаемо, ч
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Max, ч
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Доля
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Точность
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.name} className="border-b border-border last:border-b-0">
                <td className="py-2.5 font-medium text-foreground">{g.name}</td>
                <td className="py-2.5 text-muted-foreground">{g.count}</td>
                <td className="py-2.5 text-muted-foreground">{formatHours(g.min)}</td>
                <td className="py-2.5 text-foreground">{formatHours(g.expected)}</td>
                <td className="py-2.5 text-muted-foreground">{formatHours(g.max)}</td>
                <td className="py-2.5 text-muted-foreground">{Math.round(toPercent(g.share))}%</td>
                <td className="py-2.5">
                  <Badge tone={accuracyTone(g.accuracy)}>{g.accuracy}</Badge>
                </td>
              </tr>
            ))}
            <tr className="bg-muted/60 font-semibold">
              <td className="py-2.5 text-foreground">Итого</td>
              <td className="py-2.5 text-foreground">{totals.tasks}</td>
              <td className="py-2.5 text-foreground">{formatHours(totals.hours_min)}</td>
              <td className="py-2.5 text-foreground">{formatHours(totals.hours_expected)}</td>
              <td className="py-2.5 text-foreground">{formatHours(totals.hours_max)}</td>
              <td className="py-2.5 text-foreground">100%</td>
              <td className="py-2.5">
                {accuracyOverall && <Badge tone={accuracyTone(accuracyOverall)}>{accuracyOverall}</Badge>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  )
}
