'use client'
import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { setPaymentIntentId } from '@/store/slices/checkoutSlice'
import { RootState } from '@/store/store'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ArrowLeft, ChevronRight, CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentMethodProps {
  formData: {
    paymentMethod?: string
  }
  onSubmit: (method: string) => void
  onBack: () => void
}

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Tarjeta de crédito/débito',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard
  }
]

const PaymentForm = ({ formData, onSubmit, onBack }: PaymentMethodProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const checkoutData = useSelector((state: RootState) => state.checkout.contactInfo)
  const [selectedMethod, setSelectedMethod] = useState(formData.paymentMethod || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedMethod !== 'card') {
      setCardComplete(false)
    }
  }, [selectedMethod])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !selectedMethod || !selectedEvent) {
      setError('Revisa que todos los campos estén completos')
      return
    }

    if (selectedMethod === 'card' && !cardComplete) {
      setError('Completa los datos de la tarjeta')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const quantity = selectedEvent.quantity || 1
      const baseAmount = selectedEvent.price * quantity * 100 // Precio base en centavos por cantidad de boletos

      // Comisiones por boleto:
      const serviceFee = Math.round(baseAmount * 0.1) // 10% comisión de servicio
      const paymentFee = Math.round(baseAmount * 0.05) // 5% comisión método de pago
      const ticketFee = 1000 * quantity // $10 MXN en centavos por boleto

      // Total a cobrar:
      const totalAmount = baseAmount + serviceFee + paymentFee + ticketFee

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          buyer_email: checkoutData.email,
          buyer_phone: checkoutData.phone,
          event_id: selectedEvent.id,
          amount: totalAmount,
          currency: selectedEvent.currency.toLowerCase(),
          stripe_id: selectedEvent.stripe_id,
          quantity
        })
      })

      if (!response.ok) {
        throw new Error('Hubo un error al procesar el pago')
      }

      const { clientSecret, paymentIntentId } = await response.json()

      // Get card element
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error('Asegurate que los detalles de tu tarjeta son correctos')
      }

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      // Set paymentIntentId in redux state
      dispatch(setPaymentIntentId(paymentIntentId))

      onSubmit(selectedMethod)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ups... hubo un error al procesar el pago')
      console.error('Payment error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete)
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center'>
        <button onClick={onBack} className='mr-4 text-gray-500 hover:text-gray-700'>
          <ArrowLeft className='h-5 w-5' />
        </button>
        <h2 className='text-xl font-bold text-gray-900'>Método de pago</h2>
      </div>

      {error && <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-4'>
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon
            return (
              <div
                key={method.id}
                className={`
                  relative rounded-lg border-2 p-4 cursor-pointer transition-all
                  ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      type='radio'
                      name='payment-method'
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                    />
                  </div>
                  <div className='ml-3 flex items-center'>
                    <Icon className={`h-8 w-8 ${selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className='ml-3'>
                      <label className='block text-sm font-medium text-gray-900'>{method.name}</label>
                      <p className='text-sm text-gray-500'>{method.description}</p>
                    </div>
                  </div>
                </div>

                {selectedMethod === 'card' && method.id === 'card' && (
                  <div className='mt-4 pl-7'>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                            fontSmoothing: 'antialiased',
                            '::placeholder': {
                              color: '#aab7c4'
                            },
                            padding: '10px 12px'
                          },
                          invalid: {
                            color: '#9e2146',
                            iconColor: '#9e2146'
                          }
                        }
                      }}
                      onChange={handleCardChange}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={!stripe || !elements || !selectedMethod || isProcessing || (selectedMethod === 'card' && !cardComplete)}
            className={`
              inline-flex items-center justify-center px-4 py-2 border border-transparent 
              text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isProcessing ? (
              <>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Procesando...
              </>
            ) : (
              <>
                Continuar
                <ChevronRight className='ml-2 h-4 w-4' />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// Wrap the PaymentForm with Stripe Elements
export default function PaymentMethod(props: PaymentMethodProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
