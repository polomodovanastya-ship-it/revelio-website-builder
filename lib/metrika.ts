// Yandex.Metrika counter id — shared by layout init script and route tracker.
export const YANDEX_METRIKA_ID = 108732849

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}

// Fires a Metrika goal (reachGoal). Used to build the AI-evaluation funnel as a
// "составная цель": each step below is one этап of that composite goal, and
// Metrika only counts a step once the previous one happened earlier in the visit.
//   eval_landing        — visited /ai-evaluation
//   eval_start          — clicked the "оценить" CTA
//   eval_file_uploaded  — attached a valid document
//   eval_reached_final  — reached the final form screen
//   eval_contact_filled — entered a valid contact on the final screen
//   eval_submit         — application successfully created on the server
// No-op during SSR or before the counter script has loaded.
export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.ym) return
  window.ym(YANDEX_METRIKA_ID, 'reachGoal', goal, params)
}

export {}
