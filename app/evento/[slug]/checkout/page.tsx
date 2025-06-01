// app/event/[slug]/checkout/page.tsx
// Página de checkout (Server Component)

import CheckoutClient from '@/components/checkout/CheckoutClient'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/types'

type Props = Promise<{ slug: string }>

export default async function CheckoutPage(props: { params: Props }) {
  const { slug } = await props.params
  const { data: event } = await supabase.from('event_details_view').select('*').eq('slug', slug).single()

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

  return <CheckoutClient event={event as Event} />
}
