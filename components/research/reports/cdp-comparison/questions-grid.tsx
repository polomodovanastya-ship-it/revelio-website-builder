import { MessageCircleQuestion } from 'lucide-react'
import { CLOUD_ONPREM_QUESTIONS, SECRET_KNOWLEDGE_NOTE } from '@/lib/cdp-research-data'

export function QuestionsGrid() {
  return (
    <div className="mb-12 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
          <MessageCircleQuestion className="h-5 w-5 text-accent" />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Вопросы, с которыми к нам приходят
        </p>
      </div>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {CLOUD_ONPREM_QUESTIONS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card">
              <Icon className="h-4 w-4 text-accent" />
            </span>
            <p className="text-sm italic leading-snug text-foreground">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm italic text-muted-foreground">{SECRET_KNOWLEDGE_NOTE}</p>
    </div>
  )
}
