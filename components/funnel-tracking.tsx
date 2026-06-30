'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { trackGoal } from '@/lib/metrika'

/**
 * Fires a Metrika goal once, on mount. Lets a server component (e.g. the
 * /ai-evaluation page) emit a funnel step without becoming a client component.
 */
export function TrackGoalOnMount({ goal }: { goal: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackGoal(goal)
  }, [goal])
  return null
}

/**
 * Drop-in for the "оценить" CTA: a Link to /evaluate that also fires the
 * `eval_start` funnel step. Keeps the surrounding section a server component.
 */
export function EvalStartLink({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href="/evaluate" className={className} onClick={() => trackGoal('eval_start')}>
      {children}
    </Link>
  )
}
