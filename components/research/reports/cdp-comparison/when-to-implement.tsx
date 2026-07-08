import { Heart, Flame } from 'lucide-react'
import { IF_YOU_SEE, WHEN_YOU_WANT, MAU_TIERS } from '@/lib/cdp-research-data'

export function WhenToImplement() {
  return (
    <section className="mb-16">
      <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Когда внедрять?
      </h2>
      <p className="mb-8 text-base italic leading-relaxed text-muted-foreground">
        Когда исчерпаны все методы ручного взаимодействия
      </p>
      <div className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
              Если видите, что:
            </h3>
          </div>
          <ul className="space-y-3">
            {IF_YOU_SEE.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm leading-snug text-foreground">
                <span className="font-mono text-xs tabular-nums text-accent">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">Когда хотите:</h3>
          </div>
          <ul className="space-y-3">
            {WHEN_YOU_WANT.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm leading-snug text-foreground">
                <span className="font-mono text-xs tabular-nums text-accent">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {MAU_TIERS.map((tier) => (
          <div
            key={tier.range}
            className="rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]"
          >
            <h4 className="mb-4 font-heading text-base font-bold text-primary">{tier.range}</h4>
            <ul className="mb-4 space-y-1.5 border-b border-border pb-4 text-xs leading-snug text-muted-foreground">
              {tier.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul className="space-y-1.5 text-xs leading-snug text-muted-foreground">
              {tier.team.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
