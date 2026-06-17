'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Cases } from '@/components/cases'
import { Clients } from '@/components/clients'
import { Services } from '@/components/services'
import { Team } from '@/components/team'
import { Process } from '@/components/process'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { EstimatorDialog } from '@/components/estimator-dialog'

export default function Page() {
  const [estimatorOpen, setEstimatorOpen] = useState(false)
  const openEstimator = () => setEstimatorOpen(true)

  return (
    <>
      <SiteHeader onEstimate={openEstimator} />
      <main>
        <Hero onEstimate={openEstimator} />
        <Cases />
        <Clients />
        <Services onEstimate={openEstimator} />
        <Team />
        <Process />
        <Contact />
      </main>
      <SiteFooter onEstimate={openEstimator} />
      <EstimatorDialog open={estimatorOpen} onClose={() => setEstimatorOpen(false)} />
    </>
  )
}
