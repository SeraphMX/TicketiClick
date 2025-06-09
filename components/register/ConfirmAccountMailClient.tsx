'use client'
import { confirmUser } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { Checkbox } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ConfirmAccountMailClient = ({ email, phone }: { email: string; phone: string }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(confirmUser),
    mode: 'onSubmit',
    defaultValues: {
      phone: phone || '',
      email: email || '',
      name: '',
      password: '',
      password2: '',
      terms: false
    }
  })

  const handleCreateAccount = handleSubmit(
    async (data) => {
      try {
        await userService.signUp({
          email: data.email,
          password: data.password,
          metadata: { full_name: data.name, role: 'user', phone: data.phone }
        })

        setIsCompleted(true)
      } catch (error) {
        console.error('Error al crear la cuenta:', error)
        alert('Error al crear la cuenta. Intenta de nuevo más tarde.')
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )

  return !isCompleted ? (
    <form className='space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto' onSubmit={handleCreateAccount}>
      <h1 className='text-2xl font-bold '>¡Completa tu registro!</h1>
      <p className='mt-4 text-sm'>
        Hemos verificado tu correo electrónico, por favor, completa el siguiente formulario para finalizar tu registro:
      </p>

      <Input {...register('phone')} label='Teléfono' isInvalid={!!errors.phone} readOnly className='hidden' />
      <Input {...register('email')} label='Correo electrónico' isInvalid={!!errors.email} readOnly className='hidden' />
      <Input {...register('name')} label='Nombre' isInvalid={!!errors.name} />
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
      />
      <Input
        {...register('password2')}
        label='Confirmar contraseña'
        type={showPassword ? 'text' : 'password'}
        isInvalid={!!errors.password2}
        errorMessage={errors.password2?.message}
      />
      <Checkbox {...register('terms')} isInvalid={!!errors.terms} className='mt-4'>
        <div className='text-xs text-gray-700'>
          Al crear tu cuenta aceptas nuestros{' '}
          <a href='/terminos' className='text-blue-600 hover:text-blue-500'>
            términos y condiciones
          </a>{' '}
          y confirmas haber leído nuestra{' '}
          <a href='/politica-privacidad' className='text-blue-600 hover:text-blue-500'>
            política de privacidad
          </a>
        </div>
        <div>{errors.terms && <span className='text-red-500 text-xs mt-1'>{errors.terms.message}</span>}</div>
      </Checkbox>

      <div className='flex items-center justify-end mt-4'>
        <Button type='submit' color='primary'>
          Completar Registro
        </Button>
      </div>
    </form>
  ) : (
    <div className='bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center'>
      <h1 className='text-2xl font-bold mb-4'>¡Registro completado!</h1>
      <p className='text-gray-600 mb-4'>Tu cuenta ha sido creada exitosamente en nuestro sitio.</p>
      <Button color='primary' className='mt-4' onClick={() => (window.location.href = '/dashboard')}>
        Ir a mi perfil
      </Button>
    </div>
  )
}

export default ConfirmAccountMailClient
