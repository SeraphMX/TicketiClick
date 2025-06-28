// store/slices/authSlice.ts

import { supabase } from '@/lib/supabase'
import { userService } from '@/services/userService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthUserPayload {
  id: string
  email: string
  phone: string
  full_name: string
  role: 'customer' | 'organizer' | 'admin'
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUserPayload | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null
}

const allowedRoles = ['customer', 'organizer', 'admin'] as const
function castRole(role: string): 'customer' | 'organizer' | 'admin' {
  return allowedRoles.includes(role as any) ? (role as 'customer' | 'organizer' | 'admin') : 'customer'
}

// LOGIN thunk
export const loginUser = createAsyncThunk<AuthUserPayload, { email: string; password: string }, { rejectValue: string }>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await userService.signIn({ email, password })
      if (!user) throw new Error('No se pudo iniciar sesión')

      const profile = await userService.getUserProfile(user.id)

      return {
        id: user.id,
        email: user.email ?? '',
        full_name: profile.full_name,
        phone: profile.phone,
        role: castRole(profile.role)
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// SIGNUP thunk
export const signUpUser = createAsyncThunk<
  AuthUserPayload,
  { email: string; password: string; full_name: string; phone: string },
  { rejectValue: string }
>('auth/signUpUser', async ({ email, password, full_name, phone }, thunkAPI) => {
  try {
    const { user } = await userService.signUp({
      email,
      password,
      metadata: { full_name, phone }
    })

    if (!user) throw new Error('No se pudo registrar el usuario')

    return {
      id: user.id,
      email: user.email ?? '',
      full_name,
      phone,
      role: 'customer' // signup fija el rol a customer
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

// LOGOUT thunk
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await userService.signOut()
})

export const restoreSession = createAsyncThunk('auth/restoreSession', async (_, thunkAPI) => {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    const user = session?.user

    if (!user) return thunkAPI.rejectWithValue('No hay sesión activa')

    const profile = await userService.getUserProfile(user.id)

    return {
      id: user.id,
      email: user.email ?? '',
      full_name: profile.full_name,
      phone: profile.phone,
      role: profile.role
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Error al restaurar sesión')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthUserPayload> & { id: string }>) => {
      const { id, email, phone, full_name, role } = action.payload
      state.isAuthenticated = true
      state.user = {
        id,
        email: email || '',
        phone: phone || '',
        full_name: full_name || '',
        role: role || 'customer'
      }
      state.error = null
    },
    clearUser: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUserPayload>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload ?? 'Error desconocido'
      })

      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<AuthUserPayload>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload ?? 'Error desconocido'
      })

      .addCase(logoutUser.fulfilled, () => {
        return initialState
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isAuthenticated = false
        state.user = initialState.user
        state.isLoading = false
      })
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { clearUser, setUser } = authSlice.actions
export default authSlice.reducer
