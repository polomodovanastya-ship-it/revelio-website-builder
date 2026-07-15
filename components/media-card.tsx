'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Download, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MediaItem } from '@/lib/media'

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function InlineAudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('durationchange', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('durationchange', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      return
    }
    try {
      if (a.readyState < 2) a.load()
      await a.play()
      setPlaying(true)
    } catch (err) {
      console.error('Audio play failed:', err, 'src:', a.currentSrc, 'error:', a.error)
      setPlaying(false)
    }
  }

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current
    if (!a) return
    const val = Number(e.target.value)
    a.currentTime = val
    setCurrent(val)
  }

  const pct = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-3">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Пауза' : 'Слушать'}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-primary"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={onSeek}
          aria-label="Прогресс"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
          style={{
            background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${pct}%, hsl(var(--border)) ${pct}%, hsl(var(--border)) 100%)`,
          }}
        />
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" title={title} />
    </div>
  )
}

export function MediaCard({ item }: { item: MediaItem }) {
  const external = /^https?:\/\//.test(item.primaryHref)
  const isPodcast = item.kind === 'podcast'

  const primaryClass =
    'inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]">
      {item.coverSrc && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-card">
          <div className="absolute inset-x-5 inset-y-0 overflow-hidden rounded-xl bg-secondary">
            <Image
              src={item.coverSrc}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className={cn(isPodcast ? 'object-cover' : 'object-contain')}
            />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col">
          {!isPodcast && (item.logoSrc || item.emoji || item.tag || item.date) && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {item.logoSrc ? (
                  <img
                    src={item.logoSrc}
                    alt=""
                    className="h-6 w-auto max-w-[110px] object-contain"
                  />
                ) : (
                  item.emoji && <span className="text-base leading-none">{item.emoji}</span>
                )}
                {item.tag}
              </span>
              {item.date && (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.date}
                </span>
              )}
            </div>
          )}


          <h3 className="mt-4 font-heading text-base font-semibold uppercase leading-snug tracking-tight text-primary">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

          {isPodcast && item.audioSrc && (
            <InlineAudioPlayer src={item.audioSrc} title={item.title} />
          )}

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
          {!isPodcast && (
            <>
              {external ? (
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
            </>
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
      </div>
    </article>
  )
}
