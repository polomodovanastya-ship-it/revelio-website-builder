// Shared nav items for header + footer. Cross-page anchors (/#…) so they work
// from any route. #reports intentionally omitted (YAGNI, anchor §8).
export const NAV = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Кейсы', href: '/#cases' },
  { label: 'Процесс', href: '/#process' },
  { label: 'Контакты', href: '/#contact' },
] as const
