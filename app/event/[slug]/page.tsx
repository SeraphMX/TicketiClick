// app/event/[slug]/page.tsx
// Página de detalle de evento

import EventDetailClient from '@/components/EventDetailClient'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/types'

// Generar parámetros estáticos para pre-renderizado
export const generateStaticParams = async () => {
  const { data: events = [] } = await supabase.from('event_details_view').select('slug')
  return (events ?? []).map((event) => ({
    slug: event.slug.toString()
  }))
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const slug = String(params.slug)
  const { data: event } = await supabase.from('event_details_view').select('*').eq('slug', slug).single()

  if (!event) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-red-600 mb-4'>Evento no encontrado</h1>
            <p className='text-gray-600 mb-6'>
              No pudimos encontrar el evento que buscas. Por favor, intenta nuevamente más tarde o explora otros eventos disponibles.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <EventDetailClient event={event as Event} />
}
