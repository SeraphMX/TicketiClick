'use client'
// components/EventList.tsx
// Componente para mostrar una lista de eventos

import { Event, EventCategory } from '@/lib/types'
import { ChevronDown, Search, X } from 'lucide-react'
import { useState } from 'react'
import EventCard from './EventCard'

interface EventListProps {
  events: Event[]
  title?: string
  showFilters?: boolean
}

// Traductor de categorías
const translateCategory = (category: string) => {
  const translations: Record<string, string> = {
    music: 'Música',
    sports: 'Deportes',
    theater: 'Teatro',
    conference: 'Conferencia',
    festival: 'Festival',
    workshop: 'Taller',
    other: 'Otros'
  }

  return translations[category] || 'Otro'
}

const EventList = ({ events, title = 'Eventos', showFilters = true }: EventListProps) => {
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null })
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Obtener todas las categorías únicas
  const categories = Array.from(new Set(events.map((event) => event.category)))

  // Aplicar filtros
  const filteredEvents = events.filter((event) => {
    // Filtro por categoría
    if (categoryFilter !== 'all' && event.category !== categoryFilter) {
      return false
    }

    // Filtro por término de búsqueda
    if (
      searchTerm &&
      !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filtro por precio mínimo
    if (priceRange.min > 0 && event.price < priceRange.min) {
      return false
    }

    // Filtro por precio máximo (si está definido)
    if (priceRange.max !== null && event.price > priceRange.max) {
      return false
    }

    return true
  })

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setCategoryFilter('all')
    setSearchTerm('')
    setPriceRange({ min: 0, max: null })
  }

  // Verificar si algún filtro está activo
  const isFilterActive = categoryFilter !== 'all' || searchTerm !== '' || priceRange.min > 0 || priceRange.max !== null

  return (
    <div>
      {title && <h2 className='text-2xl font-bold text-gray-800 mb-6'>{title}</h2>}

      {showFilters && (
        <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
            {/* Búsqueda */}
            <div className='relative flex-grow max-w-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Buscar eventos...'
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  <X className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                </button>
              )}
            </div>

            {/* Filtro de precio */}
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>Precio:</span>
              <input
                type='number'
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                className='w-24 py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Min'
                min='0'
              />
              <span>-</span>
              <input
                type='number'
                value={priceRange.max === null ? '' : priceRange.max}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : parseFloat(e.target.value)
                  setPriceRange({ ...priceRange, max: value })
                }}
                className='w-24 py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Max'
                min='0'
              />
              <span className='text-sm text-gray-600'>€</span>
            </div>

            {/* Botón para limpiar filtros */}
            {isFilterActive && (
              <button onClick={clearFilters} className='text-sm text-blue-600 hover:text-blue-800 flex items-center'>
                <X className='h-4 w-4 mr-1' />
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Filtros por categoría */}
          <div className='flex flex-wrap gap-2 mt-4'>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`text-sm px-3 py-1 rounded-full ${
                categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas
            </button>

            {/* Mostrar algunas categorías o todas */}
            {(showAllCategories ? categories : categories.slice(0, 5)).map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`text-sm px-3 py-1 rounded-full ${
                  categoryFilter === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {translateCategory(category)}
              </button>
            ))}

            {/* Botón para ver más/menos categorías */}
            {categories.length > 5 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className='text-sm text-blue-600 hover:text-blue-800 flex items-center'
              >
                {showAllCategories ? 'Ver menos' : 'Ver más'}
                <ChevronDown className={`h-4 w-4 ml-1 transform ${showAllCategories ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Resultados y conteo */}
      <div className='flex justify-between items-center mb-4'>
        <p className='text-gray-600'>
          Mostrando {filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'}
          {isFilterActive ? ' con los filtros aplicados' : ''}
        </p>
      </div>

      {/* Lista de eventos */}
      {filteredEvents.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} featured={event.featured} />
          ))}
        </div>
      ) : (
        <div className='bg-white p-8 rounded-lg shadow text-center'>
          <p className='text-lg text-gray-600'>No se encontraron eventos con los filtros aplicados.</p>
          {isFilterActive && (
            <button
              onClick={clearFilters}
              className='mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              <X className='h-4 w-4 mr-2' />
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default EventList
