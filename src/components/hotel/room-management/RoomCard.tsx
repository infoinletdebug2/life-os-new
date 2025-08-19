import { motion } from 'framer-motion';
import { 
  Users,
  DollarSign,
  Home,
  Clock,
  Key,
  Plus,
  Wrench,
  Bed
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
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 hover:shadow-cyan-500/20 hover:shadow-2xl">
        {/* Room Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={room.images[0]} 
            alt={room.type}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Room Number & Status */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div className="bg-black/50 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20">
              <span className="text-white font-bold text-lg">#{room.roomNumber}</span>
              <span className="text-cyan-300 text-xs ml-2 font-medium">Floor {room.floor}</span>
            </div>

            {/* Status Badge */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-2xl font-medium text-sm backdrop-blur-md border border-white/20",
              getStatusColor(room.status)
            )}>
              {getStatusIcon(room.status)}
              <span className="capitalize">{room.status.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Room Type & Price */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">{room.type}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 text-sm font-medium capitalize bg-cyan-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/30">
                    {room.category}
                  </span>
                  <span className="text-emerald-300 text-sm font-medium capitalize bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-400/30">
                    {room.view} view
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-emerald-400/30">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-lg text-emerald-400">
                      {formatCurrency(room.currentRate)}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-200 font-medium">/night</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Room Features */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-xl border border-cyan-400/30">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-semibold text-sm">{room.maxOccupancy} guests</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 px-4 py-2 rounded-xl border border-emerald-400/30">
              <Home className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-semibold text-sm">{room.area}m²</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-xl border border-purple-400/30">
              <Bed className="w-4 h-4 text-purple-400" />
              <span className="text-white font-semibold text-sm">
                {room.beds.king > 0 && `${room.beds.king} King`}
                {room.beds.queen > 0 && `${room.beds.queen} Queen`}
                {room.beds.single > 0 && `${room.beds.single} Single`}
                {room.beds.sofa > 0 && ` +Sofa`}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Amenities</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {room.amenities.slice(0, 3).map((amenity) => {
                const IconComponent = getAmenityIcon(amenity.icon);
                return (
                  <div 
                    key={amenity.id} 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group/amenity"
                    title={amenity.name}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-cyan-400 group-hover/amenity:text-cyan-300" />
                    <span className="text-xs text-white font-medium">{amenity.name}</span>
                  </div>
                );
              })}
              {room.amenities.length > 3 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-500/30 rounded-xl border border-white/20">
                  <Plus className="w-3.5 h-3.5 text-gray-300" />
                  <span className="text-xs text-gray-300 font-medium">
                    +{room.amenities.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Occupancy Info or Action */}
          {room.currentOccupant ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl border border-blue-400/40 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-white text-sm">{room.currentOccupant.guestName}</p>
                  <p className="text-xs text-blue-200 font-medium">
                    Check-out: {room.currentOccupant.checkOut}
                  </p>
                </div>
                <Key className="w-5 h-5 text-blue-300" />
              </div>
            </div>
          ) : room.status === 'housekeeping' ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-2xl border border-yellow-400/40 backdrop-blur-sm">
                <span className="text-yellow-100 font-semibold text-sm">Cleaning in progress...</span>
                <Clock className="w-5 h-5 text-yellow-300" />
              </div>
            </div>
          ) : room.status === 'maintenance' ? (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl border border-orange-400/40 backdrop-blur-sm">
                <span className="text-orange-100 font-semibold text-sm">Under maintenance</span>
                <Wrench className="w-5 h-5 text-orange-300" />
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-white/10">
              <Button 
                size="sm" 
                className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 hover:border-cyan-300/50"
              >
                <Plus className="w-4 h-4" />
                Quick Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}