'use client'
// hooks/useAuth.tsx
// Hook para autenticación con Supabase

import { supabase } from '@/lib/supabase'
import { userService } from '@/services/userService'
import { User } from '@supabase/supabase-js'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Profile {
  id: string
  full_name: string
  phone: string
  role: 'customer' | 'organizer' | 'admin'
}

interface AuthUser extends Profile {
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  signUp: (email: string, password: string, userData: { full_name: string; phone: string }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Función para obtener el perfil del usuario
  const getUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase.from('profiles').select('id, full_name, phone, role').eq('id', userId).single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserProfile:', error)
      return null
    }
  }

  // Función para establecer el usuario autenticado
  const setAuthUser = async (supabaseUser: User | null) => {
    if (!supabaseUser) {
      setUser(null)
      return
    }
    const profile = await getUserProfile(supabaseUser.id)

    if (profile) {
      const authUser: AuthUser = {
        ...profile,
        email: supabaseUser.email || '',
        // Mapear avatar para compatibilidad con el código existente
        avatar: `https://i.pravatar.cc/150?img=${profile.id.slice(-1)}`
      } as AuthUser & { avatar: string }

      setUser(authUser)
    } else {
      // Si no hay perfil, crear uno básico
      const basicUser: AuthUser = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        full_name: supabaseUser.user_metadata?.full_name || 'Usuario',
        phone: supabaseUser.user_metadata?.phone || '',
        role: 'customer'
      } as AuthUser & { avatar: string }

      setUser(basicUser)
    }
  }

  // Escuchar cambios de autenticación
  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
        } else {
          await setAuthUser(session?.user || null)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Suscribirse a cambios de autenticación
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await setAuthUser(session?.user || null)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })

      if (error) {
        console.error('Login error:', error.message)
        return false
      }

      if (data.user) {
        await setAuthUser(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Login exception:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Función de registro
  const signUp = async (email: string, password: string, userData: { full_name: string; phone: string }): Promise<boolean> => {
    try {
      setIsLoading(true)

      //TODO:Implementar el uso del servicio de usuario en este hook

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone
          }
        }
      })

      if (error) {
        console.error('SignUp error:', error.message)
        return false
      }

      // Si el usuario se creó exitosamente
      if (data.user) {
        // Crear el perfil en la tabla profiles
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: userData.full_name,
          phone: userData.phone,
          role: 'user'
        })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // No retornamos false aquí porque el usuario ya se creó en auth
        }

        return true
      }

      return false
    } catch (error) {
      console.error('SignUp exception:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Función de logout
  const logout = async () => {
    try {
      setIsLoading(true)
      await userService.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout exception:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, signUp }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
