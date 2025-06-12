import { createUser } from '@/schemas/user.schema'
import { setEmailPhoneTerms } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { Checkbox } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ContactForm = () => {
  const { handleStep, previousStep, nextStep } = useWizard()
  const dispatch = useDispatch()
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const {
    register,
    handleSubmit,
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

  const handleCreateAccount = handleSubmit(
    async (data) => {
      try {
        console.log('Datos de registro:', data)
        //TODO: Verificar telefono que sea movil
        dispatch(setEmailPhoneTerms({ email: data.email, phone: data.phone, terms: data.terms }))
        nextStep() // Avanza al siguiente paso del wizard
      } catch (error) {
        console.error('Error al crear la cuenta:', error)
      }
    },
    (errors) => console.warn('Errores de validación:', errors)
  )
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
          <Button color='primary' type='submit'>
            Iniciar verificación
          </Button>
        </div>
      </form>
    </motion.section>
  )
}

export default ContactForm
