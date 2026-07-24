import type { ReportSchedule, ScheduleArea, ScheduleTask } from '@/lib/report-api'
import { areaColorOf, assignAreaColors } from './gantt-colors'

// Pure SVG Gantt chart — mirrors components/research/report-radar.tsx:
// stateless, server-renderable, no chart lib, no 'use client', no hooks.
// Coordinate system: a left label gutter (LABEL_W) holding area names in the
// gutter + task labels drawn inside their bars, and a right plot area whose X
// scale is `plotWidth / max(1, schedule.total_units)` (working days). Rows, top
// to bottom: one row per AREA (a summary bar spanning start_unit..+duration_unit),
// then one row per LANE inside that area (lanes are packed by the backend so
// tasks sharing a lane never overlap in time — several task bars can sit on a
// single lane row). Overhead roles (QA/Analyst/PM) are a percentage overlay,
// NOT tasks, so they are intentionally not drawn here — they live in the
// "Часы по ролям" section.

const LABEL_W = 184
// Reserved space to the right of the plot for the end-of-bar duration labels
// ("NN дн.") drawn after an area/task bar — sized for the widest realistic
// label ("999 дн.") plus its leading gap, so a bar ending at/near total_units
// (e.g. the last area) never has its trailing label clipped by the SVG edge.
const LABEL_R = 56
const BOTTOM_PAD = 14
const AXIS_H = 30
const TOP_PAD = 8
const AREA_ROW_H = 32
const TASK_ROW_H = 26
const GROUP_GAP = 10
const PX_PER_UNIT = 22
const MIN_PLOT_W = 260
const MIN_BAR_PX = 4

const HATCH_ID = 'gantt-fallback-hatch'
const ARROW_ID = 'gantt-dep-arrow'

function truncate(label: string, max: number): string {
  const s = label ?? ''
  if (s.length <= max) return s
  return `${s.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

type TaskLayout = {
  task: ScheduleTask
  x: number
  width: number
  y: number
  rowH: number
}

export function EstimateGantt({ schedule }: { schedule: ReportSchedule }) {
  const areas = schedule.areas ?? []
  const tasks = schedule.tasks ?? []
  // task_id → label, to name a task's dependencies in the tooltip ("Связано с").
  const taskLabelById = new Map(tasks.map((t) => [t.task_id, t.label]))

  // Area color coding — same palette/assignment as the downloadable XLSX
  // (see gantt-colors.ts), so a given area reads the same color in both.
  const areaColor = assignAreaColors(schedule)

  const totalUnits = Math.max(1, schedule.total_units || 0)
  const plotWidth = Math.max(MIN_PLOT_W, totalUnits * PX_PER_UNIT)
  const pxPerUnit = plotWidth / totalUnits
  const xAt = (unit: number) => pxPerUnit * Math.max(0, unit)

  // --- Row layout ------------------------------------------------------
  // Every area from schedule.areas gets a summary row + one row per lane
  // (area.lane_count, defended against tasks that report a higher lane).
  // Tasks whose `area` isn't in schedule.areas (defensive — should not
  // happen given the backend contract, but a chart must never crash on
  // stray data) are grouped into a synthetic trailing "Другое" block so
  // nothing silently vanishes from the plan.
  const knownAreaCodes = new Set(areas.map((a) => a.area))
  const orphanTasks = tasks.filter((t) => !knownAreaCodes.has(t.area))
  const orphanGroups = new Map<string, ScheduleTask[]>()
  for (const t of orphanTasks) {
    if (!orphanGroups.has(t.area)) orphanGroups.set(t.area, [])
    orphanGroups.get(t.area)!.push(t)
  }
  const syntheticAreas: ScheduleArea[] = Array.from(orphanGroups.entries()).map(([code, group]) => {
    const starts = group.map((t) => t.start_unit)
    const ends = group.map((t) => t.start_unit + t.duration_unit)
    const laneCount = Math.max(1, ...group.map((t) => t.lane + 1))
    return {
      area: code,
      label: code || 'Другое',
      start_unit: Math.min(...starts),
      duration_unit: Math.max(...ends) - Math.min(...starts),
      lane_count: laneCount,
    }
  })
  const allAreas = [...areas, ...syntheticAreas]

  let cursorY = AXIS_H + TOP_PAD
  const areaBlocks = allAreas.map((area) => {
    const areaTasks = tasks.filter((t) => t.area === area.area)
    const maxLaneSeen = areaTasks.reduce((m, t) => Math.max(m, t.lane), -1)
    const laneCount = Math.max(area.lane_count || 0, maxLaneSeen + 1, areaTasks.length > 0 ? 1 : 0)

    const blockY = cursorY
    const areaY = cursorY
    cursorY += AREA_ROW_H

    const laneRows: { y: number; tasks: ScheduleTask[] }[] = []
    for (let lane = 0; lane < laneCount; lane++) {
      laneRows.push({ y: cursorY, tasks: areaTasks.filter((t) => t.lane === lane) })
      cursorY += TASK_ROW_H
    }
    const blockH = cursorY - blockY
    cursorY += GROUP_GAP
    return { area, areaY, laneRows, blockY, blockH }
  })

  const plotBottom = cursorY + BOTTOM_PAD
  const svgWidth = LABEL_W + plotWidth + LABEL_R
  const svgHeight = Math.max(AXIS_H + TOP_PAD + BOTTOM_PAD, plotBottom)

  // --- Task bar geometry + dependency anchors ---------------------------
  const taskLayout: TaskLayout[] = []
  const anchorByTaskId = new Map<string, TaskLayout>()
  for (const block of areaBlocks) {
    for (const row of block.laneRows) {
      for (const task of row.tasks) {
        const x = LABEL_W + xAt(task.start_unit)
        const width = Math.max(MIN_BAR_PX, xAt(task.duration_unit))
        const layout: TaskLayout = { task, x, width, y: row.y, rowH: TASK_ROW_H }
        taskLayout.push(layout)
        anchorByTaskId.set(task.task_id, layout)
      }
    }
  }

  // --- Axis ticks (~weeks, every 5 working days) ------------------------
  const ticks: { unit: number; label: string }[] = []
  for (let day = 0; day <= totalUnits; day += 5) {
    ticks.push({ unit: day, label: `Н${Math.floor(day / 5) + 1}` })
  }

  const ariaLabel = `План-график: ${tasks.length} задач, ориентировочно ${schedule.total_units} рабочих дней`

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="h-auto w-full"
      style={{ minWidth: `${Math.round(svgWidth)}px` }}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        {/* Colour-independent a11y signal for is_fallback (low-confidence) bars. */}
        <pattern id={HATCH_ID} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={6} height={6} className="fill-[var(--card)]" fillOpacity={0} />
          <line x1={0} y1={0} x2={0} y2={6} className="stroke-muted-foreground" strokeWidth={1.75} />
        </pattern>
        <marker id={ARROW_ID} viewBox="0 0 8 8" refX={6.5} refY={4} markerWidth={6.5} markerHeight={6.5} orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 Z" className="fill-foreground" fillOpacity={0.65} />
        </marker>
      </defs>

      {/* Zebra banding per area block, for readability with many areas. */}
      {areaBlocks.map((b, i) =>
        i % 2 === 1 ? (
          <rect
            key={`band-${b.area.area}`}
            x={0}
            y={b.blockY}
            width={svgWidth}
            height={b.blockH}
            className="fill-muted-foreground"
            fillOpacity={0.035}
          />
        ) : null
      )}

      {/* Axis baseline + week gridlines/ticks */}
      <line x1={0} y1={AXIS_H} x2={svgWidth} y2={AXIS_H} className="stroke-[var(--border)]" strokeWidth={1} />
      {ticks.map((t) => {
        const x = LABEL_W + xAt(t.unit)
        return (
          <g key={`tick-${t.unit}`}>
            <line x1={x} y1={AXIS_H} x2={x} y2={svgHeight - BOTTOM_PAD} className="stroke-[var(--border)]" strokeOpacity={0.5} strokeWidth={1} />
            <text x={x + 4} y={AXIS_H - 10} className="fill-muted-foreground font-mono" fontSize={10}>
              {t.label}
            </text>
          </g>
        )
      })}

      {/* Area summary rows */}
      {areaBlocks.map((b) => (
        <g key={`area-${b.area.area}`}>
          <text
            x={4}
            y={b.areaY + AREA_ROW_H / 2 + 4}
            className="fill-foreground font-mono font-semibold"
            fontSize={11}
          >
            {truncate(b.area.label, 24)}
            <title>{b.area.label}</title>
          </text>
          <rect
            data-gantt-bar
            data-tip={b.area.label}
            data-tip-sub={`Область · ${b.area.duration_unit} дн.`}
            x={LABEL_W + xAt(b.area.start_unit)}
            y={b.areaY + 5}
            width={Math.max(MIN_BAR_PX, xAt(b.area.duration_unit))}
            height={AREA_ROW_H - 10}
            rx={6}
            fill={areaColorOf(areaColor, b.area.area)}
            fillOpacity={0.16}
            className="stroke-[var(--border)]"
            strokeWidth={1}
          />
          <text
            x={LABEL_W + xAt(b.area.start_unit) + Math.max(MIN_BAR_PX, xAt(b.area.duration_unit)) + 6}
            y={b.areaY + AREA_ROW_H / 2 + 4}
            className="fill-muted-foreground font-mono tabular-nums"
            fontSize={10}
          >
            {b.area.duration_unit} дн.
          </text>
        </g>
      ))}

      {/* Task bars (one row per lane; several bars may share a row since
          lanes are packed to never overlap in time by the backend).
          Labels are drawn ONLY inside their own bar and hard-clipped to the
          bar rect, so a long name can never bleed onto the next bar in the lane
          (the old right-of-bar labels for narrow bars were the main source of
          overlap). Bars too narrow for even a couple of glyphs get no inline
          text — the full name is always available on hover via <title>. */}
      {taskLayout.map((l) => {
        const LABEL_PAD_X = 6
        const innerW = l.width - LABEL_PAD_X * 2
        // ~5.7px per glyph at fontSize 9.5 mono; require room for a few chars.
        const showInline = innerW >= 22
        const clipId = `gantt-lbl-${l.task.task_id}`
        // Names of this task's dependencies (arrows can overlap when several
        // point to the same predecessor, so surface the link in the tooltip too).
        const relLabel = (l.task.depends_on ?? [])
          .map((id) => taskLabelById.get(id) ?? id)
          .join(', ')
        return (
          <g key={l.task.task_id}>
            <rect
              data-gantt-bar
              data-tip={l.task.label}
              data-tip-sub={`${l.task.duration_unit} дн.${l.task.is_fallback ? ' · низкая уверенность оценки' : ''}`}
              data-tip-rel={relLabel || undefined}
              x={l.x}
              y={l.y + 4}
              width={l.width}
              height={l.rowH - 8}
              rx={4}
              fill={areaColorOf(areaColor, l.task.area)}
              fillOpacity={l.task.is_fallback ? 0.28 : 0.5}
              className="stroke-[var(--border)]"
              strokeWidth={1}
            />
            {l.task.is_fallback && (
              <rect
                x={l.x}
                y={l.y + 4}
                width={l.width}
                height={l.rowH - 8}
                rx={4}
                fill={`url(#${HATCH_ID})`}
                fillOpacity={0.55}
                pointerEvents="none"
              />
            )}
            {showInline && (
              <>
                <clipPath id={clipId}>
                  <rect x={l.x} y={l.y + 4} width={l.width} height={l.rowH - 8} rx={4} />
                </clipPath>
                <text
                  x={l.x + LABEL_PAD_X}
                  y={l.y + l.rowH / 2 + 4}
                  clipPath={`url(#${clipId})`}
                  pointerEvents="none"
                  className="fill-foreground font-mono"
                  fontSize={9.5}
                >
                  {truncate(l.task.label, Math.max(3, Math.floor(innerW / 5.7)))}
                </text>
              </>
            )}
          </g>
        )
      })}

      {/* Dependency connectors — elbow paths with an arrowhead. Deps whose
          id is not present in schedule.tasks are dropped, not drawn. */}
      {taskLayout.map((l) =>
        (l.task.depends_on ?? []).map((depId) => {
          const dep = anchorByTaskId.get(depId)
          if (!dep) return null
          const sx = dep.x + dep.width
          const sy = dep.y + dep.rowH / 2
          const tx = l.x
          const ty = l.y + l.rowH / 2
          const midX = sx + Math.max(6, (tx - sx) / 2)
          const d = `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ty} L ${tx} ${ty}`
          return (
            <path
              key={`dep-${depId}-${l.task.task_id}`}
              d={d}
              fill="none"
              pointerEvents="none"
              className="stroke-foreground"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              markerEnd={`url(#${ARROW_ID})`}
            />
          )
        })
      )}
    </svg>
  )
}
