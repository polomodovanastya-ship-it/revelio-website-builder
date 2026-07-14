'use client'
import { useState, type FormEvent } from 'react'
import { Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  fetchReport,
  ReportAuthError,
  ReportRateLimitError,
  type ReportData,
} from '@/lib/report-api'

interface ReportGateProps {
  token: string
  onSuccess: (data: ReportData, password: string) => void
}

export function ReportGate({ token, onSuccess }: ReportGateProps) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchReport(token, password)
      onSuccess(data, password)
    } catch (err) {
      if (err instanceof ReportAuthError) {
        setError('Неверный код доступа')
      } else if (err instanceof ReportRateLimitError) {
        setError('Слишком много попыток, попробуйте позже')
      } else {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить отчёт.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <Lock className="h-5 w-5 text-accent" />
      </div>
      <h1 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
        Отчёт защищён
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Введите код доступа, который прислал Ревелио, чтобы открыть оценку проекта.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 w-full">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (error) setError(null)
          }}
          placeholder="Код доступа"
          autoFocus
          disabled={loading}
          aria-invalid={error ? true : undefined}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-4 w-full" disabled={loading || !password.trim()}>
          {loading && <Loader2 className="animate-spin" />}
          Открыть отчёт
        </Button>
      </form>
    </div>
  )
}
