'use client'
// components/checkout/CheckoutClient.tsx
// Componente cliente para el checkout

import ContactForm from '@/components/checkout/ContactForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentMethod from '@/components/checkout/PaymentMethod'
import TicketCustomization from '@/components/checkout/TicketCustomization'
import { useCheckoutTimer } from '@/hooks/useCheckoutTimer'
import { Event } from '@/lib/types'
import { RootState } from '@/store/store'
import { Progress } from '@heroui/react'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Wizard } from 'react-use-wizard'
import PhoneVerification from './PhoneVerification'

interface CheckoutClientProps {
  event: Event
}

export default function CheckoutClient({ event }: CheckoutClientProps) {
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false)
  const [progress, setProgress] = useState(0)

  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const rxClientInfo = useSelector((state: RootState) => state.checkout.contactInfo)
  const router = useRouter()

  const { isLoading, user } = useSelector((state: RootState) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    createAccount: false,
    otpVerified: false,
    ticketName: '',
    ticketColor: '#FFFFFF',
    paymentMethod: selectedEvent?.price === 0 ? 'free' : 'card'
  })

  const handleStepChange = (step: number) => {
    const totalSteps = 5
    const currentStep = step + 1
    const stepProgress = Math.floor((currentStep / totalSteps) * 100)
    setProgress(stepProgress)
    if (currentStep === totalSteps) {
      setIsCheckoutCompleted(true)
    }
  }

  // Timer para el checkout
  const { timeLeft, expired } = useCheckoutTimer(15 * 60) // 15 minutos

  useEffect(() => {
    // Redirigir al evento si no hay evento seleccionado en el estado de Redux
    if (!selectedEvent) {
      router.push(`/evento/${event.slug}`)
      return
    }

    // Si el usuario está autenticado, prellenar datos
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        phone: user.phone
      }))
    }
  }, [user, event.slug, router, selectedEvent])

  // Manejar expiración del timer
  useEffect(() => {
    if (expired && !isCheckoutCompleted) {
      alert('El tiempo para completar la compra ha expirado')
      router.push(`/evento/${event.slug}`)
    }
  }, [expired, event.slug, router])

  // Formatear tiempo restante
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <section className='w-full max-w-md '>
      <div className='mb-2 flex items-center justify-between'>
        <Link href={`/evento/${event.slug}`} className='text-blue-600 hover:text-blue-800 flex items-center'>
          <ArrowLeft className='h-5 w-5 mr-1' />
          Volver al evento
        </Link>
        {!isCheckoutCompleted && (
          <div className='flex items-center text-gray-600'>
            <Clock className='h-5 w-5 mr-2' />
            Tiempo restante: <span className='font-mono ml-2'>{formatTimeLeft()}</span>
          </div>
        )}
      </div>
      <Progress aria-label='Progreso...' value={progress} size='sm' />
      <section className='bg-white p-6 rounded-lg rounded-t-none shadow-md w-full'>
        <Wizard onStepChange={handleStepChange}>
          <ContactForm
            onSubmit={(data) => {
              setFormData((prev) => ({ ...prev, ...data }))
            }}
          />
          <PhoneVerification />
          <TicketCustomization
            onSubmit={(data) => {
              setFormData((prev) => ({ ...prev, ...data }))
            }}
          />
          <PaymentMethod
            formData={formData}
            onSubmit={(method) => {
              setFormData((prev) => ({ ...prev, paymentMethod: method }))
            }}
          />
          <OrderSummary
            event={event}
            formData={formData}
            onConfirm={() => {
              // Simular proceso de pago exitoso
              alert('¡Compra realizada con éxito!')
              router.push('/dashboard/user')
            }}
          />
        </Wizard>
      </section>
    </section>
  )
}
