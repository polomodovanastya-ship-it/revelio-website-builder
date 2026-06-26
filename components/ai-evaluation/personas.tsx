'use client'

import { Quote } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { PERSONAS, WHY_ELSE } from '@/lib/ai-evaluation-content'

export function Personas() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Кому полезно ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Тем, кому нужна оценка — без недель ожидания
        </h2>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PERSONAS.map((p) => (
            <figure
              key={p.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_-24px_rgba(20,37,80,0.30)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold tracking-[0.06em] text-primary-foreground">
                  {p.initials}
                </span>
                <div>
                  <div className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                    {p.name}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    {p.role}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm font-medium text-foreground">{p.need}</p>

              <blockquote className="mt-4 border-l-2 border-accent/50 pl-4 sm:mt-auto sm:pt-4">
                <Quote className="mb-1.5 h-4 w-4 text-accent/60" aria-hidden />
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  {p.quote}
                </p>
              </blockquote>
            </figure>
          ))}
        </div>

        {/* why else */}
        <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-7 sm:p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Зачем ещё использовать
          </div>
          <ol className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {WHY_ELSE.map((w, i) => (
              <li key={w} className="flex gap-3">
                <span className="font-mono text-sm font-medium tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-relaxed text-foreground">{w}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
