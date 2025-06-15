import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RecoverAccountState {
  email: string
  phone: string
  otpVerified: boolean
}

const initialState: RecoverAccountState = {
  email: '',
  phone: '',
  otpVerified: false
}

const recoverAccountSlice = createSlice({
  name: 'recoverAccount',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setOtpVerified(state, action: PayloadAction<boolean>) {
      state.otpVerified = action.payload
    },
    resetRecoverAccount(state) {
      state.email = ''
      state.phone = ''
      state.otpVerified = false
    }
  }
})

export const { setEmail, setPhone, setOtpVerified, resetRecoverAccount } = recoverAccountSlice.actions

export default recoverAccountSlice.reducer
