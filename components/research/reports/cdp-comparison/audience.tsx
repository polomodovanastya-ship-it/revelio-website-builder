// components/research/reports/cdp-comparison/audience.tsx
import { INDUSTRIES, AUDIENCE_ROLES } from '@/lib/cdp-research-data'

export function Audience() {
  return (
    <div className="mb-12">
      <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Для кого будет полезно?
      </h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE_ROLES.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <Icon className="mb-3 h-6 w-6 text-accent" />
            <p className="text-sm leading-snug text-foreground">{label}</p>
          </div>
        ))}
      </div>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Индустрии
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {INDUSTRIES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="group flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]"
          >
            <Icon className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
