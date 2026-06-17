// Prefixes public asset paths with the base path used for static-export
// preview builds (e.g. /test-variant-02). No-op for normal dev/build.
// Next does NOT auto-prefix plain <img src> / public files, so we do it here.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string): string {
  return `${BASE_PATH}${path}`
}
