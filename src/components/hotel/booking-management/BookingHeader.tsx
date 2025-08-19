import { useNavigate } from 'react-router-dom';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BookingHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          All Bookings
        </h1>
        <p className="text-gray-400 mt-1">
          Manage all reservations and bookings
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
        <Button 
          onClick={() => navigate('/hotel/bookings/new')}
          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </Button>
      </div>
    </div>
  );
}