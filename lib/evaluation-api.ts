// lib/evaluation-api.ts
// Клиент AI-пайпа оценки проектов. Контракты сохранены 1:1 с прод-бэкендом.
import * as mock from "./evaluation-api.mock"

const API_BASE = (process.env.NEXT_PUBLIC_AI_API_BASE ?? "https://revelio.tech/api").replace(/\/+$/, "")

export type QueueStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "stuck"
  | "canceled"
  | "expired"

export const TERMINAL_STATUSES: QueueStatus[] = [
  "succeeded",
  "failed",
  "stuck",
  "canceled",
  "expired",
]

export interface CreateApplicationInput {
  file?: File
  fullName: string
  email: string
  company: string
  requestText?: string
  projectType?: string
  projectTypeOther?: string
  goalsJson?: string
  goalOther?: string
  industry?: string
  industryOther?: string
  contactMethod?: string
  contactValue?: string
  difficultiesJson?: string
  consent?: boolean
  promoCode?: string
}

export interface CreateApplicationResponse {
  application_id: string
  questions_job_id?: string
  no_file_job_id?: string
  resume_token: string
}

export interface QueueStatusResponse {
  status: QueueStatus
  position?: number
  outputs?: unknown
}

export interface AiQuestion {
  question_id: string
  question: string
  topic?: string
  importance?: string
  blocks_estimation?: boolean
  why_needed?: string
}

export interface SubmitAnswersResponse {
  finalize_job_id: string
}

export interface SkipQuestionsResponse {
  finalize_job_id: string
}

export interface ResumeApplicationResponse {
  application_id: string
  email: string
  questions: AiQuestion[]
  answers: Record<string, string>
}

function requireBase(): string {
  if (!API_BASE) {
    throw new Error(
      "AI API не сконфигурирован. Задайте NEXT_PUBLIC_AI_API_BASE в окружении.",
    )
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

export async function createApplication(
  input: CreateApplicationInput,
  signal?: AbortSignal,
): Promise<CreateApplicationResponse> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.createApplication(input, signal)
  const base = requireBase()
  const body = new FormData()
  if (input.file) body.append("file", input.file)
  body.append("full_name", input.fullName)
  body.append("email", input.email)
  body.append("company", input.company)
  if (input.requestText != null) body.append("request_text", input.requestText)
  if (input.projectType != null) body.append("project_type", input.projectType)
  if (input.projectTypeOther != null) body.append("project_type_other", input.projectTypeOther)
  body.append("difficulties_json", input.difficultiesJson ?? "[]")
  if (input.goalsJson != null) body.append("goals_json", input.goalsJson)
  if (input.goalOther != null) body.append("goal_other", input.goalOther)
  if (input.industry != null) body.append("industry", input.industry)
  if (input.industryOther != null) body.append("industry_other", input.industryOther)
  if (input.contactMethod != null) body.append("contact_method", input.contactMethod)
  if (input.contactValue != null) body.append("contact_value", input.contactValue)
  body.append("consent", input.consent ? "true" : "false")
  if (input.promoCode) body.append("promo_code", input.promoCode)

  const res = await fetch(`${base}/applications`, { method: "POST", body, signal })
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as CreateApplicationResponse
}

export async function getQueueStatus(
  jobId: string,
  signal?: AbortSignal,
): Promise<QueueStatusResponse> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.getQueueStatus(jobId, signal)
  const base = requireBase()
  const res = await fetch(`${base}/queue/status/${encodeURIComponent(jobId)}`, {
    method: "GET",
    signal,
  })
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as QueueStatusResponse
}

export async function pollQueueStatus(
  jobId: string,
  opts: {
    intervalMs?: number
    timeoutMs?: number
    maxNetworkRetries?: number
    signal?: AbortSignal
    onUpdate?: (status: QueueStatusResponse) => void
  } = {},
): Promise<QueueStatusResponse> {
  const interval = opts.intervalMs ?? 3000
  const timeoutMs = opts.timeoutMs ?? 0
  const maxNetworkRetries = opts.maxNetworkRetries ?? 3
  const deadline = timeoutMs > 0 ? Date.now() + timeoutMs : Infinity

  const sleep = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      const id = setTimeout(resolve, ms)
      opts.signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(id)
          reject(new DOMException("aborted", "AbortError"))
        },
        { once: true },
      )
    })

  const isNetworkError = (e: unknown) =>
    e instanceof TypeError ||
    (e instanceof Error && /network|fetch|failed to fetch/i.test(e.message))

  let networkRetries = 0

  while (true) {
    if (opts.signal?.aborted) throw new DOMException("aborted", "AbortError")

    if (Date.now() >= deadline) {
      const stuck: QueueStatusResponse = { status: "stuck" }
      opts.onUpdate?.(stuck)
      return stuck
    }

    try {
      const status = await getQueueStatus(jobId, opts.signal)
      networkRetries = 0
      opts.onUpdate?.(status)
      if (TERMINAL_STATUSES.includes(status.status)) return status
      await sleep(interval)
    } catch (err) {
      if ((err as Error)?.name === "AbortError") throw err
      if (isNetworkError(err) && networkRetries < maxNetworkRetries) {
        networkRetries += 1
        const backoff = Math.min(interval * 2 ** (networkRetries - 1), 8000)
        await sleep(backoff)
        continue
      }
      throw err
    }
  }
}

export function extractQuestions(outputs: unknown): AiQuestion[] {
  if (!outputs) return []
  if (Array.isArray(outputs)) return outputs as AiQuestion[]
  if (typeof outputs === "object") {
    const o = outputs as Record<string, unknown>
    if (Array.isArray(o.questions)) return o.questions as AiQuestion[]
    if (typeof o.missing_information_json === "string") {
      try {
        const parsed = JSON.parse(o.missing_information_json)
        return Array.isArray(parsed) ? (parsed as AiQuestion[]) : []
      } catch {
        return []
      }
    }
  }
  return []
}

// Reads the backend's estimation-readiness verdict from a terminal queue
// output. "not_suitable" means the input wasn't recognized as a valid brief —
// no requirements were extracted, so no estimate will be produced/emailed.
export function extractReadiness(outputs: unknown): string | null {
  if (outputs && typeof outputs === "object") {
    const o = outputs as Record<string, unknown>
    if (typeof o.readiness_for_estimation === "string") return o.readiness_for_estimation
  }
  return null
}

export async function submitAnswers(
  applicationId: string,
  answers: Record<string, string>,
  signal?: AbortSignal,
): Promise<SubmitAnswersResponse> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.submitAnswers(applicationId, answers, signal)
  const base = requireBase()
  const res = await fetch(
    `${base}/applications/${encodeURIComponent(applicationId)}/answers`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers }),
      signal,
    },
  )
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as SubmitAnswersResponse
}

export async function skipQuestions(
  applicationId: string,
  questionsJobId: string,
  signal?: AbortSignal,
): Promise<SkipQuestionsResponse> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.skipQuestions(applicationId, questionsJobId, signal)
  if (!applicationId) throw new Error("application_id отсутствует")
  const base = requireBase()
  const res = await fetch(
    `${base}/applications/${encodeURIComponent(applicationId)}/skip-questions`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ questions_job_id: questionsJobId }),
      signal,
    },
  )
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as SkipQuestionsResponse
}

export async function resumeApplication(
  resumeToken: string,
  signal?: AbortSignal,
): Promise<ResumeApplicationResponse> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.resumeApplication(resumeToken, signal)
  const base = requireBase()
  const res = await fetch(
    `${base}/applications/resume/${encodeURIComponent(resumeToken)}`,
    { method: "GET", signal },
  )
  if (!res.ok) throw new Error(await parseError(res))
  return (await res.json()) as ResumeApplicationResponse
}

export async function patchApplicationEmail(
  applicationId: string,
  email: string,
  signal?: AbortSignal,
): Promise<void> {
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.patchApplicationEmail(applicationId, email, signal)
  const base = requireBase()
  const res = await fetch(
    `${base}/applications/${encodeURIComponent(applicationId)}/email`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
      signal,
    },
  )
  if (!res.ok) throw new Error(await parseError(res))
}

// validatePromoCode is an ADVISORY pre-check for inline UX only. It blocks the
// form only when a healthy server explicitly says the code is invalid
// ({valid:false} with HTTP 200). On any uncertainty — throttling (429), server
// error, or a network failure — it fails OPEN (returns true) so a legitimate
// user is never locked out of submitting. The authoritative, unthrottled check
// runs server-side at submit (POST /applications returns 409 for a bad code).
export async function validatePromoCode(
  code: string,
  signal?: AbortSignal,
): Promise<boolean> {
  if (!code) return true // no code is allowed; nothing to validate
  if (process.env.NEXT_PUBLIC_AI_API_MOCK === "1") return mock.validatePromoCode(code, signal)
  const base = requireBase()
  try {
    const res = await fetch(
      `${base}/promo-codes/validate?code=${encodeURIComponent(code)}`,
      { method: "GET", signal },
    )
    if (res.status === 200) {
      const data = await res.json()
      return Boolean(data?.valid)
    }
    return true // 429/5xx → advisory check unavailable, fail open
  } catch {
    return true // network error → fail open
  }
}

export function statusToError(status: QueueStatus): string | null {
  if (status === "failed" || status === "stuck") {
    return "Обработка не завершилась. Попробуйте отправить заявку ещё раз."
  }
  if (status === "canceled" || status === "expired") {
    return "Ожидание остановлено. Можно вернуться к форме и отправить заявку снова."
  }
  return null
}
