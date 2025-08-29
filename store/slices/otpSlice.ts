import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OtpState {
  otpVerified: boolean
}

const initialState: OtpState = {
  otpVerified: false
}

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtpVerified(state, action: PayloadAction<boolean>) {
      state.otpVerified = action.payload
    },
    resetOtpState(state) {
      state.otpVerified = false
    }
  }
})

export const { setOtpVerified, resetOtpState } = otpSlice.actions

export default otpSlice.reducer
