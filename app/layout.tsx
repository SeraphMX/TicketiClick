import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { SessionBootstrapper } from './sessionBoostraper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ticketi Click - Plataforma de Venta de Boletos',
  description: 'Encuentra y compra boletos para los mejores eventos',
  icons: {
    icon: '/branding/favicon.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        <Providers>
          <SessionBootstrapper />
          <Navbar />
          <main className='flex-grow '>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
