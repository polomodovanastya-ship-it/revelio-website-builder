'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'
type Toast = { id: number; message: string; type: ToastType }

export type ToastApi = {
  success(message: string): void
  error(message: string): void
  info(message: string): void
}

const ToastContext = createContext<{ toast: ToastApi } | null>(null)

const AUTO_DISMISS_MS = 4000

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)
  const idRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (message: string, type: ToastType) => {
      const id = (idRef.current += 1)
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => remove(id), AUTO_DISMISS_MS)
    },
    [remove],
  )

  const toast = useMemo<ToastApi>(
    () => ({
      success: (m) => push(m, 'success'),
      error: (m) => push(m, 'error'),
      info: (m) => push(m, 'info'),
    }),
    [push],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed top-4 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2">
            {toasts.map((t) => {
              const Icon =
                t.type === 'success' ? CheckCircle2 : t.type === 'error' ? AlertCircle : Info
              const iconColor = t.type === 'error' ? 'text-destructive' : 'text-accent'
              return (
                <div
                  key={t.id}
                  role="status"
                  aria-live="polite"
                  className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground shadow-[0_16px_40px_-12px_rgba(20,37,80,0.45)]"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                  <span>{t.message}</span>
                </div>
              )
            })}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

export function useToast(): { toast: ToastApi } {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
