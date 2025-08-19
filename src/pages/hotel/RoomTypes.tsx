import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Edit,
  Trash2,
  Tag,
  Users,
  Home,
  DollarSign,
  Search,
  Filter
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  defaultAmenities: string[];
  features: string[];
  active: boolean;
  roomCount: number;
  averageSize: number;
  createdAt: string;
}

const mockRoomTypes: RoomType[] = [
  {
    id: '1',
    name: 'Standard Room',
    description: 'Comfortable and well-appointed rooms with essential amenities for a pleasant stay.',
    basePrice: 120,
    maxOccupancy: 2,
    defaultAmenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Fridge'],
    features: ['City View', 'Work Desk', 'Private Bathroom'],
    active: true,
    roomCount: 25,
    averageSize: 300,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Deluxe Room',
    description: 'Spacious rooms with premium amenities and enhanced comfort features.',
    basePrice: 180,
    maxOccupancy: 3,
    defaultAmenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Machine'],
    features: ['City View', 'Sitting Area', 'Premium Bedding', 'Marble Bathroom'],
    active: true,
    roomCount: 15,
    averageSize: 450,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Executive Suite',
    description: 'Luxurious suites with separate living area and premium business amenities.',
    basePrice: 350,
    maxOccupancy: 4,
    defaultAmenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Coffee Machine', 'Kitchenette'],
    features: ['Ocean View', 'Separate Living Room', 'Executive Lounge Access', 'Premium Amenities'],
    active: true,
    roomCount: 8,
    averageSize: 750,
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Presidential Suite',
    description: 'The ultimate luxury experience with exclusive amenities and personalized service.',
    basePrice: 800,
    maxOccupancy: 6,
    defaultAmenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Full Bar', 'Kitchen', 'Butler Service'],
    features: ['Panoramic View', 'Multiple Bedrooms', 'Private Terrace', 'Concierge Service'],
    active: true,
    roomCount: 2,
    averageSize: 1200,
    createdAt: '2024-01-15'
  }
];

export default function RoomTypes() {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(mockRoomTypes);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingType, setEditingType] = useState<RoomType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    maxOccupancy: '',
    defaultAmenities: '',
    features: ''
  });

  const filteredRoomTypes = roomTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      maxOccupancy: '',
      defaultAmenities: '',
      features: ''
    });
    setEditingType(null);
    setShowAddForm(true);
  };

  const handleEdit = (roomType: RoomType) => {
    setFormData({
      name: roomType.name,
      description: roomType.description,
      basePrice: roomType.basePrice.toString(),
      maxOccupancy: roomType.maxOccupancy.toString(),
      defaultAmenities: roomType.defaultAmenities.join(', '),
      features: roomType.features.join(', ')
    });
    setEditingType(roomType);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.basePrice) {
      alert('Please fill in required fields');
      return;
    }

    const roomTypeData = {
      id: editingType?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      basePrice: parseFloat(formData.basePrice),
      maxOccupancy: parseInt(formData.maxOccupancy) || 2,
      defaultAmenities: formData.defaultAmenities.split(',').map(a => a.trim()).filter(a => a),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      active: true,
      roomCount: editingType?.roomCount || 0,
      averageSize: editingType?.averageSize || 300,
      createdAt: editingType?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingType) {
      setRoomTypes(types => types.map(t => t.id === editingType.id ? roomTypeData : t));
    } else {
      setRoomTypes(types => [...types, roomTypeData]);
    }

    setShowAddForm(false);
    setEditingType(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this room type?')) {
      setRoomTypes(types => types.filter(t => t.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setRoomTypes(types => types.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
  };

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Room Types
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and configure different room type categories
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/hotel/rooms/types/add')}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Room Type
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search room types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Room Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoomTypes.map((roomType, index) => (
            <motion.div
              key={roomType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                    <Tag className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{roomType.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        roomType.active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-muted-foreground'
                      }`}>
                        {roomType.active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-xs text-muted-foreground">{roomType.roomCount} rooms</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(roomType)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(roomType.id)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                {roomType.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">${roomType.basePrice}</p>
                  <p className="text-xs text-muted-foreground">Base Price</p>
                </div>
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{roomType.maxOccupancy}</p>
                  <p className="text-xs text-muted-foreground">Max Guests</p>
                </div>
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <Home className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{roomType.averageSize}</p>
                  <p className="text-xs text-muted-foreground">Avg Size</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Default Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {roomType.defaultAmenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {roomType.defaultAmenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-muted-foreground text-xs rounded-full">
                        +{roomType.defaultAmenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {roomType.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                    {roomType.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-muted-foreground text-xs rounded-full">
                        +{roomType.features.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Created: {new Date(roomType.createdAt).toLocaleDateString()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleActive(roomType.id)}
                  className={roomType.active ? 'border-green-500/50 text-green-400' : 'border-gray-500/50 text-muted-foreground'}
                >
                  {roomType.active ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingType ? 'Edit Room Type' : 'Add New Room Type'}
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Room Type Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Deluxe Ocean View"
                      className="bg-secondary border-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Price *</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, basePrice: e.target.value }))}
                      placeholder="150"
                      className="bg-secondary border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the room type and its features..."
                    className="bg-secondary border-input text-foreground min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
                  <Input
                    id="maxOccupancy"
                    type="number"
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxOccupancy: e.target.value }))}
                    placeholder="2"
                    className="bg-secondary border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Default Amenities (comma-separated)</Label>
                  <Input
                    id="amenities"
                    value={formData.defaultAmenities}
                    onChange={(e) => setFormData(prev => ({ ...prev, defaultAmenities: e.target.value }))}
                    placeholder="WiFi, Air Conditioning, TV, Mini Fridge"
                    className="bg-secondary border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="Ocean View, Balcony, Premium Bedding"
                    className="bg-secondary border-input text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {editingType ? 'Update' : 'Create'} Room Type
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </RoomManagementLayout>
  );
}