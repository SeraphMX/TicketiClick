// data/events.ts
// Mock de eventos para la plataforma

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  category: EventCategory;
  organizerId: number;
  availableTickets: number;
  featured: boolean;
}

export type EventCategory = 
  | 'music' 
  | 'sports' 
  | 'theater' 
  | 'conference' 
  | 'festival' 
  | 'workshop' 
  | 'other';

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Concierto de Rock en Vivo",
    description: "Disfruta de las mejores bandas de rock en un concierto inolvidable. Más de 4 horas de música en vivo con tus artistas favoritos.",
    date: "2024-12-15",
    time: "20:00",
    location: "Palacio de los Deportes, CDMX",
    price: 45.99,
    currency: "MXN",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    category: "music",
    organizerId: 2,
    availableTickets: 2000,
    featured: true
  },
  {
    id: 2,
    title: "Final de Copa - Fútbol",
    description: "La final más esperada del año. Dos equipos, un trofeo, miles de aficionados. No te pierdas este partido histórico.",
    date: "2024-11-10",
    time: "18:30",
    location: "Estadio Azteca, CDMX",
    price: 75.50,
    currency: "MXN",
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    category: "sports",
    organizerId: 5,
    availableTickets: 1500,
    featured: true
  },
  {
    id: 3,
    title: "Conferencia de Tecnología e Innovación",
    description: "Los mejores expertos en tecnología se reúnen para compartir conocimientos sobre IA, blockchain y el futuro digital.",
    date: "2025-01-20",
    time: "09:00",
    location: "Centro de Convenciones, Guadalajara",
    price: 129.99,
    currency: "MXN",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    category: "conference",
    organizerId: 2,
    availableTickets: 500,
    featured: false
  },
  {
    id: 4,
    title: "Obra de Teatro: El Fantasma de la Ópera",
    description: "El clásico musical llega a nuestra ciudad con un elenco de primer nivel y efectos especiales impresionantes.",
    date: "2024-12-22",
    time: "21:00",
    location: "Teatro Principal, Pachuca",
    price: 55,
    currency: "MXN",
    image: "https://images.pexels.com/photos/11523493/pexels-photo-11523493.jpeg",
    category: "theater",
    organizerId: 5,
    availableTickets: 300,
    featured: false
  },
  {
    id: 5,
    title: "Festival de Gastronomía",
    description: "Un recorrido por los mejores sabores del mundo. Degustaciones, clases magistrales y concursos con chefs reconocidos.",
    date: "2025-02-05",
    time: "11:00",
    location: "Parque del Retiro, CMDX",
    price: 25,
    currency: "MXN",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    category: "festival",
    organizerId: 2,
    availableTickets: 1000,
    featured: true
  },
  {
    id: 6,
    title: "Workshop de Fotografía Profesional",
    description: "Aprende técnicas avanzadas de fotografía con profesionales del sector. Incluye sesiones prácticas en exteriores.",
    date: "2025-01-15",
    time: "16:00",
    location: "Escuela de Artes, Toluca",
    price: 85,
    currency: "MXN",
    image: "https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg",
    category: "workshop",
    organizerId: 5,
    availableTickets: 50,
    featured: false
  }
];

export const getEventById = (id: number): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getEventsByOrganizerId = (organizerId: number): Event[] => {
  return mockEvents.filter(event => event.organizerId === organizerId);
};

export const getFeaturedEvents = (): Event[] => {
  return mockEvents.filter(event => event.featured);
};