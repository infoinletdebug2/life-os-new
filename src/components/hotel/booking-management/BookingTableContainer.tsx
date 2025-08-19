import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UIBooking } from '@/types/hotel/booking/booking';
import { BookingTableRow } from './BookingTableRow';
import { BookingEmptyState } from './BookingEmptyState';

interface BookingTableContainerProps {
  bookings: UIBooking[];
  onBookingsUpdate: (bookings: UIBooking[]) => void;
}

export function BookingTableContainer({ bookings, onBookingsUpdate }: BookingTableContainerProps) {
  const navigate = useNavigate();
  const [actionDropdownOpen, setActionDropdownOpen] = useState<string | null>(null);

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

  const handleBookingClick = (booking: UIBooking) => {
    navigate(`/hotel/bookings/${booking.id}`);
  };

  const handleConfirmBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' as const }
        : booking
    );
    onBookingsUpdate(updatedBookings);
  };

  const handleRejectBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'rejected' as const }
        : booking
    );
    onBookingsUpdate(updatedBookings);
  };

  const handleContactGuest = (booking: UIBooking, method: 'email' | 'phone') => {
    if (method === 'email') {
      window.open(`mailto:${booking.guestEmail}?subject=Regarding Your Booking ${booking.bookingNumber}&body=Dear ${booking.guestName},`);
    } else {
      console.log(`Call ${booking.guestName} - Contact hotel reception for phone number`);
    }
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/hotel/bookings/${bookingId}`);
  };

  const handleEditBooking = (bookingId: string) => {
    navigate(`/hotel/bookings/${bookingId}/edit`);
  };

  const handleGenerateInvoice = (booking: UIBooking) => {
    const invoiceData = {
      bookingNumber: booking.bookingNumber,
      guestName: booking.guestName,
      amount: booking.totalAmount,
      dates: `${booking.checkIn} to ${booking.checkOut}`
    };
    console.log('Generating invoice with data:', invoiceData);
    alert(`Invoice for booking ${booking.bookingNumber} generated successfully!`);
  };

  const handleDuplicateBooking = (booking: UIBooking) => {
    navigate('/hotel/bookings/new', { 
      state: { 
        duplicateFrom: booking,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        roomType: booking.roomType,
        guests: booking.guests
      } 
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      );
      onBookingsUpdate(updatedBookings);
    }
  };

  const handleCheckInGuest = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'checked-in' as const }
        : booking
    );
    onBookingsUpdate(updatedBookings);
  };

  if (bookings.length === 0) {
    return <BookingEmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-700/30 border-b border-white/10">
          <tr>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Booking</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Guest</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Room</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Dates</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Status</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Payment</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Amount</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {bookings.map((booking, index) => (
              <BookingTableRow
                key={booking.id}
                booking={booking}
                index={index}
                onBookingClick={handleBookingClick}
                onConfirmBooking={handleConfirmBooking}
                onRejectBooking={handleRejectBooking}
                onCheckInGuest={handleCheckInGuest}
                onContactGuest={handleContactGuest}
                onViewDetails={handleViewDetails}
                onEditBooking={handleEditBooking}
                onGenerateInvoice={handleGenerateInvoice}
                onDuplicateBooking={handleDuplicateBooking}
                onCancelBooking={handleCancelBooking}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}