'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ArrowRight, Loader2, RotateCcw, Check } from 'lucide-react'

type Estimate = {
  projectType: string
  summary: string
  recommendedTrack: string
  budgetMin: number
  budgetMax: number
  timelineWeeks: string
  team: string[]
  phases: { name: string; detail: string }[]
  risks: string[]
}

const EXAMPLES = [
  'Портал командировок для банка с интеграцией ЭДО и API отелей',
  'Внедрить CDP и сценарии лояльности на 1M активных клиентов',
  'Скоринговая модель и антифрод для финтех-сервиса',
]

const STEPS = [
  'Разбираем требования',
  'Подбираем формат работы',
  'Считаем команду и сроки',
  'Оцениваем риски',
]

function formatRub(n: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n)
}

/* Demo mock — генерирует правдоподобную оценку без бэкенда */
function mockEstimate(description: string): Estimate {
  const text = description.toLowerCase()
  const big = /банк|1m|млн|лояльн|cdp|erp|dwh|антифрод|скоринг|портал/.test(text)
  const ai = /ai|ии|агент|модель|скоринг|антифрод/.test(text)
  const base = big ? 8 : 3
  return {
    projectType: ai ? 'Data / ML продукт' : big ? 'Enterprise B2B система' : 'Цифровой продукт',
    summary: ai
      ? 'Задача с заметной ML-составляющей. Рекомендуем начать с проверки гипотезы на реальных данных, затем — продуктовая команда с релизами раз в 2 недели и передачей экспертизы внутрь.'
      : big
        ? 'Крупная инициатива на стыке бизнеса и ИТ. Оптимально собрать выделенную команду разработки и вести проект итерациями с измеримыми метриками на каждом этапе.'
        : 'Компактный продукт с понятным контуром. Можно стартовать быстро: прототип за неделю, далее — поэтапная разработка до релиза в PROD.',
    recommendedTrack: ai
      ? 'Проверка гипотезы → Разработка'
      : big
        ? 'Разработка продукта'
        : 'Проверка гипотезы',
    budgetMin: (base + (ai ? 4 : 0)) * 850_000,
    budgetMax: (base + (ai ? 4 : 0)) * 1_450_000,
    timelineWeeks: big ? '12–20 недель' : ai ? '8–14 недель' : '4–8 недель',
    team: ai
      ? ['Архитектор', 'ML-инженер', 'Data-инженер', 'Бэкенд', 'PM']
      : big
        ? ['Архитектор', '2× Бэкенд', 'Фронтенд', 'QA', 'Аналитик', 'PM']
        : ['Тимлид', 'Фулстек', 'Дизайнер', 'PM'],
    phases: [
      { name: 'Discovery', detail: 'требования, метрики успеха, архитектура решения' },
      { name: ai ? 'Прототип на данных' : 'Прототип', detail: 'рабочая версия ключевого сценария за 1–2 недели' },
      { name: 'Разработка', detail: 'итерации по 2 недели, демо и измеримый результат' },
      { name: 'Запуск и передача', detail: 'вывод в PROD и передача функции внутрь бизнеса' },
    ],
    risks: [
      'Качество и доступность исходных данных для интеграций',
      'Сроки согласований на стороне заказчика и доступ к системам',
      big ? 'Зависимости от смежных команд и легаси-систем' : 'Уточнение объёма после Discovery',
    ],
  }
}

export function EstimatorDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Estimate | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const submit = useCallback(async () => {
    if (description.trim().length < 8) {
      setError('Опишите задачу чуть подробнее.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    setStep(0)

    // Демо: проигрываем этапы анализа, затем показываем мок-оценку
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 650))
      setStep(i + 1)
    }
    await new Promise((r) => setTimeout(r, 300))
    setResult(mockEstimate(description))
    setLoading(false)
  }, [description])

  const reset = () => {
    setResult(null)
    setError(null)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/80 px-4 py-6 backdrop-blur-md sm:py-12">
      <div className="animate-scale-in relative w-full max-w-2xl overflow-hidden rounded-sm border border-border bg-card shadow-2xl">
        {/* header */}
        <div className="relative flex items-center justify-between border-b border-border bg-primary px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none" aria-hidden>🤖</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
              AI-оценка проекта
            </span>
          </div>
          <button
            aria-label="Закрыть"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          {!result && (
            <>
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
                Опишите задачу — оценим за минуту
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Методология 15 лет ИТ-проектов в AI-агенте. Получите формат
                работы, вилку бюджета, сроки, состав команды и риски.
              </p>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Например: нужно автоматизировать найм — личный кабинет кандидата в интеграции с ATS, дедупликация данных…"
                className="mt-5 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setDescription(ex)}
                    className="rounded-sm border border-border px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}

              {loading ? (
                <div className="mt-6 space-y-2.5 rounded-sm border border-border bg-background/60 p-5">
                  {STEPS.map((s, i) => {
                    const done = step > i
                    const active = step === i
                    return (
                      <div key={s} className="flex items-center gap-3 text-sm">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-sm border transition-colors ${
                            done
                              ? 'border-accent bg-accent text-accent-foreground'
                              : active
                                ? 'border-accent text-accent'
                                : 'border-border text-muted-foreground'
                          }`}
                        >
                          {done ? (
                            <Check className="h-3 w-3" />
                          ) : active ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <span className="font-mono text-[10px]">{i + 1}</span>
                          )}
                        </span>
                        <span
                          className={
                            done || active
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }
                        >
                          {s}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <button
                  onClick={submit}
                  className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
                >
                  Рассчитать оценку
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Демо-оценка для прототипа. Точную дадим бесплатно за 3–5 дней.
              </p>
            </>
          )}

          {result && (
            <div className="reveal in-view">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-sm bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-accent ring-1 ring-accent/30">
                  {result.recommendedTrack}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {result.projectType}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground">
                {result.summary}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-sm border border-border bg-background p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Бюджет (ориентир)
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-primary">
                    {formatRub(result.budgetMin)} – {formatRub(result.budgetMax)}
                  </div>
                </div>
                <div className="rounded-sm border border-border bg-background p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Сроки
                  </div>
                  <div className="mt-1 font-heading text-base font-bold text-primary">
                    {result.timelineWeeks}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Команда
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.team.map((role) => (
                    <span
                      key={role}
                      className="rounded-sm border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Этапы
                </div>
                <ol className="mt-2 space-y-2">
                  {result.phases.map((p, i) => (
                    <li key={p.name} className="flex gap-3 text-sm">
                      <span className="font-mono font-medium text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="text-foreground">{p.name}.</span>{' '}
                        <span className="text-muted-foreground">{p.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Допущения и риски
                </div>
                <ul className="mt-2 space-y-1.5">
                  {result.risks.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-accent">—</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground transition-colors hover:bg-primary"
                >
                  Обсудить с консультантом
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Новая оценка
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
