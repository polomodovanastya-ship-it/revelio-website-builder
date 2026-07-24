// hooks/use-evaluate-flow.ts
import { useReducer } from "react"
import type { AiQuestion, CreateApplicationInput } from "@/lib/evaluation-api"

export type Phase = "form" | "resuming" | "queue" | "questions" | "success" | "not_suitable"

export interface FlowState {
  phase: Phase
  pendingCreate: CreateApplicationInput | null
  applicationId: string | null
  questionsJobId: string | null
  noFileJobId: string | null
  email: string
  questions: AiQuestion[]
  alreadyAnswered: boolean
  createRetry: number
  pollRetry: number
}

export type FlowAction =
  | { type: "SUBMIT_FORM"; pendingCreate: CreateApplicationInput; email: string }
  | { type: "CREATE_OK"; applicationId: string; questionsJobId?: string; noFileJobId?: string }
  | { type: "QUEUE_SUCCEEDED_TO_QUESTIONS"; questions: AiQuestion[] }
  | { type: "QUEUE_SUCCEEDED_TO_SUCCESS"; email: string }
  | { type: "QUEUE_NOT_SUITABLE" }
  | { type: "SKIPPED" }
  | { type: "ANSWERS_OK"; email: string }
  | { type: "BEGIN_RESUME" }
  | {
      type: "RESUME_OK"
      target: "success" | "questions"
      applicationId?: string
      questions?: AiQuestion[]
      email?: string
      alreadyAnswered?: boolean
    }
  | { type: "RESUME_ERR" }
  | { type: "RESTART" }
  | { type: "RETRY_CREATE" }
  | { type: "RETRY_POLL" }

export const initialState: FlowState = {
  phase: "form",
  pendingCreate: null,
  applicationId: null,
  questionsJobId: null,
  noFileJobId: null,
  email: "",
  questions: [],
  alreadyAnswered: false,
  createRetry: 0,
  pollRetry: 0,
}

export function evaluateReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "SUBMIT_FORM":
      return {
        ...initialState,
        phase: "queue",
        pendingCreate: action.pendingCreate,
        email: action.email,
      }
    case "CREATE_OK":
      return {
        ...state,
        applicationId: action.applicationId,
        questionsJobId: action.questionsJobId ?? null,
        noFileJobId: action.noFileJobId ?? null,
      }
    case "QUEUE_SUCCEEDED_TO_QUESTIONS":
      return { ...state, phase: "questions", questions: action.questions }
    case "QUEUE_SUCCEEDED_TO_SUCCESS":
      return { ...state, phase: "success", email: action.email, alreadyAnswered: false }
    case "QUEUE_NOT_SUITABLE":
      return { ...state, phase: "not_suitable" }
    case "SKIPPED":
      return { ...state, phase: "success", alreadyAnswered: false }
    case "ANSWERS_OK":
      return { ...state, phase: "success", email: action.email, alreadyAnswered: false }
    case "BEGIN_RESUME":
      return { ...initialState, phase: "resuming" }
    case "RESUME_OK":
      return {
        ...state,
        phase: action.target,
        applicationId: action.applicationId ?? state.applicationId,
        questions: action.questions ?? [],
        email: action.email ?? state.email,
        alreadyAnswered: action.alreadyAnswered ?? false,
      }
    case "RESUME_ERR":
      return { ...initialState }
    case "RESTART":
      return { ...initialState }
    case "RETRY_CREATE":
      return { ...state, createRetry: state.createRetry + 1 }
    case "RETRY_POLL":
      return { ...state, pollRetry: state.pollRetry + 1 }
    default:
      return state
  }
}

export function useEvaluateFlow() {
  const [state, dispatch] = useReducer(evaluateReducer, initialState)
  return { state, dispatch }
}
