'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { completeUser } from '@/schemas/user.schema'
import { RootState } from '@/store/store'

import { Switch, Tab, Tabs } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Settings } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(completeUser),
    mode: 'onSubmit',
    defaultValues: {
      email: user?.email || '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      terms: false
    }
  })

  const {
    register: registerMyAccount,
    formState: { errors: errorsMyAccount }
  } = useForm({
    resolver: zodResolver(completeUser),
    mode: 'onSubmit',
    defaultValues: {
      email: user?.email || '',
      phone: user?.phone || '',
      name: user?.full_name || ''
    }
  })

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='border-b border-gray-200 pb-5 mb-6'>
        <div className='flex items-center'>
          <Settings className='h-6 w-6 text-blue-600 mr-2' />
          <h2 className='text-xl font-bold text-gray-800'>Configuración</h2>
        </div>
        <p className='text-gray-600 mt-1'>Maneja tus datos y preferencias</p>
      </div>

      <Tabs aria-label='Options' color='primary' variant='underlined'>
        <Tab key='photos' title='Mi cuenta'>
          <form className='space-y-4 max-w-sm'>
            <Input {...registerMyAccount('name')} id='name' label='Nombre completo' />
            <Input {...registerMyAccount('email')} type='email' label='Correo electrónico' />
            <Input {...registerMyAccount('phone')} type='phone' label='Télefono' />
            <Button color='primary'>Actualizar mis datos</Button>
          </form>
        </Tab>
        <Tab key='music' title='Notificaciones'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <Label>Notificaciones por correo electrónico</Label>
              <p className='text-sm text-muted-foreground'>Recibe actualizaciones por email sobre la actividad de tu cuenta.</p>
            </div>
            <Switch aria-label='Automatic updates' isSelected />
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <Label>Correos electrónicos de marketing</Label>
              <p className='text-sm text-muted-foreground'>Recibe mails sobre nuevas funciones y promociones.</p>
            </div>
            <Switch aria-label='Automatic updates' isSelected />
          </div>
        </Tab>
        <Tab key='videos' title='Seguridad'>
          <form className='space-y-4 max-w-sm'>
            <Input {...register('email')} label='Correo electrónico' isInvalid={!!errors.email} readOnly className='hidden' />
            <Input
              {...register('oldPassword')}
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
              isInvalid={!!errors.oldPassword}
              errorMessage={errors.oldPassword?.message}
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
            />
            <Input
              {...register('passwordConfirm')}
              label='Confirmar contraseña'
              type={showPassword ? 'text' : 'password'}
              isInvalid={!!errors.passwordConfirm}
              errorMessage={errors.passwordConfirm?.message}
            />
            <Button color='primary'>Actualizar contraseña</Button>
          </form>
        </Tab>
      </Tabs>
    </div>
  )
}
