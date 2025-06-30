'use client'
// components/checkout/TicketCustomization.tsx
// Componente de personalización de boletos

import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { setTicketNames } from '@/store/slices/checkoutSlice'
import { RootState } from '@/store/store'
import { Checkbox } from '@heroui/react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWizard } from 'react-use-wizard'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface TicketCustomizationProps {
  onSubmit: (data: { names: string[]; color: string }) => void
}

export default function TicketCustomization({ onSubmit }: TicketCustomizationProps) {
  const { nextStep } = useWizard()
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const quantity = selectedEvent?.quantity || 1
  const [showForm, setShowForm] = useState(false)
  const [ticketNames, setTicketNamesState] = useState<string[]>(Array(quantity).fill(''))
  const [errors, setErrors] = useState<string[]>(Array(quantity).fill(''))
  const [useSameName, setUseSameName] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)

  const validateNames = (): boolean => {
    const newErrors = ticketNames.map((name) => (name.trim() === '' ? 'El nombre es requerido' : ''))
    setErrors(newErrors)
    return newErrors.every((error) => error === '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateNames()) {
      return
    }

    console.log('Nombres de boletos:', ticketNames)
    dispatch(setTicketNames(ticketNames))
    onSubmit({
      names: ticketNames,
      color: '#FFFFFF'
    })
    nextStep()
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...ticketNames]
    if (useSameName && index === 0) {
      // Copia el mismo valor a todos
      for (let i = 0; i < quantity; i++) {
        newNames[i] = value
      }
    } else {
      newNames[index] = value
    }
    setTicketNamesState(newNames)

    // Limpiar errores
    const newErrors = [...errors]
    newErrors[index] = ''
    setErrors(newErrors)
  }

  useEffect(() => {
    if (showForm && user?.full_name) {
      setTicketNamesState((prev) => {
        if (!prev[0]) {
          const updated = [...prev]
          updated[0] = user.full_name
          return updated
        }
        return prev
      })
    }
  }, [showForm, user?.full_name])

  if (!showForm) {
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
        <div className='flex items-center'>
          <h2 className='text-xl font-bold text-gray-900'>Personalización </h2>
        </div>
        <p className='text-gray-600'>
          Puedes agregar un nombre a cada boleto, si lo haces es probable que el evento solicite una identificación para validar tu entrada.
        </p>
        <div className='flex justify-end gap-4'>
          <Button onPress={() => setShowForm(true)} variant='ghost'>
            Personalizar
          </Button>
          <Button onPress={nextStep} color='primary'>
            Continuar
          </Button>
        </div>
      </motion.section>
    )
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
      <div className='flex items-center'>
        <h2 className='text-xl font-bold text-gray-900'>Personalización de boletos</h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          {Array.from({ length: quantity }).map((_, index) => (
            <div key={index}>
              <Input
                type='text'
                value={ticketNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                label={`Nombre en el boleto ${index + 1}`}
                isInvalid={!!errors[index]}
                errorMessage={errors[index] || ''}
                isReadOnly={useSameName && index > 0}
              />
              {index === 0 && (
                <Checkbox
                  className='mt-0.5'
                  isSelected={useSameName}
                  onValueChange={(checked) => {
                    setUseSameName(checked)

                    if (checked) {
                      const firstName = ticketNames[0]
                      const newNames = Array(quantity).fill(firstName)
                      setTicketNamesState(newNames)

                      // Limpiar errores de todos los campos (opcional)
                      setErrors(Array(quantity).fill(''))
                    }
                  }}
                >
                  Usar el mismo nombre para todos
                </Checkbox>
              )}
            </div>
          ))}
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            variant='ghost'
            onPress={nextStep}
            className='inline-flex items-center justify-center px-4 py-2 mr-4 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          >
            Cancelar personalización
          </Button>
          <Button color='primary' type='submit'>
            Continuar
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </form>
    </motion.section>
  )
}
