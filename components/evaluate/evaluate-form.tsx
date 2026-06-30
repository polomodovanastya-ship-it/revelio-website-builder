'use client'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Upload, FileText, X } from 'lucide-react'
import { Field, ChipSelect, projectTypes, industries, goalOptions, contactMethods, countryCodes, STEPS, MAX_GOALS } from './fields'
import { validateFile, FILE_ACCEPT } from '@/lib/evaluate-helpers'
import { useEvaluateDraft } from '@/hooks/useEvaluateDraft'
import { useToast } from '@/components/toast'
import type { FlowAction } from '@/hooks/use-evaluate-flow'
import { validatePromoCode, type CreateApplicationInput } from '@/lib/evaluation-api'
import { trackGoal } from '@/lib/metrika'

interface Props {
  dispatch: React.Dispatch<FlowAction>
}

export function EvaluateForm({ dispatch }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const { readDraft, saveDraft, clearDraft } = useEvaluateDraft()

  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [otherType, setOtherType] = useState('')
  const [auditText, setAuditText] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [goals, setGoals] = useState<string[]>([])
  const [otherGoal, setOtherGoal] = useState('')
  const [industry, setIndustry] = useState('')
  const [otherIndustry, setOtherIndustry] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [phoneCode, setPhoneCode] = useState('+7')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [attempted, setAttempted] = useState(false)
  const [draftRestored, setDraftRestored] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null)
  const [promoCodeValidating, setPromoCodeValidating] = useState(false)

  // Metrika funnel — fire each step at most once per form mount.
  const firedGoals = useRef<Set<string>>(new Set())
  const fireGoalOnce = useCallback((goal: string) => {
    if (firedGoals.current.has(goal)) return
    firedGoals.current.add(goal)
    trackGoal(goal)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hasToken = new URLSearchParams(window.location.search).get('resume_token')
    if (hasToken) return
    const draft = readDraft()
    if (!draft) { setDraftRestored(true); return }
    setProjectType(draft.step1.projectType)
    setOtherType(draft.step1.otherType)
    setAuditText(draft.step1.auditText)
    setGoals(draft.step2.goals)
    setOtherGoal(draft.step2.otherGoal)
    setIndustry(draft.step3.industry)
    setOtherIndustry(draft.step3.otherIndustry)
    setCompanyName(draft.step3.companyName)
    setContactName(draft.step3.contactName)
    setContactMethod(draft.step3.contactMethod)
    setContactValue(draft.step3.contactValue)
    setPhoneCode(draft.step3.phoneCode)
    setPhoneNumber(draft.step3.phoneNumber)
    setDraftRestored(true)
  }, [readDraft])

  useEffect(() => {
    if (!draftRestored) return
    saveDraft({
      step1: { projectType, otherType, auditText },
      step2: { goals, otherGoal },
      step3: { industry, otherIndustry, companyName, contactName, contactMethod, contactValue, phoneCode, phoneNumber },
    })
  }, [draftRestored, projectType, otherType, auditText, goals, otherGoal, industry, otherIndustry, companyName, contactName, contactMethod, contactValue, phoneCode, phoneNumber, saveDraft])

  const needsAuditText = projectType === 'audit'

  useEffect(() => {
    if (projectType !== 'audit') setAuditText('')
  }, [projectType])

  const validateStep = useCallback((s: number) => {
    const errs: Record<string, boolean> = {}
    if (s === 1) {
      if (!projectType) errs.projectType = true
      if (projectType === 'other' && !otherType.trim()) errs.otherType = true
      if (projectType === 'existing' && files.length === 0) errs.files = true
      if (needsAuditText && !auditText.trim()) errs.auditText = true
    }
    if (s === 2) {
      if (goals.length === 0) errs.goals = true
      if (goals.includes('Другое') && !otherGoal.trim()) errs.otherGoal = true
    }
    if (s === 3) {
      if (!industry && !companyName.trim()) errs.identity = true
      if (industry === 'Другое' && !otherIndustry.trim() && !companyName.trim()) errs.otherIndustry = true
      if (!contactMethod) errs.contactMethod = true
      if (contactMethod === 'Звонок') {
        const digits = phoneNumber.replace(/\D/g, '')
        if (digits.length < 6 || digits.length > 15) errs.contactValue = true
      } else if (contactMethod === 'Почта') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue.trim())) errs.contactValue = true
      } else if (contactMethod === 'Мессенджеры') {
        const val = contactValue.trim()
        if (!/^@[A-Za-z0-9_]{3,32}$/.test(val) && !/^\+?[\d\s\-()]{10,20}$/.test(val)) errs.contactValue = true
      }
      if (!consent) errs.consent = true
    }
    return errs
  }, [projectType, otherType, auditText, files, needsAuditText, goals, otherGoal, industry, otherIndustry, companyName, contactMethod, contactValue, phoneNumber, consent])

  // Mirrors the step-3 contact validation in validateStep — used to fire the
  // `eval_contact_filled` funnel step the moment a valid contact is entered.
  const contactValid = useMemo(() => {
    if (contactMethod === 'Звонок') {
      const digits = phoneNumber.replace(/\D/g, '')
      return digits.length >= 6 && digits.length <= 15
    }
    if (contactMethod === 'Почта') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue.trim())
    }
    if (contactMethod === 'Мессенджеры') {
      const val = contactValue.trim()
      return /^@[A-Za-z0-9_]{3,32}$/.test(val) || /^\+?[\d\s\-()]{10,20}$/.test(val)
    }
    return false
  }, [contactMethod, phoneNumber, contactValue])

  // Funnel step 4: reached the final screen.
  useEffect(() => {
    if (step === 3) fireGoalOnce('eval_reached_final')
  }, [step, fireGoalOnce])

  // Funnel step 5: entered a valid contact on the final screen.
  useEffect(() => {
    if (step === 3 && contactValid) fireGoalOnce('eval_contact_filled')
  }, [step, contactValid, fireGoalOnce])

  const handlePromoBlur = useCallback(async () => {
    const trimmed = promoCode.trim().toUpperCase()
    if (!trimmed) { setPromoCodeError(null); return }
    setPromoCodeValidating(true)
    const valid = await validatePromoCode(trimmed)
    setPromoCodeValidating(false)
    setPromoCodeError(valid ? null : 'Промокод недействителен')
  }, [promoCode])

  const handleGoalToggle = (g: string) => {
    if (goals.includes(g)) {
      setGoals(goals.filter(x => x !== g))
    } else {
      if (goals.length >= MAX_GOALS) {
        toast.info('Можно выбрать не более 3 целей')
        return
      }
      setGoals([...goals, g])
    }
  }

  const acceptFile = (file?: File | null) => {
    if (!file) return
    const result = validateFile(file)
    if (!result.valid) {
      toast.error(result.error)
      return
    }
    setFiles([file])
    fireGoalOnce('eval_file_uploaded')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(e.target.files?.[0])
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    } else {
      router.push('/')
    }
  }

  const goNext = async () => {
    setAttempted(true)
    const errs = validateStep(step)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const el = document.querySelector('[data-error="true"]')
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    if (step < 3) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      const trimmedPromo = promoCode.trim().toUpperCase()
      if (trimmedPromo) {
        setPromoCodeValidating(true)
        const valid = await validatePromoCode(trimmedPromo)
        setPromoCodeValidating(false)
        if (!valid) {
          setPromoCodeError('Промокод недействителен')
          return
        }
        setPromoCodeError(null)
      }
      submitToWorkflow()
    }
  }

  const submitToWorkflow = () => {
    const normalizedContactValue = contactMethod === 'Звонок' ? `${phoneCode} ${phoneNumber.trim()}`.trim() : contactValue.trim()
    const emailForApi = contactMethod === 'Почта' ? normalizedContactValue : ''
    const companyForApi = companyName.trim() || (industry === 'Другое' ? otherIndustry.trim() : industry) || '—'
    const fileForApi = files[0] ?? undefined

    const pendingCreate: CreateApplicationInput = {
      file: fileForApi,
      fullName: contactName.trim() || '—',
      email: emailForApi,
      company: companyForApi,
      requestText: auditText.trim(),
      projectType,
      projectTypeOther: otherType.trim(),
      goalsJson: JSON.stringify(goals),
      goalOther: otherGoal.trim(),
      industry,
      industryOther: otherIndustry.trim(),
      contactMethod,
      contactValue: normalizedContactValue,
      difficultiesJson: '[]',
      consent,
      promoCode: promoCode.trim().toUpperCase() || undefined,
    }

    clearDraft()
    dispatch({ type: 'SUBMIT_FORM', pendingCreate, email: emailForApi })
  }

  const currentStep = STEPS[step - 1]
  const progress = (step / 3) * 100

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          [ ШАГ {step} / 3 — {currentStep.title.toUpperCase()} ]
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {step === 1 && (
          <>
            <Field title="Тип проекта" required error={attempted && errors.projectType}>
              <div className="space-y-2">
                {projectTypes.map(pt => (
                  <label key={pt.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/40">
                    <input type="radio" name="projectType" value={pt.id} checked={projectType === pt.id} onChange={e => setProjectType(e.target.value)} className="mt-0.5" />
                    <span className="text-sm">{pt.label}</span>
                  </label>
                ))}
              </div>
            </Field>

            {projectType === 'other' && (
              <Field title="Опишите ваш проект" required error={attempted && errors.otherType}>
                <input type="text" value={otherType} onChange={e => setOtherType(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}

            {needsAuditText && (
              <Field title="Что нужно проаудировать?" required error={attempted && errors.auditText}>
                <textarea value={auditText} onChange={e => setAuditText(e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}

            <Field title="Загрузить документы" subtitle="PDF, DOCX, ODT, MD или TXT до 25 МБ" error={attempted && errors.files} errorMessage={projectType === 'existing' ? 'Для доработки готового решения нужен файл' : undefined}>
              <div className="space-y-2">
                <label
                  onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                  onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
                  onDrop={handleDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
                    dragActive
                      ? 'border-accent bg-accent/5'
                      : 'border-border bg-secondary/50 hover:border-primary/40'
                  }`}
                >
                  <Upload className={`h-6 w-6 ${dragActive ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium text-primary">
                    Перетащите файл сюда или нажмите
                  </span>
                  <span className="text-xs text-muted-foreground">до 25 МБ</span>
                  <input type="file" accept={FILE_ACCEPT} onChange={handleFileChange} className="hidden" />
                </label>
                {files[0] && (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate text-sm text-foreground">{files[0].name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {(files[0].size / 1024 / 1024).toFixed(1)} МБ
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles([])}
                      aria-label="Удалить файл"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field title="Цели оценки" subtitle="Выберите до 3 целей" required error={attempted && errors.goals}>
              <ChipSelect options={goalOptions} selected={goals} onToggle={handleGoalToggle} multi />
            </Field>

            {goals.includes('Другое') && (
              <Field title="Опишите вашу цель" required error={attempted && errors.otherGoal}>
                <input type="text" value={otherGoal} onChange={e => setOtherGoal(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <Field title="Отрасль" subtitle="Или укажите название компании" error={attempted && (errors.identity || errors.otherIndustry)}>
              <ChipSelect options={industries} selected={industry} onToggle={setIndustry} />
            </Field>

            {industry === 'Другое' && (
              <Field title="Укажите отрасль" error={attempted && errors.otherIndustry}>
                <input type="text" value={otherIndustry} onChange={e => setOtherIndustry(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}

            <Field title="Название компании">
              <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </Field>

            <Field title="Ваше имя">
              <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </Field>

            <Field title="Как с вами связаться?" required error={attempted && errors.contactMethod}>
              <ChipSelect options={contactMethods} selected={contactMethod} onToggle={setContactMethod} />
            </Field>

            {contactMethod === 'Звонок' && (
              <Field title="Номер телефона" required error={attempted && errors.contactValue}>
                <div className="flex gap-2">
                  <select value={phoneCode} onChange={e => setPhoneCode(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                  <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="123 456 7890" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                </div>
              </Field>
            )}

            {contactMethod === 'Почта' && (
              <Field title="Email" required error={attempted && errors.contactValue}>
                <input type="email" value={contactValue} onChange={e => setContactValue(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}

            {contactMethod === 'Мессенджеры' && (
              <Field title="Имя пользователя или телефон" subtitle="@username или +7 123 456 7890" required error={attempted && errors.contactValue}>
                <input type="text" value={contactValue} onChange={e => setContactValue(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
              </Field>
            )}

            <Field
              title="Промокод"
              error={promoCodeError !== null}
              errorMessage={promoCodeError ?? undefined}
            >
              <input
                type="text"
                value={promoCode}
                onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoCodeError(null) }}
                onBlur={handlePromoBlur}
                disabled={promoCodeValidating}
                placeholder="CODE-AB23CD"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Укажете промокод — пришлём оценку на почту сразу после расчёта. Без кода — наш менеджер свяжется и презентует оценку лично.
              </p>
            </Field>

            <Field title="Согласие" required error={attempted && errors.consent}>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5" />
                <span className="text-sm">
                  Даю согласие на <a href="/legal/consent_pd.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">обработку персональных данных</a> в соответствии с <a href="/legal/revelio_tech_policy_pd.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">политикой конфиденциальности</a>
                </span>
              </label>
            </Field>
          </>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" onClick={goBack} className="rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary/80">
          {step === 1 ? 'На главную' : 'Назад'}
        </button>
        <button type="button" onClick={goNext} disabled={submitting || promoCodeValidating} className="flex-1 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50">
          {step === 3 ? 'Оценить' : 'Далее'}
        </button>
      </div>
    </div>
  )
}
