'use client'

import { useReveal } from '@/hooks/use-reveal'
import onb1 from '@/assets/onboarding-1-v2.png.asset.json'
import onb2 from '@/assets/onboarding-2-v2.png.asset.json'
import onb3 from '@/assets/onboarding-3-v2.png.asset.json'
import onb4 from '@/assets/onboarding-4-v2.png.asset.json'

const ASSET_HOST = process.env.NEXT_PUBLIC_ASSET_HOST ?? ''

const STEPS = [
  {
    caption: 'Загрузка файла',
    instruction: 'Загрузи файлы требований/ФТ/ТЗ или описание проекта',
    image: onb1.url,
  },
  {
    caption: 'Контакты для результата',
    instruction: 'Дай контакты куда тебе придет результат',
    image: onb2.url,
  },
  {
    caption: 'Ответы на вопросы',
    instruction: 'Продукт задаст тебе вопросы — ответь на них',
    image: onb3.url,
  },
  {
    caption: 'Оценка на почте с приватным кодом',
    instruction: 'Получи код на почту для работы с результатом оценки',
    image: onb4.url,
  },
]

export function OnboardingPath() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden border-b border-border pb-20 pt-4 sm:pb-28 sm:pt-6">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Онбординг ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-3xl">
          Как выглядит путь процесса оценки
        </h2>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <img
                src={`${ASSET_HOST}${step.image}`}
                alt={step.caption}
                className="mb-5 w-full max-w-[240px] object-contain"
                loading="lazy"
              />
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 font-mono text-sm tabular-nums text-accent ring-1 ring-accent/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-sm font-medium text-primary">
                {step.caption}
              </p>
              <p className="mt-3 w-full max-w-[260px] rounded-lg bg-accent/12 px-4 py-3 text-sm leading-relaxed text-primary ring-1 ring-accent/20">
                {step.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
