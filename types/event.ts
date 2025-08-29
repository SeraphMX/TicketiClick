export interface Event {
  id: string; // UUID
  title: string;
  slug: string;
  description?: string;
  event_date?: Date;
  event_time?: string; // Time without timezone
  location_id?: number;
  category_id?: number;
  organizer_id?: string; // UUID
  price?: number;
  currency?: string;
  available_tickets?: number;
  featured?: boolean;
  stripe_id?: string;
  created_at?: Date;
  image_url?: string;
}

export interface CreateEventInput {
  title: string;
  slug: string;
  description?: string;
  event_date?: Date;
  event_time?: string;
  location_id?: number;
  category_id?: number;
  organizer_id: string; // Required for creation
  price?: number;
  currency?: string;
  available_tickets?: number;
  featured?: boolean;
  image_url?: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  event_date?: Date;
  event_time?: string;
  location_id?: number;
  category_id?: number;
  price?: number;
  currency?: string;
  available_tickets?: number;
  featured?: boolean;
  image_url?: string;
}
