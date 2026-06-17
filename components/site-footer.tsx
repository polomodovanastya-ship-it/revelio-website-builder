'use client'

import { ArrowRight, Send } from 'lucide-react'

export function SiteFooter({ onEstimate }: { onEstimate: () => void }) {
  return (
    <footer className="bg-background">
      {/* AI estimate strip */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">🤖</span>
            <span className="font-heading text-lg font-bold uppercase tracking-tight text-primary sm:text-2xl">
              AI-оценка как сервис
            </span>
          </div>
          <button
            onClick={onEstimate}
            className="flex items-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
          >
            Тестировать в 1 клик
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src="/logo-dark.svg" alt="Ревелио" className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Внедряем новую экспертизу в бизнес: консалтинг, разработка и
              трансформация процессов для крупного B2B.
            </p>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Навигация
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { l: 'Услуги', h: '#services' },
                { l: 'Кейсы', h: '#cases' },
                { l: 'Процесс', h: '#process' },
                { l: 'Контакты', h: '#contact' },
              ].map((i) => (
                <li key={i.h}>
                  <a
                    href={i.h}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {i.l}
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
              href="tel:+79935909260"
              className="mt-4 block font-heading text-xl font-bold tracking-tight text-primary transition-colors hover:text-accent"
            >
              +7-993-590-9260
            </a>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Ежедневно с 10:00 до 20:00
            </p>
            <div className="mt-3 flex flex-col items-start gap-3">
              <a
                href="https://t.me/reveliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <Send className="h-4 w-4" />
                @reveliotech
              </a>
              <a
                href="mailto:welcome@revelio.tech"
                className="text-sm text-foreground transition-colors hover:text-accent"
              >
                welcome@revelio.tech
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, ООО «Ревелио» · ИНН 9714091225</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-foreground">
              Реквизиты организации
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Политика обработки персональных данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
