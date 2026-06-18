import type { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center pt-28">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">[ 404 ]</span>
      <h1 className="mt-3 font-heading text-3xl font-extrabold uppercase tracking-tight text-primary sm:text-5xl">
        Страница не найдена
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
        Похоже, такой страницы нет или она переехала.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-foreground hover:bg-primary"
        >
          <Home className="h-4 w-4" />
          На главную
        </Link>
        <a
          href="/#contact"
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground hover:border-accent hover:text-accent"
        >
          Связаться
        </a>
      </div>
    </div>
  )
}
