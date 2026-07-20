import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import consultingWebsiteAsset from '@/src/assets/consulting-website.png.asset.json'
import { STEPS } from '@/lib/consulting-content'

export function ConsultingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="reveal in-view inline-block font-mono text-xs uppercase tracking-[0.22em] text-accent">
              [ УСЛУГА ]
            </span>

            <h1
              className="reveal in-view mt-5 font-heading text-2xl font-black uppercase leading-[1.1] tracking-[-0.02em] text-primary sm:text-3xl lg:text-4xl"
              style={{ animationDelay: '90ms' }}
            >
              Бизнес/ИТ/AI-консалтинг
            </h1>

            <div
              className="reveal in-view mt-3 flex flex-wrap items-center gap-3 font-heading text-2xl font-black uppercase tracking-[-0.01em] sm:text-4xl"
              style={{ animationDelay: '150ms' }}
            >
              <span className="text-muted-foreground/70">AS&nbsp;IS</span>
              <ArrowRight className="h-7 w-7 text-accent sm:h-9 sm:w-9" aria-hidden />
              <span className="text-accent">TO&nbsp;BE</span>
            </div>

            <p
              className="reveal in-view mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: '220ms' }}
            >
              Помогаем заказчикам трансформировать ужасное&nbsp;→&nbsp;в феноменальное
              и экономить бюджеты
            </p>

            <ol
              className="reveal in-view mt-7 flex flex-wrap items-center gap-x-2 gap-y-2"
              style={{ animationDelay: '290ms' }}
            >
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
                    {step}
                  </span>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                  )}
                </li>
              ))}
            </ol>

            <div
              className="reveal in-view mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '360ms' }}
            >
              <Link
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors duration-300 hover:bg-primary"
              >
                Отправить заявку
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://t.me/reveliotech"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-muted hover:text-accent"
              >
                Обсудить в Telegram
              </a>
            </div>
          </div>

          <div
            className="reveal in-view hidden w-full overflow-hidden rounded-2xl border border-border lg:mt-0 lg:block"
            style={{ animationDelay: '120ms' }}
          >
            <Image
              src={`https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${consultingWebsiteAsset.url}`}
              alt="Иллюстрация консалтинговой услуги"
              width={1920}
              height={1440}
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
