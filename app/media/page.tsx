import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageContainer } from '@/components/page-shell'
import { MediaCard } from '@/components/media-card'
import { MasonryGrid } from '@/components/masonry-grid'
import { MEDIA_ITEMS } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Журнал',
  description:
    'Открытые материалы команды Revelio по рынкам (eCom, Retail, Finance, Telco, Travel) и доменам (Marcom, CX, ITSM, HR, Data).',
  path: '/media',
  ogTitle: 'Revelio – Журнал (статьи, исследования, подкасты)',
  ogImage: '/og-media.png',
})

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M9.78 15.27 9.62 19c.46 0 .66-.2.9-.44l2.16-2.06 4.48 3.28c.82.45 1.4.21 1.62-.76l2.94-13.77c.28-1.24-.45-1.73-1.25-1.43L2.4 9.36c-1.21.47-1.19 1.14-.21 1.44l4.5 1.4 10.44-6.58c.49-.31.94-.14.57.2z" />
    </svg>
  )
}

export default function MediaPage() {
  return (
    <PageContainer width="wide">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>
      <div className="mt-8 mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ МЕДИА ]
        </span>
        <h1 className="mt-3 font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
          Журнал
        </h1>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-base text-primary/85 sm:text-lg">
            Открытые материалы команды: рыночные исследования, публикации и подкасты
          </p>
          <a
            href="https://t.me/revelio_tech"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary/30 hover:bg-muted hover:text-accent"
          >
            Больше контента в tg-канале
            <TelegramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <MasonryGrid>
        {MEDIA_ITEMS.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </MasonryGrid>
    </PageContainer>
  )
}
