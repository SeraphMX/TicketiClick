'use client'
import { verifyEmail } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
interface VerifyEmailProps {
  email?: string | null
}

const VerifyEmailClient = ({ email }: VerifyEmailProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [lockEmail, setLockEmail] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(verifyEmail),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  })

  const handleResendEmailVerification = handleSubmit(
    async (data) => {
      setIsLoading(true)
      setLockEmail(true)
      try {
        // Verificamos si el correo electrónico ya esta registrado
        const isEmailRegistered = await userService.isEmailRegistered(data.email)
        if (!isEmailRegistered) {
          setError('email', { type: 'manual', message: 'Este correo no está registrado en nuestra plataforma' })
          setLockEmail(false)
          return
        }

        await userService.sendEmail(data.email, 'verify-account')

        addToast({
          title: 'Verificación reenviada',
          description: 'El correo de verificación ha sido reenviado exitosamente.',
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          color: 'success'
        })
      } catch (error) {
        addToast({
          title: 'Error al reenviar verificación',
          description: 'No se pudo reenviar el correo de verificación. Por favor, inténtalo de nuevo.',
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          color: 'danger'
        })
        setLockEmail(false)
      } finally {
        setIsLoading(false)
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )

  const handleGoToAccount = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    if (email) {
      const verifyEmailStatus = async () => {
        await userService.VerifyEmail(email)
      }
      verifyEmailStatus()
    }
  }, [email])

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
      {!email ? (
        <section className='space-y-4'>
          {!lockEmail ? (
            <>
              <h1 className='text-2xl font-bold text-center'>Verificacion no realizada </h1>
              <p className='text-gray-600 text-sm'>
                El enlace de verificación ha expirado o no es válido. Por favor, solicita un nuevo enlace para intentarlo otra vez.
              </p>
            </>
          ) : (
            <>
              <h1 className='text-2xl font-bold text-center'>Verificacion reenviada </h1>
              <p className='text-gray-600 text-sm'>
                Enviaremos un enlace de verificación nuevo a tu correo electrónico. Por favor, revisa tu bandeja de entrada, si no
                encuentras el correo, revisa tu carpeta de spam o correo no deseado.
              </p>
            </>
          )}
          <form className='flex flex-col justify-center items-end gap-2' onSubmit={handleResendEmailVerification}>
            <Input
              {...register('email')}
              label='Correo electrónico'
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              fullWidth
              autoFocus
              isDisabled={lockEmail}
            />
            <Button variant='ghost' color='primary' type='submit' isLoading={isLoading} isDisabled={lockEmail}>
              Reenviar verificación
            </Button>
          </form>
        </section>
      ) : (
        <section className='space-y-4'>
          <h1 className='text-2xl font-bold text-center'>¡Correo verificado!</h1>
          <p className='text-gray-600'>
            Tu correo <strong>{email}</strong> ha sido verificado correctamente. Puedes cerrar esta ventana o
            <Link href='/login' className='text-blue-600 hover:text-blue-500'>
              {' '}
              iniciar sesión
            </Link>{' '}
            para acceder a tu cuenta.
          </p>
          <div className='flex justify-end'>
            <Button variant='ghost' color='primary' onPress={handleGoToAccount}>
              Ir a mi cuenta
            </Button>
          </div>
        </section>
      )}
    </motion.section>
  )
}

export default VerifyEmailClient
