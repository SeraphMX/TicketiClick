'use client'
import { resetPassword } from '@/schemas/user.schema'
import { userService } from '@/services/userService'
import { resetOtpState } from '@/store/slices/otpSlice'
import { resetRecoverAccount } from '@/store/slices/recoverAccountSlice'
import { RootState } from '@/store/store'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Input } from '../ui/input'

interface SetPasswordProps {
  email: string
}

const SetPassword = ({ email }: SetPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { nextStep } = useWizard()
  const recoverAccountData = useSelector((state: RootState) => state.recoverAccount)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPassword),
    mode: 'onSubmit',
    defaultValues: {
      phone: recoverAccountData.phone || '',
      email: recoverAccountData.email || email,
      password: '',
      password2: ''
    }
  })

  const handleResetPassword = handleSubmit(
    async (data) => {
      setIsLoading(true)
      try {
        const response = await userService.passwordChange(email, data.password)

        if (response.status !== 'success') {
          throw new Error('Error al restablecer la contraseña')
        }

        dispatch(resetRecoverAccount())
        dispatch(resetOtpState())

        nextStep()
      } catch (error) {
        console.log('SetPassword:', error)
      } finally {
        setIsLoading(false)
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
      <form className='space-y-4 bg-white p-6 rounded-lg rounded-t-none shadow-md w-full' onSubmit={handleResetPassword}>
        <h1 className='text-2xl font-bold text-center '>Restablece tu contraseña</h1>
        <p className='mt-4 text-sm'>Hemos confirmado tu identidad, ahora puedes establecer una nueva contraseña. </p>
        <Input {...register('phone')} label='Teléfono' isInvalid={!!errors.phone} readOnly className='hidden' />
        <Input {...register('email')} label='Correo electrónico' isInvalid={!!errors.email} readOnly className='hidden' />
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
          <Button color='primary' type='submit' isLoading={isLoading}>
            Restablecer
          </Button>
        </div>
      </form>
    </motion.section>
  )
}

export default SetPassword
