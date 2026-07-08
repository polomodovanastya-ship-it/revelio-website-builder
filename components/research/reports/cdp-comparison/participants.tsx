import { ArrowRight } from 'lucide-react'
import {
  ONPREM_VENDORS,
  CLOUD_VENDORS,
  OTHER_VENDORS,
  MIN_SCORE,
  MAX_SCORE,
} from '@/lib/cdp-research-data'
import { TELEGRAM_URL } from '@/lib/contacts'
import { ParticipantChip } from '@/components/research/report-primitives'

export function Participants() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-tight text-primary sm:text-4xl">
        Участники
        <br />
        исследования
      </h2>

      <div className="mb-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Onprem</p>
          <div className="flex flex-wrap gap-3">
            {ONPREM_VENDORS.map((v) => (
              <ParticipantChip key={v} name={v} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Cloud-first</p>
          <div className="flex flex-wrap gap-3">
            {CLOUD_VENDORS.map((v) => (
              <ParticipantChip key={v} name={v} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Также в обзоре</p>
        <div className="flex flex-wrap gap-2">
          {OTHER_VENDORS.map((v) => (
            <span key={v} className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground">
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-12 flex flex-col gap-3 sm:flex-row">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
        >
          Предложить изменения, если вы вендор
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
        >
          Принять участие в исследовании
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-8">
        <div>
          <p className="mb-2 font-mono text-sm font-semibold uppercase text-muted-foreground">минимальный балл</p>
          <div className="font-heading text-6xl font-extrabold leading-none tracking-tight text-primary sm:text-8xl">
            {MIN_SCORE}
          </div>
        </div>
        <div className="text-right">
          <p className="mb-2 font-mono text-sm font-semibold uppercase text-muted-foreground">максимальный балл</p>
          <div className="font-heading text-6xl font-extrabold leading-none tracking-tight text-primary sm:text-8xl">
            {MAX_SCORE}
          </div>
        </div>
      </div>
      <p className="text-center font-mono text-sm uppercase tracking-wider text-muted-foreground">
        Разделим вендоров на 2 большие категории:
      </p>
    </section>
  )
}
