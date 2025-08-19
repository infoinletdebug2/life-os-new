import { useNavigate } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BookingEmptyState() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search criteria or create a new booking.
      </p>
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={() => navigate('/hotel/bookings/new')}
      >
        <Plus className="w-4 h-4" />
        New Booking
      </Button>
    </div>
  );
}