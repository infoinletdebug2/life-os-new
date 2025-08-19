import { Check, X, Eye, Edit, Mail, Phone, FileText, Copy, Ban, UserCheck } from 'lucide-react';
// Local UIBooking type definition
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

interface BookingActionMenuProps {
  booking: UIBooking;
  onClose: () => void;
  onConfirmBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
  onCheckInGuest: (bookingId: string) => void;
  onContactGuest: (booking: UIBooking, method: 'email' | 'phone') => void;
  onViewDetails: (bookingId: string) => void;
  onEditBooking: (bookingId: string) => void;
  onGenerateInvoice: (booking: UIBooking) => void;
  onDuplicateBooking: (booking: UIBooking) => void;
  onCancelBooking: (bookingId: string) => void;
}

export function BookingActionMenu({
  booking,
  onClose,
  onConfirmBooking,
  onRejectBooking,
  onCheckInGuest,
  onContactGuest,
  onViewDetails,
  onEditBooking,
  onGenerateInvoice,
  onDuplicateBooking,
  onCancelBooking
}: BookingActionMenuProps) {
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    onClose();
  };

  return (
    <div className="absolute right-0 top-8 w-52 bg-gray-800/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50">
      <div className="p-2 space-y-1">
        {booking.status === 'requested' && (
          <>
            <button
              onClick={(e) => handleAction(e, () => onConfirmBooking(booking.id))}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
            >
              <Check className="w-4 h-4" />
              Confirm Booking
            </button>
            <button
              onClick={(e) => handleAction(e, () => onRejectBooking(booking.id))}
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
              onClick={(e) => handleAction(e, () => onCheckInGuest(booking.id))}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              Check In Guest
            </button>
            <div className="border-t border-white/10 my-1"></div>
          </>
        )}
        
        <button
          onClick={(e) => handleAction(e, () => onViewDetails(booking.id))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Full Details
        </button>
        
        <button
          onClick={(e) => handleAction(e, () => onEditBooking(booking.id))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
        >
          <Edit className="w-4 h-4" />
          Modify Booking
        </button>

        <div className="border-t border-white/10 my-1"></div>

        <button
          onClick={(e) => handleAction(e, () => onContactGuest(booking, 'email'))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email Guest
        </button>

        <button
          onClick={(e) => handleAction(e, () => onContactGuest(booking, 'phone'))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Guest
        </button>

        <div className="border-t border-white/10 my-1"></div>

        <button
          onClick={(e) => handleAction(e, () => onGenerateInvoice(booking))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-400 hover:bg-orange-500/10 rounded-md transition-colors"
        >
          <FileText className="w-4 h-4" />
          Generate Invoice
        </button>

        <button
          onClick={(e) => handleAction(e, () => onDuplicateBooking(booking))}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 rounded-md transition-colors"
        >
          <Copy className="w-4 h-4" />
          Duplicate Booking
        </button>

        {booking.status !== 'cancelled' && booking.status !== 'checked-out' && (
          <>
            <div className="border-t border-white/10 my-1"></div>
            <button
              onClick={(e) => handleAction(e, () => onCancelBooking(booking.id))}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
            >
              <Ban className="w-4 h-4" />
              Cancel Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}