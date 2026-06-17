'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Процесс', href: '#process' },
  { label: 'Контакты', href: '#contact' },
]

export function SiteHeader({ onEstimate }: { onEstimate: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setIsDark(next)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-primary">
            Ревелио
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-accent transition-opacity sm:inline">
            tech
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:welcome@revelio.tech"
            className="hidden font-mono text-xs text-muted-foreground transition-colors hover:text-primary lg:inline"
          >
            welcome@revelio.tech
          </a>
          <button
            type="button"
            aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {mounted && isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onEstimate}
            className="relative rounded-sm bg-accent px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-foreground transition-all duration-300 hover:bg-primary"
          >
            Оценить проект
          </button>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border transition-colors hover:border-accent md:hidden"
          >
            <span className="sr-only">Открыть меню</span>
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-primary" />
              <span className="h-px w-4 bg-primary" />
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
                className="py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-primary/90 transition-colors hover:text-accent"
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
