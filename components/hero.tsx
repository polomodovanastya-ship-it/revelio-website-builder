'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { asset } from '@/lib/asset'

export function Hero() {
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
              className="reveal in-view rounded-full bg-secondary px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="reveal in-view mt-8 max-w-5xl text-balance font-heading text-4xl font-black uppercase leading-[1.04] tracking-[-0.02em] text-primary sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '120ms' }}
        >
          Внедряем <span className="text-accent">новую экспертизу</span>
          <span className="whitespace-nowrap">
            <img
              src={asset('/dna.webp')}
              alt=""
              aria-hidden
              className="mx-[0.2em] inline-block h-[1.2em] w-auto align-[-0.22em]"
            />
            в&nbsp;бизнес
          </span>
        </h1>

        <p
          className="reveal in-view mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:max-w-none lg:whitespace-nowrap"
          style={{ animationDelay: '220ms' }}
        >
          От оценки задачи до запуска команды и передачи функции внутрь бизнеса.
        </p>

        <div
          className="reveal in-view mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '320ms' }}
        >
          <Link
            href="/ai-evaluation"
            className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
          >
            Оценить проект
          </Link>
          <a
            href="https://t.me/reveliotech"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
          >
            Написать консультанту
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* metrics row — separated rounded cards, divided by gap + surface colour (no borders) */}
        <div
          className="reveal in-view mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: '420ms' }}
        >
          {[
            { n: '15 лет', l: 'в ИТ-проектах' },
            { n: '10 минут', l: 'до ответа консультанта' },
            { n: '3–5 дней', l: 'на оценку, бесплатно' },
            { n: '2 недели', l: 'рабочий прототип' },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]"
            >
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
