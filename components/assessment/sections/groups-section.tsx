import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import { formatHours, toPercent } from '@/lib/report-format'
import type { ReportGroup, ReportTotals } from '@/lib/report-api'

const thBase = 'py-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground'
const thNum = `${thBase} whitespace-nowrap text-right`
const cellNum = 'whitespace-nowrap px-3 text-right tabular-nums'

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
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className={`${thBase} w-full text-left`}>Группа</th>
                <th className={thNum}>Задач</th>
                <th className={thNum}>Min, ч</th>
                <th className={thNum}>Ожидаемо, ч</th>
                <th className={thNum}>Max, ч</th>
                <th className={thNum}>Доля</th>
                <th className={`${thBase} whitespace-nowrap text-left`}>Точность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {groups.map((g) => (
                <tr key={g.name} className="transition-colors hover:bg-muted/30">
                  <td className="px-3 py-3.5 font-medium text-foreground">{g.name}</td>
                  <td className={`${cellNum} py-3.5 text-muted-foreground`}>{g.count}</td>
                  <td className={`${cellNum} py-3.5 text-muted-foreground`}>{formatHours(g.min)}</td>
                  <td className={`${cellNum} py-3.5 font-semibold text-foreground`}>{formatHours(g.expected)}</td>
                  <td className={`${cellNum} py-3.5 text-muted-foreground`}>{formatHours(g.max)}</td>
                  <td className={`${cellNum} py-3.5 text-foreground`}>{Math.round(toPercent(g.share))}%</td>
                  <td className="whitespace-nowrap px-3 py-3.5">
                    <Badge tone={accuracyTone(g.accuracy)}>{g.accuracy}</Badge>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border bg-muted/60 font-semibold text-foreground">
                <td className="px-3 py-4">Итого</td>
                <td className={`${cellNum} py-4`}>{totals.tasks}</td>
                <td className={`${cellNum} py-4`}>{formatHours(totals.hours_min)}</td>
                <td className={`${cellNum} py-4 text-accent`}>{formatHours(totals.hours_expected)}</td>
                <td className={`${cellNum} py-4`}>{formatHours(totals.hours_max)}</td>
                <td className={`${cellNum} py-4`}>100%</td>
                <td className="whitespace-nowrap px-3 py-4">
                  {accuracyOverall && <Badge tone={accuracyTone(accuracyOverall)}>{accuracyOverall}</Badge>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ReportSectionCard>
  )
}
