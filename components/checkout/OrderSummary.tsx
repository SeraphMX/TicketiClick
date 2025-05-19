'use client'
import { usePriceCalculator } from '@/hooks/usePriceCalculator'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { resetCheckout } from '@/store/slices/checkoutSlice'
import { updateSelectedEventDetails } from '@/store/slices/eventsSlice'
import { RootState } from '@/store/store'
import { Calendar, ChevronDown, ChevronUp, CloudDownload, CreditCard, Info, MapPin, Phone, Ticket, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface OrderSummaryProps {
  event: Event
  formData: {
    email: string
    phone: string
    ticketName?: string
    paymentMethod: string
  }
  onConfirm: () => void
  onBack: () => void
}

// Traductor de métodos de pago
const translatePaymentMethod = (method: string) => {
  const translations: Record<string, string> = {
    card: 'Tarjeta de crédito/débito',
    transfer: 'Transferencia bancaria',
    oxxo: 'Pago en OXXO'
  }
  return translations[method] || method
}

export default function OrderSummary({ event, formData, onConfirm, onBack }: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showFeeDetails, setShowFeeDetails] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const quantity = selectedEvent?.quantity || 1
  const [savedCoupon, setSavedCoupon] = useState({
    code: '',
    discount: 0,
    isApplied: false,
    isPercentage: false,
    error: ''
  })

  const checkout = useSelector((state: RootState) => state.checkout)

  useEffect(() => {
    setTimeout(() => {
      // Guarda el cupón localmente
      setSavedCoupon({
        code: checkout.coupon.code || '',
        discount: checkout.coupon.discount || 0,
        isApplied: checkout.coupon.isApplied || false,
        isPercentage: checkout.coupon.isPercentage ?? false,
        error: checkout.coupon.error || ''
      })

      dispatch(resetCheckout())
    }, 1000)
  }, [])

  const { subtotal, discount, serviceFee, paymentFee, ticketFee, total } = usePriceCalculator({
    quantity,
    unitPrice: event.price,
    coupon: savedCoupon
  })

  const handleConfirm = async () => {
    setIsProcessing(true)
    try {
      // Actualizar detalles del evento seleccionado
      dispatch(
        updateSelectedEventDetails({
          quantity,
          ticketHolder: formData.ticketName || formData.email
        })
      )

      // Simular generacion de boletos
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Redirigir a la página de confirmación
      router.push(`/event/${event.slug}/tickets`)
    } catch (error) {
      setIsProcessing(false)
      console.error('Error en el proceso de pago:', error)
    }
  }

  useEffect(() => {
    const handleUnload = () => {
      dispatch(resetCheckout())
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return (
    <div className='space-y-6'>
      <div className='flex items-center'>
        <h2 className='text-xl font-bold text-gray-900'>Resumen de compra</h2>
      </div>

      <p className='text-sm text-gray-600'>
        La compra se ha realizado correctamente. Ahora puedes ver los detalles de tu pedido y descargar tus boletos. También te hemos
        enviado un correo electrónico con esta información por si necesitas acceder a ellos más tarde. ¡Gracias por tu compra y disfruta el
        evento!
      </p>

      {/* Detalles del evento */}
      <div className='bg-gray-50 rounded-lg p-4'>
        <h3 className='font-medium text-gray-900 mb-4'>{event.title}</h3>
        <div className='space-y-2'>
          <div className='flex items-center text-sm text-gray-600'>
            <Calendar className='h-4 w-4 mr-2' />
            {formatDate(event.date)} - {formatTime(event.time)}
          </div>
          <div className='flex items-center text-sm text-gray-600'>
            <MapPin className='h-4 w-4 mr-2' />
            {event.location}
          </div>
          <div className='flex items-center text-sm text-gray-600'>
            <Ticket className='h-4 w-4 mr-2' />
            Cantidad: {quantity} {quantity === 1 ? 'boleto' : 'boletos'}
          </div>
        </div>
      </div>

      {/* Datos del comprador */}
      <div>
        <h3 className='text-sm font-medium text-gray-700 mb-2'>Datos de contacto</h3>
        <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
          <div className='flex items-center text-sm'>
            <User className='h-4 w-4 mr-2 text-gray-400' />
            <span>{formData.email}</span>
          </div>
          <div className='flex items-center text-sm'>
            <Phone className='h-4 w-4 mr-2 text-gray-400' />
            <span>{formData.phone}</span>
          </div>
          {formData.ticketName && (
            <div className='flex items-center text-sm'>
              <Ticket className='h-4 w-4 mr-2 text-gray-400' />
              <span>Nombre en los boletos: {formData.ticketName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Método de pago */}
      <div>
        <h3 className='text-sm font-medium text-gray-700 mb-2'>Método de pago</h3>
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='flex items-center'>
            <CreditCard className='h-5 w-5 mr-2 text-gray-400' />
            <span>{translatePaymentMethod(formData.paymentMethod)}</span>
          </div>
        </div>
      </div>

      {/* Resumen de costos */}
      <div className='border-t border-gray-200 pt-4'>
        <div className='space-y-3'>
          <div className='flex justify-between '>
            <span className='text-gray-600'>Subtotal</span>
            <span>
              ${subtotal.toFixed(2)} {event.currency}
            </span>
          </div>

          {discount > 0 && (
            <div className='flex justify-between items-center bg-green-100 py-2 px-2 rounded-md'>
              <span className='text-sm text-green-600'>Descuento aplicado</span>
              <span className='text-sm text-green-600'>
                ${discount.toFixed(2)} {event.currency}
              </span>
            </div>
          )}

          <div className='border-t border-gray-200 pt-3'>
            <div className='flex justify-between items-center mb-2'>
              <button
                onClick={() => setShowFeeDetails(!showFeeDetails)}
                className='text-sm text-gray-600 hover:text-gray-800 flex items-center'
              >
                <span className='flex items-center'>
                  Cargos y comisiones
                  <Info className='h-4 w-4 ml-1 text-gray-400' />
                </span>
                {showFeeDetails ? <ChevronUp className='h-4 w-4 ml-1' /> : <ChevronDown className='h-4 w-4 ml-1' />}
              </button>
              <span className='text-gray-600'>
                ${(serviceFee + paymentFee + ticketFee).toFixed(2)} {event.currency}
              </span>
            </div>

            {showFeeDetails && (
              <div className='bg-gray-100 p-3 rounded-md space-y-2 text-sm'>
                <p className='flex justify-between text-gray-600'>
                  <span>Cargo por servicio (10%):</span>
                  <span>
                    {serviceFee.toFixed(2)} {event.currency}
                  </span>
                </p>
                <p className='flex justify-between text-gray-600'>
                  <span>Comisión bancaria (5%):</span>
                  <span>
                    {paymentFee.toFixed(2)} {event.currency}
                  </span>
                </p>
                <p className='flex justify-between text-gray-600'>
                  <span>Emisión de boleto:</span>
                  <span>
                    {ticketFee.toFixed(2)} {event.currency}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className='border-t border-gray-200 pt-3'>
            <div className='flex justify-between text-base font-medium'>
              <span>Total</span>
              <span>
                ${total.toFixed(2)} {event.currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de confirmación */}
      <div className='flex justify-end'>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className={`
            inline-flex items-center justify-center px-6 py-3 border border-transparent
            text-base font-medium rounded-md shadow-sm text-white bg-blue-600
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-blue-500 transition-colors duration-200 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
            min-w-[200px]
          `}
        >
          {isProcessing ? (
            <>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
              Generando entradas...
            </>
          ) : (
            <>
              <CloudDownload className='mr-2 h-5 w-5' />
              Descargar boletos
            </>
          )}
        </button>
      </div>
    </div>
  )
}
