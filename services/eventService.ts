import { supabase } from '@/lib/supabase'
import { Event, CreateEventInput, UpdateEventInput } from '@/types/event'
import { PostgrestError } from '@supabase/supabase-js'

export const eventService = {
  /**
   * Crea un nuevo evento en la base de datos.
   * @param eventData - Los datos del nuevo evento.
   * @returns El evento creado.
   */
  async createEvent(eventData: CreateEventInput): Promise<Event> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: eventData.title,
            slug: eventData.slug,
            description: eventData.description,
            event_date: eventData.event_date?.toISOString().split('T')[0],
            event_time: eventData.event_time,
            location_id: eventData.location_id,
            category_id: eventData.category_id,
            organizer_id: eventData.organizer_id,
            price: eventData.price,
            currency: eventData.currency,
            available_tickets: eventData.available_tickets,
            featured: eventData.featured,
            image_url: eventData.image_url
          }
        ])
        .select()
        .single()

      if (error) throw new Error((error as PostgrestError).message || 'Error al crear el evento')
      return data as Event
    } catch (error) {
      throw new Error('Error al crear el evento: ' + (error as Error).message)
    }
  },

  /**
   * Obtiene un evento por su ID.
   * @param id - El ID del evento a obtener.
   * @returns Los datos del evento o null si no se encuentra.
   */
  async getEvent(id: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw new Error((error as PostgrestError).message || 'Error al obtener el evento')
      return data as Event
    } catch (error) {
      throw new Error('Error al obtener el evento: ' + (error as Error).message)
    }
  },

  /**
   * Obtiene múltiples eventos con filtros opcionales.
   * @param filters - Filtros opcionales para la consulta.
   * @returns Array de eventos que coinciden con los criterios.
   */
  async getEvents(
    filters?: {
      category_id?: number
      location_id?: number
      featured?: boolean
      limit?: number
      page?: number
    }
  ): Promise<Event[]> {
    try {
      const query = supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.category_id) {
        query.eq('category_id', filters.category_id)
      }

      if (filters?.location_id) {
        query.eq('location_id', filters.location_id)
      }

      if (filters?.featured !== undefined) {
        query.eq('featured', filters.featured)
      }

      if (filters?.limit) {
        const offset = filters.page ? (filters.page - 1) * filters.limit : 0
        query.range(offset, offset + filters.limit - 1)
      }

      const { data, error } = await query

      if (error) throw new Error((error as PostgrestError).message || 'Error al obtener los eventos')
      return data as Event[]
    } catch (error) {
      throw new Error('Error al obtener los eventos: ' + (error as Error).message)
    }
  },

  /**
   * Actualiza un evento existente.
   * @param id - El ID del evento a actualizar.
   * @param eventData - Los datos a actualizar.
   * @returns El evento actualizado.
   */
  async updateEvent(id: string, eventData: UpdateEventInput): Promise<Event | null> {
    try {
      const updateData: any = {}

      // Convert date to ISO string if provided
      if (eventData.event_date) {
        updateData.event_date = eventData.event_date.toISOString().split('T')[0]
      }

      // Copy other fields that might be updated
      Object.assign(updateData, {
        title: eventData.title,
        description: eventData.description,
        event_time: eventData.event_time,
        location_id: eventData.location_id,
        category_id: eventData.category_id,
        price: eventData.price,
        currency: eventData.currency,
        available_tickets: eventData.available_tickets,
        featured: eventData.featured,
        image_url: eventData.image_url
      })

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key]
        }
      })

      const { data, error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw new Error((error as PostgrestError).message || 'Error al actualizar el evento')
      return data as Event
    } catch (error) {
      throw new Error('Error al actualizar el evento: ' + (error as Error).message)
    }
  },

  /**
   * Elimina un evento por su ID.
   * @param id - El ID del evento a eliminar.
   * @returns True si la eliminación fue exitosa.
   */
  async deleteEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw new Error((error as PostgrestError).message || 'Error al eliminar el evento')
      return true
    } catch (error) {
      throw new Error('Error al eliminar el evento: ' + (error as Error).message)
    }
  },

  /**
   * Obtiene eventos por ID de organizador.
   * @param organizerId - El ID del organizador.
   * @returns Array de eventos creados por el organizador.
   */
  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', organizerId)
        .order('created_at', { ascending: false })

      if (error) throw new Error((error as PostgrestError).message || 'Error al obtener eventos del organizador')
      return data as Event[]
    } catch (error) {
      throw new Error('Error al obtener eventos del organizador: ' + (error as Error).message)
    }
  },

  /**
   * Obtiene eventos destacados.
   * @param limit - Límite opcional para el número de eventos a obtener.
   * @returns Array de eventos destacados.
   */
  async getFeaturedEvents(limit = 10): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw new Error((error as PostgrestError).message || 'Error al obtener eventos destacados')
      return data as Event[]
    } catch (error) {
      throw new Error('Error al obtener eventos destacados: ' + (error as Error).message)
    }
  }
}