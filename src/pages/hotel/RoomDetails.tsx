import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Edit,
  CalendarDays,
  Settings,
  Trash2,
  CheckCircle,
  AlertCircle,
  Users,
  Home,
  DollarSign,
  Key,
  Clock,
  Wrench
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockRooms } from '@/components/hotel/room-management/mock-data';
import {
  getStatusColor,
  getStatusIcon,
  getAmenityIcon,
  formatCurrency
} from '@/components/hotel/room-management/utils';
import type { ExtendedRoom } from '@/types/hotel/room/room';

export default function RoomDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState<ExtendedRoom | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch the room by ID from your API
    const foundRoom = mockRooms.find(r => r.id === id);
    setRoom(foundRoom || null);
  }, [id]);

  if (!room) {
    return (
      <RoomManagementLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Room Not Found</h2>
            <p className="text-gray-400 mb-6">The requested room could not be found.</p>
            <Button onClick={() => navigate('/hotel/rooms')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Rooms
            </Button>
          </div>
        </div>
      </RoomManagementLayout>
    );
  }

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/rooms')}
              className="hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Room {room.roomNumber} Details
              </h1>
              <p className="text-gray-400 mt-1">
                {room.type} • {room.category}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Edit className="w-4 h-4" />
              Edit Room
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <div className={cn(
          "flex items-center justify-between p-6 rounded-2xl border",
          getStatusColor(room.status),
          "backdrop-blur-xl"
        )}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/20 rounded-xl">
              {getStatusIcon(room.status)}
            </div>
            <div>
              <h3 className="text-lg font-bold capitalize">
                {room.status.replace('-', ' ')}
              </h3>
              <p className="text-sm opacity-90">
                Current room status
              </p>
            </div>
          </div>
          
          {room.currentOccupant && (
            <div className="text-right">
              <p className="font-semibold">{room.currentOccupant.guestName}</p>
              <p className="text-sm opacity-90">
                Check-out: {room.currentOccupant.checkOut}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Images */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Room Images</h3>
              <div className="space-y-4">
                <img 
                  src={room.images[0]} 
                  alt={room.type}
                  className="w-full h-64 object-cover rounded-xl"
                />
                {room.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
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
            </div>

            {/* Room Information */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Room Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Home className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{room.area}m²</p>
                  <p className="text-sm text-gray-400">Area</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{room.maxOccupancy}</p>
                  <p className="text-sm text-gray-400">Max Guests</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{formatCurrency(room.currentRate)}</p>
                  <p className="text-sm text-gray-400">Current Rate</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Key className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{room.floor}</p>
                  <p className="text-sm text-gray-400">Floor</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Room Type</span>
                      <span className="text-white font-medium">{room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white font-medium capitalize">{room.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">View</span>
                      <span className="text-white font-medium capitalize">{room.view}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bed Configuration</span>
                      <span className="text-white font-medium">King Bed</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Rate</span>
                      <span className="text-white font-medium">{formatCurrency(room.baseRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Rate</span>
                      <span className="text-emerald-400 font-bold">{formatCurrency(room.currentRate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => {
                  const IconComponent = getAmenityIcon(amenity.icon);
                  return (
                    <div 
                      key={amenity.id} 
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10"
                    >
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-medium">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Current Occupancy */}
            {room.currentOccupant ? (
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  Current Guest
                </h3>
                <div className="space-y-3">
                  <p className="text-white font-semibold text-lg">{room.currentOccupant.guestName}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Check-in</span>
                      <span className="text-white font-medium">{room.currentOccupant.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Check-out</span>
                      <span className="text-white font-medium">{room.currentOccupant.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Guests</span>
                      <span className="text-white font-medium">
                        {room.currentOccupant.adults} adults, {room.currentOccupant.children} children
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-xl border border-green-400/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Available
                </h3>
                <p className="text-green-200 mb-4">This room is available for booking.</p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Book Room
                </Button>
              </div>
            )}

            {/* Housekeeping */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Housekeeping</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Cleaned</span>
                  <span className="text-white font-medium">
                    {new Date(room.lastCleaned || '').toLocaleDateString()}
                  </span>
                </div>
                {room.housekeepingNotes && (
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/20">
                    <p className="text-yellow-100 text-sm">{room.housekeepingNotes}</p>
                  </div>
                )}
                <Button variant="outline" className="w-full gap-2">
                  <Clock className="w-4 h-4" />
                  Schedule Cleaning
                </Button>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Maintenance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Maintenance</span>
                  <span className="text-white font-medium">
                    {room.lastMaintenance ? new Date(room.lastMaintenance).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                {room.maintenanceNotes && (
                  <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-400/20">
                    <p className="text-orange-100 text-sm">{room.maintenanceNotes}</p>
                  </div>
                )}
                <Button variant="outline" className="w-full gap-2">
                  <Wrench className="w-4 h-4" />
                  Report Issue
                </Button>
              </div>
            </div>

            {/* Revenue Stats */}
            {room.revenue && (
              <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Revenue Performance</h3>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-black/20 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-400">{formatCurrency(room.revenue.mtd)}</p>
                    <p className="text-emerald-200 text-sm">Month to Date</p>
                  </div>
                  <div className="text-center p-3 bg-black/20 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-400">{formatCurrency(room.revenue.ytd)}</p>
                    <p className="text-emerald-200 text-sm">Year to Date</p>
                  </div>
                  <div className="text-center p-3 bg-black/20 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-400">{room.revenue.occupancyRate}%</p>
                    <p className="text-emerald-200 text-sm">Occupancy Rate</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full gap-2">
                  <CalendarDays className="w-4 h-4" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Settings className="w-4 h-4" />
                  Room Settings
                </Button>
                <Button variant="outline" className="w-full gap-2 border-red-500/50 text-red-400 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                  Delete Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoomManagementLayout>
  );
}