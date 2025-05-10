'use client'
// hooks/useEvents.tsx
// Hook para gestionar eventos

import { getEventById, getEventsByOrganizerId, mockEvents } from '@/data/events'
import { Event, EventFormData } from '@/lib/types'
import { useEffect, useState } from 'react'

// Hook para obtener y manipular eventos
export const useEvents = (organizerId?: number) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar eventos al inicializar
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulando retraso de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Si hay un organizerId, filtramos por ese organizador
        if (organizerId) {
          setEvents(getEventsByOrganizerId(organizerId))
        } else {
          setEvents(mockEvents)
        }
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los eventos')
        setLoading(false)
      }
    }

    fetchEvents()
  }, [organizerId])

  // Función para obtener un evento por ID
  const getEvent = async (id: number): Promise<Event | undefined> => {
    setLoading(true)
    try {
      // Simulando retraso de red
      await new Promise((resolve) => setTimeout(resolve, 300))

      const event = getEventById(id)
      setLoading(false)
      return event
    } catch (err) {
      setError('Error al obtener el evento')
      setLoading(false)
      return undefined
    }
  }

  // Función para crear un nuevo evento (simulada)
  const createEvent = async (eventData: EventFormData, organizerId: number): Promise<Event | null> => {
    setLoading(true)
    try {
      // Simulando retraso de red
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Crear nuevo evento con ID único
      const newEvent: Event = {
        id: Math.max(...mockEvents.map((e) => e.id)) + 1,
        ...eventData,
        organizerId,
        currency: 'EUR',
        featured: eventData.featured || false,
        image: eventData.image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
        slug: eventData.title.toLowerCase().replace(/\s+/g, '-'),
        stripe_id: 'acct_1RMhq2LhYrNjtk3X' //TODO: Cambiar por el ID de Stripe real
      }

      // Actualizar estado (en una implementación real esto modificaría la base de datos)
      setEvents((prev) => [...prev, newEvent])
      setLoading(false)
      return newEvent
    } catch (err) {
      setError('Error al crear el evento')
      setLoading(false)
      return null
    }
  }

  return {
    events,
    loading,
    error,
    getEvent,
    createEvent
  }
}
