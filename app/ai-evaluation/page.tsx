import type { Metadata } from 'next'
// Intro modal скрыт: лендинг сам по себе объясняет продукт, вся инфа есть инлайн
// в hero-карточке. Раскомментировать импорт и <LandingIntroModal /> ниже, если
// решим вернуть всплывающее окно.
// import { LandingIntroModal } from '@/components/ai-evaluation/landing-intro-modal'
import { LandingHero } from '@/components/ai-evaluation/landing-hero'
import { Dimensions } from '@/components/ai-evaluation/dimensions'
import { Personas } from '@/components/ai-evaluation/personas'
import { HowEstimationWorks } from '@/components/ai-evaluation/how-estimation-works'
import { ErrorsCaught } from '@/components/ai-evaluation/errors-caught'
import { RisksLimits } from '@/components/ai-evaluation/risks-limits'
import { Projects } from '@/components/ai-evaluation/projects'
import { FinalCta } from '@/components/ai-evaluation/final-cta'

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
      {/* <LandingIntroModal /> */}
      <LandingHero />
      <Dimensions />
      <Personas />
      <HowEstimationWorks />
      <ErrorsCaught />
      <RisksLimits />
      <Projects />
      <FinalCta />
    </main>
  )
}
