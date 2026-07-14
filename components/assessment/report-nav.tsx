'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface ReportNavItem {
  id: string
  label: string
}

// Sticky left-side quick-anchor menu. Hidden below lg — sections just stack
// on narrower screens. Data-driven: report-view only passes anchors for
// sections it actually rendered. Highlights whichever section is currently
// in view (scroll-spy) via IntersectionObserver.
export function ReportNav({ items }: { items: ReportNavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const visibleIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id)
          } else {
            visibleIds.current.delete(entry.target.id)
          }
        }
        // Among sections currently in the active band, the one deepest in
        // document order is the one most recently scrolled to — that's the
        // conventional scroll-spy "current" section.
        const current = items.map((i) => i.id).filter((id) => visibleIds.current.has(id))
        if (current.length > 0) setActiveId(current[current.length - 1])
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Разделы отчёта" className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block rounded-lg border-l-2 px-3 py-2 text-sm transition-colors',
                active
                  ? 'border-accent bg-muted font-medium text-accent'
                  : 'border-transparent text-muted-foreground hover:bg-muted hover:text-accent'
              )}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
