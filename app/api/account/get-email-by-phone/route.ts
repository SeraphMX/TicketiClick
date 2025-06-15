import { userService } from '@/services/server/userService'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { phone } = await request.json()

  try {
    if (!phone) {
      return NextResponse.json({ error: 'El teléfono es requerido' }, { status: 400 })
    }
    const email = await userService.getEmailByPhone(phone)

    return NextResponse.json({ email })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
