import type { Hotel } from '@/types/hotel';

export const mockHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Grand Ocean Resort',
    description: 'Luxurious beachfront resort with world-class amenities and stunning ocean views.',
    category: 'luxury',
    starRating: 5,
    address: {
      street: '123 Ocean Drive',
      city: 'Miami Beach',
      state: 'Florida',
      country: 'United States',
      zipCode: '33139',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    contact: {
      phone: '+1 (305) 555-0123',
      email: 'reservations@grandocean.com',
      website: 'www.grandoceanresort.com',
      emergencyContact: '+1 (305) 555-0911'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
      ],
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100'
    },
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'property', icon: 'wifi', available: true },
      { id: '2', name: 'Spa & Wellness', category: 'recreation', icon: 'spa', available: true },
      { id: '3', name: 'Ocean View', category: 'room', icon: 'view', available: true }
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      cancellation: '24 hours before arrival',
      childPolicy: 'Children under 12 stay free',
      petPolicy: 'Pets allowed with fee',
      smokingPolicy: 'Non-smoking property'
    },
    settings: {
      currency: 'USD',
      timezone: 'America/New_York',
      language: 'en',
      taxRate: 8.5,
      serviceCharge: 15
    },
    status: 'active',
    stats: {
      totalRooms: 280,
      availableRooms: 42,
      occupancyRate: 85.0,
      averageDailyRate: 485,
      revpar: 412.25,
      totalRevenue: 2847500,
      guestSatisfaction: 4.7,
      repeatGuests: 34
    },
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z'
  },
  {
    id: 'hotel-2',
    name: 'Downtown Business Center',
    description: 'Modern business hotel in the heart of the financial district.',
    category: 'business',
    starRating: 4,
    address: {
      street: '456 Wall Street',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      zipCode: '10005',
      coordinates: { lat: 40.7074, lng: -74.0113 }
    },
    contact: {
      phone: '+1 (212) 555-0456',
      email: 'info@downtownbizhotel.com',
      website: 'www.downtownbizhotel.com',
      emergencyContact: '+1 (212) 555-0911'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
      ]
    },
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'property', icon: 'wifi', available: true },
      { id: '2', name: 'Business Center', category: 'business', icon: 'business', available: true },
      { id: '3', name: 'Fitness Center', category: 'recreation', icon: 'fitness', available: true }
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: '48 hours before arrival',
      childPolicy: 'Children welcome',
      petPolicy: 'No pets allowed',
      smokingPolicy: 'Designated smoking areas'
    },
    settings: {
      currency: 'USD',
      timezone: 'America/New_York',
      language: 'en',
      taxRate: 8.875,
      serviceCharge: 18
    },
    status: 'active',
    stats: {
      totalRooms: 156,
      availableRooms: 28,
      occupancyRate: 82.1,
      averageDailyRate: 325,
      revpar: 266.83,
      totalRevenue: 1245000,
      guestSatisfaction: 4.3,
      repeatGuests: 42
    },
    createdAt: '2022-06-01T08:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 'hotel-3',
    name: 'Boutique Garden Inn',
    description: 'Charming boutique hotel with personalized service and unique design.',
    category: 'boutique',
    starRating: 4,
    address: {
      street: '789 Garden Lane',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      zipCode: '94102',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    contact: {
      phone: '+1 (415) 555-0789',
      email: 'hello@boutiquegardeninn.com',
      website: 'www.boutiquegardeninn.com',
      emergencyContact: '+1 (415) 555-0911'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
      ]
    },
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'property', icon: 'wifi', available: true },
      { id: '2', name: 'Garden Terrace', category: 'recreation', icon: 'garden', available: true },
      { id: '3', name: 'Artisanal Coffee', category: 'dining', icon: 'coffee', available: true }
    ],
    policies: {
      checkIn: '4:00 PM',
      checkOut: '11:00 AM',
      cancellation: '72 hours before arrival',
      childPolicy: 'Adult-focused property',
      petPolicy: 'Small pets welcome',
      smokingPolicy: 'Non-smoking property'
    },
    settings: {
      currency: 'USD',
      timezone: 'America/Los_Angeles',
      language: 'en',
      taxRate: 9.5,
      serviceCharge: 20
    },
    status: 'maintenance',
    stats: {
      totalRooms: 45,
      availableRooms: 0,
      occupancyRate: 0,
      averageDailyRate: 450,
      revpar: 0,
      totalRevenue: 125000,
      guestSatisfaction: 4.8,
      repeatGuests: 28
    },
    createdAt: '2023-03-12T12:00:00Z',
    updatedAt: '2024-01-10T11:15:00Z'
  }
];

export const filterOptions = [
  { value: 'all', label: 'All Properties' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'business', label: 'Business' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'resort', label: 'Resort' },
  { value: 'budget', label: 'Budget' }
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'closed', label: 'Closed' }
];

export const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'occupancy', label: 'Occupancy Rate' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'rating', label: 'Guest Rating' },
  { value: 'created', label: 'Date Added' }
];