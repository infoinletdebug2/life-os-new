import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Edit } from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';

export default function EditBooking() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
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
              Edit Booking
            </h1>
            <p className="text-gray-400 mt-1">Modify booking details and information</p>
          </div>
        </div>

        <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
          <Edit className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Edit Booking Form</h3>
          <p className="text-gray-400 mb-6">
            This page will contain the booking editing form with all the necessary fields.
          </p>
          <Button onClick={() => navigate(`/hotel/bookings/${id}`)}>
            Back to Booking Details
          </Button>
        </div>
      </div>
    </BookingManagementLayout>
  );
}