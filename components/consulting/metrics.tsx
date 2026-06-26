'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { METRIC_GROUPS } from '@/lib/consulting-content'

export function Metrics() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-b border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Результат ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Какие метрики улучшаем вместе с заказчиками
        </h2>
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ArrowUpRight className="h-4 w-4 text-accent" /> растим
          </span>
          <span className="flex items-center gap-1.5">
            <ArrowDownRight className="h-4 w-4 text-primary" /> сокращаем
          </span>
          <span className="text-muted-foreground/70">— и то, и другое в вашу пользу</span>
        </p>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {METRIC_GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                {g.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-background/50 py-1.5 pl-3 pr-2.5 text-sm text-foreground"
                  >
                    {m.label}
                    {m.dir === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" aria-label="растёт" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 shrink-0 text-primary" aria-label="снижается" />
                    )}
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
