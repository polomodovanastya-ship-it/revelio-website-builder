'use client'

import { useState } from 'react'
import { Flame, Gem, ClipboardList } from 'lucide-react'
import { InfoCard, StatRow, ParticipantChip, ReportCTA } from '../report-primitives'
import { ReportRadar } from '../report-radar'

const PARTICIPANTS = [
  { name: 'Газпромнефть', color: '#0079C2' },
  { name: 'ЛУКОЙЛ', color: '#E30613' },
  { name: 'Роснефть', color: '#FFCC00' },
  { name: 'ТАТНЕФТЬ', color: '#D40D17' },
  { name: 'ТАИФ-НК', color: '#003E7E' },
  { name: 'Нефтьмагистраль', color: '#C8102E' },
  { name: 'IRBIS', color: '#1A1A1A' },
  { name: 'Трасса', color: '#009639' },
  { name: 'TAMIC', color: '#00529B' },
  { name: 'ОРТК', color: '#1F4E8C' },
  { name: 'General Fueller', color: '#0B1F3A' },
  { name: 'GazOil', color: '#E87722' },
]

const BLOCKS = [
  { code: 'A', weight: 10, title: 'Онбординг и регистрация', note: 'первая воронка' },
  { code: 'B', weight: 19, title: 'Программа лояльности', note: 'основа монетизации' },
  { code: 'C', weight: 14, title: 'Онлайн ↔ офлайн связка', note: 'связка цифры и физической точки' },
  { code: 'D', weight: 7, title: 'Акции и промо', note: 'видимость и применимость' },
  { code: 'E', weight: 5, title: 'Персонализация', note: 'сегменты и оффер' },
  { code: 'F', weight: 14, title: 'Коммуникации и удержание', note: 'онбординг → удержание → возврат' },
  { code: 'G', weight: 6, title: 'Геймификация', note: 'прогресс, челленджи и срочность для вовлечения' },
  { code: 'H', weight: 5, title: 'Техническое качество', note: 'UX и стабильность' },
  { code: 'I', weight: 10, title: 'Магазин и кафе — апселл', note: 'перевод топливного клиента в покупателя ритейла' },
  { code: 'J', weight: 10, title: 'НТУ сквозные механики топливо — нетопливо', note: 'сквозные механики = рост среднего чека' },
]

const RADAR_BRANDS = [
  { key: 'Лукойл', color: '#EE1C25' },
  { key: 'Роснефть', color: '#FFCC00' },
  { key: 'Газпромнефть', color: '#0079C2' },
  { key: 'Нефтьмагистраль', color: '#003D7A' },
  { key: 'Irbis', color: '#00A651' },
  { key: 'General Fueller', color: '#F57C00' },
]

const RADAR_DATA = [
  { Лукойл: 13, Роснефть: 16, Газпромнефть: 17, Нефтьмагистраль: 15, Irbis: 6, 'General Fueller': 16 },
  { Лукойл: 12, Роснефть: 13, Газпромнефть: 15, Нефтьмагистраль: 14, Irbis: 14, 'General Fueller': 16 },
  { Лукойл: 5, Роснефть: 5, Газпромнефть: 8, Нефтьмагистраль: 7, Irbis: 4.5, 'General Fueller': 5.5 },
  { Лукойл: 4, Роснефть: 3.5, Газпромнефть: 7, Нефтьмагистраль: 10, Irbis: 6, 'General Fueller': 4 },
]

const BRAND_SCORES = [
  {
    name: 'Лукойл',
    score: 72.5,
    pros: [
      'Широкое покрытие сети и узнаваемость бренда',
      'Развитая программа «Лукойл-Клуб» с понятной механикой баллов',
      'Зрелое мобильное приложение и оплата с телефона',
    ],
    cons: [
      'Слабая персонализация офферов и сегментация',
      'Ограниченные кросс-категорийные апселлы (кафе/магазин)',
    ],
  },
  {
    name: 'Роснефть',
    score: 73.5,
    pros: [
      'Сильная программа «Семейная команда» с партнёрской экосистемой',
      'Хорошая связка онлайн ↔ офлайн в приложении',
      'Гибкие промо и акции на топливо',
    ],
    cons: [
      'Фрагментированный клиентский опыт между регионами',
      'Коммуникации часто массовые, без триггерной логики',
    ],
  },
  {
    name: 'Нефтьмагистраль',
    score: 84,
    pros: [
      'Лучший в исследовании магазин и кафе — сильный апселл',
      'Понятная и щедрая программа лояльности',
      'Быстрая и удобная цифровая связка с заправкой',
    ],
    cons: [
      'Меньший географический охват по сравнению с лидерами',
      'Меньше партнёрских интеграций вне сети',
    ],
  },
  {
    name: 'Irbis',
    score: 68.5,
    pros: ['Современный UX мобильного приложения', 'Понятный путь клиента онлайн ↔ офлайн'],
    cons: [
      'Слабая программа лояльности — низкий балл по блоку B',
      'Минимальная работа с удержанием и реактивацией',
      'Ограниченная розничная экосистема на станциях',
    ],
  },
  {
    name: 'General Fueller',
    score: 71.5,
    pros: [
      'Сильная связка онлайн ↔ офлайн (16 из 20 баллов)',
      'Хорошо построенная программа лояльности и копилка баллов',
    ],
    cons: [
      'Слабый апселл в магазине и кафе',
      'Коммуникации недостаточно сегментированы по поведению',
    ],
  },
]

export function LoyaltyAzs2026Body() {
  const radarAxes = ['Программа\nлояльности', 'Онлайн ↔ офлайн\nсвязка', 'Коммуникации\nи удержание', 'Магазин и\nкафе → апселл']
  const radarSeries = RADAR_BRANDS.map((b) => ({
    name: b.key,
    color: b.color,
    values: RADAR_DATA.map((row) => row[b.key as keyof typeof row]),
  }))

  return (
    <>
      <div className="mb-12">
        <span className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Открытое исследование · 2026 ]
        </span>
        <h1 className="mb-6 text-balance font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
          Конкурентный mystery-audit
          <br />
          АЗС-сетей
        </h1>
        <p className="mb-8 font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Мобильное приложение · Программа лояльности · АЗС-ритейл · Коммуникации
        </p>
        <p className="max-w-2xl text-base leading-relaxed text-foreground">
          Оцениваем, насколько АЗС-сеть умеет превращать обычного клиента в лояльного и повторного покупателя через
          связку: АЗС / магазин / кафе → мобильное приложение → программа лояльности → акции → персонализация →
          удержание
        </p>
      </div>

      <div className="mb-12 grid gap-5 md:grid-cols-3">
        <InfoCard icon={Flame} title="Для кого будет полезно?">
          CMO и руководителям программ лояльности АЗС-сетей, продуктовым командам мобильных приложений и ритейла на
          станции
        </InfoCard>
        <InfoCard icon={Gem} title="Смысловая нагрузка UI">
          Оцениваем не «красивое приложение», а цифровые и офлайн-точки контакта — помощь чаще заправляться, покупать
          больше
        </InfoCard>
        <InfoCard icon={ClipboardList} title="Идентичные сценарии">
          Клиентские сценарии: регистрация, карта лояльности, применение акций, покупка топлива и НТУ, начисление
          баллов, коммуникации
        </InfoCard>
      </div>

      <section className="mb-16">
        <div className="mb-10 rounded-2xl border border-border bg-card p-8 md:p-10">
          <div className="mb-8">
            <StatRow items={['12 сетей АЗС', '65 критериев', '10 блоков весовой модели']} />
          </div>
          <p className="mb-4 text-lg font-semibold text-primary">Ключевые приоритеты модели</p>
          <ul className="mb-6 space-y-1.5 text-sm leading-tight text-muted-foreground">
            <li>Программа лояльности (B) — 19% · основа монетизации</li>
            <li>Коммуникации и удержание (F) — 14% · онбординг → удержание → возврат</li>
            <li>Онлайн ↔ офлайн связка (C) — 14% · связка цифры и физической точки</li>
            <li>Магазин и кафе — апселл (I) — 10% · перевод топливного клиента в покупателя ритейла</li>
            <li>НТУ сквозные механики (J) — 10% · сквозные механики топливо — нетопливо = рост среднего чека</li>
          </ul>
          <p className="text-lg font-semibold text-primary">Mystery-audit по единым сценариям</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
          Участники
          <br />
          исследования
        </h2>
        <div className="flex flex-wrap gap-3">
          {PARTICIPANTS.map((p) => (
            <ParticipantChip key={p.name} name={p.name} dotColor={p.color} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
          10 блоков
          <br />
          весовой модели
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          65 критериев. Наибольший вес имеют блоки программы лояльности, коммуникаций и онлайн↔офлайн связки.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {BLOCKS.map((b, i) => (
            <FlipCard key={b.code} block={b} index={i} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
          Лидеры
          <br />
          исследования
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          Сравнение топ-сетей по четырём ключевым блокам весовой модели: программа лояльности, онлайн↔офлайн связка,
          коммуникации и апселл в магазине/кафе.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 lg:col-span-2">
            <ReportRadar axes={radarAxes} series={radarSeries} max={20} />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {RADAR_BRANDS.map((b) => (
                <div key={b.key} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-sm font-medium text-foreground">{b.key}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="text-center">
              <div className="font-mono text-sm uppercase tracking-wide text-muted-foreground">минимальный балл</div>
              <div className="mt-2 font-heading text-8xl font-extrabold leading-none text-primary">38</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-sm uppercase tracking-wide text-muted-foreground">максимальный балл</div>
              <div className="mt-2 font-heading text-8xl font-extrabold leading-none text-primary">84</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 space-y-14 md:space-y-20">
        {BRAND_SCORES.map((b) => (
          <div key={b.name}>
            <div className="mb-6 flex flex-wrap items-center gap-5 md:mb-8 md:gap-6">
              <h3 className="font-heading text-4xl font-bold leading-none tracking-tight text-primary">{b.name}</h3>
              <span className="inline-flex items-center rounded-xl bg-accent px-6 py-2 font-heading text-2xl font-extrabold text-accent-foreground">
                {b.score.toLocaleString('ru-RU')}
              </span>
            </div>
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              <div className="md:col-span-2">
                <div className="mb-4 text-5xl font-black leading-none text-primary">+</div>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {b.pros.map((p, i) => (
                    <p key={i} className="text-sm leading-snug text-foreground md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-7 h-3 w-12 rounded-sm bg-accent" />
                <div className="space-y-6">
                  {b.cons.map((c, i) => (
                    <p key={i} className="text-sm leading-snug text-foreground md:text-base">
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-16">
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
            65 критериев и балльная система с весами по 10 блокам.
            <br />
            Можно дополнить своими или использовать «как есть»
          </p>
          <ReportCTA access="open" openLabel="Запросить" />
        </div>
      </section>
    </>
  )
}

function FlipCard({ block, index }: { block: { code: string; weight: number; title: string; note?: string }; index: number }) {
  return (
    <div className="group min-h-[160px] [perspective:1000px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-secondary p-5 [backface-visibility:hidden]">
          <div className="flex items-start justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-base font-extrabold text-primary-foreground">
              {block.code}
            </span>
          </div>
          <p className="text-base font-bold leading-tight text-primary md:text-lg">{block.title}</p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-start justify-end">
            <span className="font-heading text-3xl font-extrabold leading-none tracking-tight text-primary md:text-4xl">
              {block.weight}%
            </span>
          </div>
          {block.note && <p className="text-xs leading-snug text-muted-foreground md:text-sm">{block.note}</p>}
        </div>
      </div>
    </div>
  )
}
