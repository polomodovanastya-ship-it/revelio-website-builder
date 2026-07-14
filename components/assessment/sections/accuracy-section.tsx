import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import type { ReportAccuracy } from '@/lib/report-api'

// 07 Точность оценки
export function AccuracySection({ accuracy }: { accuracy: ReportAccuracy }) {
  const rows: [string, React.ReactNode][] = [
    ['Общая точность', <Badge key="overall" tone={accuracyTone(accuracy.overall)}>{accuracy.overall}</Badge>],
    ['Задач с низкой точностью', accuracy.low_conf_tasks],
    ['Без достаточного контекста', accuracy.thin_context_tasks],
    ['Заявленная погрешность', accuracy.error_band],
    ['Основа', accuracy.basis],
  ]

  return (
    <ReportSectionCard number="07" title="Точность оценки">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Показатель
              </th>
              <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-border last:border-b-0">
                <td className="py-2.5 text-muted-foreground">{label}</td>
                <td className="py-2.5 font-medium text-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportSectionCard>
  )
}
