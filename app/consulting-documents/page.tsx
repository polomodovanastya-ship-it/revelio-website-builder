import { pageMetadata } from '@/lib/seo'
import { ArtifactsTableSimple } from '@/components/consulting/artifacts-table-simple'
import { Contact } from '@/components/contact'
import { DocumentsGallery } from '@/components/consulting/documents-gallery'
import raci from '@/src/assets/RACI.png.asset.json'
import gantt from '@/src/assets/GANTT.png.asset.json'
import processMap from '@/src/assets/Process_map.png.asset.json'
import processEval from '@/src/assets/Process_evaluation.png.asset.json'

export const metadata = pageMetadata({
  title: '27 шаблонов документов консалтинга',
  description:
    'Скачивайте и пользуйтесь документами, которые помогут вам упорядочить хаос в команде и процессах',
  path: '/consulting-documents',
})

const GALLERY = [
  { src: gantt.url, alt: 'GANTT — план-график проекта' },
  { src: raci.url, alt: 'RACI матрица ролей и ответственности' },
  { src: processMap.url, alt: 'Карта бизнес-процессов' },
  { src: processEval.url, alt: 'Оценка зрелости процессов' },
]

export default function ConsultingDocumentsPage() {
  return (
    <main>
      <section className="pt-28 pb-6 sm:pt-36 sm:pb-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            [ ШАБЛОНЫ ]
          </span>
          <h1 className="mt-5 max-w-4xl text-balance font-heading text-2xl font-black uppercase leading-[1.15] tracking-[-0.02em] text-primary sm:text-4xl">
            <span className="text-accent">+27 шаблонов</span> документов консалтинга
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Скачивайте и пользуйтесь документами, которые помогут вам упорядочить хаос в команде и процессах
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <DocumentsGallery items={GALLERY} />
        </div>
      </section>

      <ArtifactsTableSimple />
      <Contact />
    </main>
  )
}
