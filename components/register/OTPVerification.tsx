import { InputOtp } from '@heroui/react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useState } from 'react'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

const OTPVerification = () => {
  const { handleStep, previousStep, nextStep } = useWizard()

  const [value, setValue] = useState('')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className='space-y-4 bg-white p-6 rounded-lg rounded-t-none shadow-md w-full max-w-md mx-auto'
    >
      <h1 className='text-2xl font-bold  text-center'>Verificación</h1>

      <div className='text-center'>
        <div className='flex items-center justify-center mb-4'>
          <Phone className='h-12 w-12 text-blue-600' />
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Hemos enviado un código al número
          <br />
          <span className='font-medium text-gray-900'> 546546546654 </span>
        </p>

        {/* Inputs OTP */}
        <div className='flex justify-center gap-2 mb-6'>
          <InputOtp length={6} value={value} onValueChange={setValue} size='lg' />
          {/* {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg
                      ${isVerified ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                    `}
              disabled={isVerified || isVerifying}
            />
          ))} */}
        </div>
      </div>
      <div className='flex justify-between'>
        <Button color='danger' variant='light' onPress={previousStep}>
          Atras
        </Button>
        <Button color='primary' onPress={nextStep}>
          Siguiente
        </Button>
      </div>
    </motion.section>
  )
}

export default OTPVerification
