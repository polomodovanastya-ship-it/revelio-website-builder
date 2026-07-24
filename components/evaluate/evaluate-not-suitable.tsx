'use client'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import type { FlowState, FlowAction } from '@/hooks/use-evaluate-flow'

interface Props {
  state: FlowState
  dispatch: React.Dispatch<FlowAction>
}

// Shown when the backend returns readiness_for_estimation === "not_suitable":
// the input wasn't recognized as a valid brief, so no estimate is produced or
// emailed. The application is still recorded (a Weeek task is created), so a
// manager will follow up — we say so honestly and offer to retry with a
// better document.
export function EvaluateNotSuitable({ state, dispatch }: Props) {
  // `state` is part of the shared phase-component contract; unused here.
  void state
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="mb-4 text-3xl font-bold">Не удалось подготовить авто-оценку</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Документ не удалось распознать как техническое задание — не выделились
        требования. Заявка принята, с вами свяжется менеджер. Либо загрузите
        более подробный документ.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch({ type: 'RESTART' })}
          className="rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Загрузить другой
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border bg-secondary px-6 py-3 font-medium transition-colors hover:bg-secondary/80"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
