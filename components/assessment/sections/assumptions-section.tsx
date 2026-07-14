'use client'
import { useState } from 'react'
import { ReportSectionCard, ShowMoreToggle } from '../primitives'

const VISIBLE = 5

// 06 Чеклист ограничений и допущения
export function AssumptionsSection({ assumptions }: { assumptions: string[] }) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? assumptions : assumptions.slice(0, VISIBLE)
  const hiddenCount = assumptions.length - VISIBLE

  return (
    <ReportSectionCard number="06" title="Чеклист ограничений и допущения">
      <ul className="space-y-2 text-sm text-foreground">
        {visible.map((a, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">—</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <ShowMoreToggle
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          moreLabel={`Показать ещё ${hiddenCount}`}
        />
      )}
    </ReportSectionCard>
  )
}
