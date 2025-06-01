// components/EventCard.tsx
// Tarjeta para mostrar información resumida de un evento

import { useCategories } from '@/hooks/useCategories'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Función para obtener color según categoría
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    musica: 'bg-pink-100 text-pink-800',
    deportes: 'bg-blue-100 text-blue-800',
    teatro: 'bg-blue-100 text-blue-800',
    conferencias: 'bg-amber-100 text-amber-800',
    festivales: 'bg-green-100 text-green-800',
    talleres: 'bg-zinc-100 text-zinc-800',
    otros: 'bg-gray-100 text-gray-800'
  }

  return colors[category] || colors.otros
}

interface EventCardProps {
  event: Event
  featured?: boolean
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  const { categories } = useCategories()
  const category = categories.find((cat) => cat.slug === event.category)
  const router = useRouter()

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault()

    const url = `/evento/${event.slug}`

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(url)
      })
    } else {
      router.push(url)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full
      ${featured ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
    >
      {/* Imagen */}
      <div className='relative h-48 overflow-hidden'>
        <img
          src={event.image}
          alt={event.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
          style={{ viewTransitionName: `event-image-${event.slug}` }}
        />
        {featured && <div className='absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold'>Destacado</div>}
        <div className={`absolute top-0 right-0 ${getCategoryColor(event.category)} m-2 px-2 py-1 rounded-full text-xs font-medium`}>
          {category?.name}
        </div>
      </div>

      {/* Contenido */}
      <div className='p-5 flex-grow flex flex-col'>
        <h3 className='text-xl font-bold mb-2 text-gray-800 line-clamp-2' style={{ viewTransitionName: `${event.title}` }}>
          {event.title}
        </h3>

        <div className='space-y-2 mb-4 flex-grow'>
          <div className='flex items-center text-gray-600'>
            <CalendarDays className='h-4 w-4 mr-2 text-blue-600' />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className='flex items-center text-gray-600'>
            <Clock className='h-4 w-4 mr-2 text-blue-600' />
            <span>{formatTime(event.time)} </span>
          </div>

          <div className='flex items-center text-gray-600'>
            <MapPin className='h-4 w-4 mr-2 text-blue-600' />
            <span className='truncate'>{event.location}</span>
          </div>
        </div>

        {/* Precio y botón */}
        <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100'>
          <div className='text-blue-700 font-bold'>{event.price === 0 ? 'Gratuito' : `$${event.price.toFixed(2)} ${event.currency}`}</div>

          <div
            onClick={handleNavigate}
            className='inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors cursor-pointer'
          >
            Ver detalles
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
