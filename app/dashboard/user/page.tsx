'use client'
import OrderCard from '@/components/OrderCard'
import { useTickets } from '@/hooks/useTickets'
import { RootState } from '@/store/store'
import { Order } from '@/types/orders'
import { Ticket as TicketIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function UserDashboardPage() {
  const { error, isLoading, user } = useSelector((state: RootState) => state.auth)
  const { orders, loading } = useTickets(user?.email)

  // No mostrar nada si no hay usuario
  if (!user) return null

  // Mostrar loader solo si está cargando y no hay órdenes previas
  const showLoading = loading && orders.length === 0

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <TicketIcon className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Mis Boletos</h2>
        </div>
      </div>

      {showLoading ? (
        <div className='animate-pulse space-y-6'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='h-48 bg-gray-200 rounded-lg'></div>
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className='space-y-6'>
          {orders.map((order: Order) => (
            <OrderCard key={order.order_id} order={order} />
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
