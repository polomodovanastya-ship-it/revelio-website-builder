'use client'

import { useEffect, useRef } from 'react'

/**
 * Adds an `in-view` class to the element when it scrolls into view,
 * triggering the CSS fade-up animation. Respects reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('in-view')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      // Fire as soon as the element's top edge crosses into the viewport
      // (rootMargin), not by intersection ratio. A ratio-based threshold
      // breaks for elements taller than the viewport — e.g. the single-column
      // team grid on mobile is ~5000px tall, so 15% of it never fits the
      // screen and the reveal triggers far too late (near-empty scroll).
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
