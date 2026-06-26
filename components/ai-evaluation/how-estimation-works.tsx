'use client'

import { Sparkles, Lightbulb, History, Sigma } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'

const METHODS = [
  {
    icon: Lightbulb,
    title: 'Интуиция',
    text: 'Остаётся за вами — продукт в неё не лезет.',
    owner: 'человек',
  },
  {
    icon: History,
    title: 'Прошлый опыт',
    text: 'Продукт опирается на 300+ план-фактов похожих проектов.',
    owner: 'AI-оценка',
  },
  {
    icon: Sigma,
    title: 'Формула',
    text: 'Драйверы трудозатрат считаются системно, а не на ощущениях.',
    owner: 'AI-оценка',
  },
]

export function HowEstimationWorks() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Как устроена оценка ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          На время ты покупаешь не качество, а детали
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Оценка не становится точнее линейно со временем. По мере пересборок
          количество деталей то растёт, то падает — а уверенность приходит, когда
          их достаточно, но не слишком много. AI-оценка помогает быстро пройти
          первые этапы пересборки.
        </p>

        {/* annotated schematic */}
        <div
          ref={ref}
          className="reveal mt-12 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8"
        >
          <svg
            viewBox="0 0 760 320"
            className="h-auto w-full"
            role="img"
            aria-label="Схема: количество деталей оценки колеблется по мере пересборок, а зона уверенности — посередине"
          >
            {/* comfort band */}
            <rect
              x="60"
              y="135"
              width="660"
              height="55"
              rx="6"
              className="text-accent"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <text
              x="70"
              y="167"
              className="font-mono text-accent"
              fill="currentColor"
              fontSize="12"
              style={{ letterSpacing: '0.08em' }}
            >
              ЗОНА УВЕРЕННОСТИ
            </text>

            {/* early AI zone */}
            <rect
              x="60"
              y="40"
              width="150"
              height="230"
              rx="6"
              className="text-accent"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <line
              x1="210"
              y1="40"
              x2="210"
              y2="270"
              className="text-accent"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* axes */}
            <line
              x1="60"
              y1="270"
              x2="720"
              y2="270"
              className="text-border"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="60"
              y1="40"
              x2="60"
              y2="270"
              className="text-border"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* details curve (non-linear, oscillating through rebuilds) */}
            <path
              d="M 60 250 C 110 170, 150 110, 200 120 S 290 215, 330 188 S 420 95, 470 108 S 560 175, 605 158 S 685 144, 720 150"
              className="text-accent"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* rebuild markers */}
            {[
              { x: 330, label: 'пересборка 1' },
              { x: 470, label: 'пересборка 2' },
            ].map((m) => (
              <g key={m.label}>
                <line
                  x1={m.x}
                  y1="40"
                  x2={m.x}
                  y2="270"
                  className="text-muted-foreground"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <text
                  x={m.x}
                  y="288"
                  textAnchor="middle"
                  className="font-mono text-muted-foreground"
                  fill="currentColor"
                  fontSize="11"
                >
                  {m.label}
                </text>
              </g>
            ))}

            {/* zone labels */}
            <text
              x="715"
              y="70"
              textAnchor="end"
              className="text-muted-foreground"
              fill="currentColor"
              fontSize="12"
            >
              много деталей — перерасход ресурсов
            </text>
            <text
              x="715"
              y="255"
              textAnchor="end"
              className="text-muted-foreground"
              fill="currentColor"
              fontSize="12"
            >
              мало деталей — нет уверенности
            </text>

            {/* AI badge */}
            <text
              x="135"
              y="60"
              textAnchor="middle"
              className="font-mono text-accent"
              fill="currentColor"
              fontSize="11"
              style={{ letterSpacing: '0.06em' }}
            >
              AI ускоряет
            </text>

            {/* axis captions */}
            <text
              x="60"
              y="32"
              className="font-mono text-muted-foreground"
              fill="currentColor"
              fontSize="11"
            >
              детали
            </text>
            <text
              x="720"
              y="305"
              textAnchor="end"
              className="font-mono text-muted-foreground"
              fill="currentColor"
              fontSize="11"
            >
              время / усилия →
            </text>
          </svg>
        </div>

        {/* intuition / experience / formula */}
        <div className="mt-12">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            Три способа оценивать — и кто за них отвечает
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {METHODS.map((m) => (
              <div
                key={m.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <m.icon className="h-5 w-5 text-accent" />
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
                      m.owner === 'человек'
                        ? 'bg-secondary text-muted-foreground'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {m.owner}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold uppercase tracking-tight text-primary">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
