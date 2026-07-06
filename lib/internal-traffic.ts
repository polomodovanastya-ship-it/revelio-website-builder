// Excludes the team's own visits from Yandex.Metrika.
//
// Metrika's built-in "не учитывать мои визиты" opt-out is tied to the single
// account owner, not to every teammate, and IP-based exclusion filters break
// for anyone off a fixed office IP (VPN, home, mobile) — there is no Metrika
// mechanism that opts out a whole team via a shared secret. So this is
// homegrown: visiting the site with a secret query param sets a long-lived
// cookie, and the Metrika init script (see app/layout.tsx) skips loading
// entirely when that cookie is present.
export const INTERNAL_TRAFFIC_COOKIE = 'internal_traffic'
export const INTERNAL_TRAFFIC_QUERY_PARAM = 'rvi'
export const INTERNAL_TRAFFIC_SECRET = 'a730196aaa3e'
