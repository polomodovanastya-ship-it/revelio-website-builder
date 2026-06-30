import Link from 'next/link'
import { Target, Crosshair, BarChart } from 'lucide-react'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Оценка в 1 клик',
  description:
    'Опишите задачу — AI-агент на базе 15 лет ИТ-проектов посчитает скоуп, сроки, риски и диапазон стоимости. Старт ИТ-проекта без неопределённости.',
  path: '/1-click-estimate',
})

export default function OneClickEstimatePage() {
  return (
    <main className="pb-16 pt-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-accent" />
          <Crosshair className="h-6 w-6 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-center text-4xl font-bold">Оценка в 1 клик</h1>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Как стартовать ИТ-проект на ХХ млн, если нет уверенности?
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">[ Шаг 1 ]</div>
            <h3 className="mb-2 text-lg font-semibold">Опишите задачу</h3>
            <p className="text-sm text-muted-foreground">Заполните короткий бриф — 5–7 минут</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">[ Шаг 2 ]</div>
            <h3 className="mb-2 text-lg font-semibold">AI-агент посчитает</h3>
            <p className="text-sm text-muted-foreground">Методология 15 лет ИТ-проектов в одном агенте</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">[ Шаг 3 ]</div>
            <h3 className="mb-2 text-lg font-semibold">Получите отчёт</h3>
            <p className="text-sm text-muted-foreground">Скоуп, сроки, риски и диапазон стоимости</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <BarChart className="mx-auto mb-4 h-12 w-12 text-accent" />
          <p className="mb-6 text-sm text-muted-foreground">
            Бесплатно. Результат — за минуты, а не за недели согласований.
          </p>
          <Link href="/evaluate" className="inline-block rounded-lg bg-accent px-8 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90">
            Протестировать в 1 клик
          </Link>
        </div>
      </div>
    </main>
  )
}
