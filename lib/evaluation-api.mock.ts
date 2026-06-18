// lib/evaluation-api.mock.ts
import type { CreateApplicationInput, CreateApplicationResponse, QueueStatusResponse, AiQuestion, SubmitAnswersResponse, SkipQuestionsResponse, ResumeApplicationResponse } from './evaluation-api'

let pollCount = 0

export async function createApplication(input: CreateApplicationInput, signal?: AbortSignal): Promise<CreateApplicationResponse> {
  await new Promise(r => setTimeout(r, 300))
  pollCount = 0
  if (input.file) {
    return {
      application_id: 'mock-app-1',
      questions_job_id: 'mock-q-1',
      resume_token: 'mock-token-q',
    }
  }
  return {
    application_id: 'mock-app-2',
    no_file_job_id: 'mock-nf-1',
    resume_token: 'mock-token-nf',
  }
}

export async function getQueueStatus(jobId: string, signal?: AbortSignal): Promise<QueueStatusResponse> {
  await new Promise(r => setTimeout(r, 100))
  pollCount++
  if (pollCount === 1) return { status: 'queued', position: 2 }
  if (pollCount === 2) return { status: 'running' }
  if (jobId.includes('nf')) {
    return { status: 'succeeded' }
  }
  return {
    status: 'succeeded',
    outputs: {
      questions: [
        {
          question_id: 'q1',
          question: 'Тестовый вопрос?',
          importance: 'high',
          topic: 'архитектура',
          blocks_estimation: false,
          why_needed: 'Для проверки мока',
        } as AiQuestion,
      ],
    },
  }
}

export async function submitAnswers(applicationId: string, answers: Record<string, string>, signal?: AbortSignal): Promise<SubmitAnswersResponse> {
  await new Promise(r => setTimeout(r, 200))
  return { finalize_job_id: 'mock-final-1' }
}

export async function skipQuestions(applicationId: string, questionsJobId: string, signal?: AbortSignal): Promise<SkipQuestionsResponse> {
  await new Promise(r => setTimeout(r, 200))
  return { finalize_job_id: 'mock-skip-1' }
}

export async function resumeApplication(token: string, signal?: AbortSignal): Promise<ResumeApplicationResponse> {
  await new Promise(r => setTimeout(r, 300))
  if (token.endsWith('answered')) {
    return {
      application_id: 'mock-app-3',
      email: 'test@example.com',
      questions: [],
      answers: { q1: 'answered' },
    }
  }
  if (token.endsWith('questions')) {
    return {
      application_id: 'mock-app-4',
      email: 'test@example.com',
      questions: [{ question_id: 'q2', question: 'Resume test?', importance: 'low' } as AiQuestion],
      answers: {},
    }
  }
  return {
    application_id: 'mock-app-5',
    email: 'test@example.com',
    questions: [],
    answers: {},
  }
}

export async function patchApplicationEmail(applicationId: string, email: string, signal?: AbortSignal): Promise<void> {
  await new Promise(r => setTimeout(r, 200))
}
