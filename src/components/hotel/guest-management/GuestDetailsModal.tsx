import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Edit,
  Calendar,
  Gift,
  FileText,
  Mail,
  MessageSquare,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import type { ExtendedGuest } from '@/types/hotel/guest/guest';

interface GuestDetailsModalProps {
  guest: ExtendedGuest | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getLoyaltyColor: (tier: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  calculateAge: (birthDate: string) => number;
}

type TabType = 'overview' | 'history' | 'preferences' | 'notes';

export function GuestDetailsModal({
  guest,
  isOpen,
  onClose,
  getStatusColor,
  getStatusIcon,
  getLoyaltyColor,
  formatCurrency,
  formatDate,
  calculateAge
}: GuestDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!guest) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6">
                <h3 className="font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{guest.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{guest.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium">
                      {guest.dateOfBirth && formatDate(guest.dateOfBirth)} 
                      {guest.dateOfBirth && ` (${calculateAge(guest.dateOfBirth)} years)`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Nationality</p>
                    <p className="font-medium">{guest.nationality}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Occupation</p>
                    <p className="font-medium">{guest.occupation}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Company</p>
                    <p className="font-medium">{guest.company}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">Address</p>
                    <p className="font-medium">
                      {guest.address.street}, {guest.address.city}, {guest.address.state} {guest.address.zipCode}, {guest.address.country}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold mb-4">Stay Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold">{guest.totalStays}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Stays</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold">{formatCurrency(guest.lifetimeValue)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Lifetime Value</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold">{formatCurrency(guest.averageSpend)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Average Spend</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Loyalty & Tags */}
            <div className="space-y-6">
              <GlassCard gradient="cyan" className="p-6">
                <h3 className="font-semibold mb-4">Loyalty Program</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold capitalize mb-2",
                      getLoyaltyColor(guest.loyaltyTier)
                    )}>
                      <Award className="w-5 h-5" />
                      {guest.loyaltyTier}
                    </div>
                    <p className="text-2xl font-bold">{guest.loyaltyPoints.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Tier</span>
                      <span className="font-medium">
                        {guest.loyaltyTier === 'diamond' ? 'Max Tier' : 
                         guest.loyaltyTier === 'platinum' ? 'Diamond' :
                         guest.loyaltyTier === 'gold' ? 'Platinum' :
                         guest.loyaltyTier === 'silver' ? 'Gold' : 'Silver'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Points to Next</span>
                      <span className="font-medium">
                        {guest.loyaltyTier === 'diamond' ? 'N/A' : '2,500'}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold mb-4">Guest Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {guest.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold mb-4">Communication</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preference</span>
                    <span className="font-medium capitalize">{guest.communicationPreference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Contact</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <MessageSquare className="w-4 h-4" />
                    SMS
                  </Button>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        );

      case 'history':
        return (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Recent Stays</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium">Ocean Suite - Room 301</p>
                      <p className="text-sm text-muted-foreground">
                        Jan 10-13, 2024 • 3 nights
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(1455)}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        );

      case 'preferences':
        return (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Room Preferences</h3>
              <div className="space-y-3">
                {guest.roomPreferences?.map((pref) => (
                  <div key={pref} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{pref}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Dietary Restrictions</h3>
              <div className="space-y-3">
                {guest.dietaryRestrictions?.map((diet) => (
                  <div key={diet} className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{diet}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        );

      case 'notes':
        return (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Special Notes</h3>
              <p className="text-sm text-muted-foreground">
                {guest.specialNotes}
              </p>
            </GlassCard>
          </motion.div>
        );
    }
  };

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
            className="bg-card glass backdrop-blur-xl rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <img 
                  src={guest.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${guest.firstName} ${guest.lastName}`}
                  alt={`${guest.firstName} ${guest.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {guest.firstName} {guest.lastName}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                      getStatusColor(guest.status)
                    )}>
                      {getStatusIcon(guest.status)}
                      <span className="capitalize">{guest.status}</span>
                    </div>
                    <div className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                      getLoyaltyColor(guest.loyaltyTier)
                    )}>
                      {guest.loyaltyTier} Member
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-4 px-6 pt-4 border-b border-white/10">
              {(['overview', 'history', 'preferences', 'notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-3 px-1 text-sm font-medium capitalize transition-colors relative",
                    activeTab === tab 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {renderTabContent()}
              </AnimatePresence>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 p-6 border-t border-white/10">
              <Button variant="gradient" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                New Reservation
              </Button>
              <Button variant="outline" className="gap-2">
                <Gift className="w-4 h-4" />
                Send Offer
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                View Report
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}