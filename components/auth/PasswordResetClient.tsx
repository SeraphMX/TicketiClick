'use client'
import { RootState } from '@/store/store'
import { Progress } from '@heroui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Wizard } from 'react-use-wizard'
import PhoneVerification from './PhoneVerification'
import RecoverMail from './RecoverMail'
import ResetComplete from './ResetComplete'
import SelectRecoverMethod from './SelectRecoverMethod'
import SetPassword from './SetPassword'

const PasswordResetClient = () => {
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
  return (
    <section className='w-full max-w-md'>
      <Progress aria-label='Progreso' value={progress} size='sm' />
      <Wizard onStepChange={handleStepChange}>
        <SelectRecoverMethod />
        <RecoverMail />
        <PhoneVerification />
        <SetPassword email={signUpData.email} />
        <ResetComplete />
      </Wizard>
    </section>
  )
}

export default PasswordResetClient
