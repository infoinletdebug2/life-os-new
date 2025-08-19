import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Building2 } from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  PropertyHeader,
  PropertyFilters,
  PropertyCard,
  PropertyListItem
} from '@/components/hotel/properties';
import {
  mockHotels,
  filterOptions,
  statusOptions,
  sortOptions
} from '@/components/hotel/properties/mock-data';
import {
  getStatusColor,
  getStatusIcon,
  getAmenityIcon,
  formatCurrency,
  renderStarRating
} from '@/components/hotel/properties/utils';
import type { Hotel } from '@/types/hotel';


export default function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.address.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hotel.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || hotel.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'occupancy':
        aValue = a.stats.occupancyRate;
        bValue = b.stats.occupancyRate;
        break;
      case 'revenue':
        aValue = a.stats.totalRevenue;
        bValue = b.stats.totalRevenue;
        break;
      case 'rating':
        aValue = a.stats.guestSatisfaction;
        bValue = b.stats.guestSatisfaction;
        break;
      case 'created':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSelectAll = () => {
    if (selectedHotels.length === filteredHotels.length) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(h => h.id));
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };



  return (
    <DashboardLayout currentView="hotel-properties" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
        {/* Header */}
        <PropertyHeader />

        {/* Filters & Search */}
        <PropertyFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          selectedHotels={selectedHotels}
          filteredHotelsLength={filteredHotels.length}
          onSelectAll={handleSelectAll}
          filterOptions={filterOptions}
          statusOptions={statusOptions}
          sortOptions={sortOptions}
        />

        {/* Property Grid/List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredHotels.length} of {hotels.length} properties
            </p>
          </div>

          <AnimatePresence>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <PropertyCard 
                    key={hotel.id} 
                    hotel={hotel}
                    selectedHotels={selectedHotels}
                    onSelectHotel={handleSelectHotel}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    getAmenityIcon={getAmenityIcon}
                    formatCurrency={formatCurrency}
                    renderStarRating={renderStarRating}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <PropertyListItem 
                    key={hotel.id} 
                    hotel={hotel}
                    selectedHotels={selectedHotels}
                    onSelectHotel={handleSelectHotel}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatCurrency={formatCurrency}
                    renderStarRating={renderStarRating}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {filteredHotels.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add a new property.
              </p>
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Property
              </Button>
            </motion.div>
          )}
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}