// lib/types.ts
// Interfaces y tipos para la aplicación

import { User, UserRole } from "@/data/users";
import { Event, EventCategory } from "@/data/events";
import { Ticket, TicketStatus } from "@/data/tickets";

// Re-exportando para facilitar importaciones
export type { User, UserRole, Event, EventCategory, Ticket, TicketStatus };

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
  date: string;
  time: string;
  location: string;
  price: number;
  category: EventCategory;
  availableTickets: number;
  image?: string;
  featured?: boolean;
}

// Interfaz para filtros de búsqueda
export interface EventFilters {
  category?: EventCategory;
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