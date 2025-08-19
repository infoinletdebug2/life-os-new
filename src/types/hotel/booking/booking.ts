import type { Booking } from '@/types/hotel';

// Extended Booking type for UI purposes
export interface ExtendedBooking extends Booking {
  guestName?: string;
  roomNumber?: string;
  roomType?: string;
  paymentMethod?: string;
  channelCommission?: number;
  netRevenue?: number;
}

// Booking status type
export type BookingStatusType = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';

// Payment status type  
export type PaymentStatusType = 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';