import { ReportSectionCard } from '../primitives'

// 06 Чеклист ограничений и допущения
export function AssumptionsSection({ assumptions }: { assumptions: string[] }) {
  return (
    <ReportSectionCard number="06" title="Чеклист ограничений и допущения">
      <ul className="space-y-2 text-sm text-foreground">
        {assumptions.map((a, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">—</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </ReportSectionCard>
  )
}
