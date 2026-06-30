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
    <section id="what" className="scroll-mt-24 border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Как устроена оценка ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          На время ты покупаешь не качество, а детали
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Оценка не становится точнее линейно со временем. Вручную количество
          деталей то растёт, то падает — а уверенность приходит, когда их
          достаточно, но не слишком много. AI-оценка быстро выводит проект в эту
          зону, минуя качели пересборок.
        </p>

        {/* annotated schematic */}
        <div
          ref={ref}
          className="reveal mt-12 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8"
        >
          <svg
            viewBox="0 0 760 340"
            className="h-auto w-full"
            role="img"
            aria-label="Схема: ручная оценка колеблется между перерасходом деталей и нехваткой уверенности, а с AI-оценкой проект быстро выходит в зону уверенности"
          >
            {/* confidence band + dashed guides */}
            <rect
              x="64"
              y="150"
              width="646"
              height="52"
              rx="6"
              className="text-accent"
              fill="currentColor"
              fillOpacity="0.07"
            />
            <line
              x1="64"
              y1="150"
              x2="710"
              y2="150"
              className="text-accent"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <line
              x1="64"
              y1="202"
              x2="710"
              y2="202"
              className="text-accent"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <text
              x="387"
              y="167"
              textAnchor="middle"
              className="font-mono text-accent"
              fill="currentColor"
              fontSize="11"
              style={{ letterSpacing: '0.14em' }}
            >
              ЗОНА УВЕРЕННОСТИ
            </text>

            {/* axes */}
            <line
              x1="64"
              y1="280"
              x2="710"
              y2="280"
              className="text-border"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="64"
              y1="50"
              x2="64"
              y2="280"
              className="text-border"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* manual estimate — oscillates between over-detail and under-confidence */}
            <path
              d="M 64 258 C 120 175, 150 95, 205 102 S 305 250, 350 226 S 455 105, 500 122 S 630 184, 700 166"
              className="text-muted-foreground"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* AI estimate — climbs straight into the confidence zone and stays */}
            <path
              d="M 64 258 C 110 208, 150 180, 205 178 C 360 176, 540 178, 700 178"
              className="text-accent"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle
              cx="700"
              cy="178"
              r="4.5"
              className="text-accent"
              fill="currentColor"
            />

            {/* leader: overshoot peak */}
            <line
              x1="205"
              y1="102"
              x2="248"
              y2="76"
              className="text-muted-foreground"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <text
              x="254"
              y="73"
              className="text-muted-foreground"
              fill="currentColor"
              fontSize="12"
            >
              много деталей — перерасход ресурсов
            </text>

            {/* leader: under-confidence valley */}
            <line
              x1="350"
              y1="226"
              x2="362"
              y2="252"
              className="text-muted-foreground"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <text
              x="368"
              y="259"
              className="text-muted-foreground"
              fill="currentColor"
              fontSize="12"
            >
              мало деталей — нет уверенности
            </text>

            {/* legend */}
            <line
              x1="90"
              y1="64"
              x2="118"
              y2="64"
              className="text-accent"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text
              x="126"
              y="68"
              className="font-mono text-foreground"
              fill="currentColor"
              fontSize="11"
            >
              с AI-оценкой
            </text>
            <line
              x1="90"
              y1="86"
              x2="118"
              y2="86"
              className="text-muted-foreground"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="126"
              y="90"
              className="font-mono text-muted-foreground"
              fill="currentColor"
              fontSize="11"
            >
              ручная оценка
            </text>

            {/* axis captions */}
            <text
              x="64"
              y="42"
              className="font-mono text-muted-foreground"
              fill="currentColor"
              fontSize="11"
            >
              детали
            </text>
            <text
              x="387"
              y="312"
              textAnchor="middle"
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
