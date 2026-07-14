'use client'
import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import { formatHours } from '@/lib/report-format'
import type { ReportTask } from '@/lib/report-api'

const thBase = 'py-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground'

// 04 Детализация задач
export function TasksSection({ tasks }: { tasks: ReportTask[] }) {
  const groups = useMemo(() => {
    const order: string[] = []
    const byGroup = new Map<string, ReportTask[]>()
    for (const t of tasks) {
      if (!byGroup.has(t.group)) {
        byGroup.set(t.group, [])
        order.push(t.group)
      }
      byGroup.get(t.group)!.push(t)
    }
    return order.map((name) => ({ name, items: byGroup.get(name)! }))
  }, [tasks])

  return (
    <ReportSectionCard number="04" title="Детализация задач">
      <div className="space-y-2">
        {groups.map((g) => (
          <details key={g.name} className="group rounded-xl border border-border bg-background">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-foreground marker:content-none">
              <span>
                {g.name} · {g.items.length} задач
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <div className="overflow-hidden rounded-xl border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className={`${thBase} w-full text-left`}>Задача</th>
                        <th className={`${thBase} whitespace-nowrap text-right`}>Min–Ожид–Max, ч</th>
                        <th className={`${thBase} whitespace-nowrap text-left`}>Точность</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {g.items.map((t, i) => (
                        <tr key={i} className="transition-colors hover:bg-muted/30">
                          <td className="px-3 py-3.5 text-foreground">{t.title}</td>
                          <td className="whitespace-nowrap px-3 py-3.5 text-right tabular-nums">
                            <span className="text-muted-foreground">{formatHours(t.min)}</span>
                            <span className="text-muted-foreground">–</span>
                            <span className="font-semibold text-foreground">{formatHours(t.expected)}</span>
                            <span className="text-muted-foreground">–</span>
                            <span className="text-muted-foreground">{formatHours(t.max)}</span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3.5">
                            <Badge tone={accuracyTone(t.accuracy)}>{t.accuracy}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </ReportSectionCard>
  )
}
