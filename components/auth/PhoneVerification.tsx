import { userService } from '@/services/userService'
import { setEmail } from '@/store/slices/recoverAccountSlice'
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
  const recoverAccountData = useSelector((state: RootState) => state.recoverAccount)
  const dispatch = useDispatch()

  const onSuccess = async () => {
    console.log('OTP verificado exitosamente')

    //Traer correo
    const response = await userService.getEmailByPhone(recoverAccountData.phone)
    console.log('Email obtenido:', response)

    if (response) {
      dispatch(setEmail(response.email))
    } else {
      console.log('No se pudo obtener el correo electrónico asociado al número de teléfono')
    }

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
      className='space-y-4 bg-white p-6 rounded-lg rounded-t-none shadow-md w-full max-w-md mx-auto'
    >
      <OTPVerification phone={recoverAccountData.phone} devMode={true} onSuccess={onSuccess} />
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
          <Button color='warning' variant='light' onPress={() => goToStep(0)}>
            Atras
          </Button>
        </div>
      )}
    </motion.section>
  )
}

export default PhoneVerification
