import { generateOrderToken } from '@/lib/tokens'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, orderId, quantity, event } = await request.json()

  try {
    if (!email) {
      return NextResponse.json({ error: 'El email es requerido' }, { status: 400 })
    }

    const token = generateOrderToken(orderId, new Date(event.date))
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/evento/${event.slug}/tickets/${token}`

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mail/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, template: 'purchaseConfirmation', templateProps: { downloadLink, event, quantity } })
    })

    return NextResponse.json({ success: true, message: 'Email de confirmación de compra enviado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
