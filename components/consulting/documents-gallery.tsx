import Image from 'next/image'

type Item = { src: string; alt: string }

const ASSET_HOST = 'https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app'

export function DocumentsGallery({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((it, idx) => (
        <div
          key={it.src}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <Image
            src={`${ASSET_HOST}${it.src}`}
            alt={it.alt}
            width={400}
            height={225}
            className="block aspect-video h-auto w-full object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
            priority={idx < 2}
          />
        </div>
      ))}
    </div>
  )
}
