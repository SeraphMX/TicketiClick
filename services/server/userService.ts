import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const userService = {
  async getEmailByPhone(phone: string): Promise<boolean> {
    const { data, error } = await supabaseAdmin.rpc('get_email_by_phone', { p_phone_number: phone })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')

    return data
  },
  async passwordChange(email: string, password: string): Promise<string | null> {
    // Primero buscamos el usuario por email
    const { data: user, error: userError } = await supabaseAdmin.rpc('get_id_by_email', { p_email: email })

    if (userError || !user) {
      throw new Error(userError?.message || 'Usuario no encontrado')
    }

    //Usamos el id (UUID) para actualizar la contraseña
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user, {
      password
    })

    if (error) {
      throw new Error(error.message || 'Error al cambiar la contraseña.')
    }
    return data.user?.email || null
  }
}
