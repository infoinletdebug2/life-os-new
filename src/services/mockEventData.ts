import type { Event, Venue, EventCategory, EventTicket } from '../types/event-ticketing';

// Mock Categories
export const mockCategories: EventCategory[] = [
  {
    id: '1',
    name: 'Music Concert',
    description: 'Live music performances and shows',
    icon: '🎵'
  },
  {
    id: '2',
    name: 'Conference',
    description: 'Professional and educational conferences',
    icon: '💼'
  },
  {
    id: '3',
    name: 'Sports Event',
    description: 'Sporting competitions and matches',
    icon: '🏟️'
  },
  {
    id: '4',
    name: 'Art Exhibition',
    description: 'Art shows and gallery exhibitions',
    icon: '🎨'
  },
  {
    id: '5',
    name: 'Theater',
    description: 'Drama, plays, and theatrical performances',
    icon: '🎭'
  }
];

// Mock Venues
export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Madison Square Garden',
    address: '4 Pennsylvania Plaza',
    city: 'New York',
    country: 'USA',
    capacity: 20000,
    images: ['https://example.com/msg1.jpg', 'https://example.com/msg2.jpg'],
    amenities: ['Parking', 'Food Court', 'VIP Lounge', 'WiFi'],
    accommodation: {
      available: true,
      type: 'Nearby Hotels',
      capacity: 5000,
      description: 'Multiple partner hotels within walking distance'
    },
    contactInfo: {
      phone: '+1-212-465-6741',
      email: 'info@msg.com',
      website: 'https://www.msg.com'
    }
  },
  {
    id: '2',
    name: 'O2 Arena',
    address: 'Peninsula Square',
    city: 'London',
    country: 'UK',
    capacity: 20000,
    images: ['https://example.com/o2-1.jpg'],
    amenities: ['Parking', 'Restaurants', 'Bars', 'Accessibility'],
    contactInfo: {
      phone: '+44-20-8463-2000',
      email: 'info@theo2.co.uk',
      website: 'https://www.theo2.co.uk'
    }
  },
  {
    id: '3',
    name: 'Sydney Opera House',
    address: 'Bennelong Point',
    city: 'Sydney',
    country: 'Australia',
    capacity: 5738,
    images: ['https://example.com/opera1.jpg'],
    amenities: ['Restaurant', 'Bar', 'Gift Shop', 'Guided Tours'],
    contactInfo: {
      phone: '+61-2-9250-7111',
      email: 'info@sydneyoperahouse.com',
      website: 'https://www.sydneyoperahouse.com'
    }
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'Three days of incredible live music performances',
    categoryId: '1',
    venueId: '1',
    host: {
      id: 'host1',
      name: 'Live Nation Entertainment',
      picture: 'https://example.com/host1.jpg',
      role: 'Event Organizer',
      bio: 'Leading live entertainment company'
    },
    guests: [
      {
        id: 'guest1',
        name: 'John Legend',
        picture: 'https://example.com/john.jpg',
        role: 'Headliner',
        bio: 'Grammy award winning artist'
      },
      {
        id: 'guest2',
        name: 'Taylor Swift',
        picture: 'https://example.com/taylor.jpg',
        role: 'Special Guest',
        bio: 'International pop star'
      }
    ],
    startDate: '2024-07-15T18:00',
    endDate: '2024-07-17T23:00',
    images: ['https://example.com/event1.jpg'],
    status: 'published',
    tags: ['music', 'festival', 'summer', 'outdoor'],
    maxAttendees: 15000
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    description: 'Annual technology and innovation conference',
    categoryId: '2',
    venueId: '2',
    host: {
      id: 'host2',
      name: 'TechCorp Industries',
      picture: 'https://example.com/host2.jpg',
      role: 'Conference Organizer'
    },
    guests: [
      {
        id: 'guest3',
        name: 'Elon Musk',
        picture: 'https://example.com/elon.jpg',
        role: 'Keynote Speaker'
      },
      {
        id: 'guest4',
        name: 'Satya Nadella',
        picture: 'https://example.com/satya.jpg',
        role: 'Featured Speaker'
      }
    ],
    startDate: '2024-09-20T09:00',
    endDate: '2024-09-22T18:00',
    images: ['https://example.com/tech-conf.jpg'],
    status: 'published',
    tags: ['technology', 'innovation', 'AI', 'future'],
    maxAttendees: 5000
  },
  {
    id: '3',
    title: 'Shakespeare in the Park',
    description: 'Classic theatrical performance of Hamlet',
    categoryId: '5',
    venueId: '3',
    host: {
      id: 'host3',
      name: 'Sydney Theatre Company',
      picture: 'https://example.com/host3.jpg',
      role: 'Production Company'
    },
    guests: [
      {
        id: 'guest5',
        name: 'Benedict Cumberbatch',
        picture: 'https://example.com/benedict.jpg',
        role: 'Lead Actor - Hamlet'
      }
    ],
    startDate: '2024-08-10T19:30',
    endDate: '2024-08-10T22:30',
    images: ['https://example.com/hamlet.jpg'],
    status: 'published',
    tags: ['theater', 'drama', 'shakespeare', 'classic'],
    maxAttendees: 2000
  },
  {
    id: '4',
    title: 'NBA Finals Game 7',
    description: 'Championship deciding game',
    categoryId: '3',
    venueId: '1',
    host: {
      id: 'host4',
      name: 'NBA',
      picture: 'https://example.com/nba.jpg',
      role: 'League Organizer'
    },
    guests: [],
    startDate: '2024-06-20T20:00',
    endDate: '2024-06-20T23:00',
    images: ['https://example.com/nba-finals.jpg'],
    status: 'published',
    tags: ['basketball', 'sports', 'finals', 'championship'],
    maxAttendees: 20000
  }
];

// Mock Tickets
export const mockTickets: EventTicket[] = [
  {
    id: '1',
    eventId: '1',
    name: 'VIP All-Access Pass',
    description: 'Full festival access with VIP perks',
    price: 599.99,
    currency: 'USD',
    quantity: 500,
    availableFrom: '2024-03-01T00:00',
    availableUntil: '2024-07-14T23:59',
    advantages: [
      {
        id: 'adv1',
        title: 'Front Stage Access',
        description: 'Get closest to your favorite artists'
      },
      {
        id: 'adv2',
        title: 'VIP Lounge',
        description: 'Exclusive access to VIP areas with complimentary drinks'
      },
      {
        id: 'adv3',
        title: 'Meet & Greet',
        description: 'Meet the artists backstage'
      }
    ],
    status: 'available'
  },
  {
    id: '2',
    eventId: '1',
    name: 'General Admission',
    description: 'Standard festival entry',
    price: 199.99,
    currency: 'USD',
    quantity: 10000,
    availableFrom: '2024-03-01T00:00',
    availableUntil: '2024-07-15T18:00',
    advantages: [
      {
        id: 'adv4',
        title: 'Festival Access',
        description: 'Entry to all festival days'
      }
    ],
    status: 'available'
  },
  {
    id: '3',
    eventId: '2',
    name: 'Premium Conference Pass',
    description: 'Full conference access with workshops',
    price: 1299.99,
    currency: 'USD',
    quantity: 200,
    availableFrom: '2024-05-01T00:00',
    availableUntil: '2024-09-19T23:59',
    advantages: [
      {
        id: 'adv5',
        title: 'Workshop Access',
        description: 'Attend all premium workshops'
      },
      {
        id: 'adv6',
        title: 'Networking Events',
        description: 'Exclusive networking sessions'
      },
      {
        id: 'adv7',
        title: 'Conference Materials',
        description: 'Digital and physical conference materials'
      }
    ],
    status: 'available'
  },
  {
    id: '4',
    eventId: '3',
    name: 'Premium Seating',
    description: 'Best seats in the house',
    price: 150.00,
    currency: 'AUD',
    quantity: 100,
    availableFrom: '2024-06-01T00:00',
    availableUntil: '2024-08-10T19:00',
    advantages: [
      {
        id: 'adv8',
        title: 'Premium Seats',
        description: 'Orchestra level seating'
      },
      {
        id: 'adv9',
        title: 'Program Book',
        description: 'Complimentary program book'
      }
    ],
    status: 'available'
  }
];

// Service functions that can be easily replaced with API calls
export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEvents;
  },
  
  getEventById: async (id: string): Promise<Event | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEvents.find(event => event.id === id);
  },
  
  createEvent: async (event: Omit<Event, 'id'>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newEvent = { ...event, id: Date.now().toString() };
    mockEvents.push(newEvent);
    return newEvent;
  }
};

export const venueService = {
  getVenues: async (): Promise<Venue[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockVenues;
  },
  
  getVenueById: async (id: string): Promise<Venue | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockVenues.find(venue => venue.id === id);
  },
  
  createVenue: async (venue: Omit<Venue, 'id'>): Promise<Venue> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newVenue = { ...venue, id: Date.now().toString() };
    mockVenues.push(newVenue);
    return newVenue;
  }
};

export const categoryService = {
  getCategories: async (): Promise<EventCategory[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCategories;
  },
  
  getCategoryById: async (id: string): Promise<EventCategory | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCategories.find(category => category.id === id);
  },
  
  createCategory: async (category: Omit<EventCategory, 'id'>): Promise<EventCategory> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newCategory = { ...category, id: Date.now().toString() };
    mockCategories.push(newCategory);
    return newCategory;
  }
};

export const ticketService = {
  getTickets: async (): Promise<EventTicket[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTickets;
  },
  
  getTicketById: async (id: string): Promise<EventTicket | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTickets.find(ticket => ticket.id === id);
  },
  
  getTicketsByEventId: async (eventId: string): Promise<EventTicket[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTickets.filter(ticket => ticket.eventId === eventId);
  },
  
  createTicket: async (ticket: Omit<EventTicket, 'id'>): Promise<EventTicket> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newTicket = { ...ticket, id: Date.now().toString() };
    mockTickets.push(newTicket);
    return newTicket;
  }
};