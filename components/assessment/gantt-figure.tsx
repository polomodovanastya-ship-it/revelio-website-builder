'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Thin CLIENT wrapper around the (server-rendered, hook-free) EstimateGantt SVG.
// Adds two things the pure SVG can't: grab-to-pan horizontal scrolling and a
// styled, instant tooltip. Both work by event delegation on the scroll
// container — the SVG bars carry `data-tip` / `data-tip-sub`, so this wrapper
// stays agnostic of the chart's internals. Accessibility is covered by the
// SVG's aria-label plus the "Таблица плана" HTML table rendered alongside.
//
// Pointer model:
//   mouse — hover shows the tip; press-drag pans the scroller.
//   touch — native momentum scroll (touchAction: pan-x/pan-y); a TAP (press
//           without a scroll swipe) toggles the tip for the bar under the
//           finger, and a press outside the chart dismisses it.

type Tip = { label: string; sub: string; rel: string; x: number; y: number }

const TIP_W = 260 // keep in sync with maxWidth below, for edge flipping
const TAP_SLOP = 10 // px of movement still counted as a tap (not a scroll)

function placeTip(clientX: number, clientY: number) {
  // Flip near the right/bottom viewport edges so the tip stays on-screen.
  const x = clientX + 14 + TIP_W > window.innerWidth ? clientX - 14 - TIP_W : clientX + 14
  const y = clientY + 16 + 72 > window.innerHeight ? clientY - 16 - 72 : clientY + 16
  return { x, y }
}

function tipFromEl(el: Element | null | undefined): { label: string; sub: string; rel: string } | null {
  const bar = el?.closest?.('[data-tip]')
  if (!bar) return null
  return {
    label: bar.getAttribute('data-tip') ?? '',
    sub: bar.getAttribute('data-tip-sub') ?? '',
    rel: bar.getAttribute('data-tip-rel') ?? '',
  }
}

export function GanttFigure({ children }: { children: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const tapStart = useRef({ x: 0, y: 0 })
  const [grabbing, setGrabbing] = useState(false)
  const [tip, setTip] = useState<Tip | null>(null)

  // Dismiss a tap-triggered tooltip when the user presses anywhere outside the
  // chart (a press inside is handled by onPointerDown below).
  useEffect(() => {
    if (!tip) return
    const onDocDown = (e: PointerEvent) => {
      if (!scroller.current?.contains(e.target as Node)) setTip(null)
    }
    document.addEventListener('pointerdown', onDocDown)
    return () => document.removeEventListener('pointerdown', onDocDown)
  }, [tip])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setTip(null) // any new press dismisses the current tip
    if (e.pointerType === 'mouse') {
      if (e.button !== 0) return
      const el = scroller.current
      if (!el) return
      drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft }
      setGrabbing(true)
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* capture is best-effort */
      }
    } else {
      // touch / pen: remember the origin to tell a tap from a scroll swipe.
      tapStart.current = { x: e.clientX, y: e.clientY }
    }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current
    if (drag.current.active && el) {
      el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX)
      return
    }
    // Touch shows the tip on tap (pointerup), never on move — otherwise it would
    // flicker under the finger during a scroll swipe.
    if (e.pointerType !== 'mouse') return
    const info = tipFromEl(e.target as Element)
    if (info) setTip({ ...info, ...placeTip(e.clientX, e.clientY) })
    else if (tip) setTip(null)
  }, [tip])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.active) {
      drag.current.active = false
      setGrabbing(false)
      try {
        scroller.current?.releasePointerCapture(e.pointerId)
      } catch {
        /* no-op */
      }
      return
    }
    if (e.pointerType === 'mouse') return
    // Touch tap (not a scroll swipe) → show the tip for the bar under the finger.
    const moved =
      Math.abs(e.clientX - tapStart.current.x) > TAP_SLOP ||
      Math.abs(e.clientY - tapStart.current.y) > TAP_SLOP
    if (moved) return
    const info = tipFromEl(document.elementFromPoint(e.clientX, e.clientY))
    if (info) setTip({ ...info, ...placeTip(e.clientX, e.clientY) })
  }, [])

  return (
    <div className="relative">
      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseLeave={() => setTip(null)}
        className={cn(
          'overflow-x-auto',
          grabbing ? 'cursor-grabbing select-none' : 'cursor-grab',
        )}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        {children}
      </div>

      {tip && (tip.label || tip.sub) && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 rounded-lg border border-border bg-popover/95 px-3 py-2 shadow-lg backdrop-blur-sm duration-100 animate-in fade-in-0 zoom-in-95"
          style={{ left: tip.x, top: tip.y, maxWidth: TIP_W }}
        >
          <div className="text-xs font-semibold leading-snug text-popover-foreground">{tip.label}</div>
          {tip.sub && <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{tip.sub}</div>}
          {tip.rel && (
            <div className="mt-1 border-t border-border/60 pt-1 text-[11px] leading-snug text-muted-foreground">
              <span className="text-muted-foreground/70">Связано с:</span> {tip.rel}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
