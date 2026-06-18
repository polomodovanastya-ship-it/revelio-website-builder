// Yandex.Metrika counter id — shared by layout init script and route tracker.
export const YANDEX_METRIKA_ID = 108732849

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}
export {}
