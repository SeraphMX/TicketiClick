// app/page.tsx
// Página principal

import EventList from '@/components/EventList'
import HeroSectionClient from '@/components/HeroSectionClient'
import { supabase } from '@/lib/supabase'
import { ArrowRight, CalendarDays, MapPin, Search } from 'lucide-react'
import Link from 'next/link'

// Función para obtener eventos destacados
const getFeaturedEvents = async () => {
  const { data } = await supabase.from('event_details_view').select('*').eq('featured', true)
  return data || []
}

export default async function Home() {
  // Obtener eventos destacados
  const featuredEvents = await getFeaturedEvents()

  // Obtener categorías únicas
  const { data: events = [] } = await supabase.from('event_details_view').select('*')
  const categories = Array.from(new Set((events || []).map((event) => event.category)))

  return (
    <div>
      {/* Hero Section */}
      <HeroSectionClient />

      {/* Eventos Destacados */}
      <section className='py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>Eventos Destacados</h2>
          <Link href='/events' className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors'>
            Ver todos
            <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>

        <EventList events={featuredEvents} showFilters={false} />
      </section>

      {/* Categorías */}
      {/* <section className='py-12 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center'>Explora por Categoría</h2>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {categories.map((category) => (
              <Link key={category} href={`/events?category=${category}`} className='block group'>
                <div className='relative h-48 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow'>
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60'></div>
                  <img
                    src={categoryImages[category] || categoryImages.other}
                    alt={translateCategory(category)}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <h3 className='text-lg font-semibold text-white'>{translateCategory(category)}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Próximos eventos */}
      {/* <section className='py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8'>Próximos Eventos</h2>

        
        <EventList events={(events || []).slice(0, 4)} showFilters={false} />

        <div className='mt-8 text-center'>
          <Link
            href='/events'
            className='inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
          >
            <Calendar className='h-5 w-5 mr-2' />
            Ver todos los eventos
          </Link>
        </div>
      </section> */}

      {/* Información adicional */}
      <section className='py-12 bg-blue-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-black mb-8 text-center'>¿Por qué elegir Ticketi?</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Tarjeta 1 */}
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <Search className='h-12 w-12 mb-4 text-blue-600' />
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>Encuentra fácilmente</h3>
              <p className='text-gray-600'>Busca eventos por categoría, ubicación o fecha y encuentra exactamente lo que estás buscando.</p>
            </div>

            {/* Tarjeta 2 */}
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <CalendarDays className='h-12 w-12 mb-4 text-blue-600' />
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>Eventos para todos</h3>
              <p className='text-gray-600'>
                Desde conciertos y eventos deportivos hasta conferencias y talleres, tenemos eventos para todos los gustos.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
              <MapPin className='h-12 w-12 mb-4 text-blue-600' />
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>Cerca de ti</h3>
              <p className='text-gray-600'>
                Descubre eventos en tu ciudad o planifica tu próximo viaje con eventos en diferentes ubicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
