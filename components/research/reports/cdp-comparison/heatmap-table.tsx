import { HEATMAP_VENDORS, HEATMAP_ROWS, HEATMAP_LEGEND } from '@/lib/cdp-research-data'

export function HeatmapTable() {
  return (
    <section className="mb-16">
      <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
        Сравнительная тепловая карта
      </h2>
      <p className="mb-6 text-base italic leading-relaxed text-muted-foreground">
        Позволяет сравнить вендоров по 5–7 ключевым параметрам за 5 секунд.
      </p>
      <div className="mb-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="p-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Критерий
              </th>
              {HEATMAP_VENDORS.map((v) => (
                <th
                  key={v}
                  className="p-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_ROWS.map((row) => (
              <tr key={row.criterion} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-foreground">{row.criterion}</td>
                {row.statuses.map((status, i) => {
                  const legend = HEATMAP_LEGEND.find((l) => l.status === status)!
                  return (
                    <td key={HEATMAP_VENDORS[i]} className="p-3">
                      <span
                        role="img"
                        aria-label={legend.label}
                        className={`inline-block h-3.5 w-3.5 rounded-full ${legend.className}`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-5">
        {HEATMAP_LEGEND.map((l) => (
          <div key={l.status} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={`h-3 w-3 rounded-full ${l.className}`} />
            {l.label}
          </div>
        ))}
      </div>
    </section>
  )
}
