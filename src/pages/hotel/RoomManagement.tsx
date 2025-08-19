import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Download,
  Upload,
  Bed,
  Eye
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
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
  const navigate = useNavigate();
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
    navigate(`/hotel/rooms/${room.id}`);
  };

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Room Overview
            </h1>
            <p className="text-gray-400 mt-1">
              Manage all rooms, pricing, and availability
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
            <Button 
              onClick={() => navigate('/hotel/rooms/add')}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
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
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RoomCard 
                      room={room}
                      onClick={() => handleRoomClick(room)}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      getAmenityIcon={getAmenityIcon}
                      formatCurrency={formatCurrency}
                    />
                  </motion.div>
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
              <Button 
                variant="gradient" 
                className="gap-2"
                onClick={() => navigate('/hotel/rooms/add')}
              >
                <Plus className="w-4 h-4" />
                Add Room
              </Button>
            </motion.div>
          )}
        </div>
    </RoomManagementLayout>
  );
}