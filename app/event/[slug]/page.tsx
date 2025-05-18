// app/event/[slug]/page.tsx

import EventDetailClient from '@/components/EventDetailClient'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/types'
import { convertHtmlToText } from '@/lib/utils'

export const dynamic = 'force-dynamic'

type Props = Promise<{ slug: string }>

// Metadata dinámica para SEO
export async function generateMetadata(props: { params: Props }) {
  const { slug } = await props.params

  const { data: event } = await supabase.from('event_details_view').select('title, description, image').eq('slug', slug).single()

  if (!event) {
    return {
      title: 'Evento no encontrado',
      description: 'No pudimos encontrar información sobre este evento.'
    }
  }

  const plainDescription = event.description ? convertHtmlToText(event.description) : ''

  console.log(plainDescription)

  console.log(event)

  return {
    title: event.title,
    description: plainDescription,
    openGraph: {
      title: event.title,
      description: plainDescription,
      images: event.image ? [{ url: `${process.env.NEXT_PUBLIC_BASE_URL}${event.image}`, width: 1200, height: 630 }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: plainDescription,
      images: `${process.env.NEXT_PUBLIC_BASE_URL}${event.image}` ? [event.image] : undefined
    }
  }
}

export default async function EventDetailPage(props: { params: Props }) {
  const { slug } = await props.params
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
