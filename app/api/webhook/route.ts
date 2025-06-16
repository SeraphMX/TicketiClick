import { supabase } from '@/lib/supabase'
import { generateOrderToken } from '@/lib/tokens'
import { nanoid } from 'nanoid'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Request) {
  let event: Stripe.Event

  try {
    const stripeSignature = (await headers()).get('stripe-signature')
    const rawBody = await req.text()

    if (!stripeSignature) {
      throw new Error('Missing Stripe signature header.')
    }

    event = stripe.webhooks.constructEvent(rawBody, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ Webhook Error:', message)
    return NextResponse.json({ message: `Webhook Error: ${message}` }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const metadata = paymentIntent.metadata

    const event_id = metadata.event_id
    const quantity = parseInt(metadata.quantity || '1', 10)
    const holder_names = metadata.holder_names ? JSON.parse(metadata.holder_names) : []
    const ticket_type = metadata.ticket_type || 'general'
    const buyer_email = metadata.buyer_email
    const buyer_phone = metadata.buyer_phone
    const unit_price = Number(paymentIntent.amount) / quantity / 100
    const subtotal = unit_price * quantity
    const total_amount = paymentIntent.amount / 100

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          email: buyer_email,
          phone: buyer_phone,
          event_id,
          total_amount,
          payment_status: 'paid',
          stripe_payment_intent_id: paymentIntent.id
        }
      ])
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Order DB error' }, { status: 500 })
    }

    const { error: itemError } = await supabase.from('order_items').insert([
      {
        order_id: order.id,
        ticket_type,
        quantity,
        unit_price
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

      return NextResponse.json({ ok: true })
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
  }

  return NextResponse.json({ ok: true })
}
