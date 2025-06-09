'use client'
import { createUser } from '@/schemas/user.schema'
import { Checkbox } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const CreateAccountClient = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(createUser),
    mode: 'onSubmit',
    defaultValues: {
      phone: '',
      email: '',
      terms: false
    }
  })

  const handleCreateAccount = handleSubmit(
    async (data) => {
      try {
        console.log('Datos de registro:', data)
      } catch (error) {
        console.error('Error al crear la cuenta:', error)
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        alert('Error al crear la cuenta. Intenta de nuevo más tarde.')
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )

  return (
    <form className='space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto' onSubmit={handleCreateAccount}>
      <h1 className='text-2xl font-bold '>¡Crea una cuenta en Ticketi!</h1>
      <p className='mt-4 text-sm'>
        Para crear tu cuenta primero tenemos que verificar tus medios de contacto, esto nos asegura poder comunicarnos contigo.
      </p>

      <Input {...register('phone')} label='Teléfono móvil' isInvalid={!!errors.phone} />
      <Input {...register('email')} label='Correo electrónico' isInvalid={!!errors.email} />

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
          Iniciar verificación
        </Button>
      </div>
    </form>
  )
}

export default CreateAccountClient
