import { cn } from '@/lib/utils'

interface ProseSectionProps {
  heading?: string
  children: React.ReactNode
  className?: string
}

export function ProseSection({ heading, children, className }: ProseSectionProps) {
  return (
    <section className={cn('mb-12', className)}>
      {heading && (
        <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
          {heading}
        </h2>
      )}
      <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
        {children}
      </div>
    </section>
  )
}
