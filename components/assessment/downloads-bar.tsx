import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ReportDownloads } from '@/lib/report-api'

// Single persistent PDF/CSV action row, independent of any section's
// presence — this is the primary deliverable and must stay reachable even
// when tasks/groups/etc are empty.
export function DownloadsBar({
  downloads,
  onDownload,
  downloading,
}: {
  downloads: ReportDownloads
  onDownload: (kind: 'pdf' | 'csv') => void
  downloading: 'pdf' | 'csv' | null
}) {
  if (!downloads.pdf && !downloads.csv) return null

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {downloads.csv && (
        <Button variant="outline" onClick={() => onDownload('csv')} disabled={downloading !== null}>
          {downloading === 'csv' ? <Loader2 className="animate-spin" /> : <Download />}
          Скачать CSV
        </Button>
      )}
      {downloads.pdf && (
        <Button onClick={() => onDownload('pdf')} disabled={downloading !== null}>
          {downloading === 'pdf' ? <Loader2 className="animate-spin" /> : <Download />}
          Скачать PDF
        </Button>
      )}
    </div>
  )
}
