'use client'

import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const SERVICES = [
  {
    name: 'Консалтинг',
    price: 'от 345 000 ₽',
    unit: '/ 1 неделя',
    pitch: 'Редкие эксперты и секретные знания для принятия решений.',
    points: [
      'Анализ процессов, поиск причин потерь',
      'Проектирование изменений: бизнес и ИТ',
      'Внедрение улучшений',
    ],
    meta: 'LTV · TCO · CAC · Утилизация · Отток · Конверсия',
    cta: 'Отправить заявку',
  },
  {
    name: 'Проверка гипотезы',
    price: 'до 650 000 ₽',
    unit: '/ за работающий прототип',
    pitch: 'Тестирование идей — прототип за 1 неделю.',
    points: [
      'Собрать решение руками практиков',
      'Не тратить время на бесплодные эксперименты',
      'Быстрый, измеримый результат',
    ],
    meta: 'AI-агент · Панель отчётов · Консолидатор цен · Оркестратор скидок',
    cta: 'Отправить заявку',
  },
  {
    name: 'Разработка продукта',
    price: 'от 850 000 ₽',
    unit: '/ за команду в месяц',
    pitch: 'Запуск с нуля или доработки: от требований до решения в PROD.',
    points: [
      'Анализ → проектирование → разработка',
      'Тестирование и запуск в прод',
      'Релизы каждые 2 недели',
    ],
    meta: 'eCom · Golden ID · CDP · Loyalty · ERP · DWH · НСИ · HRM',
    cta: 'Оценить стоимость',
    featured: true,
  },
]

export function Services({ onEstimate }: { onEstimate: () => void }) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="services" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Услуги
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-3xl font-medium leading-tight text-foreground sm:text-5xl">
              Три формата работы
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Подберём формат под задачу: от второго мнения до полной команды
            разработки.
          </p>
        </div>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className={`group relative flex flex-col overflow-hidden rounded-xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                s.featured
                  ? 'border-primary/50 bg-primary/[0.07] shadow-[0_20px_60px_-30px_oklch(0.64_0.193_293_/_0.8)]'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              {s.featured && (
                <div
                  aria-hidden
                  className="animate-glow pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
                />
              )}
              <div className="relative flex items-baseline justify-between">
                <h3 className="font-heading text-2xl text-foreground">
                  {s.name}
                </h3>
                {s.featured && (
                  <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground">
                    Хит
                  </span>
                )}
              </div>

              <div className="relative mt-4 flex items-baseline gap-2">
                <span className="font-heading text-3xl text-foreground">
                  {s.price}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {s.unit}
                </span>
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                {s.pitch}
              </p>

              <ul className="relative mt-6 space-y-3 border-t border-border pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>

              <p className="relative mt-6 font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground">
                {s.meta}
              </p>

              <a
                href="#contact"
                className={`shimmer relative mt-7 flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] ${
                  s.featured
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground'
                }`}
              >
                {s.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* AI estimate as a service banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-xl border border-primary/30 bg-card p-7 sm:flex-row sm:items-center">
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -left-10 top-1/2 h-40 w-72 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-foreground">
                AI-оценка как сервис
              </h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                Методология 15 лет ИТ-проектов в AI-агенте для быстрой оценки
                инициатив разработки.
              </p>
            </div>
          </div>
          <button
            onClick={onEstimate}
            className="shimmer relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.04]"
          >
            Тестировать в 1 клик
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
