// lib/report-fixture.ts
// Fixture matching the ReportData contract, for building/visual dev against
// components/assessment without the backend. Not imported by any runtime
// code path — wire it into a page manually during local UI work if needed.
import type { ReportData } from "./report-api"

export const reportFixture: ReportData = {
  project: {
    title: "Развитие и масштабирование ИИ-ассистента",
    type: "new_direction",
    industry: "Retail / Logistics",
    company: "АО «Тандер»",
    summary:
      "Функциональное и технологическое развитие пилотного ИИ-ассистента, масштабирование на ГК, РЦ и АТП (1 500 пользователей, 300 одновременных). Охват: платформа (чат, пространства, админка), ассистенты, интеграции AD/Trino/LLM, инфраструктура, документация, обучение, ПСИ.",
  },
  totals: {
    tasks: 94,
    hours_min: 2615,
    hours_expected: 3906,
    hours_max: 5318,
    risks_count: 7,
    questions_answered: 12,
    questions_total: 20,
  },
  groups: [
    { name: "Инфраструктура", count: 19, min: 1048, expected: 1538, max: 2056, share: 0.39, accuracy: "Средняя" },
    { name: "Разработка функциональности", count: 40, min: 940, expected: 1447, max: 1962, share: 0.37, accuracy: "Средняя" },
    { name: "Интеграции", count: 17, min: 116, expected: 220, max: 392, share: 0.06, accuracy: "Низкая" },
    { name: "Тестирование и QA", count: 6, min: 200, expected: 253, max: 306, share: 0.06, accuracy: "Средняя" },
    { name: "Документация", count: 4, min: 88, expected: 108, max: 136, share: 0.03, accuracy: "Средняя" },
    { name: "Исследование и данные", count: 4, min: 64, expected: 100, max: 140, share: 0.03, accuracy: "Средняя" },
    { name: "Управление проектом", count: 1, min: 24, expected: 40, max: 56, share: 0.01, accuracy: "Средняя" },
  ],
  tasks: [
    { group: "Инфраструктура", title: "Реализация требований информационной безопасности", min: 80, expected: 120, max: 160, accuracy: "Средняя" },
    { group: "Инфраструктура", title: "Подготовка инфраструктуры для масштабирования", min: 60, expected: 100, max: 140, accuracy: "Средняя" },
    { group: "Инфраструктура", title: "Контейнеризация и подготовка к развёртыванию", min: 60, expected: 100, max: 140, accuracy: "Средняя" },
    { group: "Разработка функциональности", title: "Разработка ядра мультиагентной платформы", min: 80, expected: 120, max: 160, accuracy: "Средняя" },
    { group: "Разработка функциональности", title: "ИИ-ассистент для анализа операций РЦ", min: 40, expected: 64, max: 88, accuracy: "Средняя" },
    { group: "Разработка функциональности", title: "Аутентификация и авторизация", min: 48, expected: 72, max: 96, accuracy: "Высокая" },
    { group: "Интеграции", title: "Интеграция с LLM-моделями заказчика", min: 4, expected: 8, max: 16, accuracy: "Низкая" },
    { group: "Интеграции", title: "Интеграция с Trino для доступа к данным", min: 4, expected: 8, max: 16, accuracy: "Низкая" },
    { group: "Тестирование и QA", title: "Нагрузочное тестирование (300 пользователей)", min: 24, expected: 32, max: 40, accuracy: "Средняя" },
    { group: "Тестирование и QA", title: "ПСИ и совместное тестирование", min: 40, expected: 50, max: 60, accuracy: "Средняя" },
    { group: "Документация", title: "Руководство пользователя", min: 12, expected: 16, max: 20, accuracy: "Средняя" },
    { group: "Управление проектом", title: "Организация процессов технического сопровождения", min: 24, expected: 40, max: 56, accuracy: "Средняя" },
  ],
  roles: {
    total_expected: 3906,
    roles: [
      { role: "frontend", label: "Frontend", hours_min: 560, hours_expected: 860, hours_max: 1180, task_count: 22, share: 0.22 },
      { role: "backend", label: "Backend", hours_min: 720, hours_expected: 1120, hours_max: 1520, task_count: 28, share: 0.29 },
      { role: "devops", label: "DevOps", hours_min: 640, hours_expected: 940, hours_max: 1260, task_count: 14, share: 0.24 },
      { role: "qa", label: "QA", hours_min: 200, hours_expected: 253, hours_max: 306, task_count: 6, share: 0.06 },
      { role: "analyst", label: "Аналитик", hours_min: 96, hours_expected: 156, hours_max: 220, task_count: 6, share: 0.04 },
      { role: "pm", label: "PM", hours_min: 200, hours_expected: 300, hours_max: 400, task_count: 8, share: 0.08 },
      { role: "designer", label: "Дизайнер", hours_min: 60, hours_expected: 90, hours_max: 130, task_count: 4, share: 0.02 },
      { role: "data", label: "Data Engineer", hours_min: 90, hours_expected: 130, hours_max: 190, task_count: 5, share: 0.03 },
      { role: "ml", label: "ML", hours_min: 40, hours_expected: 57, hours_max: 80, task_count: 3, share: 0.02 },
    ],
  },
  risks: [
    "Срок 3 месяца при ~3 900 ч — нужен MVP-scope или расширение команды",
    "Часть задач оценена без достаточного контекста — оценка уточняется после интервью",
    "14 интеграционных задач с низкой точностью — AD, Trino, LLM зависят от контура заказчика",
    "Недокументированный пилот увеличивает время архитектурного анализа",
    "Качество данных в Trino — ответственность заказчика по ТЗ",
    "Мультиагентная оркестрация: маршрутизация, контекст, качество ответов требуют уточнения",
    "Часть задач оценена без plan-fact истории — широкий диапазон min–max",
  ],
  assumptions: [
    "Доступна документация текущего пилота",
    "Ядро платформы уже реализовано",
    "Используется существующий tech stack",
    "Команда знакома с паттернами агентных систем",
    "Компоненты контейнеризированы, K8s или аналог",
    "LLM on-prem доступна по согласованному API",
    "Схемы представлений РЦ и АТП в Trino существуют",
    "AD/LDAP доступен, ролевая модель определена",
    "Заказчик доступен для совместного тестирования (ПСИ)",
  ],
  accuracy: {
    overall: "Средняя",
    low_conf_tasks: 14,
    thin_context_tasks: 72,
    error_band: "15–30% на test-set",
    basis: "Методология пресейла + plan-fact (Jira), PMBoK-принципы",
  },
  qa: [
    { question: "Какой у проекта тип и отрасль?", answer: "Продуктовая разработка, Retail / Logistics." },
    { question: "Есть ли пилот и в каком он состоянии?", answer: "Да, пилот запущен, требуется масштабирование на ГК, РЦ и АТП." },
    { question: "Какая LLM используется?", answer: "On-prem, Qwen3.5-27B и выше." },
    { question: "Как устроен доступ к данным?", answer: "Trino поверх PostgreSQL, представления по РЦ и АТП." },
  ],
  questions: [
    "Фактическая готовность модулей «Чат», «Пространства», «Админка»?",
    "Какие Trino views есть, какие нужно создать/доработать?",
    "API LLM: формат, streaming, лимиты, function calling?",
    "Фазирование: что входит в 3 месяца, что во 2-ю фазу?",
    "Состав команды исполнителя vs объём 3 906 ч?",
    "Регламент ПСИ и состав эксплуатационной документации?",
  ],
  downloads: {
    pdf: true,
    csv: true,
  },
}
