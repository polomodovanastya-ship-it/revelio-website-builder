import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toPercent } from '@/lib/report-format'

export function ReportSectionCard({
  number,
  icon: Icon,
  title,
  children,
}: {
  number?: string
  icon?: LucideIcon
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-tight text-primary">
        {number ? (
          <span className="font-mono text-xs font-normal normal-case tracking-wide text-accent">
            {number}
          </span>
        ) : Icon ? (
          <Icon className="h-4 w-4 text-accent" />
        ) : null}
        {title}
      </h2>
      {children}
    </section>
  )
}

export function StatTile({
  value,
  label,
  highlight,
}: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div className={cn('rounded-xl p-4', highlight ? 'bg-accent/10' : 'bg-muted')}>
      <div
        className={cn(
          'font-heading text-2xl font-extrabold',
          highlight ? 'text-accent' : 'text-primary'
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  )
}

export function BarRow({
  label,
  share,
  trailing,
}: {
  label: string
  share: number
  trailing?: string
}) {
  const pct = toPercent(share)
  return (
    <div className="grid grid-cols-1 items-center gap-1.5 text-sm sm:grid-cols-[minmax(0,200px)_1fr_auto] sm:gap-3">
      <span className="text-foreground">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <span className="whitespace-nowrap text-xs font-semibold text-muted-foreground sm:text-right">
        {trailing ?? `${Math.round(pct)}%`}
      </span>
    </div>
  )
}

type Tone = 'accent' | 'muted' | 'destructive'

const toneClasses: Record<Tone, string> = {
  accent: 'bg-accent/10 text-accent',
  muted: 'bg-muted text-muted-foreground',
  destructive: 'bg-destructive/10 text-destructive',
}

export function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        toneClasses[tone]
      )}
    >
      {children}
    </span>
  )
}

// Точность задачи/группы: выше — лучше.
export function accuracyTone(level: string): Tone {
  const l = level.toLowerCase()
  if (l.includes('выс')) return 'accent'
  if (l.includes('низ')) return 'destructive'
  return 'muted'
}

// Влияние риска: выше — хуже.
export function impactTone(level: string): Tone {
  const l = level.toLowerCase()
  if (l.includes('выс')) return 'destructive'
  if (l.includes('низ')) return 'accent'
  return 'muted'
}
