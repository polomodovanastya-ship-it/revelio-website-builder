import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Оценить проект",
  description:
    "Опишите задачу за 5 минут и получите оценку команды, сроков и стоимости проекта от ООО «Ревелио».",
  path: "/evaluate",
})

export default function EvaluateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
