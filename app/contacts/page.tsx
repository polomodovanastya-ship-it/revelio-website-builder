import type { Metadata } from 'next'
import { PageContainer } from '@/components/page-shell'
import { PageHero } from '@/components/page-hero'
import { ContactCards } from '@/components/contact-cards'
import { Contact } from '@/components/contact'

export const metadata: Metadata = {
  title: 'Контакты',
  description: '+7-993-590-9260, @reveliotech, welcome@revelio.tech',
  alternates: { canonical: '/contacts' },
  openGraph: {
    title: 'Контакты — Ревелио',
    url: '/contacts',
  },
}

export default function ContactsPage() {
  return (
    <PageContainer>
      <PageHero eyebrow="КОНТАКТЫ" title="Контакты" />
      <ContactCards />
      <Contact />
    </PageContainer>
  )
}
