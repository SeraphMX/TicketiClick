import { supabase } from '@/lib/supabase'
import { SignInParams, SignUpParams } from '@/types/user'

export const userService = {
  async isPhoneRegistered(mobileNumber: string): Promise<boolean> {
    const { data, error } = await supabase.from('profiles').select('id').eq('phone', mobileNumber).maybeSingle()
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
    return !!data
  },
  async isEmailRegistered(email: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_email_registered', { p_email: email })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
    return !!data
  },
  async VerifyMobileNumber(mobileNumber: string) {
    // Formatear número de teléfono
    const formattedPhone = `+52${mobileNumber}`
    const validateResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/validate-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        phone: formattedPhone
      })
    })
    return await validateResponse.json()
  },
  async sendWelcomeEmail(email: string) {
    console.log('Enviando correo de bienvenida a:', email)
    const response = await fetch('/api/mail/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Error al verificar el correo electrónico')
    }

    return await response.json()
  },
  async VerifyEmail(email: string) {
    console.log('Verificando correo electrónico:', email)
    const { data, error } = await supabase.rpc('verify_email', { p_email: email })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
  },
  async sendOTP(mobileNumber: string) {
    // Formatear número de teléfono
    const formattedPhone = `+52${mobileNumber}`
    const otpResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        phone: formattedPhone
      })
    })

    if (!otpResponse.ok) {
      throw new Error('Error al enviar el código de verificación')
    }

    return await otpResponse.json()
  },
  async verifyOTP(mobileNumber: string, otp: string) {
    // Formatear número de teléfono
    const formattedPhone = `+52${mobileNumber}`
    const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        phone: formattedPhone,
        code: otp
      })
    })

    const response = await verifyResponse.json()

    let error
    if (response.error) {
      if (response.error.includes('was not found')) {
        error = 'Código expirado'
      } else if (response.error == 'Max check attempts reached') {
        error = 'Límite de intentos alcanzado'
      } else {
        error = 'Error al verificar'
      }
      console.warn('Error al verificar OTP:', error)
      return { error }
    } else {
      return response
    }
  },

  /**
   * Registra un nuevo usuario y crea su perfil en la base de datos.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @param metadata - Metadatos adicionales del usuario.
   */
  async signUp({ email, password, metadata }: SignUpParams) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })

    if (error) throw error

    // Insertar datos en la tabla 'profiles' si el usuario se creó correctamente
    if (data.user) {
      const metadata = data.user.user_metadata

      const { error: insertError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: metadata?.full_name,
        phone: metadata?.phone || ''
      })
      if (insertError) throw insertError

      // Enviar correo de bienvenida
      await this.sendWelcomeEmail(email)
    }

    return data
  },

  async signIn({ email, password }: SignInParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  }
}
