'use client'

import { Progress } from '@heroui/react'
import { useState } from 'react'
import { Wizard } from 'react-use-wizard'
import CompleteAccountData from './CompleteAccountData'
import CompleteRegistration from './CompleteRegistration'
import ContactForm from './ContactForm'
import OtpVerification from './OTPVerification'

const CreateAccountClient = () => {
  const [progress, setProgress] = useState(0)
  const handleStepChange = (step: number) => {
    const totalSteps = 4
    const currentStep = step + 1 // Wizard steps are zero-indexed, so we add 1 for percentage calculation
    const stepProgress = Math.floor((currentStep / totalSteps) * 100)
    setProgress(stepProgress)
  }
  return (
    <section className='w-full max-w-md'>
      <Progress aria-label='Progreso...' value={progress} size='sm' />
      <Wizard onStepChange={handleStepChange}>
        <ContactForm />
        <OtpVerification />
        <CompleteAccountData />
        <CompleteRegistration />
      </Wizard>
    </section>
  )
}

export default CreateAccountClient
