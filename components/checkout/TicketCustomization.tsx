'use client'
// components/checkout/TicketCustomization.tsx
// Componente de personalización de boletos

import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface TicketCustomizationProps {
  formData: {
    ticketName?: string
    ticketColor?: string
  }
  onSubmit: (data: { ticketName: string; ticketColor: string }) => void
  onSkip: () => void
  onBack: () => void
}

const BACKGROUND_COLORS = [
  { name: 'Blanco', value: '#FFFFFF' },
  { name: 'Azul claro', value: '#E3F2FD' },
  { name: 'Verde claro', value: '#E8F5E9' },
  { name: 'Rosa claro', value: '#FCE4EC' },
  { name: 'Amarillo claro', value: '#FFF8E1' }
]

export default function TicketCustomization({ formData, onSubmit, onSkip, onBack }: TicketCustomizationProps) {
  const [ticketName, setTicketName] = useState(formData.ticketName || '')
  const [selectedColor, setSelectedColor] = useState(formData.ticketColor || '#FFFFFF')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ticketName,
      ticketColor: selectedColor
    })
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center'>
        <button onClick={onBack} className='mr-4 text-gray-500 hover:text-gray-700'>
          <ArrowLeft className='h-5 w-5' />
        </button>
        <h2 className='text-xl font-bold text-gray-900'>Personaliza tu boleto</h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Nombre en el boleto */}
        <div>
          <label className='block text-md font-medium text-gray-700 mb-2'>
            <div className='flex items-center'>Nombre en el boleto</div>
          </label>
          <input
            type='text'
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            placeholder='Ej: Juan Pérez'
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
          <p className='mt-1 text-sm text-gray-500'>
            Este nombre aparecerá impreso en tu boleto, al personalizarlo solicitaremos la identificación del titular para hacerlo válido.
          </p>
        </div>

        {/* Botones */}
        <div className='flex justify-between'>
          <button type='button' onClick={onSkip} className='text-gray-600 hover:text-gray-800'>
            Omitir personalización
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
