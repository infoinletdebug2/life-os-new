import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus,
  Download,
  Upload,
  Calendar
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import { 
  BookingTable,
  BookingStats,
  BookingFilters
} from '@/components/hotel/booking-management';
import { 
  mockBookings,
  statusOptions,
  paymentOptions,
  sourceOptions,
  dateOptions
} from '@/components/hotel/booking-management/mock-data';
import {
  getStatusColor,
  getStatusIcon,
  getPaymentStatusColor,
  formatCurrency,
  formatDate
} from '@/components/hotel/booking-management/utils';
import type { ExtendedBooking } from '@/types/hotel/booking/booking';

export default function BookingManagement() {
  const [bookings] = useState<ExtendedBooking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Stats calculation
  const stats = {
    totalBookings: bookings.length,
    todayArrivals: bookings.filter(b => 
      new Date(b.checkIn).toDateString() === new Date().toDateString()
    ).length,
    todayDepartures: bookings.filter(b => 
      new Date(b.checkOut).toDateString() === new Date().toDateString()
    ).length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    occupancyRate: Math.round(
      (bookings.filter(b => b.status === 'checked-in').length / bookings.length) * 100
    ),
    averageDailyRate: Math.round(
      bookings.reduce((sum, b) => sum + b.roomRate, 0) / bookings.length
    )
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.guestName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesPayment = selectedPaymentStatus === 'all' || booking.paymentStatus === selectedPaymentStatus;
    const matchesSource = selectedSource === 'all' || booking.source === selectedSource;
    
    // Date filtering logic would go here
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      matchesDate = new Date(booking.checkIn).toDateString() === today || 
                   new Date(booking.checkOut).toDateString() === today;
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesSource && matchesDate;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleBookingClick = (booking: ExtendedBooking) => {
    console.log('Booking clicked:', booking);
    // TODO: Show booking details modal
  };

  return (
    <DashboardLayout currentView="bookings" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Booking Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Track reservations, check-ins, and guest services
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
              <Button variant="gradient" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <BookingStats stats={stats} formatCurrency={formatCurrency} />

          {/* Filters & Search */}
          <BookingFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPaymentStatus={selectedPaymentStatus}
            setSelectedPaymentStatus={setSelectedPaymentStatus}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            statusOptions={statusOptions}
            paymentOptions={paymentOptions}
            sourceOptions={sourceOptions}
            dateOptions={dateOptions}
          />

          {/* Bookings Table */}
          {filteredBookings.length > 0 ? (
            <BookingTable
              bookings={filteredBookings}
              onBookingClick={handleBookingClick}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getPaymentStatusColor={getPaymentStatusColor}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new booking.
              </p>
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}