import { ArrowRight, ChevronDown, GanttChartSquare, MoveHorizontal } from 'lucide-react'
import { ReportSectionCard } from '../primitives'
import { EstimateGantt } from '../estimate-gantt'
import { GanttFigure } from '../gantt-figure'
import { areaColorOf, assignAreaColors } from '../gantt-colors'
import { cn } from '@/lib/utils'
import type { ReportSchedule } from '@/lib/report-api'

const thBase = 'py-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground'

// Diagonal hatch that mirrors the SVG's is_fallback pattern (muted-foreground
// strokes over a faint accent fill), so the legend swatch reads as the same mark.
const HATCH_BG =
  'repeating-linear-gradient(45deg, transparent 0, transparent 2px, var(--muted-foreground) 2px, var(--muted-foreground) 3px)'

function Swatch({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={cn('inline-block h-3 w-6 shrink-0 rounded-sm border border-border', className)} style={style} />
}

// Legend for the marks used in the Gantt SVG. Kept as HTML (not baked into the
// SVG) so it wraps responsively and reuses the same theme tokens. Area chips
// are data-driven and share assignAreaColors() with the SVG (and the XLSX), so
// colors match across all three.
function GanttLegend({ schedule }: { schedule: ReportSchedule }) {
  const colors = assignAreaColors(schedule)
  const areas = schedule.areas ?? []
  const tasks = schedule.tasks ?? []
  // Only advertise a mark in the legend when it actually appears in the chart.
  const hasFallback = tasks.some((t) => t.is_fallback)
  const hasDeps = tasks.some((t) => (t.depends_on ?? []).length > 0)
  return (
    <div className="mb-4 space-y-2 text-[11px] text-muted-foreground">
      {areas.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-medium uppercase tracking-wide text-muted-foreground/70">Области:</span>
          {areas.map((a) => (
            <span key={a.area} className="inline-flex items-center gap-1.5">
              <Swatch style={{ backgroundColor: areaColorOf(colors, a.area) }} />
              {a.label}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {hasFallback && (
          <span className="inline-flex items-center gap-1.5">
            <Swatch className="bg-muted-foreground/25" style={{ backgroundImage: HATCH_BG }} />
            Низкая уверенность оценки
          </span>
        )}
        {hasDeps && (
          <span className="inline-flex items-center gap-1.5">
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            Зависимость
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1.5 text-muted-foreground/80">
          <MoveHorizontal className="h-3.5 w-3.5 shrink-0" />
          Потяните, чтобы прокрутить
        </span>
      </div>
    </div>
  )
}

// План-график — participates in the sequential section numbering same as
// every other section; number is assigned by report-view based on render
// order (icon is kept as a fallback if a number is ever not supplied).
// Prop-driven, stateless: caption и график целиком выводятся из
// backend-owned schedule, без new Date() на рендере (anchor_label уже
// посчитан бэкендом из run.FinishedAt) — иначе подпись расходится с PDF.
//
// Секция ВСЕГДА рендерится (report-view больше не скрывает её по флагу):
// старые оценки до раскатки Gantt не имеют schedule вовсе, и это нормальный
// исход, а не ошибка — поэтому здесь graceful empty-state, а не null-return.
export function GanttSection({
  schedule,
  number,
}: {
  schedule: ReportSchedule | null | undefined
  number?: string
}) {
  if (!schedule || schedule.tasks.length === 0) {
    return (
      <ReportSectionCard icon={GanttChartSquare} number={number} title="План-график">
        <p className="text-sm text-muted-foreground">
          План-график для этой оценки недоступен — он формируется для новых оценок; для более ранних это нормально.
        </p>
      </ReportSectionCard>
    )
  }

  const caption = schedule.anchor_label || 'ориентировочно, рабочие дни'

  return (
    <ReportSectionCard icon={GanttChartSquare} number={number} title="План-график">
      <p className="mb-4 text-sm text-muted-foreground">{caption}</p>

      <GanttLegend schedule={schedule} />

      <div className="overflow-hidden rounded-xl border border-border">
        <GanttFigure>
          <EstimateGantt schedule={schedule} />
        </GanttFigure>
      </div>

      <details className="group mt-4 rounded-xl border border-border bg-background">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-foreground marker:content-none">
          <span>Таблица плана</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className={cn(thBase, 'text-left')}>Область</th>
                    <th className={cn(thBase, 'w-full text-left')}>Задача</th>
                    <th className={cn(thBase, 'whitespace-nowrap text-right')}>Неделя старта</th>
                    <th className={cn(thBase, 'whitespace-nowrap text-right')}>Длительность</th>
                    <th className={cn(thBase, 'whitespace-nowrap text-right')}>Зависимости</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {schedule.tasks.map((t) => (
                    <tr data-gantt-row key={t.task_id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-3 py-3.5 text-muted-foreground">{t.area}</td>
                      <td className="px-3 py-3.5 text-foreground">{t.label}</td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-right tabular-nums">
                        {Math.floor(t.start_unit / 5) + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-right tabular-nums">
                        {t.duration_unit} дн.
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-right tabular-nums">
                        {(t.depends_on ?? []).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </details>
    </ReportSectionCard>
  )
}
