import { supabase } from '@/lib/supabase'
import { EmailActions } from '@/types/email'
import { SignInParams, SignUpParams } from '@/types/user'

export const userService = {
  /**
   * Verifica si un número de teléfono móvil ya está registrado en la base de datos.
   * @param mobileNumber - El número de teléfono móvil a verificar.
   * @returns `true` si el número está registrado, `false` en caso contrario.
   */
  async isPhoneRegistered(mobileNumber: string): Promise<boolean> {
    const { data, error } = await supabase.from('profiles').select('id').eq('phone', mobileNumber).maybeSingle()
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
    return !!data
  },
  /**
   * Verifica si un correo electrónico ya está registrado en la base de datos.
   * @param email - El correo electrónico a verificar.
   * @returns `true` si el correo está registrado, `false` en caso contrario.
   */
  async isEmailRegistered(email: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_email_registered', { p_email: email })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
    return !!data
  },
  /**
   * Obtiene el correo electrónico asociado a un número de teléfono móvil.
   * @param phone - El número de teléfono móvil del usuario.
   * @returns El correo electrónico asociado al número de teléfono.
   */
  async getEmailByPhone(phone: string) {
    const response = await fetch(`/api/account/get-email-by-phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    })

    return await response.json()
  },

  /**
   * Verifica si un número de teléfono móvil ya está registrado en la base de datos.
   * @param mobileNumber - El número de teléfono móvil a verificar.
   * @returns `true` si el número está registrado, `false` en caso contrario.
   */
  async VerifyMobileNumber(mobileNumber: string) {
    // Formatear número de teléfono
    const formattedPhone = `+52${mobileNumber}`
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/validate-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        phone: formattedPhone
      })
    })
    return await response.json()
  },
  /**
   * Envía un correo electrónico de bienvenida al usuario después de registrarse.
   * @param email - El correo electrónico del usuario.
   * @returns La respuesta del servidor al enviar el correo.
   */
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
  /**
   * Envía un correo electrónico para restablecer la contraseña del usuario.
   * @param email - El correo electrónico del usuario.
   * @returns La respuesta del servidor al enviar el correo.
   */
  async sendPasswordResetEmail(email: string) {
    console.log('Enviando correo de restablecimiento de contraseña a:', email)
    const response = await fetch('/api/mail/send-password-reset-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    if (!response.ok) {
      throw new Error('Error al enviar el correo de restablecimiento de contraseña')
    }
    return await response.json()
  },
  /**
   * Cambia la contraseña del usuario.
   * @param email - El correo electrónico del usuario.
   * @param password - La nueva contraseña del usuario.
   * @returns La respuesta del servidor al cambiar la contraseña.
   */
  async passwordChange(email: string, password: string) {
    console.log('Cambiando contraseña para el correo:', email)
    const response = await fetch('/api/account/password-change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (!response.ok) {
      throw new Error('Error al cambiar la contraseña')
    }

    this.sendEmail(email, 'password-changed')
    console.log('Contraseña cambiada y correo enviado a:', email)
    return await response.json()
  },
  /**
   * Envía un correo electrónico según la acción especificada.
   * @param email - El correo electrónico del usuario.
   * @param action - La acción para la cual se enviará el correo (create-account, verify-account, password-reset, password-changed, purchase-confirmation).
   * Las acciones deben estar definidas en el tipo `EmailActions`.
   * @returns La respuesta del servidor al enviar el correo.
   */
  async sendEmail(email: string, action: EmailActions) {
    console.log('Enviando correo electrónico:', email, 'con acción:', action)

    const endPoints = {
      'create-account': '/api/mail/send-register-email',
      'verify-account': '/api/mail/send-welcome-email',
      'password-reset': '/api/mail/send-password-reset-email',
      'password-changed': '/api/mail/send-password-changed-email',
      'purchase-confirmation': '/api/mail/send-purchase-confirmation-email'
    }

    if (!endPoints[action]) {
      throw new Error('Acción no válida para enviar correo electrónico')
    }

    //console.log('Endpoint para enviar correo:', endPoints[action])

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endPoints[action]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Error al enviar el correo electrónico')
    }

    return await response.json()
  },
  /**
   * Verifica el correo electrónico del usuario llamando a una función de Supabase.
   * @param email - El correo electrónico a verificar.
   */
  async VerifyEmail(email: string) {
    console.log('Verificando correo electrónico:', email)
    const { data, error } = await supabase.rpc('verify_email', { p_email: email })
    if (error) throw new Error(error.message || 'Error al consultar la base de datos.')
  },
  /**
   * Envía un código OTP (One Time Password) al número de teléfono móvil del usuario.
   * @param mobileNumber - El número de teléfono móvil del usuario.
   * @returns La respuesta del servidor al enviar el OTP.
   */
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
  /**
   * Verifica el código OTP enviado al número de teléfono móvil.
   * @param mobileNumber - El número de teléfono móvil del usuario.
   * @param otp - El código OTP recibido por SMS.
   * @returns La respuesta del servidor al verificar el OTP.
   */
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

  /**
   * Inicia sesión un usuario con su correo electrónico y contraseña.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   */
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
