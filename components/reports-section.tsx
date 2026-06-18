'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { REPORTS_ORDER, REPORTS } from '@/lib/reports'

export function ReportsSection() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="reports" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="reveal">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            [ Исследования ]
          </span>
          <h2 className="mt-3 text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
            Открытые исследования рынка
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {REPORTS_ORDER.map((slug) => {
              const report = REPORTS[slug]
              if (!report) return null
              const label = report.access === 'open' ? 'Открыть' : 'Запросить'
              return (
                <Link
                  key={slug}
                  href={`/research/${slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="mb-4 min-h-[4rem] whitespace-pre-line font-heading text-lg font-bold uppercase leading-tight tracking-tight text-primary">
                    {report.cardTitle}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    {label}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
