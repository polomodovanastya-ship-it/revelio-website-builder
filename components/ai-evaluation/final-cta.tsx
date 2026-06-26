import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const MICRO = ['бесплатно', '3–5 минут', 'погрешность 15–30%']

export function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-6 py-14 text-center sm:px-10 sm:py-20">
          <div
            aria-hidden
            className="blueprint pointer-events-none absolute inset-0 [background-size:48px_48px] opacity-[0.12]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-heading text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary-foreground sm:text-4xl">
              Готовы оценить проект?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/75">
              Загрузите требования и получите детальную оценку с рисками и
              ограничениями — за несколько минут.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/evaluate"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:brightness-110 sm:w-auto"
              >
                Перейти к оценке
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary-foreground/25 bg-transparent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground/10 sm:w-auto"
              >
                Обсудить с консультантом
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
              {MICRO.map((m, i) => (
                <span key={m} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground/60">
                    {m}
                  </span>
                  {i < MICRO.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
