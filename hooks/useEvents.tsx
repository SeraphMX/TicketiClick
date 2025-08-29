'use client'
// hooks/useEvents.tsx
// Hook para gestionar eventos

import { supabase } from '@/lib/supabase'
import { Event, EventFormData } from '@/lib/types'
import { useEffect, useState } from 'react'

// Hook para obtener y manipular eventos
export const useEvents = (organizerId?: string) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar eventos al inicializar
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        let query = supabase.from('event_details_view').select('*')

        if (organizerId) {
          query = query.eq('organizerId', organizerId)
        }

        const { data, error: supabaseError } = await query

        if (supabaseError) {
          throw supabaseError
        }

        setEvents(data || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching events:', err)
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
      const { data, error: supabaseError } = await supabase.from('events_view').select('*').eq('id', id).single()

      if (supabaseError) {
        throw supabaseError
      }

      setLoading(false)
      return data
    } catch (err) {
      console.error('Error fetching event:', err)
      setError('Error al obtener el evento')
      setLoading(false)
      return undefined
    }
  }

  // Función para crear un nuevo evento
  const createEvent = async (eventData: EventFormData, organizerId: string): Promise<Event | null> => {
    setLoading(true)
    try {
      const { data, error: supabaseError } = await supabase
        .from('events')
        .insert([
          {
            ...eventData,
            organizerId,
            currency: 'EUR',
            featured: eventData.featured || false,
            image: eventData.imageUrl || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
            slug: eventData.title.toLowerCase().replace(/\s+/g, '-')
          }
        ])
        .select()
        .single()

      if (supabaseError) {
        throw supabaseError
      }

      setEvents((prev) => [...prev, data])
      setLoading(false)
      return data
    } catch (err) {
      console.error('Error creating event:', err)
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
