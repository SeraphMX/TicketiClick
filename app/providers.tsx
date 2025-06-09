// app/providers.tsx
// Providers de la aplicación

'use client'

import { persistor, store } from '@/store/store'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </HeroUIProvider>
  )
}
