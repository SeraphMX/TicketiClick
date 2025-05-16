import { Metadata } from 'next'
import ConfirmationClient from '@/components/confirmation/ConfirmationClient'
import { mockEvents } from '@/data/events'

export const metadata: Metadata = {
  title: 'Confirmación de Compra',
  description: 'Confirmación de compra de boletos para el evento'
}

export default function ConfirmationPage() {
  return <ConfirmationClient />
}

export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    slug: event.slug,
  }))
}