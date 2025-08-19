import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  CreditCard, 
  Clock,
  User,
  MapPin,
  DollarSign,
  AlertCircle,
  FileText,
  Sparkles,
  Eye,
  Check,
  X
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CheckOutBooking {
  id: string;
  bookingNumber: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  checkOutTime: string;
  totalAmount: number;
  additionalCharges: number;
  paymentStatus: 'paid' | 'pending' | 'partial';
  inspectionStatus: 'pending' | 'in-progress' | 'completed' | 'issues';
  checkOutStatus: 'pending' | 'ready' | 'completed';
  guestLocation: 'in-room' | 'lobby' | 'departed';
  specialRequests?: string;
}

const mockCheckOuts: CheckOutBooking[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    roomNumber: '301',
    roomType: 'Ocean Suite',
    checkOutTime: '11:00 AM',
    totalAmount: 2425,
    additionalCharges: 125,
    paymentStatus: 'pending',
    inspectionStatus: 'pending',
    checkOutStatus: 'pending',
    guestLocation: 'in-room',
    specialRequests: 'Late checkout requested'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    roomNumber: '205',
    roomType: 'Deluxe Room',
    checkOutTime: '10:30 AM',
    totalAmount: 800,
    additionalCharges: 0,
    paymentStatus: 'paid',
    inspectionStatus: 'completed',
    checkOutStatus: 'ready',
    guestLocation: 'lobby'
  },
  {
    id: '3',
    bookingNumber: 'BK005',
    guestName: 'David Chen',
    roomNumber: '203',
    roomType: 'Deluxe Room',
    checkOutTime: '12:00 PM',
    totalAmount: 800,
    additionalCharges: 50,
    paymentStatus: 'partial',
    inspectionStatus: 'issues',
    checkOutStatus: 'pending',
    guestLocation: 'in-room',
    specialRequests: 'Minibar charges'
  }
];

export default function CheckOuts() {
  const navigate = useNavigate();
  const [checkouts, setCheckouts] = useState<CheckOutBooking[]>(mockCheckOuts);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    total: checkouts.length,
    completed: checkouts.filter(c => c.checkOutStatus === 'completed').length,
    ready: checkouts.filter(c => c.checkOutStatus === 'ready').length,
    pending: checkouts.filter(c => c.checkOutStatus === 'pending').length,
    totalRevenue: checkouts.reduce((sum, c) => sum + c.totalAmount + c.additionalCharges, 0)
  };

  const filteredCheckouts = checkouts.filter(checkout =>
    checkout.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    checkout.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    checkout.roomNumber.includes(searchQuery)
  );

  const handleCompleteCheckout = (checkoutId: string) => {
    setCheckouts(prev =>
      prev.map(checkout =>
        checkout.id === checkoutId
          ? { ...checkout, checkOutStatus: 'completed' as const, guestLocation: 'departed' as const }
          : checkout
      )
    );
  };

  const handleStartInspection = (checkoutId: string) => {
    setCheckouts(prev =>
      prev.map(checkout =>
        checkout.id === checkoutId
          ? { ...checkout, inspectionStatus: 'in-progress' as const }
          : checkout
      )
    );
  };

  const handleCompleteInspection = (checkoutId: string, hasIssues: boolean) => {
    setCheckouts(prev =>
      prev.map(checkout =>
        checkout.id === checkoutId
          ? { 
              ...checkout, 
              inspectionStatus: hasIssues ? 'issues' as const : 'completed' as const,
              checkOutStatus: (!hasIssues && checkout.paymentStatus === 'paid') ? 'ready' as const : checkout.checkOutStatus
            }
          : checkout
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'ready': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'issues': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'in-progress': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'paid': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'partial': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default: return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'in-room': return <MapPin className="w-4 h-4 text-orange-400" />;
      case 'lobby': return <User className="w-4 h-4 text-blue-400" />;
      case 'departed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Today's Check-outs
            </h1>
            <p className="text-muted-foreground mt-1">Manage departures, final billing, and room inspections</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Today's Date</p>
            <p className="text-lg font-semibold text-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Check-outs</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.ready}</p>
                <p className="text-sm text-muted-foreground">Ready</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-400" />
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
        </div>

        {/* Search */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by booking, guest name, or room number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
        </div>

        {/* Checkouts List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredCheckouts.map((checkout, index) => (
              <motion.div
                key={checkout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                  {/* Guest & Room Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      {getLocationIcon(checkout.guestLocation)}
                      <div>
                        <h3 className="font-bold text-foreground">{checkout.guestName}</h3>
                        <p className="text-sm text-muted-foreground">#{checkout.bookingNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Room {checkout.roomNumber} • {checkout.roomType}
                    </div>
                    <p className="text-sm text-cyan-400 mt-1">Check-out: {checkout.checkOutTime}</p>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Payment Status</p>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                      getStatusColor(checkout.paymentStatus)
                    )}>
                      {checkout.paymentStatus}
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-bold text-foreground">{formatCurrency(checkout.totalAmount)}</p>
                      {checkout.additionalCharges > 0 && (
                        <p className="text-sm text-orange-400">+{formatCurrency(checkout.additionalCharges)} additional</p>
                      )}
                    </div>
                  </div>

                  {/* Inspection Status */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Room Inspection</p>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                      getStatusColor(checkout.inspectionStatus)
                    )}>
                      {checkout.inspectionStatus.replace('-', ' ')}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {checkout.inspectionStatus === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartInspection(checkout.id)}
                          className="text-purple-400 border-purple-400/30 hover:bg-purple-500/10"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {checkout.inspectionStatus === 'in-progress' && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCompleteInspection(checkout.id, false)}
                            className="text-green-400 border-green-400/30 hover:bg-green-500/10"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCompleteInspection(checkout.id, true)}
                            className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overall Status */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Check-out Status</p>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                      getStatusColor(checkout.checkOutStatus)
                    )}>
                      {checkout.checkOutStatus}
                    </div>
                    {checkout.specialRequests && (
                      <p className="text-xs text-yellow-400 mt-1">{checkout.specialRequests}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/hotel/bookings/${checkout.id}`)}
                      className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-500/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    {checkout.checkOutStatus === 'ready' && (
                      <Button
                        size="sm"
                        onClick={() => handleCompleteCheckout(checkout.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-400 border-orange-400/30 hover:bg-orange-500/10"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCheckouts.length === 0 && (
          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Check-outs Today</h3>
            <p className="text-muted-foreground">
              All guests have successfully checked out or no departures are scheduled for today.
            </p>
          </div>
        )}
      </div>
    </BookingManagementLayout>
  );
}