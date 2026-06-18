'use client'
import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('revelio_cookie_consent')) {
        const timer = setTimeout(() => setVisible(true), 600)
        return () => clearTimeout(timer)
      }
    } catch {}
  }, [])

  const accept = () => {
    try {
      localStorage.setItem('revelio_cookie_consent', 'accepted')
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      className="fixed bottom-4 right-4 left-4 z-50 sm:left-auto"
    >
      <div className="ml-auto flex w-full items-center gap-3 rounded-2xl border border-border bg-card pl-4 pr-2 py-2 shadow-[0_16px_40px_-12px_rgba(20,37,80,0.45)] sm:w-fit">
        <Cookie className="h-5 w-5 shrink-0 text-accent" />
        <span className="text-sm text-foreground">
          Наш сайт использует cookie –{' '}
          <a
            href="https://revelio.tech/legal/revelio_tech_policy_pd.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            подробнее тут
          </a>
        </span>
        <button
          onClick={accept}
          className="rounded-lg bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground hover:bg-primary"
        >
          Принять
        </button>
      </div>
    </div>
  )
}
