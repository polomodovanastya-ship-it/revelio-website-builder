'use client'
import { useCallback, useState } from 'react'
import { useToast } from '@/components/toast'
import { downloadReport, type ReportData } from '@/lib/report-api'
import { DownloadsBar } from './downloads-bar'
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
  const [downloading, setDownloading] = useState<'pdf' | 'csv' | null>(null)

  const handleDownload = useCallback(
    async (kind: 'pdf' | 'csv') => {
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

  const contactLine = [data.project.type, data.project.industry, data.project.company]
    .filter(Boolean)
    .join(' · ')

  return (
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
        <SummarySection summary={data.project.summary} totals={data.totals} groups={data.groups} />

        <ContextSection project={data.project} qa={data.qa} />

        {data.groups.length > 0 && (
          <GroupsSection groups={data.groups} totals={data.totals} accuracyOverall={data.accuracy?.overall} />
        )}

        {data.roles && data.roles.roles.length > 0 && <RolesSection roles={data.roles} />}

        {data.tasks.length > 0 && <TasksSection tasks={data.tasks} />}

        {data.risks.length > 0 && <RisksSection risks={data.risks} />}

        {data.assumptions.length > 0 && <AssumptionsSection assumptions={data.assumptions} />}

        {data.accuracy && <AccuracySection accuracy={data.accuracy} />}

        {data.questions.length > 0 && <QuestionsSection questions={data.questions} />}
      </div>
    </div>
  )
}
