import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Edit,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Download,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock booking data - in real app, this would come from API
const mockBooking = {
  id: '1',
  bookingNumber: 'BK001',
  status: 'confirmed',
  guest: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001, USA',
    country: 'United States'
  },
  room: {
    number: '301',
    type: 'Ocean Suite',
    floor: 3,
    rate: 485,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
  },
  dates: {
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    nights: 5,
    createdAt: '2024-01-20T10:30:00Z'
  },
  guests: {
    adults: 2,
    children: 0
  },
  payment: {
    totalAmount: 2425,
    paidAmount: 2425,
    depositAmount: 500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    lastPayment: '2024-01-20T11:00:00Z'
  },
  details: {
    source: 'Direct',
    specialRequests: 'Late check-in requested, ocean view preferred',
    notes: 'VIP guest, ensure room upgrade if available'
  }
};

export default function BookingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking] = useState(mockBooking);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'checked-in':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'checked-out':
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'checked-in':
      case 'checked-out':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
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
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canCheckIn = booking.status === 'confirmed' && new Date(booking.dates.checkIn) <= new Date();
  const canCheckOut = booking.status === 'checked-in';

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/bookings')}
              className="hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Booking #{booking.bookingNumber}
              </h1>
              <p className="text-gray-400 mt-1">
                Created on {formatDateTime(booking.dates.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4" />
              Print
            </Button>
            <Button 
              onClick={() => navigate(`/hotel/bookings/${booking.id}/edit`)}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Edit className="w-4 h-4" />
              Edit Booking
            </Button>
          </div>
        </div>

        {/* Status and Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Booking Status</h3>
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border",
                getStatusColor(booking.status)
              )}>
                {getStatusIcon(booking.status)}
                <span className="capitalize">{booking.status.replace('-', ' ')}</span>
              </div>
            </div>
            <div className="space-y-3">
              {canCheckIn && (
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Check In
                </Button>
              )}
              {canCheckOut && (
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="w-4 h-4" />
                  Check Out
                </Button>
              )}
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </Button>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Payment Status</h3>
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border capitalize",
                getPaymentStatusColor(booking.payment.paymentStatus)
              )}>
                {booking.payment.paymentStatus}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total:</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(booking.payment.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Paid:</span>
                <span className="text-white">{formatCurrency(booking.payment.paidAmount)}</span>
              </div>
              {booking.payment.paidAmount < booking.payment.totalAmount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Remaining:</span>
                  <span className="text-red-400">{formatCurrency(booking.payment.totalAmount - booking.payment.paidAmount)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Nights:</span>
                <span className="text-white">{booking.dates.nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Guests:</span>
                <span className="text-white">{booking.guests.adults + booking.guests.children}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Source:</span>
                <span className="text-white">{booking.details.source}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guest Information */}
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Guest Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white text-lg">{booking.guest.name}</h4>
                <div className="flex items-center gap-2 mt-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{booking.guest.email}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{booking.guest.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <div>
                    <p>{booking.guest.address}</p>
                    <p className="text-sm text-gray-400 mt-1">{booking.guest.country}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h5 className="font-medium text-white mb-2">Guest Count</h5>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{booking.guests.adults}</p>
                    <p className="text-xs text-gray-400">Adults</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{booking.guests.children}</p>
                    <p className="text-xs text-gray-400">Children</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Information */}
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Room & Stay Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={booking.room.image} 
                  alt={booking.room.type}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <h4 className="font-bold text-white text-lg">Room #{booking.room.number}</h4>
                  <p className="text-gray-300">{booking.room.type}</p>
                  <p className="text-sm text-gray-400">Floor {booking.room.floor}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-emerald-400">{formatCurrency(booking.room.rate)}</p>
                  <p className="text-xs text-gray-400">per night</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-white mb-2">Check-in</h5>
                  <p className="text-gray-300">{formatDate(booking.dates.checkIn)}</p>
                  <p className="text-sm text-gray-400">3:00 PM standard</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-white mb-2">Check-out</h5>
                  <p className="text-gray-300">{formatDate(booking.dates.checkOut)}</p>
                  <p className="text-sm text-gray-400">11:00 AM standard</p>
                </div>
                
                <div className="pt-3 border-t border-white/10">
                  <p className="text-cyan-400 font-medium">
                    Total Stay: {booking.dates.nights} nights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">Payment Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-300 mb-2">Payment Breakdown</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Room Rate ({booking.dates.nights} nights):</span>
                    <span className="text-white">{formatCurrency(booking.room.rate * booking.dates.nights)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxes & Fees:</span>
                    <span className="text-white">{formatCurrency(booking.payment.totalAmount - (booking.room.rate * booking.dates.nights))}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-emerald-400">Total:</span>
                      <span className="text-emerald-400">{formatCurrency(booking.payment.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-300 mb-2">Payment Info</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white">{booking.payment.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deposit:</span>
                    <span className="text-white">{formatCurrency(booking.payment.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Payment:</span>
                    <span className="text-white">{formatDateTime(booking.payment.lastPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                <DollarSign className="w-4 h-4" />
                Process Payment
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                Generate Invoice
              </Button>
            </div>
          </div>
        </div>

        {/* Special Requests & Notes */}
        {(booking.details.specialRequests || booking.details.notes) && (
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Additional Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {booking.details.specialRequests && (
                <div>
                  <h5 className="font-medium text-gray-300 mb-2">Special Requests</h5>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <p className="text-gray-300">{booking.details.specialRequests}</p>
                  </div>
                </div>
              )}
              
              {booking.details.notes && (
                <div>
                  <h5 className="font-medium text-gray-300 mb-2">Internal Notes</h5>
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <p className="text-gray-300">{booking.details.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BookingManagementLayout>
  );
}