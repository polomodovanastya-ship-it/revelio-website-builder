import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ReportDownloadKind, ReportDownloads } from '@/lib/report-api'

// Single persistent action row (задачи CSV / вопросы CSV / итоговая оценка
// PDF), independent of any section's presence — this is the primary
// deliverable and must stay reachable even when tasks/groups/etc are empty.
// "Скачать вопросы" always shows (no data flag for it) — the backend can
// always produce a questions CSV from token+password.
export function DownloadsBar({
  downloads,
  onDownload,
  downloading,
}: {
  downloads: ReportDownloads
  onDownload: (kind: ReportDownloadKind) => void
  downloading: ReportDownloadKind | null
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {downloads.csv && (
        <Button variant="outline" onClick={() => onDownload('csv')} disabled={downloading !== null}>
          {downloading === 'csv' ? <Loader2 className="animate-spin" /> : <Download />}
          Скачать задачи
        </Button>
      )}
      <Button variant="outline" onClick={() => onDownload('questions')} disabled={downloading !== null}>
        {downloading === 'questions' ? <Loader2 className="animate-spin" /> : <Download />}
        Скачать вопросы
      </Button>
      {downloads.pdf && (
        <Button onClick={() => onDownload('pdf')} disabled={downloading !== null}>
          {downloading === 'pdf' ? <Loader2 className="animate-spin" /> : <Download />}
          Скачать оценку
        </Button>
      )}
    </div>
  )
}
