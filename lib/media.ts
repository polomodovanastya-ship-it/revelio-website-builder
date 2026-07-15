// Content for the "Media" section (home preview + /media page).

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
}

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'cdp-comparison-2026',
    kind: 'research',
    emoji: '📊',
    tag: 'Исследование',
    title: 'Как выбрать CDP / Loyalty / Comms платформу в 2026?',
    desc:
      'Сравнение CDP, кампейн-менеджеров и RTDM: модели данных, сегментация в реальном времени, интеграции с каналами, TCO.',
    primaryHref: '/research/cdp-comparison-2026',
    primaryLabel: 'Получить доступ',
    date: '2026',
  },
  {
    id: 'forbes-excel-to-ml',
    kind: 'article',
    emoji: '📝',
    tag: 'Статья',
    title: 'От Excel к ML: как бизнесу перейти на динамическое ценообразование',
    desc:
      'Разбор шагов перехода от ручных прайс-листов к ML-моделям динамического ценообразования: данные, команда, пилоты и метрики.',
    primaryHref:
      'https://www.forbes.ru/tekhnologii/517827-ot-excel-k-ml-kak-biznesu-perejti-na-dinamiceskoe-cenoobrazovanie',
    primaryLabel: 'Перейти',
    date: '2025',
  },
  {
    id: 'podcast-bart',
    kind: 'podcast',
    emoji: '🎙️',
    tag: 'Подкаст',
    title: 'Подкаст о групповой динамике и модели BART',
    desc:
      'Анастасия — о ролях, границах и власти в командах через призму модели BART (Boundary, Authority, Role, Task).',
    primaryHref:
      'https://podster.fm/podcasts/code-of-leadership/e/382829/interview-with-anastasia-about-group-dynamics-and-bart-model',
    primaryLabel: 'Слушать',
    date: '2024',
    embedHref: 'https://www.youtube.com/embed/9oEWCF3fLsc',
    embedTitle: 'Подкаст о групповой динамике и модели BART',
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
    emoji: '🎙️',
    tag: 'Подкаст',
    title: 'У системных аналитиков нет комьюнити: миф или реальность',
    desc:
      'Как строятся профессиональные комьюнити, роль лидера, конфликтность и безопасность, что мешает и что помогает аналитикам собирать сообщества.',
    primaryHref: 'https://podcast.ru/e/.JZEV3pzZRB',
    primaryLabel: 'Слушать',
    embedHref:
      'https://embed.podcasts.apple.com/us/podcast/id1770487261?i=1000730702310',
    embedTitle: 'У системных аналитиков нет комьюнити: миф или реальность',
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
