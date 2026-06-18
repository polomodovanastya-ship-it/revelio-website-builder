'use client'

export const projectTypes = [
  { id: "audit", label: "Аудит существующего проекта — оценить качество текущего решения и выявить технический долг" },
  { id: "new_direction", label: "Новое направление — запустить продукт или сервис с нуля" },
  { id: "product", label: "Продуктовая разработка — развивать существующий продукт (новые фичи, масштабирование)" },
  { id: "existing", label: "Доработка готового решения — изменить или расширить функциональность уже работающего продукта" },
  { id: "other", label: "Другое" },
]

export const industries = [
  "B2B SaaS",
  "Финтех",
  "EdTech",
  "E-commerce",
  "Маркетплейсы",
  "Здравоохранение",
  "Логистика и доставка",
  "Недвижимость",
  "Туризм и гостеприимство",
  "Телеком",
  "Медиа и развлечения",
  "HR Tech",
  "Страхование",
  "Ритейл",
  "Производство",
  "Энергетика",
  "Другое",
]

export const goalOptions = [
  "Понять стоимость и сроки",
  "Оценить риски проекта",
  "Сравнить варианты реализации",
  "Подготовить бюджет для руководства",
  "Проверить реалистичность планов",
  "Оценить техдолг",
  "Спланировать миграцию",
  "Оценить интеграции",
  "Подготовить pitch для инвесторов",
  "Найти узкие места в архитектуре",
  "Оценить MVP",
  "Спланировать масштабирование",
  "Оценить поддержку legacy",
  "Подготовить RFP/тендер",
  "Оценить аутсорсинг vs inhouse",
  "Проверить подрядчика",
  "Оценить compliance и безопасность",
  "Подготовить roadmap",
  "Другое",
]

export const contactMethods = ["Почта", "Звонок", "Мессенджеры"]

export const countryCodes = [
  { code: "+7", label: "🇷🇺 +7" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+48", label: "🇵🇱 +48" },
  { code: "+46", label: "🇸🇪 +46" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+43", label: "🇦🇹 +43" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
]

export const STEPS = [
  { id: 1, title: "О проекте" },
  { id: 2, title: "Обзор" },
  { id: 3, title: "Контакты" },
]

export const MAX_GOALS = 3

interface FieldProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  error?: boolean
  errorMessage?: string
  required?: boolean
}

export function Field({ children, title, subtitle, error, errorMessage, required }: FieldProps) {
  return (
    <div
      data-error={error || undefined}
      className={`rounded-2xl border p-4 transition-all ${
        error
          ? "border-destructive/40 bg-destructive/5 ring-1 ring-destructive/30"
          : "border-border bg-card"
      }`}
    >
      <div className="mb-3">
        <div className="text-sm font-semibold">
          {title}
          {required && <span className="ml-1 text-destructive">*</span>}
        </div>
        {subtitle && <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
      {error && errorMessage && <div className="mt-2 text-sm text-destructive">{errorMessage}</div>}
    </div>
  )
}

interface ChipSelectProps {
  options: string[]
  selected: string | string[]
  onToggle: (value: string) => void
  multi?: boolean
}

export function ChipSelect({ options, selected, onToggle, multi }: ChipSelectProps) {
  const isSelected = (opt: string) =>
    Array.isArray(selected) ? selected.includes(opt) : selected === opt

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = isSelected(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-foreground hover:border-primary/40"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
