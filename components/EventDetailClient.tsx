'use client'

import { useDispatch } from '@/hooks/useReduxHooks'
import { Event } from '@/lib/types'
import { setSelectedEvent } from '@/store/slices/eventsSlice'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronUp, Clock, Info, MapPin, Tag, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EventWithQuantity extends Event {
  quantity: number
}

// Función para formatear fechas a formato español
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
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

export default function EventDetailClient({ event }: { event: Event }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [showFeeDetails, setShowFeeDetails] = useState(false)

  // Calcular costos
  const subtotal = event.price * quantity
  const serviceFee = subtotal * 0.1 // 10% cargo por servicio
  const paymentFee = subtotal * 0.05 // 5% comisión bancaria
  const ticketFee = 10 * quantity // $10 por boleto
  const total = subtotal + serviceFee + paymentFee + ticketFee
  dispatch(setSelectedEvent({ ...event, quantity } as EventWithQuantity))

  // Función para ir al checkout
  const handlePurchase = () => {
    dispatch(setSelectedEvent({ ...event, quantity } as EventWithQuantity))
    router.push(`/event/${event.slug}/checkout`)
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Botón para volver */}
      <div className='mb-6'>
        <Link href='/events' className='inline-flex items-center text-blue-600 hover:text-blue-800'>
          <ChevronLeft className='h-5 w-5 mr-1' />
          Volver a eventos
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {/* Imagen principal */}
        <div className='relative h-80 md:h-96'>
          <img src={event.image} alt={event.title} className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black opacity-60'></div>
          <div className='absolute bottom-0 left-0 p-6 text-white'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>{event.title}</h1>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='inline-flex items-center bg-blue-600 px-2.5 py-0.5 rounded-full text-sm font-medium'>
                {translateCategory(event.category)}
              </span>
              <span className='inline-flex items-center'>
                <CalendarDays className='h-4 w-4 mr-1' />
                {formatDate(event.date)}
              </span>
              <span className='inline-flex items-center'>
                <Clock className='h-4 w-4 mr-1' />
                {event.time}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
          {/* Información del evento */}
          <div className='md:col-span-2 space-y-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Acerca del evento</h2>
              <div className='text-gray-600 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>

            <div className='border-t border-gray-200 pt-6'>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>Detalles</h2>
              <div className='space-y-3'>
                <div className='flex items-start'>
                  <CalendarDays className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Fecha</p>
                    <p className='text-gray-600'>{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Clock className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Hora</p>
                    <p className='text-gray-600'>{event.time}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <MapPin className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Ubicación</p>
                    <p className='text-gray-600'>{event.location}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Tag className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Categoría</p>
                    <p className='text-gray-600'>{translateCategory(event.category)}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Users className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Boletos disponibles</p>
                    <p className='text-gray-600'>{event.availableTickets}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comprar boletos */}
          <div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Comprar boletos</h2>

            <div className='mb-6'>
              <p className='text-lg font-bold text-blue-700 mb-1'>
                {event.price.toFixed(2)} {event.currency}
              </p>
              <p className='text-sm text-gray-500'>por boleto</p>
            </div>

            <div className='mb-6'>
              <label htmlFor='quantity' className='block text-sm font-medium text-gray-700 mb-1'>
                Cantidad de boletos
              </label>
              <select
                id='quantity'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-6 space-y-3'>
              <p className='text-gray-600 flex justify-between'>
                <span>Subtotal:</span>
                <span>
                  {subtotal.toFixed(2)} {event.currency}
                </span>
              </p>

              <div className='border-t border-gray-200 pt-3'>
                <div className='flex justify-between items-center mb-2'>
                  <button
                    onClick={() => setShowFeeDetails(!showFeeDetails)}
                    className='text-sm text-gray-600 hover:text-gray-800 flex items-center'
                  >
                    <span className='flex items-center'>
                      Cargos y comisiones
                      <Info className='h-4 w-4 ml-1 text-gray-400' />
                    </span>
                    {showFeeDetails ? <ChevronUp className='h-4 w-4 ml-1' /> : <ChevronDown className='h-4 w-4 ml-1' />}
                  </button>
                  <span className='text-gray-600'>
                    {(serviceFee + paymentFee + ticketFee).toFixed(2)} {event.currency}
                  </span>
                </div>

                {showFeeDetails && (
                  <div className='bg-gray-100 p-3 rounded-md space-y-2 text-sm'>
                    <p className='flex justify-between text-gray-600'>
                      <span>Cargo por servicio (10%):</span>
                      <span>
                        {serviceFee.toFixed(2)} {event.currency}
                      </span>
                    </p>
                    <p className='flex justify-between text-gray-600'>
                      <span>Comisión bancaria (5%):</span>
                      <span>
                        {paymentFee.toFixed(2)} {event.currency}
                      </span>
                    </p>
                    <p className='flex justify-between text-gray-600'>
                      <span>Emisión de boleto:</span>
                      <span>
                        {ticketFee.toFixed(2)} {event.currency}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className='border-t border-gray-200 pt-3'>
                <p className='text-lg font-bold flex justify-between'>
                  <span>Total:</span>
                  <span>
                    {total.toFixed(2)} {event.currency}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={event.availableTickets < quantity}
              className={`
                w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${event.availableTickets < quantity ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {event.availableTickets < quantity ? 'No hay suficientes boletos' : 'Comprar boletos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
