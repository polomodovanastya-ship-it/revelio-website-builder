// components/research/reports/cdp-comparison/vendor-profiles.tsx
import { VENDOR_PROFILES, HONORABLE_MENTIONS } from '@/lib/cdp-research-data'

function ProfileCard({
  name,
  score,
  pros,
  cons,
}: {
  name: string
  score?: number
  pros: string[]
  cons: string[]
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_18px_44px_-24px_rgba(20,37,80,0.30)] md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <h3 className="font-heading text-3xl font-extrabold leading-none tracking-tight text-primary md:text-4xl">
          {name}
        </h3>
        {score !== undefined && (
          <span className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-1.5 font-heading text-lg font-extrabold italic text-accent-foreground">
            {score}
          </span>
        )}
      </div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div>
          <span className="mb-4 block select-none font-heading text-5xl font-extrabold leading-none text-primary">
            +
          </span>
          <ul className="space-y-3">
            {pros.map((p) => (
              <li key={p} className="text-sm leading-snug text-foreground md:text-base">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="mb-5 mt-2 inline-block h-3.5 w-16 rounded-sm bg-accent" />
          <ul className="space-y-3">
            {cons.map((c) => (
              <li key={c} className="text-sm leading-snug text-foreground md:text-base">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function VendorProfiles() {
  return (
    <section className="mb-16 space-y-8">
      {VENDOR_PROFILES.map((v) => (
        <ProfileCard key={v.name} {...v} />
      ))}
      <div>
        <h3 className="mb-8 font-heading text-xl font-bold uppercase tracking-tight text-muted-foreground">
          И ещё (Honorable mentions)
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {HONORABLE_MENTIONS.map((v) => (
            <div key={v.name} className="rounded-2xl border border-border bg-card p-6">
              <h4 className="mb-4 font-heading text-lg font-bold uppercase tracking-tight text-primary">
                {v.name}
              </h4>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">+</p>
              <ul className="mb-4 space-y-2">
                {v.pros.map((p) => (
                  <li key={p} className="text-sm leading-snug text-foreground">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">−</p>
              <ul className="space-y-2">
                {v.cons.map((c) => (
                  <li key={c} className="text-sm leading-snug text-muted-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
