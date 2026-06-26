import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HERO_SUMMARY, PRODUCT_PROOF, USER_FLOW } from '@/lib/ai-evaluation-content'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        {/* left — message */}
        <div>
          <span className="reveal in-view inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
            [ AI-ОЦЕНКА КАК СЕРВИС ]
          </span>

          <h1
            className="reveal in-view mt-5 max-w-2xl text-balance font-heading text-4xl font-black uppercase leading-[1.05] tracking-[-0.02em] text-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '90ms' }}
          >
            Оценивай разработку <span className="text-accent">быстро</span>
          </h1>

          <p
            className="reveal in-view mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: '170ms' }}
          >
            Загружаешь требования, отвечаешь на вопросы — и получаешь детальную
            оценку проекта с рисками и ограничениями. Делай уверенно, без
            многонедельного ожидания.
          </p>

          {/* user flow */}
          <ol
            className="reveal in-view mt-7 flex flex-wrap items-center gap-x-2 gap-y-2"
            style={{ animationDelay: '240ms' }}
          >
            {USER_FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
                  {step}
                </span>
                {i < USER_FLOW.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                )}
              </li>
            ))}
          </ol>

          <div
            className="reveal in-view mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '320ms' }}
          >
            <Link
              href="/evaluate"
              className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
            >
              Перейти к оценке
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#contact"
              className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
            >
              Обсудить с консультантом
            </Link>
          </div>
        </div>

        {/* right — at a glance card */}
        <div
          className="reveal in-view rounded-2xl border border-border bg-card p-6 shadow-[0_18px_44px_-24px_rgba(20,37,80,0.32)] sm:p-7"
          style={{ animationDelay: '260ms' }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Коротко о продукте
          </div>
          <dl className="mt-4 space-y-2.5 text-sm">
            {HERO_SUMMARY.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline justify-between gap-4 ${i < HERO_SUMMARY.length - 1 ? 'border-b border-border pb-2.5' : ''}`}
              >
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd
                  className={`text-right font-medium ${row.value === 'бесплатно' ? 'text-accent' : 'text-foreground'}`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 space-y-1.5 border-t border-border pt-4">
            {PRODUCT_PROOF.map((p) => (
              <div key={p} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-accent">●</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
