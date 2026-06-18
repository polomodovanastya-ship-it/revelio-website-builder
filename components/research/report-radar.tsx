'use client'

export type RadarSeries = { name: string; color: string; values: number[] }

export function ReportRadar({
  axes,
  series,
  max,
  size = 380,
}: {
  axes: string[]
  series: RadarSeries[]
  max: number
  size?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.34
  const n = axes.length
  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2
  const pointAt = (i: number, v: number) => {
    const r = (v / max) * radius
    const a = angleFor(i)
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  }
  const ringCount = 5
  const rings = Array.from({ length: ringCount }, (_, k) => ((k + 1) / ringCount) * max)

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-auto w-full"
      role="img"
      aria-label="Радар-диаграмма сравнения"
    >
      {rings.map((v) => (
        <circle
          key={v}
          cx={cx}
          cy={cy}
          r={(v / max) * radius}
          fill="none"
          stroke="currentColor"
          className="text-border"
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pointAt(i, max)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="currentColor"
            className="text-border"
            strokeWidth={1}
          />
        )
      })}
      {series.map((s) => {
        const pts = s.values.map((v, i) => pointAt(i, v))
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'
        return (
          <g key={s.name}>
            <path
              d={d}
              fill={s.color}
              fillOpacity={0.1}
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={3} fill={s.color} />
            ))}
          </g>
        )
      })}
      {axes.map((label, i) => {
        const [x, y] = pointAt(i, max * 1.18)
        const anchor = Math.abs(x - cx) < 6 ? 'middle' : x > cx ? 'start' : 'end'
        const lines = label.split('\n')
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            className="fill-muted-foreground font-mono"
            fontSize={9}
          >
            {lines.map((ln, li) => (
              <tspan key={li} x={x} dy={li === 0 ? 0 : 11}>
                {ln}
              </tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}
