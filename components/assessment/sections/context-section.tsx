'use client'
import { useState } from 'react'
import { ReportSectionCard, ShowMoreToggle } from '../primitives'
import { resolveProjectType } from '@/lib/report-format'
import type { ReportProject, ReportQA } from '@/lib/report-api'

const QA_VISIBLE = 3

// Контекст проекта — number is assigned by report-view based on render order.
export function ContextSection({
  project,
  qa,
  number,
}: {
  project: ReportProject
  qa: ReportQA[]
  number?: string
}) {
  const [qaExpanded, setQaExpanded] = useState(false)

  const pills = [
    { label: 'Тип проекта', value: resolveProjectType(project.type) },
    { label: 'Отрасль', value: project.industry },
    { label: 'Компания', value: project.company },
  ].filter((p) => p.value)

  if (pills.length === 0 && qa.length === 0) return null

  const visibleQa = qaExpanded ? qa : qa.slice(0, QA_VISIBLE)
  const hasMoreQa = qa.length > QA_VISIBLE

  return (
    <ReportSectionCard number={number} title="Контекст проекта">
      {pills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <div key={p.label} className="rounded-xl bg-muted px-3 py-2 text-sm">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{p.label}</div>
              <div className="font-medium text-foreground">{p.value}</div>
            </div>
          ))}
        </div>
      )}
      {qa.length > 0 && (
        <>
          <dl className={pills.length > 0 ? 'mt-6 space-y-4' : 'space-y-4'}>
            {visibleQa.map((item, i) => (
              <div key={i} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <dt className="text-sm font-semibold text-foreground">{item.question}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
          {hasMoreQa && (
            <ShowMoreToggle
              expanded={qaExpanded}
              onToggle={() => setQaExpanded((v) => !v)}
              moreLabel="Показать ещё"
            />
          )}
        </>
      )}
    </ReportSectionCard>
  )
}
