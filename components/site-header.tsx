'use client'

import { useState, useEffect } from 'react'

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-background/75 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Ревелио
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-primary transition-opacity sm:inline">
            tech
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:welcome@revelio.tech"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline"
          >
            welcome@revelio.tech
          </a>
          <button
            onClick={onEstimate}
            className="shimmer relative overflow-hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_0_oklch(0.64_0.193_293_/_0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_-6px_oklch(0.64_0.193_293_/_0.7)]"
          >
            Оценить проект
          </button>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary md:hidden"
          >
            <span className="sr-only">Открыть меню</span>
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-foreground" />
              <span className="h-px w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-base font-medium text-foreground/90 transition-colors hover:text-primary"
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
