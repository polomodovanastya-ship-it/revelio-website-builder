'use client'

import { useState } from 'react'
import { Check, ArrowRight, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { useReveal } from '@/hooks/use-reveal'
import { WORK_FORMATS, AREAS } from '@/lib/consulting-content'
import { TemplateRequestModal } from './template-request-modal'

export function WorkFormats() {
  const ref = useReveal<HTMLDivElement>()
  const [requested, setRequested] = useState<string | null>(null)

  return (
    <section id="formats" className="border-b border-border py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Форматы работы ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          Два базовых формата работы
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Одна область на выбор — глубину аудита выбираете под задачу
        </p>

        <div ref={ref} className="reveal mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {WORK_FORMATS.map((f) => {
            const featured = !!f.featured
            return (
              <div
                key={f.id}
                className={`flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                  featured
                    ? 'border-transparent bg-primary text-primary-foreground shadow-[0_18px_44px_-20px_rgba(20,37,80,0.45)]'
                    : 'border-border bg-card hover:border-primary/25 hover:shadow-[0_18px_44px_-22px_rgba(20,37,80,0.30)]'
                }`}
              >
                <h3
                  className={`font-heading text-lg font-bold uppercase tracking-tight ${
                    featured ? 'text-primary-foreground' : 'text-primary'
                  }`}
                >
                  {f.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    featured ? 'text-primary-foreground/75' : 'text-muted-foreground'
                  }`}
                >
                  {f.feeling}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`font-heading text-2xl font-bold tracking-tight ${
                      featured ? 'text-primary-foreground' : 'text-primary'
                    }`}
                  >
                    {f.price}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] ${
                      featured
                        ? 'bg-white/10 text-primary-foreground/80'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {f.duration}
                  </span>
                </div>

                {/* area selector (display) */}
                <div className="mt-5">
                  <div
                    className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                      featured ? 'text-primary-foreground/60' : 'text-muted-foreground'
                    }`}
                  >
                    1 область на выбор
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {AREAS.map((a) => (
                      <span
                        key={a}
                        className={`rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] ${
                          featured
                            ? 'bg-white/10 text-primary-foreground/80'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {f.inheritsLabel && (
                  <p
                    className={`mt-6 text-sm font-medium ${
                      featured ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    Всё из {f.inheritsLabel}, плюс глубина:
                  </p>
                )}

                <dl className={`${f.inheritsLabel ? 'mt-4' : 'mt-6'} space-y-3.5`}>
                  {f.rows.map((r) => (
                    <div key={r.label} className="flex gap-3">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          featured ? 'text-accent-foreground' : 'text-accent'
                        }`}
                      />
                      <div>
                        <dt
                          className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                            featured ? 'text-primary-foreground/60' : 'text-muted-foreground'
                          }`}
                        >
                          {r.label}
                        </dt>
                        <dd
                          className={`text-sm leading-snug ${
                            featured ? 'text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          {r.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <Link
                  href="#contact"
                  className={`mt-7 flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                    featured
                      ? 'bg-accent text-accent-foreground hover:brightness-110'
                      : 'border border-border bg-secondary text-primary hover:border-primary/30 hover:bg-muted hover:text-accent'
                  }`}
                >
                  Отправить заявку
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setRequested(f.name)}
                  className={`mt-3 flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                    featured
                      ? 'border border-primary-foreground/20 text-primary-foreground hover:bg-white/10'
                      : 'border border-border bg-secondary text-primary hover:border-primary/30 hover:bg-muted hover:text-accent'
                  }`}
                >
                  <ArrowDown className="h-4 w-4" />
                  Запросить шаблон
                </button>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Другие области консалтинга — ценообразование, продажи, лояльность,
          коммуникации — обсуждаем индивидуально.
        </p>
      </div>

      <TemplateRequestModal
        open={requested !== null}
        onClose={() => setRequested(null)}
        artifactName={requested ?? ''}
        title="Запросить шаблон"
      />
    </section>
  )
}
