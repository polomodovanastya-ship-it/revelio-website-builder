'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { PageContainer } from '@/components/page-shell'
import { ReportGate } from '@/components/assessment/report-gate'
import { ReportView } from '@/components/assessment/report-view'
import type { ReportData } from '@/lib/report-api'

function NoTokenState() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
      <h1 className="font-heading text-xl font-bold uppercase tracking-tight text-primary">
        Ссылка недействительна
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        В адресе отсутствует токен отчёта. Проверьте ссылку, которую прислал Ревелио.
      </p>
    </div>
  )
}

function AssessmentContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [unlocked, setUnlocked] = useState<{ data: ReportData; password: string } | null>(null)

  if (!token) return <NoTokenState />

  if (!unlocked) {
    return <ReportGate token={token} onSuccess={(data, password) => setUnlocked({ data, password })} />
  }

  return <ReportView data={unlocked.data} token={token} password={unlocked.password} />
}

export default function AssessmentPage() {
  return (
    <PageContainer>
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        }
      >
        <AssessmentContent />
      </Suspense>
    </PageContainer>
  )
}
