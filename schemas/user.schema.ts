import { z } from 'zod'

export const createUser = z.object({
  phone: z.string().min(10, { message: 'Número de teléfono inválido' }),
  email: z.string().email({ message: 'Email inválido' }),
  terms: z.boolean().refine((val) => val, {
    message: 'Debes aceptar los términos y condiciones'
  })
})
export type CreateUser = z.infer<typeof createUser>

export const confirmUser = z
  .object({
    phone: z.string().min(10, { message: 'Número de teléfono inválido' }),
    email: z.string().email(),
    name: z.string().min(5).max(100),
    password: z.string().min(8, { message: 'Mínimo 8 caracteres' }).max(100),
    password2: z.string().nonempty({ message: 'Debes confirmar tu contraseña' }),
    terms: z.boolean().refine((val) => val, {
      message: 'Debes aceptar los términos y condiciones'
    })
  })
  .refine((data) => data.password === data.password2, {
    message: 'Las contraseñas no coinciden',
    path: ['password2']
  })
export type ConfirmUser = z.infer<typeof confirmUser>

export const loginUser = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
})
export type LoginUser = z.infer<typeof loginUser>
