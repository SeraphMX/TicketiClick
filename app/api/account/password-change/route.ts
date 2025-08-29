import { userService } from '@/services/server/userService'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    if (!email || !password) {
      return NextResponse.json({ error: 'El email y la contraseña son requeridos' }, { status: 400 })
    }

    const response = await userService.passwordChange(email, password)

    return NextResponse.json({ status: 'success', message: 'Contraseña cambiada correctamente', email: response }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
