import { setOtpVerified } from '@/store/slices/checkoutSlice'
import { RootState } from '@/store/store'
import { Alert } from '@heroui/react'
import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import OTPVerification from '../otp/OTPVerification'
import { Button } from '../ui/button'

const PhoneVerification = () => {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const { goToStep, nextStep } = useWizard()
  const rxClientInfo = useSelector((state: RootState) => state.checkout.contactInfo)
  const dispatch = useDispatch()

  const onSuccess = async () => {
    console.log('OTP verificado exitosamente')

    dispatch(setOtpVerified(true)) // Actualiza el estado de verificación del OTP

    nextStep() // Avanza al siguiente paso del wizard
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className='space-y-4'
    >
      <OTPVerification phone={rxClientInfo.phone} devMode={isDevMode} onSuccess={onSuccess} />
      <Button variant='ghost' onPress={() => goToStep(0)}>
        Atras
      </Button>
      {/* Información de desarrollo */}
      {isDevMode && (
        <div className='border-1 border-gray-100 space-y-2 p-1'>
          <Alert
            classNames={{ alertIcon: 'fill-none' }}
            icon={<TriangleAlert />}
            color='warning'
            title='Modo de desarrollo activo'
            variant='flat'
            className='text-sm'
            hideIconWrapper
          >
            El código para verificación es: 123456
          </Alert>
        </div>
      )}
    </motion.section>
  )
}

export default PhoneVerification
