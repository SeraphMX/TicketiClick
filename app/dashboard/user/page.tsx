'use client'
// app/dashboard/user/page.tsx
// Página de dashboard para usuarios - Mis boletos

import TicketCard from '@/components/TicketCard'

import { useTickets } from '@/hooks/useTickets'
import { RootState } from '@/store/store'
import { Ticket as TicketIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function UserDashboardPage() {
  const { error, isLoading, user } = useSelector((state: RootState) => state.auth)
  const { tickets, loading } = useTickets(user?.id)

  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='border-b border-gray-200 pb-5 mb-6'>
          <div className='flex items-center'>
            <TicketIcon className='h-6 w-6 text-blue-600 mr-2' />
            <h2 className='text-xl font-bold text-gray-800'>Mis Boletos</h2>
          </div>
        </div>

        <div className='animate-pulse space-y-6'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='h-48 bg-gray-200 rounded-lg'></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <TicketIcon className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Mis Boletos</h2>
        </div>
        <p className='text-gray-600 mt-1'>Gestiona todos tus boletos para próximos eventos</p>
      </div>

      {/* Filtros y organización */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
        <div className='mb-4 sm:mb-0'>
          <select className='w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
            <option value='all'>Todos los boletos</option>
            <option value='active'>Activos</option>
            <option value='used'>Utilizados</option>
            <option value='cancelled'>Cancelados</option>
          </select>
        </div>

        <div className='flex items-center'>
          <span className='text-sm text-gray-600 mr-2'>Ordenar por:</span>
          <select className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
            <option value='date_desc'>Fecha (más reciente)</option>
            <option value='date_asc'>Fecha (más antigua)</option>
            <option value='price_desc'>Precio (mayor)</option>
            <option value='price_asc'>Precio (menor)</option>
          </select>
        </div>
      </div>

      {/* Lista de boletos */}
      {tickets.length > 0 ? (
        <div className='space-y-6'>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className='py-12 px-6 bg-gray-50 rounded-lg text-center'>
          <TicketIcon className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No tienes boletos</h3>
          <p className='text-gray-600 mb-4'>
            Parece que aún no has comprado ningún boleto. Explora los eventos disponibles y empieza a disfrutar.
          </p>
          <a
            href='/eventos'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
          >
            Explorar eventos
          </a>
        </div>
      )}
    </div>
  )
}
