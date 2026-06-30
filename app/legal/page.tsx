import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { DefinitionList, DefinitionRow } from '@/components/definition-list'
import { PHONE, EMAIL } from '@/lib/contacts'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: { absolute: 'Реквизиты ООО «Ревелио» — ИНН, ОГРН, адрес' },
  description: 'Юридические реквизиты ООО «Ревелио»: ИНН 9714091225, ОГРН 1267700146548, адрес в Москве, контактные данные.',
  path: '/legal',
  ogTitle: 'Реквизиты ООО «Ревелио»',
})

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ООО «Ревелио»',
  alternateName: 'Revelio',
  email: EMAIL,
  telephone: PHONE,
  url: 'https://revelio.tech/legal',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'проезд Берёзовой Рощи, д. 12, кв. 56',
    addressLocality: 'Москва',
    postalCode: '125252',
    addressCountry: 'RU',
  },
}

export default function LegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <PageContainer width="prose">
        <PageHero
          eyebrow="РЕКВИЗИТЫ"
          title="Реквизиты организации"
          subtitle="Сведения о юридическом лице в соответствии с законодательством РФ"
        />

        <DefinitionList>
          <DefinitionRow
            label="Полное наименование"
            value="Общество с ограниченной ответственностью «Ревелио»"
          />
          <DefinitionRow label="Сокращённое наименование" value="ООО «Ревелио»" />
          <DefinitionRow label="Генеральный директор" value="Поломодова Анастасия Сергеевна" />
          <DefinitionRow label="ОГРН" value="1267700146548" />
          <DefinitionRow label="ИНН" value="9714091225" />
          <DefinitionRow label="КПП" value="771401001" />
          <DefinitionRow label="Дата регистрации" value="24.04.2026" />
          <DefinitionRow
            label="Юридический адрес"
            value="125252, г. Москва, вн. тер. г. муниципальный округ Хорошёвский, проезд Берёзовой Рощи, д. 12, кв. 56"
          />
          <DefinitionRow label="Электронная почта" value={EMAIL} />
          <DefinitionRow label="Телефон" value={PHONE} />
        </DefinitionList>
      </PageContainer>
    </>
  )
}
