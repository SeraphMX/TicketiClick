'use client'

import { useCategories } from '@/hooks/useCategories'
import { usePriceCalculator } from '@/hooks/usePriceCalculator'
import { useDispatch } from '@/hooks/useReduxHooks'
import { validateCoupon } from '@/lib/couponValidator'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { applyCoupon, setSelectedQuantity } from '@/store/slices/checkoutSlice'
import { setSelectedEvent } from '@/store/slices/eventsSlice'
import { RootState } from '@/store/store'
import { CalendarDays, ChevronDown, ChevronUp, Clock, Facebook, Info, Link2, Lock, MapPin, Minus, Plus, Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useSelector } from 'react-redux'
interface EventWithQuantity extends Event {
  quantity: number
}

export default function EventDetailClient({ event }: { event: Event }) {
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [showFeeDetails, setShowFeeDetails] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [showCouponInput, setShowCouponInput] = useState(false)
  const { categories } = useCategories()
  const [validCoupon, setValidCoupon] = useState(false)
  const category = categories.find((cat) => cat.slug === event.category)

  const checkout = useSelector((state: RootState) => state.checkout)

  const dispatch = useDispatch()

  const { subtotal, discount, serviceFee, paymentFee, ticketFee, total } = usePriceCalculator({
    quantity,
    unitPrice: event.price,
    coupon: checkout.coupon
  })

  // Cuando cambia la cantidad, también actualizar el descuento para mantener coherencia

  const incrementQuantity = () => {
    if (quantity < event.availableTickets) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleValidateCoupon = () => {
    const result = validateCoupon(couponCode) // Devuelve { code, discount, isPercentage, isApplied }

    if (result.isApplied) {
      dispatch(
        applyCoupon({
          code: result.code,
          discount: result.discount,
          isPercentage: result.isPercentage,
          isApplied: true,
          error: undefined
        })
      )
    } else {
      dispatch(
        applyCoupon({
          code: '',
          discount: 0,
          isPercentage: false,
          isApplied: false,
          error: 'Cupón inválido'
        })
      )
    }
  }

  const handlePurchase = () => {
    dispatch(setSelectedEvent({ ...event, quantity } as EventWithQuantity))
    dispatch(setSelectedQuantity(quantity))

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(`/event/${event.slug}/checkout`)
      })
    } else {
      router.push(`/event/${event.slug}/checkout`)
    }
  }

  // URLs para compartir
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `¡Mira este evento: ${event.title}!`
  const encodedShareText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)

  const handleShare = async (platform: string) => {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`, '_blank')
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl)
          alert('¡Enlace copiado!')
        } catch (err) {
          console.error('Error al copiar:', err)
        }
        break
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10'>
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        {/* Imagen principal */}
        <div className='relative '>
          <img
            src={event.image}
            alt={event.title}
            className='w-full h-1/2 object-cover '
            style={{ viewTransitionName: `event-image-${event.slug}` }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black opacity-90'></div>
          <div className='absolute bottom-0 p-4 text-white w-full'>
            <div className='md:flex justify-between items-end space-y-3'>
              <div>
                <h1 className='text-3xl md:text-4xl font-bold mb-2 '>{event.title}</h1>
                <div className='flex flex-wrap items-center gap-3'>
                  <span className='inline-flex items-center bg-blue-600 px-2.5 py-0.5 rounded-full text-sm font-medium'>
                    {category?.name}
                  </span>
                  <span className='inline-flex items-center'>
                    <CalendarDays className='h-4 w-4 mr-1' />
                    {event.date ? formatDate(event.date) : 'Próximamente'}
                  </span>
                  {event.date && (
                    <span className='inline-flex items-center'>
                      <Clock className='h-4 w-4 mr-1' />
                      {formatTime(event.time)}
                    </span>
                  )}
                </div>
              </div>
              <div className='flex gap-2 items-center '>
                <span>Compartir evento</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className='p-2 hover:bg-blue-600 rounded-full transition-colors'
                  title='Compartir en Facebook'
                >
                  <Facebook className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className='p-2 hover:bg-blue-600 rounded-full transition-colors'
                  title='Compartir en Twitter'
                >
                  <Twitter className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className='p-2 hover:bg-blue-600 rounded-full transition-colors'
                  title='Copiar enlace'
                >
                  <Link2 className='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-2 mdd:p-6'>
          {/* Información del evento */}
          <div className='md:col-span-2 space-y-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Acerca del evento</h2>
              <div className='text-gray-600 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>

            <div className='border-t border-gray-200 pt-6'>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>Detalles</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8'>
                <div className='flex items-start'>
                  <CalendarDays className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Fecha</p>
                    <p className='text-gray-600'>{event.date ? formatDate(event.date) : 'Próximamente'}</p>
                  </div>
                </div>

                {event.date && (
                  <div className='flex items-start'>
                    <Clock className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                    <div>
                      <p className='font-medium'>Hora</p>
                      <p className='text-gray-600'>{formatTime(event.time)}</p>
                    </div>
                  </div>
                )}

                {event.date && (
                  <div className='flex items-start'>
                    <MapPin className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                    <div>
                      <p className='font-medium'>Ubicación</p>
                      <p className='text-gray-600'>{event.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comprar boletos */}
          <div className='bg-blue-50 p-2 md:p-6 rounded-lg shadow-sm relative'>
            {!event.date && (
              <div className='absolute  bg-white/50  h-full  w-full z-50 top-0 right-0 p-2 text-gray-500 hover:text-gray-700 cursor-pointer backdrop-blur-sm flex flex-col items-center justify-center'>
                <Lock size={40} />
                Venta de boletos deshabilitada
              </div>
            )}
            <h2 className='text-xl font-bold text-gray-800 mb-4'>{event.price === 0 ? 'Obtener' : 'Comprar'} boletos</h2>

            <div className='mb-6 gap-2'>
              <span className='text-lg font-bold text-blue-700 mb-1'>
                {event.price === 0 ? (
                  'Gratuito'
                ) : (
                  <>
                    {`${event.price.toFixed(2)} ${event.currency}`}
                    <span className='text-sm text-gray-500 ml-2'>por boleto</span>
                  </>
                )}
              </span>
              <p className='text-sm text-gray-400'>Quedan {event.availableTickets} entradas.</p>
            </div>

            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Cantidad de boletos</label>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className='p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Minus className='h-4 w-4' />
                </button>
                <span className='text-lg font-medium'>{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= event.availableTickets}
                  className='p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Plus className='h-4 w-4' />
                </button>
              </div>
            </div>

            {event.price !== 0 && (
              <div className='mb-6 space-y-3'>
                <p className='text-gray-600 flex justify-between'>
                  <span>Subtotal:</span>
                  <span>
                    {subtotal.toFixed(2)} {event.currency}
                  </span>
                </p>

                {discount > 0 && (
                  <div className='flex justify-between items-center bg-green-100 p-3 rounded-md'>
                    <p className='text-sm text-green-600'>Descuento aplicado:</p>
                    <p className='text-sm text-green-600'>
                      -{discount.toFixed(2)} {event.currency}
                    </p>
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
                      {(serviceFee + paymentFee + ticketFee).toFixed(2)} {event.currency}
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

                {/* Cupón de descuento */}
                <div className='border-t border-gray-200 pt-3'>
                  {!showCouponInput ? (
                    <button onClick={() => setShowCouponInput(true)} className='text-sm text-blue-600 hover:text-blue-800'>
                      ¿Tienes un cupón?
                    </button>
                  ) : (
                    <div className='space-y-2'>
                      <div className='flex gap-2'>
                        <input
                          type='text'
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder='Ingresa tu código'
                          className='flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm'
                        />
                        <button
                          disabled={discount > 0}
                          onClick={handleValidateCoupon}
                          className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          Aplicar
                        </button>
                      </div>

                      {checkout.coupon.error && <p className='text-sm text-red-600'>{checkout.coupon.error}</p>}
                    </div>
                  )}
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <p className='text-lg font-bold flex justify-between'>
                    <span>Total:</span>
                    <span>
                      {total.toFixed(2)} {event.currency}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handlePurchase}
              disabled={event.availableTickets < quantity}
              className={`
                w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${event.availableTickets < quantity ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {event.availableTickets < quantity
                ? 'No hay suficientes boletos'
                : quantity === 1
                  ? `${event.price !== 0 ? 'Comprar' : 'Registrar'} boleto`
                  : `${event.price !== 0 ? 'Comprar' : 'Registrar'} ${quantity} boletos`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
