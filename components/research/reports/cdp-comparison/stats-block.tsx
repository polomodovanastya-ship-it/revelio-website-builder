// components/research/reports/cdp-comparison/stats-block.tsx
import { MODULES, RESEARCH_STATS } from '@/lib/cdp-research-data'

export function StatsBlock() {
  return (
    <section className="mb-12">
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-heading text-4xl font-extrabold leading-none text-primary sm:text-5xl">
            {RESEARCH_STATS.vendorsValue}
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {RESEARCH_STATS.vendorsLabel}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="font-heading text-4xl font-extrabold leading-none text-primary sm:text-5xl">
            {RESEARCH_STATS.criteriaValue}
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {RESEARCH_STATS.criteriaLabel}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <span className="mb-6 inline-block rounded-full bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {RESEARCH_STATS.blockFactorsNote}
        </span>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl">
              🎥
            </span>
            <p className="text-sm font-medium text-foreground">{RESEARCH_STATS.liveDemoNote}</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl">
              📄
            </span>
            <p className="text-sm font-medium text-foreground">{RESEARCH_STATS.docConfirmNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
