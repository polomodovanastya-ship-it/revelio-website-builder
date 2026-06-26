'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Target, BarChart, Bell } from 'lucide-react'
import { HERO_SUMMARY, PRODUCT_PROOF } from '@/lib/ai-evaluation-content'

const HIGHLIGHTS = [
  { icon: Target, label: 'Разметит скоуп' },
  { icon: BarChart, label: 'Оценит в часах' },
  { icon: Bell, label: 'Подсветит риски' },
]

/**
 * Intro modal for the /ai-evaluation landing. Auto-opens on mount (moved here
 * from the old /evaluate popup). CTA navigates to the form at /evaluate.
 */
export function LandingIntroModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="AI-оценка как сервис"
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-12px_rgba(20,37,80,0.4)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          [ AI-ОЦЕНКА ]
        </div>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-primary">
          AI-оценка как сервис
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary/60 px-3 py-2.5"
            >
              <Icon className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>

        <dl className="mt-5 space-y-2 text-sm">
          {HERO_SUMMARY.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between gap-4 ${i < HERO_SUMMARY.length - 1 ? 'border-b border-border pb-2' : ''}`}
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd
                className={`text-right font-medium ${row.value === 'бесплатно' ? 'text-accent' : 'text-foreground'}`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
          {PRODUCT_PROOF.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>

        <Link
          href="/evaluate"
          onClick={close}
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
        >
          Перейти к оценке
        </Link>
      </div>
    </div>
  )
}
