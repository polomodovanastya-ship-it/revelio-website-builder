// Thin client-side fetch to Supabase Edge Function `submit-contact`.
// No @supabase/supabase-js (foundation §2.1 / §8). Public anon key only (foundation §6).

import { EMAIL } from '@/lib/contacts'

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '')
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
  consent: boolean
}

export type ContactResult =
  | { ok: true; dealId?: string; contactId?: string }
  | { ok: false; error: string }

interface EdgeResponse {
  success?: boolean
  error?: string
  dealId?: string
  contactId?: string
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (!SUPABASE_URL || !ANON) {
    return { ok: false, error: `Форма временно недоступна. Напишите на ${EMAIL}` }
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        consent: payload.consent,
      }),
    })

    let data: EdgeResponse | null = null
    try {
      data = (await res.json()) as EdgeResponse
    } catch {
      data = null
    }

    if (res.ok && data?.success !== false) {
      return { ok: true, dealId: data?.dealId, contactId: data?.contactId }
    }

    if (res.status >= 500) {
      return {
        ok: false,
        error: `Не удалось отправить заявку. Попробуйте позже или напишите на ${EMAIL}`,
      }
    }

    return {
      ok: false,
      error: data?.error || 'Не удалось отправить заявку. Попробуйте позже.',
    }
  } catch {
    return {
      ok: false,
      error: 'Проблема с сетью. Проверьте соединение и попробуйте снова.',
    }
  }
}
