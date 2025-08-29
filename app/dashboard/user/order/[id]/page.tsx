import DownloadTickets from '@/components/tickets/DownloadTickets'
import { supabase } from '@/lib/supabase'
import { OrderData } from '@/types/orders'
import { formatDate } from '@/utils/date'

type Props = Promise<{ id: string }>
export default async function OrderPage(props: { params: Props }) {
  const { id } = await props.params

  const { data: orderData, error } = await supabase
    .rpc('get_order_by_id', {
      order_id: id
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
    <div className='py-6 flex flex-col  gap-5'>
      <div className=' px-4 sm:px-6 lg:px-8 '>
        <div className='bg-white p-6 rounded-lg'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Los datos de tu orden</h1>
          </div>
          <p>Orden: {id}</p>
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
