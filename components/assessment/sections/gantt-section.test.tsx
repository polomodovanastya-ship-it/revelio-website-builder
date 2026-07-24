import { render } from "@testing-library/react"
import { GanttSection } from "./gantt-section"

const base = {
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

test("renders title, caption, and a data-table row per task", () => {
  const { getByText, container } = render(<GanttSection schedule={base as any} />)
  getByText("План-график")
  getByText(/ориентировочно, от 24 июл 2026/)
  expect(container.querySelectorAll('[data-gantt-row]').length).toBe(2)
})

test("falls back to a static caption when anchor_label is empty (no new Date())", () => {
  const { getByText } = render(<GanttSection schedule={{ ...base, anchor_label: "" } as any} />)
  getByText(/ориентировочно, рабочие дни/)
})

test("null schedule renders title + empty-state, no data rows", () => {
  const { getByText, container } = render(<GanttSection schedule={null} />)
  getByText("План-график")
  getByText(/План-график для этой оценки недоступен/)
  expect(container.querySelectorAll('[data-gantt-row]').length).toBe(0)
})

test("empty-tasks schedule renders empty-state, no data rows", () => {
  const { getByText, container } = render(<GanttSection schedule={{ ...base, tasks: [] } as any} />)
  getByText("План-график")
  getByText(/План-график для этой оценки недоступен/)
  expect(container.querySelectorAll('[data-gantt-row]').length).toBe(0)
})

test("task with null/undefined depends_on does not throw and still renders rows", () => {
  const s = {
    ...base,
    tasks: [
      { ...base.tasks[0], depends_on: null as any },
      { ...base.tasks[1], depends_on: undefined as any },
    ],
  }
  const { container } = render(<GanttSection schedule={s as any} />)
  expect(container.querySelectorAll('[data-gantt-row]').length).toBe(2)
})
