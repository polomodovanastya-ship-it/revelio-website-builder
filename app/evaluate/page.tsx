'use client'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useEvaluateFlow } from '@/hooks/use-evaluate-flow'
import { useToast } from '@/components/toast'
import { resumeApplication } from '@/lib/evaluation-api'
import { EvaluateIntroPopup } from '@/components/evaluate/evaluate-intro-popup'
import { EvaluateForm } from '@/components/evaluate/evaluate-form'
import { EvaluateQueue } from '@/components/evaluate/evaluate-queue'
import { EvaluateQuestions } from '@/components/evaluate/evaluate-questions'
import { EvaluateSuccess } from '@/components/evaluate/evaluate-success'

export default function EvaluatePage() {
  const { state, dispatch } = useEvaluateFlow()
  const { toast } = useToast()
  const [resumeChecked, setResumeChecked] = useState(false)

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('resume_token')
    if (!token) {
      setResumeChecked(true)
      return
    }
    dispatch({ type: 'BEGIN_RESUME' })
    let cancelled = false
    ;(async () => {
      try {
        const data = await resumeApplication(token)
        if (cancelled) return
        if (data.answers && Object.keys(data.answers).length > 0) {
          dispatch({ type: 'RESUME_OK', target: 'success', alreadyAnswered: true, email: data.email })
        } else if (data.questions && data.questions.length > 0) {
          dispatch({
            type: 'RESUME_OK',
            target: 'questions',
            applicationId: data.application_id,
            questions: data.questions,
            email: data.email,
          })
        } else {
          dispatch({ type: 'RESUME_OK', target: 'success', email: data.email })
        }
      } catch (err) {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Не удалось восстановить заявку.'
        toast.error(message)
        dispatch({ type: 'RESUME_ERR' })
      } finally {
        if (!cancelled) setResumeChecked(true)
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="pb-16 pt-28">
      <EvaluateIntroPopup />
      {state.phase === 'resuming' || !resumeChecked ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-accent" />
            <p className="text-muted-foreground">Загружаем вашу заявку…</p>
          </div>
        </div>
      ) : state.phase === 'form' ? (
        <EvaluateForm dispatch={dispatch} />
      ) : state.phase === 'queue' ? (
        <EvaluateQueue state={state} dispatch={dispatch} />
      ) : state.phase === 'questions' ? (
        <EvaluateQuestions state={state} dispatch={dispatch} />
      ) : state.phase === 'success' ? (
        <EvaluateSuccess state={state} dispatch={dispatch} />
      ) : null}
    </main>
  )
}
