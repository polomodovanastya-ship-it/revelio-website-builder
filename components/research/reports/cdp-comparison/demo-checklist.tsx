// components/research/reports/cdp-comparison/demo-checklist.tsx
import { DEMO_CHECKLIST, DEMO_TOTAL_MINUTES, DEMO_VERDICT } from '@/lib/cdp-research-data'

export function DemoChecklist() {
  return (
    <section className="mb-16">
      <h2 className="mb-2 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Чек-лист для Live-демо
      </h2>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground italic">
        <span>Как проверить вендора за 1 встречу? Время прохождения готового сценария займет ~{DEMO_TOTAL_MINUTES} минут.</span>
        <br />
        <span>Практический инструмент, который превращает абстрактное исследование в готовый сценарий действий для заказчика.</span>
        <br />
        <span>Полезно увидеть на Live-демо: в лояльности акции для анонимных чеков, сервис не суммирования акций, макроподстановки.</span>
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_CHECKLIST.map((stage) => (
          <div key={stage.n} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stage.icon className="shrink-0 text-accent" size={18} />
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                  Этап {stage.n}. {stage.title}
                </h3>
              </div>
              <span className="shrink-0 font-mono text-xs font-semibold text-accent">{stage.minutes} мин</span>
            </div>
            <ul className="list-disc space-y-2.5 pl-4">
              {stage.items.map((item) => (
                <li key={item} className="text-sm leading-snug text-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5 text-sm font-semibold leading-relaxed text-primary">
        {DEMO_VERDICT}
      </p>
    </section>
  )
}
