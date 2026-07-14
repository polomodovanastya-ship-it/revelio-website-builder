// lib/report-api.ts
// Клиент отчёта AI-оценки (/assessment). Пароль вводится клиентом на странице
// отчёта и нигде не сохраняется — каждый запрос (данные отчёта, скачивание
// PDF/CSV) переотправляет token+password заново.
const API_BASE = (process.env.NEXT_PUBLIC_AI_API_BASE ?? "https://revelio.tech/api").replace(/\/+$/, "")

export interface ReportProject {
  title: string
  type: string
  industry: string
  company: string
  summary: string
}

export interface ReportTotals {
  tasks: number
  hours_min: number
  hours_expected: number
  hours_max: number
  risks_count: number
  questions_answered: number
  questions_total: number
}

export interface ReportGroup {
  name: string
  count: number
  min: number
  expected: number
  max: number
  share: number
  accuracy: string
}

export interface ReportTask {
  group: string
  title: string
  min: number
  expected: number
  max: number
  accuracy: string
}

export interface ReportRole {
  role: string
  label: string
  hours_min: number
  hours_expected: number
  hours_max: number
  task_count: number
  share: number
}

export interface ReportRoles {
  total_expected: number
  roles: ReportRole[]
}

export interface ReportAccuracy {
  overall: string
  low_conf_tasks: number
  thin_context_tasks: number
  error_band: string
  basis: string
}

export interface ReportQA {
  question: string
  answer: string
}

export interface ReportDownloads {
  pdf: boolean
  csv: boolean
}

export interface ReportData {
  project: ReportProject
  totals: ReportTotals
  groups: ReportGroup[]
  tasks: ReportTask[]
  roles?: ReportRoles | null
  // Curated, deduped list of risk sentences (mirrors the PDF) — the backend
  // has no structured impact/comment source, so this is plain text.
  risks: string[]
  assumptions: string[]
  accuracy: ReportAccuracy
  qa: ReportQA[]
  questions: string[]
  downloads: ReportDownloads
}

export class ReportAuthError extends Error {
  constructor(message = "Неверный код доступа") {
    super(message)
    this.name = "ReportAuthError"
  }
}

export class ReportRateLimitError extends Error {
  constructor(message = "Слишком много попыток, попробуйте позже") {
    super(message)
    this.name = "ReportRateLimitError"
  }
}

function requireBase(): string {
  if (!API_BASE) {
    throw new Error("AI API не сконфигурирован. Задайте NEXT_PUBLIC_AI_API_BASE в окружении.")
  }
  return API_BASE
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json()
    if (data && typeof data.message === "string") return data.message
  } catch {
    /* noop */
  }
  return `HTTP ${res.status}`
}

export async function fetchReport(
  token: string,
  password: string,
  signal?: AbortSignal,
): Promise<ReportData> {
  const base = requireBase()
  const res = await fetch(`${base}/report/data`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, password }),
    signal,
  })
  if (res.status === 401) throw new ReportAuthError()
  if (res.status === 429) throw new ReportRateLimitError()
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as ReportData
}

function filenameFromDisposition(header: string | null, fallback: string): string {
  if (!header) return fallback
  const match = /filename\*?=(?:UTF-8''|")?([^";]+)"?/i.exec(header)
  return match ? decodeURIComponent(match[1]) : fallback
}

export async function downloadReport(
  token: string,
  password: string,
  kind: "pdf" | "csv",
  signal?: AbortSignal,
): Promise<void> {
  const base = requireBase()
  const res = await fetch(`${base}/report/download`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, password, kind }),
    signal,
  })
  if (res.status === 401) throw new ReportAuthError()
  if (res.status === 429) throw new ReportRateLimitError()
  if (!res.ok) throw new Error(await parseError(res))

  const blob = await res.blob()
  const filename = filenameFromDisposition(res.headers.get("content-disposition"), `report.${kind}`)
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
