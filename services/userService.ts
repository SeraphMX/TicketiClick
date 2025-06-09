// src/services/userService.ts

import { supabase } from '@/lib/supabase'
import { SignInParams, SignUpParams } from '@/types/user'

export const userService = {
  async signUp({ email, password, metadata }: SignUpParams) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })

    if (error) throw error

    // Ejemplo: insertar en tabla "clientes"
    if (data.user) {
      const metadata = data.user.user_metadata

      const { error: insertError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: metadata?.full_name,
        phone: metadata?.phone || ''
      })
      if (insertError) throw insertError
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
