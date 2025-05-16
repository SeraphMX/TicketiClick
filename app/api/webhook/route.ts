import { supabase } from '@/lib/supabase'
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
    const stripeSignature = headers().get('stripe-signature')
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

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ message: 'Received' }, { status: 200 })
}
