'use client'

import Link from 'next/link'
import { ArrowUpRight, Download } from 'lucide-react'
import type { MediaItem } from '@/lib/media'

export function MediaCard({ item }: { item: MediaItem }) {
  const external = /^https?:\/\//.test(item.primaryHref)
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          <span className="text-base leading-none">{item.emoji}</span>
          {item.tag}
        </span>
        {item.date && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {item.date}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-heading text-base font-semibold uppercase leading-snug tracking-tight text-primary">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

      {item.kind === 'podcast' && item.platforms && item.platforms.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-1.5">
            {item.platforms.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {external ? (
          <a
            href={item.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
          >
            {item.primaryLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link
            href={item.primaryHref}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
          >
            {item.primaryLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
        {item.downloadHref && (
          <a
            href={item.downloadHref}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary/30 hover:bg-muted hover:text-accent"
          >
            <Download className="h-3.5 w-3.5" />
            Скачать
          </a>
        )}
      </div>
    </article>
  )
}
