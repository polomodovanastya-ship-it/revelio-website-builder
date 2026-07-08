// components/research/reports/cdp-comparison/stats-block.tsx
import { MODULES, RESEARCH_STATS } from '@/lib/cdp-research-data'

export function StatsBlock() {
  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground">
          <span>{RESEARCH_STATS.vendorsCount}</span>
          <span>·</span>
          <span>{RESEARCH_STATS.criteriaCount}</span>
        </div>
        <p className="mb-8 text-lg font-semibold text-primary">{RESEARCH_STATS.blockFactorsNote}</p>
        <div className="mb-8">
          <p className="mb-3 text-lg font-semibold text-primary">15 модулей:</p>
          <ol className="grid gap-x-8 gap-y-1.5 text-sm leading-snug text-muted-foreground sm:grid-cols-2 md:text-base">
            {MODULES.map((m, i) => (
              <li key={m}>
                <span className="font-mono text-accent">{i + 1}.</span> {m}
              </li>
            ))}
          </ol>
        </div>
        <p className="mb-2 text-lg font-semibold text-primary">{RESEARCH_STATS.liveDemoNote}</p>
        <p className="text-lg font-semibold text-primary">{RESEARCH_STATS.docConfirmNote}</p>
      </div>
    </section>
  )
}
