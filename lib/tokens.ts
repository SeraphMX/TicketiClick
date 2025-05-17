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
