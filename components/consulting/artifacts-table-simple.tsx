'use client'

import { useState } from 'react'
import { ChevronDown, ArrowDown } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { ARTIFACTS, type ArtifactGroup } from '@/lib/consulting-content'
import { TemplateRequestModal } from './template-request-modal'

function Group({
  group,
  defaultOpen,
  onRequestTemplate,
}: {
  group: ArtifactGroup
  defaultOpen?: boolean
  onRequestTemplate?: (name: string) => void
}) {
  const showRequest =
    (group.group === 'AS IS' || group.group === 'TO BE') && !!onRequestTemplate
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-2xl border border-border bg-card"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-base font-bold uppercase tracking-tight text-primary">
            {group.group}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {group.items.length} артефактов
          </span>
        </div>
        <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
      </summary>

      <ul className="divide-y divide-border border-t border-border">
        {group.items.map((a) => (
          <li
            key={a.name}
            className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm leading-snug text-foreground">{a.name}</div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                {a.result}
              </div>
            </div>
            {showRequest && (
              <button
                type="button"
                onClick={() => onRequestTemplate?.(a.name)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:text-[11px]"
                aria-label={`Запросить шаблон: ${a.name}`}
              >
                <ArrowDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Запросить шаблон</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

export function ArtifactsTableSimple() {
  const ref = useReveal<HTMLDivElement>()
  const [requested, setRequested] = useState<string | null>(null)

  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="reveal space-y-4">
          {ARTIFACTS.map((g) => (
            <Group
              key={g.group}
              group={g}
              defaultOpen
              onRequestTemplate={setRequested}
            />
          ))}
        </div>
      </div>

      <TemplateRequestModal
        open={requested !== null}
        onClose={() => setRequested(null)}
        artifactName={requested ?? ''}
      />
    </section>
  )
}
