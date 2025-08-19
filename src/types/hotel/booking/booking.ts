import type { Booking } from '@/types/hotel';

// Extended Booking type for UI purposes
export interface ExtendedBooking extends Booking {
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  roomNumber?: string;
  roomType?: string;
  roomCategory?: string;
  paymentMethod?: string;
  channelCommission?: number;
  netRevenue?: number;
  bookingNumber?: string;
  paidAmount?: number;
  notes?: string;
  specialRequests?: string[];
  addOns?: BookingAddOn[];
}

// UI Booking type that matches the BookingManagement page structure
export interface UIBooking {
  id: string;
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  roomNumber: string;
  roomType: string;
  roomCategory?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    infants?: number;
  };
  status: ExtendedBookingStatusType;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatusType;
  paymentMethod?: string;
  source: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  specialRequests?: string[];
  addOns?: BookingAddOn[];
  checkInTime?: string;
  checkOutTime?: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
}

// Booking Add-on type
export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'meal' | 'service' | 'amenity' | 'transport' | 'other';
}

// Booking status type
export type BookingStatusType = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';

// Extended booking status type (includes additional statuses for UI)
export type ExtendedBookingStatusType = BookingStatusType | 'requested' | 'rejected';

// Payment status type  
export type PaymentStatusType = 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';

// Filter options types
export interface BookingFilterOptions {
  statusOptions: Array<{ value: string; label: string }>;
  paymentOptions: Array<{ value: string; label: string }>;
}

// Booking stats type
export interface BookingStats {
  total: number;
  requested: number;
  confirmed: number;
  checkedIn: number;
  checkedOut: number;
  pending: number;
  cancelled: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  tomorrowCheckIns: number;
  tomorrowCheckOuts: number;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  occupancyRate: number;
}

// Room availability type
export interface RoomAvailability {
  roomId: string;
  roomNumber: string;
  roomType: string;
  roomCategory: string;
  isAvailable: boolean;
  currentBooking?: string;
  nextAvailable?: string;
  price: number;
}

// Room category availability
export interface CategoryAvailability {
  category: string;
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  occupancyRate: number;
  averagePrice: number;
}
