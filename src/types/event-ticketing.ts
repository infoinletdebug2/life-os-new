export interface EventCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  images: string[];
  amenities: string[];
  accommodation?: {
    available: boolean;
    type: string;
    capacity: number;
    description: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface Person {
  id: string;
  name: string;
  picture: string;
  role?: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  venueId: string;
  host: Person;
  guests: Person[];
  startDate: string;
  endDate: string;
  images: string[];
  status: 'draft' | 'published' | 'cancelled';
  tags: string[];
  maxAttendees: number;
}

export interface TicketAdvantage {
  id: string;
  title: string;
  description: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  availableFrom: string;
  availableUntil: string;
  advantages: TicketAdvantage[];
  status: 'available' | 'sold_out' | 'coming_soon';
}