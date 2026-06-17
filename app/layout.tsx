import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Unbounded, Golos_Text, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
})

const golos = Golos_Text({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono-cyr',
  subsets: ['latin', 'cyrillic'],
})

// Next does not prefix metadata icon URLs with basePath, so do it ourselves
// for the static /test-variant build (no-op for a normal dev/build).
const basePath = process.env.STATIC_BASE_PATH ?? ''
const asset = (path: string) => `${basePath}${path}`

export const metadata: Metadata = {
  title: 'Ревелио — Консалтинг, разработка и внедрение экспертизы в бизнес',
  description:
    'Внедряем новую экспертизу в бизнес: от оценки задачи до запуска команды и передачи функции внутрь компании. Консалтинг, разработка продуктов и трансформация процессов для крупного B2B.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: asset('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: asset('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: asset('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: asset('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${golos.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && !basePath && <Analytics />}
      </body>
    </html>
  )
}
