import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Plus } from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';

export default function Reservations() {
  const navigate = useNavigate();

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Reservations
            </h1>
            <p className="text-gray-400 mt-1">Manage future bookings and reservations</p>
          </div>
          <Button 
            onClick={() => navigate('/hotel/bookings/new')}
            className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4" />
            New Reservation
          </Button>
        </div>

        <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <Clock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Future Reservations</h3>
          <p className="text-gray-400 mb-6">
            This page will display all future reservations with calendar view and management tools.
          </p>
          <Button onClick={() => navigate('/hotel/bookings')}>
            View All Bookings
          </Button>
        </div>
      </div>
    </BookingManagementLayout>
  );
}