import { pageMetadata } from '@/lib/seo'
// Intro modal скрыт: лендинг сам по себе объясняет продукт, вся инфа есть инлайн
// в hero-карточке. Раскомментировать импорт и <LandingIntroModal /> ниже, если
// решим вернуть всплывающее окно.
// import { LandingIntroModal } from '@/components/ai-evaluation/landing-intro-modal'
import { LandingHero } from '@/components/ai-evaluation/landing-hero'
import { Dimensions } from '@/components/ai-evaluation/dimensions'
import { OnboardingPath } from '@/components/ai-evaluation/onboarding-path'
import { Personas } from '@/components/ai-evaluation/personas'
import { HowEstimationWorks } from '@/components/ai-evaluation/how-estimation-works'
import { ErrorsCaught } from '@/components/ai-evaluation/errors-caught'
import { RisksLimits } from '@/components/ai-evaluation/risks-limits'
import { Projects } from '@/components/ai-evaluation/projects'
import { FinalCta } from '@/components/ai-evaluation/final-cta'
import { TrackGoalOnMount } from '@/components/funnel-tracking'

export const metadata = pageMetadata({
  title: 'AI-оценка ИТ-проектов как сервис',
  description:
    'Оцени разработку ИТ-продукта за 3-5 минут: загрузи требования – ответь на вопросы – получи трудозатраты, ресурсный план, риски и ограничения.',
  path: '/ai-evaluation',
  ogImage: '/og-ai-evaluation.png',
})

export default function AiEvaluationPage() {
  return (
    <main>
      <TrackGoalOnMount goal="eval_landing" />
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
