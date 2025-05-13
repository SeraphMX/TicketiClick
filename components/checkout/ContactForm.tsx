import { useDispatch } from '@/hooks/useReduxHooks'
import { setContactInfo } from '@/store/slices/checkoutSlice'
import { Mail, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface ContactFormData {
  email: string
  phone: string
  createAccount: boolean
}

interface ContactFormProps {
  formData: Partial<ContactFormData>
  onSubmit: (data: ContactFormData) => void
}

export default function ContactForm({ formData, onSubmit }: ContactFormProps) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormData>({
    defaultValues: {
      email: formData.email || '',
      phone: formData.phone || '',
      createAccount: formData.createAccount || false
    }
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      // Formatear número de teléfono
      const formattedPhone = data.phone.startsWith('+') ? data.phone : `+52${data.phone}`

      // Validar el teléfono primero
      const validateResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/validate-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          phone: formattedPhone
        })
      })

      const validateResult = await validateResponse.json()

      if (!validateResult.isValid || !validateResult.isMobile) {
        throw new Error('Por favor, ingresa un número de teléfono móvil válido')
      }

      const formattedData = { ...data, phone: formattedPhone }

      // Actualizar el estado en Redux
      dispatch(setContactInfo(formattedData))

      // Enviar OTP
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          phone: formattedPhone
        })
      })

      if (!response.ok) {
        throw new Error('Error al enviar el código de verificación')
      }

      const result = await response.json()

      if (result.success) {
        // Continuar con el siguiente paso
        onSubmit(formattedData)
      } else {
        throw new Error(result.message || 'Error al enviar el código de verificación')
      }
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
      <div>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Datos de contacto</h2>

        <div className='space-y-4'>
          {/* Teléfono */}
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
              Teléfono móvil
            </label>
            <div className='mt-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Phone className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='tel'
                id='phone'
                {...register('phone', {
                  required: 'El teléfono es obligatorio',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Ingresa un número de teléfono válido'
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder='10 dígitos (sin espacios ni guiones)'
                maxLength={10}
              />
            </div>
            {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Correo electrónico
            </label>
            <div className='mt-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='email'
                id='email'
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
          </div>

          {/* Crear cuenta */}
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='createAccount'
              {...register('createAccount')}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
            <label htmlFor='createAccount' className='ml-2 block text-sm text-gray-700'>
              Crear una cuenta (opcional)
            </label>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Continuar
        </button>
      </div>
    </form>
  )
}
