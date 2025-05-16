'use client'
// components/checkout/TicketCustomization.tsx
// Componente de personalización de boletos

import { useDispatch, useSelector } from '@/hooks/useReduxHooks'
import { setTicketNames } from '@/store/slices/checkoutSlice'
import { RootState } from '@/store/store'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface TicketCustomizationProps {
  onSubmit: (data: { names: string[]; color: string }) => void
  onSkip: () => void
  onBack: () => void
}

export default function TicketCustomization({ onSubmit, onSkip, onBack }: TicketCustomizationProps) {
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)
  const quantity = selectedEvent?.quantity || 1
  const [showForm, setShowForm] = useState(false)
  const [ticketNames, setTicketNamesState] = useState<string[]>(Array(quantity).fill(''))
  const [errors, setErrors] = useState<string[]>(Array(quantity).fill(''))

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
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...ticketNames]
    newNames[index] = value
    setTicketNamesState(newNames)

    // Limpiar error cuando el usuario escribe
    const newErrors = [...errors]
    newErrors[index] = ''
    setErrors(newErrors)
  }

  if (!showForm) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center'>
          <button onClick={onBack} className='mr-4 text-gray-500 hover:text-gray-700'>
            <ArrowLeft className='h-5 w-5' />
          </button>
          <h2 className='text-xl font-bold text-gray-900'>Personalización </h2>
        </div>
        <p>
          Puedes agregar un nombre a cada boleto, si lo haces es probable que el evento solicite una identificación para validar tu entrada.
        </p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => setShowForm(true)}
            className='inline-flex items-center justify-center px-4 py-2 mr-4 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          >
            Personalizar boletos
          </button>
          <button
            onClick={onSkip}
            className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Continuar sin personalizar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center'>
        <button onClick={() => setShowForm(false)} className='mr-4 text-gray-500 hover:text-gray-700'>
          <ArrowLeft className='h-5 w-5' />
        </button>
        <h2 className='text-xl font-bold text-gray-900'>Personalización de boletos</h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-4'>
          {Array.from({ length: quantity }).map((_, index) => (
            <div key={index} className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>Nombre para el boleto {index + 1}</label>
              <input
                type='text'
                value={ticketNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Ej: Juan Pérez`}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors[index] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[index] && <p className='text-sm text-red-600'>{errors[index]}</p>}
            </div>
          ))}
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            onClick={onSkip}
            className='inline-flex items-center justify-center px-4 py-2 mr-4 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          >
            Cancelar personalización
          </button>
          <button
            type='submit'
            className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Continuar
            <ChevronRight className='ml-2 h-4 w-4' />
          </button>
        </div>
      </form>
    </div>
  )
}
