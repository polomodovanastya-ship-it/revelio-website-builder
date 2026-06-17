'use client'

import { useState, useEffect } from 'react'
import { asset } from '@/lib/asset'

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Процесс', href: '#process' },
  { label: 'Контакты', href: '#contact' },
]

export function SiteHeader({ onEstimate }: { onEstimate: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full bg-primary pl-5 pr-2 transition-shadow duration-500 ${
          scrolled
            ? 'shadow-[0_16px_40px_-12px_rgba(20,37,80,0.45)]'
            : 'shadow-[0_10px_30px_-14px_rgba(20,37,80,0.35)]'
        }`}
      >
        <a href="#top" className="flex items-center" aria-label="Ревелио — на главную">
          <img src={asset('/logo.svg')} alt="Ревелио" className="h-6 w-auto sm:h-7" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/65 transition-colors duration-200 hover:bg-white/10 hover:text-primary-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href="mailto:welcome@revelio.tech"
            className="hidden px-2 font-mono text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground lg:inline"
          >
            welcome@revelio.tech
          </a>
          <button
            onClick={onEstimate}
            className="hidden rounded-full bg-accent px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-foreground transition-colors duration-300 hover:brightness-110 sm:inline-block"
          >
            Оценить проект
          </button>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground transition-colors hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Открыть меню</span>
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl bg-primary p-2 shadow-[0_16px_40px_-12px_rgba(20,37,80,0.45)] md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
