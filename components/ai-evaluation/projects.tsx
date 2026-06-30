'use client'

import { Ban } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { PROJECTS_BY_INDUSTRY, NOT_FOR } from '@/lib/ai-evaluation-content'

const HEAD = 4

export function Projects() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="sources" className="scroll-mt-24 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Что можно оценивать ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          На этих проектах продукт и обучался
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Реальные проекты по индустриям — чтобы было понятно, какой проект
          продукт сможет оценить.
        </p>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_BY_INDUSTRY.map((group) => {
            const head = group.projects.slice(0, HEAD)
            const tail = group.projects.slice(HEAD)
            return (
              <div
                key={group.industry}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                    {group.industry}
                  </h3>
                  <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">
                    {group.projects.length}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-foreground">
                  {head.map((p) => (
                    <li key={p} className="flex gap-2.5 leading-snug">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                {tail.length > 0 && (
                  <details className="group mt-2.5">
                    <summary className="cursor-pointer list-none font-mono text-[11px] uppercase tracking-[0.1em] text-accent transition-colors hover:text-primary">
                      + ещё {tail.length}
                    </summary>
                    <ul className="mt-2.5 space-y-2.5 text-sm text-foreground">
                      {tail.map((p) => (
                        <li key={p} className="flex gap-2.5 leading-snug">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            )
          })}
        </div>

        {/* not for */}
        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-7 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Ban className="h-4 w-4 text-muted-foreground" />
            Продукт не подходит для
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {NOT_FOR.map((n) => (
              <li
                key={n}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
