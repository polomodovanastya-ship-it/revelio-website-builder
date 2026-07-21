'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Item = { src: string; alt: string }

const AUTOPLAY_INTERVAL_MS = 5000

export function DocumentsGallery({ items }: { items: Item[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = items.length
  const go = (n: number) => setI((n + total) % total)

  useEffect(() => {
    if (total <= 1 || paused) return
    const id = setInterval(() => go(i + 1), AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(id)
  }, [i, total, paused])

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {items.map((it, idx) => (
            <div key={it.src} className="relative w-full shrink-0">
              <Image
                src={`https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${it.src}`}
                alt={it.alt}
                width={1600}
                height={900}
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(i - 1)}
          aria-label="Предыдущее изображение"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-primary shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent sm:left-5 sm:p-3"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(i + 1)}
          aria-label="Следующее изображение"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-primary shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent sm:right-5 sm:p-3"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((it, idx) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Перейти к слайду ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? 'w-8 bg-accent' : 'w-4 bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
