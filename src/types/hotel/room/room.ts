import type { Room, RoomAmenity } from '@/types/hotel';

// Extended Room type for UI purposes
export interface ExtendedRoom extends Omit<Room, 'type' | 'amenities' | 'capacity' | 'bedConfiguration' | 'size' | 'pricing' | 'housekeeping' | 'maintenance'> {
  roomNumber: string;
  type: string;
  category: 'suite' | 'executive' | 'standard' | 'accessible' | 'deluxe';
  isClean: boolean;
  beds: {
    king: number;
    queen: number;
    single: number;
    sofa: number;
  };
  maxOccupancy: number;
  baseRate: number;
  currentRate: number;
  area: number;
  features: string[];
  amenities: RoomAmenity[];
  lastCleaned?: string;
  lastMaintenance?: string;
  nextScheduledMaintenance?: string;
  housekeepingNotes?: string;
  maintenanceNotes?: string;
  maintenanceHistory?: Array<{
    date: string;
    type: string;
    description: string;
    technician: string;
    cost: number;
  }>;
  currentOccupant?: {
    guestId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  } | null;
  reservations?: any[];
  revenue?: {
    mtd: number;
    ytd: number;
    occupancyRate: number;
  };
}

// Room amenity type matching the UI needs
export interface RoomAmenity {
  id: string;
  name: string;
  category: string;
  icon: string;
  available: boolean;
}

// Room status types
export type RoomStatus = 'available' | 'occupied' | 'housekeeping' | 'maintenance' | 'out-of-order';