import { ArrowRight } from 'lucide-react'

interface PriceBlockProps {
  price?: string
  unit?: string
  text?: string
  ctaLabel?: string
  ctaHref?: string
}

export function PriceBlock({
  price,
  unit,
  text,
  ctaLabel = 'Отправить заявку',
  ctaHref = '#contact',
}: PriceBlockProps) {
  return (
    <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
      {text ? (
        <p className="max-w-xl text-sm text-foreground/85">{text}</p>
      ) : (
        <div>
          <div className="text-xl font-bold text-primary md:text-2xl">{price}</div>
          {unit && <div className="text-xs text-muted-foreground">{unit}</div>}
        </div>
      )}
      <a
        href={ctaHref}
        className="inline-flex items-center justify-between gap-3 rounded-lg bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
      >
        <span>{ctaLabel}</span>
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}
