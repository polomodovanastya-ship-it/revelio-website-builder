'use client'

import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '@/hooks/use-reveal'

const SERVICES = [
  {
    emoji: '🔥',
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
    emoji: '🔍',
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
    emoji: '📦',
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

export function Services() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="services" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ Услуги ]
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Три формата работы
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Подберём формат под задачу: от второго мнения до полной команды
            разработки
          </p>
        </div>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                s.featured
                  ? 'border-transparent bg-primary text-primary-foreground shadow-[0_18px_44px_-20px_rgba(20,37,80,0.45)]'
                  : 'border-border bg-card hover:border-primary/25 hover:shadow-[0_18px_44px_-22px_rgba(20,37,80,0.30)]'
              }`}
            >
              {s.name === 'Консалтинг' && (
                <Link
                  href="/consulting"
                  className="absolute inset-0 z-0"
                  aria-label="Консалтинг"
                />
              )}
              <div className="relative flex items-center gap-3">
                <span className="text-2xl leading-none">{s.emoji}</span>
                {s.name === 'Консалтинг' ? (
                  <Link
                    href="/consulting"
                    className={`whitespace-nowrap font-heading text-base font-bold uppercase tracking-tight transition-colors hover:text-accent ${
                      s.featured ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  >
                    {s.name}
                  </Link>
                ) : (
                  <h3
                    className={`whitespace-nowrap font-heading text-base font-bold uppercase tracking-tight ${
                      s.featured ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  >
                    {s.name}
                  </h3>
                )}
              </div>

              <div className="relative mt-5 flex flex-col gap-1">
                {s.name === 'Консалтинг' ? (
                  <Link
                    href="/consulting#formats"
                    className={`whitespace-nowrap font-heading text-2xl font-bold leading-none tracking-tight transition-colors hover:text-accent ${
                      s.featured ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  >
                    {s.price}
                  </Link>
                ) : (
                  <span
                    className={`whitespace-nowrap font-heading text-2xl font-bold leading-none tracking-tight ${
                      s.featured ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  >
                    {s.price}
                  </span>
                )}
                <span
                  className={`whitespace-nowrap font-mono text-xs ${
                    s.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {s.unit}
                </span>
              </div>

              {s.name === 'Консалтинг' ? (
                <Link
                  href="/consulting#artifacts"
                  className={`relative z-10 mt-4 block text-sm leading-relaxed transition-colors hover:text-accent ${
                    s.featured ? 'text-primary-foreground/85' : 'text-muted-foreground'
                  }`}
                >
                  {s.pitch}
                </Link>
              ) : (
                <p
                  className={`relative z-10 mt-4 text-sm leading-relaxed ${
                    s.featured ? 'text-primary-foreground/85' : 'text-muted-foreground'
                  }`}
                >
                  {s.pitch}
                </p>
              )}

              <ul className="relative z-10 mt-6 space-y-3">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className={`flex gap-3 text-sm ${
                      s.featured ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        s.featured ? 'text-accent-foreground' : 'text-accent'
                      }`}
                    />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-6 mb-7 flex flex-wrap gap-1.5">
                {s.meta.split('·').map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
                      s.featured
                        ? 'bg-white/10 text-primary-foreground/80'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className={`relative z-10 mt-auto flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                  s.featured
                    ? 'bg-accent text-accent-foreground hover:brightness-110'
                    : 'border border-border bg-secondary text-primary hover:border-primary/30 hover:bg-muted hover:text-accent'
                }`}
              >
                {s.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* AI estimate as a service banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-card p-7 sm:flex-row sm:items-center">
          <div className="relative flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                AI-оценка как сервис
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Методология 15 лет ИТ-проектов в AI-агенте для быстрой оценки
                инициатив разработки.
              </p>
            </div>
          </div>
          <Link
            href="/ai-evaluation"
            className="relative flex shrink-0 items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
          >
            Тестировать в 1 клик
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
