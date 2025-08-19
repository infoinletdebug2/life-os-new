import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Download,
  Upload,
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Users,
  CreditCard,
  Check,
  X,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  Copy,
  Ban,
  UserCheck
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Booking {
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
  status: 'requested' | 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled' | 'rejected';
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'refunded';
  source: string;
  createdAt: string;
  notes?: string;
}

const mockBookings: Booking[] = [
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

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'requested', label: 'Requested' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
  { value: 'checked-in', label: 'Checked In' },
  { value: 'checked-out', label: 'Checked Out' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'rejected', label: 'Rejected' }
];

const paymentOptions = [
  { value: 'all', label: 'All Payments' },
  { value: 'paid', label: 'Paid' },
  { value: 'partial', label: 'Partial' },
  { value: 'pending', label: 'Pending' },
  { value: 'refunded', label: 'Refunded' }
];

export default function BookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [actionDropdownOpen, setActionDropdownOpen] = useState<string | null>(null);

  // Stats calculation
  const stats = {
    total: bookings.length,
    requested: bookings.filter(b => b.status === 'requested').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    checkedIn: bookings.filter(b => b.status === 'checked-in').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    paidRevenue: bookings.reduce((sum, b) => sum + b.paidAmount, 0)
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || booking.paymentStatus === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'checked-in':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'checked-out':
        return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'requested':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'checked-in':
        return <CheckCircle className="w-4 h-4" />;
      case 'checked-out':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      case 'requested':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'partial':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      case 'pending':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default:
        return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleBookingClick = (booking: Booking) => {
    navigate(`/hotel/bookings/${booking.id}`);
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'confirmed' as const }
          : booking
      )
    );
  };

  const handleRejectBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'rejected' as const }
          : booking
      )
    );
  };

  const handleContactGuest = (booking: Booking, method: 'email' | 'phone') => {
    if (method === 'email') {
      window.open(`mailto:${booking.guestEmail}?subject=Regarding Your Booking ${booking.bookingNumber}&body=Dear ${booking.guestName},`);
    } else {
      console.log(`Call ${booking.guestName} - Contact hotel reception for phone number`);
    }
    setActionDropdownOpen(null);
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/hotel/bookings/${bookingId}`);
    setActionDropdownOpen(null);
  };

  const handleEditBooking = (bookingId: string) => {
    navigate(`/hotel/bookings/${bookingId}/edit`);
    setActionDropdownOpen(null);
  };

  const handleGenerateInvoice = (booking: Booking) => {
    // In a real app, this would generate and download a PDF invoice
    const invoiceData = {
      bookingNumber: booking.bookingNumber,
      guestName: booking.guestName,
      amount: booking.totalAmount,
      dates: `${booking.checkIn} to ${booking.checkOut}`
    };
    console.log('Generating invoice with data:', invoiceData);
    // Simulate download
    alert(`Invoice for booking ${booking.bookingNumber} generated successfully!`);
    setActionDropdownOpen(null);
  };

  const handleDuplicateBooking = (booking: Booking) => {
    navigate('/hotel/bookings/new', { 
      state: { 
        duplicateFrom: booking,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        roomType: booking.roomType,
        guests: booking.guests
      } 
    });
    setActionDropdownOpen(null);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const }
            : booking
        )
      );
    }
    setActionDropdownOpen(null);
  };

  const handleCheckInGuest = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'checked-in' as const }
          : booking
      )
    );
    setActionDropdownOpen(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionDropdownOpen) {
        setActionDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionDropdownOpen]);

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              All Bookings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all reservations and bookings
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              onClick={() => navigate('/hotel/bookings/new')}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.requested}</p>
                <p className="text-sm text-muted-foreground">Requests</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.confirmed}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.checkedIn}</p>
                <p className="text-sm text-muted-foreground">Checked In</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.paidRevenue)}</p>
                <p className="text-sm text-muted-foreground">Paid Amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings, guests, rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              {paymentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Booking</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Guest</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Room</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Dates</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Payment</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-secondary/80 cursor-pointer transition-colors"
                      onClick={() => handleBookingClick(booking)}
                    >
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-bold text-foreground">#{booking.bookingNumber}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(booking.createdAt)}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">{booking.guestName}</p>
                          <p className="text-xs text-muted-foreground">{booking.guestEmail}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">#{booking.roomNumber}</p>
                          <p className="text-xs text-muted-foreground">{booking.roomType}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm text-foreground">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                          <p className="text-xs text-muted-foreground">{booking.nights} nights • {booking.guests.adults + booking.guests.children} guests</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit border",
                          getStatusColor(booking.status)
                        )}>
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                          getPaymentStatusColor(booking.paymentStatus)
                        )}>
                          {booking.paymentStatus}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-bold text-emerald-400">{formatCurrency(booking.totalAmount)}</p>
                          {booking.paidAmount < booking.totalAmount && (
                            <p className="text-xs text-muted-foreground">Paid: {formatCurrency(booking.paidAmount)}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionDropdownOpen(actionDropdownOpen === booking.id ? null : booking.id);
                            }}
                            className="text-muted-foreground hover:text-muted-foreground"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>

                          {actionDropdownOpen === booking.id && (
                            <div className="absolute right-0 top-8 w-52 bg-secondary backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50">
                              <div className="p-2 space-y-1">
                                {booking.status === 'requested' && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirmBooking(booking.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
                                    >
                                      <Check className="w-4 h-4" />
                                      Confirm Booking
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRejectBooking(booking.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                      <X className="w-4 h-4" />
                                      Reject Booking
                                    </button>
                                    <div className="border-t border-white/10 my-1"></div>
                                  </>
                                )}

                                {booking.status === 'confirmed' && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheckInGuest(booking.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
                                    >
                                      <UserCheck className="w-4 h-4" />
                                      Check In Guest
                                    </button>
                                    <div className="border-t border-white/10 my-1"></div>
                                  </>
                                )}
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDetails(booking.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Full Details
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditBooking(booking.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Modify Booking
                                </button>

                                <div className="border-t border-white/10 my-1"></div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContactGuest(booking, 'email');
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                                >
                                  <Mail className="w-4 h-4" />
                                  Email Guest
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContactGuest(booking, 'phone');
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors"
                                >
                                  <Phone className="w-4 h-4" />
                                  Call Guest
                                </button>

                                <div className="border-t border-white/10 my-1"></div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGenerateInvoice(booking);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-400 hover:bg-orange-500/10 rounded-md transition-colors"
                                >
                                  <FileText className="w-4 h-4" />
                                  Generate Invoice
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateBooking(booking);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 rounded-md transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                  Duplicate Booking
                                </button>

                                {booking.status !== 'cancelled' && booking.status !== 'checked-out' && (
                                  <>
                                    <div className="border-t border-white/10 my-1"></div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancelBooking(booking.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                      <Ban className="w-4 h-4" />
                                      Cancel Booking
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new booking.
              </p>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate('/hotel/bookings/new')}
              >
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </BookingManagementLayout>
  );
}