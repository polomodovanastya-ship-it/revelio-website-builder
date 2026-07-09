// lib/cdp-research-data.ts
import type { LucideIcon } from 'lucide-react'
import {
  Megaphone, Gem, Cpu, ClipboardList,
  ShoppingCart, Store, UtensilsCrossed, Trophy, Cast, Landmark,
  ShieldCheck, Dumbbell, TrendingUp, Fuel, Gamepad2, Plane,
  Cloud, Users, Puzzle, Receipt, Coins, Timer, Server, Handshake,
} from 'lucide-react'
import type { RadarSeries } from '@/components/research/report-radar'
import methodologyAsset from '@/src/assets/methodology-cdp-criteria.xlsx.asset.json'

export type IndustryItem = { icon: LucideIcon; label: string }

export const INDUSTRIES: IndustryItem[] = [
  { icon: ShoppingCart, label: 'eCom' },
  { icon: Store, label: 'Ритейл' },
  { icon: UtensilsCrossed, label: 'HoReCa' },
  { icon: Trophy, label: 'Спорт-менеджмент' },
  { icon: Cast, label: 'Стриминги' },
  { icon: Landmark, label: 'Банки' },
  { icon: ShieldCheck, label: 'Страхование' },
  { icon: Dumbbell, label: 'Фитнес' },
  { icon: TrendingUp, label: 'Брокеры' },
  { icon: Fuel, label: 'АЗС-сети' },
  { icon: Gamepad2, label: 'Gaming-tech' },
  { icon: Plane, label: 'Travel B2C' },
]

export type AudienceRole = { icon: LucideIcon; label: string }

export const AUDIENCE_ROLES: AudienceRole[] = [
  { icon: Megaphone, label: 'CMO' },
  { icon: Gem, label: 'Руководителю CRM-маркетинга или программы лояльности' },
  { icon: Cpu, label: 'CIO' },
  { icon: ClipboardList, label: 'Project / Product Manager-у' },
]

export type CloudOnpremQuestion = { icon: LucideIcon; text: string }

export const CLOUD_ONPREM_QUESTIONS: CloudOnpremQuestion[] = [
  { icon: Cloud, text: 'Когда выбирать облако или onprem?' },
  { icon: Users, text: 'Какой продукт выбрать если у меня 1 млн, до 3 млн или 10+ млн MAU?' },
  { icon: Puzzle, text: 'У кого меньше ограничений в конструкторе механик?' },
  { icon: Receipt, text: 'Почему лояльность для анонимных чеков – база?' },
  { icon: Coins, text: 'Какие фичи помогут нарастить регулярную выручку с клиента? (ARPU)' },
  { icon: Timer, text: 'Я открою ПО и настрою активацию за 30 минут?' },
  { icon: Server, text: 'Сколько нужно vCPU, vRAM, vHDD для onprem?' },
  { icon: Handshake, text: 'Можно внедрить самостоятельно? А когда с интегратором?' },
]

export const SECRET_KNOWLEDGE_NOTE = 'и другие секретные знания :)'

export const MODULES = [
  'Финансы и устойчивость',
  'Golden ID, MDM и профили',
  'Сегментация',
  'Loyalty',
  'Campaign',
  'Опросы',
  'Интеграции',
  'Контакт-центр',
  'ML и рекомендации',
  'Аналитика и отчеты',
  'Архитектура',
  'Администрирование',
  'Безопасность',
  'Поддержка и развитие',
  'Команда / Свобода изменений',
]

export const RESEARCH_STATS = {
  vendorsValue: '12',
  vendorsLabel: 'вендоров',
  criteriaValue: '150+',
  criteriaLabel: 'критериев',
  blockFactorsNote: 'Блок-факторы и желательные фичи',
  liveDemoNote: 'Live-демо по запросу',
  docConfirmNote: 'Подтверждение через документацию',
}

export const METHODOLOGY_XLSX_HREF = methodologyAsset.url

export const ONPREM_VENDORS = ['Manzana', 'Rubbles', 'Loymax', 'RightWay']
export const CLOUD_VENDORS = ['Mindbox', 'Retail Rocket', 'KonnectU', 'Altcraft']
export const OTHER_VENDORS = ['REES46', 'HFLabs', 'CSI SetLoyalty', 'MAXMA']

// PDF page 1/2 states these two numbers directly; they don't equal any single
// vendor's own total (Loymax's own badge is 339 — see VENDOR_SCORES). Kept
// faithful to the source rather than reconciled.
export const MIN_SCORE = 237
export const MAX_SCORE = 331

// --- Radar data -----------------------------------------------------------
// Real per-criterion point totals, sourced from the two research Google
// Sheets (5-criteria comparison + aggregated analysis tab). communityScore
// is the one NOT sourced from the sheets: it's an expert 1-10 estimate from
// the PDF vendor write-ups (explicit "развитая база знаний" mentions score
// higher; vendors with no such mention get a neutral 5).

export type VendorGroup = 'onprem' | 'cloud'

export type VendorRawScore = {
  name: string
  group: VendorGroup
  color: string
  totalScore: number
  data: number
  campaigns: number
  integrations: number
  itArchitecture: number
  infoSecurity: number
  communityScore: number
}

export const VENDOR_SCORES: VendorRawScore[] = [
  { name: 'Manzana', group: 'onprem', color: '#C0392B', totalScore: 281, data: 46, campaigns: 94, integrations: 28.5, itArchitecture: 29, infoSecurity: 19.5, communityScore: 8 },
  { name: 'Rubbles', group: 'onprem', color: '#2E8B57', totalScore: 310, data: 47, campaigns: 110, integrations: 21, itArchitecture: 42, infoSecurity: 23, communityScore: 3 },
  { name: 'Loymax', group: 'onprem', color: '#D4A017', totalScore: 339, data: 48, campaigns: 110, integrations: 32.5, itArchitecture: 37, infoSecurity: 23, communityScore: 8 },
  { name: 'RightWay', group: 'onprem', color: '#3B82F6', totalScore: 237, data: 43, campaigns: 74.5, integrations: 21, itArchitecture: 33, infoSecurity: 17, communityScore: 4 },
  { name: 'Mindbox', group: 'cloud', color: '#C0392B', totalScore: 276, data: 45, campaigns: 107.5, integrations: 34, itArchitecture: 24, infoSecurity: 21.5, communityScore: 5 },
  { name: 'Retail Rocket', group: 'cloud', color: '#2E8B57', totalScore: 276, data: 42, campaigns: 103, integrations: 33, itArchitecture: 24, infoSecurity: 15, communityScore: 5 },
  { name: 'KonnectU', group: 'cloud', color: '#D4A017', totalScore: 257, data: 41, campaigns: 94, integrations: 29, itArchitecture: 23, infoSecurity: 22, communityScore: 5 },
  { name: 'Altcraft', group: 'cloud', color: '#3B82F6', totalScore: 268, data: 48.5, campaigns: 84, integrations: 28, itArchitecture: 18.5, infoSecurity: 21, communityScore: 5 },
]

// Axes 1 and 2 are line-broken deliberately: ReportRadar positions long axis
// labels near the SVG viewBox edge, where browsers clip <svg> overflow by
// default — a single long line runs off-canvas. Two shorter lines stay inside.
export const RADAR_AXES = [
  'Данные + Кампании + Интеграции',
  'Комьюнити\nи обучение',
  'Инфобез /\nАрхитектура',
]

function segmentValues(v: VendorRawScore): number[] {
  return [
    v.data + v.campaigns + v.integrations,
    v.communityScore,
    v.itArchitecture + v.infoSecurity,
  ]
}

const AXIS_MAX = RADAR_AXES.map((_, i) => Math.max(...VENDOR_SCORES.map((v) => segmentValues(v)[i])))

export function radarSeriesFor(group: VendorGroup): RadarSeries[] {
  return VENDOR_SCORES.filter((v) => v.group === group).map((v) => ({
    name: v.name,
    color: v.color,
    values: segmentValues(v).map((val, i) => Math.round((val / AXIS_MAX[i]) * 100) / 10),
  }))
}

// --- Recommendations --------------------------------------------------------

export type RecCategory = 'ФИЧИ' | 'ДЕНЬГИ' | 'ВНЕДРЕНИЕ' | 'АРХИТЕКТУРА' | 'КОМАНДА'

export type Recommendation = { categories: RecCategory[]; title: string; text: string }

export const RECOMMENDATIONS: Recommendation[] = [
  { categories: ['ФИЧИ'], title: 'Для опросов клиентов – отдельный продукт', text: 'У большинства – слабый модуль опросов, если нужно функциональное – взять CarrotQuest или Oprosso' },
  { categories: ['ДЕНЬГИ', 'ВНЕДРЕНИЕ'], title: '40+ млн руб – минимум за внедрение onprem', text: 'Onprem внедрение дороже cloud-a, и внедрение 2–4 модулей на 1-4M MAU в TCO на 3 года = 55-120 млн ₽' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ', 'АРХИТЕКТУРА'], title: 'Кассы, рассылки и МП – основные точки отказа', text: 'Проектирование игрового приложения для поколений 8–16 лет в интеграции с механиками программы лояльности' },
  { categories: ['ВНЕДРЕНИЕ', 'АРХИТЕКТУРА'], title: 'Если PROD DB уже 5+ TB не забудьте про…', text: '…архивирование, партиционирование, запись инкрементами в DWH и шлюз для стабильности сервисов лояльности' },
  { categories: ['ВНЕДРЕНИЕ', 'АРХИТЕКТУРА'], title: 'Не переключайтесь «рубильником»', text: 'Параллельная работа 2 процессингов лояльности сложнее, но безопаснее. Или имейте план отката :)' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: 'Appmetrica по МП → в CDP это триггеры для ++ к ARPU', text: 'Данные о визитах и просмотрах — 2/3 успеха в триггерных кампаниях на онбординг, отток и удержание' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: 'Без «виртуальной кассы» как без рук', text: 'Моделирование акций в Excel — это 3-5 дней к принятию решения о запуске. Считайте экономику прямо в CDP' },
  { categories: ['ФИЧИ'], title: 'Пополнение профиля клиента атрибутами', text: 'Система тегов у Retail Rocket – одна из лучших для триггерных подходов в кампаниях' },
  { categories: ['ВНЕДРЕНИЕ', 'КОМАНДА'], title: 'Культура оценки разработки', text: 'Обязательно смотреть не презентации и демо, а структуру БД и API сервисов демо-стенда перед покупкой лицензий' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: 'Что такое нормальная скорость запуска акций?', text: '1 день на тираж, ~5 на новую механику. Переход от пре-аппрува к запуску с лимитами ускоряет запуски в 2-3 раза' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: 'Расчеты финансов и согласование акций', text: 'Не в CDP и не в Loyalty – аппрувы это отдельный бизнес-процесс – не про календарь промо' },
  { categories: ['ФИЧИ', 'ДЕНЬГИ'], title: 'Конфликт ценообразования и лояльности', text: 'То, за что увольняют Head of Loyalty. Поэтому не забудьте интегрировать макс. глубину дисконта из прайсинга' },
  { categories: ['ДЕНЬГИ', 'АРХИТЕКТУРА'], title: 'Крутость, но боль зоопарка продуктов', text: 'Модули от разных вендоров дадут желаемые фичи на максимуме, но стоимость эксплуатации и сложность интеграции будет огромна' },
  { categories: ['ФИЧИ', 'ДЕНЬГИ'], title: 'Ограничения моно-вендора', text: 'Один вендор = компромиссы и нехватка функционала, но по опыту средний бизнес использует не более 20% от предлагаемого функционала' },
  { categories: ['ДЕНЬГИ', 'ВНЕДРЕНИЕ'], title: 'Измеряйте внедрение в бизнес-драйверах', text: 'Если не описать кол-во «чего» для каждой сущности: акция, кампания, интеграция – внедрение обойдется х3-5 раз дороже' },
  { categories: ['ФИЧИ'], title: 'Избыток акций → отток', text: 'Избыток акций снижает активность пользователей в ПЛ. Персонализируйте, что хорошо работает' },
  { categories: ['ФИЧИ'], title: 'Отзывы за баллы – источник (VoC) не хуже Nielsen', text: 'Собирайте обратную связь прямо в моменте начисления баллов — это дешевле и быстрее внешних опросных панелей' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: 'Не используйте встроенный контакт-центр', text: '«Родной» Service Desk в CDP часто медленный и неудобный. Лучше интегрировать 5-6 сервисов в сторонний' },
  { categories: ['АРХИТЕКТУРА', 'КОМАНДА'], title: 'Обращайте внимание, «откуда» вырос продукт', text: 'Из «BPM-решения», из мини-сервиса опросов, копия SAS, копия Exponea, нацелен изначально на СМБ и т.д.' },
  { categories: ['ФИЧИ', 'ДЕНЬГИ'], title: 'Не забудьте про антифрод', text: 'Объем фрода на 5 млн MAU может достигать 200 млн руб / год – отслеживайте через дэшборды и противодействуйте правилами' },
  { categories: ['ФИЧИ', 'ВНЕДРЕНИЕ'], title: '«Реализуйте акцию» лучшая проверка', text: 'Передайте вендору перечень своих акций и предложите показать нативную реализацию на демо – вы сразу поймете, какой продукт вам не подходит' },
]

// --- Vendor profiles ---------------------------------------------------------

export type VendorResources = { docs?: string; api?: string; cases?: string; sla?: string }

export type VendorProfile = { name: string; score?: number; resources?: VendorResources; pros: string[]; cons: string[] }


export const VENDOR_PROFILES: VendorProfile[] = [
  {
    name: 'Rubbles', score: 310,
    pros: [
      'Каждое внедрение – глубоко кастомизированный форк',
      'Выдается доступ к базе и настройкам',
      'Быстрая обработка данных в Real Time (до 0.5 мс)',
      'Возможность построения сегментов на Greenplum КХД',
      'Есть модули для предиктивного моделирования и Next Best Offer',
      'Большой опыт работы с розницей + eCom + HoReCa',
      'Сильный Canvas для сегментации и цепочек + шаблонов',
    ],
    cons: [
      'Внедрения могут идти 1,5–2 года с постоянной борьбой с ошибками',
      'Нестабильность компании вендора и команды в 24–26 годах',
      'Высокая стоимость и долгий срок внедрения',
      'Слабо реализован модуль лояльности',
      'Отсутствие опросов (NPS) функционала Customer Care',
    ],
  },
  {
    name: 'Retail Rocket', score: 276,
    pros: [
      'Super friendly UX – 30 мин и создаешь реальные механики',
      'Уникальные фичи: теги, анонимные чеки, не суммирование акций',
      'Быстрая обработка данных в Real Time (до 0.5 мс)',
      'Кастомизация атрибутов для акций и пользователей',
      'Большая экспертиза и хорошее понимание бизнес-процессов ритейла',
      'Развитая персонализация и рекомендации (+40 алгоритмов, запатентованный Next Best Offer)',
      'Лучшее соотношение «Фичи» vs «Marketing Time-to-market» vs «Цена»',
    ],
    cons: [
      'Подписка по событиям (в перспективе дорого)',
      'Риски внедрения в контуре (шлюзы)',
      'Слабые лимиты и политики ограничений',
      'Заградительная (высокая) стоимость на выкуп кода',
    ],
  },
  {
    name: 'RightWay', score: 237,
    pros: [
      'Сильный BPM-конструктор (согласования)',
      'Хорошая ролевая модель + атрибутивный редактор',
      'Развитая партнерская сеть интеграций',
      'Гибкость доработок кастомизации',
    ],
    cons: [
      'Слабый интерфейс (сегментация)',
      'Слабый core лояльности по фичам',
      'Большое количество функционала либо «в доработке», либо не реализовано',
      'Слабо представлены крупные Enterprise-кейсы',
      'Вопрос к поддерживаемости: технология BPMSoft/Creatio требует отдельной экспертизы',
    ],
  },
  {
    name: 'Loymax', score: 339,
    pros: [
      'Качественно проработанные интеграционные сервисы под кассы / мобилки',
      'Сильная персонализация под кейсы ритейла',
      'Развитая база знаний',
      'Отличная готовая отчетность по лояльности и коммуникациям',
      'Готовые ML-возможности',
    ],
    cons: [
      'Высокая стоимость',
      'Отсутствие функции выделения конфликтов и кросс-наложения маркетинговых акций',
      'Сложная переговорная позиция из-за лидерства на рынке',
    ],
  },
  {
    name: 'Manzana', score: 281,
    pros: [
      'Платформа построена вокруг мощного ядра лояльности — ключевое преимущество для бизнеса с развитыми программами лояльности',
      'Давно на рынке (с 2004 г.), крупные клиенты',
      'Развитые механики и сервисы лояльности + интеграционные сервисы под кассы / мобилки, сегментация клиентов',
      'Развитая база знаний и модуль обучения по работе с платформой',
      'RPS 15 000 по чековым транзакциям',
      'Есть модуль AI-персонализированных предложений по KPI клиента',
    ],
    cons: [
      'Архитектурные риски зависимости CDP-функционала от лояльности, ограничения гибкости при интеграции с другими системами',
      'Передача и обновление данных занимают до 30 минут, что критично для Real-Time кампаний',
      'Отчеты строятся в основном через внешние BI, а не внутри платформы',
      'Слабый модуль контакт-центра',
      'Есть проблемы с загрузками балансов и транзакциями внутри разных модулей системы',
    ],
  },
]

export const HONORABLE_MENTIONS: VendorProfile[] = [
  {
    name: 'REES46',
    pros: [
      'All-in-one решение',
      'Развитые механики и сервисы лояльности',
      'Нестандартные механики («модуль выгоды» – прямая скидка / бонусы)',
      'Развитое A/B-тестирование (для всех сущностей)',
      'Личная вовлеченность руководства / менеджмента в проекты',
    ],
    cons: [
      'Небольшая выручка и предыстория компании (по сравнению с основными конкурентами)',
      'Сложности в арбитраже акций при их пересечении',
    ],
  },
  {
    name: 'HFLabs',
    pros: [
      'Зрелая команда для доработки в контуре',
      'Сильная система дедупликации',
      'Неординарные интерфейсные решения (вложенные сегменты, пересечения сущностей)',
      'Хорошо продуманы лимиты',
    ],
    cons: [
      'Есть опыт в банкинге, но нет адаптации сущностей под ритейл и другие сегменты рынка',
      'Ограничения по самостоятельной кастомной доработке',
      'Отсутствие процессинга ПЛ, только CDP + Campaign',
      'Отсутствие опыта интеграции с ПЛ',
    ],
  },
  {
    name: 'CSI SetLoyalty',
    pros: [
      'Глубокая детализация всех контактов с клиентом с наличием дедупликации',
      'Расширенные возможности управления бонусами (история, api, срочные, начисление/списание из кабинета)',
      'Кассовая экспертиза (кассы CSI)',
      'Антифрод по количеству операций и сумме',
      'Хороший редактор сегментов (динамический, статический, работа с RFM)',
      'Работа с пересечением акций (запрет, суммация, приоритет)',
    ],
    cons: [
      'Нет вариативности правил начисления/списания бонусов',
      'Не real-time, а Т+1',
      'Из коммуникаций реализованы только моб. пуши, но нет баннеров и поп-ап',
      'Низкий time-to-market по новым механикам',
      'Не реализованы алерты о пересечении акции',
      'Отсутствует фиксация источников для промокодов и кампаний (UTM-метки, партнёры, каналы привлечения)',
    ],
  },
]

// --- Heatmap ------------------------------------------------------------

export type HeatStatus = 'advanced' | 'key' | 'limited'

export const HEATMAP_VENDORS = ['Rubbles', 'Loymax', 'Mindbox', 'Retail Rocket', 'Altcraft', 'Manzana', 'RightWay', 'KonnectU']

export const HEATMAP_ROWS: { criterion: string; statuses: HeatStatus[] }[] = [
  { criterion: 'Golden ID', statuses: ['advanced', 'advanced', 'advanced', 'advanced', 'limited', 'advanced', 'advanced', 'advanced'] },
  { criterion: 'Real-Time', statuses: ['advanced', 'advanced', 'advanced', 'advanced', 'key', 'limited', 'key', 'advanced'] },
  { criterion: 'Canvas / CJM', statuses: ['advanced', 'advanced', 'advanced', 'advanced', 'advanced', 'advanced', 'limited', 'advanced'] },
  { criterion: 'Webhooks', statuses: ['advanced', 'advanced', 'advanced', 'advanced', 'advanced', 'limited', 'advanced', 'advanced'] },
  { criterion: 'Встроенная аналитика', statuses: ['advanced', 'advanced', 'advanced', 'advanced', 'advanced', 'limited', 'limited', 'advanced'] },
  { criterion: 'Опросы (NPS)', statuses: ['limited', 'advanced', 'limited', 'limited', 'advanced', 'advanced', 'limited', 'limited'] },
  { criterion: 'Микросервисы', statuses: ['advanced', 'key', 'key', 'key', 'limited', 'key', 'limited', 'key'] },
  { criterion: 'OnPrem опция', statuses: ['advanced', 'advanced', 'limited', 'limited', 'advanced', 'advanced', 'advanced', 'limited'] },
]

export const HEATMAP_LEGEND: { status: HeatStatus; label: string; className: string }[] = [
  { status: 'advanced', label: 'расширенные возможности', className: 'bg-emerald-500' },
  { status: 'key', label: 'есть ключевые фичи', className: 'bg-amber-400' },
  { status: 'limited', label: 'функционал с ограничениями', className: 'bg-orange-500' },
]

// --- When to implement ----------------------------------------------------

export const IF_YOU_SEE = [
  'Прошли федеральные / общие акции (на них хватит и лоялти)',
  'Несколько бизнес-линий (онлайн/оффлайн, смежные)',
  'Начали «перегревать базу» активациями и начался отток',
  'Много факапов с ПД и релевантностью',
  'Делаете много и полезно, но не ясно, что из прироста – ваша заслуга',
]

export const WHEN_YOU_WANT = [
  'Один раз сделали и поправляете онбординг',
  'Дошли до fine-tuning оттока и удержания',
  'Отток от федералки превышает инкремент выручки',
  'Знать факт и прогноз LTV на клиента и по сегменту',
  'Монетизироваться и продавать данные',
]

export type MauTier = {
  range: string
  headcount: string
  stage: 1 | 2 | 3
  stack: string[]
  team: string[]
}

export const MAU_TIERS: MauTier[] = [
  {
    range: 'до 500 000 MAU',
    headcount: '2–5 человек',
    stage: 1,
    stack: ['SaaS', 'желательно all-in-one', 'CDP и есть КХД'],
    team: ['5 в работе, 2 запускаем', 'Федералки', 'Сегменты по XX%'],
  },
  {
    range: '0,5 – 2 млн MAU',
    headcount: '10–15 человек',
    stage: 2,
    stack: ['SaaS / on prem', 'уже желательно КХД хотя бы в 1 слой', 'не дробить на модули', 'но если уже есть Лояльность — можно не перевнедрять, а рядом «Всё остальное»'],
    team: ['можно пробовать цепочки', 'real-time пока не имеет смысла', 'дробить отток и онбординг на 10–30 сегментов'],
  },
  {
    range: 'по дороге к 10 млн MAU',
    headcount: '40 человек',
    stage: 3,
    stack: ['on prem / самописное', 'обязательно КХД в 2 слоя минимум', 'дробить на функции'],
    team: ['моделирование большого', '«Тестирование на бою», кроме федералок', 'больше людей, ролевые модели', 'пробовать ML'],
  },
]

// --- Live-demo checklist ---------------------------------------------------

export type DemoStage = { n: number; title: string; minutes: number; items: string[] }

export const DEMO_CHECKLIST: DemoStage[] = [
  {
    n: 1, title: 'Данные и профиль клиента', minutes: 10,
    items: [
      'Golden ID: покажите клиента, который идентифицирован по телефону, email и ID в приложении',
      'Массовая загрузка атрибутов: CSV с 10 000 клиентов для обогащения профилей новыми атрибутами',
      'Вычисляемые атрибуты: создайте атрибут «Количество покупок за 30 дней / средний чек»',
    ],
  },
  {
    n: 2, title: 'Сегментация', minutes: 15,
    items: [
      'Скорость: создайте сегмент из 3 условий. Засеките время. 5 минут — хорошо, >10 минут — красный флаг',
      'Вложенные сегменты: создайте сегмент из пересечения двух других сегментов',
    ],
  },
  {
    n: 3, title: 'Кампании и цепочки', minutes: 20,
    items: [
      'Триггерная цепочка: «Брошенная корзина → Push через 1 час → Email через 24 часа → SMS через 48 часов» на одном холсте',
      'Настройте A/B-тест триггерной цепочки на существующем сегменте',
      'Настройте каскад: если не открыл Push → отправить SMS',
    ],
  },
  {
    n: 4, title: 'Каналы и интеграции', minutes: 15,
    items: [
      'Создайте шаблон и отправьте тестовое сообщение по одному из каналов (Email, SMS, Mobile Push, Web Push)',
      'Дашборд аналитики по статусам доставки: «доставлено», «открыто», «кликнуто»',
      'Проверьте возможность интеграции с системами: CRM, ERP, PIM вашей компании, наличие документации',
    ],
  },
  {
    n: 5, title: 'Аналитика', minutes: 15,
    items: [
      'Дашборд по кампании: конверсия, доход',
      'Постройте воронку «Клик → Корзина → Покупка»',
      'Когортный анализ: покажите удержание клиентов по месяцам',
    ],
  },
  {
    n: 6, title: 'Q&A', minutes: 15,
    items: ['Свободные вопросы вендору по итогам сценария'],
  },
]

export const DEMO_TOTAL_MINUTES = DEMO_CHECKLIST.reduce((sum, s) => sum + s.minutes, 0)
export const DEMO_VERDICT = 'Если вендор не может выполнить >70% пунктов — исключайте из шорт-листа.'
