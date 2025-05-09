// app/event/[id]/checkout/page.tsx
// Página de checkout (Server Component)

import CheckoutClient from '@/components/checkout/CheckoutClient'
import { getEventBySlug, mockEvents } from '@/data/events'

// Generar parámetros estáticos para pre-renderizado
export function generateStaticParams() {
  return mockEvents.map((event) => ({
    slug: event.slug.toString()
  }))
}

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const eventSlug = String(params.slug)
  const event = getEventBySlug(eventSlug)

  if (!event) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <p className='text-center text-gray-600'>Evento no encontrado</p>
          </div>
        </div>
      </div>
    )
  }

  return <CheckoutClient event={event} />
}
