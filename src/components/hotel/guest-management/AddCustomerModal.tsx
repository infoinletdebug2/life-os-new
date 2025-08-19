import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Save,
  Star,
  Heart,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: any) => void;
}

const customerTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'business', label: 'Business' },
  { value: 'group', label: 'Group' },
  { value: 'corporate', label: 'Corporate' }
];

const loyaltyTiers = [
  { value: 'bronze', label: 'Bronze', color: '#CD7F32' },
  { value: 'silver', label: 'Silver', color: '#C0C0C0' },
  { value: 'gold', label: 'Gold', color: '#FFD700' },
  { value: 'platinum', label: 'Platinum', color: '#E5E4E2' },
  { value: 'diamond', label: 'Diamond', color: '#B9F2FF' }
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
  'Australia', 'Japan', 'Singapore', 'India', 'Brazil', 'Other'
];

export function AddCustomerModal({ isOpen, onClose, onSave }: AddCustomerModalProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    
    // Contact Information
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    
    // Customer Details
    customerType: 'individual',
    loyaltyTier: 'bronze',
    company: '',
    preferences: {
      roomType: '',
      floorLevel: '',
      bedType: '',
      smokingPreference: 'non-smoking',
      dietaryRestrictions: '',
      specialRequests: ''
    },
    
    // Marketing & Communication
    marketingConsent: true,
    preferredCommunication: 'email',
    language: 'en',
    
    // Notes
    internalNotes: '',
    
    // Emergency Contact
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in required fields: First Name, Last Name, and Email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    onSave({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: null,
      status: 'active'
    });
    
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      },
      customerType: 'individual',
      loyaltyTier: 'bronze',
      company: '',
      preferences: {
        roomType: '',
        floorLevel: '',
        bedType: '',
        smokingPreference: 'non-smoking',
        dietaryRestrictions: '',
        specialRequests: ''
      },
      marketingConsent: true,
      preferredCommunication: 'email',
      language: 'en',
      internalNotes: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-5xl h-[90vh] flex flex-col"
        >
          <div className="bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl shadow-black/50 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/20 bg-gradient-to-r from-gray-800/60 to-gray-700/60">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Add New Customer
                </h2>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Create a comprehensive customer profile
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
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <User className="w-5 h-5 text-cyan-500" />
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="e.g., American, Canadian"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Type & Loyalty */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-white">Customer Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerType">Customer Type</Label>
                    <select
                      id="customerType"
                      value={formData.customerType}
                      onChange={(e) => handleInputChange('customerType', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      {customerTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loyaltyTier">Loyalty Tier</Label>
                    <select
                      id="loyaltyTier"
                      value={formData.loyaltyTier}
                      onChange={(e) => handleInputChange('loyaltyTier', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      {loyaltyTiers.map(tier => (
                        <option key={tier.value} value={tier.value}>
                          {tier.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(formData.customerType === 'business' || formData.customerType === 'corporate') && (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">Address Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      placeholder="123 Main Street, Apt 4B"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      placeholder="Enter state or province"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="12345"
                      value={formData.address.zipCode}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      value={formData.address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Room Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-white">Room Preferences</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Preferred Room Type</Label>
                    <select
                      id="roomType"
                      value={formData.preferences.roomType}
                      onChange={(e) => handleInputChange('preferences.roomType', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      <option value="">No preference</option>
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                      <option value="executive">Executive Room</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedType">Preferred Bed Type</Label>
                    <select
                      id="bedType"
                      value={formData.preferences.bedType}
                      onChange={(e) => handleInputChange('preferences.bedType', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      <option value="">No preference</option>
                      <option value="single">Single Bed</option>
                      <option value="twin">Twin Beds</option>
                      <option value="double">Double Bed</option>
                      <option value="queen">Queen Bed</option>
                      <option value="king">King Bed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="floorLevel">Preferred Floor Level</Label>
                    <select
                      id="floorLevel"
                      value={formData.preferences.floorLevel}
                      onChange={(e) => handleInputChange('preferences.floorLevel', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      <option value="">No preference</option>
                      <option value="low">Low floors (1-3)</option>
                      <option value="mid">Mid floors (4-7)</option>
                      <option value="high">High floors (8+)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smokingPreference">Smoking Preference</Label>
                    <select
                      id="smokingPreference"
                      value={formData.preferences.smokingPreference}
                      onChange={(e) => handleInputChange('preferences.smokingPreference', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    >
                      <option value="non-smoking">Non-smoking</option>
                      <option value="smoking">Smoking allowed</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                    <Input
                      id="dietaryRestrictions"
                      placeholder="e.g., Vegetarian, Gluten-free, Allergies"
                      value={formData.preferences.dietaryRestrictions}
                      onChange={(e) => handleInputChange('preferences.dietaryRestrictions', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests or accommodation needs..."
                      value={formData.preferences.specialRequests}
                      onChange={(e) => handleInputChange('preferences.specialRequests', e.target.value)}
                      className="bg-white/5 border-white/20 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-white">Emergency Contact</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      placeholder="Full name"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      placeholder="e.g., Spouse, Parent, Friend"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Building className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-white">Internal Notes</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="internalNotes">Staff Notes</Label>
                  <Textarea
                    id="internalNotes"
                    placeholder="Internal notes for staff reference (not visible to customer)..."
                    value={formData.internalNotes}
                    onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[100px]"
                  />
                </div>
              </div>
            </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-8 border-t border-white/20 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm">
              <Button
                variant="ghost"
                onClick={onClose}
                className="hover:bg-white/15 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              >
                Cancel
              </Button>
              
              <Button
                onClick={handleSave}
                className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
              >
                <Save className="w-5 h-5" />
                Save Customer
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}