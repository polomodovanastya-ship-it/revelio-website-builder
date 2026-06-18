import { cn } from '@/lib/utils'

interface DefinitionListProps {
  children: React.ReactNode
  className?: string
}

export function DefinitionList({ children, className }: DefinitionListProps) {
  return (
    <dl className={cn('rounded-2xl border border-border bg-card p-6 md:p-8', className)}>
      {children}
    </dl>
  )
}

interface DefinitionRowProps {
  label: string
  value: React.ReactNode
}

export function DefinitionRow({ label, value }: DefinitionRowProps) {
  return (
    <div className="grid gap-1 border-b border-border py-3 last:border-b-0 md:grid-cols-[260px_1fr] md:gap-6">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  )
}
