// lib/report-format.ts
// Small formatting helpers shared by the assessment report sections.

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU")
}

// `share` fields (groups, roles) are a 0..1 fraction of the whole per the
// ReportData contract (e.g. 0.39 for "39%").
export function toPercent(share: number): number {
  return Math.max(0, Math.min(100, share * 100))
}
