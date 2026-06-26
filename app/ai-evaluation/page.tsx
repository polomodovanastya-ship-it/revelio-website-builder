import type { Metadata } from 'next'
import { LandingIntroModal } from '@/components/ai-evaluation/landing-intro-modal'
import { LandingHero } from '@/components/ai-evaluation/landing-hero'
import { Dimensions } from '@/components/ai-evaluation/dimensions'
import { Personas } from '@/components/ai-evaluation/personas'
import { HowEstimationWorks } from '@/components/ai-evaluation/how-estimation-works'
import { ErrorsCaught } from '@/components/ai-evaluation/errors-caught'

export const metadata: Metadata = {
  title: 'AI-оценка ИТ-проектов как сервис',
  description:
    'Оценивай разработку любого ПО быстро и уверенно: загружаешь требования, отвечаешь на вопросы, получаешь детальную оценку с рисками и ограничениями.',
  alternates: { canonical: '/ai-evaluation' },
  openGraph: { title: 'AI-оценка-как-сервис — Ревелио', url: '/ai-evaluation' },
}

export default function AiEvaluationPage() {
  return (
    <main>
      <LandingIntroModal />
      <LandingHero />
      <Dimensions />
      <Personas />
      <HowEstimationWorks />
      <ErrorsCaught />
    </main>
  )
}
