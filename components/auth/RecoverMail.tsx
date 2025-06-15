import { userService } from '@/services/userService'
import { resetRegisterState } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { Alert } from '@heroui/react'
import { motion } from 'framer-motion'
import { MailCheck, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

const RecoverMail = () => {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const router = useRouter()
  const recoverAccountData = useSelector((state: RootState) => state.recoverAccount)
  const dispatch = useDispatch()
  const { handleStep, previousStep, goToStep } = useWizard()

  const handleComplete = () => {
    console.log('Finalizando el registro')
    dispatch(resetRegisterState())
    router.push('/dashboard') // Redirige al usuario a la página de inicio de sesión
  }

  const sendEmail = async () => {
    await userService.sendEmail(recoverAccountData.email, 'password-reset')
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
      <h1 className='text-2xl font-bold text-center'>Enlace enviado</h1>

      <div className='flex items-center justify-center mb-4'>
        <MailCheck className='h-12 w-12 text-blue-600' />
      </div>

      <p className='text-sm text-gray-600 mb-4'>
        Hemos enviado el enlace para restablecer tu contraseña a tu correo electrónico, por favor verifica tu bandeja de entrada y sigue las
        instrucciones para completar el proceso. Si no lo encuentras, revisa tu carpeta de spam o correo no deseado.
      </p>
      <div className='flex flex-col items-end gap-2'>
        {/* Información de desarrollo */}
        {isDevMode && (
          <div className=' border border-gray-100 w-full p-1 space-y-2'>
            <Alert
              classNames={{ alertIcon: 'fill-none' }}
              icon={<TriangleAlert />}
              color='warning'
              description='Puedes hacer el envio manual'
              endContent={
                <Button color='warning' size='sm' variant='flat' onPress={sendEmail}>
                  Enviar correo
                </Button>
              }
              title='Modo de desarrollo activo'
              variant='flat'
              hideIconWrapper
            />
            <div>
              <Button
                variant='light'
                color='warning'
                onPress={() => {
                  goToStep(0)
                }}
                className='mt-4'
              >
                Reiniciar recuperación
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default RecoverMail
