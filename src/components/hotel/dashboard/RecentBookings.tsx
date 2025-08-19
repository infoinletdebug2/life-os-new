import { motion } from 'framer-motion';
import { Calendar, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: string;
  source: string;
  avatar: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
  getStatusColor: (status: string) => string;
  formatCurrency: (amount: number) => string;
}

export function RecentBookings({ bookings, getStatusColor, formatCurrency }: RecentBookingsProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-500" />
            Recent Bookings
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            <Eye className="w-4 h-4" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center text-lg">
                {booking.avatar}
              </div>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  {booking.guest}
                </p>
                <p className="text-xs text-muted-foreground">{booking.room}</p>
                <p className="text-xs text-muted-foreground">
                  {booking.checkIn} - {booking.checkOut}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{formatCurrency(booking.amount)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  getStatusColor(booking.status)
                )}>
                  {booking.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}