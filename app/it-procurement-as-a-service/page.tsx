import { ShieldCheck } from 'lucide-react'
import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { ServiceFeatureCard } from '@/components/service-card'
import { PriceBlock } from '@/components/price-block'
import { Contact } from '@/components/contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'ИТ-закупки как сервис',
  description:
    'Независимая проверка ИТ-поставщиков глазами интегратора: технический и коммерческий скоринг, аудит ТЗ и SLA, сопровождение тендера до подписания договора.',
  path: '/it-procurement-as-a-service',
})

export default function ItProcurementPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="УСЛУГА"
        title="ИТ-закупки как сервис"
        icon={<ShieldCheck className="h-12 w-12 text-primary" />}
        lead="Проверить поставщиков глазами интегратора."
      />

      <div className="mb-12 grid gap-4 md:grid-cols-2">
        <ServiceFeatureCard
          title="Технический скоринг"
          description="Проверим стек, архитектуру и реальные кейсы исполнителя"
        />
        <ServiceFeatureCard
          title="Коммерческий скоринг"
          description="Сравним предложения по TCO, рискам и зрелости команды"
        />
        <ServiceFeatureCard
          title="Аудит ТЗ и SLA"
          description="Найдём дыры в требованиях до подписания договора"
        />
        <ServiceFeatureCard
          title="Сопровождение тендера"
          description="Поможем провести защиту и согласование с CFO/CIO"
        />
      </div>

      <PriceBlock text="Независимая экспертиза на стороне заказчика — без аффилиации с подрядчиками." />

      <Contact />
    </PageContainer>
  )
}
