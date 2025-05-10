'use client'
import { useSelector } from '@/hooks/useReduxHooks'
import { RootState } from '@/store/store'
import { loadStripe } from '@stripe/stripe-js'
import { ArrowLeft, ChevronRight, CreditCard } from 'lucide-react'
import { useState } from 'react'

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

export default function PaymentMethod({ formData, onSubmit, onBack }: PaymentMethodProps) {
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const [selectedMethod, setSelectedMethod] = useState(formData.paymentMethod || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMethod || !selectedEvent) return

    setIsProcessing(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      // Create payment intent with the event's stripe_id
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: selectedEvent.price * 100, // Convert to cents
          currency: selectedEvent.currency.toLowerCase(),
          stripe_id: selectedEvent.stripe_id
        })
      })

      if (!response.ok) throw new Error('Failed to create payment intent')

      const { clientSecret } = await response.json()

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Here you would normally use stripe.elements()
            // For this example, we'll just show a success
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2024,
            cvc: '123'
          }
        }
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      onSubmit(selectedMethod)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
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

                {method.id === 'card' && selectedMethod === 'card' && (
                  <div className='mt-4 pl-7'>
                    <div className='grid grid-cols-6 gap-4'>
                      <div className='col-span-4'>
                        <label className='block text-sm font-medium text-gray-700'>Número de tarjeta</label>
                        <input
                          type='text'
                          placeholder='4242 4242 4242 4242'
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                      </div>
                      <div className='col-span-1'>
                        <label className='block text-sm font-medium text-gray-700'>MM/AA</label>
                        <input
                          type='text'
                          placeholder='12/24'
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                      </div>
                      <div className='col-span-1'>
                        <label className='block text-sm font-medium text-gray-700'>CVV</label>
                        <input
                          type='text'
                          placeholder='123'
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={!selectedMethod || isProcessing}
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
