// store/store.ts
// Configuración del store de Redux

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import checkoutReducer from './slices/checkoutSlice'
import eventsReducer from './slices/eventsSlice'
import otpReducer from './slices/otpSlice'
import recoverAccountReducer from './slices/recoverAccountSlice'
import registerReducer from './slices/registerSlice'

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'checkout'] // Solo persistir estos reducers
}

// Configurar reducers con persistencia
const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedCheckoutReducer = persistReducer(persistConfig, checkoutReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    checkout: persistedCheckoutReducer,
    events: eventsReducer,
    register: registerReducer,
    recoverAccount: recoverAccountReducer,
    otp: otpReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
