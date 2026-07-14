'use client'
import { useMemo } from 'react'
import { ChevronDown, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReportSectionCard, Badge, accuracyTone } from '../primitives'
import { formatNumber } from '@/lib/report-format'
import type { ReportDownloads, ReportTask } from '@/lib/report-api'

// 04 Детализация задач
export function TasksSection({
  tasks,
  downloads,
  onDownload,
  downloading,
}: {
  tasks: ReportTask[]
  downloads: ReportDownloads
  onDownload: (kind: 'pdf' | 'csv') => void
  downloading: 'pdf' | 'csv' | null
}) {
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
            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Задача
                    </th>
                    <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Min–Ожид–Max, ч
                    </th>
                    <th className="pb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      Точность
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {g.items.map((t, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="py-2.5 text-foreground">{t.title}</td>
                      <td className="py-2.5 text-muted-foreground">
                        {formatNumber(t.min)}–{formatNumber(t.expected)}–{formatNumber(t.max)}
                      </td>
                      <td className="py-2.5">
                        <Badge tone={accuracyTone(t.accuracy)}>{t.accuracy}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>
      {(downloads.csv || downloads.pdf) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {downloads.csv && (
            <Button variant="outline" onClick={() => onDownload('csv')} disabled={downloading !== null}>
              {downloading === 'csv' ? <Loader2 className="animate-spin" /> : <Download />}
              Скачать CSV
            </Button>
          )}
          {downloads.pdf && (
            <Button onClick={() => onDownload('pdf')} disabled={downloading !== null}>
              {downloading === 'pdf' ? <Loader2 className="animate-spin" /> : <Download />}
              Скачать PDF
            </Button>
          )}
        </div>
      )}
    </ReportSectionCard>
  )
}
