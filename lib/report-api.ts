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
  task_id: string
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

export interface ScheduleRole {
  role: string
  label: string
  min: number
  target: number
  max: number
}

export interface ScheduleArea {
  area: string
  label: string
  start_unit: number
  duration_unit: number
  lane_count: number
}

export interface ScheduleTask {
  task_id: string
  area: string
  label: string
  start_unit: number
  duration_unit: number
  lane: number
  depends_on: string[]
  is_fallback: boolean
}

export interface ScheduleOverhead {
  role: string
  label: string
  start_unit: number
  duration_unit: number
  hours: number
}

export interface ReportSchedule {
  unit: string
  workday_hours: number
  total_units: number
  anchor_label: string
  team: ScheduleRole[]
  areas: ScheduleArea[]
  tasks: ScheduleTask[]
  overhead_lanes: ScheduleOverhead[]
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
  gantt: boolean
}

export interface ReportData {
  project: ReportProject
  totals: ReportTotals
  groups: ReportGroup[]
  tasks: ReportTask[]
  roles?: ReportRoles | null
  schedule?: ReportSchedule | null
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
    if (data && typeof data.error === "string") return data.error
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
  return normalizeReport(await res.json())
}

// normalizeReport makes the payload honour the non-null contract the components
// assume: every array field defaults to [] and downloads to a concrete object,
// so a backend that ever emits null/omits a field (as `qa` once did) can't
// crash the report page via an unguarded .length/.map. The backend also
// guarantees this now; this is defense-in-depth against contract drift.
export function normalizeReport(raw: any): ReportData {
  const roles = raw?.roles ? { ...raw.roles, roles: raw.roles.roles ?? [] } : null
  const schedule = raw?.schedule
    ? {
        ...raw.schedule,
        team: raw.schedule.team ?? [],
        areas: raw.schedule.areas ?? [],
        tasks: raw.schedule.tasks ?? [],
        overhead_lanes: raw.schedule.overhead_lanes ?? [],
      }
    : null
  return {
    ...raw,
    groups: raw?.groups ?? [],
    tasks: raw?.tasks ?? [],
    risks: raw?.risks ?? [],
    assumptions: raw?.assumptions ?? [],
    qa: raw?.qa ?? [],
    questions: raw?.questions ?? [],
    downloads: raw?.downloads
      ? { ...raw.downloads, gantt: raw.downloads.gantt ?? false }
      : { pdf: false, csv: false, gantt: false },
    roles,
    schedule,
  } as ReportData
}

function filenameFromDisposition(header: string | null, fallback: string): string {
  if (!header) return fallback
  const match = /filename\*?=(?:UTF-8''|")?([^";]+)"?/i.exec(header)
  return match ? decodeURIComponent(match[1]) : fallback
}

export type ReportDownloadKind = "pdf" | "csv" | "questions" | "gantt"

function fallbackFilename(kind: ReportDownloadKind): string {
  // questions is always a CSV export (Вопрос;Ответ), unlike the generic
  // pdf/csv kinds whose extension matches their kind name 1:1.
  if (kind === "questions") return "questions.csv"
  if (kind === "gantt") return "gantt.xlsx"
  return `report.${kind}`
}

export async function downloadReport(
  token: string,
  password: string,
  kind: ReportDownloadKind,
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
  const filename = filenameFromDisposition(res.headers.get("content-disposition"), fallbackFilename(kind))
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
