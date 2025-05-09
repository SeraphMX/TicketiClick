'use client'
// app/login/page.tsx
// Página de inicio de sesión

import { useAuth } from '@/hooks/useAuth'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }

    try {
      const success = await login(email, password)

      if (success) {
        // Redirigir al dashboard o a la página principal
        router.push('/dashboard')
      } else {
        setError('Credenciales inválidas. Intenta de nuevo.')
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo más tarde.')
    }
  }

  // Opciones de demo login
  const demoUsers = [
    { email: 'juan@ejemplo.com', role: 'Usuario' },
    { email: 'maria@ejemplo.com', role: 'Organizador' },
    { email: 'carlos@ejemplo.com', role: 'Administrador' }
  ]

  const handleDemoLogin = async (demoEmail: string) => {
    try {
      // Usar contraseña ficticia para el demo
      const success = await login(demoEmail, 'password123')

      if (success) {
        router.push('/dashboard')
      } else {
        setError('Error en el acceso demo. Intenta de nuevo.')
      }
    } catch (err) {
      setError('Error al iniciar sesión demo. Intenta de nuevo más tarde.')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-md mx-auto px-4 sm:px-6'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Cabecera */}
          <div className='px-6 pt-8 pb-6 bg-gradient-to-r from-blue-700 to-zinc-800 text-white'>
            <h1 className='text-2xl font-bold mb-1'>Iniciar Sesión</h1>
            <p className='text-blue-100'>Accede a tu cuenta para comprar boletos y más</p>
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
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  >
                    {showPassword ? <EyeOff className='h-5 w-5 text-gray-400' /> : <Eye className='h-5 w-5 text-gray-400' />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input id='remember-me' type='checkbox' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                    Recordarme
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className='mt-6'>
              <p className='text-sm text-gray-600 text-center'>
                ¿No tienes una cuenta?{' '}
                <Link href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Users */}
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
            <h3 className='text-sm font-medium text-gray-700 mb-3'>Accesos para demostración:</h3>
            <div className='space-y-2'>
              {demoUsers.map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => handleDemoLogin(demo.email)}
                  className='w-full text-left text-sm px-3 py-2 rounded-md hover:bg-gray-100 flex justify-between items-center'
                >
                  <span>{demo.email}</span>
                  <span className='bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full'>{demo.role}</span>
                </button>
              ))}
            </div>
            <p className='text-xs text-gray-500 mt-2'>* Haz clic en cualquier usuario demo para iniciar sesión automáticamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}
