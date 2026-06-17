'use client'

import { useReveal } from '@/hooks/use-reveal'

const ESTIMATE_STEPS = [
  { n: '01', title: 'Анализ бизнес-контекста и требований' },
  { n: '02', title: 'Декомпозиция и определение образа результата' },
  { n: '03', title: 'Оценка работ, описание допущений, ограничений и рисков' },
  { n: '04', title: 'Формирование ресурсного плана, сборка TCO проекта' },
]

const EXEC_STEPS = [
  {
    n: '01',
    title: 'Сборка команды',
    time: '1–2 недели',
    detail:
      'Подбор экспертов, формирование рабочей группы, согласование этапов и результатов.',
  },
  {
    n: '02',
    title: 'Внедрение и 1-й результат',
    time: '2–4 месяца',
    detail:
      'Разработка, запуск продуктов и процессов, первые измеримые результаты.',
  },
  {
    n: '03',
    title: 'Передача экспертизы',
    time: '1–3 месяца',
    detail:
      'Передача компетенций через переход наших экспертов в штат к Заказчику.',
  },
  {
    n: '04',
    title: 'Поддержка и развитие',
    time: 'по требованию',
    detail: 'Стабилизация продукта или практики, переход в поддержку и доработку.',
  },
]

export function Process() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="process" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Процесс работы ]
        </span>
        <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Как оцениваем и выполняем проекты
        </h2>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* estimate */}
          <div>
            <div className="flex items-baseline justify-between border-b border-primary/20 pb-4">
              <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                📐 Как оцениваем
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                3–14 рабочих дней
              </span>
            </div>
            <ol className="mt-2">
              {ESTIMATE_STEPS.map((s) => (
                <li
                  key={s.n}
                  className="flex items-baseline gap-4 border-b border-border py-5"
                >
                  <span className="w-6 shrink-0 font-mono text-sm font-medium tabular-nums text-accent">
                    {s.n}
                  </span>
                  <span className="text-base leading-relaxed text-foreground">
                    {s.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* execute */}
          <div>
            <div className="flex items-baseline justify-between border-b border-primary/20 pb-4">
              <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                🚀 Как выполняем
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                от запуска до передачи
              </span>
            </div>
            <ol className="mt-2">
              {EXEC_STEPS.map((s) => (
                <li key={s.n} className="border-b border-border py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 font-mono text-sm font-medium tabular-nums text-accent">
                      {s.n}
                    </span>
                    <div className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
                      <span className="font-heading text-sm font-semibold uppercase tracking-tight text-primary">
                        {s.title}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {s.time}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 pl-10 text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
