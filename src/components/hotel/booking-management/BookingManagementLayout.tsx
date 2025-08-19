import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';

interface BookingManagementLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function BookingManagementLayout({ children, title, description }: BookingManagementLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DashboardLayout currentView="bookings" selectedCategory="travel">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Booking Management
              </h1>
              <p className="text-gray-400 mt-1">
                Comprehensive booking and reservation management system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/hotel/bookings/new')}
                className="gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                New Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}