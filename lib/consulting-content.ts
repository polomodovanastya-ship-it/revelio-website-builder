// Content for the /consulting page.
// Transcribed verbatim from `sources/Ревелио _ CX-консалтинг (1).pdf`.

export type WorkRow = { label: string; value: string }
export type WorkFormat = {
  id: string
  name: string
  feeling: string
  duration: string
  price: string
  featured?: boolean
  rows: WorkRow[]
  /** When set, the card renders «Всё из <inheritsLabel>, плюс:» before its rows. */
  inheritsLabel?: string
}

export type Artifact = {
  name: string
  result: string
  unit: string
  price: string
}

export type ArtifactGroup = { group: string; items: Artifact[] }
export type Metric = { label: string; dir: 'up' | 'down' }
export type MetricGroup = { title: string; items: Metric[] }

export const STEPS: string[] = ['Анализ', 'Проектирование', 'Внедрение']

export const AREAS: string[] = [
  'Клиентский сервис',
  'Массовый рекрутмент',
  'ИТ-поддержка',
]

export const WORK_FORMATS: WorkFormat[] = [
  {
    id: 'audit',
    name: 'Быстрый аудит',
    feeling: 'Реальное положение дел здесь и сейчас по выбранной зоне или процессу.',
    duration: '2 недели',
    price: '345 000 ₽',
    rows: [
      { label: 'Обследуем AS IS', value: 'бизнес-процессы, ИТ-системы, клиентские пути' },
      { label: 'Интервью', value: 'C-level / middle management / линейный персонал (по ситуации)' },
      { label: 'Метод', value: 'проходим клиентский путь и физически изучаем работу сотрудника «на месте»' },
      { label: 'Рекомендации', value: 'к изменению бизнес-процессов' },
      { label: 'Рекомендации по изменениям', value: 'фичи / продукт / ландшафт' },
      { label: 'Оценка', value: 'влияния изменений на метрики в деньгах' },
      { label: 'Оценка стоимости', value: 'разработки и поддержки на 3 года' },
    ],
  },
  {
    id: 'numbers',
    name: 'Проверка и рекомендации на цифрах',
    feeling: 'Глубокий аудит на цифрах: регламенты, метрики и оценка изменений в деньгах.',
    duration: '4 недели',
    price: '590 000 ₽',
    featured: true,
    inheritsLabel: '«Быстрого аудита»',
    rows: [
      { label: 'Обследование AS IS', value: 'добавляем регламенты и метрики' },
      { label: 'Интервью', value: 'полные: C-level, middle management, линейный персонал' },
      { label: 'Метод', value: 'маппинг «проблемных точек» и «бизнес-метрик»' },
    ],
  },
]

export const ARTIFACTS: ArtifactGroup[] = [
  {
    group: 'AS IS',
    items: [
      { name: 'Классификатор бизнес-процессов', result: 'Excel', unit: 'целиком', price: '440 000' },
      { name: 'Схема бизнес-процесса BPMN', result: 'BPMN', unit: '1 процесс', price: '28 000' },
      {
        name: 'Тепловая карта проблемных точек процессов (операционная стоимость, время, степень автоматизации)',
        result: 'Excel',
        unit: '1 область',
        price: '530 000',
      },
      { name: 'Маппинг проблемных точек и бизнес-метрик', result: 'Excel', unit: '1 область', price: '180 000' },
      { name: 'Customer Journey Map + реестр точек контакта', result: 'Miro, Excel', unit: '—', price: '230 000' },
      { name: 'Описание бизнес- и ИТ-архитектуры', result: 'Word, Archimate', unit: '1 область', price: '140 000' },
      {
        name: 'Сравнение с конкурентами по 50–150 критериям (возможности, фичи, процессы, точки)',
        result: 'Excel',
        unit: '1 область: eCom, CX, HR',
        price: '340 000',
      },
      { name: 'Реальные (!) KPI внутренних и внешних бизнес-процессов', result: 'Excel', unit: '1 область', price: '120 000' },
      { name: 'Матрица команды (зоны ответственности, метрики)', result: 'RACI', unit: '1 юнит', price: '140 000' },
      {
        name: 'Анализ ресурсного планирования линейного персонала (фронт-офис, КЦ, рекрутинг, полевые)',
        result: 'Эрланг / WFM',
        unit: '1 юнит',
        price: '350 000',
      },
    ],
  },
  {
    group: 'TO BE',
    items: [
      {
        name: 'Концепция изменения детальная (команда, орг. структура, метрики, бизнес-драйверы, компетенции, технологии)',
        result: 'PPT',
        unit: '1 юнит',
        price: '480 000',
      },
      { name: 'Целевые бизнес-процессы и клиентские маршруты', result: 'Excel, BPMN, Miro', unit: '1 процесс', price: '54 000' },
      {
        name: 'БТ / ФТ / ТЗ + НФТ к разработке и внедрению продукта или элементов ИТ-ландшафта',
        result: 'Word, Excel',
        unit: '1 продукт',
        price: '350 000',
      },
      { name: 'Целевой ранжированный бэклог / фич-лист', result: 'Task tracker', unit: '1 продукт', price: '240 000' },
      { name: 'Сводная спецификация (оборудование, ПО, работы, поддержка)', result: 'Excel', unit: '1 проект', price: '420 000' },
      { name: 'Инвестиционная модель проекта (TCO), расчёт CAPEX/OPEX на 3–5 лет', result: 'Excel', unit: '1 проект', price: '180 000' },
      { name: 'Оценка бюджета вместе с заказчиком: активы, кадры, NPV, IRR, PI и др.', result: 'Excel', unit: '1 проект', price: '240 000' },
      { name: 'Расчёт ROI на 3–5 лет', result: 'Excel', unit: '1 проект', price: '140 000' },
      {
        name: 'Классификация требований для анализа решений («из коробки», настройка, доработка ядра, интеграция)',
        result: 'Excel',
        unit: '1 проект',
        price: '23 000',
      },
      {
        name: 'Анализ поставщиков решений: как БТ и ФТ ложатся на продукт и отражаются на Scope of Work',
        result: 'Excel, PPT',
        unit: '1 проект, до 20 поставщиков',
        price: '630 000',
      },
      { name: 'Скоринг поставщиков решений (от продукта и требований)', result: 'Excel', unit: '1 проект', price: '210 000' },
      { name: 'Целевая архитектура решения и описание потоков данных', result: 'Archimate', unit: '1 проект', price: '180 000' },
      {
        name: 'Описание источников данных, структуры и архитектуры обработки/хранения + модели данных',
        result: 'Archimate, Word',
        unit: '1 проект',
        price: 'по запросу',
      },
      { name: 'Спецификация на интеграционные и логические связи между модулями', result: 'Word', unit: '1 проект', price: 'по запросу' },
      { name: 'Целевая ролевая модель', result: 'Word', unit: '1 продукт', price: 'по запросу' },
    ],
  },
]

export const METRIC_GROUPS: MetricGroup[] = [
  {
    title: 'Операционные и клиентские',
    items: [
      { label: 'NPS', dir: 'up' },
      { label: 'Service Level', dir: 'up' },
      { label: 'CSAT', dir: 'up' },
      { label: 'Полезная утилизация', dir: 'up' },
      { label: '% корректного планирования смен', dir: 'up' },
      { label: 'Отток персонала', dir: 'down' },
      { label: 'Пропущенные звонки', dir: 'down' },
      { label: 'Доля повторных обращений', dir: 'down' },
    ],
  },
  {
    title: 'Коммерческие',
    items: [
      { label: 'LTV', dir: 'up' },
      { label: 'Конверсия', dir: 'up' },
      { label: 'Удержание клиента', dir: 'up' },
      { label: 'Средний чек', dir: 'up' },
      { label: 'CAC', dir: 'down' },
      { label: 'ФОТ', dir: 'down' },
      { label: 'Стоимость владения ИТ', dir: 'down' },
      { label: 'Стоимость 1 минуты поддержки', dir: 'down' },
      { label: 'Кол-во FTE поддержки', dir: 'down' },
    ],
  },
]

export const SOLUTION_CLASSES: string[] = [
  'Мобильное приложение',
  'Веб-сайт',
  'eCom / интернет-магазин',
  'Личный кабинет',
  'Закупочный портал',
  'HR-портал',
  'Категорийный портал',
  'Ценообразование',
  'HRM',
  'oCRM',
  'aCRM / Campaign',
  'Loyalty / CDP',
  'MDM / НСИ',
  'Веб, мобайл и сквозная аналитика',
  'CX: голосовой контакт-центр, чат, QM, Voice Analytics',
  'Help Desk / Service Desk',
  'ОЦО и ITSM',
  'DWH / Data Lake (+ Data Quality, Data Catalog, CDC)',
]
