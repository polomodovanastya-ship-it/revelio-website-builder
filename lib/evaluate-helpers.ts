// lib/evaluate-helpers.ts

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024 // 25 МБ

export const POLL_TIMEOUT_MS = 30 * 60 * 1000

export const ALLOWED_EXTENSIONS = new Set([".docx", ".pdf", ".md", ".txt", ".odt"])

export const ALLOWED_MIME_TYPES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "text/markdown",
  "text/plain",
  "application/vnd.oasis.opendocument.text",
])

export const FILE_ACCEPT = [...ALLOWED_EXTENSIONS, ...ALLOWED_MIME_TYPES].join(",")

export type FileValidationResult =
  | { valid: true; error?: undefined }
  | { valid: false; error: string }

export function validateFile(file: File): FileValidationResult {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "Файл слишком большой. Максимум 25 МБ." }
  }

  const dotIndex = file.name.lastIndexOf(".")
  const ext = dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : ""
  const extAllowed = ALLOWED_EXTENSIONS.has(ext)
  const mimeAllowed =
    file.type !== "" &&
    file.type !== "application/octet-stream" &&
    ALLOWED_MIME_TYPES.has(file.type)

  if (!extAllowed && !mimeAllowed) {
    return {
      valid: false,
      error: "Неподдерживаемый формат. Загрузите PDF, DOCX, ODT, MD или TXT.",
    }
  }

  return { valid: true }
}
