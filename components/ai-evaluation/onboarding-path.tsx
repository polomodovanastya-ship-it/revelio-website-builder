'use client'

import { useReveal } from '@/hooks/use-reveal'

const STEPS = [
  {
    caption: 'Загрузка файла',
    instruction: 'Загрузи файлы требований/ФТ/ТЗ или описание проекта',
  },
  {
    caption: 'Контакты для результата',
    instruction: 'Дай контакты куда тебе придет результат',
  },
  {
    caption: 'Ответы на вопросы',
    instruction: 'Продукт задаст тебе вопросы — ответь на них',
  },
  {
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
            <div key={i} className="flex flex-col items-center text-center">
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
