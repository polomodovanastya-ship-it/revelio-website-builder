'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { HERO_SUMMARY, PRODUCT_PROOF } from '@/lib/ai-evaluation-content'
import { EvalStartLink } from '@/components/funnel-tracking'
import summaryCover from '@/src/assets/Summary_cover.png.asset.json'

const ROTATING_HEADLINES = [
  'Посчитай оценку',
  'Сформируй GANT',
  'Выяви риски',
  'Найди ограничения',
  'Оцени трудозатраты',
]

export function LandingHero() {
  const [headlineIndex, setHeadlineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % ROTATING_HEADLINES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        {/* left — message */}
        <div>
          <span className="reveal in-view inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
            [ AI-ОЦЕНКА КАК СЕРВИС ]
          </span>

          <h1
            className="reveal in-view mt-5 max-w-2xl text-balance font-heading text-[40px] font-black uppercase leading-[1.05] tracking-[-0.02em] text-primary"
            style={{ animationDelay: '90ms' }}
          >
            <span aria-live="polite" className="text-accent">{ROTATING_HEADLINES[headlineIndex]}</span>
            <br />
            <span className="text-primary">ИТ-проекта за ~10 минут с AI</span>
          </h1>

          <p
            className="reveal in-view mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: '170ms' }}
          >
            Загружаешь требования, отвечаешь на вопросы — и получаешь детальную
            оценку проекта с рисками и ограничениями. Делай уверенно, без
            многонедельного ожидания.
          </p>

          <div
            className="reveal in-view mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '320ms' }}
          >
            <EvalStartLink
              className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
            >
              Перейти к оценке
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </EvalStartLink>
            <Link
              href="/#contact"
              className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
            >
              Обсудить с консультантом
            </Link>
          </div>

          <div
            className="reveal in-view mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5"
            style={{ animationDelay: '380ms' }}
          >
            {['бесплатно', '3–5 минут', 'погрешность 10–20%'].map((m, i) => (
              <span key={m} className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {m}
                </span>
                {i < 2 && <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />}
              </span>
            ))}
          </div>
        </div>

        {/* right — illustration */}
        <div
          className="reveal in-view"
          style={{ animationDelay: '260ms' }}
        >
          <Image
            src={summaryCover.url}
            alt="Пример оценки проекта"
            width={1320}
            height={820}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  )
}
