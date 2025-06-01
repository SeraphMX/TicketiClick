// components/Footer.tsx
// Pie de página

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo y descripción */}
          <div className='col-span-1 md:col-span-1'>
            <div className='flex items-center mb-4'>
              <Image src='/branding/logo-ticketi.webp' alt='Logo' className='h-8 w-8 mr-2' width={50} height={50} />
              <span className='font-bold text-xl'>Ticketi</span>
            </div>
            <p className='text-gray-400 mb-4'>Tu acceso a los mejores eventos en un solo click</p>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                <Facebook className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                <Twitter className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                <Instagram className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Enlaces rápidos</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/conoce-ticketi' className='text-gray-400 hover:text-white transition-colors'>
                  Conoce Ticketi
                </Link>
              </li>
              <li>
                <Link href='/eventos' className='text-gray-400 hover:text-white transition-colors'>
                  ¿Eres organizador?
                </Link>
              </li>
              <li>
                <Link href='/dashboard' className='text-gray-400 hover:text-white transition-colors'>
                  Mi cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Páginas útiles</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/preguntas-frecuentes' className='text-gray-400 hover:text-white transition-colors'>
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href='aviso-de-privacidad' className='text-gray-400 hover:text-white transition-colors'>
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href='terminos-y-condiciones' className='text-gray-400 hover:text-white transition-colors'>
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Contacto</h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <MapPin className='h-5 w-5 mr-2 text-blue-400 mt-0.5' />
                <span className='text-gray-400'>Donceles 22, CDMX</span>
              </li>
              <li className='flex items-center'>
                <Phone className='h-5 w-5 mr-2 text-blue-400' />
                <span className='text-gray-400'>+34 912 345 678</span>
              </li>
              <li className='flex items-center'>
                <Mail className='h-5 w-5 mr-2 text-blue-400' />
                <span className='text-gray-400'>hola@ticketi.click</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>© {currentYear} Ticketi Click. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
