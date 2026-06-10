'use client'

import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const CASES = [
  {
    tag: 'B2B Travel Tech',
    title: 'Портал «Командировки» для Банка ТОП-10 РФ',
    desc: 'Разработка в интеграции с процессингом TuTu.ru, ЭДО, контакт-центром и отельными API.',
  },
  {
    tag: 'CDP / Loyalty',
    title: 'Внедрение CDP на 1M MAU',
    desc: 'Интеграция 7 систем с CDP, трансформация маркетинговых процессов, реализация базовых механик.',
  },
  {
    tag: 'Product Design',
    title: 'Gaming App для Alfa Gen',
    desc: 'Проектирование игрового приложения для поколений 8–16 лет в интеграции с лояльностью.',
  },
  {
    tag: 'CX Consulting',
    title: 'Трансформация контакт-центра в omni CX',
    desc: 'Описание БП контакт-центра для ТОП-5 food-retail, проектирование целевого решения.',
  },
  {
    tag: 'HR Tech',
    title: 'ЛК Кандидата и автоматизация найма',
    desc: 'Внешняя и авторизованная зона в интеграции с ATS. Унификация НСИ, дедупликация записей.',
  },
  {
    tag: 'ITSM',
    title: 'L1, L2 процессы поддержки сотрудников',
    desc: 'Процессы обслуживания для 50+ ЮЛ крупной добывающей компании РФ.',
  },
  {
    tag: 'WFM',
    title: 'WFM-система на 300 операторов КЦ',
    desc: 'Перевод КЦ телеком-оператора с калькулятора Эрланга на WFM → экономия 20+ FTE.',
  },
  {
    tag: 'Data / BI',
    title: 'КХД, НСИ и единая BI-система',
    desc: 'КХД на 3 слоя, ETL и глоссарий, BI для B2C+B2B: продажи, маркетинг, операции.',
  },
  {
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
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Кейсы
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-3xl font-medium leading-tight text-foreground sm:text-5xl">
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
          className="reveal mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {CASES.map((c) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden bg-card p-6 transition-colors duration-300 hover:bg-secondary"
            >
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/25"
              />
              {/* top accent bar */}
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-[var(--accent-2)] transition-transform duration-300 group-hover:scale-x-100" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  {c.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="relative mt-4 font-heading text-xl leading-snug text-foreground">
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
