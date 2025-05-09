'use client'
// app/dashboard/admin/page.tsx
// Panel de administración principal

import { useAuth } from '@/hooks/useAuth'
import { useEvents } from '@/hooks/useEvents'
import { useTickets } from '@/hooks/useTickets'
import { BarChart, CalendarDays, DollarSign, TicketIcon, TrendingUp, UsersRound } from 'lucide-react'
import { useState } from 'react'

// Componente de gráfico de barras simulado
const SimpleBarChart = () => {
  return (
    <div className='h-64 flex items-end justify-around'>
      {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month, index) => {
        const height = Math.random() * 80 + 20 // Altura aleatoria entre 20% y 100%
        return (
          <div key={index} className='flex flex-col items-center'>
            <div
              className='w-12 bg-gradient-to-t from-blue-600 to-zinc-500 rounded-t-md transition-all duration-500'
              style={{ height: `${height}%` }}
            ></div>
            <div className='mt-2 text-xs text-gray-600'>{month}</div>
          </div>
        )
      })}
    </div>
  )
}

// Componente de gráfico de líneas simulado
const SimpleLineChart = () => {
  // Puntos para la línea
  const points = [
    { x: 0, y: 70 },
    { x: 20, y: 40 },
    { x: 40, y: 60 },
    { x: 60, y: 30 },
    { x: 80, y: 50 },
    { x: 100, y: 20 }
  ]

  // Convertir puntos a coordenadas SVG
  const path = `M ${points.map((p) => `${p.x} ${100 - p.y}`).join(' L ')}`

  return (
    <div className='h-64 w-full'>
      <svg viewBox='0 0 100 100' className='w-full h-full'>
        {/* Líneas de cuadrícula */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={`grid-${y}`} x1='0' y1={y} x2='100' y2={y} stroke='#eaeaea' strokeWidth='0.5' />
        ))}

        {/* Línea del gráfico */}
        <path d={path} fill='none' stroke='url(#lineGradient)' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />

        {/* Puntos en la línea */}
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={100 - point.y} r='2.5' fill='#fff' stroke='#6d28d9' strokeWidth='2' />
        ))}

        {/* Gradiente para la línea */}
        <defs>
          <linearGradient id='lineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#8b5cf6' />
            <stop offset='100%' stopColor='#4f46e5' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const { events } = useEvents()
  const { tickets } = useTickets()

  // Calcular estadísticas
  const totalEvents = events.length
  const totalUsers = 5 // Número fijo para la demo
  const totalTickets = tickets.length
  const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0)

  // Tabs para métricas
  const [activeTab, setActiveTab] = useState('events')

  // Verificar que sea un admin
  if (user?.role !== 'admin') {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='text-center py-8'>
          <p className='text-red-600 font-medium'>Acceso denegado. Solo administradores pueden ver esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <BarChart className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Panel de Control</h2>
        </div>
        <p className='text-gray-600 mt-1'>Vista general de estadísticas y actividad de la plataforma</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <CalendarDays className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total de eventos</p>
              <p className='text-2xl font-bold text-gray-900'>{totalEvents}</p>
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm'>
            <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
            <span className='text-green-500 font-medium'>12% más</span>
            <span className='text-gray-500 ml-1'>que el mes pasado</span>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-zinc-100 text-zinc-600 mr-4'>
              <UsersRound className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Usuarios</p>
              <p className='text-2xl font-bold text-gray-900'>{totalUsers}</p>
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm'>
            <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
            <span className='text-green-500 font-medium'>7% más</span>
            <span className='text-gray-500 ml-1'>que el mes pasado</span>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-pink-100 text-pink-600 mr-4'>
              <TicketIcon className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Boletos vendidos</p>
              <p className='text-2xl font-bold text-gray-900'>{totalTickets}</p>
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm'>
            <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
            <span className='text-green-500 font-medium'>18% más</span>
            <span className='text-gray-500 ml-1'>que el mes pasado</span>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <DollarSign className='h-6 w-6' />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Ingresos totales</p>
              <p className='text-2xl font-bold text-gray-900'>{totalRevenue.toFixed(2)} EUR</p>
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm'>
            <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
            <span className='text-green-500 font-medium'>15% más</span>
            <span className='text-gray-500 ml-1'>que el mes pasado</span>
          </div>
        </div>
      </div>

      {/* Tabs para gráficas */}
      <div className='mb-6'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-6'>
            <button
              onClick={() => setActiveTab('events')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Eventos por mes
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === 'revenue'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Ingresos
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Usuarios
            </button>
          </nav>
        </div>
      </div>

      {/* Gráficas */}
      <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          {activeTab === 'events' && 'Eventos por mes'}
          {activeTab === 'revenue' && 'Ingresos mensuales'}
          {activeTab === 'users' && 'Nuevos usuarios por mes'}
        </h3>

        <div className='mt-4'>
          {activeTab === 'events' && <SimpleBarChart />}
          {activeTab === 'revenue' && <SimpleLineChart />}
          {activeTab === 'users' && <SimpleBarChart />}
        </div>
      </div>

      {/* Actividad reciente */}
      <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Actividad reciente</h3>

        <ul className='divide-y divide-gray-200'>
          <li className='py-3'>
            <div className='flex space-x-3'>
              <div className='flex-shrink-0'>
                <UsersRound className='h-5 w-5 text-zinc-600' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900'>Nuevo usuario registrado</p>
                <p className='text-sm text-gray-500'>Laura Martínez se unió a la plataforma</p>
              </div>
              <div className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>hace 2 horas</div>
            </div>
          </li>
          <li className='py-3'>
            <div className='flex space-x-3'>
              <div className='flex-shrink-0'>
                <TicketIcon className='h-5 w-5 text-pink-600' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900'>Nueva venta de boletos</p>
                <p className='text-sm text-gray-500'>2 boletos vendidos para "Concierto de Rock en Vivo"</p>
              </div>
              <div className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>hace 4 horas</div>
            </div>
          </li>
          <li className='py-3'>
            <div className='flex space-x-3'>
              <div className='flex-shrink-0'>
                <CalendarDays className='h-5 w-5 text-blue-600' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900'>Nuevo evento creado</p>
                <p className='text-sm text-gray-500'>"Festival de Gastronomía" por María González</p>
              </div>
              <div className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>hace 1 día</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
