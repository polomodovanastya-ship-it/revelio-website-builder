import Image from 'next/image'
import { pageMetadata } from '@/lib/seo'
import { ArtifactsTableSimple } from '@/components/consulting/artifacts-table-simple'
import { Contact } from '@/components/contact'
import raci from '@/src/assets/RACI.png.asset.json'
import gantt from '@/src/assets/GANTT.png.asset.json'
import processMap from '@/src/assets/Process_map.png.asset.json'
import processEval from '@/src/assets/Process_evaluation.png.asset.json'

export const metadata = pageMetadata({
  title: '27 шаблонов документов консалтинга',
  description:
    'Скачивайте и пользуйтесь документами, которые помогут упорядочить хаос в команде и процессах.',
  path: '/consulting-documents',
})

const GALLERY = [
  { src: raci.url, alt: 'RACI матрица ролей и ответственности' },
  { src: gantt.url, alt: 'GANTT — план-график проекта' },
  { src: processMap.url, alt: 'Карта бизнес-процессов' },
  { src: processEval.url, alt: 'Оценка зрелости процессов' },
]

export default function ConsultingDocumentsPage() {
  return (
    <main>
      <section className="border-b border-border pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            [ ШАБЛОНЫ ]
          </span>
          <h1 className="mt-5 max-w-4xl text-balance font-heading text-2xl font-black uppercase leading-[1.15] tracking-[-0.02em] text-primary sm:text-4xl">
            Скачивайте и пользуйтесь документами, которые помогут вам упорядочить хаос в команде и процессах
          </h1>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {GALLERY.map((g) => (
              <figure
                key={g.src}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={900}
                  className="block h-auto w-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ArtifactsTableSimple />
      <Contact />
    </main>
  )
}
