import { createUser } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { setEmailPhoneTerms } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { Alert, Checkbox } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ContactForm = () => {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const { nextStep } = useWizard()
  const dispatch = useDispatch()
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const [existingUser, setExistingUser] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    setError,
    setValue,

    formState: { errors }
  } = useForm({
    resolver: zodResolver(createUser),
    mode: 'onSubmit',
    defaultValues: {
      phone: signUpData.metadata.phone || '',
      email: signUpData.email || '',
      terms: signUpData.terms || false
    }
  })

  const watchEmail = watch('email')
  const watchPhone = watch('phone')

  const handleCreateAccount = handleSubmit(
    async (data) => {
      let hasError = false
      // Verificar si estamos en modo desarrollo
      const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
      setExistingUser(false)
      try {
        //Verificamos si el teléfono ya esta registrado
        const isPhoneRegistered = await userService.isPhoneRegistered(data.phone)
        if (isPhoneRegistered) {
          setError('phone', { type: 'manual', message: 'Este número ya esta registrado' })
          setExistingUser(true)
          hasError = true
        }

        // Verificamos si el correo electrónico ya esta registrado
        const isEmailRegistered = await userService.isEmailRegistered(data.email)
        if (isEmailRegistered) {
          setError('email', { type: 'manual', message: 'Este correo electrónico ya está registrado' })
          setExistingUser(true)
          hasError = true
        }

        //Verificamos si el número de teléfono es válido
        const verifyNumber = await userService.VerifyMobileNumber(data.phone)

        //Respuesta tipo : {isValid: true, isMobile: false, countryCode: "MX"}
        if (!verifyNumber.isValid || !verifyNumber.isMobile) {
          setError('phone', { type: 'manual', message: 'Ingresa un número de teléfono móvil válido' })
          setExistingUser(true)
          hasError = true
        }
        if (hasError) return // Si hay errores, no continuamos

        if (isDevMode) {
          console.warn('Modo desarrollo: omitiendo verificación envio de OTP')
        } else {
          // Si no estamos en modo desarrollo, enviamos el OTP al número de teléfono
          await userService.sendOTP(data.phone)
        }

        dispatch(setEmailPhoneTerms({ email: data.email, phone: data.phone, terms: data.terms }))
        nextStep() // Avanza al siguiente paso del wizard
      } catch (error) {
        console.error('Error al crear la cuenta:', error)
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )

  useEffect(() => {
    if (existingUser) {
      setExistingUser(false)
      setValue('terms', false) // resetear terms al mostrar el checkbox nuevamente
    }
  }, [watchEmail, watchPhone])

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
      <form className='space-y-4 bg-white p-6 rounded-lg rounded-t-none shadow-md w-full' onSubmit={handleCreateAccount}>
        <h1 className='text-2xl font-bold text-center '>¡Regístrate en Ticketi!</h1>
        <p className='mt-4 text-sm text-gray-600'>
          Para crear tu cuenta primero tenemos que verificar tus medios de contacto, esto nos asegura poder comunicarnos contigo.
        </p>
        <Input
          {...register('phone')}
          type='tel'
          label='Teléfono móvil'
          isInvalid={!!errors.phone}
          maxLength={10}
          errorMessage={errors.phone?.message}
        />
        <Input {...register('email')} label='Correo electrónico' isInvalid={!!errors.email} errorMessage={errors.email?.message} />
        {!existingUser ? (
          <>
            <div className='flex items-center'>
              <Checkbox {...register('terms')} isInvalid={!!errors.terms} />
              <div className='text-xs text-gray-700'>
                Al crear tu cuenta aceptas los{' '}
                <a href='/terminos-y-condiciones' target='_blank' className='text-blue-600 hover:text-blue-500'>
                  términos y condiciones
                </a>{' '}
                y confirmas haber leído nuestro{' '}
                <a href='/privacidad' target='_blank' className='text-blue-600 hover:text-blue-500'>
                  aviso de privacidad
                </a>
              </div>
            </div>
            <div>{errors.terms && <span className='text-red-500 text-xs mt-0'>{errors.terms.message}</span>}</div>
          </>
        ) : (
          <div className='text-gray-600 text-center text-xs'>
            <p>
              Parece que ya existe una cuenta con este correo electrónico o número de teléfono. Por favor, intenta{' '}
              <Link href='/login' className='text-blue-600 hover:text-blue-500'>
                iniciar sesión
              </Link>{' '}
              o utiliza otro correo/número.
            </p>
          </div>
        )}
        <div className='flex items-center justify-end mt-4'>
          <Button color='primary' type='submit' isDisabled={!!errors.phone || !!errors.email || !!errors.terms || existingUser}>
            Iniciar verificación
          </Button>
        </div>
        {/* Información de desarrollo */}
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

export default ContactForm
