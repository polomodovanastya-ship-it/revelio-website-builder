'use client'
import { useState } from 'react'
import { ReportSectionCard, ShowMoreToggle } from '../primitives'

const VISIBLE = 5

// Чеклист ограничений и допущения — number is assigned by report-view based
// on render order.
export function AssumptionsSection({
  assumptions,
  number,
}: {
  assumptions: string[]
  number?: string
}) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? assumptions : assumptions.slice(0, VISIBLE)
  const hiddenCount = assumptions.length - VISIBLE

  return (
    <ReportSectionCard number={number} title="Чеклист ограничений и допущения">
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
