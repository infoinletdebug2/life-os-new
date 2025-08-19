import type { ExtendedRoom } from '@/types/hotel/room/room';

export const mockRooms: ExtendedRoom[] = [
  {
    id: 'room-301',
    hotelId: 'hotel-1',
    roomNumber: '301',
    number: '301',
    floor: 3,
    category: 'suite',
    type: 'Ocean Suite',
    status: 'available',
    isClean: true,
    beds: { king: 1, queen: 0, single: 0, sofa: 1 },
    maxOccupancy: 4,
    baseRate: 485,
    currentRate: 485,
    area: 65,
    view: 'ocean',
    features: [
      'Balcony with ocean view',
      'Separate living area',
      'Mini bar',
      'Work desk',
      'Jacuzzi tub'
    ],
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'technology', icon: 'wifi', available: true },
      { id: '2', name: 'Ocean View', category: 'view', icon: 'view', available: true },
      { id: '3', name: 'Jacuzzi', category: 'bathroom', icon: 'bath', available: true },
      { id: '4', name: 'Mini Bar', category: 'dining', icon: 'bar', available: true },
      { id: '5', name: 'Air Conditioning', category: 'comfort', icon: 'ac', available: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
    ],
    lastCleaned: '2024-01-18T10:00:00Z',
    lastMaintenance: '2024-01-10T14:00:00Z',
    nextScheduledMaintenance: '2024-02-10T14:00:00Z',
    housekeepingNotes: 'Deep clean completed. New linens installed.',
    maintenanceHistory: [
      {
        date: '2024-01-10T14:00:00Z',
        type: 'preventive',
        description: 'AC filter replacement',
        technician: 'Mike Johnson',
        cost: 45
      }
    ],
    currentOccupant: null,
    reservations: [],
    revenue: {
      mtd: 4850,
      ytd: 58200,
      occupancyRate: 78
    }
  },
  {
    id: 'room-412',
    hotelId: 'hotel-1',
    roomNumber: '412',
    number: '412',
    floor: 4,
    category: 'executive',
    type: 'Executive Room',
    status: 'occupied',
    isClean: true,
    beds: { king: 1, queen: 0, single: 0, sofa: 0 },
    maxOccupancy: 2,
    baseRate: 325,
    currentRate: 325,
    area: 45,
    view: 'city',
    features: [
      'City skyline view',
      'Executive lounge access',
      'Work desk with ergonomic chair',
      'Nespresso machine'
    ],
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'technology', icon: 'wifi', available: true },
      { id: '2', name: 'City View', category: 'view', icon: 'view', available: true },
      { id: '3', name: 'Coffee Machine', category: 'dining', icon: 'coffee', available: true },
      { id: '4', name: 'Smart TV', category: 'entertainment', icon: 'tv', available: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'
    ],
    lastCleaned: '2024-01-18T08:00:00Z',
    lastMaintenance: '2024-01-05T10:00:00Z',
    currentOccupant: {
      guestId: 'guest-2',
      guestName: 'Michael Chen',
      checkIn: '2024-01-18',
      checkOut: '2024-01-21',
      adults: 1,
      children: 0
    },
    revenue: {
      mtd: 3250,
      ytd: 42000,
      occupancyRate: 85
    }
  },
  {
    id: 'room-205',
    hotelId: 'hotel-1',
    roomNumber: '205',
    number: '205',
    floor: 2,
    category: 'standard',
    type: 'Standard Room',
    status: 'housekeeping',
    isClean: false,
    beds: { king: 0, queen: 1, single: 0, sofa: 0 },
    maxOccupancy: 2,
    baseRate: 185,
    currentRate: 165,
    area: 32,
    view: 'garden',
    features: [
      'Garden view',
      'Comfortable queen bed',
      'Work area'
    ],
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'technology', icon: 'wifi', available: true },
      { id: '2', name: 'Garden View', category: 'view', icon: 'view', available: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    ],
    lastCleaned: '2024-01-17T15:00:00Z',
    housekeepingNotes: 'Guest checkout at 11 AM. Requires standard cleaning.',
    revenue: {
      mtd: 1850,
      ytd: 24000,
      occupancyRate: 72
    }
  },
  {
    id: 'room-108',
    hotelId: 'hotel-1',
    roomNumber: '108',
    number: '108',
    floor: 1,
    category: 'accessible',
    type: 'Accessible Room',
    status: 'maintenance',
    isClean: true,
    beds: { king: 0, queen: 1, single: 0, sofa: 0 },
    maxOccupancy: 2,
    baseRate: 225,
    currentRate: 225,
    area: 38,
    view: 'pool',
    features: [
      'Wheelchair accessible',
      'Roll-in shower',
      'Lowered fixtures',
      'Pool view'
    ],
    amenities: [
      { id: '1', name: 'Free WiFi', category: 'technology', icon: 'wifi', available: true },
      { id: '2', name: 'Accessible Bathroom', category: 'accessibility', icon: 'accessible', available: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    lastMaintenance: '2024-01-18T09:00:00Z',
    maintenanceNotes: 'Bathroom fixture repair in progress. ETA: 2 hours.',
    revenue: {
      mtd: 2250,
      ytd: 28000,
      occupancyRate: 68
    }
  }
];

export const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'suite', label: 'Suites' },
  { value: 'executive', label: 'Executive' },
  { value: 'standard', label: 'Standard' },
  { value: 'accessible', label: 'Accessible' },
  { value: 'deluxe', label: 'Deluxe' }
];

export const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'housekeeping', label: 'Housekeeping' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'out-of-order', label: 'Out of Order' }
];

export const floorOptions = [
  { value: 'all', label: 'All Floors' },
  { value: '1', label: 'Floor 1' },
  { value: '2', label: 'Floor 2' },
  { value: '3', label: 'Floor 3' },
  { value: '4', label: 'Floor 4' },
  { value: '5', label: 'Floor 5' }
];