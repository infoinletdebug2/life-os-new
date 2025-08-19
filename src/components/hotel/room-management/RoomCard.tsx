import { motion } from 'framer-motion';
import { 
  Users,
  DollarSign,
  Home,
  Clock,
  Key,
  Plus,
  Wrench
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ExtendedRoom } from '@/types/hotel/room/room';

interface RoomCardProps {
  room: ExtendedRoom;
  onClick: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getAmenityIcon: (iconName: string) => any;
  formatCurrency: (amount: number) => string;
}

export function RoomCard({ 
  room, 
  onClick, 
  getStatusColor, 
  getStatusIcon, 
  getAmenityIcon,
  formatCurrency 
}: RoomCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="group cursor-pointer overflow-hidden" onClick={onClick}>
        {/* Room Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={room.images[0]} 
            alt={room.type}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Room Number & Floor */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white font-semibold">Room {room.roomNumber}</span>
              <span className="text-white/70 text-sm ml-2">Floor {room.floor}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium backdrop-blur-sm",
              getStatusColor(room.status)
            )}>
              {getStatusIcon(room.status)}
              <span className="capitalize text-sm">{room.status.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Room Type */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg">{room.type}</h3>
            <p className="text-white/80 text-sm capitalize">{room.category} • {room.view} view</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Room Features */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{room.maxOccupancy} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4 text-muted-foreground" />
                <span>{room.area}m²</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(room.currentRate)}
              </span>
              <span className="text-xs text-muted-foreground">/night</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-2 flex-wrap">
            {room.amenities.slice(0, 4).map((amenity) => {
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
            {room.amenities.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{room.amenities.length - 4}
              </span>
            )}
          </div>

          {/* Occupancy Info or Action */}
          {room.currentOccupant ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium">{room.currentOccupant.guestName}</p>
                  <p className="text-xs text-muted-foreground">
                    Check-out: {room.currentOccupant.checkOut}
                  </p>
                </div>
                <Key className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          ) : room.status === 'housekeeping' ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-600 dark:text-yellow-400">Cleaning in progress...</span>
                <Clock className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          ) : room.status === 'maintenance' ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-600 dark:text-orange-400">Under maintenance</span>
                <Wrench className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-white/10">
              <Button size="sm" variant="gradient" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Quick Booking
              </Button>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}