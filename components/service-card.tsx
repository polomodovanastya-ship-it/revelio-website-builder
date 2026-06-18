interface ServiceFeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function ServiceFeatureCard({ title, description, icon }: ServiceFeatureCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1">
      {icon && <div className="mb-3">{icon}</div>}
      <h3 className="mb-2 font-heading text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
