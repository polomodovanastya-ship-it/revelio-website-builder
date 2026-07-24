'use client'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { useToast } from '@/components/toast'
import { downloadReport, type ReportData, type ReportDownloadKind } from '@/lib/report-api'
import { resolveProjectType } from '@/lib/report-format'
import { DownloadsBar } from './downloads-bar'
import { ReportNav } from './report-nav'
import { SummarySection } from './sections/summary-section'
import { ContextSection } from './sections/context-section'
import { GroupsSection } from './sections/groups-section'
import { RolesSection } from './sections/roles-section'
import { GanttSection } from './sections/gantt-section'
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

interface SectionDescriptor {
  id: string
  label: string
  show: boolean
  render: (number: string) => ReactNode
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

  // Single source of truth for section order + visibility. Numbering is
  // derived below (never hardcoded per-section), so nav and card headers can
  // never drift apart, and hiding any section never leaves a gap.
  const sections: SectionDescriptor[] = useMemo(
    () => [
      {
        id: 'section-summary',
        label: 'Краткое резюме',
        show: true,
        render: (number) => (
          <SummarySection summary={data.project.summary} totals={data.totals} groups={data.groups} number={number} />
        ),
      },
      {
        id: 'section-context',
        label: 'Контекст проекта',
        show: hasContext,
        render: (number) => <ContextSection project={data.project} qa={data.qa} number={number} />,
      },
      {
        id: 'section-groups',
        label: 'Сводная оценка',
        show: hasGroups,
        render: (number) => (
          <GroupsSection
            groups={data.groups}
            totals={data.totals}
            accuracyOverall={data.accuracy?.overall}
            number={number}
          />
        ),
      },
      {
        id: 'section-roles',
        label: 'Часы по ролям',
        show: hasRoles,
        render: (number) => <RolesSection roles={data.roles!} number={number} />,
      },
      {
        id: 'section-gantt',
        label: 'План-график',
        show: true,
        render: (number) => <GanttSection schedule={data.schedule ?? null} number={number} />,
      },
      {
        id: 'section-tasks',
        label: 'Детализация задач',
        show: hasTasks,
        render: (number) => <TasksSection tasks={data.tasks} number={number} />,
      },
      {
        id: 'section-risks',
        label: 'Риски',
        show: hasRisks,
        render: (number) => <RisksSection risks={data.risks} number={number} />,
      },
      {
        id: 'section-assumptions',
        label: 'Чеклист ограничений и допущения',
        show: hasAssumptions,
        render: (number) => <AssumptionsSection assumptions={data.assumptions} number={number} />,
      },
      {
        id: 'section-accuracy',
        label: 'Точность оценки',
        show: hasAccuracy,
        render: (number) => <AccuracySection accuracy={data.accuracy} number={number} />,
      },
      {
        id: 'section-questions',
        label: 'Вопросы',
        show: hasQuestions,
        render: (number) => <QuestionsSection questions={data.questions} number={number} />,
      },
    ],
    [data, hasContext, hasGroups, hasRoles, hasTasks, hasRisks, hasAssumptions, hasAccuracy, hasQuestions]
  )

  // Sequential 01..N over only the sections that actually render — this is
  // the single place numbering is computed, so nav and card headers can
  // never disagree, and a hidden section never leaves a gap in the sequence.
  const numberedVisible = useMemo(
    () => sections.filter((s) => s.show).map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') })),
    [sections]
  )

  const navItems = useMemo(
    () => numberedVisible.map(({ id, label, number }) => ({ id, label: `${number} ${label}` })),
    [numberedVisible]
  )

  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
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
          {numberedVisible.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              {s.render(s.number)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
