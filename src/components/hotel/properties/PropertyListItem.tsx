import { motion } from 'framer-motion';
import { MapPin, Eye, Edit, MoreHorizontal } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Hotel } from '@/types/hotel';

interface PropertyListItemProps {
  hotel: Hotel;
  selectedHotels: string[];
  onSelectHotel: (hotelId: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  formatCurrency: (amount: number) => string;
  renderStarRating: (rating: number) => React.ReactNode;
}

export function PropertyListItem({
  hotel,
  selectedHotels,
  onSelectHotel,
  getStatusColor,
  getStatusIcon,
  formatCurrency,
  renderStarRating
}: PropertyListItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <GlassCard className="p-6 hover:bg-white/5 dark:hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-6">
          <input
            type="checkbox"
            checked={selectedHotels.includes(hotel.id)}
            onChange={() => onSelectHotel(hotel.id)}
            className="w-4 h-4 text-primary bg-transparent border-white/30 rounded focus:ring-primary focus:ring-2"
          />
          
          <img 
            src={hotel.images.main} 
            alt={hotel.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold truncate">{hotel.name}</h3>
              <div className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                getStatusColor(hotel.status)
              )}>
                {getStatusIcon(hotel.status)}
                <span className="capitalize">{hotel.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {hotel.address.city}, {hotel.address.state}
              </span>
              <span className="capitalize">{hotel.category}</span>
              {renderStarRating(hotel.starRating)}
            </div>
          </div>

          <div className="flex items-center gap-8 text-center">
            <div>
              <div className="text-lg font-semibold">{hotel.stats.occupancyRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Occupancy</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{formatCurrency(hotel.stats.averageDailyRate)}</div>
              <div className="text-xs text-muted-foreground">ADR</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{hotel.stats.guestSatisfaction}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{hotel.stats.totalRooms}</div>
              <div className="text-xs text-muted-foreground">Rooms</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
        </div>
      </GlassCard>
    </motion.div>
  );
}