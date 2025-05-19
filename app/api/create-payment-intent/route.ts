import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  try {
    const { buyer_email, buyer_phone, event_id, amount, currency, stripe_id, quantity = 1, holder_names, discount } = await request.json()

    console.log({ buyer_email, buyer_phone, event_id, amount, currency, stripe_id, quantity, holder_names, discount })

    // Comisiones por boleto
    const desiredFixedFee = 1000 * quantity // $10 MXN  por boleto
    const desiredPlatformPercent = 0.1 // 10% de comisión para la plataforma
    const estimatedStripePercent = 0.05 // estimación de Stripe (5%)

    const baseAmount = (amount - discount) * 100 // Monto base (sin comisiones ni descuentos) en centavos

    // Comisión total (10% + $10 por boleto + 5% de Stripe)
    const platformFee = Math.round(baseAmount * desiredPlatformPercent) + desiredFixedFee + Math.round(baseAmount * estimatedStripePercent)
    const finalAmount = baseAmount + platformFee // Total que paga el cliente (ya incluye todo)

    console.log({ desiredFixedFee, amount, platformFee, finalAmount })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount, // Total que paga el cliente
      currency,
      automatic_payment_methods: {
        enabled: true
      },
      application_fee_amount: platformFee, // Tu comisión
      transfer_data: {
        destination: stripe_id // El resto va a la cuenta conectada
      },
      metadata: {
        quantity, // Guardamos la cantidad de boletos para referencia
        holder_names: JSON.stringify(holder_names), // Guardamos los nombres de los titulares de los boletos
        event_id,
        buyer_email,
        buyer_phone
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (err) {
    console.error('Error creating payment intent:', err)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
