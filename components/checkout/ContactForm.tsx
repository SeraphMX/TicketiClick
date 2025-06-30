import { useDispatch } from '@/hooks/useReduxHooks'
import { userService } from '@/services/userService'
import { setContactInfo } from '@/store/slices/checkoutSlice'
import { RootState } from '@/store/store'
import { Alert, Checkbox } from '@heroui/react'
import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ContactFormData {
  email: string
  phone: string
  createAccount: boolean
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const [existingUser, setExistingUser] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { nextStep } = useWizard()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ContactFormData>({
    defaultValues: {
      email: user?.email || '',
      phone: user?.phone || '',
      createAccount: false
    }
  })

  const handlePhoneBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const phone = event.target.value
    if (!phone) return

    const isPhoneRegistered = await userService.isPhoneRegistered(phone)

    console.log('Handling phone blur event', isPhoneRegistered)

    if (isPhoneRegistered) {
      setExistingUser(true)
    } else {
      setExistingUser(false)
    }
  }

  const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value
    if (!email) return

    const isEmailRegistered = await userService.isEmailRegistered(email)
    if (isEmailRegistered) {
      setExistingUser(true)
    } else {
      setExistingUser(false)
    }
  }

  const handleFormSubmit = async (data: ContactFormData) => {
    let hasError = false

    try {
      if (hasError) return // Si hay errores, no continuamos

      if (isDevMode) {
        console.warn('Modo desarrollo: omitiendo verificación envio de OTP')
      } else {
        //Verificamos si el número de teléfono es válido
        const verifyNumber = await userService.VerifyMobileNumber(data.phone)

        //Respuesta tipo : {isValid: true, isMobile: false, countryCode: "MX"}
        if (!verifyNumber.isValid || !verifyNumber.isMobile) {
          setError('phone', { type: 'manual', message: 'Ingresa un número de teléfono móvil válido' })
          hasError = true
        }

        // Enviamos el OTP al número de teléfono
        await userService.sendOTP(data.phone)
      }

      // Actualizar el estado en Redux
      dispatch(setContactInfo(data))

      onSubmit(data)
      nextStep()
    } catch (error) {
      console.error('Error:', error)
      if (error instanceof Error) {
        alert(error.message || 'Error al procesar la solicitud. Por favor, intenta de nuevo.')
      } else {
        alert('Error al procesar la solicitud. Por favor, intenta de nuevo.')
      }
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4 '>
        <div>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Datos de contacto</h2>

          <div className='space-y-4'>
            {/* Teléfono */}
            <Input
              type='tel'
              label='Teléfono móvil'
              {...register('phone', {
                required: 'El teléfono es obligatorio',
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: 'Ingresa un número de teléfono válido'
                }
              })}
              maxLength={10}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
              onBlur={handlePhoneBlur}
            />

            <Input
              type='email'
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              label='Correo electrónico'
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              maxLength={254}
              onBlur={handleEmailBlur}
            />

            {/* Crear cuenta */}

            {!user && !existingUser && (
              <Checkbox {...register('createAccount')} classNames={{ label: 'text-sm text-gray-700' }}>
                Crear una cuenta (opcional)
              </Checkbox>
            )}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button type='submit' color='primary'>
            Continuar
          </Button>
        </div>
        {/* Mensaje de modo desarrollo */}
        {isDevMode && (
          <div className=' border-t border-gray-100'>
            <Alert
              classNames={{ alertIcon: 'fill-none' }}
              icon={<TriangleAlert />}
              color='warning'
              title='Modo de desarrollo activo'
              variant='flat'
              className='text-sm'
              hideIconWrapper
            >
              El código OTP no será enviado
            </Alert>
          </div>
        )}
      </form>
    </motion.section>
  )
}
