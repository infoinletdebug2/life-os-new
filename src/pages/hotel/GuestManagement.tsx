import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus,
  Download,
  Upload,
  Users
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import { 
  GuestTable,
  GuestStats,
  GuestFilters,
  GuestDetailsModal
} from '@/components/hotel/guest-management';
import { 
  mockGuests,
  statusOptions,
  loyaltyOptions
} from '@/components/hotel/guest-management/mock-data';
import {
  getStatusColor,
  getStatusIcon,
  getLoyaltyColor,
  formatCurrency,
  formatDate,
  calculateAge
} from '@/components/hotel/guest-management/utils';
import type { ExtendedGuest } from '@/types/hotel/guest/guest';

export default function GuestManagement() {
  const navigate = useNavigate();
  const [guests] = useState<ExtendedGuest[]>(mockGuests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLoyalty, setSelectedLoyalty] = useState('all');
  const [selectedGuest, setSelectedGuest] = useState<ExtendedGuest | null>(null);
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Stats calculation
  const stats = {
    totalGuests: guests.length,
    activeGuests: guests.filter(g => g.status === 'active' || g.status === 'vip').length,
    vipGuests: guests.filter(g => g.status === 'vip').length,
    totalRevenue: guests.reduce((sum, g) => sum + g.lifetimeValue, 0),
    averageLifetimeValue: Math.round(guests.reduce((sum, g) => sum + g.lifetimeValue, 0) / guests.length),
    topSpenders: guests.filter(g => g.lifetimeValue > 20000).length
  };

  const filteredGuests = guests.filter(guest => {
    const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || guest.status === selectedStatus;
    const matchesLoyalty = selectedLoyalty === 'all' || guest.loyaltyTier === selectedLoyalty;
    
    return matchesSearch && matchesStatus && matchesLoyalty;
  }).sort((a, b) => b.lifetimeValue - a.lifetimeValue);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleGuestClick = (guest: ExtendedGuest) => {
    setSelectedGuest(guest);
    setShowGuestDetails(true);
  };

  return (
    <DashboardLayout currentView="guests" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Customer Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage customer profiles, preferences, and relationships
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
                variant="gradient" 
                size="sm" 
                className="gap-2"
                onClick={() => navigate('/hotel/guests/add')}
              >
                <UserPlus className="w-4 h-4" />
                Add Customer
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <GuestStats stats={stats} formatCurrency={formatCurrency} />

          {/* Filters & Search */}
          <GuestFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedLoyalty={selectedLoyalty}
            setSelectedLoyalty={setSelectedLoyalty}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            statusOptions={statusOptions}
            loyaltyOptions={loyaltyOptions}
          />

          {/* Guests Table */}
          {filteredGuests.length > 0 ? (
            <GuestTable
              guests={filteredGuests}
              onGuestClick={handleGuestClick}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getLoyaltyColor={getLoyaltyColor}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No guests found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add a new guest.
              </p>
              <Button 
                variant="gradient" 
                className="gap-2"
                onClick={() => navigate('/hotel/guests/add')}
              >
                <UserPlus className="w-4 h-4" />
                Add Customer
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Guest Details Modal */}
      <GuestDetailsModal
        guest={selectedGuest}
        isOpen={showGuestDetails}
        onClose={() => setShowGuestDetails(false)}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getLoyaltyColor={getLoyaltyColor}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        calculateAge={calculateAge}
      />

    </DashboardLayout>
  );
}