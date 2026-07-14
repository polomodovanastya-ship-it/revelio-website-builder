import { ReportSectionCard } from '../primitives'
import type { ReportProject, ReportQA } from '@/lib/report-api'

// 02 Контекст проекта
export function ContextSection({
  project,
  qa,
}: {
  project: ReportProject
  qa: ReportQA[]
}) {
  const pills = [
    { label: 'Тип проекта', value: project.type },
    { label: 'Отрасль', value: project.industry },
    { label: 'Компания', value: project.company },
  ].filter((p) => p.value)

  if (pills.length === 0 && qa.length === 0) return null

  return (
    <ReportSectionCard number="02" title="Контекст проекта">
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
        <dl className={pills.length > 0 ? 'mt-6 space-y-4' : 'space-y-4'}>
          {qa.map((item, i) => (
            <div key={i} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <dt className="text-sm font-semibold text-foreground">{item.question}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      )}
    </ReportSectionCard>
  )
}
