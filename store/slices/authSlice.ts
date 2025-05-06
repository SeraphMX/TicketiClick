// store/slices/authSlice.ts
// Slice para manejar la autenticación y OTP

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  otpSent: boolean;
  otpVerified: boolean;
  userData: {
    email?: string;
    phone?: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  otpSent: false,
  otpVerified: false,
  userData: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Enviar OTP (simulado)
    sendOtp: (state, action: PayloadAction<{ email: string; phone: string }>) => {
      state.otpSent = true;
      state.userData = action.payload;
    },
    
    // Verificar OTP
    verifyOtp: (state, action: PayloadAction<string>) => {
      // Mock: verificar si el código es "123456"
      if (action.payload === '123456') {
        state.otpVerified = true;
        state.isAuthenticated = true;
      }
    },
    
    // Limpiar estado de OTP
    clearOtp: (state) => {
      state.otpSent = false;
      state.otpVerified = false;
    },
    
    // Cerrar sesión
    logout: (state) => {
      return initialState;
    }
  }
});

export const { sendOtp, verifyOtp, clearOtp, logout } = authSlice.actions;
export default authSlice.reducer;