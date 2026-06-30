import { pageMetadata } from '@/lib/seo'
import { ConsultingHero } from '@/components/consulting/consulting-hero'
import { WorkFormats } from '@/components/consulting/work-formats'
import { ArtifactsTable } from '@/components/consulting/artifacts-table'
import { Metrics } from '@/components/consulting/metrics'
import { SolutionClasses } from '@/components/consulting/solution-classes'
import { Contact } from '@/components/contact'

export const metadata = pageMetadata({
  title: 'ИТ / бизнес-консалтинг для снижения OPEX',
  description:
    'Консалтинг AS IS → TO BE: быстрый аудит и проверка на цифрах. Бизнес-процессы, ИТ-системы, клиентские пути, рекомендации и оценка изменений.',
  path: '/consulting',
})

export default function ConsultingPage() {
  return (
    <main>
      <ConsultingHero />
      <WorkFormats />
      <Metrics />
      <SolutionClasses />
      <ArtifactsTable />
      <Contact />
    </main>
  )
}
