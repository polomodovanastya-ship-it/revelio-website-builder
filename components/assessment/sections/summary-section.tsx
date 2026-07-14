import { ReportSectionCard, StatTile, BarRow } from '../primitives'
import { formatNumber } from '@/lib/report-format'
import type { ReportGroup, ReportTotals } from '@/lib/report-api'

// 01 Краткое резюме
export function SummarySection({
  summary,
  totals,
  groups,
}: {
  summary: string
  totals: ReportTotals
  groups: ReportGroup[]
}) {
  return (
    <ReportSectionCard number="01" title="Краткое резюме">
      {summary && <p className="mb-6 text-sm leading-relaxed text-foreground">{summary}</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile value={`${formatNumber(totals.hours_expected)} ч`} label="Ожидаемо" highlight />
        <StatTile
          value={`${formatNumber(totals.hours_min)}–${formatNumber(totals.hours_max)} ч`}
          label="Диапазон"
        />
        <StatTile value={String(totals.tasks)} label="Задач" />
        <StatTile value={String(totals.risks_count)} label="Риски" />
        <StatTile value={`${totals.questions_answered}/${totals.questions_total}`} label="Вопросы" />
      </div>
      {groups.length > 0 && (
        <div className="mt-6 space-y-2.5">
          {groups.map((g) => (
            <BarRow key={g.name} label={g.name} share={g.share} />
          ))}
        </div>
      )}
    </ReportSectionCard>
  )
}
