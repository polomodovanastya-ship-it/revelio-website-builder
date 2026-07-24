import { ReportSectionCard } from '../primitives'

// Вопросы — number is assigned by report-view based on render order.
export function QuestionsSection({
  questions,
  number,
}: {
  questions: string[]
  number?: string
}) {
  return (
    <ReportSectionCard number={number} title="Вопросы для созвона с экспертом">
      <ul className="space-y-2 text-sm text-foreground">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">{i + 1}.</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </ReportSectionCard>
  )
}
