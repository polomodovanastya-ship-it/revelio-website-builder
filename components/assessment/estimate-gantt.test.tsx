import { render } from "@testing-library/react"
import { EstimateGantt } from "./estimate-gantt"

const base = {
  unit: "workday",
  workday_hours: 8,
  total_units: 10,
  anchor_label: "",
  team: [],
  areas: [{ area: "backend", label: "Backend", start_unit: 0, duration_unit: 10, lane_count: 1 }],
  tasks: [
    { task_id: "A", area: "backend", label: "Task A", start_unit: 0, duration_unit: 6, lane: 0, depends_on: [], is_fallback: false },
    { task_id: "B", area: "backend", label: "Task B", start_unit: 6, duration_unit: 4, lane: 0, depends_on: ["A"], is_fallback: false },
  ],
  overhead_lanes: [{ role: "pm", label: "PM", start_unit: 0, duration_unit: 10, hours: 40 }],
}

test("renders a bar per task + overhead lane", () => {
  const { container } = render(<EstimateGantt schedule={base as any} />)
  expect(container.querySelectorAll('[data-gantt-bar]').length).toBeGreaterThanOrEqual(3)
})

test("empty schedule does not throw", () => {
  render(<EstimateGantt schedule={{ ...base, tasks: [], areas: [], overhead_lanes: [] } as any} />)
})

test("fallback task renders a hatch pattern", () => {
  const s = { ...base, tasks: [{ ...base.tasks[0], is_fallback: true }] }
  const { container } = render(<EstimateGantt schedule={s as any} />)
  expect(container.querySelector('pattern')).not.toBeNull()
})

test("task with null/undefined depends_on does not throw and still renders bars", () => {
  const s = {
    ...base,
    tasks: [
      { ...base.tasks[0], depends_on: null as any },
      { ...base.tasks[1], depends_on: undefined as any },
    ],
  }
  const { container } = render(<EstimateGantt schedule={s as any} />)
  expect(container.querySelectorAll('[data-gantt-bar]').length).toBeGreaterThanOrEqual(2)
})
