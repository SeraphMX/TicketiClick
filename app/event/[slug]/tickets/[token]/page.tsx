// app/event/[slug]/tickets/[token]/page.tsx
import DownloadTickets from '@/components/tickets/DownloadTickets'
import { supabase } from '@/lib/supabase'
import { verifyOrderToken } from '@/lib/tokens'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Props = Promise<{ slug: string; token: string }>

interface OrderData {
  id: string
  user_id: string
  email: string
  phone: string
  event_id: string
  discount_code_id: string
  total_amount: number
  currency: string
  payment_status: string
  payment_method: string
  stripe_payment_intent_id: string
  created_at: string
}

interface TicketData {
  id: string
  eventImage: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  ticketHolder?: string
  ticketType: string
  qrCode: string
}

export default async function TicketPage(props: { params: Props }) {
  const { token, slug } = await props.params

  let orderId: string

  // Verifica el token JWT
  try {
    const payload = verifyOrderToken(token)
    orderId = payload.orderId
  } catch (err) {
    console.error('Token inválido o expirado', err)
    return notFound()
  }

  const { data: orderData, error } = await supabase
    .rpc('get_order_by_id', {
      order_id: orderId
    })
    .single()

  if (error || !orderData) {
    console.error('Error al obtener la orden:', error)
    //router.push('/events')
    return
  }

  const order_data = orderData as OrderData

  console.log(order_data.stripe_payment_intent_id)

  console.log(order_data)

  return (
    <div className='bg-gray-50 py-6'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white p-6 rounded-lg'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Los datos de tu orden</h1>
          </div>
          <p>Orden: {orderId}</p>
          <p>Fecha: {formatDate(order_data.created_at)}</p>
          <p>Email: {order_data.email}</p>
          <p>Teléfono: {order_data.phone}</p>
          {order_data.payment_status !== 'free' && <p>Metódo de pago: Tarjeta </p>}
        </div>
      </div>
      <DownloadTickets paymentIntentId={order_data.stripe_payment_intent_id} />
    </div>
  )
}
