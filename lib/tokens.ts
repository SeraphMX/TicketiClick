// lib/tokens.ts
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export function generateOrderToken(orderId: string, eventDate: Date) {
  const expiresAt = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000) // +1 día
  const expiresInSeconds = Math.floor((expiresAt.getTime() - Date.now()) / 1000)

  return jwt.sign({ orderId }, SECRET, { expiresIn: expiresInSeconds })
}

export function verifyOrderToken(token: string): { orderId: string } {
  return jwt.verify(token, SECRET) as { orderId: string }
}

export function generateAccountToken(email: string, phone: string) {
  return jwt.sign({ email, phone }, SECRET, { expiresIn: '24h' })
}

export function verifyAccountToken(token: string): { email: string; phone: string } {
  try {
    return jwt.verify(token, SECRET) as { email: string; phone: string }
  } catch (err) {
    console.error('Error al verificar el token:', err)
    return { email: '', phone: '' } // Retorna campos vacíos si el token es inválido
  }
}
