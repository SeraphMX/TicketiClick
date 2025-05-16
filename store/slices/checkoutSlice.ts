// store/slices/checkoutSlice.ts
// Slice para manejar el flujo de checkout

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CheckoutState {
  step: number
  contactInfo: {
    email: string
    phone: string
    createAccount: boolean
  }
  otpVerified: boolean
  ticketCustomization: {
    names: string[]
  }
  paymentMethod: 'card' | 'transfer' | 'deposit' | null
  timer: number // Tiempo restante en segundos
  paymentIntentId?: string
}

const initialState: CheckoutState = {
  step: 1,
  contactInfo: {
    email: '',
    phone: '',
    createAccount: false
  },
  otpVerified: false,
  ticketCustomization: {
    names: []
  },
  paymentMethod: null,
  timer: 15 * 60 // 15 minutos
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Navegación entre pasos
    goToNextStep: (state) => {
      if (state.step < 5) state.step += 1
    },
    goToPrevStep: (state) => {
      if (state.step > 1) state.step -= 1
    },

    // Actualizar datos de contacto
    setContactInfo: (state, action: PayloadAction<typeof initialState.contactInfo>) => {
      state.contactInfo = action.payload
    },

    // Verificar OTP
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.otpVerified = action.payload
    },

    // Actualizar nombres de boletos
    setTicketNames: (state, action: PayloadAction<string[]>) => {
      state.ticketCustomization.names = action.payload
    },

    // Establecer método de pago
    setPaymentMethod: (state, action: PayloadAction<typeof initialState.paymentMethod>) => {
      state.paymentMethod = action.payload
    },

    // Establecer ID de PaymentIntent
    setPaymentIntentId: (state, action: PayloadAction<string | undefined>) => {
      state.paymentIntentId = action.payload
    },

    // Actualizar timer
    updateTimer: (state) => {
      if (state.timer > 0) state.timer -= 1
    },

    // Reiniciar checkout
    resetCheckout: () => initialState
  }
})

export const {
  goToNextStep,
  goToPrevStep,
  setContactInfo,
  setOtpVerified,
  setTicketNames,
  setPaymentMethod,
  setPaymentIntentId,
  updateTimer,
  resetCheckout
} = checkoutSlice.actions

export default checkoutSlice.reducer
