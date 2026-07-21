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
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px]">
          <div>
            <h1 className="mb-8 max-w-4xl text-balance font-heading text-2xl font-black uppercase leading-[1.15] tracking-[-0.02em] text-primary sm:text-4xl">
              Как выбрать CDP / Loyalty / Comms платформу в 2026?
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-foreground">
              Инструмент для анализа и выбора единой платформы:qы для управления клиентскими данными (CDP), омниканальных
              кампаний, лояльностью и промо с персонализацией
            </p>
          </div>
          <div className="relative hidden overflow-hidden rounded-2xl lg:block">
            <Image
              src={`https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${cdpIllustrationAsset.url}`}
              alt="Иллюстрация исследования CDP"
              width={1200}
              height={675}
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
            />
          </div>
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
