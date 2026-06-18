'use client'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import type { FlowState, FlowAction } from '@/hooks/use-evaluate-flow'

interface Props {
  state: FlowState
  dispatch: React.Dispatch<FlowAction>
}

export function EvaluateSuccess({ state, dispatch }: Props) {
  const title = state.alreadyAnswered ? 'Ответы уже отправлены' : 'Готово!'
  const description = state.alreadyAnswered
    ? 'Вы уже ответили на уточняющие вопросы по этой заявке. Результат будет отправлен на почту.'
    : state.email
      ? 'Заявка принята в работу. Оценку пришлём на почту.'
      : 'Заявка принята в работу. Мы свяжемся с вами в ближайшее время.'

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
        <CheckCircle2 className="h-10 w-10 text-accent" />
      </div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="mb-8 text-lg text-muted-foreground">{description}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch({ type: 'RESTART' })}
          className="rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Оценить ещё
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
