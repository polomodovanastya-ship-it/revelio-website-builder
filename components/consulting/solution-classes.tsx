'use client'

import { useReveal } from '@/hooks/use-reveal'
import { SOLUTION_CLASSES } from '@/lib/consulting-content'

export function SolutionClasses() {
  const ref = useReveal<HTMLUListElement>()

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Контур консалтинга ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Классы решений, которые покрываем
        </h2>

        <ul ref={ref} className="reveal mt-10 flex flex-wrap gap-2.5">
          {SOLUTION_CLASSES.map((c) => (
            <li
              key={c}
              className="rounded-lg border border-border bg-card px-3.5 py-2 text-sm text-foreground transition-colors hover:border-primary/25 hover:text-accent"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
