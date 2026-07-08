'use client'

import { useState } from 'react'
import { RECOMMENDATIONS, type RecCategory } from '@/lib/cdp-research-data'

const CATEGORIES: RecCategory[] = ['ФИЧИ', 'ДЕНЬГИ', 'ВНЕДРЕНИЕ', 'АРХИТЕКТУРА', 'КОМАНДА']

export function Recommendations() {
  const [filter, setFilter] = useState<RecCategory | 'ВСЕ'>('ВСЕ')
  const filtered =
    filter === 'ВСЕ' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((r) => r.categories.includes(filter))

  return (
    <section className="mb-16">
      <h2 className="mb-5 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Рекомендации от лидеров
      </h2>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('ВСЕ')}
          className="rounded-md bg-primary px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 md:text-sm"
          style={{ opacity: filter === 'ВСЕ' ? 1 : 0.85 }}
        >
          ВСЕ РЕКОМЕНДАЦИИ
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="rounded-md border border-border bg-secondary px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent md:text-sm"
            style={{ opacity: filter === cat || filter === 'ВСЕ' ? 1 : 0.55 }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((r) => (
          <div key={r.title} className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="mb-4 flex flex-wrap gap-1.5">
              {r.categories.map((c) => (
                <span
                  key={c}
                  className="inline-block rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <h3 className="mb-3 text-base font-bold leading-snug text-primary md:text-lg">{r.title}</h3>
            <p className="text-sm leading-snug text-muted-foreground">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
