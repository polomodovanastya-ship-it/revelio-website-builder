import { ReportHero, StatCard, ReportSection, ReportCTA } from '../report-primitives'

export function UxB2bTravel2026Body() {
  return (
    <>
      <ReportHero
        badge="Закрытое исследование · по запросу"
        title="UX B2B Travel, 2026"
        subtitle="Юзабилити корпоративных travel-платформ"
        lead="Сравнение пользовательского опыта ведущих B2B travel-сервисов: поиск и бронирование, согласование командировок, интеграции с бухгалтерией и travel-политиками."
      />

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <StatCard value="8" label="платформ в сравнении" />
        <StatCard value="120+" label="UX-критериев" />
        <StatCard value="5" label="ролей пользователей" />
      </div>

      <ReportSection heading="Что внутри">
        <p>
          Карта пути travel-координатора и сотрудника, скоринг интерфейсов, типовые дефекты,
          бенчмарк по скорости бронирования и сложности согласования.
        </p>
      </ReportSection>

      <ReportSection heading="Для кого">
        <p>
          Продуктовые команды travel-tech, директоры по закупкам, HR и административные службы
          крупных компаний.
        </p>
      </ReportSection>

      <ReportSection heading="Методология">
        <p>
          Экспертная UX-оценка, юзабилити-тесты с реальными пользователями, глубинные интервью с
          travel-менеджерами.
        </p>
      </ReportSection>

      <div className="mt-8">
        <ReportCTA access="gated" />
      </div>
    </>
  )
}
