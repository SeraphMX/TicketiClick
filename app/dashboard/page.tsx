"use client";
// app/dashboard/page.tsx
// Página principal del dashboard

import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useTickets } from '@/hooks/useTickets';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  CalendarDays, 
  ArrowRight, 
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  const { tickets } = useTickets(user?.id);
  const router = useRouter();
  
  if (!user) {
    router.push('/login');
    return null;
  }
  
  // Determinar qué acciones mostrar según el rol
  const getActions = () => {
    switch (user.role) {
      case 'user':
        return [
          {
            title: 'Mis Boletos',
            description: 'Ver todos tus boletos comprados',
            icon: <TicketIcon className="h-8 w-8 text-purple-600" />,
            href: '/dashboard/user',
            count: tickets.length
          }
        ];
      case 'organizer':
        return [
          {
            title: 'Mis Eventos',
            description: 'Gestionar tus eventos',
            icon: <CalendarDays className="h-8 w-8 text-purple-600" />,
            href: '/dashboard/organizer',
            count: events.filter(e => e.organizerId === user.id).length
          },
          {
            title: 'Crear Evento',
            description: 'Publica un nuevo evento',
            icon: <CalendarDays className="h-8 w-8 text-green-600" />,
            href: '/dashboard/organizer?action=new',
            isAction: true
          }
        ];
      case 'admin':
        return [
          {
            title: 'Todos los Eventos',
            description: 'Gestionar todos los eventos',
            icon: <CalendarDays className="h-8 w-8 text-purple-600" />,
            href: '/dashboard/admin/events',
            count: events.length
          },
          {
            title: 'Usuarios',
            description: 'Gestionar usuarios',
            icon: <Users className="h-8 w-8 text-purple-600" />,
            href: '/dashboard/admin/users',
            count: 5 // Número fijo para la demo
          }
        ];
      default:
        return [];
    }
  };
  
  const actions = getActions();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b border-gray-200 pb-5 mb-6">
        <div className="flex items-center">
          <LayoutDashboard className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Resumen</h2>
        </div>
        <p className="text-gray-600 mt-1">
          Bienvenido, {user.name}. Aquí tienes un resumen de tu actividad.
        </p>
      </div>
      
      {/* Tarjetas de acción */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`
              block p-6 rounded-lg border transition-shadow hover:shadow-md
              ${action.isAction 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-transparent' 
                : 'bg-white border-gray-200'
              }
            `}
          >
            <div className="flex items-start">
              <div className="mr-4">
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${action.isAction ? 'text-white' : 'text-gray-800'}`}>
                  {action.title}
                </h3>
                <p className={action.isAction ? 'text-purple-100' : 'text-gray-600'}>
                  {action.description}
                </p>
                
                {action.count !== undefined && (
                  <div className="mt-2 text-sm font-medium">
                    {action.count} {action.count === 1 ? 'elemento' : 'elementos'}
                  </div>
                )}
                
                <div className={`
                  mt-4 inline-flex items-center text-sm font-medium 
                  ${action.isAction ? 'text-white' : 'text-purple-600'}
                `}>
                  Ver detalles
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Contenido específico según rol */}
      {user.role === 'user' && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm font-medium text-gray-700">Boletos recientes</h3>
          </div>
          {tickets.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {tickets.slice(0, 3).map((ticket) => {
                const event = events.find(e => e.id === ticket.eventId);
                return (
                  <li key={ticket.id} className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event?.title || 'Evento'}</p>
                        <p className="text-sm text-gray-500">{event?.date || 'Fecha no disponible'}</p>
                      </div>
                      <span className={`
                        px-2 py-1 text-xs rounded-full 
                        ${ticket.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {ticket.status === 'active' ? 'Activo' : 'Usado'}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-gray-500">No tienes boletos recientes</p>
              <Link
                href="/events"
                className="mt-2 inline-flex items-center text-sm font-medium text-purple-600"
              >
                Explorar eventos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
      
      {user.role === 'organizer' && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm font-medium text-gray-700">Tus eventos recientes</h3>
          </div>
          {events.filter(e => e.organizerId === user.id).length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {events
                .filter(e => e.organizerId === user.id)
                .slice(0, 3)
                .map((event) => (
                  <li key={event.id} className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                      </div>
                      <span className="text-sm text-purple-600 font-medium">
                        {event.availableTickets} boletos disponibles
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-gray-500">No tienes eventos creados aún</p>
              <Link
                href="/dashboard/organizer?action=new"
                className="mt-2 inline-flex items-center text-sm font-medium text-purple-600"
              >
                Crear tu primer evento
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
      
      {user.role === 'admin' && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm font-medium text-gray-700">Resumen de plataforma</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800">Total de eventos</h4>
                <p className="text-2xl font-bold text-purple-900">{events.length}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-indigo-800">Usuarios registrados</h4>
                <p className="text-2xl font-bold text-indigo-900">5</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-pink-800">Boletos vendidos</h4>
                <p className="text-2xl font-bold text-pink-900">{tickets.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}