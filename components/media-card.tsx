'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Download, Play, X } from 'lucide-react'
import type { MediaItem } from '@/lib/media'

export function MediaCard({ item }: { item: MediaItem }) {
  const external = /^https?:\/\//.test(item.primaryHref)
  const isPodcast = item.kind === 'podcast'
  const hasEmbed = isPodcast && !!item.embedHref
  const [playerOpen, setPlayerOpen] = useState(false)

  useEffect(() => {
    if (!playerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlayerOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [playerOpen])

  const primaryClass =
    'inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary'

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]">
      <div className="flex flex-1 flex-col">
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

        {isPodcast && item.platforms && item.platforms.length > 0 && (
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
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {hasEmbed ? (
          <button type="button" onClick={() => setPlayerOpen(true)} className={primaryClass}>
            {item.primaryLabel}
            <Play className="h-3.5 w-3.5" />
          </button>
        ) : external ? (
          <a href={item.primaryHref} target="_blank" rel="noopener noreferrer" className={primaryClass}>
            {item.primaryLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link href={item.primaryHref} className={primaryClass}>
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

      {playerOpen && hasEmbed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.embedTitle ?? item.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPlayerOpen(false)}
        >
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" aria-hidden />
          <div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(20,37,80,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                {item.embedTitle ?? item.title}
              </p>
              <button
                type="button"
                onClick={() => setPlayerOpen(false)}
                aria-label="Закрыть плеер"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={item.embedHref}
                title={item.embedTitle ?? item.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
