import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Edit,
  CalendarDays,
  Settings,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import type { ExtendedRoom } from '@/types/hotel/room/room';

interface RoomDetailsModalProps {
  room: ExtendedRoom | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getAmenityIcon: (iconName: string) => any;
  formatCurrency: (amount: number) => string;
}

export function RoomDetailsModal({
  room,
  isOpen,
  onClose,
  getStatusColor,
  getStatusIcon,
  getAmenityIcon,
  formatCurrency
}: RoomDetailsModalProps) {
  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card glass backdrop-blur-xl rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-semibold">Room {room.roomNumber} Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {room.type} • {room.category}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Images and Basic Info */}
                <div className="space-y-6">
                  {/* Room Images */}
                  <div className="space-y-4">
                    <img 
                      src={room.images[0]} 
                      alt={room.type}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {room.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {room.images.slice(1).map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`${room.type} ${idx + 2}`}
                            className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Room Info Card */}
                  <GlassCard className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Room Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Floor</span>
                          <span>{room.floor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area</span>
                          <span>{room.area}m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">View</span>
                          <span className="capitalize">{room.view}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Occupancy</span>
                          <span>{room.maxOccupancy} guests</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h4 className="font-medium mb-2">Pricing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base Rate</span>
                          <span>{formatCurrency(room.baseRate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Rate</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(room.currentRate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Right Column - Status and Details */}
                <div className="space-y-6">
                  {/* Current Status */}
                  <GlassCard className="p-4">
                    <h3 className="font-semibold mb-3">Current Status</h3>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                      getStatusColor(room.status)
                    )}>
                      {getStatusIcon(room.status)}
                      <span className="capitalize">{room.status.replace('-', ' ')}</span>
                    </div>

                    {room.currentOccupant && (
                      <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                          Current Guest
                        </p>
                        <p className="font-medium">{room.currentOccupant.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          Check-in: {room.currentOccupant.checkIn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check-out: {room.currentOccupant.checkOut}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {room.currentOccupant.adults} adults, {room.currentOccupant.children} children
                        </p>
                      </div>
                    )}
                  </GlassCard>

                  {/* Amenities */}
                  <GlassCard className="p-4">
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity) => {
                        const IconComponent = getAmenityIcon(amenity.icon);
                        return (
                          <div 
                            key={amenity.id} 
                            className="flex items-center gap-2 p-2 bg-white/10 dark:bg-white/5 rounded-lg"
                          >
                            <IconComponent className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>

                  {/* Housekeeping & Maintenance */}
                  <GlassCard className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Housekeeping</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Cleaned</span>
                          <span>{new Date(room.lastCleaned || '').toLocaleDateString()}</span>
                        </div>
                        {room.housekeepingNotes && (
                          <div className="mt-2 p-2 bg-yellow-500/10 rounded">
                            <p className="text-xs">{room.housekeepingNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="font-semibold mb-2">Maintenance</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Maintenance</span>
                          <span>{room.lastMaintenance ? new Date(room.lastMaintenance).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        {room.maintenanceNotes && (
                          <div className="mt-2 p-2 bg-orange-500/10 rounded">
                            <p className="text-xs">{room.maintenanceNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>

                  {/* Revenue Stats */}
                  {room.revenue && (
                    <GlassCard gradient="emerald" className="p-4">
                      <h3 className="font-semibold mb-3">Revenue Performance</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{formatCurrency(room.revenue.mtd)}</p>
                          <p className="text-xs text-muted-foreground">MTD</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{formatCurrency(room.revenue.ytd)}</p>
                          <p className="text-xs text-muted-foreground">YTD</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{room.revenue.occupancyRate}%</p>
                          <p className="text-xs text-muted-foreground">Occupancy</p>
                        </div>
                      </div>
                    </GlassCard>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <Button variant="gradient" className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Room
                </Button>
                <Button variant="outline" className="gap-2">
                  <CalendarDays className="w-4 h-4" />
                  View Calendar
                </Button>
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Room Settings
                </Button>
                <Button variant="outline" className="gap-2 ml-auto text-red-500 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                  Delete Room
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}