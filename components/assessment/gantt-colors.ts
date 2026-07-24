import type { ReportSchedule } from '@/lib/report-api'

// Area color palette — mirrors ganttAreaPalette in the backend's
// internal/services/report_gantt_xlsx.go so the web Gantt and the downloadable
// XLSX use the SAME area coding. Colors are assigned in FIRST-SEEN order by
// task (not hashed off the area string), cycling once the palette is exhausted,
// so a given area gets the same color in both outputs for the same schedule.
export const GANTT_AREA_PALETTE = [
  '#4C86C6', // blue
  '#63B179', // green
  '#E8A33D', // amber
  '#C96570', // terracotta
  '#8E6FC4', // purple
  '#4CADAD', // teal
  '#D98CC0', // pink
  '#949494', // gray (overflow)
] as const

export const GANTT_FALLBACK_AREA_COLOR = '#949494'

// assignAreaColors returns area → hex in the same first-seen order the XLSX
// exporter uses: tasks first (matching its row-by-row assignment), then any
// areas that carry no tasks, so every rendered area summary still gets a
// stable color.
export function assignAreaColors(schedule: ReportSchedule): Map<string, string> {
  const map = new Map<string, string>()
  let i = 0
  const take = (area: string) => {
    if (!map.has(area)) {
      map.set(area, GANTT_AREA_PALETTE[i % GANTT_AREA_PALETTE.length])
      i++
    }
  }
  for (const t of schedule.tasks ?? []) take(t.area)
  for (const a of schedule.areas ?? []) take(a.area)
  return map
}

export function areaColorOf(map: Map<string, string>, area: string): string {
  return map.get(area) ?? GANTT_FALLBACK_AREA_COLOR
}
