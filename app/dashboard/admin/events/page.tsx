'use client'
// app/dashboard/admin/events/page.tsx
// Página de administración de eventos

import { useEvents } from '@/hooks/useEvents'
import { RootState } from '@/store/store'
import { CalendarDays, Edit, Filter, PlusCircle, Search, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function AdminEventsPage() {
  const { isLoading, user } = useSelector((state: RootState) => state.auth)
  const { events, loading } = useEvents()
  const [searchTerm, setSearchTerm] = useState('')

  // Verificar que sea un admin
  if (user?.role !== 'admin') {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='text-center py-8'>
          <p className='text-red-600 font-medium'>Acceso denegado. Solo administradores pueden ver esta página.</p>
        </div>
      </div>
    )
  }

  // Filtrar eventos por término de búsqueda
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='border-b border-gray-200 pb-5 mb-6'>
          <div className='flex items-center'>
            <CalendarDays className='h-6 w-6 text-blue-600 mr-2' />
            <h2 className='text-xl font-bold text-gray-800'>Gestión de Eventos</h2>
          </div>
        </div>

        <div className='animate-pulse space-y-6'>
          <div className='h-12 bg-gray-200 rounded w-full'></div>
          <div className='grid grid-cols-1 gap-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='h-20 bg-gray-200 rounded-lg'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <CalendarDays className='h-6 w-6 text-blue-600 mr-2' />
            <h2 className='text-xl font-bold text-gray-800'>Gestión de Eventos</h2>
          </div>

          <Link
            href='/dashboard/organizer?action=new'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
          >
            <PlusCircle className='h-5 w-5 mr-2' />
            Crear evento
          </Link>
        </div>
        <p className='text-gray-600 mt-1'>Administra todos los eventos de la plataforma</p>
      </div>

      {/* Búsqueda y filtros */}
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div className='relative flex-grow'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              placeholder='Buscar eventos...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
            <Filter className='h-5 w-5 mr-2 text-gray-500' />
            Filtros
          </button>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Evento
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Organizador
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Fecha
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Estado
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Boletos
              </th>
              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Acciones</span>
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
                      <div className='text-sm text-gray-500'>{event.location}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>Organizador #{event.organizerId}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>{event.date}</div>
                  <div className='text-sm text-gray-500'>{event.time}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>Activo</span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{event.availableTickets} disponibles</td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
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

      {/* Mensaje si no hay eventos */}
      {filteredEvents.length === 0 && (
        <div className='text-center py-8'>
          <CalendarDays className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-medium text-gray-900'>No hay eventos</h3>
          <p className='mt-1 text-sm text-gray-500'>No se encontraron eventos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  )
}
