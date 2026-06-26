'use client'
import { ToastProvider } from '@/components/toast'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CookieBanner } from '@/components/cookie-banner'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <CookieBanner />
    </ToastProvider>
  )
}
