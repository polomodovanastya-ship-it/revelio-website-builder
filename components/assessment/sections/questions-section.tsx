import { ReportSectionCard } from '../primitives'

// 08 Вопросы
export function QuestionsSection({ questions }: { questions: string[] }) {
  return (
    <ReportSectionCard number="08" title="Вопросы для созвона с экспертом">
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
