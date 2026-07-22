'use client'

import { useReveal } from '@/hooks/use-reveal'
import onb1 from '@/src/assets/onboarding-1.png.asset.json'
import onb2 from '@/src/assets/onboarding-2.png.asset.json'
import onb3 from '@/src/assets/onboarding-3.png.asset.json'
import onb4 from '@/src/assets/onboarding-4.png.asset.json'

const ASSET_HOST = 'https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app'

const STEPS = [
  {
    src: `${ASSET_HOST}${onb1.url}`,
    caption: 'Загрузка файла',
    instruction: 'Загрузи файлы требований/ФТ/ТЗ или описание проекта',
  },
  {
    src: `${ASSET_HOST}${onb2.url}`,
    caption: 'Контакты для результата',
    instruction: 'Дай контакты куда тебе придет результат',
  },
  {
    src: `${ASSET_HOST}${onb3.url}`,
    caption: 'Ответы на вопросы',
    instruction: 'Продукт задаст тебе вопросы — ответь на них',
  },
  {
    src: `${ASSET_HOST}${onb4.url}`,
    caption: 'Оценка на почте с приватным кодом',
    instruction: 'Получи код на почту для работы с результатом оценки',
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
            <figure key={i} className="flex flex-col items-center">
              <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl bg-card shadow-[0_25px_60px_-30px_rgba(20,37,80,0.55)] ring-1 ring-black/10">
                <img
                  src={step.src}
                  alt={step.caption}
                  className="aspect-[9/19.5] h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-5 max-w-[260px] text-center">
                <span className="font-mono text-[11px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1 text-sm font-medium text-primary">
                  {step.caption}
                </p>
                <p className="mt-3 rounded-lg bg-accent/12 px-4 py-3 text-sm leading-relaxed text-primary ring-1 ring-accent/20">
                  {step.instruction}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
