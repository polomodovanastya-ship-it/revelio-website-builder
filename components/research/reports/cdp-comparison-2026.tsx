'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import cdpIllustrationAsset from '@/src/assets/CDP_illustration_1.png.asset.json'
import { Audience } from './cdp-comparison/audience'
import { QuestionsGrid } from './cdp-comparison/questions-grid'
import { StatsBlock } from './cdp-comparison/stats-block'
import { LeadGate } from './cdp-comparison/lead-gate'
import { Methodology } from './cdp-comparison/methodology'
import { Participants } from './cdp-comparison/participants'
import { RadarSection } from './cdp-comparison/radar-section'
import { Recommendations } from './cdp-comparison/recommendations'
import { VendorProfiles } from './cdp-comparison/vendor-profiles'
import { HeatmapTable } from './cdp-comparison/heatmap-table'
import { WhenToImplement } from './cdp-comparison/when-to-implement'
import { DemoChecklist } from './cdp-comparison/demo-checklist'

const UNLOCK_KEY = 'cdp-research-unlocked'

export function CdpComparison2026Body() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const previewFull = new URLSearchParams(window.location.search).get('preview') === 'full'
    if (previewFull || sessionStorage.getItem(UNLOCK_KEY) === '1') setUnlocked(true)
  }, [])

  const handleUnlock = () => {
    sessionStorage.setItem(UNLOCK_KEY, '1')
    setUnlocked(true)
  }

  return (
    <>
      <div className="relative -mx-5 mb-12 overflow-hidden px-5 pb-2 pt-2 sm:-mx-8 sm:px-8">
        <div
          aria-hidden
          className="blueprint pointer-events-none absolute inset-0 [background-size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />
        <div className="relative">
          <h1 className="mb-8 text-balance font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
            Как выбрать CDP / Loyalty / Comms платформу в 2026?
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground">
            Инструмент для анализа и выбора единой платформы для управления клиентскими данными (CDP), омниканальных
            кампаний, лояльностью и промо с персонализацией.
          </p>
        </div>
      </div>

      <Audience />
      <QuestionsGrid />
      <StatsBlock />

      <div className="mb-16">
        {unlocked ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-center font-mono text-sm uppercase tracking-wider text-accent md:p-8">
            Исследование открыто — листайте дальше
          </p>
        ) : (
          <LeadGate onUnlock={handleUnlock} />
        )}
      </div>

      {unlocked && (
        <>
          <Methodology />
          <Participants />
          <RadarSection />
          <Recommendations />
          <VendorProfiles />
          <HeatmapTable />
          <WhenToImplement />
          <DemoChecklist />
        </>
      )}
    </>
  )
}
