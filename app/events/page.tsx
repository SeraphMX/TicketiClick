// app/events/page.tsx
// Página de listado de eventos

import EventList from '@/components/EventList';
import { mockEvents } from '@/data/events';

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Todos los Eventos</h1>
      <p className="text-gray-600 mb-8">
        Explora nuestra selección de eventos y encuentra el perfecto para ti
      </p>
      
      <EventList events={mockEvents} />
    </div>
  );
}