import type { ComponentType } from 'react'

import { LoyaltyAzs2026Body } from '@/components/research/reports/loyalty-azs-2026'
import { CdpComparison2026Body } from '@/components/research/reports/cdp-comparison-2026'
import { UxB2bTravel2026Body } from '@/components/research/reports/ux-b2b-travel-2026'

// Set to true to publish the research block (home section + /research/* pages + sitemap).
export const RESEARCH_ENABLED = false

export type ReportAccess = 'open' | 'gated'

export type ReportMeta = {
  slug: string
  title: string
  cardTitle: string
  metaTitle: string
  summary: string
  access: ReportAccess
  badge: string
  Body: ComponentType
}

export const REPORTS: Record<string, ReportMeta> = {
  'loyalty-azs-2026': {
    slug: 'loyalty-azs-2026',
    title: 'Конкурентный mystery-audit АЗС-сетей',
    cardTitle: 'Обзор программ\nлояльности АЗС-рынка\nв 2026',
    metaTitle: 'Программы лояльности АЗС, 2026',
    summary:
      'Сравнительный анализ программ лояльности крупнейших АЗС-сетей: механики, барьеры входа, экономика баллов и тренды цифровизации сервисов на заправках.',
    access: 'open',
    badge: 'Открытое исследование · 2026',
    Body: LoyaltyAzs2026Body,
  },
  'ux-b2b-travel-2026': {
    slug: 'ux-b2b-travel-2026',
    title: 'UX B2B Travel, 2026',
    cardTitle: 'UX-аналитика B2B Travel:\nот Anywayanyday\nдо Smartway в 2026',
    metaTitle: 'UX B2B Travel, 2026',
    summary:
      'Сравнение пользовательского опыта ведущих B2B travel-сервисов: поиск и бронирование, согласование командировок, интеграции с бухгалтерией и travel-политиками.',
    access: 'gated',
    badge: 'Закрытое исследование · по запросу',
    Body: UxB2bTravel2026Body,
  },
  'cdp-comparison-2026': {
    slug: 'cdp-comparison-2026',
    title: 'Как выбрать CDP / Loyalty / Comms платформу в 2026?',
    cardTitle: 'Сравнение CDP-систем\n(Loyalty, Campaign, CVM,\nRTDM) в 2025',
    metaTitle: 'Сравнение CDP-систем, 2025',
    summary:
      'Функциональное и архитектурное сравнение CDP-систем: модели данных, сегментация в реальном времени, интеграции с каналами, аналитика и стоимость владения.',
    access: 'gated',
    badge: 'Закрытое исследование · по запросу',
    Body: CdpComparison2026Body,
  },
}

export const REPORTS_ORDER = [
  'loyalty-azs-2026',
  'ux-b2b-travel-2026',
  'cdp-comparison-2026',
] as const

export const REPORT_SLUGS = REPORTS_ORDER as readonly string[]

export const getReport = (slug: string): ReportMeta | undefined => REPORTS[slug]
