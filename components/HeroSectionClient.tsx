'use client'

import { Facebook, Link2, Twitter } from 'lucide-react'
import Link from 'next/link'

const HeroSectionClient = () => {
  // Imágenes para las categorías
  const categoryImages: Record<string, string> = {
    music: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    sports: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    theater: 'https://images.pexels.com/photos/11523493/pexels-photo-11523493.jpeg',
    conference: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    festival: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    workshop: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
    other: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg'
  }

  // URLs para compartir
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `¡Asiste a este increíble evento! ${shareUrl}`
  const encodedShareText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)

  // Funciones para compartir
  const handleShare = async (platform: string) => {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`, '_blank')
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl)
          alert('¡Enlace copiado!')
        } catch (err) {
          console.error('Error al copiar:', err)
        }
        break
    }
  }
  return (
    <section className='relative  text-white py-20 min-h-screen flex items-end'>
      <div
        className='absolute inset-0 '
        style={{
          backgroundImage: "url('events/1745434434PQzWhASDd4.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Capa de gradiente (sin opacidad en el contenedor) */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/90 to-transparent'></div>

      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='md:flex justify-between items-end space-y-3'>
          <div className='w-full text-left px-4 sm:px-6 lg:px-8'>
            <h1 className='text-4xl sm:text-5xl font-extrabold mb-6 animate-fade-in'>Chapul Big Band</h1>

            <div className='flex flex-col sm:flex-row gap-4'>
              {/* <Link
            href='/events'
            className='inline-flex items-center justify-center px-5 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors'
          >
            <Search className='h-5 w-5 mr-2' />
            Explorar eventos
          </Link> */}
              <Link
                href='/event/chapul-big-band'
                className='inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg border border-blue-500 hover:bg-blue-700 transition-colors'
              >
                Comprar entradas
              </Link>
            </div>
          </div>
          <div className='lg:flex gap-2 items-center lg:w-1/3 '>
            <span>Compartir evento</span>
            <button
              onClick={() => handleShare('facebook')}
              className='p-2 hover:bg-blue-600 rounded-full transition-colors'
              title='Compartir en Facebook'
            >
              <Facebook className='h-5 w-5' />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className='p-2 hover:bg-blue-600 rounded-full transition-colors'
              title='Compartir en Twitter'
            >
              <Twitter className='h-5 w-5' />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className='p-2 hover:bg-blue-600 rounded-full transition-colors'
              title='Copiar enlace'
            >
              <Link2 className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSectionClient
