'use client'

import { useEvents } from '@/hooks/useEvents'
import { useTickets } from '@/hooks/useTickets'
import { RootState } from '@/store/store'
import { formatDate } from '@/utils/date'
import { ArrowRight, CalendarDays, LayoutDashboard, Ticket as TicketIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export default function DashboardPage() {
  const { error, isLoading, user } = useSelector(
    (state: RootState) => ({
      error: state.auth.error,
      isLoading: state.auth.isLoading,
      user: state.auth.user
    }),
    shallowEqual
  )

  // Normalizar email para evitar que cambie por detalles de mayúsculas o espacios
  const normalizedEmail = useMemo(() => user?.email?.trim().toLowerCase() || '', [user?.email])

  const { events } = useEvents()
  const { orders } = useTickets(normalizedEmail)

  if (!user) {
    return null
  }

  const getActions = () => {
    switch (user.role) {
      case 'customer':
        return [
          {
            title: 'Mis compras',
            description: 'Ver todos tus boletos comprados',
            icon: <TicketIcon className='h-8 w-8 text-blue-600' />,
            href: '/dashboard/user',
            count: orders.length
          }
        ]
      case 'organizer':
        return [
          {
            title: 'Mis Eventos',
            description: 'Gestionar tus eventos',
            icon: <CalendarDays className='h-8 w-8 text-blue-600' />,
            href: '/dashboard/organizador',
            count: events.filter((e) => e.organizerId === user.id).length
          },
          {
            title: 'Crear Evento',
            description: 'Publica un nuevo evento',
            icon: <CalendarDays className='h-8 w-8 text-green-600' />,
            href: '/dashboard/organizador?action=new',
            isAction: true
          }
        ]
      case 'admin':
        return [
          {
            title: 'Todos los Eventos',
            description: 'Gestionar todos los eventos',
            icon: <CalendarDays className='h-8 w-8 text-blue-600' />,
            href: '/dashboard/admin/events',
            count: events.length
          },
          {
            title: 'Usuarios',
            description: 'Gestionar usuarios',
            icon: <Users className='h-8 w-8 text-blue-600' />,
            href: '/dashboard/admin/users',
            count: 5 // Número fijo para la demo
          }
        ]
      default:
        return []
    }
  }

  const actions = getActions()

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <LayoutDashboard className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Resumen</h2>
        </div>
        <p className='text-gray-600 mt-1'>Bienvenido, {user.full_name.split(' ')[0]}. Aquí tienes un resumen de tu actividad.</p>
      </div>

      {/* Tarjetas de acción */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`
              block p-6 rounded-lg border transition-shadow hover:shadow-md
              ${action.isAction ? 'bg-gradient-to-r from-blue-600 to-zinc-700 text-white border-transparent' : 'bg-white border-gray-200'}
            `}
          >
            <div className='flex items-start'>
              <div className='mr-4'>{action.icon}</div>
              <div className='flex-1'>
                <h3 className={`text-lg font-semibold ${action.isAction ? 'text-white' : 'text-gray-800'}`}>{action.title}</h3>
                <p className={action.isAction ? 'text-blue-100' : 'text-gray-600'}>{action.description}</p>

                {action.count !== undefined && (
                  <div className='mt-2 text-sm font-medium'>
                    {action.count} {action.count === 1 ? 'elemento' : 'elementos'}
                  </div>
                )}

                <div
                  className={`
                  mt-4 inline-flex items-center text-sm font-medium 
                  ${action.isAction ? 'text-white' : 'text-blue-600'}
                `}
                >
                  Ver detalles
                  <ArrowRight className='ml-1 h-4 w-4' />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Contenido específico según rol */}
      {user.role === 'customer' && (
        <div className='border rounded-lg overflow-hidden'>
          <div className='bg-gray-50 px-4 py-3 border-b'>
            <h3 className='text-sm font-medium text-gray-700'>Compras recientes</h3>
          </div>
          {orders.length > 0 ? (
            <ul className='divide-y divide-gray-200'>
              {orders.slice(0, 3).map((order) => (
                <li key={order.order_id} className='px-4 py-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>{order.event_title || 'Evento'}</p>
                      <p className='text-sm text-gray-500'>
                        {formatDate(order?.order_created_at, { style: 'long' }) || 'Fecha no disponible'}
                      </p>
                    </div>
                    <section>
                      <p className='text-sm text-gray-500'>
                        {order.quantity} {order.quantity === 1 ? 'boleto' : 'boletos'} • ${order.total_amount.toFixed(2)}
                      </p>
                      {/* <span
                        className={`
                          px-2 py-1 text-xs rounded-full
                          ${order.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        `}
                      >
                        {order.status === 'active' ? 'Activo' : 'Usado'}
                      </span> */}
                    </section>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='px-4 py-6 text-center'>
              <p className='text-gray-500'>No tienes boletos recientes</p>
              <Link href='/events' className='mt-2 inline-flex items-center text-sm font-medium text-blue-600'>
                Explorar eventos
                <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
          )}
        </div>
      )}

      {user.role === 'organizer' && (
        <div className='border rounded-lg overflow-hidden'>
          <div className='bg-gray-50 px-4 py-3 border-b'>
            <h3 className='text-sm font-medium text-gray-700'>Tus eventos recientes</h3>
          </div>
          {events.filter((e) => e.organizerId === user.id).length > 0 ? (
            <ul className='divide-y divide-gray-200'>
              {events
                .filter((e) => e.organizerId === user.id)
                .slice(0, 3)
                .map((event) => (
                  <li key={event.id} className='px-4 py-3'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium'>{event.title}</p>
                        <p className='text-sm text-gray-500'>
                          {event.date} • {event.location}
                        </p>
                      </div>
                      <span className='text-sm text-blue-600 font-medium'>{event.availableTickets} boletos disponibles</span>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className='px-4 py-6 text-center'>
              <p className='text-gray-500'>No tienes eventos creados aún</p>
              <Link href='/dashboard/organizer?action=new' className='mt-2 inline-flex items-center text-sm font-medium text-blue-600'>
                Crear tu primer evento
                <ArrowRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
          )}
        </div>
      )}

      {user.role === 'admin' && (
        <div className='border rounded-lg overflow-hidden'>
          <div className='bg-gray-50 px-4 py-3 border-b'>
            <h3 className='text-sm font-medium text-gray-700'>Resumen de plataforma</h3>
          </div>
          <div className='p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h4 className='text-sm font-medium text-blue-800'>Total de eventos</h4>
                <p className='text-2xl font-bold text-blue-900'>{events.length}</p>
              </div>
              <div className='bg-zinc-50 p-4 rounded-lg'>
                <h4 className='text-sm font-medium text-zinc-800'>Usuarios registrados</h4>
                <p className='text-2xl font-bold text-zinc-900'>5</p>
              </div>
              <div className='bg-pink-50 p-4 rounded-lg'>
                <h4 className='text-sm font-medium text-pink-800'>Boletos vendidos</h4>
                <p className='text-2xl font-bold text-pink-900'>{orders.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
