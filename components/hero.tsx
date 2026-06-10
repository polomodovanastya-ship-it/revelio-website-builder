'use client'

import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero({ onEstimate }: { onEstimate: () => void }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* aurora glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[120px]" />
        <div className="aurora-slow absolute -right-20 top-10 h-[24rem] w-[24rem] rounded-full bg-[var(--accent-2)]/20 blur-[120px]" />
      </div>

      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.4] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {['Консалтинг', 'Разработка', 'Процессы'].map((tag, i) => (
            <span
              key={tag}
              className="reveal in-view rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="reveal in-view mt-8 max-w-4xl text-balance font-heading text-5xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-7xl lg:text-8xl" style={{ animationDelay: '120ms' }}>
          Внедряем <span className="text-gradient">новую экспертизу</span> в бизнес
        </h1>

        <p className="reveal in-view mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: '220ms' }}>
          От оценки задачи до запуска команды и передачи функции внутрь бизнеса.
          Редкие эксперты и собранные практики для крупного B2B.
        </p>

        <div className="reveal in-view mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '320ms' }}>
          <button
            onClick={onEstimate}
            className="shimmer group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground shadow-[0_8px_30px_-8px_oklch(0.64_0.193_293_/_0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_-6px_oklch(0.64_0.193_293_/_0.8)]"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Оценить проект
          </button>
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary hover:bg-card"
          >
            Написать консультанту
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* metrics row */}
        <div className="reveal in-view mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4" style={{ animationDelay: '420ms' }}>
          {[
            { n: '15 лет', l: 'в ИТ-проектах' },
            { n: '1 час', l: 'до ответа консультанта' },
            { n: '2 недели', l: 'релизный цикл' },
            { n: '3–5 дней', l: 'на оценку, бесплатно' },
          ].map((m) => (
            <div
              key={m.l}
              className="group relative bg-card p-5 transition-colors hover:bg-card/60"
            >
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <div className="font-heading text-2xl text-foreground sm:text-3xl">
                {m.n}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
