'use client'

import { ArrowRight, Send } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { asset } from '@/lib/asset'
import { NAV } from '@/lib/nav'
import { PHONE, TELEGRAM_URL, TELEGRAM_HANDLE, EMAIL, HOURS } from '@/lib/contacts'

export function SiteFooter() {
  // Suppress the AI-estimate promo strip on the AI-evaluation landing itself —
  // the whole page is about AI-оценка and already ends with its own CTA.
  const pathname = usePathname()
  const showEstimateStrip = pathname !== '/ai-evaluation'
  return (
    <footer className="bg-background">
      {/* AI estimate strip */}
      {showEstimateStrip && (
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">🤖</span>
            <span className="font-heading text-lg font-bold uppercase tracking-tight text-primary sm:text-2xl">
              AI-оценка как сервис
            </span>
          </div>
          <Link
            href="/ai-evaluation"
            className="flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
          >
            Тестировать в 1 клик
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      )}

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src={asset('/logo-dark.svg')} alt="Ревелио" className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Внедряем новую экспертизу в бизнес: консалтинг, разработка и
              трансформация процессов для среднего и крупного бизнеса.
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Навигация
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Контакты
            </div>
            <a
              href={`tel:${PHONE.replace(/-/g, '')}`}
              className="mt-4 block font-heading text-xl font-bold tracking-tight text-primary transition-colors hover:text-accent"
            >
              {PHONE}
            </a>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {HOURS}
            </p>
            <div className="mt-3 flex flex-col items-start gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <Send className="h-4 w-4" />
                {TELEGRAM_HANDLE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-foreground transition-colors hover:text-accent"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, ООО «Ревелио» · ИНН 9714091225</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal" className="transition-colors hover:text-foreground">
              Реквизиты организации
            </Link>
            <a
              href="https://revelio.tech/legal/revelio_tech_policy_pd.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Политика обработки персональных данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
