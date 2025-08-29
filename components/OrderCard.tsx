// components/TicketCard.tsx
// Componente para mostrar un boleto comprado

import { formatDate } from '@/lib/utils'
import { Order } from '@/types/orders'
import { formatCurrency } from '@/utils/currency'

import { Calendar, QrCode, Ticket as TicketIcon } from 'lucide-react'
import Link from 'next/link'

interface OrderCardProps {
  order: Order
}

// Función para determinar el color según el estado del boleto
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    used: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    expired: 'bg-amber-100 text-amber-800'
  }

  return colors[status] || colors.active
}

// Traductor para estados de boletos
const translateStatus = (status: string) => {
  const translations: Record<string, string> = {
    active: 'Activo',
    used: 'Utilizado',
    cancelled: 'Cancelado',
    expired: 'Expirado'
  }

  return translations[status] || 'Desconocido'
}

const OrderCard = ({ order }: OrderCardProps) => {
  // Obtener la información del evento asociado al boleto
  //const event = getEventById(order.eventId)

  // if (!event) {
  //   return <div className='p-4 bg-red-100 rounded-lg'>Evento no encontrado</div>
  // }

  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
      <div className='border-b border-dashed border-gray-300 relative'>
        {/* Cabecera del boleto */}
        <div className='p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold text-lg'>{order.event_title}</h3>
              <p className='text-blue-100 text-sm'>{formatDate(order.event_date)}</p>
            </div>
            <div>
              <Link href={`user/order/${order.order_id}`}>Detalles de la orden </Link>
            </div>
          </div>
        </div>

        {/* Detalles del boleto */}
        <div className='p-4'>
          <div className='flex flex-col space-y-3'>
            <div className='flex items-center text-gray-700'>
              <Calendar className='h-4 w-4 mr-2 text-blue-600' />
              <span>Tipo: {order.ticket_type}</span>
            </div>

            <div className='flex items-center text-gray-700'>
              <TicketIcon className='h-4 w-4 mr-2 text-blue-600' />
              <span>
                Cantidad: {order.quantity} {order.quantity === 1 ? 'boleto' : 'boletos'}
              </span>
            </div>

            <div className='flex items-center text-gray-700'>
              <Calendar className='h-4 w-4 mr-2 text-blue-600' />
              <span>Fecha de compra: {formatDate(order.order_created_at)}</span>
            </div>
          </div>
        </div>

        {/* Círculos decorativos para el efecto de boleto recortable */}
        <div className='absolute -left-3 top-1/2 h-6 w-6 rounded-full bg-gray-100 border border-gray-200'></div>
        <div className='absolute -right-3 top-1/2 h-6 w-6 rounded-full bg-gray-100 border border-gray-200'></div>
      </div>

      {/* Código y precio */}
      <div className='p-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <QrCode className='h-5 w-5 mr-2 text-blue-600' />
          <span className='font-mono text-sm'>{order.order_id}</span>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-500'>Total pagado:</p>
          <p className='font-bold text-blue-700'>
            {formatCurrency(order.total_amount)} {order.event_currency}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
