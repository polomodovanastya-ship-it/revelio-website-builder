'use client'

import { useReveal } from '@/hooks/use-reveal'

type Member = {
  name: string
  role: string
  bio: string
  photo: string | null
  tags: string[]
}

const TEAM: Member[] = [
  {
    name: 'Анастасия',
    role: 'CEO',
    bio: 'Руководила ИТ-командами в Ameria Bank, «Джет». Запускала проекты с Ингосстрах, TuTu, Дикси.',
    photo: 'anastasia',
    tags: ['Банки', 'Retail', 'BART', 'AI for IT', 'RPA', 'ITIL', 'Group Dynamics', 'Psychology'],
  },
  {
    name: 'Александр',
    role: 'Партнёр',
    bio: 'Руководил CX-практикой и продуктовым развитием в проектах для KIA, Лукойл, Unitel, Ренессанс, СИБУР.',
    photo: 'alexander-v',
    tags: ['eCom', 'АЗС', 'Retail', 'Telco', 'CX', 'ITSM', 'Loyalty', 'Pricing', 'CDP', 'Data', 'Монетизация', 'Геймификация', 'WFM'],
  },
  {
    name: 'Илья',
    role: 'Консультант · Технологии',
    bio: 'Проектировал B2B, loyalty и cloud-native k8s-платформы, AI/Dify-пайплайны, интеграции и high-load.',
    photo: 'ilya',
    tags: ['AI', 'Dify', 'LLM Pipelines', 'CI/CD', 'B2B', 'Golang', 'Cloud Platform', 'GitOps', 'Kubernetes', 'Kafka', 'Integrations', 'Observability'],
  },
  {
    name: 'Александр',
    role: 'Консультант · Технологии',
    bio: 'Развивал tech привлечения и маркетинга, управление ИТ и gen AI в банках РФ ТОП-10.',
    photo: 'alexander-p',
    tags: ['Бигтех', 'GenAI', 'AI4SDLC', 'System Design', 'Platform', 'Архитектура систем', 'Leadership'],
  },
  {
    name: 'Павел',
    role: 'Консультант · eCom',
    bio: 'Запускал процессы eCom, прайсинг и обеспечение для mid-size FMCG, fashion и БТиЭ (Mepsi, Lulu, MILLY).',
    photo: 'pavel',
    tags: ['eCom', 'Процессы', 'Обеспечение', 'Склад', 'Прогнозирование', 'Продажи'],
  },
  {
    name: 'Артём',
    role: 'Консультант · Инфра',
    bio: 'Развивал IaaS-сервисы и private cloud для enterprise, внедрял SecOps в крупных ИТ-службах.',
    photo: null,
    tags: ['Cloud', 'SecOps', 'ЦОД'],
  },
  {
    name: 'Мария',
    role: 'Консультант · Data',
    bio: 'Руководила проектами внедрения сквозной аналитики для крупных девелоперов.',
    photo: 'maria',
    tags: ['Жилая недвижимость', 'Автодилеры', 'Сквозная аналитика', 'ROMI', 'CAC', 'Data', 'Marketing'],
  },
]

export function Team() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="team" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ Команда и эксперты ]
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Команда и эксперты
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Практики, которые внедряли это сами — банки, ритейл, телеком, eCom и
            ИТ. Не продавцы, а эксперты.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((m, i) => (
            <article
              key={`${m.name}-${i}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]"
            >
              {m.photo ? (
                <img
                  src={`/team/${m.photo}.webp`}
                  alt={m.name}
                  className="aspect-[4/3] w-full object-cover object-center"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary">
                  <span className="font-heading text-5xl font-black text-primary/20">
                    {m.name.charAt(0)}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                  {m.name}
                </h3>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {m.role}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
