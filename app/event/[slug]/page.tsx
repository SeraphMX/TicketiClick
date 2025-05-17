// app/event/[slug]/page.tsx

import EventDetailClient from '@/components/EventDetailClient'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/types'

export const dynamic = 'force-dynamic'

// Metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const { data: event } = await supabase.from('event_details_view').select('title, description, image').eq('slug', slug).single()

  if (!event) {
    return {
      title: 'Evento no encontrado',
      description: 'No pudimos encontrar información sobre este evento.'
    }
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [{ url: event.image, width: 1200, height: 630 }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: event.image ? [event.image] : undefined
    }
  }
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
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
