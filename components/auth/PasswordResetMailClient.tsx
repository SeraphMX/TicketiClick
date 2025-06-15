'use client'
import { RootState } from '@/store/store'
import { Progress } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Wizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import ResetComplete from './ResetComplete'
import SetPassword from './SetPassword'

interface PasswordResetMailClientProps {
  email: string | null
}

const PasswordResetMailClient = ({ email }: PasswordResetMailClientProps) => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const handleStepChange = (step: number) => {
    const totalSteps = 4
    const currentStep = step + 1 // Wizard steps are zero-indexed, so we add 1 for percentage calculation
    let stepProgress = 0

    switch (currentStep) {
      case 1:
        document.title = 'Selecciona un método de recuperación'
        setProgress(0)
        break
      case 2:
        document.title = 'Recupera tu contraseña por correo'
        setProgress(100)
        break
      case 3:
        document.title = 'Verifica tu identidad'
        setProgress(50)
        break
      case 4:
        document.title = 'Establece tu nueva contraseña'
        setProgress(100)
        break
      default:
        document.title = 'Restablecimiento de contraseña'
    }

    //setProgress(stepProgress)
  }

  const handleBackToRecover = () => {
    router.push('/cuenta/reset-password')
  }
  return (
    <section className='w-full max-w-md'>
      {!email ? (
        <section className='space-y-4'>
          <h1 className='text-2xl font-bold text-center'>Enlace no valido </h1>
          <p className='text-gray-600 text-sm'>
            El enlace de restablecimiento ha expirado o no es válido. Por favor, solicita un nuevo enlace para intentarlo otra vez.
          </p>
          <Button color='primary' onPress={handleBackToRecover} />
        </section>
      ) : (
        <>
          <Progress aria-label='Progreso' value={progress} size='sm' />
          <Wizard onStepChange={handleStepChange}>
            <SetPassword email={signUpData.email} />
            <ResetComplete />
          </Wizard>
        </>
      )}
    </section>
  )
}

export default PasswordResetMailClient
