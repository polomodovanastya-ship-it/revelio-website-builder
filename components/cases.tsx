'use client'

import { useReveal } from '@/hooks/use-reveal'
import khdNsiBiCover from '@/src/assets/KHD_NSI_BI.png.asset.json'
import komandirovkiCover from '@/src/assets/Komandirovki_illustration.png.asset.json'
import narcelleCover from '@/src/assets/Narcelle_illustration.png.asset.json'

const ASSET_ORIGIN = 'https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app'

const CASES = [
  {
    emoji: '✈️',
    tag: 'B2B Travel Tech',
    title: 'Портал «Командировки» для Банка ТОП-10 РФ',
    desc: 'Разработка в интеграции с процессингом TuTu.ru, ЭДО, контакт-центром и отельными API',
    cover: `${ASSET_ORIGIN}${komandirovkiCover.url}`,
  },
  {
    emoji: '🎮',
    tag: 'Product Design',
    title: 'Gaming App для Alfa Gen',
    desc: 'Проектирование игрового приложения для поколений 8–16 лет в интеграции с лояльностью',
  },
  {
    emoji: '💬',
    tag: 'CX Consulting',
    title: 'Трансформация контакт-центра в omni CX',
    desc: 'Описание БП контакт-центра для ТОП-5 food-retail, проектирование целевого решения',
  },
  {
    emoji: '🧩',
    tag: 'HR Tech',
    title: 'ЛК Кандидата и автоматизация найма',
    desc: 'Внешняя и авторизованная зона в интеграции с ATS. Унификация НСИ, дедупликация записей',
  },
  {
    emoji: '🔁',
    tag: 'Fashion E-com',
    title: 'Консалтинг по запуску программы лояльности и оптимизации UX',
    desc: 'Аудит интерфейса и клиентских путей, проверка бэкенд интеграций с формированием артефакта рекомендаций по доработке UX и внедрению программы лояльности',
    cover: `${ASSET_ORIGIN}${narcelleCover.url}`,
  },
  {
    emoji: '🛟',
    tag: 'ITSM',
    title: 'L1, L2 процессы поддержки сотрудников',
    desc: 'Процессы обслуживания для 50+ ЮЛ крупной добывающей компании РФ',
  },
  {
    emoji: '📞',
    tag: 'WFM',
    title: 'WFM-система на 300 операторов КЦ',
    desc: 'Перевод КЦ телеком-оператора с калькулятора Эрланга на WFM → экономия 20+ FTE',
  },
  {
    emoji: '📊',
    tag: 'Data / BI',
    title: 'КХД, НСИ и единая BI-система',
    desc: 'КХД на 3 слоя, ETL и глоссарий, BI для B2C+B2B: продажи, маркетинг, операции',
  },
  {
    emoji: '🛡️',
    tag: 'FinTech / ML',
    title: 'Скоринговые модели и антифрод',
    desc: 'Модели кредитного скоринга и антифрод-правила для финтеха с 2M+ клиентов',
  },
  {
    emoji: '🤖',
    tag: 'Developer Consulting',
    title: 'Консалтинг AI для застройщика',
    desc: 'Аудит и поиск процессов, подходящих под оптимизацию с помощью AI и ML',
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
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Успешные внедрения
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            От декомпозиции за 2–7 дней до решающего боли пользователей
            продукта за 3–5 месяцев
          </p>
        </div>

        <div
          ref={ref}
          className="reveal mt-12 columns-1 gap-5 md:columns-2 lg:columns-3"
        >
          {CASES.map((c) => (
            <div key={c.title} className="mb-5 break-inside-avoid">
              <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]">
                {c.cover && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-secondary">
                    <img
                      src={c.cover}
                      alt={c.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      <span className="text-base leading-none">{c.emoji}</span>
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold uppercase leading-snug tracking-tight text-primary">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
