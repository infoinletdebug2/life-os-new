import { motion } from 'framer-motion';
import { 
  Eye,
  Edit,
  MoreHorizontal,
  Bed
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ExtendedRoom } from '@/types/hotel/room/room';

interface RoomListItemProps {
  room: ExtendedRoom;
  index: number;
  onClick: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  formatCurrency: (amount: number) => string;
}

export function RoomListItem({ 
  room, 
  index,
  onClick, 
  getStatusColor, 
  getStatusIcon,
  formatCurrency 
}: RoomListItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard 
        className="p-6 hover:bg-white/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={room.images[0]} 
              alt={room.type}
              className="w-20 h-20 object-cover rounded-xl border border-white/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          </div>
          
          <div className="flex-1 grid grid-cols-8 gap-3 items-center">
            <div className="space-y-1">
              <p className="font-bold text-white">#{room.roomNumber}</p>
              <p className="text-sm text-cyan-300 font-medium">Floor {room.floor}</p>
            </div>
            
            <div className="space-y-1">
              <p className="font-bold text-white">{room.type}</p>
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-400/30 capitalize">
                  {room.category}
                </span>
                <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 text-xs font-medium rounded-full border border-emerald-400/30 capitalize">
                  {room.view} view
                </span>
              </div>
            </div>
            
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium w-fit",
              getStatusColor(room.status)
            )}>
              {getStatusIcon(room.status)}
              <span className="capitalize">{room.status.replace('-', ' ')}</span>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-white text-lg">{room.area}m²</p>
              <p className="text-xs text-gray-400 font-medium">Area</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Bed className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white text-sm">
                  {room.beds.king > 0 && `${room.beds.king}K`}
                  {room.beds.queen > 0 && `${room.beds.queen}Q`}
                  {room.beds.single > 0 && `${room.beds.single}S`}
                  {room.beds.sofa > 0 && ` +S`}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Beds</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-white text-lg">{room.maxOccupancy}</p>
              <p className="text-xs text-gray-400 font-medium">Guests</p>
            </div>
            
            <div className="text-center">
              <p className="font-bold text-emerald-400 text-lg">
                {formatCurrency(room.currentRate)}
              </p>
              <p className="text-xs text-emerald-200 font-medium">per night</p>
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}