'use client'

import { useReveal } from '@/hooks/use-reveal'
import onb1 from '@/assets/onboarding-1.jpg.asset.json'
import onb2 from '@/assets/onboarding-2.jpg.asset.json'
import onb3 from '@/assets/onboarding-3.jpg.asset.json'
import onb4 from '@/assets/onboarding-4.jpg.asset.json'

const STEPS = [
  {
    src: onb1.url,
    caption: 'Загрузка файла',
    instruction: 'Загрузи файлы бизнес требований/ФТ/ТЗ, userstory или любую постановку',
  },
  {
    src: onb2.url,
    caption: 'Контакты для результата',
    instruction: 'Дай контакты куда тебе придет результат',
  },
  {
    src: onb3.url,
    caption: 'Ответы на вопросы',
    instruction: 'Продукт задаст тебе вопросы основываясь на опыте +300 проектов — ответь на них',
  },
  {
    src: onb4.url,
    caption: 'Оценка на почте с приватным кодом',
    instruction: 'Зайди в почту и получи секретный код для работы с результатом оценки',
  },
]

export function OnboardingPath() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Онбординг ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Как выглядит путь процесса оценки
        </h2>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <figure key={i} className="flex flex-col items-center">
              <div className="relative w-full max-w-[260px]">
                {/* iPhone 17 mockup frame */}
                <div className="relative aspect-[9/19.5] rounded-[2.2rem] bg-[#0b0b0f] p-[6px] shadow-[0_25px_60px_-30px_rgba(20,37,80,0.55)] ring-1 ring-black/10">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-background">
                    {/* Dynamic Island */}
                    <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
                    <img
                      src={step.src}
                      alt={step.caption}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <figcaption className="mt-5 text-center">
                <span className="font-mono text-[11px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1 text-sm font-medium text-primary">
                  {step.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
