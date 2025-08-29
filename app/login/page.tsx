'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// app/login/page.tsx
// Página de inicio de sesión actualizada para Supabase

import { loginUserForm } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { clearAuthError, loginUser } from '@/store/slices/authSlice'
import { setEmail } from '@/store/slices/registerSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Checkbox, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [userCanLogin, setUserCanLogin] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { error, isLoading, user } = useSelector((state: RootState) => state.auth)

  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    trigger,

    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginUserForm),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (!userCanLogin) {
      // Si el login está bloqueado, limpiamos el error del campo
      clearErrors('password')
    }
  }, [userCanLogin, clearErrors])

  useEffect(() => {
    // limpia errores al montar y desmontar el componente
    dispatch(clearAuthError())
    clearErrors()
    return () => {
      dispatch(clearAuthError())
      clearErrors()
    }
  }, [])

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setValue('email', rememberedEmail)
      setRememberMe(true)
    }
  }, [setValue])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'email') {
        setLoginAttempts(0)
        setUserCanLogin(true)
        clearErrors()
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, clearErrors])

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user && user.id && !isLoading) {
      router.push('/')
    }
  }, [user, isLoading, router])

  // Controla los intentos y mensajes según el error global
  useEffect(() => {
    if (!error || !userCanLogin) return

    const maxAttempts = 5
    const nextAttempts = loginAttempts + 1
    setLoginAttempts(nextAttempts)

    if (error === 'Contraseña incorrecta') {
      setError('password', {
        type: 'manual',
        message: 'Contraseña incorrecta.'
      })
    }

    if (nextAttempts >= maxAttempts) {
      setUserCanLogin(false)
      clearErrors('password')
    }
  }, [error])

  // Maneja el submit
  interface SignInFormData {
    email: string
    password: string
  }

  const handleSignIn = async (data: SignInFormData): Promise<void> => {
    if (!userCanLogin) return

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', data.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

    dispatch(loginUser({ email: data.email, password: data.password }))
  }

  const renderErrorMessage = () => {
    const maxAttempts = 5
    const remaining = maxAttempts - loginAttempts

    // Si ya no puede intentar más
    if (!userCanLogin) {
      return 'Has alcanzado el número máximo de intentos. Por favor, inténtalo más tarde o restablece tu contraseña.'
    }

    // Si quedan 2 o menos intentos, mostrar advertencia
    if (remaining <= 2) {
      return `Te quedan ${remaining} ${remaining > 1 ? 'intentos' : 'intento'} antes de que se bloquee el inicio de sesión.`
    }

    // Si aún quedan más de 2 intentos, no mostrar mensaje global
    return null
  }

  const handleUserExists = async (email: string) => {
    const isValid = await trigger('email') // Ejecuta validación solo de email
    if (isValid) {
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
        dispatch(setEmail({ email })) // Guardar el email en el store
      }
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
            {renderErrorMessage() && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start'>
                <AlertCircle size={20} className='mr-2 text-red-500 mt-1' />
                <span>{renderErrorMessage()}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
              <Input
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                label='Correo electrónico'
                isDisabled={isLoading || loginAttempts >= 5}
                onBlur={(e) => {
                  handleUserExists(e.target.value)
                }}
                autoFocus
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
                <Checkbox isSelected={rememberMe} onValueChange={setRememberMe} isDisabled={isLoading || !userCanLogin}>
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
