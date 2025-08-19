import { motion } from 'framer-motion';
import { MapPin, Star, BedDouble, TrendingUp, Eye, Edit, MoreHorizontal } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Hotel } from '@/types/hotel';

interface PropertyCardProps {
  hotel: Hotel;
  selectedHotels: string[];
  onSelectHotel: (hotelId: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getAmenityIcon: (iconName: string) => any;
  formatCurrency: (amount: number) => string;
  renderStarRating: (rating: number) => React.ReactNode;
}

export function PropertyCard({
  hotel,
  selectedHotels,
  onSelectHotel,
  getStatusColor,
  getStatusIcon,
  getAmenityIcon,
  formatCurrency,
  renderStarRating
}: PropertyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={hotel.images.main} 
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
              getStatusColor(hotel.status)
            )}>
              {getStatusIcon(hotel.status)}
              <span className="capitalize">{hotel.status}</span>
            </div>
          </div>

          {/* Selection Checkbox */}
          <div className="absolute top-4 right-4">
            <input
              type="checkbox"
              checked={selectedHotels.includes(hotel.id)}
              onChange={() => onSelectHotel(hotel.id)}
              className="w-4 h-4 text-primary bg-white/20 border-white/30 rounded focus:ring-primary focus:ring-2 backdrop-blur-sm"
            />
          </div>

          {/* Hotel Category & Rating */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-xs font-medium capitalize px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                  {hotel.category}
                </span>
                {renderStarRating(hotel.starRating)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Hotel Name & Location */}
          <div>
            <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{hotel.address.city}, {hotel.address.state}</span>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {hotel.stats.occupancyRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Occupancy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">
                {formatCurrency(hotel.stats.averageDailyRate)}
              </div>
              <div className="text-xs text-muted-foreground">ADR</div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <BedDouble className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium">{hotel.stats.totalRooms}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Rooms</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{hotel.stats.guestSatisfaction}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Rating</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{hotel.stats.repeatGuests}%</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Repeat</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-2 flex-wrap">
            {hotel.amenities.slice(0, 3).map((amenity) => {
              const IconComponent = getAmenityIcon(amenity.icon);
              return (
                <div 
                  key={amenity.id} 
                  className="flex items-center gap-1 px-2 py-1 bg-white/10 dark:bg-white/5 rounded-full"
                  title={amenity.name}
                >
                  <IconComponent className="w-3 h-3" />
                  <span className="text-xs">{amenity.name}</span>
                </div>
              );
            })}
            {hotel.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" variant="ghost" className="flex-1 gap-2">
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button size="sm" variant="ghost" className="flex-1 gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" className="w-10 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}