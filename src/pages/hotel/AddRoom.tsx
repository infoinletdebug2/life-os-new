import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Plus, 
  Trash2, 
  Calendar,
  DollarSign,
  Users,
  BedDouble,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Building2,
  Percent,
  Clock
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { SeasonalRate, WeeklyRate, SpecialRate } from '@/types/hotel/pricing/pricing';

const roomTypes = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'suite', label: 'Suite' },
  { value: 'presidential', label: 'Presidential Suite' },
  { value: 'executive', label: 'Executive Room' },
  { value: 'accessible', label: 'Accessible Room' }
];

const amenityOptions = [
  { id: 'wifi', name: 'Free WiFi', icon: Wifi },
  { id: 'parking', name: 'Parking', icon: Car },
  { id: 'breakfast', name: 'Breakfast', icon: Coffee },
  { id: 'minibar', name: 'Mini Bar', icon: Building2 },
  { id: 'restaurant', name: 'Room Service', icon: Utensils },
  { id: 'spa', name: 'Spa Access', icon: Waves },
];

export default function AddRoom() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    number: '',
    type: 'standard',
    floor: '',
    capacity: 2,
    bedType: 'queen',
    size: '',
    description: '',
    amenities: [] as string[],
    images: [] as string[],
    baseRate: '',
    seasonalRates: [] as SeasonalRate[],
    weeklyRates: [
      { id: '1', name: 'Sunday', dayOfWeek: 0, multiplier: 1.0 },
      { id: '2', name: 'Monday', dayOfWeek: 1, multiplier: 1.0 },
      { id: '3', name: 'Tuesday', dayOfWeek: 2, multiplier: 1.0 },
      { id: '4', name: 'Wednesday', dayOfWeek: 3, multiplier: 1.0 },
      { id: '5', name: 'Thursday', dayOfWeek: 4, multiplier: 1.0 },
      { id: '6', name: 'Friday', dayOfWeek: 5, multiplier: 1.2 },
      { id: '7', name: 'Saturday', dayOfWeek: 6, multiplier: 1.2 },
    ] as WeeklyRate[],
    specialRates: [] as SpecialRate[]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const addSeasonalRate = () => {
    const newRate: SeasonalRate = {
      id: Date.now().toString(),
      name: '',
      startDate: '',
      endDate: '',
      multiplier: 1.0,
      color: '#3B82F6'
    };
    setFormData(prev => ({
      ...prev,
      seasonalRates: [...prev.seasonalRates, newRate]
    }));
  };

  const updateSeasonalRate = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      seasonalRates: prev.seasonalRates.map(rate =>
        rate.id === id ? { ...rate, [field]: value } : rate
      )
    }));
  };

  const removeSeasonalRate = (id: string) => {
    setFormData(prev => ({
      ...prev,
      seasonalRates: prev.seasonalRates.filter(rate => rate.id !== id)
    }));
  };

  const updateWeeklyRate = (dayOfWeek: number, multiplier: number) => {
    setFormData(prev => ({
      ...prev,
      weeklyRates: prev.weeklyRates.map(rate =>
        rate.dayOfWeek === dayOfWeek ? { ...rate, multiplier } : rate
      )
    }));
  };

  const addSpecialRate = () => {
    const newRate: SpecialRate = {
      id: Date.now().toString(),
      name: '',
      date: '',
      multiplier: 1.0,
      color: '#EF4444'
    };
    setFormData(prev => ({
      ...prev,
      specialRates: [...prev.specialRates, newRate]
    }));
  };

  const updateSpecialRate = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      specialRates: prev.specialRates.map(rate =>
        rate.id === id ? { ...rate, [field]: value } : rate
      )
    }));
  };

  const removeSpecialRate = (id: string) => {
    setFormData(prev => ({
      ...prev,
      specialRates: prev.specialRates.filter(rate => rate.id !== id)
    }));
  };

  const handleSave = () => {
    console.log('Saving room:', formData);
    // Here you would typically call your API to save the room
    navigate('/hotel/rooms');
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-cyan-400" />
          Room Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number *</Label>
            <Input
              id="roomNumber"
              placeholder="e.g., 101, A12"
              value={formData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roomType">Room Type *</Label>
            <select
              id="roomType"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Input
              id="floor"
              placeholder="e.g., 1, 2, Ground"
              value={formData.floor}
              onChange={(e) => handleInputChange('floor', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity (Guests) *</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              max="10"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 1)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedType">Bed Configuration</Label>
            <select
              id="bedType"
              value={formData.bedType}
              onChange={(e) => handleInputChange('bedType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            >
              <option value="single">Single Bed</option>
              <option value="twin">Twin Beds</option>
              <option value="double">Double Bed</option>
              <option value="queen">Queen Bed</option>
              <option value="king">King Bed</option>
              <option value="sofa">Sofa Bed</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Room Size (sq ft)</Label>
            <Input
              id="size"
              placeholder="e.g., 350"
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="description">Room Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the room features, view, and special characteristics..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Room Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenityOptions.map(amenity => {
            const IconComponent = amenity.icon;
            const isSelected = formData.amenities.includes(amenity.id);
            
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => handleAmenityToggle(amenity.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
                  isSelected
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                    : "bg-gray-800/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50 hover:text-white"
                )}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{amenity.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-white">Base Pricing</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baseRate">Base Rate per Night (USD) *</Label>
          <Input
            id="baseRate"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g., 150.00"
            value={formData.baseRate}
            onChange={(e) => handleInputChange('baseRate', e.target.value)}
            className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
          />
          <p className="text-xs text-gray-400">
            This is your standard nightly rate before any seasonal or weekly adjustments.
          </p>
        </div>
      </div>

      {/* Weekly Rate Multipliers */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg font-bold text-white">Weekly Rate Multipliers</h3>
        </div>
        <p className="text-sm text-gray-400">
          Adjust rates for specific days of the week. 1.0 = base rate, 1.2 = 20% increase, 0.8 = 20% discount.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.weeklyRates.map(rate => (
            <div key={rate.id} className="space-y-2">
              <Label className="text-xs font-medium">{rate.name}</Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={rate.multiplier}
                  onChange={(e) => updateWeeklyRate(rate.dayOfWeek, parseFloat(e.target.value) || 1.0)}
                  className="bg-gray-800/50 border-gray-600/50 text-white pr-8 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
                <Percent className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              </div>
              {formData.baseRate && (
                <p className="text-xs text-gray-400">
                  ${(parseFloat(formData.baseRate) * rate.multiplier).toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Rates */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-white">Seasonal Rates</h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSeasonalRate}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Season
          </Button>
        </div>

        {formData.seasonalRates.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No seasonal rates defined. Click "Add Season" to create special pricing periods.
          </p>
        ) : (
          <div className="space-y-4">
            {formData.seasonalRates.map(rate => (
              <div key={rate.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
                <div className="space-y-1">
                  <Label className="text-xs">Season Name</Label>
                  <Input
                    placeholder="e.g., Summer Peak"
                    value={rate.name}
                    onChange={(e) => updateSeasonalRate(rate.id, 'name', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Start Date</Label>
                  <Input
                    type="date"
                    value={rate.startDate}
                    onChange={(e) => updateSeasonalRate(rate.id, 'startDate', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">End Date</Label>
                  <Input
                    type="date"
                    value={rate.endDate}
                    onChange={(e) => updateSeasonalRate(rate.id, 'endDate', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Multiplier</Label>
                  <Input
                    type="number"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    value={rate.multiplier}
                    onChange={(e) => updateSeasonalRate(rate.id, 'multiplier', parseFloat(e.target.value) || 1.0)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSeasonalRate(rate.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Dates */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-white">Special Date Rates</h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecialRate}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Special Date
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          Set special rates for holidays, events, or specific dates.
        </p>

        {formData.specialRates.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No special dates defined. Click "Add Special Date" to create event-based pricing.
          </p>
        ) : (
          <div className="space-y-4">
            {formData.specialRates.map(rate => (
              <div key={rate.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
                <div className="space-y-1">
                  <Label className="text-xs">Event Name</Label>
                  <Input
                    placeholder="e.g., New Year's Eve"
                    value={rate.name}
                    onChange={(e) => updateSpecialRate(rate.id, 'name', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Date</Label>
                  <Input
                    type="date"
                    value={rate.date}
                    onChange={(e) => updateSpecialRate(rate.id, 'date', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Multiplier</Label>
                  <Input
                    type="number"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={rate.multiplier}
                    onChange={(e) => updateSpecialRate(rate.id, 'multiplier', parseFloat(e.target.value) || 1.0)}
                    className="bg-gray-800/50 border-gray-600/50 text-white text-sm focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecialRate(rate.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
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
                  Add New Room
                </h1>
                <p className="text-gray-400 mt-1">
                  Step {currentStep} of 2: {currentStep === 1 ? 'Room Details' : 'Pricing & Rates'}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-6">
              <div className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                currentStep === 1 
                  ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                  : "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-2 border-green-400/50 shadow-lg shadow-green-500/20"
              )}>
                <BedDouble className="w-5 h-5" />
                Room Details
              </div>
              <div className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                currentStep > 1 ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-white/20"
              )} />
              <div className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                currentStep === 2 
                  ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                  : "bg-gray-700/30 text-gray-400 border-2 border-gray-600/30"
              )}>
                <DollarSign className="w-5 h-5" />
                Pricing & Rates
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: currentStep === 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentStep === 2 ? -20 : 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentStep === 1 ? renderStep1() : renderStep2()}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/rooms')}
              className="hover:bg-white/15 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
            
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="border-2 border-gray-500/50 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < 2 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!formData.number || !formData.type}
                  className="gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={!formData.number || !formData.type || !formData.baseRate}
                  className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  Save Room
                </Button>
              )}
            </div>
          </div>
        </div>
    </RoomManagementLayout>
  );
}