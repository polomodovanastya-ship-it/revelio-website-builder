import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { AppProviders } from '@/components/app-providers'
import { MetrikaRouteTracker } from '@/components/metrika-route-tracker'
import { YANDEX_METRIKA_ID } from '@/lib/metrika'
import {
  INTERNAL_TRAFFIC_COOKIE,
  INTERNAL_TRAFFIC_QUERY_PARAM,
  INTERNAL_TRAFFIC_SECRET,
} from '@/lib/internal-traffic'
import { PHONE, EMAIL } from '@/lib/contacts'
import './globals.css'

const interTight = Inter_Tight({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800', '900'],
})

const inter = Inter({
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
  metadataBase: new URL('https://revelio.tech'),
  title: {
    default: 'Ревелио — Консалтинг, разработка и внедрение экспертизы в бизнес',
    template: '%s — Ревелио',
  },
  description:
    'Внедряем новую экспертизу в бизнес: от оценки задачи до запуска команды и передачи функции внутрь компании. Консалтинг, разработка продуктов и трансформация процессов для крупного B2B.',
  generator: 'v0.app',
  // OpenGraph / Twitter mirrored from prod (revelio.tech) so link previews match.
  openGraph: {
    title: 'Ревелио – Внедрение новой экспертизы в бизнес',
    description:
      'Консалтинг и ИТ-разработка * Проектирование * Data-аналитика продаж и маркетинга * Web, CRM/Loyalty/CDP, MDM, DWH, НСИ, HRM',
    type: 'website',
    url: '/',
    images: [{ url: '/og-cover.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-cover.png'],
  },
  alternates: { canonical: '/' },
  verification: { yandex: '15d799df6e828c70' },
  icons: {
    icon: [
      { url: asset('/favicon.ico'), sizes: 'any' },
      { url: asset('/favicon.png'), type: 'image/png' },
    ],
    apple: asset('/apple-touch-icon.png'),
  },
}

// Yandex.Metrika is mirrored from prod (revelio.tech). Hits are sent only from a
// real production build (not dev / static preview) so local work and the
// /test-variant preview don't pollute counter stats.
const enableMetrika = process.env.NODE_ENV === 'production' && !basePath

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: 'window._ab_id_=173315' }}
        />
        <script src="https://cdn.botfaqtor.ru/one.js" async />
        {enableMetrika && (
          // Runs before the Metrika script below (document order, both
          // blocking inline scripts). A visit carrying the secret query
          // param sets a long-lived cookie and strips the param from the
          // URL; any visit carrying the cookie sets window.__RV_INTERNAL__,
          // which the Metrika init script checks before loading.
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var c=${JSON.stringify(INTERNAL_TRAFFIC_COOKIE)};var p=new URLSearchParams(location.search);if(p.get(${JSON.stringify(INTERNAL_TRAFFIC_QUERY_PARAM)})===${JSON.stringify(INTERNAL_TRAFFIC_SECRET)}){document.cookie=c+'=1;max-age=31536000;path=/;samesite=lax';p.delete(${JSON.stringify(INTERNAL_TRAFFIC_QUERY_PARAM)});var q=p.toString();history.replaceState(null,'',location.pathname+(q?'?'+q:'')+location.hash);}window.__RV_INTERNAL__=document.cookie.indexOf(c+'=1')!==-1;}catch(e){window.__RV_INTERNAL__=false;}})();`,
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ООО Ревелио',
              url: 'https://revelio.tech',
              email: EMAIL,
              telephone: PHONE,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ревелио',
              url: 'https://revelio.tech',
              inLanguage: 'ru',
              publisher: { '@type': 'Organization', name: 'ООО Ревелио' },
            }),
          }}
        />
        <AppProviders>{children}</AppProviders>
        <Suspense fallback={null}>
          <MetrikaRouteTracker />
        </Suspense>
        {enableMetrika && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`if(!window.__RV_INTERNAL__){(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YANDEX_METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,ecommerce:"dataLayer"});}`}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
