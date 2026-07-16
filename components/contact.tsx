'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { useToast } from '@/components/toast'
import { submitContact } from '@/lib/contact-api'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const looksLikePhone = (v: string) => /[\d+()\-\s]{6,}/.test(v)

export function Contact() {
  const ref = useReveal<HTMLDivElement>()
  const { toast } = useToast()
  const [status, setStatus] = useState<Status>('idle')
  const [agree, setAgree] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const fail = (msg: string) => {
    toast.error(msg)
    setStatus('error')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const baseMessage = form.message.trim()

    if (!name || !email || !baseMessage) {
      return fail('Пожалуйста, заполните обязательные поля')
    }
    if (!isEmail(email)) return fail('Укажите корректный e-mail')
    if (phone && !looksLikePhone(phone)) {
      return fail('Укажите корректный номер телефона или оставьте поле пустым')
    }
    if (!agree) return fail('Необходимо согласие на обработку персональных данных')

    const message = form.company.trim()
      ? `${baseMessage}\n\nКомпания: ${form.company.trim()}`
      : baseMessage

    setStatus('sending')
    const res = await submitContact({
      name,
      email,
      phone: phone || undefined,
      message,
      consent: agree,
    })

    if (res.ok) {
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', company: '', message: '' })
      setAgree(false)
    } else {
      toast.error(res.error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="border-b border-border py-20 sm:py-28">
      <span id="contacts" aria-hidden className="sr-only" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="reveal grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ Контакты ]
            </span>
            <h2 className="mt-3 text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
              Расскажите о вашей задаче 💬
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Оценим за 3–5 дней, бесплатно по методологии. Свяжемся в течение
              10 минут — ответит не продавец, а консультант с 10+ лет опыта
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            {status === 'sent' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold uppercase tracking-tight text-primary">
                  Заявка отправлена
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Консультант свяжется с вами в течение 10 минут. Спасибо за доверие.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Имя"
                    name="name"
                    placeholder="Как к вам обращаться"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    maxLength={100}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.ru"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    maxLength={255}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Телефон"
                    name="phone"
                    type="tel"
                    placeholder="+7 ··· (необязательно)"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    maxLength={30}
                    required={false}
                  />
                  <Field
                    label="Компания"
                    name="company"
                    placeholder="Название организации"
                    value={form.company}
                    onChange={(v) => setForm({ ...form, company: v })}
                    maxLength={200}
                    required={false}
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Задача
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Коротко о задаче или цели"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={1000}
                    className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                  disabled={!agree || status === 'sending'}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  maxLength,
  required = true,
}: {
  label: string
  name: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  maxLength?: number
  required?: boolean
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  )
}
