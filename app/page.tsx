// app/page.tsx
// Página principal

import EventList from '@/components/EventList'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Calendar, CalendarDays, MapPin, Search } from 'lucide-react'
import Link from 'next/link'

// Función para obtener eventos destacados
const getFeaturedEvents = async () => {
  const { data } = await supabase
    .from('event_details_view')
    .select('*')
    .eq('featured', true)
  return data || []
}

export default async function Home() {
  // Obtener eventos destacados
  const featuredEvents = await getFeaturedEvents()

  // Obtener categorías únicas
  const { data: events = [] } = await supabase.from('event_details_view').select('*')
  const categories = Array.from(new Set(events.map((event) => event.category)))

  // Traductor de categorías
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      music: 'Música',
      sports: 'Deportes',
      theater: 'Teatro',
      conference: 'Conferencia',
      festival: 'Festival',
      workshop: 'Taller',
      other: 'Otros'
    }

    return translations[category] || 'Otro'
  }

  // Imágenes para las categorías
  const categoryImages: Record<string, string> = {
    music: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    sports: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    theater: 'https://images.pexels.com/photos/11523493/pexels-photo-11523493.jpeg',
    conference: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    festival: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    workshop: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
    other: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
  }

  return (
    <div>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-700 to-zinc-900 text-white py-20'>
        <div
          className='absolute inset-0 bg-black opacity-20'
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        ></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl sm:text-5xl font-extrabold mb-6 animate-fade-in'>Descubre eventos increíbles cerca de ti</h1>
            <p className='text-lg sm:text-xl mb-8 text-blue-100'>
              Encuentra y compra boletos para conciertos, eventos deportivos, teatro y mucho más.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/events'
                className='inline-flex items-center justify-center px-5 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors'
              >
                <Search className='h-5 w-5 mr-2' />
                Explorar eventos
              </Link>
              <Link
                href='/login'
                className='inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg border border-blue-500 hover:bg-blue-700 transition-colors'
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Destacados */}
      <section className='py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>Eventos Destacados</h2>
          <Link href='/events' className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors'>
            Ver todos
            <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>

        <EventList events={featuredEvents} showFilters={false} title='' />
      </section>

      {/* Categorías */}
      <section className='py-12 bg-gray-100'>
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
      </section>

      {/* Próximos eventos */}
      <section className='py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8'>Próximos Eventos</h2>

        {/* Mostrar primeros 4 eventos */}
        <EventList events={events.slice(0, 4)} showFilters={false} title='' />

        <div className='mt-8 text-center'>
          <Link
            href='/events'
            className='inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
          >
            <Calendar className='h-5 w-5 mr-2' />
            Ver todos los eventos
          </Link>
        </div>
      </section>

      {/* Información adicional */}
      <section className='py-12 bg-gradient-to-r from-blue-50 to-zinc-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center'>¿Por qué elegir Ticketi?</h2>

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