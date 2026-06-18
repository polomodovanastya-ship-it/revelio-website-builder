interface PageHeroProps {
  eyebrow: string
  title: string
  lead?: string
  subtitle?: string
  icon?: React.ReactNode
}

export function PageHero({ eyebrow, title, lead, subtitle, icon }: PageHeroProps) {
  return (
    <div className="mb-12">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        [ {eyebrow} ]
      </span>
      <div className="mt-3 flex items-start gap-4">
        {icon && <div className="shrink-0">{icon}</div>}
        <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
          {title}
        </h1>
      </div>
      {lead && (
        <p className="mt-6 max-w-3xl text-lg text-primary/85 sm:text-xl">{lead}</p>
      )}
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
