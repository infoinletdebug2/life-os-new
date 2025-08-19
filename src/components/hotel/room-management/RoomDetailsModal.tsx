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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl shadow-black/50 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/20 bg-gradient-to-r from-gray-800/60 to-gray-700/60">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Room {room.roomNumber} Details
                  </h2>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    {room.type} • {room.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/15 text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:scale-105"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900/30 to-gray-800/50 custom-scrollbar">
                <div className="p-8 space-y-8 min-h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white mb-3">Room Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">Floor</span>
                          <span className="text-white font-semibold">{room.floor}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">Area</span>
                          <span className="text-white font-semibold">{room.area}m²</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">View</span>
                          <span className="text-white font-semibold capitalize">{room.view}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-400 font-medium">Max Occupancy</span>
                          <span className="text-white font-semibold">{room.maxOccupancy} guests</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                      <h4 className="text-base font-bold text-white mb-3">Pricing</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">Base Rate</span>
                          <span className="text-white font-semibold">{formatCurrency(room.baseRate)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-400 font-medium">Current Rate</span>
                          <span className="font-bold text-base text-emerald-400">
                            {formatCurrency(room.currentRate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Status and Details */}
                <div className="space-y-6">
                  {/* Current Status */}
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h3 className="text-base font-bold text-white mb-3">Current Status</h3>
                    <div className={cn(
                      "inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold backdrop-blur-xl border border-white/10",
                      getStatusColor(room.status)
                    )}>
                      {getStatusIcon(room.status)}
                      <span className="capitalize">{room.status.replace('-', ' ')}</span>
                    </div>

                    {room.currentOccupant && (
                      <div className="mt-5 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-400/20">
                        <p className="text-sm font-bold text-blue-200 mb-3 uppercase tracking-wide">
                          Current Guest
                        </p>
                        <p className="font-bold text-white text-lg">{room.currentOccupant.guestName}</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-blue-200">
                            Check-in: <span className="font-semibold">{room.currentOccupant.checkIn}</span>
                          </p>
                          <p className="text-sm text-blue-200">
                            Check-out: <span className="font-semibold">{room.currentOccupant.checkOut}</span>
                          </p>
                          <p className="text-sm text-blue-200">
                            Guests: <span className="font-semibold">{room.currentOccupant.adults} adults, {room.currentOccupant.children} children</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                    <h3 className="text-base font-bold text-white mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity) => {
                        const IconComponent = getAmenityIcon(amenity.icon);
                        return (
                          <div 
                            key={amenity.id} 
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-300"
                          >
                            <IconComponent className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-white font-medium">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Housekeeping & Maintenance */}
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-5 space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-white mb-3">Housekeeping</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">Last Cleaned</span>
                          <span className="text-white font-semibold">{new Date(room.lastCleaned || '').toLocaleDateString()}</span>
                        </div>
                        {room.housekeepingNotes && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/20">
                            <p className="text-xs text-yellow-100">{room.housekeepingNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                      <h3 className="text-base font-bold text-white mb-3">Maintenance</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-gray-400 font-medium">Last Maintenance</span>
                          <span className="text-white font-semibold">{room.lastMaintenance ? new Date(room.lastMaintenance).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        {room.maintenanceNotes && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-400/20">
                            <p className="text-xs text-orange-100">{room.maintenanceNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Revenue Stats */}
                  {room.revenue && (
                    <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-xl border border-emerald-400/20 rounded-xl p-5">
                      <h3 className="text-base font-bold text-white mb-3">Revenue Performance</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                          <p className="text-2xl font-bold text-emerald-400">{formatCurrency(room.revenue.mtd)}</p>
                          <p className="text-xs text-emerald-200 font-medium uppercase tracking-wide">MTD</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                          <p className="text-2xl font-bold text-emerald-400">{formatCurrency(room.revenue.ytd)}</p>
                          <p className="text-xs text-emerald-200 font-medium uppercase tracking-wide">YTD</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                          <p className="text-2xl font-bold text-emerald-400">{room.revenue.occupancyRate}%</p>
                          <p className="text-xs text-emerald-200 font-medium uppercase tracking-wide">Occupancy</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-8 border-t border-white/20 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <Button className="gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105">
                    <Edit className="w-4 h-4" />
                    Edit Room
                  </Button>
                  <Button variant="outline" className="gap-3 border-2 border-gray-500/50 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                    <CalendarDays className="w-4 h-4" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="gap-3 border-2 border-gray-500/50 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                    <Settings className="w-4 h-4" />
                    Room Settings
                  </Button>
                </div>
                <Button variant="outline" className="gap-3 border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                  <Trash2 className="w-4 h-4" />
                  Delete Room
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}