'use client'

import DashboardNavigation from '@/components/DashboardNavigation'
import { RootState } from '@/store/store'
import { Spinner } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user?.id) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  if (isLoading || !user?.id) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner label='Redirigiendo...' labelColor='primary' size='lg' />
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='md:col-span-1'>
          <DashboardNavigation />
        </div>
        <div className='md:col-span-3'>{children}</div>
      </div>
    </div>
  )
}
