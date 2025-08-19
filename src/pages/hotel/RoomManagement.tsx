import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Plus,
  Download,
  Upload,
  Bed
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import { 
  RoomCard,
  RoomListItem,
  RoomStats,
  RoomFilters,
  RoomDetailsModal
} from '@/components/hotel/room-management';
import { 
  mockRooms,
  categoryOptions,
  statusOptions,
  floorOptions
} from '@/components/hotel/room-management/mock-data';
import type { ExtendedRoom } from '@/types/hotel/room/room';
import {
  getStatusColor,
  getStatusIcon,
  getAmenityIcon,
  formatCurrency
} from '@/components/hotel/room-management/utils';

export default function RoomManagement() {
  const [rooms] = useState<ExtendedRoom[]>(mockRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRoom, setSelectedRoom] = useState<ExtendedRoom | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Stats calculation
  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    housekeeping: rooms.filter(r => r.status === 'housekeeping').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    averageOccupancy: Math.round(
      rooms.reduce((acc, room) => acc + (room.revenue?.occupancyRate || 0), 0) / rooms.length
    )
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.includes(searchQuery) || 
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    const matchesFloor = selectedFloor === 'all' || room.floor.toString() === selectedFloor;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFloor;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleRoomClick = (room: ExtendedRoom) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  return (
    <DashboardLayout currentView="rooms" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Room & Inventory Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage your property's room inventory
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="gradient" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Room
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <RoomStats stats={stats} />

          {/* Filters & Search */}
          <RoomFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
            viewMode={viewMode}
            setViewMode={setViewMode}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            categoryOptions={categoryOptions}
            statusOptions={statusOptions}
            floorOptions={floorOptions}
          />

          {/* Rooms Grid/List */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredRooms.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={room}
                    onClick={() => handleRoomClick(room)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    getAmenityIcon={getAmenityIcon}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredRooms.map((room, index) => (
                  <RoomListItem
                    key={room.id}
                    room={room}
                    index={index}
                    onClick={() => handleRoomClick(room)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredRooms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add a new room.
              </p>
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Room
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Room Details Modal */}
      <RoomDetailsModal
        room={selectedRoom}
        isOpen={showRoomDetails}
        onClose={() => setShowRoomDetails(false)}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getAmenityIcon={getAmenityIcon}
        formatCurrency={formatCurrency}
      />
    </DashboardLayout>
  );
}