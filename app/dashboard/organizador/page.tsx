'use client'
// app/dashboard/organizer/page.tsx
// Página de dashboard para organizadores - Mis eventos

import EventCard from '@/components/EventCard'
import EventForm from '@/components/organizer/EventForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useEvents } from '@/hooks/useEvents'
import { EventFormData } from '@/lib/types'
import { RootState } from '@/store/store'
import { CalendarDays, Edit, PlusCircle, Trash } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function OrganizerDashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoading, user } = useSelector((state: RootState) => state.auth)
  const { events, loading, createEvent } = useEvents(user?.id)

  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Verificar si hay parámetro de acción en la URL
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'new') {
      setShowForm(true)
    }
  }, [searchParams])

  // Filtrar eventos por término de búsqueda
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Manejar la creación de un nuevo evento
  const handleCreateEvent = async (formData: EventFormData) => {
    if (!user) return

    setFormSubmitting(true)

    try {
      const newEvent = await createEvent(formData, user.id)

      if (newEvent) {
        setFormSuccess(true)
        setTimeout(() => {
          setShowForm(false)
          setFormSuccess(false)
          // Eliminar el parámetro action=new de la URL
          router.push('/dashboard/organizer')
        }, 2000)
      }
    } catch (error) {
      console.error('Error al crear evento', error)
    } finally {
      setFormSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='border-b border-gray-200 pb-5 mb-6'>
          <div className='flex items-center'>
            <CalendarDays className='h-6 w-6 text-blue-600 mr-2' />
            <h2 className='text-xl font-bold text-gray-800'>Mis Eventos</h2>
          </div>
        </div>

        <div className='animate-pulse space-y-6'>
          <div className='h-12 bg-gray-200 rounded w-full'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='h-64 bg-gray-200 rounded-lg'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <CalendarDays className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Mis Eventos</h2>
        </div>
        <p className='text-gray-600 mt-1'>Gestiona tus eventos y crea nuevos</p>
      </div>

      {/* Formulario para crear nuevo evento */}
      {showForm ? (
        <div className='mb-8'>
          {formSuccess ? (
            <div className='bg-green-50 border border-green-200 rounded-md p-4 mb-6'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-green-800'>¡Evento creado con éxito!</p>
                </div>
              </div>
            </div>
          ) : (
            <EventForm onSubmit={handleCreateEvent} isLoading={formSubmitting} />
          )}
        </div>
      ) : (
        <div className='mb-6'>
          <button
            onClick={() => setShowForm(true)}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
          >
            <PlusCircle className='h-5 w-5 mr-2' />
            Crear nuevo evento
          </button>
        </div>
      )}

      {/* Búsqueda y filtros */}
      {!showForm && (
        <div className='mb-6 flex items-center gap-2 '>
          <Input label='Buscar en mis eventos...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size='sm' />
          <Button color='primary'>
            <PlusCircle size={20} />
            Buscar
          </Button>
        </div>
      )}

      {/* Lista de eventos */}
      {!showForm && (
        <>
          {filteredEvents.length > 0 ? (
            <div className='space-y-6'>
              {/* Eventos en forma de tabla */}
              <div className='overflow-x-auto rounded-lg border border-gray-200'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Evento
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Fecha
                      </th>

                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Precio
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Ventas
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 h-10 w-10'>
                              <img className='h-10 w-10 rounded-full object-cover' src={event.image} alt={event.title} />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>{event.title}</div>
                              <div className='text-sm text-gray-500'>{event.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>{event.date}</div>
                          <div className='text-sm text-gray-500'>{event.time}</div>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {event.price.toFixed(2)} {event.currency}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            1 /
                          </span>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {event.availableTickets}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                          <button className='text-zinc-600 hover:text-zinc-900 mr-3'>
                            <Edit className='h-5 w-5' />
                          </button>
                          <button className='text-red-600 hover:text-red-900'>
                            <Trash className='h-5 w-5' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista alternativa en tarjetas para móviles */}
              <div className='md:hidden grid grid-cols-1 gap-6 mt-6'>
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ) : (
            <div className='py-12 px-6 bg-gray-50 rounded-lg text-center'>
              <CalendarDays className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No tienes eventos creados</h3>
              <p className='text-gray-600 mb-4'>Comienza a crear tu primer evento para vender boletos en la plataforma.</p>
              <button
                onClick={() => setShowForm(true)}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
              >
                <PlusCircle className='h-5 w-5 mr-2' />
                Crear primer evento
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
