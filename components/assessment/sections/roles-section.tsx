import { Users } from 'lucide-react'
import { ReportSectionCard, BarRow } from '../primitives'
import { formatHours, toPercent } from '@/lib/report-format'
import type { ReportRoles } from '@/lib/report-api'

// Часы по ролям — не входит в нумерованные 8 секций дефолт-спека, поэтому
// без номера; визуально перекликается со сводкой по группам (01), но
// отмечена своей иконкой вместо номера.
export function RolesSection({ roles }: { roles: ReportRoles }) {
  return (
    <ReportSectionCard icon={Users} title="Часы по ролям">
      <div className="space-y-2.5">
        {roles.roles.map((r) => (
          <BarRow
            key={r.role}
            label={r.label}
            share={r.share}
            trailing={`${formatHours(r.hours_expected)} ч · ${Math.round(toPercent(r.share))}%`}
          />
        ))}
      </div>
    </ReportSectionCard>
  )
}
