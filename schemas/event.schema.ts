import { z } from 'zod'

// Esquema de validación para el formulario de evento
export const eventSchema = z.object({
  title: z.string().nonempty('El título es obligatorio'),
  description: z.string().nonempty('La descripción es obligatoria'),
  date: z
    .date()
    .nullable()
    .refine((val) => val !== null, { message: 'La fecha es obligatoria' }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'El formato de la hora debe ser HH:mm'),
  location: z.string().nonempty('La ubicación es obligatoria'),
  category: z.string().nonempty('La categoría es obligatoria'),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  ticketsAvailable: z.number().min(0, 'La cantidad de boletos no puede ser negativa'),
  imageUrl: z.string().url('La URL de la imagen no es válida').optional(),
  featured: z.boolean().optional()
})

export type EventFormData = z.infer<typeof eventSchema>
