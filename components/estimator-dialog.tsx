'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function EstimatorDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-4 backdrop-blur" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-12px_rgba(20,37,80,0.4)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-secondary" aria-label="Закрыть">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">[ AI-ОЦЕНКА ]</div>
        <h2 className="mb-4 text-2xl font-bold">AI-оценка проекта</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Разметит скоуп, оценит проект в часах и подсветит риски. Бесплатно, 3-5 минут, погрешность 15-30%.
        </p>

        <div className="space-y-3">
          <Link href="/evaluate" onClick={onClose} className="block w-full rounded-lg bg-accent px-6 py-3 text-center font-medium text-accent-foreground transition-colors hover:bg-accent/90">
            Оценить бесплатно
          </Link>
          <a href="/#contact" onClick={onClose} className="block w-full rounded-lg border border-border bg-secondary px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-secondary/80">
            Обсудить с консультантом
          </a>
        </div>
      </div>
    </div>
  )
}
