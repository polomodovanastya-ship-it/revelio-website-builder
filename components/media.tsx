'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { MEDIA_ITEMS } from '@/lib/media'
import { MediaCard } from './media-card'
import { MasonryGrid } from '@/components/masonry-grid'

// Rendered column by column in a 3-column grid: item i goes to column i % 3.
const HOME_MEDIA_IDS = [
  'forbes-excel-to-ml',
  'cdp-comparison-2026',
  'podcast-bart',
  'sostav-gamification',
  'incrussia-dynamic-prices',
]

export function Media() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="media" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ Медиа ]
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Журнал
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Публичная экспертиза команды
          </p>
        </div>

        <div ref={ref} className="reveal mt-12">
          <MasonryGrid sequential>
            {HOME_MEDIA_IDS.map((id) => MEDIA_ITEMS.find((item) => item.id === id))
              .filter((item) => item !== undefined)
              .map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
          </MasonryGrid>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/media"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary/30 hover:bg-muted hover:text-accent"
          >
            Все материалы
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
