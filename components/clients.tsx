'use client'

const CLIENTS = [
  'Альфа-Банк',
  'Tutu',
  'ДИКСИ',
  'ЦБ РФ',
  'MOEX',
  'KIA',
  'ЛУКОЙЛ',
  'AmeriaBank',
  'Unitel',
]

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS]
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Опыт команды
          </span>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent"
          >
            Запросить референс →
          </a>
        </div>
      </div>

      <div className="marquee-paused relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 px-6">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-heading text-xl font-semibold uppercase tracking-tight text-primary/35 transition-colors duration-300 hover:text-accent sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
