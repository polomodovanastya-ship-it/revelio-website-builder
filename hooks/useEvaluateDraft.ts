// hooks/useEvaluateDraft.ts
import { useCallback, useEffect, useRef } from "react"

const DRAFT_KEY = "evaluate_draft"
const DEBOUNCE_MS = 300

export interface EvaluateDraft {
  step1: { projectType: string; otherType: string; auditText: string }
  step2: { goals: string[]; otherGoal: string }
  step3: {
    industry: string
    otherIndustry: string
    companyName: string
    contactName: string
    contactMethod: string
    contactValue: string
    phoneCode: string
    phoneNumber: string
  }
}

function readFromStorage(): EvaluateDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as EvaluateDraft) : null
  } catch {
    return null
  }
}

function writeToStorage(draft: EvaluateDraft): void {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // private mode or quota exceeded — fail silently
  }
}

function clearStorage(): void {
  try {
    sessionStorage.removeItem(DRAFT_KEY)
  } catch {
    // noop
  }
}

export function useEvaluateDraft() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const readDraft = useCallback((): EvaluateDraft | null => {
    return readFromStorage()
  }, [])

  const saveDraft = useCallback((draft: EvaluateDraft): void => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => writeToStorage(draft), DEBOUNCE_MS)
  }, [])

  const clearDraft = useCallback((): void => {
    clearTimeout(timerRef.current)
    clearStorage()
  }, [])

  return { readDraft, saveDraft, clearDraft }
}
