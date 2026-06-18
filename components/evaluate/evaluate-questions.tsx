'use client'
import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { submitAnswers } from '@/lib/evaluation-api'
import { useToast } from '@/components/toast'
import type { FlowState, FlowAction } from '@/hooks/use-evaluate-flow'

interface Props {
  state: FlowState
  dispatch: React.Dispatch<FlowAction>
}

export function EvaluateQuestions({ state, dispatch }: Props) {
  const { toast } = useToast()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const importanceClass = (imp?: string) => {
    if (imp === 'high') return 'bg-accent/15 text-accent border-accent/30'
    if (imp === 'low') return 'bg-muted text-muted-foreground border-border'
    return 'bg-primary/10 text-primary border-primary/20'
  }

  const onSubmit = async () => {
    if (submitting) return
    if (!state.applicationId) {
      toast.error('Нет идентификатора заявки. Вернитесь к форме.')
      dispatch({ type: 'RESTART' })
      return
    }
    setSubmitting(true)
    const payload: Record<string, string> = {}
    state.questions.forEach(q => {
      payload[q.question_id] = answers[q.question_id] ?? ''
    })
    try {
      await submitAnswers(state.applicationId, payload)
      dispatch({ type: 'ANSWERS_OK', email: state.email })
    } catch (err) {
      toast.error((err as Error)?.message || 'Не удалось отправить ответы')
      setSubmitting(false)
    }
  }

  if (state.questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">Проверьте почту</h2>
          <p className="text-muted-foreground">Мы отправили ссылку для продолжения.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Уточняющие вопросы</h1>
      <p className="mb-8 text-muted-foreground">
        Ответьте на вопросы для более точной оценки. Вы можете пропустить любые вопросы.
      </p>

      <div className="space-y-6">
        {state.questions.map((q, i) => (
          <div key={q.question_id} className="rounded-2xl border border-border bg-secondary p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {q.importance && (
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${importanceClass(q.importance)}`}>
                  {q.importance}
                </span>
              )}
              {q.topic && (
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {q.topic}
                </span>
              )}
              {q.blocks_estimation && (
                <span className="flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                  <AlertTriangle className="h-3 w-3" />
                  блокирует оценку
                </span>
              )}
            </div>

            <div className="mb-3 font-semibold">
              {i + 1}. {q.question}
            </div>

            {q.why_needed && (
              <div className="mb-3 text-sm text-muted-foreground">
                <strong>Зачем:</strong> {q.why_needed}
              </div>
            )}

            <textarea
              value={answers[q.question_id] ?? ''}
              onChange={e => setAnswers({ ...answers, [q.question_id]: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              placeholder="Ваш ответ (необязательно)"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting || !state.applicationId}
        className="mt-8 w-full rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
      >
        {submitting ? 'Отправляем...' : 'Отправить ответы'}
      </button>
    </div>
  )
}
