'use client'
// app/dashboard/layout.tsx
// Layout para el dashboard

import DashboardNavigation from '@/components/DashboardNavigation'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner label='Redirigiendo...' labelColor='primary' size='lg' />
      </div>
    )
  }

  // Si está cargando, mostrar un indicador de carga
  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div className='h-40 bg-gray-200 rounded'></div>
            <div className='md:col-span-3 h-40 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Navegación lateral */}
        <div className='md:col-span-1'>
          <DashboardNavigation />
        </div>

        {/* Contenido principal */}
        <div className='md:col-span-3'>{children}</div>
      </div>
    </div>
  )
}
