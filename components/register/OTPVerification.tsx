import { userService } from '@/services/userService'
import { setOtpVerified } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { Alert, InputOtp, Spinner } from '@heroui/react'
import { motion } from 'framer-motion'
import { CircleCheckBig, Phone, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

const OTPVerification = () => {
  const { handleStep, previousStep, nextStep } = useWizard()
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const OTPVerified = useSelector((state: RootState) => state.register.otpVerified)
  const dispatch = useDispatch()

  const [otpCode, setOtpCode] = useState('')

  const handleVerifyOTP = async () => {
    setIsVerifying(true)
    setError(null)
    // Verificar si estamos en modo desarrollo
    const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
    try {
      if (isDevMode) {
        console.log('Modo desarrollo activo, omitiendo verificación real de OTP')

        // Simulación de verificación exitosa
        setTimeout(() => {
          if (otpCode !== '123456') {
            // Simula un código OTP correcto
            setError('Código OTP inválido')
            setOtpCode('')
            setIsVerifying(false)
            return
          }

          setIsVerifying(false)
          dispatch(setOtpVerified(true)) // Actualiza el estado de verificación del OTP

          setTimeout(() => {
            console.log('Avanzando al siguiente paso del wizard')
            nextStep() // Avanza al siguiente paso del wizard
          }, 1000)
        }, 2000)
        return
      } else {
        const verifyOtp = await userService.verifyOTP(signUpData.metadata.phone, otpCode)

        if (verifyOtp.error) {
          console.log(verifyOtp.error)
          setError(verifyOtp.error)
          setOtpCode('')
          setIsVerifying(false)
          return
        }

        if (!verifyOtp.success) {
          setError('Código OTP inválido')
          setOtpCode('')
          setIsVerifying(false)
          return
        }

        if (verifyOtp.status === 'approved') {
          console.log('OTP verificado correctamente')
          setIsVerifying(false)
          dispatch(setOtpVerified(true)) // Actualiza el estado de verificación del OTP
          setTimeout(() => {
            nextStep() // Avanza al siguiente paso del wizard
          }, 1000)
          return
        }
      }
    } catch (error) {
      console.error('Error al verificar OTP:', error)
      setIsVerifying(false)
    }
  }

  const handleResendOTP = async () => {
    // Aquí iría la lógica para reenviar el OTP

    if (!canResend) {
      console.warn('No se puede reenviar el OTP aún. Espera a que se complete el tiempo de espera.')
      return
    }
    setTimeLeft(30)
    setCanResend(false)
    setIsVerifying(false)
    setError(null)
    setOtpCode('') // Limpia el campo de OTP

    const resendOtp = await userService.sendOTP(signUpData.metadata.phone)
  }

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

  useEffect(() => {
    dispatch(setOtpVerified(false))
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className='space-y-4 bg-white p-6 rounded-lg rounded-t-none shadow-md w-full max-w-md mx-auto'
    >
      <h1 className='text-2xl font-bold  text-center'>Verificación</h1>

      <div className='text-center'>
        <div className='flex items-center justify-center mb-4'>
          <Phone className='h-12 w-12 text-blue-600' />
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Hemos enviado un código al número
          <br />
          <span className='text-xl font-semibold text-gray-900'> {signUpData.metadata.phone} </span>
        </p>

        {/* Inputs OTP */}
        <div className='flex flex-col items-center justify-center gap-2 mb-6'>
          <InputOtp
            length={6}
            value={otpCode}
            onValueChange={setOtpCode}
            size='lg'
            autoFocus
            disabled={isVerifying || OTPVerified}
            onComplete={handleVerifyOTP}
            //errorMessage={error ? 'Código OTP inválido' : undefined}
          />
          {isVerifying && (
            <div className='flex items-center justify-center gap-2 mt-4'>
              <Spinner size='sm' variant='default' />
              <p className='text-blue-600'>Verificando código...</p>
            </div>
          )}

          {OTPVerified && (
            <div className='flex items-center justify-center gap-2 mt-4 text-green-600'>
              <CircleCheckBig />
              <span>Código verificado</span>
            </div>
          )}
          {error && (
            <div className='flex items-center justify-center gap-2 mt-4 text-red-500'>
              <TriangleAlert />
              <span>{error}</span>
            </div>
          )}
        </div>
        {!OTPVerified && !isVerifying && (
          <p className='text-sm text-gray-500 text-balance'>
            Si no recibiste el código, puedes cambiar tu número de teléfono volviendo al paso anterior o{' '}
            {timeLeft > 0 && `esperar ${timeLeft} segundos para `}
            <button type='button' className='text-blue-600 hover:text-blue-500 focus:outline-none' onClick={handleResendOTP}>
              reintentarlo
            </button>
            .
          </p>
        )}
      </div>
      {/* Información de desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className=' border-t border-gray-100'>
          <Alert
            classNames={{ alertIcon: 'fill-none' }}
            icon={<TriangleAlert />}
            color='warning'
            title='Modo de desarrollo activo'
            variant='flat'
            className='text-sm'
          >
            El código para verificación es: 123456
          </Alert>
        </div>
      )}
      <div className='flex justify-between'>
        <Button color='danger' variant='light' onPress={previousStep}>
          Atras
        </Button>
        {/* <Button color='primary' onPress={nextStep} isDisabled={!OTPVerified || isVerifying}>
          Siguiente
        </Button> */}
      </div>
    </motion.section>
  )
}

export default OTPVerification
