import { UIBooking, ExtendedBookingStatusType, PaymentStatusType, BookingStats } from '@/types/hotel/booking/booking';

// Calculate booking statistics from an array of bookings
export function calculateBookingStats(bookings: UIBooking[]): BookingStats {
  return {
    total: bookings.length,
    requested: bookings.filter(b => b.status === 'requested').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    checkedIn: bookings.filter(b => b.status === 'checked-in').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    paidRevenue: bookings.reduce((sum, b) => sum + b.paidAmount, 0)
  };
}

// Filter bookings based on search query and filters
export function filterBookings(
  bookings: UIBooking[],
  searchQuery: string,
  selectedStatus: string,
  selectedPayment: string
): UIBooking[] {
  return bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || booking.paymentStatus === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });
}

// Format booking for display
export function formatBookingDisplay(booking: UIBooking) {
  return {
    ...booking,
    displayName: `${booking.bookingNumber} - ${booking.guestName}`,
    dateRange: `${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`,
    guestCount: booking.guests.adults + booking.guests.children,
    balanceDue: booking.totalAmount - booking.paidAmount
  };
}

// Generate booking confirmation number
export function generateBookingNumber(prefix: string = 'BK'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Validate booking dates
export function validateBookingDates(checkIn: string, checkOut: string): { valid: boolean; error?: string } {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    return { valid: false, error: 'Check-in date cannot be in the past' };
  }

  if (checkOutDate <= checkInDate) {
    return { valid: false, error: 'Check-out date must be after check-in date' };
  }

  return { valid: true };
}

// Calculate number of nights between dates
export function calculateNights(checkIn: string, checkOut: string): number {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Get booking status options for filters
export function getBookingStatusOptions() {
  return [
    { value: 'all', label: 'All Status' },
    { value: 'requested', label: 'Requested' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'checked-out', label: 'Checked Out' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'rejected', label: 'Rejected' }
  ];
}

// Get payment status options for filters
export function getPaymentStatusOptions() {
  return [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'partial', label: 'Partial' },
    { value: 'pending', label: 'Pending' },
    { value: 'refunded', label: 'Refunded' }
  ];
}

// Sort bookings by different criteria
export function sortBookings(
  bookings: UIBooking[],
  sortBy: 'date' | 'amount' | 'status' | 'guest',
  order: 'asc' | 'desc' = 'desc'
): UIBooking[] {
  const sorted = [...bookings].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      case 'amount':
        return a.totalAmount - b.totalAmount;
      case 'status':
        return a.status.localeCompare(b.status);
      case 'guest':
        return a.guestName.localeCompare(b.guestName);
      default:
        return 0;
    }
  });

  return order === 'desc' ? sorted.reverse() : sorted;
}

// Export booking data to CSV
export function exportBookingsToCSV(bookings: UIBooking[]): string {
  const headers = [
    'Booking Number',
    'Guest Name',
    'Email',
    'Room Number',
    'Room Type',
    'Check In',
    'Check Out',
    'Nights',
    'Adults',
    'Children',
    'Status',
    'Total Amount',
    'Paid Amount',
    'Payment Status',
    'Source',
    'Created At'
  ];

  const rows = bookings.map(booking => [
    booking.bookingNumber,
    booking.guestName,
    booking.guestEmail,
    booking.roomNumber,
    booking.roomType,
    booking.checkIn,
    booking.checkOut,
    booking.nights,
    booking.guests.adults,
    booking.guests.children,
    booking.status,
    booking.totalAmount,
    booking.paidAmount,
    booking.paymentStatus,
    booking.source,
    booking.createdAt
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}