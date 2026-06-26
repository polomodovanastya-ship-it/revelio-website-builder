'use client'

import { ShieldCheck } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { ERROR_STAGES, ERROR_LEGEND } from '@/lib/ai-evaluation-content'

export function ErrorsCaught() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Что AI ловит за вас ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Подсветит ошибки, которые легко допустить вручную
        </h2>
        <p className="mt-5 flex max-w-2xl items-start gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{ERROR_LEGEND}</span>
        </p>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ERROR_STAGES.map((stage) => (
            <div
              key={stage.stage}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                {stage.stage}
              </h3>
              <ul className="mt-5 space-y-4">
                {[...stage.items]
                  .sort((a, b) => b.pct - a.pct)
                  .map((item) => (
                  <li key={item.text}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm leading-snug text-foreground">
                        {item.text}
                      </span>
                      <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-accent">
                        {item.pct}%
                      </span>
                    </div>
                    <div
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                      role="presentation"
                    >
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
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
