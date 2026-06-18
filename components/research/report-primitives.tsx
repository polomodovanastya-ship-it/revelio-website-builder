import type { LucideIcon } from 'lucide-react'
import type { ReportAccess } from '@/lib/reports'

export function ReportEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{children}</span>
  )
}

export function ReportHero({
  badge,
  title,
  subtitle,
  lead,
}: {
  badge: string
  title: string
  subtitle?: string
  lead?: string
}) {
  return (
    <div className="mb-12">
      <ReportEyebrow>[ {badge} ]</ReportEyebrow>
      <h1 className="mt-3 text-balance font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {subtitle}
        </p>
      )}
      {lead && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground">{lead}</p>}
    </div>
  )
}

export function ReportHeroLead({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground">{children}</p>
}

export function StatRow({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          {item}
        </span>
      ))}
    </p>
  )
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="font-heading text-4xl font-extrabold text-primary">{value}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</div>
    </div>
  )
}

export function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon?: LucideIcon
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {Icon && <Icon className="mb-3 h-6 w-6 text-accent" />}
      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export function ParticipantChip({ name, dotColor }: { name: string; dotColor?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm">
      {dotColor && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
      )}
      {name}
    </span>
  )
}

export function ReportSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground">{children}</div>
    </section>
  )
}

export function ReportCTA({ access, openLabel = 'Запросить' }: { access: ReportAccess; openLabel?: string }) {
  const href = access === 'gated' ? '/#contacts' : '/#contact'
  const label = access === 'gated' ? 'Запросить доступ' : openLabel
  return (
    <a
      href={href}
      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground hover:bg-primary"
    >
      {label}
    </a>
  )
}
