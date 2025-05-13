// lib/types.ts
// Interfaces y tipos para la aplicación

import { User, UserRole } from "@/data/users";
import { Ticket, TicketStatus } from "@/data/tickets";

// Re-exportando para facilitar importaciones
export type { User, UserRole, Ticket, TicketStatus };

// Interfaz para categorías de eventos
export interface EventCategory {
  id: number;
  name: string;
  slug: string;
}

// Definición del tipo Event actualizada para Supabase
export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  category: string; // Ahora es el slug de la categoría
  category_name?: string; // Nombre de la categoría para mostrar
  organizerId: number;
  availableTickets: number;
  featured: boolean;
  stripe_id: string;
}

// Interfaz para estadísticas generales (usada en el panel de admin)
export interface AdminStats {
  totalEvents: number;
  totalUsers: number;
  totalTickets: number;
  totalRevenue: number;
}

// Interfaz para formulario de evento
export interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  price: number;
  category: string;
  availableTickets: number;
  image?: string;
  featured?: boolean;
}

// Interfaz para filtros de búsqueda
export interface EventFilters {
  category?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

// Respuesta para solicitud de compra de boleto
export interface TicketPurchaseResponse {
  success: boolean;
  message: string;
  ticket?: Ticket;
  error?: string;
}