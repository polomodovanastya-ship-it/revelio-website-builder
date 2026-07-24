import { render } from "@testing-library/react"
import { ReportView } from "./report-view"
import { ToastProvider } from "@/components/toast"
import { reportFixture } from "@/lib/report-fixture"
import type { ReportSchedule } from "@/lib/report-api"

const schedule: ReportSchedule = {
  unit: "workday",
  workday_hours: 8,
  total_units: 10,
  anchor_label: "ориентировочно, от 24 июл 2026",
  team: [],
  areas: [{ area: "backend", label: "Backend", start_unit: 0, duration_unit: 10, lane_count: 1 }],
  tasks: [
    { task_id: "A", area: "backend", label: "Task A", start_unit: 0, duration_unit: 6, lane: 0, depends_on: [], is_fallback: false },
    { task_id: "B", area: "backend", label: "Task B", start_unit: 6, duration_unit: 4, lane: 0, depends_on: ["A"], is_fallback: false },
  ],
  overhead_lanes: [],
}

function navLabels(container: HTMLElement): string[] {
  const nav = container.querySelector('nav[aria-label="Разделы отчёта"]')
  if (!nav) return []
  return Array.from(nav.querySelectorAll('a')).map((a) => a.textContent?.trim() ?? '')
}

test("report-view always shows the gantt section — chart when schedule present, empty-state when null", () => {
  const withS = render(
    <ToastProvider>
      <ReportView data={{ ...reportFixture, schedule }} token="t" password="p" />
    </ToastProvider>
  )
  expect(withS.getAllByText(/План-график/).length).toBeGreaterThan(0)
  withS.unmount()

  const noS = render(
    <ToastProvider>
      <ReportView data={{ ...reportFixture, schedule: null }} token="t" password="p" />
    </ToastProvider>
  )
  // Section + nav item never disappear now (legacy runs have no schedule) —
  // it renders GanttSection's empty-state instead of hiding.
  expect(noS.getAllByText(/План-график/).length).toBeGreaterThan(0)
  noS.getByText(/План-график для этой оценки недоступен/)
})

test("nav numbering is sequential 01..N with no gaps, including roles + gantt", () => {
  const { container } = render(
    <ToastProvider>
      <ReportView data={{ ...reportFixture, schedule }} token="t" password="p" />
    </ToastProvider>
  )

  const labels = navLabels(container)
  expect(labels.length).toBeGreaterThan(0)

  // Every nav item is numbered — no un-numbered entries (roles/gantt used to
  // have none).
  for (const label of labels) {
    expect(label).toMatch(/^\d{2} /)
  }

  // Sequence starts at 01 and is contiguous, no gaps or repeats.
  const numbers = labels.map((label) => label.slice(0, 2))
  expect(numbers[0]).toBe('01')
  numbers.forEach((n, i) => expect(n).toBe(String(i + 1).padStart(2, '0')))

  // Roles + gantt participate in the same sequence as every other section.
  expect(labels.some((l) => l.includes('Часы по ролям'))).toBe(true)
  expect(labels.some((l) => l.includes('План-график'))).toBe(true)

  // Nav number must match the corresponding section card's own number.
  for (const label of labels) {
    const number = label.slice(0, 2)
    const text = label.slice(3)
    const heading = Array.from(container.querySelectorAll('h2')).find((h) =>
      h.textContent?.includes(text)
    )
    expect(heading).toBeTruthy()
    expect(heading!.textContent).toContain(number)
  }
})

test("hiding an optional section (context) keeps numbering continuous, no gap", () => {
  const data = {
    ...reportFixture,
    schedule,
    project: { ...reportFixture.project, type: undefined, industry: undefined, company: undefined },
    qa: [],
  }
  const { container } = render(
    <ToastProvider>
      <ReportView data={data as any} token="t" password="p" />
    </ToastProvider>
  )

  const labels = navLabels(container)
  expect(labels.some((l) => l.includes('Контекст проекта'))).toBe(false)

  const numbers = labels.map((label) => label.slice(0, 2))
  expect(numbers[0]).toBe('01')
  numbers.forEach((n, i) => expect(n).toBe(String(i + 1).padStart(2, '0')))

  // Groups (originally "03") shifts up to "02" once context is hidden.
  const groups = labels.find((l) => l.includes('Сводная оценка'))
  expect(groups).toMatch(/^02 /)
})
