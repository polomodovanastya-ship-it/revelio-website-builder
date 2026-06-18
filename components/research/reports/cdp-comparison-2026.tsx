'use client'

import { useState } from 'react'
import { Flame } from 'lucide-react'
import { InfoCard, StatRow, ParticipantChip, ReportCTA } from '../report-primitives'
import { ReportRadar } from '../report-radar'

const INDUSTRIES = [
  'eCom', 'Ритейл', 'HoReCa', 'Спорт-менеджмент',
  'Стриминги', 'Банки', 'Страхование', 'Фитнес',
  'Брокеры', 'АЗС-сети', 'Gaming-tech', 'Travel B2C',
]

const QUESTIONS = [
  'Когда выбирать blacko или onprem?',
  'Почему лояльность для анонимных чеков – база?',
  'Сколько нужно vCPU, vRAM, vHDD для onprem?',
  'Какой продукт выбрать если у меня 1 млн, до 3 млн или 10+ млн MAU?',
  'Какие фичи помогут нарастить регулярную выручку с клиента? (ARPU)',
  'Можно внедрить самостоятельно? А когда с интегратором?',
  'У кого меньше ограничений в конструкторе механик?',
  'Я открою ПО и настрою активацию за 30 минут?',
  'и другие секретные знания :)',
]

const VENDORS = [
  'manzana group', 'Rubbles', 'Loymax', 'rightway',
  'retail rocket', 'altcraft', 'KONNEKTU', 'mindbox',
  'SetLoyalty', 'REES46', 'maxma', 'HFLabs',
]

const RADAR_AXES = [
  'Уровень зрелости продукта',
  'Свобода кастомизации',
  'Вовлеченность и готовность инвестировать в диалог',
  'Скорость запуска',
]

const RADAR_SERIES = [
  { name: 'Rubbles', color: '#C0392B', values: [8.5, 9, 7.5, 4] },
  { name: 'Accelera', color: '#2E8B57', values: [7, 8, 6, 5.5] },
  { name: 'Loymax', color: '#3B82F6', values: [6, 5.5, 6.5, 9] },
]

type RecCategory = 'ФИЧИ' | 'ДЕНЬГИ' | 'ВНЕДРЕНИЕ' | 'АРХИТЕКТУРА' | 'КОМАНДА'

const RECOMMENDATIONS: { category: RecCategory; title: string; text: string }[] = [
  { category: 'ФИЧИ', title: 'Для опросов клиентов – отдельный продукт', text: 'У большинства – слабый модуль опросов, если нужно функциональное – взять CarrotQuest или Oprosso' },
  { category: 'ДЕНЬГИ', title: '40+ млн руб – минимум за внедрение onprem', text: 'Onprem внедрение дороже cloud-a, и внедрение 2–4 модулей на 1-4M MAU в TCO на 3 года = 55-120 млн ₽' },
  { category: 'ВНЕДРЕНИЕ', title: 'Кассы, рассылки и МП – основные точки отказа', text: 'Проектирование игрового приложения для поколений 8–16 лет в интеграции с механиками программы лояльности' },
  { category: 'ФИЧИ', title: 'Если PROD DB уже 5+ ТВ не забудьте о…', text: '… архивирование, партиционирование, запись инкрементами в DWH и шлюз для стабильности сервисов лояльности' },
  { category: 'ДЕНЬГИ', title: 'Не переключайтесь "рубильником"', text: 'Паралелльная работа 2 процессингов лояльности сложнее, но безопаснее. Или имейте план отката :)' },
  { category: 'ВНЕДРЕНИЕ', title: 'Appmetrica по МП → в CDP это триггеры для ++ к ARPU', text: 'Данные о визитах и просмотрах 2/3 успеха в триггерных кампаниях на онбординг, отток и удержание' },
  { category: 'АРХИТЕКТУРА', title: 'Без "виртуальной кассы" как без рук', text: 'Моделирование акций в Excel это 3-5 дней к принятию решения о запуске. Считайте экономику прямо в CDP' },
  { category: 'КОМАНДА', title: 'Пополнение профиля клиента атрибутами', text: 'Система тегов у Retail Rocket – одна из лучших для триггерных подходов в кампаниях' },
  { category: 'ВНЕДРЕНИЕ', title: 'Культура оценки разработки', text: 'Разработка моделей кредитного скоринга и антифрод-правил для финтех-сервиса с 2М+ активных клиентов' },
  { category: 'ФИЧИ', title: 'Что такое нормальная скорость запуска акций?', text: '… архивирование, партиционирование, запись инкрементами в DWH и шлюз для стабильности сервисов лояльности' },
  { category: 'ДЕНЬГИ', title: 'Расчеты финансов и согласование акций', text: 'Не в CDP и не в Loyalty – аппрувы это отдельный бизнес-процесс – не про календарь промо' },
  { category: 'ВНЕДРЕНИЕ', title: 'Конфликт ценообразования и лояльности', text: 'То, за что увольняют Head of Loyalty. Поэтому не забудьте интегрировать макс. глубину дисконта из прайсинга' },
  { category: 'АРХИТЕКТУРА', title: 'Крутость, но боль зоопарка продуктов', text: '…' },
  { category: 'КОМАНДА', title: 'Ограничения моно-вендора', text: '…' },
  { category: 'ВНЕДРЕНИЕ', title: 'Измеряйте внедрение в бизнес-драйверах', text: 'Если не описать кол-во "чего" для каждой сущности: акция, кампания, интеграция – внедрение обойдется х3-5 раз дороже' },
  { category: 'ФИЧИ', title: 'Избыток акций → отток', text: '… архивирование, партиционирование, запись инкрементами в DWH и шлюз для стабильности сервисов лояльности' },
  { category: 'ДЕНЬГИ', title: 'Отзывы за баллы – источник (VoC) получше Nielsen', text: 'Не в CDP и не в Loyalty – аппрувы это отдельный бизнес-процесс – не про календарь промо' },
  { category: 'ВНЕДРЕНИЕ', title: 'Не используйте встроенный контакт-центр', text: '"Родной" Service Desk в CDP часто медленный и не удобный. Лучше интегр-ть 5-6 сервисов в сторонний' },
  { category: 'АРХИТЕКТУРА', title: 'Обращайте внимание "откуда" вырос продукт', text: 'Из "BPM-решения", из мини-сервиса опросов, копия SAS, копия Exponea, нацелен изначально на СМБ и т.д.' },
  { category: 'КОМАНДА', title: '?', text: '…' },
  { category: 'ВНЕДРЕНИЕ', title: '?', text: '?' },
]

const VENDOR_PROFILES = [
  {
    name: 'Rubbles',
    score: 289,
    prosCol1: ['Каждое внедрение – глубоко\nкастомизированный форк', 'Быстрая обработка данных !*\nв Real Time (до 0.5 мс)'],
    prosCol2: ['Выдается доступ к базе\nи настройкам', 'Возможность построения\nсегментов на Greenplum КХД'],
    cons: ['Внедрения могут идти 1,5–2 года\nс постоянной борьбой с ошибками', 'Нестабильность компании (вендора)\nи команды в 24–26 годах'],
  },
  {
    name: 'Retail Rocket',
    score: 331,
    prosCol1: ['super friendly UX – 30 мин\nи создаешь реальные механики', 'Быстрая обработка данных\nв Real Time (до 0.5 мс)'],
    prosCol2: ['Уникальные фичи: теги, анонимные\nчеки, несуммирование акций', '?'],
    cons: ['?', '?'],
  },
  {
    name: 'RightWay',
    score: 237,
    prosCol1: ['?', '?'],
    prosCol2: ['?', '?'],
    cons: ['?', '?'],
  },
]

export function CdpComparison2026Body() {
  const [filter, setFilter] = useState<RecCategory | 'ВСЕ'>('ВСЕ')
  const filtered = filter === 'ВСЕ' ? RECOMMENDATIONS : RECOMMENDATIONS.filter((r) => r.category === filter)

  return (
    <>
      <div className="mb-12">
        <span className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Закрытое исследование · по запросу ]
        </span>
        <h1 className="mb-8 text-balance font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
          Как выбрать CDP / Loyalty / Comms платформу в 2026?
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-foreground">
          Дать бизнесу инструмент для анализа и выбора единой платформы для управления клиентскими данными (CDP),
          омниканальных кампаний, лояльностью и промо с персонализацией.
        </p>
      </div>

      <div className="mb-12 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <InfoCard icon={Flame} title="Для кого будет полезно?">
          CMO, Руководителю CRM-маркетинга или программы лояльности, CIO и Project / Product Manager-у
        </InfoCard>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((label) => (
            <span key={label} className="rounded-full border border-border bg-secondary px-4 py-2 text-sm">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-12 grid gap-x-8 gap-y-6 md:grid-cols-3">
        {QUESTIONS.map((q) => (
          <p key={q} className="text-sm italic leading-snug text-muted-foreground md:text-base">
            {q}
          </p>
        ))}
      </div>

      <section className="mb-16">
        <div className="mb-10 rounded-2xl border border-border bg-card p-8 md:p-10">
          <div className="mb-8">
            <StatRow items={['12 вендоров', '150+ критериев']} />
          </div>
          <p className="mb-8 text-lg font-semibold text-primary">Блок-факторы и желательные фичи</p>
          <div className="mb-8">
            <p className="mb-3 text-lg font-semibold text-primary">15 модулей:</p>
            <p className="text-sm leading-snug text-muted-foreground md:text-base">
              (1) Финансы и устойчивость, (2) Golden ID, MDM и профили,
              <br />
              (3) Сегментация, (4) Loyalty, (5) Campaign, (6) Опросы,
              <br />
              (7) Интеграции, (8) Контакт-центр, (9) ML и рекомендации,
              <br />
              (10) Аналитика и отчеты, (11) Архитектура,
              <br />
              (12) Администрирование, (13) Безопасность,
              <br />
              (14) Поддержка и развитие,
              <br />
              (15) Команда / Свобода изменений
            </p>
          </div>
          <p className="mb-6 text-lg font-semibold text-primary">Live-демо по запросу</p>
          <p className="text-lg font-semibold text-primary">Подтверждение через документацию</p>
        </div>
        <p className="mb-8 text-center font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Изучение исследования займет от 10 до 15 минут
        </p>
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
          <div className="md:w-1/3">
            <h3 className="font-heading text-lg font-bold leading-snug text-primary md:text-xl">
              Методология и
              <br />
              список критериев
            </h3>
          </div>
          <p className="text-sm leading-snug text-muted-foreground md:flex-1 md:text-base">
            150+ критериев и балльная система.
            <br />
            Можно дополнить своими или использовать "как есть"
          </p>
          <ReportCTA access="gated" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
          Участники
          <br />
          исследования
        </h2>
        <div className="mb-14 flex flex-wrap gap-3">
          {VENDORS.map((v) => (
            <ParticipantChip key={v} name={v} />
          ))}
        </div>
        <div className="mb-12 grid grid-cols-2 gap-8">
          <div>
            <p className="mb-2 font-mono text-sm font-semibold uppercase text-muted-foreground">минимальный балл</p>
            <div className="font-heading text-8xl font-extrabold leading-none tracking-tight text-primary">237</div>
          </div>
          <div className="text-right">
            <p className="mb-2 font-mono text-sm font-semibold uppercase text-muted-foreground">максимальный балл</p>
            <div className="font-heading text-8xl font-extrabold leading-none tracking-tight text-primary">331</div>
          </div>
        </div>
        <p className="text-center font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Разделим вендоров на 2 большие категории:
        </p>
      </section>

      <section className="mb-16 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-6">
            <span className="block font-heading text-2xl font-bold leading-tight text-primary md:text-3xl">Onprem:</span>
            <span className="mt-1 block font-heading text-xl font-medium leading-tight text-primary md:text-2xl">
              для enterprise и крупного бизнеса
            </span>
          </h3>
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
            <ReportRadar axes={RADAR_AXES} series={RADAR_SERIES} max={10} />
            <div className="mt-4 flex flex-wrap gap-2">
              {RADAR_SERIES.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-6">
            <span className="block font-heading text-2xl font-bold leading-tight text-primary md:text-3xl">Cloud-first:</span>
            <span className="mt-1 block font-heading text-xl font-medium leading-tight text-primary md:text-2xl">
              для среднего и крупного бизнеса
            </span>
          </h3>
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
            <ReportRadar axes={RADAR_AXES} series={RADAR_SERIES} max={10} />
            <div className="mt-4 flex flex-wrap gap-2">
              {RADAR_SERIES.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-5 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Рекомендации от лидеров
        </h2>
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('ВСЕ')}
            className="rounded-md bg-primary px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 md:text-sm"
            style={{ opacity: filter === 'ВСЕ' ? 1 : 0.85 }}
          >
            ВСЕ РЕКОМЕНДАЦИИ
          </button>
          {(['ФИЧИ', 'ДЕНЬГИ', 'ВНЕДРЕНИЕ', 'АРХИТЕКТУРА', 'КОМАНДА'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="rounded-md border border-border bg-secondary px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent md:text-sm"
              style={{ opacity: filter === cat || filter === 'ВСЕ' ? 1 : 0.55 }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((r, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <span className="mb-4 inline-block rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground">
                {r.category}
              </span>
              <h3 className="mb-3 text-base font-bold leading-snug text-primary md:text-lg">{r.title}</h3>
              <p className="text-sm leading-snug text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 space-y-16">
        {VENDOR_PROFILES.map((v) => (
          <div key={v.name}>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-heading text-4xl font-extrabold leading-none tracking-tight text-primary md:text-5xl">
                {v.name}
              </h2>
              <span className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-1.5 font-heading text-xl font-extrabold italic text-accent-foreground">
                {v.score}
              </span>
            </div>
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
              <div>
                <span className="mb-6 block select-none font-heading text-7xl font-extrabold leading-none text-primary">+</span>
                <div className="space-y-6">
                  {v.prosCol1.map((p, i) => (
                    <p key={i} className="whitespace-pre-line text-sm leading-snug text-foreground md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-6" style={{ height: '72px' }} />
                <div className="space-y-6">
                  {v.prosCol2.map((p, i) => (
                    <p key={i} className="whitespace-pre-line text-sm leading-snug text-foreground md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-6 mt-7 inline-block h-3.5 w-20 rounded-sm bg-accent" />
                <div className="space-y-6">
                  {v.cons.map((c, i) => (
                    <p key={i} className="whitespace-pre-line text-sm leading-snug text-foreground md:text-base">
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
