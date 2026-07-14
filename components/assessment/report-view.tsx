'use client'
import { useCallback, useMemo, useState } from 'react'
import { useToast } from '@/components/toast'
import { downloadReport, type ReportData, type ReportDownloadKind } from '@/lib/report-api'
import { resolveProjectType } from '@/lib/report-format'
import { DownloadsBar } from './downloads-bar'
import { ReportNav } from './report-nav'
import { SummarySection } from './sections/summary-section'
import { ContextSection } from './sections/context-section'
import { GroupsSection } from './sections/groups-section'
import { RolesSection } from './sections/roles-section'
import { TasksSection } from './sections/tasks-section'
import { RisksSection } from './sections/risks-section'
import { AssumptionsSection } from './sections/assumptions-section'
import { AccuracySection } from './sections/accuracy-section'
import { QuestionsSection } from './sections/questions-section'

interface ReportViewProps {
  data: ReportData
  token: string
  password: string
}

export function ReportView({ data, token, password }: ReportViewProps) {
  const { toast } = useToast()
  const [downloading, setDownloading] = useState<ReportDownloadKind | null>(null)

  const handleDownload = useCallback(
    async (kind: ReportDownloadKind) => {
      setDownloading(kind)
      try {
        await downloadReport(token, password, kind)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Не удалось скачать файл.')
      } finally {
        setDownloading(null)
      }
    },
    [token, password, toast]
  )

  const contactLine = [resolveProjectType(data.project.type), data.project.industry, data.project.company]
    .filter(Boolean)
    .join(' · ')

  // Mirrors each section's own "is there anything to show" guard, so the
  // nav only lists anchors for sections that actually render.
  const hasContext = Boolean(
    data.project.type || data.project.industry || data.project.company || data.qa.length > 0
  )
  const hasGroups = data.groups.length > 0
  const hasRoles = Boolean(data.roles && data.roles.roles.length > 0)
  const hasTasks = data.tasks.length > 0
  const hasRisks = data.risks.length > 0
  const hasAssumptions = data.assumptions.length > 0
  const hasAccuracy = Boolean(data.accuracy)
  const hasQuestions = data.questions.length > 0

  const navItems = useMemo(
    () =>
      [
        { id: 'section-summary', label: '01 Краткое резюме', show: true },
        { id: 'section-context', label: '02 Контекст проекта', show: hasContext },
        { id: 'section-groups', label: '03 Сводная оценка', show: hasGroups },
        { id: 'section-roles', label: 'Часы по ролям', show: hasRoles },
        { id: 'section-tasks', label: '04 Детализация задач', show: hasTasks },
        { id: 'section-risks', label: '05 Риски', show: hasRisks },
        { id: 'section-assumptions', label: '06 Чеклист ограничений и допущения', show: hasAssumptions },
        { id: 'section-accuracy', label: '07 Точность оценки', show: hasAccuracy },
        { id: 'section-questions', label: '08 Вопросы', show: hasQuestions },
      ]
        .filter((item) => item.show)
        .map(({ id, label }) => ({ id, label })),
    [hasContext, hasGroups, hasRoles, hasTasks, hasRisks, hasAssumptions, hasAccuracy, hasQuestions]
  )

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-10">
      <ReportNav items={navItems} />

      <div>
        <header className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Отчёт AI-оценки
          </span>
          <h1 className="mt-3 text-balance font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-4xl">
            {data.project.title}
          </h1>
          {contactLine && <p className="mt-2 text-sm text-muted-foreground">{contactLine}</p>}
        </header>

        <DownloadsBar downloads={data.downloads} onDownload={handleDownload} downloading={downloading} />

        <div className="space-y-6">
          <div id="section-summary" className="scroll-mt-24">
            <SummarySection summary={data.project.summary} totals={data.totals} groups={data.groups} />
          </div>

          {hasContext && (
            <div id="section-context" className="scroll-mt-24">
              <ContextSection project={data.project} qa={data.qa} />
            </div>
          )}

          {hasGroups && (
            <div id="section-groups" className="scroll-mt-24">
              <GroupsSection groups={data.groups} totals={data.totals} accuracyOverall={data.accuracy?.overall} />
            </div>
          )}

          {hasRoles && data.roles && (
            <div id="section-roles" className="scroll-mt-24">
              <RolesSection roles={data.roles} />
            </div>
          )}

          {hasTasks && (
            <div id="section-tasks" className="scroll-mt-24">
              <TasksSection tasks={data.tasks} />
            </div>
          )}

          {hasRisks && (
            <div id="section-risks" className="scroll-mt-24">
              <RisksSection risks={data.risks} />
            </div>
          )}

          {hasAssumptions && (
            <div id="section-assumptions" className="scroll-mt-24">
              <AssumptionsSection assumptions={data.assumptions} />
            </div>
          )}

          {hasAccuracy && (
            <div id="section-accuracy" className="scroll-mt-24">
              <AccuracySection accuracy={data.accuracy} />
            </div>
          )}

          {hasQuestions && (
            <div id="section-questions" className="scroll-mt-24">
              <QuestionsSection questions={data.questions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
