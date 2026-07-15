'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { MEDIA_ITEMS } from '@/lib/media'
import { MediaCard } from './media-card'

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
              Исследования, статьи и подкасты
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Публичная экспертиза команды.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {MEDIA_ITEMS.slice(0, 3).map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
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
