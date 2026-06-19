'use client'
import { useState, useEffect } from 'react'
import { X, Target, BarChart, Bell } from 'lucide-react'

export function EvaluateIntroPopup() {
  const [open, setOpen] = useState(false)

  // Show on every visit, regardless of storage availability (private mode,
  // blocked localStorage, etc.). State is raised in an effect so the static
  // export's server HTML stays stable (no hydration mismatch / no-JS flash).
  useEffect(() => {
    setOpen(true)
  }, [])

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && close()
      document.addEventListener('keydown', onEsc)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', onEsc)
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur" role="dialog" aria-modal="true" onClick={close}>
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-12px_rgba(20,37,80,0.4)]" onClick={e => e.stopPropagation()}>
        <button onClick={close} className="absolute right-4 top-4 rounded-lg p-1 hover:bg-secondary" aria-label="Закрыть">
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">AI-оценка как-сервис</h2>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 shrink-0 text-accent" />
            <div className="text-sm">Разметит скоуп</div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart className="h-5 w-5 shrink-0 text-accent" />
            <div className="text-sm">Оценит в часах</div>
          </div>
          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 shrink-0 text-accent" />
            <div className="text-sm">Подсветит риски</div>
          </div>
        </div>

        <div className="mb-6 space-y-2 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Для кого</span>
            <span className="font-medium">бизнес, ИТ, PMO, Product</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Ситуация</span>
            <span className="font-medium">быстро оценить БТ/ФТ</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Желательно</span>
            <span className="font-medium">загрузить документы</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Погрешность</span>
            <span className="font-medium">от 15 до 30% на тест-сете</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Займёт время</span>
            <span className="font-medium">от 3 до 5 минут</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-muted-foreground">Стоимость</span>
            <span className="font-medium text-accent">бесплатно</span>
          </div>
        </div>

        <div className="mb-6 space-y-1 text-xs text-muted-foreground">
          <div>• обучено на 300+ план-фактах (Jira)</div>
          <div>• основано на PMBoK (PMI)</div>
        </div>

        <button onClick={close} className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90">
          Оценить бесплатно
        </button>
      </div>
    </div>
  )
}
