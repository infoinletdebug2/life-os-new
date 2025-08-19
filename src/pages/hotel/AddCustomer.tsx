import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  User, 
  Phone, 
  MapPin,
  Star,
  Heart,
  Building
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

export default function AddCustomer() {
  const navigate = useNavigate();
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

    console.log('Saving customer:', {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: null,
      status: 'active'
    });
    
    navigate('/hotel/guests');
  };

  return (
    <DashboardLayout currentView="guests" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/hotel/guests')}
                className="hover:bg-white/10 text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Add New Customer
                </h1>
                <p className="text-gray-400 mt-1">
                  Create a comprehensive customer profile
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="space-y-10">
              {/* Personal Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </motion.div>

              {/* Customer Type & Loyalty */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Customer Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              </motion.div>

              {/* Address Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Address Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </motion.div>

              {/* Room Preferences */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Heart className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Room Preferences</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[100px]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Emergency Contact</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              </motion.div>

              {/* Internal Notes */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Building className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Internal Notes</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="internalNotes">Staff Notes</Label>
                  <Textarea
                    id="internalNotes"
                    placeholder="Internal notes for staff reference (not visible to customer)..."
                    value={formData.internalNotes}
                    onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[120px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/guests')}
              className="hover:bg-white/15 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSave}
              className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200"
            >
              <Save className="w-5 h-5" />
              Save Customer
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}