// app/event/[id]/checkout/page.tsx
// Página de checkout (Server Component)

import { mockEvents, getEventById } from '@/data/events';
import CheckoutClient from '@/components/checkout/CheckoutClient';

// Generar parámetros estáticos para pre-renderizado
export function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event.id.toString(),
  }));
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const eventId = Number(params.id);
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-center text-gray-600">Evento no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return <CheckoutClient event={event} />;
}