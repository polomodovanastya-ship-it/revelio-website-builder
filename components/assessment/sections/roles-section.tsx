import { Users } from 'lucide-react'
import { ReportSectionCard, BarRow } from '../primitives'
import { formatHours, toPercent } from '@/lib/report-format'
import type { ReportRoles } from '@/lib/report-api'

// Часы по ролям — participates in the sequential section numbering same as
// every other section; number is assigned by report-view based on render
// order (icon is kept as a fallback if a number is ever not supplied).
export function RolesSection({ roles, number }: { roles: ReportRoles; number?: string }) {
  const maxRoleShare = roles.roles.length > 0 ? Math.max(...roles.roles.map((r) => r.share)) : 0

  return (
    <ReportSectionCard icon={Users} number={number} title="Часы по ролям">
      <div className="space-y-2.5">
        {roles.roles.map((r) => (
          <BarRow
            key={r.role}
            label={r.label}
            share={r.share}
            maxShare={maxRoleShare}
            trailing={`${formatHours(r.hours_expected)} ч · ${Math.round(toPercent(r.share))}%`}
          />
        ))}
      </div>
    </ReportSectionCard>
  )
}
