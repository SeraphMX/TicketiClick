import { completeUser } from '@/schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

import { userService } from '@/services/userService'
import { setSuccess } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../ui/input'

const CompleteAccountData = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleStep, previousStep, nextStep } = useWizard()
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(completeUser),
    mode: 'onSubmit',
    defaultValues: {
      phone: '',
      email: '',
      name: '',
      password: '',
      password2: '',
      terms: false
    }
  })

  const handleCreateAccount = handleSubmit(
    async (data) => {
      try {
        //console.log('Datos de registro:', data)
        const login = await userService.signUp({
          email: signUpData.email,
          password: data.password,
          metadata: { full_name: data.name, role: 'user', phone: signUpData.metadata.phone }
        })
        dispatch(setSuccess(true))
        nextStep()
      } catch (error) {
        console.error('Error al crear la cuenta:', error)
        dispatch(setSuccess(false))
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
        <h1 className='text-2xl font-bold text-center '>Contacto verificado</h1>
        <p className='mt-4 text-sm'>¡Muy bien! Casi terminamos, solo completa los datos de tu cuenta para terminar.</p>
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
        <div className='flex justify-end'>
          <Button color='primary' type='submit'>
            Finalizar
          </Button>
        </div>
      </form>
    </motion.section>
  )
}

export default CompleteAccountData
