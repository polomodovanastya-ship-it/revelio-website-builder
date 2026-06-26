'use client'

import { ChevronDown } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { ARTIFACTS, type ArtifactGroup } from '@/lib/consulting-content'

function priceLabel(price: string) {
  return /^\d/.test(price) ? `${price} ₽` : price
}

function fromPrice(group: ArtifactGroup) {
  const nums = group.items
    .map((a) => Number(a.price.replace(/\s/g, '')))
    .filter((n) => !Number.isNaN(n) && n > 0)
  if (!nums.length) return null
  return Math.min(...nums).toLocaleString('ru-RU')
}

function Group({ group, defaultOpen }: { group: ArtifactGroup; defaultOpen?: boolean }) {
  const from = fromPrice(group)
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-2xl border border-border bg-card"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-base font-bold uppercase tracking-tight text-primary">
            {group.group}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {group.items.length} артефактов{from ? ` · от ${from} ₽` : ''}
          </span>
        </div>
        <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
      </summary>

      <ul className="divide-y divide-border border-t border-border">
        {group.items.map((a) => (
          <li
            key={a.name}
            className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6"
          >
            <div className="min-w-0">
              <div className="text-sm leading-snug text-foreground">{a.name}</div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                {a.result} · {a.unit}
              </div>
            </div>
            <div className="shrink-0 whitespace-nowrap pt-0.5 text-right font-mono text-sm tabular-nums text-primary">
              {priceLabel(a.price)}
            </div>
          </li>
        ))}
      </ul>
    </details>
  )
}

export function ArtifactsTable() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ A-la-carte ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Если нужно больше, чем базовый аудит
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Любой артефакт можно заказать отдельно — от схемы процесса до целевой
          архитектуры решения. Цены ориентировочные, финальные — под задачу.
        </p>

        <div ref={ref} className="reveal mt-12 space-y-4">
          {ARTIFACTS.map((g, i) => (
            <Group key={g.group} group={g} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
