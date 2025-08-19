import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Edit,
  Trash2,
  Grid3X3,
  Palette,
  Search,
  Filter,
  Star,
  Users,
  DollarSign
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RoomCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  priority: number;
  features: string[];
  targetAudience: string;
  priceRange: {
    min: number;
    max: number;
  };
  active: boolean;
  roomCount: number;
  bookingPercentage: number;
  createdAt: string;
}

const mockCategories: RoomCategory[] = [
  {
    id: '1',
    name: 'Standard',
    description: 'Essential comfort and amenities for budget-conscious travelers.',
    color: '#3B82F6',
    priority: 1,
    features: ['Basic Amenities', 'Standard Service', 'Essential Comfort'],
    targetAudience: 'Budget Travelers',
    priceRange: { min: 80, max: 150 },
    active: true,
    roomCount: 25,
    bookingPercentage: 68,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Deluxe',
    description: 'Enhanced comfort with premium amenities and superior service.',
    color: '#10B981',
    priority: 2,
    features: ['Premium Amenities', 'Enhanced Service', 'Superior Comfort'],
    targetAudience: 'Business Travelers',
    priceRange: { min: 150, max: 300 },
    active: true,
    roomCount: 15,
    bookingPercentage: 72,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Premium',
    description: 'Luxury accommodations with exclusive amenities and personalized service.',
    color: '#F59E0B',
    priority: 3,
    features: ['Luxury Amenities', 'Personalized Service', 'Exclusive Access'],
    targetAudience: 'Luxury Travelers',
    priceRange: { min: 300, max: 600 },
    active: true,
    roomCount: 8,
    bookingPercentage: 85,
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    name: 'Presidential',
    description: 'Ultimate luxury experience with bespoke services and exclusive privileges.',
    color: '#8B5CF6',
    priority: 4,
    features: ['Bespoke Services', 'VIP Treatment', 'Exclusive Privileges'],
    targetAudience: 'VIP Guests',
    priceRange: { min: 600, max: 1500 },
    active: true,
    roomCount: 3,
    bookingPercentage: 92,
    createdAt: '2024-01-15'
  }
];

const colorOptions = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export default function RoomCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<RoomCategory[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<RoomCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    priority: '1',
    features: '',
    targetAudience: '',
    minPrice: '',
    maxPrice: ''
  });

  const filteredCategories = categories
    .filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.priority - b.priority);

  const handleAddNew = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      priority: '1',
      features: '',
      targetAudience: '',
      minPrice: '',
      maxPrice: ''
    });
    setEditingCategory(null);
    setShowAddForm(true);
  };

  const handleEdit = (category: RoomCategory) => {
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      priority: category.priority.toString(),
      features: category.features.join(', '),
      targetAudience: category.targetAudience,
      minPrice: category.priceRange.min.toString(),
      maxPrice: category.priceRange.max.toString()
    });
    setEditingCategory(category);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.minPrice || !formData.maxPrice) {
      alert('Please fill in required fields');
      return;
    }

    const categoryData = {
      id: editingCategory?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      color: formData.color,
      priority: parseInt(formData.priority),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      targetAudience: formData.targetAudience,
      priceRange: {
        min: parseFloat(formData.minPrice),
        max: parseFloat(formData.maxPrice)
      },
      active: true,
      roomCount: editingCategory?.roomCount || 0,
      bookingPercentage: editingCategory?.bookingPercentage || 0,
      createdAt: editingCategory?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingCategory) {
      setCategories(cats => cats.map(c => c.id === editingCategory.id ? categoryData : c));
    } else {
      setCategories(cats => [...cats, categoryData]);
    }

    setShowAddForm(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(cats => cats.filter(c => c.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setCategories(cats => cats.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Room Categories
            </h1>
            <p className="text-gray-400 mt-1">
              Organize and manage room categories for better classification
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/hotel/rooms/categories/add')}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Header with Color Bar */}
              <div 
                className="h-2"
                style={{ backgroundColor: category.color }}
              />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg border-2"
                      style={{ 
                        backgroundColor: `${category.color}20`,
                        borderColor: `${category.color}40`
                      }}
                    >
                      <Grid3X3 className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.active 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {category.active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs text-gray-400">Priority {category.priority}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">
                      ${category.priceRange.min}-{category.priceRange.max}
                    </p>
                    <p className="text-xs text-gray-400">Price Range</p>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">{category.roomCount}</p>
                    <p className="text-xs text-gray-400">Rooms</p>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-white">{category.bookingPercentage}%</p>
                    <p className="text-xs text-gray-400">Occupancy</p>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Target Audience</h4>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color
                    }}
                  >
                    {category.targetAudience}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-300">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {category.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Performance Bar */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Booking Performance</span>
                    <span className="text-xs font-medium text-white">{category.bookingPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${category.bookingPercentage}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(category.id)}
                    className={category.active ? 'border-green-500/50 text-green-400' : 'border-gray-500/50 text-gray-400'}
                  >
                    {category.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
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
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Premium Deluxe"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                      id="priority"
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      placeholder="1"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the category and its positioning..."
                    className="bg-gray-800/50 border-gray-600/50 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category Color</Label>
                  <div className="flex items-center gap-3">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          formData.color === color ? 'border-white scale-110' : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">Min Price *</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={formData.minPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                      placeholder="100"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Max Price *</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                      placeholder="300"
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="e.g., Business Travelers, Luxury Guests"
                    className="bg-gray-800/50 border-gray-600/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="Premium Amenities, Enhanced Service, Superior Comfort"
                    className="bg-gray-800/50 border-gray-600/50 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {editingCategory ? 'Update' : 'Create'} Category
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </RoomManagementLayout>
  );
}