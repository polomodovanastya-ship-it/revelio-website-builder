'use client'

import { ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const PRODUCTS = [
  {
    id: 'evaluate-tech',
    brandPlain: 'evaluate',
    brandAccent: 'TECH',
    title: 'Ускорение квартального и годового бюджетирования',
    tags: [
      { label: 'Трудоёмкость задач' },
      { label: 'Сроки' },
      { label: 'ФОТ' },
      { label: 'CAPEX' },
      { label: 'OPEX' },
      { label: 'Инвест-заявки' },
      { label: 'Установка на сервере заказчика', highlight: true },
    ],
    savingLabel: 'Экономия',
    savingValue: 'до 15 млн ₽ / год',
    savingNote: 'на каждые 100 чел. в штате',
    cta: 'Запросить демо',
    href: 'https://revelio.tech/#contacts',
    featured: false,
  },
  {
    id: 'enter-fbs',
    brandPlain: 'enter',
    brandAccent: 'FBS',
    marketplaces: [
      { name: 'Wildberries', src: `${ASSET_HOST}${wbLogo.url}` },
      { name: 'OZON', src: `${ASSET_HOST}${ozonLogo.url}` },
    ],
    title: 'Автоматизация отгрузок по FBS для селлеров',
    tags: [
      { label: 'Маршрутизация отгрузок' },
      { label: 'Фулфилменты по API' },
      { label: 'Интеграция с 1С и WMS' },
      { label: 'Облако или сервер заказчика', highlight: true },
    ],
    savingLabel: 'Экономия',
    savingValue: '~5,1 млн ₽ / год',
    savingNote: 'при 5 000 заказов / день',
    cta: 'Подробнее',
    href: 'https://fbs.revelio.tech/',
    featured: true,
  },
]

export function Products() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="products" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Продукты ]
        </span>

        <div ref={ref} className="reveal mt-6 flex flex-col gap-5">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className={`grid grid-cols-1 gap-8 rounded-2xl border bg-card p-7 sm:p-9 lg:grid-cols-[1.6fr_1fr] ${
                p.featured ? 'border-accent' : 'border-border'
              }`}
            >
              <div className="lg:pr-8">
                <div className="flex items-center gap-3">
                  <div className="font-heading text-2xl font-extrabold tracking-tight text-primary">
                    {p.brandPlain}
                    <span className="font-organical text-[1.6em] leading-none text-accent">{p.brandAccent}</span>
                  </div>
                  {p.marketplaces && (
                    <div className="flex items-center gap-4 border-l border-border pl-3">
                      {p.marketplaces.map((m) => (
                        <img
                          key={m.name}
                          src={m.src}
                          alt={`${m.name} logo`}
                          className="h-4 w-auto object-contain sm:h-5"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="mt-4 max-w-xl text-balance font-heading text-xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-2xl">
                  {p.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                        t.highlight
                          ? 'bg-accent text-accent-foreground'
                          : 'border border-border bg-background text-muted-foreground'
                      }`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 lg:border-l lg:border-border lg:pl-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                    {p.savingLabel}
                  </span>
                  <div className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                    {p.savingValue}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.savingNote}</p>
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
