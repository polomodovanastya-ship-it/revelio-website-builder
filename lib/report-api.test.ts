import { expect, test } from "vitest"
import { normalizeReport } from "./report-api"

test("normalizeReport defends schedule inner arrays", () => {
  const raw = {
    schedule: {
      unit: "workday",
      total_units: 5,
      tasks: null,
      areas: null,
      team: null,
      overhead_lanes: null,
    },
  }
  const r = normalizeReport(raw as any)
  expect(r.schedule?.tasks).toEqual([])
  expect(r.schedule?.areas).toEqual([])
})

test("normalizeReport keeps missing schedule null", () => {
  expect(normalizeReport({} as any).schedule).toBeNull()
})
