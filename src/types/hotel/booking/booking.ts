import type { Booking } from '@/types/hotel';

// Extended Booking type for UI purposes
export interface ExtendedBooking extends Booking {
  guestName?: string;
  guestEmail?: string;
  roomNumber?: string;
  roomType?: string;
  paymentMethod?: string;
  channelCommission?: number;
  netRevenue?: number;
  bookingNumber?: string; // Similar to confirmationNumber but for display
  paidAmount?: number;
  notes?: string;
}

// UI Booking type that matches the BookingManagement page structure
export interface UIBooking {
  id: string;
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  status: ExtendedBookingStatusType;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatusType;
  source: string;
  createdAt: string;
  notes?: string;
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
  pending: number;
  totalRevenue: number;
  paidRevenue: number;
}
