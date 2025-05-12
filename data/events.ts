// data/events.ts
// Mock de eventos para la plataforma

export interface Event {
  id: number
  title: string
  slug: string
  description: string
  date: string
  time: string
  location: string
  price: number
  currency: string
  image: string
  category: EventCategory
  organizerId: number
  availableTickets: number
  featured: boolean
  stripe_id: string
}

export type EventCategory = 'music' | 'sports' | 'theater' | 'conference' | 'festival' | 'workshop' | 'other'

export const mockEvents: Event[] = [
  {
    id: 1,

    title: 'Chapul Big Band',
    slug: 'chapul-big-band',
    description:
      '<p>Prep&aacute;rate para una noche inolvidable con la <strong>Chapul Big Band</strong>, una orquesta que rinde homenaje a la &eacute;poca dorada del jazz, fusionando ese esp&iacute;ritu cl&aacute;sico con la energ&iacute;a vibrante de los ritmos actuales.	<br/>D&eacute;jate llevar por una explosiva mezcla de <strong >jazz, swing, funk, bossa nova y salsa</strong>, en un espect&aacute;culo que te har&aacute; vibrar desde la primera nota.</p>',
    date: '2025-07-17',
    time: '20:00',
    location: 'Palacio de los Deportes, CDMX',
    price: 400,
    currency: 'MXN',
    image: '/events/1745434434PQzWhASDd4.webp',
    category: 'music',
    organizerId: 2,
    availableTickets: 250,
    featured: true,
    stripe_id: 'acct_1RMhq2LhYrNjtk3X'
  }
]

export const getEventById = (id: number): Event | undefined => {
  return mockEvents.find((event) => event.id === id)
}

export const getEventBySlug = (slug: string): Event | undefined => {
  return mockEvents.find((event) => event.slug === slug)
}

export const getEventsByOrganizerId = (organizerId: number): Event[] => {
  return mockEvents.filter((event) => event.organizerId === organizerId)
}

export const getFeaturedEvents = (): Event[] => {
  return mockEvents.filter((event) => event.featured)
}
