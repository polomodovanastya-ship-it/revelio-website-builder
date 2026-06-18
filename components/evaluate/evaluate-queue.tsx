'use client'
import { useState, useEffect, useRef } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import { createApplication, pollQueueStatus, extractQuestions, statusToError, skipQuestions, patchApplicationEmail } from '@/lib/evaluation-api'
import { POLL_TIMEOUT_MS } from '@/lib/evaluate-helpers'
import { useToast } from '@/components/toast'
import type { FlowState, FlowAction } from '@/hooks/use-evaluate-flow'

interface Props {
  state: FlowState
  dispatch: React.Dispatch<FlowAction>
}

export function EvaluateQueue({ state, dispatch }: Props) {
  const { toast } = useToast()
  const [uiState, setUiState] = useState<'saving' | 'queued' | 'running' | 'error'>('saving')
  const [position, setPosition] = useState<number>()
  const [dots, setDots] = useState('')
  const [skipping, setSkipping] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [lateEmail, setLateEmail] = useState('')
  const [lateEmailSaving, setLateEmailSaving] = useState(false)
  const [lateEmailSaved, setLateEmailSaved] = useState(false)
  const skippedRef = useRef(false)
  const creatingRef = useRef(false)
  const successEmailRef = useRef(state.email)

  const initialEmail = state.email
  const successEmail = lateEmailSaved ? lateEmail.trim() : initialEmail
  successEmailRef.current = successEmail

  const isNoFilePath = !!state.noFileJobId
  const showEmailPanel = isNoFilePath && !initialEmail && !lateEmailSaved && (uiState === 'queued' || uiState === 'running')

  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (state.questionsJobId || state.noFileJobId) return
    if (!state.pendingCreate) {
      toast.error('Нет данных для отправки. Заполните форму заново.')
      dispatch({ type: 'RESTART' })
      return
    }
    if (creatingRef.current) return
    creatingRef.current = true
    const controller = new AbortController()
    setUiState('saving')
    ;(async () => {
      try {
        const res = await createApplication(state.pendingCreate!, controller.signal)
        if (res.no_file_job_id) {
          dispatch({ type: 'CREATE_OK', applicationId: res.application_id, noFileJobId: res.no_file_job_id })
        } else if (res.questions_job_id) {
          dispatch({ type: 'CREATE_OK', applicationId: res.application_id, questionsJobId: res.questions_job_id })
        } else {
          throw new Error('Сервер не вернул ID очереди')
        }
        setUiState('queued')
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return
        setErrorText((err as Error)?.message || 'Не удалось отправить заявку')
        setUiState('error')
      } finally {
        creatingRef.current = false
      }
    })()
    return () => {
      controller.abort()
      creatingRef.current = false
    }
  }, [state.createRetry, state.questionsJobId, state.noFileJobId, state.pendingCreate, toast, dispatch])

  useEffect(() => {
    const activeJobId = state.questionsJobId ?? state.noFileJobId
    if (!activeJobId) return
    const controller = new AbortController()
    ;(async () => {
      try {
        const final = await pollQueueStatus(activeJobId, {
          intervalMs: 3000,
          timeoutMs: POLL_TIMEOUT_MS,
          maxNetworkRetries: 3,
          signal: controller.signal,
          onUpdate: s => {
            if (s.status === 'queued' || s.status === 'running') setUiState(s.status)
            setPosition(typeof s.position === 'number' ? s.position : undefined)
          },
        })
        if (skippedRef.current) return
        if (final.status === 'succeeded') {
          if (state.noFileJobId) {
            dispatch({ type: 'QUEUE_SUCCEEDED_TO_SUCCESS', email: successEmailRef.current })
          } else {
            const questions = extractQuestions(final.outputs)
            if (questions.length === 0) {
              dispatch({ type: 'QUEUE_SUCCEEDED_TO_SUCCESS', email: successEmailRef.current })
            } else {
              dispatch({ type: 'QUEUE_SUCCEEDED_TO_QUESTIONS', questions })
            }
          }
        } else {
          const text = statusToError(final.status)
          if (text) {
            setErrorText(text)
            setUiState('error')
          }
        }
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return
        setErrorText((err as Error)?.message || 'Ошибка поллинга')
        setUiState('error')
      }
    })()
    return () => controller.abort()
  }, [state.questionsJobId, state.noFileJobId, state.applicationId, state.pollRetry, state.noFileJobId, dispatch])

  const onSkip = async () => {
    if (!state.applicationId || !state.questionsJobId) {
      toast.error('Нет данных для пропуска вопросов')
      return
    }
    setSkipping(true)
    skippedRef.current = true
    try {
      await skipQuestions(state.applicationId, state.questionsJobId)
      dispatch({ type: 'SKIPPED' })
    } catch (err) {
      skippedRef.current = false
      toast.error((err as Error)?.message || 'Не удалось пропустить вопросы')
    } finally {
      setSkipping(false)
    }
  }

  const onLateEmailSubmit = async () => {
    const email = lateEmail.trim()
    if (!email || !state.applicationId) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Укажите корректный e-mail')
      return
    }
    setLateEmailSaving(true)
    try {
      await patchApplicationEmail(state.applicationId, email)
      setLateEmailSaved(true)
      toast.success('Email сохранён — PDF пришлём после готовности')
    } catch (err) {
      toast.error((err as Error)?.message || 'Не удалось сохранить email')
    } finally {
      setLateEmailSaving(false)
    }
  }

  const onRetry = () => {
    setUiState('saving')
    setErrorText('')
    const activeJobId = state.questionsJobId ?? state.noFileJobId
    if (!activeJobId) {
      dispatch({ type: 'RETRY_CREATE' })
    } else {
      dispatch({ type: 'RETRY_POLL' })
    }
  }

  const showSkip = !isNoFilePath && (uiState === 'queued' || uiState === 'running') && state.applicationId && state.questionsJobId

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
        {uiState === 'error' ? (
          <AlertTriangle className="h-10 w-10 text-destructive" />
        ) : (
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        )}
      </div>

      {uiState === 'saving' && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Сохраняем заявку{dots}</h2>
          <p className="text-muted-foreground">Пожалуйста, подождите</p>
        </>
      )}

      {uiState === 'error' && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Что-то пошло не так</h2>
          {errorText && <p className="mb-6 text-destructive">{errorText}</p>}
          <div className="flex justify-center gap-3">
            <button onClick={onRetry} className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90">
              Повторить
            </button>
            <button onClick={() => dispatch({ type: 'RESTART' })} className="rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/80">
              Заполнить заново
            </button>
          </div>
        </>
      )}

      {isNoFilePath && uiState !== 'error' && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Готовим предварительную оценку{dots}</h2>
          {successEmail && <p className="text-muted-foreground">Оценку пришлём на почту {successEmail}</p>}
        </>
      )}

      {!isNoFilePath && uiState === 'running' && (
        <h2 className="mb-2 text-2xl font-semibold">Составляем вопросы{dots}</h2>
      )}

      {!isNoFilePath && uiState === 'queued' && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Заявка в очереди</h2>
          {position !== undefined && position > 0 && (
            <p className="text-muted-foreground">Перед вами заявок: {position}</p>
          )}
        </>
      )}

      {showEmailPanel && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-card p-6 text-left">
          <h3 className="mb-2 text-lg font-semibold">Хотите получить PDF на почту?</h3>
          <p className="mb-4 text-sm text-muted-foreground">Укажите e-mail, и мы отправим готовую оценку</p>
          <div className="flex gap-2">
            <input type="email" value={lateEmail} onChange={e => setLateEmail(e.target.value)} placeholder="example@company.com" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" disabled={lateEmailSaving} />
            <button onClick={onLateEmailSubmit} disabled={lateEmailSaving || !lateEmail.trim()} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50">
              {lateEmailSaving ? 'Сохранение...' : 'Отправить'}
            </button>
          </div>
        </div>
      )}

      {showSkip && (
        <button onClick={onSkip} disabled={skipping} className="mt-6 text-sm text-muted-foreground underline hover:text-foreground disabled:opacity-50">
          {skipping ? 'Пропускаем...' : 'Не ждать вопросы, рассчитать без ответов'}
        </button>
      )}
    </div>
  )
}
