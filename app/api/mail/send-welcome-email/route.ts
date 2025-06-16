import { generateEmailVerifyToken } from '@/lib/tokens'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    if (!email) {
      return NextResponse.json({ error: 'El email es requerido' }, { status: 400 })
    }

    const token = generateEmailVerifyToken(email)
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/cuenta/verificar-email/${token}`

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, template: 'welcome', templateProps: { link } })
    })

    return NextResponse.json({ success: true, message: 'Email de bienvenida enviado' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
