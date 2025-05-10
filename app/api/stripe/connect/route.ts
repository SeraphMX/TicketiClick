import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Create a Connect account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'MX',
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      }
    })

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/organizer/stripe/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/organizer/stripe/return`,
      type: 'account_onboarding'
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (err) {
    console.error('Error creating Stripe Connect account:', err)
    return NextResponse.json({ error: 'Error creating Stripe Connect account' }, { status: 500 })
  }
}
