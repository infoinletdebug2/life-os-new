import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Grid3X3,
  Palette,
  DollarSign,
  Users,
  Star,
  Target
} from 'lucide-react';
import { RoomManagementLayout } from '@/components/hotel/room-management/RoomManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const colorOptions = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const priorityOptions = [
  { value: '1', label: 'Essential', description: 'Core category for basic accommodations' },
  { value: '2', label: 'Standard', description: 'Standard tier for regular guests' },
  { value: '3', label: 'Premium', description: 'Premium tier for enhanced experience' },
  { value: '4', label: 'Luxury', description: 'Top tier for VIP experiences' },
  { value: '5', label: 'Exclusive', description: 'Ultra-premium exclusive category' }
];

export default function AddCategory() {
  const navigate = useNavigate();
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving category:', formData);
    // Here you would typically call your API to save the category
    navigate('/hotel/rooms/categories');
  };

  return (
    <RoomManagementLayout>
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/rooms/categories')}
              className="hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Add New Category
              </h1>
              <p className="text-muted-foreground mt-1">
                Create a new room category for better organization
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="glass-card">
          <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Grid3X3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-foreground">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Deluxe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-3 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the category and its positioning..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring min-h-[100px]"
                />
              </div>
            </div>

            {/* Visual Settings */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-foreground">Visual Settings</h3>
              </div>
              
              <div className="space-y-4">
                <Label>Category Color</Label>
                <div className="flex items-center gap-3 flex-wrap">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={cn(
                        "w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110",
                        formData.color === color 
                          ? "border-white scale-110 shadow-lg" 
                          : "border-input hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  This color will be used for category badges and visual identification
                </p>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-foreground">Pricing Range</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Minimum Price (USD) *</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="100"
                    value={formData.minPrice}
                    onChange={(e) => handleInputChange('minPrice', e.target.value)}
                    className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Maximum Price (USD) *</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="300"
                    value={formData.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                    className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Set the expected price range for rooms in this category
              </p>
            </div>

            {/* Target Audience & Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-foreground">Target Audience & Features</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="e.g., Business Travelers, Luxury Guests, Families"
                    className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Features (comma-separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="Premium Amenities, Enhanced Service, Superior Comfort"
                    className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-foreground">Preview</h3>
              </div>
              
              {formData.name && (
                <div className="p-6 bg-gray-700/30 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-2 rounded-lg border-2"
                      style={{ 
                        backgroundColor: `${formData.color}20`,
                        borderColor: `${formData.color}40`
                      }}
                    >
                      <Grid3X3 className="w-5 h-5" style={{ color: formData.color }} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">{formData.name}</h4>
                      <span className="text-xs text-muted-foreground">Priority {formData.priority}</span>
                    </div>
                  </div>
                  {formData.description && (
                    <p className="text-muted-foreground text-sm mb-4">{formData.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    {formData.minPrice && formData.maxPrice && (
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">
                        ${formData.minPrice} - ${formData.maxPrice}
                      </span>
                    )}
                    {formData.targetAudience && (
                      <span 
                        className="px-3 py-1 text-sm rounded-full"
                        style={{ 
                          backgroundColor: `${formData.color}20`,
                          color: formData.color
                        }}
                      >
                        {formData.targetAudience}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between glass-card">
          <Button
            variant="ghost"
            onClick={() => navigate('/hotel/rooms/categories')}
            className="hover:bg-secondary/80 text-muted-foreground hover:text-foreground px-6 py-3 rounded-xl transition-all duration-200"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={!formData.name || !formData.minPrice || !formData.maxPrice}
            className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-foreground font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            Save Category
          </Button>
        </div>
      </div>
    </RoomManagementLayout>
  );
}