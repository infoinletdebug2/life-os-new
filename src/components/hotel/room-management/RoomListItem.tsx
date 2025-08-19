import { motion } from 'framer-motion';
import { 
  Eye,
  Edit,
  MoreHorizontal
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
          <img 
            src={room.images[0]} 
            alt={room.type}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1 grid grid-cols-6 gap-4 items-center">
            <div>
              <p className="font-semibold">Room {room.roomNumber}</p>
              <p className="text-sm text-muted-foreground">Floor {room.floor}</p>
            </div>
            
            <div>
              <p className="font-medium">{room.type}</p>
              <p className="text-sm text-muted-foreground capitalize">{room.category}</p>
            </div>
            
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium w-fit",
              getStatusColor(room.status)
            )}>
              {getStatusIcon(room.status)}
              <span className="capitalize">{room.status.replace('-', ' ')}</span>
            </div>
            
            <div className="text-center">
              <p className="font-semibold">{room.maxOccupancy}</p>
              <p className="text-xs text-muted-foreground">Guests</p>
            </div>
            
            <div className="text-center">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(room.currentRate)}
              </p>
              <p className="text-xs text-muted-foreground">per night</p>
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