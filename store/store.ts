// store/store.ts
// Configuración del store de Redux

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import checkoutReducer from './slices/checkoutSlice';
import eventsReducer from './slices/eventsSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'checkout'] // Solo persistir estos reducers
};

// Configurar reducers con persistencia
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCheckoutReducer = persistReducer(persistConfig, checkoutReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    checkout: persistedCheckoutReducer,
    events: eventsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;