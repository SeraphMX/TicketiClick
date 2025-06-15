'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// app/login/page.tsx
// Página de inicio de sesión actualizada para Supabase

import { useAuth } from '@/hooks/useAuth'
import { loginUser } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { Checkbox, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const { login, isLoading, user } = useAuth()
  const [userCanLogin, setUserCanLogin] = useState(true)
  const router = useRouter()
  const [loginAttempts, setLoginAttempts] = useState(0)

  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    setValue,

    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginUser),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  const handleSignIn = handleSubmit(
    async (data) => {
      setLoginError(null) // Reiniciar error de inicio de sesión
      try {
        const success = await login(data.email, data.password)

        if (!success) {
          //setLoginError('Credenciales incorrectas. Por favor, inténtalo de nuevo.')
          setLoginAttempts((prev) => prev + 1)
          const maxAttempts = 5
          const remainingAttempts = maxAttempts - loginAttempts - 1
          //TODO: Registrar el intento de inicio de sesión
          if (loginAttempts === maxAttempts - 1) {
            setLoginError('Has alcanzado el número máximo de intentos. Por favor, inténtalo más tarde o restablece tu contraseña.')
            setUserCanLogin(false)
            return
          }

          if (loginAttempts >= 2) {
            setLoginError(
              `Te ${remainingAttempts > 1 ? 'quedan' : 'queda solo un'} ${remainingAttempts && remainingAttempts} ${remainingAttempts > 1 ? 'intentos' : 'intento'} antes de que se bloquee el inicio de sesión.`
            )
            return
          }

          setError('password', {
            type: 'manual',
            message: 'Contraseña incorrecta'
          })
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )

  const handleUserExists = async (email: string) => {
    clearErrors('email')
    const userExists = await userService.isEmailRegistered(email)

    if (userExists) {
      setUserCanLogin(true)
    } else {
      setUserCanLogin(false)
      setError('email', {
        type: 'manual',
        message: 'Este correo electrónico no está registrado.'
      })
    }
  }

  // Si ya está autenticado, mostrar loading
  if (user && !isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Spinner color='primary' label='Cargando...' labelColor='primary' size='lg' />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <motion.div
        className='px-4 sm:px-6 w-full max-w-md'
        animate={{ opacity: 1, y: 0, scale: 1 }}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <section className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Cabecera */}
          <div className='px-6 pt-8 '>
            <h1 className='text-2xl font-bold mb-1'>Iniciar Sesión</h1>
            <p>Accede a tu cuenta en Ticketi</p>
          </div>

          {/* Formulario */}
          <div className='p-6'>
            {loginError && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-star'>
                <AlertCircle size={50} className='mr-2 text-red-500 ' />
                <span>{loginError}</span>
              </div>
            )}
            <form onSubmit={handleSignIn} className='space-y-4'>
              <Input
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                label='Correo electrónico'
                isDisabled={isLoading || loginAttempts >= 5}
                onBlur={(e) => {
                  handleUserExists(e.target.value)
                }}
              />

              <Input
                {...register('password')}
                label='Contraseña'
                type={showPassword ? 'text' : 'password'}
                endContent={
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className='h-5 w-5 text-gray-400' /> : <Eye className='h-5 w-5 text-gray-400' />}
                  </button>
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                isDisabled={isLoading || !userCanLogin}
              />

              <div className='flex items-center justify-between'>
                <Checkbox isDisabled={isLoading || !userCanLogin}>
                  <span className='text-sm'>Recordarme</span>
                </Checkbox>
                <div className='text-sm'>
                  <Link href='/cuenta/reset-password' className='font-medium text-blue-600 hover:text-blue-500'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <Button type='submit' isDisabled={isLoading || !userCanLogin} isLoading={isLoading} fullWidth color='primary'>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </form>

            <div className='mt-6'>
              <p className='text-sm text-gray-600 text-center'>
                ¿No tienes una cuenta?{' '}
                <Link href='/crear-cuenta' className='font-medium text-blue-600 hover:text-blue-500'>
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Información de desarrollo */}
          {process.env.NODE_ENV === 'development' && (
            <div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
              <p className='text-xs text-gray-500'>
                <strong>Modo desarrollo:</strong> Si no tienes una cuenta, puedes registrarte o usar las credenciales que hayas creado en
                Supabase.
              </p>
            </div>
          )}
        </section>
      </motion.div>
    </div>
  )
}
