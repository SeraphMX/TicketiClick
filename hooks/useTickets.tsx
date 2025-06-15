'use client'
// hooks/useTickets.tsx
// Hook para gestionar boletos

import { getEventById } from '@/data/events'
import { getTicketsByUserId, mockTickets } from '@/data/tickets'
import { Ticket, TicketPurchaseResponse } from '@/lib/types'
import { useEffect, useState } from 'react'

export const useTickets = (userId?: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar boletos al inicializar
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Simulando retraso de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (userId) {
          setTickets(getTicketsByUserId(userId))
        } else {
          setTickets(mockTickets)
        }
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los boletos')
        setLoading(false)
      }
    }

    fetchTickets()
  }, [userId])

  // Función para comprar boletos (simulada)
  const purchaseTicket = async (eventId: number, userId: string, quantity: number): Promise<TicketPurchaseResponse> => {
    setLoading(true)

    try {
      // Simulando retraso de red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const event = getEventById(eventId)

      if (!event) {
        return {
          success: false,
          message: 'Evento no encontrado',
          error: 'EVENT_NOT_FOUND'
        }
      }

      if (event.availableTickets < quantity) {
        return {
          success: false,
          message: 'No hay suficientes boletos disponibles',
          error: 'INSUFFICIENT_TICKETS'
        }
      }

      // Generar código de boleto único
      const generateTicketCode = () => {
        const prefix = event.title.substring(0, 4).toUpperCase()
        const random = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')
        return `${prefix}-${random}-${new Date().getFullYear()}`
      }

      // Crear nuevo boleto
      const newTicket: Ticket = {
        id: Math.max(...mockTickets.map((t) => t.id)) + 1,
        eventId,
        userId,
        purchaseDate: new Date().toISOString().split('T')[0],
        quantity,
        totalPrice: event.price * quantity,
        currency: event.currency,
        status: 'active',
        code: generateTicketCode()
      }

      // Actualizar estado (en una implementación real esto modificaría la base de datos)
      setTickets((prev) => [...prev, newTicket])
      setLoading(false)

      return {
        success: true,
        message: 'Boleto comprado correctamente',
        ticket: newTicket
      }
    } catch (err) {
      setError('Error al procesar la compra')
      setLoading(false)

      return {
        success: false,
        message: 'Error al procesar la compra',
        error: 'PURCHASE_ERROR'
      }
    }
  }

  return {
    tickets,
    loading,
    error,
    purchaseTicket
  }
}
