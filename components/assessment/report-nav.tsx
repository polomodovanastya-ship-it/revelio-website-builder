'use client'

export interface ReportNavItem {
  id: string
  label: string
}

// Sticky left-side quick-anchor menu. Hidden below lg — sections just stack
// on narrower screens. Data-driven: report-view only passes anchors for
// sections it actually rendered.
export function ReportNav({ items }: { items: ReportNavItem[] }) {
  if (items.length === 0) return null

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Разделы отчёта" className="hidden lg:block">
      <div className="sticky top-24 space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-accent active:text-accent"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
