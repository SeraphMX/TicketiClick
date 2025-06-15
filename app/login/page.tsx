'use client'
// app/login/page.tsx
// Página de inicio de sesión actualizada para Supabase

import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, isLoading, user } = useAuth()
  const router = useRouter()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor, ingresa un email válido')
      return
    }

    try {
      const success = await login(email, password)

      if (success) {
        // La redirección se maneja en el useEffect
        console.log('Login exitoso')
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Error al iniciar sesión. Intenta de nuevo más tarde.')
    }
  }

  // Si ya está autenticado, mostrar loading
  if (user && !isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Redirigiendo...</p>
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
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Cabecera */}
          <div className='px-6 pt-8 pb-6'>
            <h1 className='text-2xl font-bold mb-1'>Iniciar Sesión</h1>
            <p>Accede a tu cuenta en Ticketi</p>
          </div>

          {/* Formulario */}
          <div className='p-6'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-start'>
                <AlertCircle className='h-5 w-5 mr-2 text-red-500 mt-0.5' />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                  Correo electrónico
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  placeholder='tu@email.com'
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                  Contraseña
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='••••••••'
                    disabled={isLoading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className='h-5 w-5 text-gray-400' /> : <Eye className='h-5 w-5 text-gray-400' />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    disabled={isLoading}
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                    Recordarme
                  </label>
                </div>

                <div className='text-sm'>
                  <Link href='/cuenta/reset-password' className='font-medium text-blue-600 hover:text-blue-500'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
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
        </div>
      </motion.div>
    </div>
  )
}
