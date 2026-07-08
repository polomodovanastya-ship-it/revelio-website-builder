'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useToast } from '@/components/toast'
import { submitContact } from '@/lib/contact-api'
import { TELEGRAM_URL } from '@/lib/contacts'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LeadGate({ onUnlock }: { onUnlock: () => void }) {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const canSubmit = name.trim().length > 1 && EMAIL_RE.test(email.trim()) && agree && status !== 'sending'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('sending')
    const res = await submitContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      message: 'Заявка на доступ к исследованию CDP',
      consent: agree,
    })
    if (res.ok) {
      setStatus('sent')
    } else {
      toast.error(res.error)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-10">
        <p className="mb-6 font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Изучение исследования займет от 10 до 15 минут
        </p>
        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
        >
          Открыть исследование
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h3 className="mb-6 font-heading text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
        Открыть исследование бесплатно
      </h3>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Эл.почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
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
        <div className="mt-1 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? (
              <>
                Отправка…
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              'Открыть!'
            )}
          </button>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
          >
            Запросить консультацию автора
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </form>
    </div>
  )
}
