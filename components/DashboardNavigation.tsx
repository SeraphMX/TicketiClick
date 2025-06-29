'use client'
// components/DashboardNavigation.tsx
// Navegación para el dashboard actualizada para Supabase

import { RootState } from '@/store/store'
import { BarChart, CalendarDays, ChevronRight, LayoutDashboard, Settings, Ticket, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

const DashboardNavigation = () => {
  const pathname = usePathname()
  const { error, isLoading, user } = useSelector((state: RootState) => state.auth)

  // Si no hay usuario, no mostramos nada
  if (!user) return null

  const isActive = (path: string) => {
    return pathname === path
  }

  // Navegación basada en el rol del usuario
  const getNavigation = () => {
    const commonLinks = [
      {
        name: 'Resumen',
        href: '/dashboard',
        icon: <LayoutDashboard className='h-5 w-5' />,
        exact: true
      }
    ]

    // Enlaces específicos para cada rol
    const roleSpecificLinks = {
      customer: [
        {
          name: 'Mis Boletos',
          href: '/dashboard/user',
          icon: <Ticket className='h-5 w-5' />,
          exact: false
        }
      ],
      organizer: [
        {
          name: 'Mis Eventos',
          href: '/dashboard/organizador',
          icon: <CalendarDays className='h-5 w-5' />,
          exact: false
        }
      ],
      admin: [
        {
          name: 'Todos los Eventos',
          href: '/dashboard/admin/events',
          icon: <CalendarDays className='h-5 w-5' />,
          exact: false
        },
        {
          name: 'Usuarios',
          href: '/dashboard/admin/users',
          icon: <Users className='h-5 w-5' />,
          exact: false
        },
        {
          name: 'Estadísticas',
          href: '/dashboard/admin',
          icon: <BarChart className='h-5 w-5' />,
          exact: true
        }
      ]
    }

    // Devolver los enlaces apropiados según el rol
    return [...commonLinks, ...roleSpecificLinks[user.role]]
  }

  const navigation = getNavigation()

  // Función para traducir roles
  const translateRole = (role: string) => {
    const translations: Record<string, string> = {
      customer: 'Usuario',
      organizer: 'Organizador',
      admin: 'Administrador'
    }
    return translations[role] || role
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='p-4 bg-blue-700 text-white'>
        <h2 className='text-xl font-semibold'>Dashboard</h2>
        <p className='text-sm text-blue-200'>Rol: {translateRole(user.role)}</p>
      </div>

      <nav className='p-3'>
        <ul className='space-y-1'>
          {navigation.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  <span className={`mr-3 ${active ? 'text-blue-600' : 'text-gray-500'}`}>{item.icon}</span>
                  {item.name}
                  {active && <ChevronRight className='ml-auto h-4 w-4 text-blue-600' />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className='p-4 border-t'>
        <Link
          href='/dashboard/config'
          className='flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors'
        >
          <Settings className='mr-3 h-5 w-5 text-gray-500' />
          Configuración
        </Link>
      </div>
    </div>
  )
}

export default DashboardNavigation
