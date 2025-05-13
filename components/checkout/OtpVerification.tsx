// components/checkout/OtpVerification.tsx
// Componente de verificación OTP

import { useDispatch } from '@/hooks/useReduxHooks'
import { setOtpVerified } from '@/store/slices/checkoutSlice'
import { ArrowLeft, Check, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'

interface OtpVerificationProps {
  phone: string
  onVerified: () => void
  onBack: () => void
}

export default function OtpVerification({ phone, onVerified, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  // Timer para reenvío
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Manejar cambio en inputs
  const handleChange = async (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError(null)

    // Mover al siguiente input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Verificar código completo
    const completeOtp = newOtp.join('')
    if (completeOtp.length === 6) {
      try {
        setIsVerifying(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            phone,
            code: completeOtp
          })
        })

        const data = await response.json()

        if (data.success) {
          setIsVerified(true)
          dispatch(setOtpVerified(true))
          setTimeout(onVerified, 1500)
        } else {
          setError('Código inválido. Por favor, intenta de nuevo.')
          // Limpiar inputs
          setOtp(['', '', '', '', '', ''])
          document.getElementById('otp-0')?.focus()
        }
      } catch (error) {
        console.error('Error verifying OTP:', error)
        setError('Error al verificar el código')
      } finally {
        setIsVerifying(false)
      }
    }
  }

  // Manejar backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  // Reenviar código
  const handleResend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          phone
        })
      })

      if (response.ok) {
        setTimeLeft(30)
        setCanResend(false)
        setError(null)
      } else {
        throw new Error('Error al enviar el código de verificación')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error al enviar el código de verificación')
    }
  }

  // Formatear número de teléfono
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center'>
        <button onClick={onBack} className='mr-4 text-gray-500 hover:text-gray-700'>
          <ArrowLeft className='h-5 w-5' />
        </button>
        <h2 className='text-xl font-bold text-gray-900'>Verificación</h2>
      </div>

      <div className='text-center'>
        <div className='flex items-center justify-center mb-4'>
          <Phone className='h-12 w-12 text-blue-600' />
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Hemos enviado un código de verificación al número
          <br />
          <span className='font-medium text-gray-900'>{formatPhone(phone)}</span>
        </p>

        {/* Inputs OTP */}
        <div className='flex justify-center gap-2 mb-6'>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg
                ${isVerified ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
              `}
              disabled={isVerified || isVerifying}
            />
          ))}
        </div>

        {/* Estado de verificación */}
        {isVerifying && (
          <div className='flex items-center justify-center text-blue-600 mb-4'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2'></div>
            <span>Verificando código...</span>
          </div>
        )}

        {isVerified && (
          <div className='flex items-center justify-center text-green-600 mb-4'>
            <Check className='h-5 w-5 mr-2' />
            <span>Código verificado correctamente</span>
          </div>
        )}

        {error && <div className='text-red-600 mb-4'>{error}</div>}

        {/* Reenviar código */}
        {!isVerified && !isVerifying && (
          <div className='text-sm'>
            {canResend ? (
              <button onClick={handleResend} className='text-blue-600 hover:text-blue-800'>
                Reenviar código
              </button>
            ) : (
              <p className='text-gray-500'>Reenviar código en {timeLeft} segundos</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
