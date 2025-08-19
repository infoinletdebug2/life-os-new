import { useState } from 'react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { BookingHeader } from '@/components/hotel/booking-management/BookingHeader';
import { BookingSearch } from '@/components/hotel/booking-management/BookingSearch';
import { BookingStatsOverview } from '@/components/hotel/booking-management/BookingStatsOverview';
import { BookingTableContainer } from '@/components/hotel/booking-management/BookingTableContainer';
import { UIBooking } from '@/types/hotel/booking/booking';
import { 
  calculateBookingStats, 
  filterBookings, 
  getBookingStatusOptions, 
  getPaymentStatusOptions 
} from '@/lib/hotel-booking-utils';

// Mock data matching the UIBooking type
const mockBookings: UIBooking[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    roomNumber: '301',
    roomType: 'Ocean Suite',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    nights: 5,
    guests: { adults: 2, children: 0 },
    status: 'confirmed',
    totalAmount: 2425,
    paidAmount: 2425,
    paymentStatus: 'paid',
    source: 'Direct',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    roomNumber: '205',
    roomType: 'Deluxe Room',
    checkIn: '2024-02-18',
    checkOut: '2024-02-22',
    nights: 4,
    guests: { adults: 1, children: 1 },
    status: 'checked-in',
    totalAmount: 800,
    paidAmount: 400,
    paymentStatus: 'partial',
    source: 'Booking.com',
    createdAt: '2024-01-22T15:45:00Z'
  },
  {
    id: '3',
    bookingNumber: 'BK003',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    roomNumber: '102',
    roomType: 'Standard Room',
    checkIn: '2024-02-20',
    checkOut: '2024-02-25',
    nights: 5,
    guests: { adults: 2, children: 2 },
    status: 'pending',
    totalAmount: 950,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Phone',
    createdAt: '2024-01-25T09:15:00Z'
  },
  {
    id: '4',
    bookingNumber: 'BK004',
    guestName: 'Emma Wilson',
    guestEmail: 'emma.wilson@email.com',
    roomNumber: '401',
    roomType: 'Presidential Suite',
    checkIn: '2024-02-25',
    checkOut: '2024-02-28',
    nights: 3,
    guests: { adults: 2, children: 1 },
    status: 'requested',
    totalAmount: 2400,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Website',
    createdAt: '2024-01-26T14:20:00Z'
  },
  {
    id: '5',
    bookingNumber: 'BK005',
    guestName: 'David Chen',
    guestEmail: 'david.chen@email.com',
    roomNumber: '203',
    roomType: 'Deluxe Room',
    checkIn: '2024-02-22',
    checkOut: '2024-02-26',
    nights: 4,
    guests: { adults: 1, children: 0 },
    status: 'requested',
    totalAmount: 800,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Mobile App',
    createdAt: '2024-01-26T16:45:00Z'
  }
];

export default function BookingManagementRefactored() {
  const [bookings, setBookings] = useState<UIBooking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');

  // Get filter options
  const statusOptions = getBookingStatusOptions();
  const paymentOptions = getPaymentStatusOptions();

  // Calculate stats
  const stats = calculateBookingStats(bookings);

  // Filter bookings
  const filteredBookings = filterBookings(bookings, searchQuery, selectedStatus, selectedPayment);

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <BookingHeader />
        <BookingStatsOverview stats={stats} />
        <BookingSearch
          searchQuery={searchQuery}
          selectedStatus={selectedStatus}
          selectedPayment={selectedPayment}
          onSearchChange={setSearchQuery}
          onStatusChange={setSelectedStatus}
          onPaymentChange={setSelectedPayment}
          statusOptions={statusOptions}
          paymentOptions={paymentOptions}
        />
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <BookingTableContainer 
            bookings={filteredBookings} 
            onBookingsUpdate={setBookings}
          />
        </div>
      </div>
    </BookingManagementLayout>
  );
}