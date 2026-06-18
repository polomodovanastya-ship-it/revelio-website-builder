import { Phone, Send, Mail } from 'lucide-react'
import { PHONE, TELEGRAM_URL, TELEGRAM_HANDLE, EMAIL } from '@/lib/contacts'

export function ContactCards() {
  const cards = [
    {
      icon: Phone,
      label: 'Телефон',
      value: PHONE,
      href: `tel:${PHONE.replace(/[^\d+]/g, '')}`,
      external: false,
    },
    {
      icon: Send,
      label: 'Telegram',
      value: TELEGRAM_HANDLE,
      href: TELEGRAM_URL,
      external: true,
    },
    {
      icon: Mail,
      label: 'Эл. почта',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      external: false,
    },
  ]

  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <a
            key={card.label}
            href={card.href}
            {...(card.external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{card.label}</div>
              <div className="text-base font-semibold text-primary">{card.value}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
