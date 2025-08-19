import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
  CreditCard
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CheckInBooking {
  id: string;
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomNumber: string;
  roomType: string;
  checkInTime: string;
  guests: {
    adults: number;
    children: number;
  };
  status: 'pending' | 'ready' | 'checked-in' | 'late';
  paymentStatus: 'paid' | 'partial' | 'pending';
  totalAmount: number;
  paidAmount: number;
  specialRequests?: string;
  estimatedArrival?: string;
}

const mockCheckIns: CheckInBooking[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    guestPhone: '+1 (555) 123-4567',
    roomNumber: '301',
    roomType: 'Ocean Suite',
    checkInTime: '2024-02-15T15:00:00Z',
    guests: { adults: 2, children: 0 },
    status: 'ready',
    paymentStatus: 'paid',
    totalAmount: 2425,
    paidAmount: 2425,
    specialRequests: 'Late check-in requested, ocean view preferred',
    estimatedArrival: '18:00'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    guestPhone: '+1 (555) 987-6543',
    roomNumber: '205',
    roomType: 'Deluxe Room',
    checkInTime: '2024-02-15T15:00:00Z',
    guests: { adults: 1, children: 1 },
    status: 'pending',
    paymentStatus: 'partial',
    totalAmount: 800,
    paidAmount: 400
  },
  {
    id: '3',
    bookingNumber: 'BK003',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    guestPhone: '+1 (555) 456-7890',
    roomNumber: '102',
    roomType: 'Standard Room',
    checkInTime: '2024-02-15T15:00:00Z',
    guests: { adults: 2, children: 2 },
    status: 'checked-in',
    paymentStatus: 'paid',
    totalAmount: 950,
    paidAmount: 950
  }
];

export default function CheckIns() {
  const navigate = useNavigate();
  const [bookings] = useState<CheckInBooking[]>(mockCheckIns);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const today = new Date().toDateString();

  const stats = {
    total: bookings.length,
    ready: bookings.filter(b => b.status === 'ready').length,
    checkedIn: bookings.filter(b => b.status === 'checked-in').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    late: bookings.filter(b => b.status === 'late').length
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'checked-in':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'late':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4" />;
      case 'checked-in':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'late':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-300';
      case 'partial':
        return 'bg-orange-500/20 text-orange-300';
      case 'pending':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCheckIn = (bookingId: string) => {
    console.log('Checking in booking:', bookingId);
    // Here you would update the booking status to checked-in
  };

  const handleBookingClick = (booking: CheckInBooking) => {
    navigate(`/hotel/bookings/${booking.id}`);
  };

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Today's Check-ins
            </h1>
            <p className="text-gray-400 mt-1">
              {today} • Manage arrivals and room assignments
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-sm text-gray-400">Total Arrivals</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.ready}</p>
                <p className="text-sm text-gray-400">Ready for Check-in</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.checkedIn}</p>
                <p className="text-sm text-gray-400">Checked In</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by booking, guest name, or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="ready">Ready</option>
              <option value="checked-in">Checked In</option>
              <option value="late">Late Arrival</option>
            </select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Check-ins List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => handleBookingClick(booking)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Status Indicator */}
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border",
                      getStatusColor(booking.status)
                    )}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                    </div>

                    {/* Guest Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-lg">{booking.guestName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {booking.guestEmail}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {booking.guestPhone}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-1">
                      <p className="font-semibold text-white">#{booking.bookingNumber}</p>
                      <p className="text-sm text-gray-400">
                        Room #{booking.roomNumber} • {booking.roomType}
                      </p>
                    </div>

                    {/* Guest Count */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-700/30 rounded-lg">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-white text-sm">
                        {booking.guests.adults + booking.guests.children} guests
                      </span>
                    </div>

                    {/* Payment Status */}
                    <div className={cn(
                      "px-3 py-1 rounded-lg text-sm font-medium",
                      getPaymentStatusColor(booking.paymentStatus)
                    )}>
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      {booking.paymentStatus === 'partial' 
                        ? `${formatCurrency(booking.paidAmount)} / ${formatCurrency(booking.totalAmount)}`
                        : booking.paymentStatus
                      }
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {booking.estimatedArrival && (
                      <div className="text-center">
                        <p className="text-xs text-gray-400">ETA</p>
                        <p className="text-white font-medium">{booking.estimatedArrival}</p>
                      </div>
                    )}

                    {booking.status === 'ready' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckIn(booking.id);
                        }}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Check In
                      </Button>
                    )}

                    {booking.status === 'pending' && booking.paymentStatus !== 'paid' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/hotel/bookings/${booking.id}/payment`);
                        }}
                        className="gap-2 bg-orange-600 hover:bg-orange-700"
                      >
                        <CreditCard className="w-4 h-4" />
                        Collect Payment
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/hotel/bookings/${booking.id}`);
                      }}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-400 font-medium">Special Requests:</p>
                        <p className="text-sm text-gray-300 mt-1">{booking.specialRequests}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No check-ins found</h3>
            <p className="text-muted-foreground">
              No arrivals match your current search criteria.
            </p>
          </div>
        )}
      </div>
    </BookingManagementLayout>
  );
}