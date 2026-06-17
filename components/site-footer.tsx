'use client'

import { ArrowRight } from 'lucide-react'

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
            <span className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-primary">
              Ревелио
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:welcome@revelio.tech"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  welcome@revelio.tech
                </a>
              </li>
              <li>
                <a
                  href="tel:+79935909260"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  +7-993-590-9260
                </a>
              </li>
              <li className="text-muted-foreground">@reveliotech</li>
            </ul>
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
