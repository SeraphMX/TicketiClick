'use client'
// components/EventForm.tsx
// Formulario para crear o editar eventos

import { EventFormData } from '@/schemas/event.schema'
import { Button, NumberInput, Select, SelectItem, Textarea } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '../ui/input'

interface EventFormProps {
  onSubmit: (data: EventFormData) => void
  isLoading?: boolean
}

const EventForm = ({ onSubmit, isLoading = false }: EventFormProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({
    // resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      price: 0,
      ticketsAvailable: 0,
      imageUrl: ''
    }
  })

  const router = useRouter()

  const handleFormSubmit = handleSubmit(
    async (data) => {
      try {
        console.log(data)
        // Prepare the event data for Supabase
        const eventData = {
          ...data,
          event_date: data.date,
          event_time: data.time,
          slug: data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }

        console.log('Event Data:', eventData)

        // Create the event using the service
        //await eventService.createEvent(eventData)

        // Show success message and redirect
        toast.success('Evento creado exitosamente')
        // router.push('/dashboard/organizador')
      } catch (error) {
        console.error('Error creating event:', error)
        toast.error('Error al crear el evento: ' + error)
      }
    },
    (errors) => {
      console.log('Validation errors:', errors)
      toast.error('Por favor corrige los errores en el formulario')
    }
  )

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
    <form onSubmit={handleFormSubmit} className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Crear nuevo evento</h2>

      <Input label='Título del evento' {...register('title')} isInvalid={!!errors.title} errorMessage={errors.title?.message} />

      <Textarea label='Descripción del evento' variant='bordered' {...register('description')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          {/* <Controller
            name='date'
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label='Fecha del evento'
                value={value ? new Date(value) : null}
                onChange={(date) => onChange(date ? date.toString() : '')}
              />
            )}
          /> */}
        </div>

        <div>
          {/* <Controller
            name="time"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeInput
                label='Hora del evento'
                value={value ? new Date(value) : null}
                onChange={(time) => onChange(time ? time.toISOString() : '')}
              />
            )}
          /> */}
        </div>
      </div>

      <div>
        <Input label='Ubicación' {...register('location')} />
      </div>

      {/* Categoría, Precio y Boletos disponibles */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <Select
            className='max-w-xs'
            items={categoryOptions}
            label='Categoría'
            {...register('category')}
            isInvalid={!!errors.category}
            errorMessage={errors.category?.message}
          >
            {(category) => <SelectItem key={category.value}>{category.label}</SelectItem>}
          </Select>
        </div>

        <div>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <NumberInput
                label='Precio del boleto'
                value={field.value}
                onChange={(value) => field.onChange(value)}
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name='ticketsAvailable'
            control={control}
            render={({ field }) => (
              <NumberInput
                label='Boletos disponibles'
                value={field.value}
                onChange={(value) => field.onChange(value)}
                isInvalid={!!errors.ticketsAvailable}
                errorMessage={errors.ticketsAvailable?.message}
              />
            )}
          />
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
