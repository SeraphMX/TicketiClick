import { SignUpParams } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'

interface RegisterState {
  isLoading: boolean
  error: string | null
  success: boolean
  signUpParams: SignUpParams
  otpVerified: boolean
}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  success: false,
  signUpParams: {
    email: '',
    password: '',
    terms: false,
    metadata: {
      full_name: '',
      phone: '',
      role: 'user'
    }
  },
  otpVerified: false
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRole(state, action) {
      const { role } = action.payload
      state.signUpParams.metadata.role = role
    },
    setEmailPhoneTerms: (state, action) => {
      const { email, phone, terms } = action.payload
      state.signUpParams.email = email
      state.signUpParams.metadata.phone = phone
      state.signUpParams.terms = terms
    },
    setFullNamePassword: (state, action) => {
      const { full_name, password } = action.payload
      state.signUpParams.metadata.full_name = full_name
      state.signUpParams.password = password
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    resetRegisterState: (state) => initialState
  }
})

export const { setEmailPhoneTerms, setFullNamePassword, setOtpVerified, setLoading, setError, resetRegisterState, setRole, setSuccess } =
  registerSlice.actions

export default registerSlice.reducer
