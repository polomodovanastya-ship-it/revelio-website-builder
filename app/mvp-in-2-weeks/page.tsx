import type { Metadata } from 'next'
import { Rocket } from 'lucide-react'
import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { PriceBlock } from '@/components/price-block'
import { Contact } from '@/components/contact'

export const metadata: Metadata = {
  title: 'MVP за 2 недели',
  description: 'Разработка прототипов с LLM на базе 15+ лет опыта',
  alternates: { canonical: '/mvp-in-2-weeks' },
  openGraph: {
    title: 'MVP за 2 недели — Ревелио',
    url: '/mvp-in-2-weeks',
  },
}

export default function MvpIn2WeeksPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="УСЛУГА"
        title="MVP за 2 недели"
        icon={<Rocket className="h-12 w-12 text-primary" />}
        lead="Разработка прототипов с LLM на базе 15+ лет опыта."
      />

      <p className="mb-6 max-w-3xl text-base text-foreground/85">
        Собрать решение руками тех, кто делает это каждый месяц — а не тратить время на бесплодные эксперименты.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        {['AI-travel агент', 'Панель отчётов', 'Обсчётчик поставок', 'Консолидатор цен', 'Оркестратор скидок'].map((chip) => (
          <span key={chip} className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground">
            {chip}
          </span>
        ))}
      </div>

      <PriceBlock price="до 650 000 ₽" unit="/ за работающий прототип" />

      <Contact />
    </PageContainer>
  )
}
