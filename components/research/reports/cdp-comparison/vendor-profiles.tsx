// components/research/reports/cdp-comparison/vendor-profiles.tsx
import { Minus, FileText, Link as LinkIcon, Building2, ClipboardList } from 'lucide-react'
import type { VendorResources } from '@/lib/cdp-research-data'
import { VENDOR_PROFILES, HONORABLE_MENTIONS } from '@/lib/cdp-research-data'

function ResourceHeader({ resources }: { resources?: VendorResources }) {
  const items = [
    { key: 'docs', label: 'Документация', icon: FileText, href: resources?.docs },
    { key: 'api', label: 'API', icon: LinkIcon, href: resources?.api },
    { key: 'cases', label: 'Кейсы', icon: Building2, href: resources?.cases },
    { key: 'sla', label: 'SLA', icon: ClipboardList, href: resources?.sla },
  ] as const

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border/50 py-3">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        [ Ресурсы ]
      </span>
      {items.map(({ key, label, icon: Icon, href }) => {
        const content = (
          <>
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
          </>
        )
        return href ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            {content}
          </a>
        ) : (
          <span
            key={key}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            {content}
          </span>
        )
      })}
    </div>
  )
}

function ProfileCard({
  name,
  score,
  resources,
  pros,
  cons,
}: {
  name: string
  score?: number
  resources?: VendorResources
  pros: string[]
  cons: string[]
}) {

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_18px_44px_-24px_rgba(20,37,80,0.30)] md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <h3 className="font-heading text-3xl font-extrabold leading-none tracking-tight text-primary md:text-4xl">
          {name}
        </h3>
        {score !== undefined && (
          <span className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-1.5 font-heading text-lg font-extrabold italic text-accent-foreground">
            {score}
          </span>
        )}
      </div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        <div>
          <span className="mb-4 block select-none font-heading text-5xl font-extrabold leading-none text-primary">
            +
          </span>
          <ul className="list-disc space-y-3 pl-5">
            {pros.map((p) => (
              <li key={p} className="text-sm leading-snug text-foreground md:text-base">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Minus className="mb-4 h-12 w-12 text-accent" strokeWidth={2.5} />
          <ul className="list-disc space-y-3 pl-5">
            {cons.map((c) => (
              <li key={c} className="text-sm leading-snug text-foreground md:text-base">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function VendorProfiles() {
  return (
    <section className="mb-16 space-y-8">
      {VENDOR_PROFILES.map((v) => (
        <ProfileCard key={v.name} {...v} />
      ))}
      <div className="space-y-8">
        <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-muted-foreground">
          И ещё (Honorable mentions)
        </h3>
        {HONORABLE_MENTIONS.map((v) => (
          <ProfileCard key={v.name} {...v} />
        ))}
      </div>
    </section>
  )
}
