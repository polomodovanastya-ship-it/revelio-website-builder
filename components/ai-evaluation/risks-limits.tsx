'use client'

import { TriangleAlert, Lock } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { RISKS_SAMPLE, LIMITS_SAMPLE } from '@/lib/ai-evaluation-content'

export function RisksLimits() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="risks" className="scroll-mt-24 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Что внутри оценки ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Реестр рисков и ограничений
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Система формирует риски с влиянием на сроки и бюджет, а рядом —
          ограничения скоупа. И оставляет до ~10 ключевых, чтобы оценка читалась.
        </p>

        {/* product-like window */}
        <div
          ref={ref}
          className="reveal mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(20,37,80,0.4)]"
        >
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/70 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              revelio · оценка проекта / реестр
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* risks */}
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                    Риски
                  </h3>
                </div>
                <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {RISKS_SAMPLE.length} из ~10
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {RISKS_SAMPLE.map((r) => (
                  <li
                    key={r.title}
                    className="rounded-xl border border-border border-l-2 border-l-accent/60 bg-background/40 p-3.5"
                  >
                    <div className="text-sm leading-snug text-foreground">{r.title}</div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums text-accent">
                        сроки {r.impactPct}
                      </span>
                      <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums text-accent">
                        бюджет {r.impactMoney}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* limits */}
            <div className="border-t border-border p-6 sm:p-7 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-accent" />
                  <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                    Ограничения
                  </h3>
                </div>
                <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  a-la-carte
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {LIMITS_SAMPLE.map((l, i) => (
                  <li
                    key={l}
                    className="flex items-start gap-3 border-b border-border pb-2.5 text-sm text-foreground last:border-0 last:pb-0"
                  >
                    <span className="mt-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          * Риски оцениваются и выставляются индивидуально под проект — на схеме
          приведён пример.
        </p>
      </div>
    </section>
  )
}
