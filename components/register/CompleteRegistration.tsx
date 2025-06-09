import { motion } from 'framer-motion'
import { ThumbsUp } from 'lucide-react'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'

const CompleteRegistration = () => {
  const { handleStep, previousStep, nextStep } = useWizard()

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

      <div>
        <div className='flex items-center justify-center mb-4'>
          <ThumbsUp className='h-12 w-12 text-blue-600' />
        </div>
        <p className='text-sm text-gray-600 mb-4'>
          Haz creado tu cuenta, ahora puedes iniciar sesión y usar todas las funciones de Ticketi.
        </p>
        <p className='text-xs text-gray-600 mb-4'>
          Hemos enviado un correo de confirmación a tu correo electrónico, por favor verifica tu bandeja de entrada y confirma tu correo
          para no perderte de nada.
        </p>
      </div>
      <div className='flex justify-end'>
        <Button color='danger' variant='light' onPress={previousStep}>
          Atras
        </Button>
        <Button color='primary' onPress={nextStep}>
          Ir a mi cuenta
        </Button>
      </div>
    </motion.section>
  )
}

export default CompleteRegistration
