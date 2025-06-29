'use client'
// components/EventForm.tsx
// Formulario para crear o editar eventos

import { EventFormData } from '@/lib/types'

import { Button, DatePicker, NumberInput, Select, SelectItem, Textarea, TimeInput } from '@heroui/react'
import { Input } from '../ui/input'

interface EventFormProps {
  onSubmit: (data: EventFormData) => void
  isLoading?: boolean
}

const EventForm = ({ onSubmit, isLoading = false }: EventFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Mapeador de categorías para el select
  const categoryOptions = [
    { value: 'music', label: 'Música' },
    { value: 'sports', label: 'Deportes' },
    { value: 'theater', label: 'Teatro' },
    { value: 'conference', label: 'Conferencia' },
    { value: 'festival', label: 'Festival' },
    { value: 'workshop', label: 'Taller' },
    { value: 'other', label: 'Otro' }
  ]

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Crear Nuevo Evento</h2>

      <Input label='Título del evento' />

      <Textarea label='Descripción del evento' variant='bordered' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <DatePicker label='Fecha del evento' />
        </div>

        <div>
          <TimeInput label='Event Time' />
        </div>
      </div>

      <div>
        <Input label='Ubicación' />
      </div>

      {/* Categoría, Precio y Boletos disponibles */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <Select className='max-w-xs' items={categoryOptions} label='Categoría'>
            {(category) => <SelectItem key={category.value}>{category.label}</SelectItem>}
          </Select>
        </div>

        <div>
          <NumberInput label='Precio del boleto' />
        </div>

        <div>
          <NumberInput label='Boletos disponibles' />
        </div>
      </div>

      {/* URL de imagen e Opción destacado */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input type='file' />
      </div>

      {/* Botón de envío */}
      <div className='flex justify-end'>
        <Button>Cancelar</Button>
        <Button type='submit' color='primary' isLoading={isLoading} className='w-full md:w-auto'>
          {isLoading ? 'Guardando...' : 'Crear Evento'}
        </Button>
      </div>
    </form>
  )
}

export default EventForm
