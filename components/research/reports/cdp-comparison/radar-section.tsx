'use client'

import { useState } from 'react'
import { ReportRadar, type RadarSeries } from '@/components/research/report-radar'
import { RADAR_AXES, radarSeriesFor, type VendorGroup } from '@/lib/cdp-research-data'

function RadarGroup({
  title,
  subtitle,
  group,
}: {
  title: string
  subtitle: string
  group: VendorGroup
}) {
  const allSeries = radarSeriesFor(group)
  const [visible, setVisible] = useState<Set<string>>(new Set(allSeries.map((s) => s.name)))

  const toggle = (name: string) => {
    setVisible((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const filtered: RadarSeries[] = allSeries.filter((s) => visible.has(s.name))

  return (
    <div>
      <h3 className="mb-6">
        <span className="block font-heading text-2xl font-bold leading-tight text-primary md:text-3xl">{title}</span>
        <span className="mt-1 block font-heading text-xl font-medium leading-tight text-primary md:text-2xl">
          {subtitle}
        </span>
      </h3>
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <ReportRadar axes={RADAR_AXES} series={filtered} max={10} />
        <div className="mt-4 flex flex-wrap gap-3">
          {allSeries.map((s) => (
            <label key={s.name} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={visible.has(s.name)}
                onChange={() => toggle(s.name)}
                className="h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="font-medium text-foreground">{s.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export function RadarSection() {
  return (
    <section className="mb-16 grid gap-8 md:grid-cols-2">
      <RadarGroup title="Onprem:" subtitle="для enterprise и крупного бизнеса" group="onprem" />
      <RadarGroup title="Cloud-first:" subtitle="для среднего и крупного бизнеса" group="cloud" />
      <p className="text-xs leading-relaxed text-muted-foreground md:col-span-2">
        Сегмент «Комьюнити и обучение» — экспертная оценка на основе открытых данных о вендорах, не входит в
        балльную систему 150+ критериев.
      </p>
    </section>
  )
}
