// app/event/[id]/page.tsx
// Página de detalle de evento

import { mockEvents, getEventById } from '@/data/events';
import EventDetailClient from '@/components/EventDetailClient';

// Función para formatear fechas a formato español
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

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
  };
  
  return translations[category] || 'Otro';
};

// Generar parámetros estáticos para pre-renderizado
export const generateStaticParams = async () => {
  return mockEvents.map((event) => ({
    id: event.id.toString(),
  }));
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const eventId = Number(params.id);
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Evento no encontrado</h1>
            <p className="text-gray-600 mb-6">
              No pudimos encontrar el evento que buscas. Por favor, intenta nuevamente más tarde o explora otros eventos disponibles.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <EventDetailClient event={event} />;
}