import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Card } from '@/components/ui/card';
import { BookingDashboard } from '@/components/hotel/booking-management/BookingDashboard';
import { BookingAdvancedFilters } from '@/components/hotel/booking-management/BookingAdvancedFilters';
import { RoomAvailabilityWidget } from '@/components/hotel/booking-management/RoomAvailabilityWidget';
import { BookingQuickActions } from '@/components/hotel/booking-management/BookingQuickActions';
import { BookingTableContainer } from '@/components/hotel/booking-management/BookingTableContainer';
// Local type definitions to avoid import issues
interface UIBooking {
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
  status: 'requested' | 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled' | 'rejected';
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';
  paymentMethod?: string;
  source: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  specialRequests?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
}

interface BookingStats {
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

interface BookingFilters {
  searchQuery: string;
  status: string;
  paymentStatus: string;
  dateFilter: string;
  startDate: string;
  endDate: string;
  roomType?: string;
  roomCategory?: string;
}

interface CategoryAvailability {
  category: string;
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  occupancyRate: number;
  averagePrice: number;
}
import { 
  getBookingStatusOptions, 
  getPaymentStatusOptions, 
  calculateBookingStats,
  filterBookings
} from '@/lib/hotel-booking-utils';

// Mock data
const mockBookings: UIBooking[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    guestPhone: '+1-555-0123',
    roomNumber: '301',
    roomType: 'Ocean Suite',
    roomCategory: 'Suite',
    checkIn: '2025-08-19',
    checkOut: '2025-08-24',
    nights: 5,
    guests: { adults: 2, children: 0 },
    status: 'confirmed',
    totalAmount: 2425,
    paidAmount: 2425,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    source: 'Direct',
    createdAt: '2025-08-10T10:30:00Z',
    checkInTime: '15:00',
    checkOutTime: '11:00'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    guestPhone: '+1-555-0456',
    roomNumber: '205',
    roomType: 'Deluxe Room',
    roomCategory: 'Deluxe',
    checkIn: '2025-08-19',
    checkOut: '2025-08-22',
    nights: 3,
    guests: { adults: 1, children: 1 },
    status: 'checked-in',
    totalAmount: 600,
    paidAmount: 300,
    paymentStatus: 'partial',
    paymentMethod: 'Credit Card',
    source: 'Booking.com',
    createdAt: '2025-08-15T15:45:00Z',
    actualCheckIn: '2025-08-19T14:30:00Z'
  },
  {
    id: '3',
    bookingNumber: 'BK003',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    roomNumber: '102',
    roomType: 'Standard Room',
    roomCategory: 'Standard',
    checkIn: '2025-08-20',
    checkOut: '2025-08-25',
    nights: 5,
    guests: { adults: 2, children: 2 },
    status: 'pending',
    totalAmount: 950,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Phone',
    createdAt: '2025-08-17T09:15:00Z'
  },
  {
    id: '4',
    bookingNumber: 'BK004',
    guestName: 'Emma Wilson',
    guestEmail: 'emma.wilson@email.com',
    roomNumber: '401',
    roomType: 'Presidential Suite',
    roomCategory: 'Suite',
    checkIn: '2025-08-20',
    checkOut: '2025-08-23',
    nights: 3,
    guests: { adults: 2, children: 1 },
    status: 'requested',
    totalAmount: 2400,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Website',
    createdAt: '2025-08-18T14:20:00Z'
  },
  {
    id: '5',
    bookingNumber: 'BK005',
    guestName: 'David Chen',
    guestEmail: 'david.chen@email.com',
    roomNumber: '203',
    roomType: 'Deluxe Room',
    roomCategory: 'Deluxe',
    checkIn: '2025-08-19',
    checkOut: '2025-08-21',
    nights: 2,
    guests: { adults: 1, children: 0 },
    status: 'requested',
    totalAmount: 400,
    paidAmount: 0,
    paymentStatus: 'pending',
    source: 'Mobile App',
    createdAt: '2025-08-18T16:45:00Z'
  }
];

const mockCategoryAvailability: CategoryAvailability[] = [
  {
    category: 'Standard',
    total: 20,
    available: 8,
    occupied: 10,
    maintenance: 2,
    occupancyRate: 50,
    averagePrice: 150
  },
  {
    category: 'Deluxe',
    total: 15,
    available: 5,
    occupied: 8,
    maintenance: 2,
    occupancyRate: 53,
    averagePrice: 220
  },
  {
    category: 'Suite',
    total: 10,
    available: 7,
    occupied: 2,
    maintenance: 1,
    occupancyRate: 20,
    averagePrice: 450
  },
  {
    category: 'Executive',
    total: 5,
    available: 3,
    occupied: 2,
    maintenance: 0,
    occupancyRate: 40,
    averagePrice: 380
  }
];

export default function BookingManagementNew() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<UIBooking[]>(mockBookings);
  const [filters, setFilters] = useState<BookingFilters>({
    searchQuery: '',
    status: 'all',
    paymentStatus: 'all',
    dateFilter: 'all',
    startDate: '',
    endDate: '',
    roomType: '',
    roomCategory: ''
  });

  // Calculate stats using utility function
  const stats = calculateBookingStats(bookings);

  // Filter bookings
  const filteredBookings = filterBookings(bookings, filters.searchQuery, filters.status, filters.paymentStatus);

  // Get options for filters
  const statusOptions = getBookingStatusOptions();
  const paymentOptions = getPaymentStatusOptions();
  const roomCategories = [...new Set(bookings.map(b => b.roomCategory).filter(Boolean))] as string[];
  const roomTypes = [...new Set(bookings.map(b => b.roomType))];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-booking':
        navigate('/hotel/bookings/new');
        break;
      case 'check-in':
        setFilters({ ...filters, dateFilter: 'today-checkin' });
        break;
      case 'check-out':
        setFilters({ ...filters, dateFilter: 'today-checkout' });
        break;
      case 'pending':
        setFilters({ ...filters, status: 'requested' });
        break;
      case 'calendar':
        // TODO: Implement calendar view
        console.log('Calendar view coming soon');
        break;
      case 'export':
        // TODO: Implement export functionality
        console.log('Export functionality coming soon');
        break;
    }
  };

  const handleCategoryClick = (category: string) => {
    setFilters({ ...filters, roomCategory: category });
  };

  return (
    <DashboardLayout currentView="bookings" selectedCategory="travel">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Booking Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete booking operations - check-ins, check-outs, reservations, and room availability
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <BookingDashboard stats={stats} />

        {/* Quick Actions */}
        <BookingQuickActions
          todayCheckIns={stats.todayCheckIns}
          todayCheckOuts={stats.todayCheckOuts}
          pendingRequests={stats.requested}
          upcomingArrivals={stats.tomorrowCheckIns}
          onNewBooking={() => handleQuickAction('new-booking')}
          onCheckIn={() => handleQuickAction('check-in')}
          onCheckOut={() => handleQuickAction('check-out')}
          onViewPending={() => handleQuickAction('pending')}
          onExport={() => handleQuickAction('export')}
          onCalendarView={() => handleQuickAction('calendar')}
        />

        {/* Room Availability */}
        <RoomAvailabilityWidget
          categories={mockCategoryAvailability}
          onCategoryClick={handleCategoryClick}
        />

        {/* Advanced Filters */}
        <BookingAdvancedFilters
          filters={filters}
          onFiltersChange={setFilters}
          statusOptions={statusOptions}
          paymentOptions={paymentOptions}
          roomCategories={roomCategories}
          roomTypes={roomTypes}
        />

        {/* Bookings Table */}
        <Card className="glass-card overflow-hidden">
          <BookingTableContainer 
            bookings={filteredBookings} 
            onBookingsUpdate={setBookings}
          />
          
          {/* Summary Footer */}
          <div className="p-4 bg-secondary/50 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </span>
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground">
                  Total Value: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    ${filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Collected: <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                    ${filteredBookings.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString()}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Pending: <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                    ${(filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0) - 
                       filteredBookings.reduce((sum, b) => sum + b.paidAmount, 0)).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}