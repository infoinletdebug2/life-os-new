import { motion } from 'framer-motion';
import { 
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Users,
  CreditCard
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ExtendedBooking } from '@/types/hotel/booking/booking';

interface BookingTableProps {
  bookings: ExtendedBooking[];
  onBookingClick: (booking: ExtendedBooking) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getPaymentStatusColor: (status: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

export function BookingTable({
  bookings,
  onBookingClick,
  getStatusColor,
  getStatusIcon,
  getPaymentStatusColor,
  formatCurrency,
  formatDate
}: BookingTableProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-4 text-sm font-medium text-muted-foreground">Booking</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Guest</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Room</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Dates</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Payment</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onBookingClick(booking)}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">{booking.confirmationNumber}</p>
                      <p className="text-xs text-muted-foreground">#{booking.id}</p>
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 capitalize">
                        {booking.source}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">{booking.guestName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {booking.guests.adults}A {booking.guests.children}C
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">{booking.roomNumber}</p>
                      <p className="text-xs text-muted-foreground">{booking.roomType}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>{formatDate(booking.checkIn)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>{formatDate(booking.checkOut)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {booking.nights} nights
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-sm">{formatCurrency(booking.totalAmount)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(booking.roomRate)}/night
                      </p>
                      {booking.taxes > 0 && (
                        <p className="text-xs text-muted-foreground">
                          +{formatCurrency(booking.taxes)} tax
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                      getPaymentStatusColor(booking.paymentStatus)
                    )}>
                      <CreditCard className="w-3 h-3" />
                      <span className="capitalize">{booking.paymentStatus}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                      getStatusColor(booking.status)
                    )}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}