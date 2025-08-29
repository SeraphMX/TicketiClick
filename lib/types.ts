// lib/types.ts
// Interfaces y tipos para la aplicación

import { Ticket, TicketStatus } from '@/data/tickets'
import type { DateValue } from '@internationalized/date'

// Re-exportando para facilidad de importaciones
export type { Ticket, TicketStatus }

// Definición de roles de usuario
export type UserRole = 'user' | 'organizer' | 'admin'

// Interfaz para usuarios (actualizada para Supabase)
export interface User {
  id: string // UUID de Supabase
  email: string
  full_name: string
  phone: string
  role: UserRole
  avatar?: string
  avatar_url?: string
}

// Interfaz para categorías de eventos
export interface EventCategory {
  id: number
  name: string
  slug: string
}

// Definición del tipo Event actualizada para Supabase
export interface Event {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  location: string
  price: number
  currency: string
  image: string
  category: string // Ahora es el slug de la categoría
  category_name?: string // Nombre de la categoría para mostrar
  organizerId: string
  availableTickets: number
  featured: boolean
  stripe_id: string
}

// Interfaz para estadísticas generales (usada en el panel de admin)
export interface AdminStats {
  totalEvents: number
  totalUsers: number
  totalTickets: number
  totalRevenue: number
}

// Interfaz para formulario de evento
export interface EventFormData {
  title: string
  description: string
  date: DateValue | null | undefined
  time: string
  location: string
  category: string
  price: number
  ticketsAvailable: number
  imageUrl?: string
  featured?: boolean
}

// Interfaz para filtros de búsqueda
export interface EventFilters {
  category?: string
  date?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

// Respuesta para solicitud de compra de boleto
export interface TicketPurchaseResponse {
  success: boolean
  message: string
  ticket?: Ticket
  error?: string
}
