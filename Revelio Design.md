# Revelio Design

Дизайн-система сайта revelio.tech. Источник истины — `app/globals.css` (токены) и компоненты в `components/`.

## 1. Идея

Редакционный «инженерный» стиль: тёплая бумага вместо белого, тёмно-синие чернила, один яркий акцент (кобальт), тонкие hairline-границы и чертёжная (blueprint) сетка. Никаких градиентов-«AI-фиолетов», никаких теней ради теней.

## 2. Цвета (OKLCH, семантические токены)

Всегда используем токены (`bg-background`, `text-muted-foreground`, `bg-accent`), а не `text-white` / `bg-[#...]`.

### Светлая тема
| Токен | Значение | Роль |
|---|---|---|
| `--background` | `oklch(0.971 0.008 85)` | тёплая off-white бумага |
| `--foreground` | `oklch(0.205 0.04 265)` | чернила с синим отливом |
| `--card` | `oklch(0.992 0.004 85)` | поверхность карточки |
| `--primary` | `oklch(0.285 0.085 265)` | глубокий navy — доминанта бренда |
| `--secondary` / `--muted` | `oklch(0.945 0.012 85)` | подложки, плашки |
| `--muted-foreground` | `oklch(0.46 0.035 265)` | вторичный текст |
| `--accent` / `--accent-2` / `--ring` | `oklch(0.55 0.2 255)` | кобальт — единственный яркий цвет |
| `--destructive` | `oklch(0.58 0.21 27)` | ошибки |
| `--border` | `oklch(0.285 0.085 265 / 14%)` | hairline |
| `--blueprint-line` | `oklch(0.285 0.085 265 / 0.05)` | чертёжная сетка |
| selection | акцент 90% на белом тексте | выделение |

### Тёмная тема (`.dark`)
| Токен | Значение | Роль |
|---|---|---|
| `--background` | `oklch(0.17 0.025 265)` | тёмный navy, не чёрный |
| `--foreground` | `oklch(0.95 0.01 85)` | off-white |
| `--card` | `oklch(0.215 0.028 265)` | поверхность светлее фона |
| `--primary` | `oklch(0.95 0.01 85)` | инвертированные панели/CTA |
| `--accent` | `oklch(0.82 0.13 75)` | тёплый янтарь — акцент тёмной темы |
| `--border` | `oklch(1 0 0 / 12%)` | hairline |

Charts: `--chart-1…5` производные от navy/акцента.

## 3. Типографика

- `--font-heading` → **Inter Tight** (`--font-display`): заголовки, `uppercase`, `font-black`, `leading-[1.04]`, `tracking-[-0.02em]`.
- `--font-sans` → **Inter**: основной текст, `leading-relaxed`.
- `--font-mono` → **JetBrains Mono**: метки, теги разделов, кнопки — `text-[11px]/[12px] uppercase tracking-[0.16em…0.2em]`.
- Глобально `body { letter-spacing: -0.02em }` — «сбитая», плотная посадка.
- Шкала H1: `text-4xl → sm:text-6xl → lg:text-7xl`.
- Правило контента: точки в конце коротких предложений/подписей не ставим.

## 4. Радиусы и формы

`--radius: 0.9rem` (~14px), производные `sm 0.6× / md 0.8× / lg 1× / xl 1.4× / 2xl 1.8× / 3xl 2.2× / 4xl 2.6×`.
Кнопки — `rounded-lg`; чипы и метки — `rounded-full`; крупные карточки — `rounded-2xl/3xl`.

## 5. Компоненты

**Кнопка-CTA (primary):** `rounded-lg bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground hover:bg-primary`.
**Кнопка-secondary:** `border border-border bg-secondary text-primary hover:bg-muted hover:text-accent`.
**Метка раздела:** моно-капс в квадратных скобках — `[ Кейсы ]`, `[ Медиа ]`, `[ Онбординг ]`.
**Чип:** `rounded-full bg-secondary px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground`.
**Карточки (Кейсы, Журнал):** `bg-card`, hairline-граница, обложка встык к краям карточки (без внутренних отступов у иллюстраций), hover — смена цвета/границы, без трансформаций (Safari-баг с мигающими слоями).
**Раскладка «внахлёст»:** мозаичные колонки; там где нужен детерминированный порядок — ручные колонки во flex вместо CSS columns.

## 6. Сетка и ритм

- Контейнер: `mx-auto max-w-7xl px-5 sm:px-8`.
- Секции — вертикальный ритм крупными шагами, между блоками hairline-разделители (используем экономно).
- Фон-текстура: утилита `.blueprint` — две linear-gradient сетки в 1px по `--blueprint-line`.

## 7. Движение

- `.reveal` + `.in-view` → `fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1)`.
- `.animate-scale-in` → 0.4s, лёгкий подъём + масштаб 0.98→1.
- `.animate-marquee` → 38s linear infinite, пауза по hover (`.marquee-paused`).
- Переходы hover: `duration-300`, только цвет/граница.
- `prefers-reduced-motion: reduce` отключает все анимации.

## 8. Правила

1. Никаких хардкод-цветов в компонентах — только токены.
2. Один яркий акцент на экран; navy держит композицию.
3. Тени почти не используем — иерархия через границы, плотность и типографику.
4. Изображения/обложки — `object-cover` встык, `object-contain` только для логотипов и скриншотов.
5. Ассеты с CDN подключаем с префиксом `ASSET_HOST`, иначе не резолвятся на проде.
6. Интерактивные элементы обязаны иметь `cursor: pointer` (задано глобально).
