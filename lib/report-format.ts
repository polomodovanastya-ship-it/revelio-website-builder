// lib/report-format.ts
// Small formatting helpers shared by the assessment report sections.

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU")
}

// `share` fields (groups, roles) are assumed to be a 0..1 fraction of the
// whole, per the ReportData contract. Confirm this against the real backend
// once it ships — a whole-percentage convention (e.g. 39 for "39%") would
// need this flipped to `share`.
export function toPercent(share: number): number {
  return Math.max(0, Math.min(100, share * 100))
}
