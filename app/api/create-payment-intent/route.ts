import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true
      },
      application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
      transfer_data: {
        destination: '{{CONNECTED_ACCOUNT_ID}}' // Replace with the organizer's Stripe account ID
      }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Error creating payment intent:', err)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
