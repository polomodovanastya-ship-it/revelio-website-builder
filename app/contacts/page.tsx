import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { ContactCards } from '@/components/contact-cards'
import { Contact } from '@/components/contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Контакты',
  description:
    'Контакты Ревелио: телефон +7-993-590-9260, Telegram @reveliotech, почта welcome@revelio.tech. Обсудим задачу и оценим проект.',
  path: '/contacts',
})

export default function ContactsPage() {
  return (
    <PageContainer>
      <PageHero eyebrow="КОНТАКТЫ" title="Контакты" />
      <ContactCards />
      <Contact />
    </PageContainer>
  )
}
