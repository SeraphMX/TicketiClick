'use client'
// components/checkout/OtpVerification.tsx
// Componente de verificación OTP

import { ArrowLeft, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

interface OtpVerificationProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

export default function OtpVerification({ email, onVerified, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

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
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Mover al siguiente input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Verificar código completo
    if (newOtp.join('') === '123456') {
      setIsVerified(true)
      setTimeout(onVerified, 1500)
    }
  }

  // Manejar backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  // Simular reenvío de código
  const handleResend = () => {
    setTimeLeft(30)
    setCanResend(false)
    alert('Se ha enviado un nuevo código a tu correo')
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
        <p className='text-sm text-gray-600 mb-4'>
          Hemos enviado un código de verificación a
          <br />
          <span className='font-medium text-gray-900'>{email}</span>
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
              disabled={isVerified}
            />
          ))}
        </div>

        {/* Mensaje de verificación exitosa */}
        {isVerified && (
          <div className='flex items-center justify-center text-green-600 mb-4'>
            <Check className='h-5 w-5 mr-2' />
            <span>Código verificado correctamente</span>
          </div>
        )}

        {/* Reenviar código */}
        {!isVerified && (
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
