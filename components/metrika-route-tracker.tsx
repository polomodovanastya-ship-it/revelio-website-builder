'use client'
import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { YANDEX_METRIKA_ID } from '@/lib/metrika'

export function MetrikaRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    const current = pathname + (searchParams.toString() ? `?${searchParams}` : '')
    if (typeof window === 'undefined' || !window.ym) {
      prevPathRef.current = current
      return
    }
    const prev = prevPathRef.current
    // Skip first render — initial hit already sent by the inline init script.
    if (prev !== null) {
      window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href, { referer: prev })
    }
    prevPathRef.current = current
  }, [pathname, searchParams])

  return null
}
