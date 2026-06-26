import type { Metadata } from 'next'
import { PageContainer } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'AI-оценка ИТ-проектов как сервис',
  description:
    'Оценивай разработку любого ПО быстро и уверенно: загружаешь требования, отвечаешь на вопросы, получаешь детальную оценку с рисками и ограничениями.',
  alternates: { canonical: '/ai-evaluation' },
  openGraph: { title: 'AI-оценка-как-сервис — Ревелио', url: '/ai-evaluation' },
}

export default function AiEvaluationPage() {
  return (
    <PageContainer>
      <h1 className="font-heading text-3xl font-extrabold uppercase text-primary">
        AI-оценка-как-сервис
      </h1>
    </PageContainer>
  )
}
