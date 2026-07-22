'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/use-reveal'
import { DIMENSIONS, ENGINE_VERBS, PRODUCT_PROOF } from '@/lib/ai-evaluation-content'
import decompImg from '@/src/assets/dim-decomp.png.asset.json'
import estimateImg from '@/src/assets/dim-estimate.png.asset.json'
import risksImg from '@/src/assets/dim-risks.png.asset.json'

const ASSET_HOST = 'https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app'

const COVERS: Record<string, string> = {
  decomposition: `${ASSET_HOST}${decompImg.url}`,
  estimate: `${ASSET_HOST}${estimateImg.url}`,
  risks: `${ASSET_HOST}${risksImg.url}`,
}

export function Dimensions() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="answers" className="relative scroll-mt-24 overflow-hidden border-b border-border py-20 sm:py-28">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 [background-size:56px_56px] opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          [ Что анализирует ]
        </span>
        <h2 className="mt-3 max-w-3xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
          На какие вопросы отвечает AI-оценка
        </h2>

        {/* engine verbs */}
        <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {ENGINE_VERBS.map((verb, i) => (
            <span key={verb} className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                {verb}
              </span>
              {i < ENGINE_VERBS.length - 1 && (
                <ArrowRight className="h-3 w-3 text-accent/70" aria-hidden />
              )}
            </span>
          ))}
        </div>

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-min"
        >
          {DIMENSIONS.map((d, i) => {
            const cover = COVERS[d.key]
            return (
              <article
                key={d.key}
                className="group flex w-full flex-col self-start overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_44px_-24px_rgba(20,37,80,0.30)]"
              >
                {cover && (
                  <div className="border-b border-border bg-secondary/40 p-3">
                    <img
                      src={cover}
                      alt={d.title}
                      loading="lazy"
                      className="h-32 w-full rounded-md object-cover object-left-top"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-xs tabular-nums text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold uppercase tracking-tight text-primary">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {d.question}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          В основе — <span className="font-medium text-foreground">{PRODUCT_PROOF[0]}</span>{' '}
          и <span className="font-medium text-foreground">{PRODUCT_PROOF[1]}</span>.
        </p>
      </div>
    </section>
  )
}
