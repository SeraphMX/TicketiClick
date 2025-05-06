"use client";
// components/EventForm.tsx
// Formulario para crear o editar eventos

import { useState } from 'react';
import { EventFormData, EventCategory } from '@/lib/types';
import { CalendarDays, MapPin, Tag, Clock, Info, Ticket, Image, DollarSign } from 'lucide-react';

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  isLoading?: boolean;
}

const EventForm = ({ onSubmit, isLoading = false }: EventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    category: 'other',
    availableTickets: 0,
    featured: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EventFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.date) {
      newErrors.date = 'La fecha es obligatoria';
    }
    
    if (!formData.time) {
      newErrors.time = 'La hora es obligatoria';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'La ubicación es obligatoria';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que cero';
    }
    
    if (formData.availableTickets <= 0) {
      newErrors.availableTickets = 'Debe haber al menos un boleto disponible';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
    
    // Limpiar error cuando el usuario modifica un campo
    if (errors[name as keyof EventFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Mapeador de categorías para el select
  const categoryOptions = [
    { value: 'music', label: 'Música' },
    { value: 'sports', label: 'Deportes' },
    { value: 'theater', label: 'Teatro' },
    { value: 'conference', label: 'Conferencia' },
    { value: 'festival', label: 'Festival' },
    { value: 'workshop', label: 'Taller' },
    { value: 'other', label: 'Otro' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Evento</h2>
      
      {/* Título */}
      <div>
        <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <Info className="w-4 h-4 mr-1" />
          Título del evento
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="Ej: Concierto de Rock en Vivo"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      {/* Descripción */}
      <div>
        <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <Info className="w-4 h-4 mr-1" />
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="Describe tu evento de forma detallada"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      {/* Fecha y Hora */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <CalendarDays className="w-4 h-4 mr-1" />
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>
        
        <div>
          <label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            Hora
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
        </div>
      </div>
      
      {/* Ubicación */}
      <div>
        <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <MapPin className="w-4 h-4 mr-1" />
          Ubicación
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          placeholder="Ej: Auditorio Nacional"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>
      
      {/* Categoría, Precio y Boletos disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Tag className="w-4 h-4 mr-1" />
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md shadow-sm px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="price" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
        
        <div>
          <label htmlFor="availableTickets" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Ticket className="w-4 h-4 mr-1" />
            Boletos disponibles
          </label>
          <input
            type="number"
            id="availableTickets"
            name="availableTickets"
            value={formData.availableTickets}
            onChange={handleChange}
            min="1"
            className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 border ${
              errors.availableTickets ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.availableTickets && <p className="mt-1 text-sm text-red-600">{errors.availableTickets}</p>}
        </div>
      </div>
      
      {/* URL de imagen e Opción destacado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="image" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Image className="w-4 h-4 mr-1" />
            URL de imagen (opcional)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md shadow-sm px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
        
        <div className="flex items-center h-full pt-6">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Marcar como evento destacado
          </label>
        </div>
      </div>
      
      {/* Botón de envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
            transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? 'Creando evento...' : 'Crear evento'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;