'use client'

import { useCategories } from '@/hooks/useCategories'
import { useDispatch } from '@/hooks/useReduxHooks'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { setSelectedEvent } from '@/store/slices/eventsSlice'
import { CalendarDays, ChevronDown, ChevronUp, Clock, Facebook, Info, Link2, MapPin, Minus, Plus, Tag, Twitter, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EventWithQuantity extends Event {
  quantity: number
}

export default function EventDetailClient({ event }: { event: Event }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [showFeeDetails, setShowFeeDetails] = useState(false)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)

  // Calcular costos
  const subtotal = event.price * quantity
  const serviceFee = subtotal * 0.1 // 10% cargo por servicio
  const paymentFee = subtotal * 0.05 // 5% comisión bancaria
  const ticketFee = 10 * quantity // $10 por boleto
  const total = subtotal + serviceFee + paymentFee + ticketFee - couponDiscount

  const { categories } = useCategories()
  const category = categories.find((cat) => cat.slug === event.category)

  // Función para verificar cupón
  const validateCoupon = () => {
    // Simulación de validación de cupón
    if (couponCode.toLowerCase() === 'first10') {
      setCouponDiscount(total * 0.1) // 10% de descuento
      setCouponError('')
    } else {
      setCouponError('Cupón inválido')
      setCouponDiscount(0)
    }
  }

  // Función para incrementar cantidad
  const incrementQuantity = () => {
    if (quantity < event.availableTickets) {
      setQuantity(quantity + 1)
    }
  }

  // Función para decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Función para ir al checkout
  const handlePurchase = () => {
    dispatch(setSelectedEvent({ ...event, quantity } as EventWithQuantity))
    router.push(`/event/${event.slug}/checkout`)
  }

  // URLs para compartir
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `¡Mira este evento: ${event.title}!`
  const encodedShareText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)

  // Funciones para compartir
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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {/* Imagen principal */}
        <div className='relative h-80 md:h-96'>
          <img src={event.image} alt={event.title} className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black opacity-60'></div>
          <div className='absolute bottom-0 p-6 text-white w-full'>
            <div className='flex justify-between items-end'>
              <div>
                <h1 className='text-3xl md:text-4xl font-bold mb-2'>{event.title}</h1>
                <div className='flex flex-wrap items-center gap-3'>
                  <span className='inline-flex items-center bg-blue-600 px-2.5 py-0.5 rounded-full text-sm font-medium'>
                    {category?.name}
                  </span>
                  <span className='inline-flex items-center'>
                    <CalendarDays className='h-4 w-4 mr-1' />
                    {formatDate(event.date)}
                  </span>
                  <span className='inline-flex items-center'>
                    <Clock className='h-4 w-4 mr-1' />
                    {formatTime(event.time)}
                  </span>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
          {/* Información del evento */}
          <div className='md:col-span-2 space-y-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Acerca del evento</h2>
              <div className='text-gray-600 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>

            <div className='border-t border-gray-200 pt-6'>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>Detalles</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex items-start'>
                  <CalendarDays className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Fecha</p>
                    <p className='text-gray-600'>{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Clock className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Hora</p>
                    <p className='text-gray-600'>{formatTime(event.time)}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <MapPin className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Ubicación</p>
                    <p className='text-gray-600'>{event.location}</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Tag className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Categoría</p>
                    <p className='text-gray-600'>{category?.name} </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Users className='h-5 w-5 mr-3 text-blue-600 mt-0.5' />
                  <div>
                    <p className='font-medium'>Boletos disponibles</p>
                    <p className='text-gray-600'>{event.availableTickets}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comprar boletos */}
          <div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Comprar boletos</h2>

            <div className='mb-6'>
              <p className='text-lg font-bold text-blue-700 mb-1'>
                {event.price.toFixed(2)} {event.currency}
              </p>
              <p className='text-sm text-gray-500'>por boleto</p>
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

            <div className='mb-6 space-y-3'>
              <p className='text-gray-600 flex justify-between'>
                <span>Subtotal:</span>
                <span>
                  {subtotal.toFixed(2)} {event.currency}
                </span>
              </p>

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
                      <button onClick={validateCoupon} className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700'>
                        Aplicar
                      </button>
                    </div>
                    {couponError && <p className='text-sm text-red-600'>{couponError}</p>}
                    {couponDiscount > 0 && (
                      <p className='text-sm text-green-600'>
                        Descuento aplicado: -{couponDiscount.toFixed(2)} {event.currency}
                      </p>
                    )}
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
                  ? 'Comprar boleto'
                  : `Comprar ${quantity} boletos`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
