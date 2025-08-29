import { supabase } from '@/lib/supabase'
import { generateOrderToken } from '@/lib/tokens'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { buyer_email, buyer_phone, event_id, ticket_type = 'Gratuito', quantity = 1, holder_names } = await request.json()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        email: buyer_email,
        phone: buyer_phone,
        event_id,
        total_amount: 0,
        payment_status: 'free',
        stripe_payment_intent_id: nanoid()
      }
    ])
    .select()
    .single()

  console.log('order', order)

  if (orderError) {
    console.error('Order creation error:', orderError)
    return NextResponse.json({ error: 'Order DB error' }, { status: 500 })
  }

  const { error: itemError } = await supabase.from('order_items').insert([
    {
      order_id: order.id,
      ticket_type,
      quantity,
      unit_price: 0
    }
  ])

  if (itemError) {
    console.error('Order item error:', itemError)
    return NextResponse.json({ error: 'Order items error' }, { status: 500 })
  }

  // Crear los tickets con los nombres de los titulares si están disponibles
  const tickets = Array.from({ length: quantity }).map((_, index) => ({
    order_id: order.id,
    event_id,
    status: 'valid',
    ticket_type,
    code: nanoid(),
    issued_at: new Date().toISOString(),
    ticket_holder: holder_names[index] || null // Asigna el nombre si existe, sino null
  }))
  const { error: ticketError } = await supabase.from('tickets').insert(tickets)

  if (ticketError) {
    console.error('Ticket insert error:', ticketError)
    return NextResponse.json({ error: 'Ticket insert error' }, { status: 500 })
  }

  const { data: eventData, error: eventError } = await supabase
    .from('event_details_view')
    .select('date, slug') // Obtén la fecha y el slug
    .eq('id', event_id)
    .single()

  if (eventError || !eventData) {
    console.error('Error fetching event date:', eventError)
    return NextResponse.json({ error: 'Failed to fetch event info' }, { status: 500 })
  }

  const token = generateOrderToken(order.id, new Date(eventData.date))
  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventData.slug}/tickets/${token}`

  //Si el modo de desarrollo esta acivado no enviar correo
  if (process.env.NEXT_PUBLIC_DEVMODE === 'true') {
    console.log('Modo desarrollo: Omitiendo envío de correo')

    console.log('Token generado:', token)

    return NextResponse.json({ paymentIntentId: order.stripe_payment_intent_id })
  }

  //Llamar internamente al endpoint de correo
  const mailResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail/send`, // Usa la URL absoluta
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: buyer_email,
        subject: 'Confirmación de compra en Ticketi',
        template: 'purchaseConfirmation',
        templateProps: {
          downloadLink: downloadUrl
        }
      })
    }
  )

  if (!mailResponse.ok) {
    const mailResponseText = await mailResponse.text()
    console.error('Error al enviar correo. Response text:', mailResponseText)
  }

  return NextResponse.json({
    paymentIntentId: order.stripe_payment_intent_id
  })
}
