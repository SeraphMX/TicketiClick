import { verifyEmail, verifyPhone } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { setEmail, setPhone } from '@/store/slices/recoverAccountSlice'
import { addToast, Tab, Tabs } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SelectRecoverMethod = () => {
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)
  const [disabledSendMail, setDisabledSendMail] = useState(false)
  const [isLoadingPhone, setIsLoadingPhone] = useState(false)
  const [disabledSendPhone, setDisabledSendPhone] = useState(false)
  const { handleStep, previousStep, nextStep, goToStep } = useWizard()
  const router = useRouter()
  const dispatch = useDispatch()
  //const [method, setMethod] = useState<'email' | 'phone'>('email')

  // FORMULARIO EMAIL
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    setError: setErrorEmail,
    formState: { errors: errorsEmail },
    watch: watchEmail,
    reset: resetEmail
  } = useForm({
    resolver: zodResolver(verifyEmail),
    mode: 'onSubmit',
    defaultValues: { email: '' }
  })

  const watchMail = watchEmail('email')

  const onSubmitEmail = handleSubmitEmail(async (data) => {
    setIsLoadingEmail(true)
    try {
      const isEmailRegistered = await userService.isEmailRegistered(data.email)
      if (!isEmailRegistered) {
        setErrorEmail('email', { type: 'manual', message: 'Este correo no está registrado en la plataforma' })
        return
      }
      dispatch(setEmail(data.email))
      await userService.sendEmail(data.email, 'password-reset')
      nextStep()
    } catch {
      addToast({ title: 'Error', description: 'Intenta de nuevo.', color: 'danger' })
    } finally {
      setIsLoadingEmail(false)
    }
  })

  useEffect(() => {
    // Deshabilitar el botón si el correo no es válido
    if (watchMail && !errorsEmail.email) {
      setDisabledSendMail(false)
    } else {
      setDisabledSendMail(true)
    }
  }, [watchMail, errorsEmail.email])

  // FORMULARIO PHONE
  const {
    register: registerPhone,
    handleSubmit: handleSubmitPhone,
    setError: setErrorPhone,
    formState: { errors: errorsPhone },
    watch: watchPhone,
    reset: resetPhone
  } = useForm({
    resolver: zodResolver(verifyPhone),
    mode: 'onSubmit',
    defaultValues: { phone: '' }
  })

  const watchPhoneNumber = watchPhone('phone')

  const onSubmitPhone = handleSubmitPhone(async (data) => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    setIsLoadingPhone(true)
    try {
      const isPhoneRegistered = await userService.isPhoneRegistered(data.phone)
      if (!isPhoneRegistered) {
        setErrorPhone('phone', { type: 'manual', message: 'Este teléfono no está registrado en la plataforma' })
        return
      }
      if (isDevMode) {
        console.log('Modo desarrollo activo, omitiendo envio de OTP')
        await delay(2000)
        console.log('Envío simulado exitoso')
      } else {
        await userService.sendOTP(data.phone)
      }

      dispatch(setPhone(data.phone))
      goToStep(2) // Asumiendo que el paso 2 es el de verificación de teléfono
    } catch {
      addToast({ title: 'Error', description: 'Intenta de nuevo.', color: 'danger' })
    } finally {
      setIsLoadingPhone(false)
    }
  })

  useEffect(() => {
    // Deshabilitar el botón si el teléfono no es válido
    if (watchPhoneNumber && !errorsPhone.phone) {
      setDisabledSendPhone(false)
    } else {
      setDisabledSendPhone(true)
    }
  }, [watchPhoneNumber, errorsPhone.phone])

  const handleBack = () => {
    router.back()
  }

  const resetForms = () => {
    resetEmail()
    resetPhone()
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
      className='space-y-4 bg-white p-6 rounded-lg rounded-t-none w-full max-w-md mx-auto'
    >
      <h1 className='text-2xl font-bold text-center'>Restablecer Contraseña</h1>
      <p className='text-gray-600 text-sm'>
        Para restablecer tu contraseña, elije un método de verificación. Puedes recibir un enlace por correo electrónico o un código por SMS
        en tu teléfono móvil.
      </p>
      <Tabs aria-label='opciones' color='primary' variant='underlined' fullWidth onSelectionChange={resetForms}>
        <Tab key='email' title='Correo electrónico'>
          <form onSubmit={onSubmitEmail} className='flex flex-col justify-center items-end gap-2'>
            <Input {...registerEmail('email')} label='Correo' isInvalid={!!errorsEmail.email} errorMessage={errorsEmail.email?.message} />
            <div className='flex justify-between w-full'>
              <Button variant='light' color='danger' onPress={handleBack} tabIndex={-1}>
                Regresar
              </Button>
              <Button type='submit' isLoading={isLoadingEmail} color='primary' isDisabled={disabledSendMail}>
                Restablecer con enlace
              </Button>
            </div>
          </form>
        </Tab>

        <Tab key='phone' title='Teléfono móvil'>
          <form onSubmit={onSubmitPhone} className='flex flex-col justify-center items-end gap-2'>
            <Input
              {...registerPhone('phone')}
              label='Teléfono'
              isInvalid={!!errorsPhone.phone}
              errorMessage={errorsPhone.phone?.message}
              maxLength={10}
            />
            <div className='flex justify-between w-full'>
              <Button variant='light' color='danger' onPress={handleBack} tabIndex={-1}>
                Regresar
              </Button>
              <Button type='submit' isLoading={isLoadingPhone} isDisabled={disabledSendPhone} color='primary'>
                Enviar mensaje
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </motion.section>
  )
}

export default SelectRecoverMethod
