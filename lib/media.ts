// Content for the "Media" section (home preview + /media page).
import bartAudio from '@/src/assets/bart-podcast.mp3.asset.json'
import saCommunityCover from '@/src/assets/sa-community-cover.jpg.asset.json'
import rbcLogo from '@/src/assets/RBK_logo.svg.asset.json'
import forbesLogo from '@/src/assets/Forbes-logo.svg.asset.json'
import nrLogo from '@/src/assets/New_retail_logo.png.asset.json'
import sostavLogo from '@/src/assets/Sostav_logo.svg.asset.json'
import incLogo from '@/src/assets/Inc_logo.webp.asset.json'
import sostavIllustration from '@/src/assets/Sostav_illustration.jpg.asset.json'
import sostavIllustration2 from '@/src/assets/Sostav_illustration_2_1-2.png.asset.json'
import sostavIllustration4 from '@/src/assets/Sostav_illustration_4.jpg.asset.json'
import rbkIllustration from '@/src/assets/RBK_illustration.jpg.asset.json'
import rbkIllustration1 from '@/src/assets/RBK_illustration_1.png.asset.json'
import bartIllustration from '@/src/assets/Code_of_leadership_illustration_2.png.asset.json'
import tInsightIllustration from '@/src/assets/T-Insight_illustration_2.png.asset.json'



export type MediaKind = 'research' | 'article' | 'podcast'

export type MediaPlatformLink = {
  label: string
  href: string
}

export type MediaItem = {
  id: string
  kind: MediaKind
  emoji: string
  tag: string
  title: string
  desc: string
  primaryHref: string
  primaryLabel: string
  platforms?: MediaPlatformLink[]
  downloadHref?: string
  date?: string
  embedHref?: string
  embedTitle?: string
  audioSrc?: string
  coverSrc?: string
  logoSrc?: string
}


const RAW_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'cdp-comparison-2026',
    kind: 'research',
    emoji: '',
    tag: 'Исследование',
    title: 'Как выбрать CDP / Loyalty / Comms платформу в 2026?',
    desc:
      'Сравнение CDP, кампейн-менеджеров и RTDM: модели данных, сегментация в реальном времени, интеграции с каналами, TCO.',
    primaryHref: '/research/cdp-comparison-2026',
    primaryLabel: 'Получить доступ',
  },
  {
    id: 'forbes-excel-to-ml',
    kind: 'article',
    emoji: '',
    tag: '',
    title: 'От Excel к ML: как бизнесу перейти на динамическое ценообразование',
    desc:
      'Разбор шагов перехода от ручных прайс-листов к ML-моделям динамического ценообразования: данные, команда, пилоты и метрики.',
    primaryHref:
      'https://www.forbes.ru/tekhnologii/517827-ot-excel-k-ml-kak-biznesu-perejti-na-dinamiceskoe-cenoobrazovanie',
    primaryLabel: 'Читать',
    date: '2025',
    logoSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${forbesLogo.url}`,
  },
  {
    id: 'rbc-pro-pricing',
    kind: 'article',
    emoji: '',
    tag: '',
    title: 'Как мгновенно изменять цены на сотни товаров и перестать терять прибыль',
    desc:
      'Как ритейлеры переходят к динамическим ценам: данные, ML-модели, влияние на маржу и клиентский опыт.',
    primaryHref: 'https://pro.rbc.ru/demo/67035fff9a79476cf7d676ca',
    primaryLabel: 'Читать',
    date: '2024',
    logoSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${rbcLogo.url}`,
    coverSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${rbkIllustration1.url}`,
  },
  {
    id: 'newretail-ml-pricing',
    kind: 'article',
    emoji: '',
    tag: '',
    title: 'Умное ценообразование для бизнеса: определяем стоимость товаров с помощью ML-алгоритмов',
    desc:
      'Как ML-алгоритмы помогают бизнесу назначать цены — модели, данные, кейсы и подводные камни внедрения.',
    primaryHref:
      'https://new-retail.ru/tehnologii/umnoe_tsenoobrazovanie_dlya_biznesa_opredelyaem_stoimost_tovarov_s_pomoshchyu_ml_algoritmov/',
    primaryLabel: 'Читать',
    date: '2024',
    logoSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${nrLogo.url}`,
  },
  {
    id: 'sostav-gamification',
    kind: 'article',
    emoji: '',
    tag: '',
    title: 'Геймификация и мини-игры в маркетинге',
    desc:
      'Как бренды используют мини-игры и геймификацию для вовлечения аудитории, роста удержания и продаж.',
    primaryHref: 'https://www.sostav.ru/publication/gejmifikatsiya-67052.html',
    primaryLabel: 'Читать',
    date: '2024',
    logoSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${sostavLogo.url}`,
    coverSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${sostavIllustration4.url}`,
  },
  {
    id: 'incrussia-dynamic-prices',
    kind: 'article',
    emoji: '',
    tag: '',
    title: 'Динамические цены в e-com и рознице',
    desc:
      'Как динамическое ценообразование меняет e-com и офлайн-розницу: механика, эффекты и ограничения.',
    primaryHref: 'https://incrussia.ru/share/dinamicheskie-ceni-v-ecom-i-roznice/',
    primaryLabel: 'Читать',
    date: '2024',
    logoSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${incLogo.url}`,
  },

  {
    id: 'podcast-bart',
    kind: 'podcast',
    emoji: '',
    tag: 'Подкаст',
    title: 'Подкаст о групповой динамике и модели BART',
    desc:
      'Анастасия — о ролях, границах и власти в командах через призму модели BART (Boundary, Authority, Role, Task).',
    primaryHref:
      'https://podster.fm/podcasts/code-of-leadership/e/382829/interview-with-anastasia-about-group-dynamics-and-bart-model',
    primaryLabel: 'Слушать',
    embedHref: 'https://www.youtube.com/embed/9oEWCF3fLsc',
    embedTitle: 'Подкаст о групповой динамике и модели BART',
    audioSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${bartAudio.url}`,
    coverSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${bartIllustration.url}`,
    platforms: [
      {
        label: 'Podster',
        href: 'https://podster.fm/podcasts/code-of-leadership/e/382829/interview-with-anastasia-about-group-dynamics-and-bart-model',
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/watch?v=9oEWCF3fLsc',
      },
    ],
  },
  {
    id: 'podcast-sa-community',
    kind: 'podcast',
    emoji: '',
    tag: 'Подкаст',
    title: 'У системных аналитиков нет комьюнити: миф или реальность',
    desc:
      'Как строятся профессиональные комьюнити, роль лидера, конфликтность и безопасность, что мешает и что помогает аналитикам собирать сообщества.',
    primaryHref: 'https://podcast.ru/e/.JZEV3pzZRB',
    primaryLabel: 'Слушать',
    embedHref:
      'https://embed.podcasts.apple.com/us/podcast/id1770487261?i=1000730702310',
    embedTitle: 'У системных аналитиков нет комьюнити: миф или реальность',
    coverSrc: `https://project--08ee55dc-06c7-4d4e-8eee-0ca50f80d337-dev.lovable.app${tInsightIllustration.url}`,
    platforms: [
      {
        label: 'Apple Podcasts',
        href: 'https://podcasts.apple.com/us/podcast/id1770487261?i=1000730702310',
      },
      { label: 'Yandex Music', href: 'https://music.yandex.ru/album/33430820/track/143773747' },
      { label: 'Zvuk', href: 'https://zvuk.com/episode/160551506' },
    ],
  },
]

// Shuffled order interleaves cards with/without covers for masonry layout.
const SHUFFLED_ORDER = [
  'forbes-excel-to-ml',
  'cdp-comparison-2026',
  'podcast-bart',
  'newretail-ml-pricing',
  'rbc-pro-pricing',
  'incrussia-dynamic-prices',
  'podcast-sa-community',
  'sostav-gamification',
]

export const MEDIA_ITEMS: MediaItem[] = SHUFFLED_ORDER
  .map((id) => RAW_MEDIA_ITEMS.find((it) => it.id === id))
  .filter((it): it is MediaItem => Boolean(it))
