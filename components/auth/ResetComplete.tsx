import { userService } from '@/services/userService'
import { RootState } from '@/store/store'
import { Alert } from '@heroui/react'
import { motion } from 'framer-motion'
import { ThumbsUp, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

const ResetComplete = () => {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const router = useRouter()
  const recoverAccountData = useSelector((state: RootState) => state.recoverAccount)
  const { goToStep } = useWizard()

  const handleGoToLogin = () => {
    router.push('/login')
  }

  const sendPasswordChangedEmail = async () => {
    await userService.sendEmail(recoverAccountData.email, 'password-changed')
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
      <h1 className='text-2xl font-bold text-center'>Contraseña cambiada</h1>

      <div className='flex items-center justify-center mb-4'>
        <ThumbsUp className='h-12 w-12 text-blue-600' />
      </div>

      <p className='text-sm text-gray-600 mb-4'>
        Hemos cambiado tu contraseña exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña. Si tienes problemas, por favor
        contacta al soporte.
      </p>

      <div className='flex justify-end'>
        <Button variant='ghost' color='primary' onPress={handleGoToLogin}>
          Ir a mi cuenta
        </Button>
      </div>
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
                <Button color='warning' size='sm' variant='flat' onPress={sendPasswordChangedEmail}>
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

export default ResetComplete
