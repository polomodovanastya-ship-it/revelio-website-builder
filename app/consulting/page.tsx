import type { Metadata } from 'next'
import { ConsultingHero } from '@/components/consulting/consulting-hero'
import { WorkFormats } from '@/components/consulting/work-formats'
import { Contact } from '@/components/contact'

export const metadata: Metadata = {
  title: 'Консалтинг',
  description:
    'Консалтинг AS IS → TO BE: быстрый аудит и проверка на цифрах. Бизнес-процессы, ИТ-системы, клиентские пути, рекомендации и оценка изменений.',
  alternates: { canonical: '/consulting' },
  openGraph: {
    title: 'Консалтинг — Ревелио',
    url: '/consulting',
  },
}

export default function ConsultingPage() {
  return (
    <main>
      <ConsultingHero />
      <WorkFormats />
      <Contact />
    </main>
  )
}
