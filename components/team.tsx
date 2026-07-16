'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { useReveal } from '@/hooks/use-reveal'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
    tags: ['Банки', 'Retail', 'AI for IT', 'RPA', 'ITIL', 'Group Dynamics'],
  },
  {
    name: 'Александр',
    role: 'Партнёр',
    bio: 'Руководил CX-практикой и командами в проектах для KIA, Лукойл, Unitel, Ренессанс, СИБУР.',
    photo: 'alexander-v',
    tags: ['eCom', 'Retail', 'Telco', 'CX', 'Loyalty', 'Pricing', 'CDP', 'Data'],
  },
  {
    name: 'Илья',
    role: 'Консультант · Технологии',
    bio: 'Проектировал B2B, loyalty и cloud-native k8s-платформы, AI/Dify-пайплайны, интеграции и high-load.',
    photo: 'ilya',
    tags: ['AI', 'LLM Pipelines', 'Kubernetes', 'Cloud Platform', 'CI/CD', 'Integrations'],
  },
  {
    name: 'Александр',
    role: 'Консультант · Технологии',
    bio: 'Развивал tech привлечения и маркетинга, управление ИТ и gen AI в банках РФ ТОП-10.',
    photo: 'alexander-p',
    tags: ['Бигтех', 'GenAI', 'AI4SDLC', 'System Design', 'Platform', 'Leadership'],
  },
  {
    name: 'Артём',
    role: 'Консультант · Инфра',
    bio: 'Развивал IaaS-сервисы и private cloud для enterprise, внедрял SecOps в крупных ИТ-службах.',
    photo: 'artem',
    tags: ['Cloud', 'SecOps', 'ЦОД', 'IaaS', 'Private Cloud', 'Enterprise'],
  },
  {
    name: 'Евгений',
    role: 'Консультант · eLearning',
    bio: 'Разрабатывал ИОТ-платформу, внедрял микросервисы, оптимизировал highload-системы.',
    photo: 'eugene',
    tags: ['SaaS', 'LMS', 'ИОТ', 'Integrations', 'Микросервисы', 'Highload'],
  },
  {
    name: 'Максим',
    role: 'Консультант · AI',
    bio: 'Директор по продуктам, экс-МКБ и «Инфосистемы Джет».',
    photo: 'maksim',
    tags: ['Финтех', 'Скоринг', 'LLM On-Prem', 'AI Ops', 'ITSM', 'Ассистенты'],
  },
  {
    name: 'Светлана',
    role: 'Консультант · Аналитика',
    bio: 'Вела проекты аналитики в HoReCa, оптимизации процессов цепи поставок, внедряла АСУ ТП для топ-10 НПЗ.',
    photo: 'svetlana',
    tags: ['SA/BA', 'SCM', 'MDM', 'HoReCa', 'QA', 'Обучение пользователей', 'Автоматизация', 'Базы знаний'],
  },
]

const VISIBLE_COUNT = 4

export function Team() {
  const ref = useReveal<HTMLDivElement>()
  const [expanded, setExpanded] = useState(false)

  const visibleTeam = TEAM.slice(0, VISIBLE_COUNT)
  const hiddenTeam = TEAM.slice(VISIBLE_COUNT)

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
            ИТ и бизнес-экспертиза в индустриях: банки, ритейл, телеком, eCom,
            недвижимость, авто
          </p>
        </div>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleTeam.map((m, i) => (
            <TeamCard key={`${m.name}-${i}`} member={m} />
          ))}
          {expanded &&
            hiddenTeam.map((m, i) => (
              <TeamCard key={`${m.name}-${i}`} member={m} />
            ))}
        </div>

        {hiddenTeam.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? 'Свернуть' : 'Показать всех'}
              <ChevronDown
                className={cn(
                  'transition-transform duration-300',
                  expanded && 'rotate-180',
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function TeamCard({ member: m }: { member: Member }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]">
      {m.photo ? (
        <img
          src={asset(`/team/${m.photo}.webp`)}
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
  )
}
