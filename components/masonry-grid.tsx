'use client'

import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import MasonryBase, { ResponsiveMasonry, type MasonryProps } from 'react-responsive-masonry'

// The library supports `sequential` at runtime but omits it from its TS types.
const Masonry = MasonryBase as ComponentType<MasonryProps & { sequential?: boolean }>

// Breakpoints mirror the old Tailwind classes (md:columns-2 → 768px, lg:columns-3 → 1024px).
const COLUMNS_BREAKPOINTS = { 0: 1, 768: 2, 1024: 3 }
// 20px == the old `gap-5` column gap and `mb-5` row gap.
// The library's TS types annotate gutter values as number, but at runtime the
// value is used verbatim as a CSS gap string — "20px" is what we want.
const GUTTER_BREAKPOINTS = { 0: '20px' } as unknown as Record<number, number>

/**
 * Cross-browser masonry grid.
 *
 * Replaces CSS multi-column masonry (`columns-*` + `break-inside-avoid`), which
 * leaves gaps and stripes in Safari/WebKit — its balancing of unbreakable
 * columns is unreliable there (Chrome happens to be forgiving). This lays items
 * out in flexbox columns and packs by measured height, so the result is
 * identical in every browser.
 *
 * SSR/hydration: ResponsiveMasonry reads window.innerWidth on the client but
 * renders a single column on the server, so mounting it directly would trigger
 * a React hydration mismatch. We render a plain responsive CSS grid until
 * mounted (identical markup on server and first client render), then swap to
 * masonry. These sections sit below the fold, so the swap is never seen on load.
 */
// `sequential` places item i into column i % columns instead of the shortest
// column, so a hand-picked order maps to fixed columns.
export function MasonryGrid({
  children,
  sequential = false,
}: {
  children: ReactNode
  sequential?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    )
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={COLUMNS_BREAKPOINTS}
      gutterBreakPoints={GUTTER_BREAKPOINTS}
    >
      <Masonry gutter="20px" sequential={sequential}>
        {children}
      </Masonry>
    </ResponsiveMasonry>
  )
}
