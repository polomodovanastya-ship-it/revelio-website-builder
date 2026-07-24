'use client'
// TEMPORARY visual-preview of the FULL assessment report (all sections + Gantt). DELETE after review.
import { PageContainer } from '@/components/page-shell'
import { ReportView } from '@/components/assessment/report-view'
import { reportFixture } from '@/lib/report-fixture'
import type { ReportData, ReportSchedule } from '@/lib/report-api'

const schedule: ReportSchedule = {
  unit: 'workday',
  workday_hours: 8,
  total_units: 40,
  anchor_label: 'ориентировочно, от 24 июл 2026, рабочие дни',
  team: [
    { role: 'analyst', label: 'Аналитик', min: 1, target: 1, max: 2 },
    { role: 'backend', label: 'Разработка', min: 2, target: 3, max: 4 },
    { role: 'devops', label: 'DevOps', min: 1, target: 1, max: 2 },
    { role: 'qa', label: 'QA', min: 1, target: 2, max: 2 },
    { role: 'pm', label: 'PM', min: 1, target: 1, max: 1 },
  ],
  areas: [
    { area: 'infra', label: 'Инфраструктура', start_unit: 0, duration_unit: 15, lane_count: 2 },
    { area: 'dev', label: 'Разработка функциональности', start_unit: 8, duration_unit: 20, lane_count: 3 },
    { area: 'integr', label: 'Интеграции', start_unit: 20, duration_unit: 8, lane_count: 2 },
    { area: 'qa', label: 'Тестирование и QA', start_unit: 28, duration_unit: 12, lane_count: 2 },
    { area: 'docs', label: 'Документация', start_unit: 32, duration_unit: 6, lane_count: 1 },
  ],
  tasks: [
    { task_id: 'T1', area: 'infra', label: 'Реализация требований ИБ', start_unit: 0, duration_unit: 6, lane: 0, depends_on: [], is_fallback: false },
    { task_id: 'T2', area: 'infra', label: 'Подготовка инфраструктуры для масштабирования', start_unit: 0, duration_unit: 8, lane: 1, depends_on: [], is_fallback: false },
    { task_id: 'T3', area: 'infra', label: 'Контейнеризация и развёртывание', start_unit: 8, duration_unit: 7, lane: 0, depends_on: ['T2'], is_fallback: false },
    { task_id: 'T4', area: 'dev', label: 'Разработка ядра мультиагентной платформы', start_unit: 8, duration_unit: 12, lane: 0, depends_on: ['T1'], is_fallback: false },
    { task_id: 'T6', area: 'dev', label: 'Аутентификация и авторизация', start_unit: 8, duration_unit: 6, lane: 1, depends_on: ['T1'], is_fallback: false },
    { task_id: 'T5', area: 'dev', label: 'ИИ-ассистент для анализа операций РЦ', start_unit: 14, duration_unit: 10, lane: 2, depends_on: ['T4'], is_fallback: false },
    { task_id: 'T7', area: 'integr', label: 'Интеграция с LLM-моделями заказчика', start_unit: 20, duration_unit: 5, lane: 0, depends_on: ['T4'], is_fallback: true },
    { task_id: 'T8', area: 'integr', label: 'Интеграция с Trino', start_unit: 20, duration_unit: 5, lane: 1, depends_on: ['T4'], is_fallback: true },
    { task_id: 'T9', area: 'qa', label: 'Нагрузочное тестирование (300 польз.)', start_unit: 28, duration_unit: 6, lane: 0, depends_on: ['T5', 'T7'], is_fallback: false },
    { task_id: 'T10', area: 'qa', label: 'ПСИ и совместное тестирование', start_unit: 34, duration_unit: 6, lane: 0, depends_on: ['T9'], is_fallback: false },
    { task_id: 'T11', area: 'docs', label: 'Руководство пользователя', start_unit: 32, duration_unit: 6, lane: 0, depends_on: ['T5'], is_fallback: false },
  ],
  overhead_lanes: [
    { role: 'pm', label: 'Project Manager', start_unit: 0, duration_unit: 40, hours: 160 },
    { role: 'analyst', label: 'Аналитик (сопровождение)', start_unit: 0, duration_unit: 20, hours: 120 },
    { role: 'qa', label: 'QA (ранние проверки)', start_unit: 20, duration_unit: 20, hours: 100 },
  ],
}

const data: ReportData = { ...reportFixture, schedule }

export default function AssessmentPreviewPage() {
  return (
    <PageContainer>
      <ReportView data={data} token="preview" password="preview" />
    </PageContainer>
  )
}
