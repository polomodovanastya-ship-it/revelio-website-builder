'use client'
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { EstimatorDialog } from '@/components/estimator-dialog'

type EstimatorContextValue = { open: () => void }
const EstimatorContext = createContext<EstimatorContextValue | null>(null)

export function EstimatorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const value = useMemo(() => ({ open }), [open])
  return (
    <EstimatorContext.Provider value={value}>
      {children}
      <EstimatorDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </EstimatorContext.Provider>
  )
}

export function useEstimator(): EstimatorContextValue {
  const ctx = useContext(EstimatorContext)
  if (!ctx) throw new Error('useEstimator must be used within EstimatorProvider')
  return ctx
}
