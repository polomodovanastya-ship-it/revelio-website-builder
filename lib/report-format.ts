// lib/report-format.ts
// Small formatting helpers shared by the assessment report sections.
import { projectTypes } from "@/components/evaluate/fields"

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU")
}

// project.type comes back as the raw /evaluate form id (e.g.
// "new_direction"), not the Russian label. Map it via the canonical
// projectTypes list, falling back to the raw value for an unmapped/unknown
// code so it never renders blank. project.industry needs no equivalent
// lookup — the form has no separate industry id, so it already arrives as
// display text.
const projectTypeLabelById: Record<string, string> = Object.fromEntries(
  projectTypes.map((t) => [t.id, t.label])
)

export function resolveProjectType(raw: string): string {
  if (!raw) return raw
  return projectTypeLabelById[raw] ?? raw
}

// The PDF/docx render hours rounded to whole numbers everywhere (%.0f) — a
// role's hours in particular is an equal-split quotient (e.g. 12.333),
// which reads as a stray decimal online if not rounded the same way.
export function formatHours(n: number): string {
  return formatNumber(Math.round(n))
}

// `share` fields (groups, roles) are a 0..1 fraction of the whole per the
// ReportData contract (e.g. 0.39 for "39%").
export function toPercent(share: number): number {
  return Math.max(0, Math.min(100, share * 100))
}
