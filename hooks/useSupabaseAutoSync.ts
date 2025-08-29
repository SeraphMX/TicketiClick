// hooks/useSupabaseAuthSync.ts
import { supabase } from '@/lib/supabase'
import { clearUser, restoreSession } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useSupabaseAuthSync() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Restaurar la sesión al cargar
    dispatch(restoreSession())

    // Escuchar cambios de sesión en otras pestañas
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Se logueó o restauró sesión → traer datos del perfil
        dispatch(restoreSession())
      } else {
        // Se deslogueó → limpiar el estado
        dispatch(clearUser())
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [dispatch])
}
