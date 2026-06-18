import type { Metadata } from 'next'
import { Hero } from '@/components/hero'
import { Cases } from '@/components/cases'
import { Clients } from '@/components/clients'
import { Services } from '@/components/services'
import { Team } from '@/components/team'
import { Process } from '@/components/process'
import { ReportsSection } from '@/components/reports-section'
import { RESEARCH_ENABLED } from '@/lib/reports'
import { Contact } from '@/components/contact'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Page() {
  return (
    <>
      <Hero />
      <Cases />
      <Clients />
      <Services />
      <Team />
      <Process />
      {RESEARCH_ENABLED && <ReportsSection />}
      <Contact />
    </>
  )
}
