// lib/report-format.ts
// Small formatting helpers shared by the assessment report sections.

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU")
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
