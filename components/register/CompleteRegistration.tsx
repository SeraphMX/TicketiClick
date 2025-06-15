import { userService } from '@/services/userService'
import { resetRegisterState } from '@/store/slices/registerSlice'
import { RootState } from '@/store/store'
import { Alert } from '@heroui/react'
import { motion } from 'framer-motion'
import { ThumbsUp, TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'

const CompleteRegistration = () => {
  // Verificar si estamos en modo desarrollo
  const isDevMode = process.env.NEXT_PUBLIC_DEVMODE === 'true'
  const router = useRouter()
  const signUpData = useSelector((state: RootState) => state.register.signUpParams)
  const dispatch = useDispatch()

  const handleComplete = () => {
    console.log('Finalizando el registro')
    dispatch(resetRegisterState())
    router.push('/dashboard') // Redirige al usuario a la página de inicio de sesión
  }

  const sendWelcomeEmail = async () => {
    await userService.sendWelcomeEmail(signUpData.email)
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
      <h1 className='text-2xl font-bold text-center'>¡Todo listo!</h1>

      <div className='flex items-center justify-center mb-4'>
        <ThumbsUp className='h-12 w-12 text-blue-600' />
      </div>
      <p className='text-sm text-gray-600 mb-4'>
        Haz creado tu cuenta, ahora puedes iniciar sesión y usar todas las funciones de Ticketi...
      </p>
      <p className='text-xs text-gray-600 mb-4'>
        Hemos enviado un correo de confirmación a tu correo electrónico, por favor verifica tu bandeja de entrada y confirma tu correo para
        no perderte de nada. Si no lo encuentras, revisa tu carpeta de spam o correo no deseado.
      </p>
      <div className='flex flex-col items-end gap-2'>
        <div>
          <Button color='primary' onPress={handleComplete} className='mr-2'>
            Ir a mi cuenta
          </Button>
        </div>
        {/* Información de desarrollo */}
        {isDevMode && (
          <div className=' border-t border-gray-100 w-full'>
            <Alert
              classNames={{ alertIcon: 'fill-none' }}
              icon={<TriangleAlert />}
              color='warning'
              description='Puedes hacer el envio manual'
              endContent={
                <Button color='warning' size='sm' variant='flat' onPress={sendWelcomeEmail}>
                  Enviar correo
                </Button>
              }
              title='Modo de desarrollo activo'
              variant='flat'
              hideIconWrapper
            />
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default CompleteRegistration
