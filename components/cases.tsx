'use client'

import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const CASES = [
  {
    emoji: '✈️',
    tag: 'B2B Travel Tech',
    title: 'Портал «Командировки» для Банка ТОП-10 РФ',
    desc: 'Разработка в интеграции с процессингом TuTu.ru, ЭДО, контакт-центром и отельными API.',
  },
  {
    emoji: '🔁',
    tag: 'CDP / Loyalty',
    title: 'Внедрение CDP на 1M MAU',
    desc: 'Интеграция 7 систем с CDP, трансформация маркетинговых процессов, реализация базовых механик.',
  },
  {
    emoji: '🎮',
    tag: 'Product Design',
    title: 'Gaming App для Alfa Gen',
    desc: 'Проектирование игрового приложения для поколений 8–16 лет в интеграции с лояльностью.',
  },
  {
    emoji: '💬',
    tag: 'CX Consulting',
    title: 'Трансформация контакт-центра в omni CX',
    desc: 'Описание БП контакт-центра для ТОП-5 food-retail, проектирование целевого решения.',
  },
  {
    emoji: '🧩',
    tag: 'HR Tech',
    title: 'ЛК Кандидата и автоматизация найма',
    desc: 'Внешняя и авторизованная зона в интеграции с ATS. Унификация НСИ, дедупликация записей.',
  },
  {
    emoji: '🛟',
    tag: 'ITSM',
    title: 'L1, L2 процессы поддержки сотрудников',
    desc: 'Процессы обслуживания для 50+ ЮЛ крупной добывающей компании РФ.',
  },
  {
    emoji: '📞',
    tag: 'WFM',
    title: 'WFM-система на 300 операторов КЦ',
    desc: 'Перевод КЦ телеком-оператора с калькулятора Эрланга на WFM → экономия 20+ FTE.',
  },
  {
    emoji: '📊',
    tag: 'Data / BI',
    title: 'КХД, НСИ и единая BI-система',
    desc: 'КХД на 3 слоя, ETL и глоссарий, BI для B2C+B2B: продажи, маркетинг, операции.',
  },
  {
    emoji: '🛡️',
    tag: 'FinTech / ML',
    title: 'Скоринговые модели и антифрод',
    desc: 'Модели кредитного скоринга и антифрод-правила для финтеха с 2M+ клиентов.',
  },
]

export function Cases() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="cases" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ Кейсы ]
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Решения, доведённые до прода
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Банки, ритейл, финтех, телеком и промышленность — от стратегии до
            работающего результата.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {CASES.map((c) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden bg-card p-6 transition-colors duration-300 hover:bg-secondary"
            >
              {/* top accent bar */}
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  <span className="text-base leading-none">{c.emoji}</span>
                  {c.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <h3 className="relative mt-4 font-heading text-base font-semibold uppercase leading-snug tracking-tight text-primary">
                {c.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
