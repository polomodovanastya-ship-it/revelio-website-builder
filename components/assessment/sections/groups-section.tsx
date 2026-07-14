import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import { formatHours, toPercent } from '@/lib/report-format'
import type { ReportGroup, ReportTotals } from '@/lib/report-api'

const thNum = 'whitespace-nowrap px-3 pb-3 text-right font-mono text-xs uppercase tracking-wide text-muted-foreground'
const numTd = 'whitespace-nowrap px-3 py-3 text-right tabular-nums'

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
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-full px-3 pb-3 pl-0 text-left font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Группа
              </th>
              <th className={thNum}>Задач</th>
              <th className={thNum}>Min, ч</th>
              <th className={thNum}>Ожидаемо, ч</th>
              <th className={thNum}>Max, ч</th>
              <th className={thNum}>Доля</th>
              <th className="whitespace-nowrap px-3 pb-3 pr-0 text-left font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Точность
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.name} className="border-b border-border last:border-b-0">
                <td className="px-3 py-3 pl-0 font-medium text-foreground">{g.name}</td>
                <td className={`${numTd} text-muted-foreground`}>{g.count}</td>
                <td className={`${numTd} text-muted-foreground`}>{formatHours(g.min)}</td>
                <td className={`${numTd} text-foreground`}>{formatHours(g.expected)}</td>
                <td className={`${numTd} text-muted-foreground`}>{formatHours(g.max)}</td>
                <td className={`${numTd} text-muted-foreground`}>{Math.round(toPercent(g.share))}%</td>
                <td className="whitespace-nowrap px-3 py-3 pr-0">
                  <Badge tone={accuracyTone(g.accuracy)}>{g.accuracy}</Badge>
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-border bg-muted/60 font-semibold">
              <td className="px-3 py-3 pl-0 text-foreground">Итого</td>
              <td className={`${numTd} text-foreground`}>{totals.tasks}</td>
              <td className={`${numTd} text-foreground`}>{formatHours(totals.hours_min)}</td>
              <td className={`${numTd} text-foreground`}>{formatHours(totals.hours_expected)}</td>
              <td className={`${numTd} text-foreground`}>{formatHours(totals.hours_max)}</td>
              <td className={`${numTd} text-foreground`}>100%</td>
              <td className="whitespace-nowrap px-3 py-3 pr-0">
                {accuracyOverall && <Badge tone={accuracyTone(accuracyOverall)}>{accuracyOverall}</Badge>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  )
}
