'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Loader2, X } from 'lucide-react'
import { useToast } from '@/components/toast'
import { submitContact } from '@/lib/contact-api'

const looksLikePhone = (v: string) => /[\d+()\-\s]{6,}/.test(v)

export function TemplateRequestModal({
  open,
  onClose,
  artifactName,
  title = 'Запросить шаблон артефакта',
}: {
  open: boolean
  onClose: () => void
  artifactName: string
  title?: string
}) {
  const { toast } = useToast()
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    if (open) {
      setPhone('')
      setAgree(false)
      setStatus('idle')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const canSubmit = looksLikePhone(phone.trim()) && agree && status !== 'sending'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('sending')
    const res = await submitContact({
      name: 'Запрос шаблона артефакта',
      email: 'template-request@revelio.tech',
      phone: phone.trim(),
      message: `Запрос шаблона артефакта: ${artifactName}\nТелефон для связи: ${phone.trim()}`,
      consent: agree,
    })
    if (res.ok) {
      setStatus('sent')
    } else {
      toast.error(res.error)
      setStatus('error')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-request-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-primary"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'sent' ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Check className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-5 font-heading text-lg font-bold uppercase tracking-tight text-primary">
              Заявка отправлена
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Отправим шаблон и свяжемся с вами в течение 10 минут.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-background"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3
              id="template-request-title"
              className="pr-10 font-heading text-lg font-bold uppercase tracking-tight text-primary sm:text-xl"
            >
              Запросить шаблон артефакта
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Наш консультант пришлет ссылку на файл в Telegram или SMS
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Телефон
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 ···"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={30}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  Я даю своё{' '}
                  <a
                    href="https://revelio.tech/legal/consent_pd.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-foreground underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    согласие
                  </a>{' '}
                  в соответствии с{' '}
                  <a
                    href="https://revelio.tech/legal/revelio_tech_policy_pd.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-foreground underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    Политикой обработки персональных данных
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>
                    Отправка…
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Отправить
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
