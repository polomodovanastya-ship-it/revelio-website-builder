import { CLOUD_ONPREM_QUESTIONS } from '@/lib/cdp-research-data'

export function QuestionsGrid() {
  return (
    <div className="mb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      {CLOUD_ONPREM_QUESTIONS.map((q) => (
        <div
          key={q}
          className="rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_36px_-20px_rgba(20,37,80,0.28)]"
        >
          <p className="text-sm italic leading-snug text-foreground">{q}</p>
        </div>
      ))}
    </div>
  )
}
