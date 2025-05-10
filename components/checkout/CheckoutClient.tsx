'use client'
// components/checkout/CheckoutClient.tsx
// Componente cliente para el checkout

import ContactForm from '@/components/checkout/ContactForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import OtpVerification from '@/components/checkout/OtpVerification'
import PaymentMethod from '@/components/checkout/PaymentMethod'
import TicketCustomization from '@/components/checkout/TicketCustomization'
import { useAuth } from '@/hooks/useAuth'
import { useCheckoutTimer } from '@/hooks/useCheckoutTimer'
import { Event } from '@/lib/types'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Pasos del checkout
const CHECKOUT_STEPS = [
  { id: 1, title: 'Datos de contacto' },
  { id: 2, title: 'Verificación' },
  { id: 3, title: 'Personalización' },
  { id: 4, title: 'Método de pago' },
  { id: 5, title: 'Confirmación' }
]

interface CheckoutClientProps {
  event: Event
}

export default function CheckoutClient({ event }: CheckoutClientProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    createAccount: false,
    otpVerified: false,
    ticketName: '',
    ticketColor: '#FFFFFF',
    paymentMethod: ''
  })

  // Timer para el checkout
  const { timeLeft, expired } = useCheckoutTimer(15 * 60) // 15 minutos

  useEffect(() => {
    // Si el usuario está autenticado, prellenar datos
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email
      }))
    }
  }, [user])

  // Manejar expiración del timer
  useEffect(() => {
    if (expired) {
      alert('El tiempo para completar la compra ha expirado')
      router.push(`/event/${event.slug}`)
    }
  }, [expired, event.slug, router])

  // Formatear tiempo restante
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Calcular progreso
  const progress = (currentStep / CHECKOUT_STEPS.length) * 100

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Timer */}
        <div className='bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between'>
          <Link href={`/event/${event.slug}`} className='text-blue-600 hover:text-blue-800 flex items-center'>
            <ArrowLeft className='h-5 w-5 mr-1' />
            Volver al evento
          </Link>
          <div className='flex items-center text-gray-600'>
            <Clock className='h-5 w-5 mr-2' />
            Tiempo restante: <span className='font-mono ml-2'>{formatTimeLeft()}</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <div className='relative'>
            <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100'>
              <div
                style={{ width: `${progress}%` }}
                className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500'
              ></div>
            </div>
            <div className='flex justify-between'>
              {CHECKOUT_STEPS.map((step) => (
                <div key={step.id} className={`text-xs ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido del paso actual */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          {currentStep === 1 && (
            <ContactForm
              formData={formData}
              onSubmit={(data) => {
                setFormData((prev) => ({ ...prev, ...data }))
                setCurrentStep(2)
              }}
            />
          )}

          {currentStep === 2 && (
            <OtpVerification
              email={formData.email}
              onVerified={() => {
                setFormData((prev) => ({ ...prev, otpVerified: true }))
                setCurrentStep(3)
              }}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <TicketCustomization
              formData={formData}
              onSubmit={(data) => {
                setFormData((prev) => ({ ...prev, ...data }))
                setCurrentStep(4)
              }}
              onSkip={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <PaymentMethod
              formData={formData}
              onSubmit={(method) => {
                setFormData((prev) => ({ ...prev, paymentMethod: method }))
                setCurrentStep(5)
              }}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <OrderSummary
              event={event}
              formData={formData}
              onConfirm={() => {
                // Simular proceso de pago exitoso
                alert('¡Compra realizada con éxito!')
                router.push('/dashboard/user')
              }}
              onBack={() => setCurrentStep(4)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
