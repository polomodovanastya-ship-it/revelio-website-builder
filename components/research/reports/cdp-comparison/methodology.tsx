// components/research/reports/cdp-comparison/methodology.tsx
import { Download } from 'lucide-react'
import { METHODOLOGY_XLSX_HREF } from '@/lib/cdp-research-data'

export function Methodology() {
  return (
    <section className="mb-16">
      <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
        [ Методология ]
      </span>
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:p-8">
        <div className="md:w-1/3">
          <h3 className="font-heading text-lg font-bold leading-snug text-primary md:text-xl">
            Методология и список критериев
          </h3>
        </div>
        <p className="text-sm leading-snug text-muted-foreground md:flex-1 md:text-base">
          150+ критериев и балльная система.
          <br />
          Можно дополнить своими или использовать «как есть»
        </p>
        <a
          href={METHODOLOGY_XLSX_HREF}
          download
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
        >
          Скачать .xlsx
          <Download className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
