// Shared nav items for header + footer. Cross-page anchors (/#…) so they work
// from any route. #reports intentionally omitted (YAGNI, anchor §8).
export const NAV = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Кейсы', href: '/#cases' },
  { label: 'Процесс', href: '/#process' },
  { label: 'Журнал', href: '/media' },
  { label: 'Контакты', href: '/#contact' },
] as const
