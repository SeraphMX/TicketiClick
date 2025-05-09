// components/EventCard.tsx
// Tarjeta para mostrar información resumida de un evento

import { Event } from '@/lib/types'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

// Función para formatear fechas a formato español
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

// Función para obtener color según categoría
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    music: 'bg-pink-100 text-pink-800',
    sports: 'bg-blue-100 text-blue-800',
    theater: 'bg-blue-100 text-blue-800',
    conference: 'bg-amber-100 text-amber-800',
    festival: 'bg-green-100 text-green-800',
    workshop: 'bg-zinc-100 text-zinc-800',
    other: 'bg-gray-100 text-gray-800'
  }

  return colors[category] || colors.other
}

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

interface EventCardProps {
  event: Event
  featured?: boolean
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full
      ${featured ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
    >
      {/* Imagen */}
      <div className='relative h-48 overflow-hidden'>
        <img src={event.image} alt={event.title} className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' />
        {featured && <div className='absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold'>Destacado</div>}
        <div className={`absolute top-0 right-0 ${getCategoryColor(event.category)} m-2 px-2 py-1 rounded-full text-xs font-medium`}>
          {translateCategory(event.category)}
        </div>
      </div>

      {/* Contenido */}
      <div className='p-5 flex-grow flex flex-col'>
        <h3 className='text-xl font-bold mb-2 text-gray-800 line-clamp-2'>{event.title}</h3>

        <div className='space-y-2 mb-4 flex-grow'>
          <div className='flex items-center text-gray-600'>
            <CalendarDays className='h-4 w-4 mr-2 text-blue-600' />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className='flex items-center text-gray-600'>
            <Clock className='h-4 w-4 mr-2 text-blue-600' />
            <span>{event.time} hrs</span>
          </div>

          <div className='flex items-center text-gray-600'>
            <MapPin className='h-4 w-4 mr-2 text-blue-600' />
            <span className='truncate'>{event.location}</span>
          </div>
        </div>

        {/* Precio y botón */}
        <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100'>
          <div className='text-blue-700 font-bold'>
            {event.price.toFixed(2)} {event.currency}
          </div>

          <Link
            href={`/event/${event.slug}`}
            className='inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors'
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
