import type { Metadata } from 'next'
import { Compass } from 'lucide-react'
import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { ServiceFeatureCard } from '@/components/service-card'
import { PriceBlock } from '@/components/price-block'
import { Contact } from '@/components/contact'

export const metadata: Metadata = {
  title: 'Консалтинг',
  description: 'Бизнес-процессы * CJM * БТ/ФТ/ТЗ * Роли * TCO/ROI и др.',
  alternates: { canonical: '/consulting' },
  openGraph: {
    title: 'Консалтинг — Ревелио',
    url: '/consulting',
  },
}

export default function ConsultingPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="УСЛУГА"
        title="Консалтинг"
        icon={<Compass className="h-12 w-12 text-primary" />}
        lead="Бизнес-процессы · CJM · БТ/ФТ/ТЗ · Роли · TCO/ROI и др."
        subtitle="Редкие эксперты и секретные знания для принятия решений. 2-е мнение помогает пройти путь от признания проблемы до TCO, а по итогам изменения — к ROI."
      />

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <ServiceFeatureCard
          title="Анализ"
          description="Анализ процессов, поиск причин потерь"
        />
        <ServiceFeatureCard
          title="Проектирование"
          description="Проектирование изменений: бизнес и ИТ"
        />
        <ServiceFeatureCard
          title="Внедрение"
          description="Внедрение улучшений и сопровождение"
        />
      </div>

      <PriceBlock price="от 345 000 ₽" unit="/ 1 неделя" />

      <Contact />
    </PageContainer>
  )
}
