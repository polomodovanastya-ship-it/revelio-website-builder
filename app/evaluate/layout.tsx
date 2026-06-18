import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Оценить проект — Ревелио",
  description:
    "Опишите задачу за 5 минут и получите оценку команды, сроков и стоимости проекта от ООО «Ревелио».",
  alternates: { canonical: "https://revelio.tech/evaluate" },
  openGraph: {
    title: "Оценить проект — Ревелио",
    url: "https://revelio.tech/evaluate",
  },
}

export default function EvaluateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
