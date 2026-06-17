'use client'

import { ArrowRight } from 'lucide-react'

export function Hero({ onEstimate }: { onEstimate: () => void }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* crisp blueprint hairline grid */}
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {['Консалтинг', 'Разработка', 'Процессы'].map((tag, i) => (
            <span
              key={tag}
              className="reveal in-view rounded-sm border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="reveal in-view mt-8 max-w-5xl text-balance font-heading text-4xl font-bold uppercase leading-[1.04] tracking-[-0.01em] text-primary sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '120ms' }}
        >
          Внедряем <span className="text-accent">новую экспертизу</span>{' '}
          <span className="whitespace-nowrap">
            🧬 <span className="lowercase">в&nbsp;бизнес</span>
          </span>
        </h1>

        <p
          className="reveal in-view mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          style={{ animationDelay: '220ms' }}
        >
          От оценки задачи до запуска команды и передачи функции внутрь бизнеса.
          Редкие эксперты и собранные практики для крупного B2B.
        </p>

        <div
          className="reveal in-view mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '320ms' }}
        >
          <button
            onClick={onEstimate}
            className="group flex items-center justify-center gap-2 rounded-sm bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
          >
            <span className="text-base leading-none">✨</span>
            Оценить проект
          </button>
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 rounded-sm border border-primary/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:border-primary hover:bg-card"
          >
            Написать консультанту
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* metrics row */}
        <div
          className="reveal in-view mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4"
          style={{ animationDelay: '420ms' }}
        >
          {[
            { n: '15 лет', l: 'в ИТ-проектах' },
            { n: '1 час', l: 'до ответа консультанта' },
            { n: '2 недели', l: 'релизный цикл' },
            { n: '3–5 дней', l: 'на оценку, бесплатно' },
          ].map((m) => (
            <div
              key={m.l}
              className="group relative bg-card p-5 transition-colors hover:bg-secondary"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                {m.n}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
