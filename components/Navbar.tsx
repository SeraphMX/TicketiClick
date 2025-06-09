'use client'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Menu, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Estado para controlar si el navbar se muestra o no
  const [showNavbar, setShowNavbar] = useState(true)

  // Referencia para guardar la posición previa del scroll
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 0) return

      // Si el scroll actual es mayor que el anterior, significa que estás bajando, ocultamos el navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false)
      } else {
        // Si haces scroll hacia arriba, mostramos el navbar
        setShowNavbar(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`
      fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md
      transition-transform duration-200 ease-in-out
      ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
    `}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14'>
          {/* Logo y Nombre */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <Image src='/branding/logo-ticketi.webp' alt='Logo' className='h-6 w-6 mr-2' width={50} height={50} />
              <span className='font-bold text-xl'>Ticketi </span>
            </Link>
          </div>

          {/* Navegación - Desktop */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-4'>
              <Link href='/' className='px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors'>
                Inicio
              </Link>
              <Link href='/eventos' className='px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors'>
                Eventos
              </Link>
              {user && (
                <Link href='/dashboard' className='px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors'>
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Botones de Autenticación - Desktop */}
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              {user ? (
                <div className='flex items-center'>
                  <div className='flex items-center mr-4'>
                    <img
                      className='h-8 w-8 rounded-full border-2 border-white'
                      src={user.avatar || `https://i.pravatar.cc/150?img=${user.id.slice(-1)}`}
                      alt={user.full_name || user.email}
                    />
                    <span className='ml-2'>{user.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors'
                  >
                    <LogOut className='h-4 w-4 mr-1' />
                    Salir
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-900 hover:bg-gray-800 transition-colors'
                  >
                    <User className='h-4 w-4 mr-1' />
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className='md:hidden flex items-center'>
            <button
              className='inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none'
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className='md:hidden bg-zinc-900 shadow-lg pb-3 pt-2 px-2 space-y-1 sm:px-3'>
          <Link
            href='/'
            className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600'
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href='/eventos'
            className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600'
            onClick={() => setIsMenuOpen(false)}
          >
            Eventos
          </Link>
          {user && (
            <Link
              href='/dashboard'
              className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600'
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <div className='px-3 py-2 flex items-center'>
                <img
                  className='h-8 w-8 rounded-full border-2 border-white'
                  src={user.avatar || `https://i.pravatar.cc/150?img=${user.id.slice(-1)}`}
                  alt={user.full_name || user.email}
                />
                <span className='ml-2 text-white'>{user.full_name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className='w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700'
              >
                <LogOut className='h-5 w-5 mr-2' />
                Salir
              </button>
            </>
          ) : (
            <Link
              href='/login'
              className='flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700'
              onClick={() => setIsMenuOpen(false)}
            >
              <User className='h-5 w-5 mr-2' />
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
