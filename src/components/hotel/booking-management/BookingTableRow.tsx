import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
import { formatCurrency, formatDate, getStatusColor, getStatusIcon, getPaymentStatusColor } from './utils';
import { BookingActionMenu } from './BookingActionMenu';

interface BookingTableRowProps {
  booking: UIBooking;
  index: number;
  onBookingClick: (booking: UIBooking) => void;
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

export function BookingTableRow({
  booking,
  index,
  onBookingClick,
  onConfirmBooking,
  onRejectBooking,
  onCheckInGuest,
  onContactGuest,
  onViewDetails,
  onEditBooking,
  onGenerateInvoice,
  onDuplicateBooking,
  onCancelBooking
}: BookingTableRowProps) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
      onClick={() => onBookingClick(booking)}
    >
      <td className="p-4">
        <div className="space-y-1">
          <p className="font-bold text-white">#{booking.bookingNumber}</p>
          <p className="text-xs text-gray-400">{formatDate(booking.createdAt)}</p>
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          <p className="font-semibold text-white">{booking.guestName}</p>
          <p className="text-xs text-gray-400">{booking.guestEmail}</p>
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          <p className="font-semibold text-white">#{booking.roomNumber}</p>
          <p className="text-xs text-gray-400">{booking.roomType}</p>
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          <p className="text-sm text-white">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
          <p className="text-xs text-gray-400">{booking.nights} nights • {booking.guests.adults + booking.guests.children} guests</p>
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
            <p className="text-xs text-gray-400">Paid: {formatCurrency(booking.paidAmount)}</p>
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
              setIsActionMenuOpen(!isActionMenuOpen);
            }}
            className="text-gray-400 hover:text-gray-300"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>

          {isActionMenuOpen && (
            <BookingActionMenu
              booking={booking}
              onClose={() => setIsActionMenuOpen(false)}
              onConfirmBooking={onConfirmBooking}
              onRejectBooking={onRejectBooking}
              onCheckInGuest={onCheckInGuest}
              onContactGuest={onContactGuest}
              onViewDetails={onViewDetails}
              onEditBooking={onEditBooking}
              onGenerateInvoice={onGenerateInvoice}
              onDuplicateBooking={onDuplicateBooking}
              onCancelBooking={onCancelBooking}
            />
          )}
        </div>
      </td>
    </motion.tr>
  );
}