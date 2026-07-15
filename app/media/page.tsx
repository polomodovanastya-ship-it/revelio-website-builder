import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { MediaCard } from '@/components/media-card'
import { MEDIA_ITEMS } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Медиа',
  description:
    'Публичная экспертиза Ревелио: рыночные исследования, статьи в деловых СМИ и подкасты команды.',
  path: '/media',
})

export default function MediaPage() {
  return (
    <PageContainer width="wide">
      <PageHero
        eyebrow="МЕДИА"
        title="Исследования, статьи и подкасты"
        lead="Открытые материалы команды: рыночные исследования, публикации в деловых СМИ и подкасты с участием наших консультантов."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MEDIA_ITEMS.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </PageContainer>
  )
}
