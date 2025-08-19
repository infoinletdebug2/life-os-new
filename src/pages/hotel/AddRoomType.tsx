import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Tag,
  DollarSign,
  Users,
  Home,
  Bed,
  Star,
  Plus,
  Trash2
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const bedTypes = [
  { id: 'king', label: 'King Bed', icon: '👑' },
  { id: 'queen', label: 'Queen Bed', icon: '💎' },
  { id: 'single', label: 'Single Bed', icon: '🛏️' },
  { id: 'sofa', label: 'Sofa Bed', icon: '🛋️' }
];

const commonAmenities = [
  'Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Fridge', 'Coffee Machine',
  'Mini Bar', 'Safe', 'Hair Dryer', 'Iron & Ironing Board', 'Room Service',
  'Telephone', 'Work Desk', 'Seating Area', 'Balcony', 'Kitchenette'
];

const commonFeatures = [
  'City View', 'Ocean View', 'Garden View', 'Mountain View', 'Private Bathroom',
  'Marble Bathroom', 'Walk-in Shower', 'Bathtub', 'Separate Living Room',
  'Dining Area', 'Premium Bedding', 'Blackout Curtains', 'Soundproofing'
];

export default function AddRoomType() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    maxOccupancy: '2',
    averageSize: '',
    bedConfiguration: {
      king: 0,
      queen: 0,
      single: 0,
      sofa: 0
    },
    defaultAmenities: [] as string[],
    features: [] as string[],
    customAmenities: '',
    customFeatures: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBedConfigChange = (bedType: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      bedConfiguration: {
        ...prev.bedConfiguration,
        [bedType]: Math.max(0, value)
      }
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      defaultAmenities: prev.defaultAmenities.includes(amenity)
        ? prev.defaultAmenities.filter(a => a !== amenity)
        : [...prev.defaultAmenities, amenity]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSave = () => {
    console.log('Saving room type:', formData);
    // Here you would typically call your API to save the room type
    navigate('/hotel/rooms/types');
  };

  const totalBeds = Object.values(formData.bedConfiguration).reduce((sum, count) => sum + count, 0);

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/rooms/types')}
              className="hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Add New Room Type
              </h1>
              <p className="text-gray-400 mt-1">
                Create a new room type configuration
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Room Type Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Deluxe Ocean View"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (USD) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="150"
                    value={formData.basePrice}
                    onChange={(e) => handleInputChange('basePrice', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
                  <Input
                    id="maxOccupancy"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.maxOccupancy}
                    onChange={(e) => handleInputChange('maxOccupancy', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageSize">Average Size (sq ft)</Label>
                  <Input
                    id="averageSize"
                    type="number"
                    min="0"
                    placeholder="350"
                    value={formData.averageSize}
                    onChange={(e) => handleInputChange('averageSize', e.target.value)}
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the room type and its features..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 min-h-[100px]"
                />
              </div>
            </div>

            {/* Bed Configuration */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Bed className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Bed Configuration</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bedTypes.map(bedType => (
                  <div key={bedType.id} className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <span className="text-lg">{bedType.icon}</span>
                      {bedType.label}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleBedConfigChange(bedType.id, formData.bedConfiguration[bedType.id] - 1)}
                        disabled={formData.bedConfiguration[bedType.id] === 0}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={formData.bedConfiguration[bedType.id]}
                        onChange={(e) => handleBedConfigChange(bedType.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center bg-gray-800/50 border-gray-600/50 text-white"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleBedConfigChange(bedType.id, formData.bedConfiguration[bedType.id] + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalBeds > 0 && (
                <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-400/30">
                  <p className="text-purple-200 text-sm">
                    Total beds configured: <span className="font-bold">{totalBeds}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Default Amenities */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Default Amenities</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonAmenities.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm",
                      formData.defaultAmenities.includes(amenity)
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                        : "bg-gray-800/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50 hover:text-white"
                    )}
                  >
                    <span>{amenity}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAmenities">Additional Amenities (comma-separated)</Label>
                <Input
                  id="customAmenities"
                  value={formData.customAmenities}
                  onChange={(e) => handleInputChange('customAmenities', e.target.value)}
                  placeholder="Butler Service, Private Chef, etc."
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Home className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Key Features</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonFeatures.map(feature => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm",
                      formData.features.includes(feature)
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-gray-800/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50 hover:text-white"
                    )}
                  >
                    <span>{feature}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customFeatures">Additional Features (comma-separated)</Label>
                <Input
                  id="customFeatures"
                  value={formData.customFeatures}
                  onChange={(e) => handleInputChange('customFeatures', e.target.value)}
                  placeholder="Private Terrace, Fireplace, etc."
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Preview</h3>
              </div>
              
              {formData.name && (
                <div className="p-6 bg-gray-700/30 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                      <Tag className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{formData.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {formData.basePrice && (
                          <span className="text-emerald-400 font-bold">${formData.basePrice}</span>
                        )}
                        {formData.maxOccupancy && (
                          <span className="text-cyan-400 text-sm">• {formData.maxOccupancy} guests</span>
                        )}
                        {formData.averageSize && (
                          <span className="text-purple-400 text-sm">• {formData.averageSize} sq ft</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {formData.description && (
                    <p className="text-gray-300 text-sm mb-4">{formData.description}</p>
                  )}
                  
                  {totalBeds > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">Bed Configuration:</h5>
                      <div className="flex items-center gap-2 flex-wrap">
                        {Object.entries(formData.bedConfiguration).map(([type, count]) => 
                          count > 0 && (
                            <span key={type} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                              {count} {bedTypes.find(b => b.id === type)?.label}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  
                  {formData.defaultAmenities.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">Amenities:</h5>
                      <div className="flex items-center gap-1 flex-wrap">
                        {formData.defaultAmenities.slice(0, 4).map(amenity => (
                          <span key={amenity} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {formData.defaultAmenities.length > 4 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                            +{formData.defaultAmenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/hotel/rooms/types')}
            className="hover:bg-white/15 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-200"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={!formData.name || !formData.basePrice}
            className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            Save Room Type
          </Button>
        </div>
      </div>
    </RoomManagementLayout>
  );
}