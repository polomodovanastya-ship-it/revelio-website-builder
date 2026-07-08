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
      <div className="flex flex-wrap gap-2">
        {INDUSTRIES.map((label) => (
          <span key={label} className="rounded-full border border-border bg-secondary px-4 py-2 text-sm">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
