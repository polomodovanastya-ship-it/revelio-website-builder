import { fireEvent, render, screen } from "@testing-library/react"
import { DownloadsBar } from "./downloads-bar"

const allDownloads = { pdf: true, csv: true, gantt: true }

test("renders a button per available download kind", () => {
  render(<DownloadsBar downloads={allDownloads} onDownload={() => {}} downloading={null} />)
  expect(screen.getByText("Скачать задачи")).not.toBeNull()
  expect(screen.getByText("Скачать вопросы")).not.toBeNull()
  expect(screen.getByText("Скачать гант")).not.toBeNull()
  expect(screen.getByText("Скачать оценку")).not.toBeNull()
})

test("gantt button only renders when downloads.gantt is true", () => {
  render(
    <DownloadsBar
      downloads={{ pdf: true, csv: true, gantt: false }}
      onDownload={() => {}}
      downloading={null}
    />,
  )
  expect(screen.queryByText("Скачать гант")).toBeNull()
})

test("clicking Скачать гант calls onDownload('gantt')", () => {
  const onDownload = vi.fn()
  render(<DownloadsBar downloads={allDownloads} onDownload={onDownload} downloading={null} />)
  fireEvent.click(screen.getByText("Скачать гант"))
  expect(onDownload).toHaveBeenCalledWith("gantt")
})

test("each download kind renders its distinct format icon", () => {
  const { container } = render(
    <DownloadsBar downloads={allDownloads} onDownload={() => {}} downloading={null} />,
  )
  // pdf -> FileText, csv/questions -> Table2, gantt -> FileSpreadsheet
  expect(container.querySelectorAll("svg.lucide-file-text").length).toBe(1)
  expect(container.querySelectorAll("svg.lucide-table-2").length).toBe(2)
  expect(container.querySelectorAll("svg.lucide-file-spreadsheet").length).toBe(1)
})

test("downloading a kind swaps its icon for the spinner", () => {
  const { container } = render(
    <DownloadsBar downloads={allDownloads} onDownload={() => {}} downloading="gantt" />,
  )
  expect(container.querySelector("svg.lucide-file-spreadsheet")).toBeNull()
  expect(container.querySelector("svg.animate-spin")).not.toBeNull()
})
