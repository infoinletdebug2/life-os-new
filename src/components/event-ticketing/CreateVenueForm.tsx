import { useState, useCallback } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import type { Venue } from '../../types/event-ticketing';

interface CreateVenueFormProps {
  onSave?: (venue: Omit<Venue, 'id'>) => void;
}

export default function CreateVenueForm({ onSave }: CreateVenueFormProps) {
  const [venue, setVenue] = useState<Omit<Venue, 'id'>>({
    name: '',
    address: '',
    city: '',
    country: '',
    capacity: 0,
    images: [],
    amenities: [],
    accommodation: {
      available: false,
      type: '',
      capacity: 0,
      description: ''
    },
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const [newAmenity, setNewAmenity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(venue);
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setVenue({
        ...venue,
        amenities: [...venue.amenities, newAmenity.trim()]
      });
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setVenue({
      ...venue,
      amenities: venue.amenities.filter((_, i) => i !== index)
    });
  };

  // Image upload handlers
  const handleImageUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => {
        return {
          id: Date.now().toString() + Math.random(),
          url: URL.createObjectURL(file),
          file: file
        };
      });
      setVenue(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  }, []);

  const removeImage = (index: number) => {
    setVenue(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageUpload(e.dataTransfer.files);
  }, [handleImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Venue Name *
            </label>
            <input
              type="text"
              required
              value={venue.name}
              onChange={(e) => setVenue({ ...venue, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Madison Square Garden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capacity *
            </label>
            <input
              type="number"
              required
              value={venue.capacity}
              onChange={(e) => setVenue({ ...venue, capacity: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Maximum attendees"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Location</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Address *
            </label>
            <input
              type="text"
              required
              value={venue.address}
              onChange={(e) => setVenue({ ...venue, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Street address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                value={venue.city}
                onChange={(e) => setVenue({ ...venue, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country *
              </label>
              <input
                type="text"
                required
                value={venue.country}
                onChange={(e) => setVenue({ ...venue, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              required
              value={venue.contactInfo.phone}
              onChange={(e) => setVenue({ 
                ...venue, 
                contactInfo: { ...venue.contactInfo, phone: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={venue.contactInfo.email}
              onChange={(e) => setVenue({ 
                ...venue, 
                contactInfo: { ...venue.contactInfo, email: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={venue.contactInfo.website}
              onChange={(e) => setVenue({ 
                ...venue, 
                contactInfo: { ...venue.contactInfo, website: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Amenities</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Add an amenity (e.g., Parking, WiFi, Catering)"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Images */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Venue Images</h3>
        
        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
        >
          <input
            type="file"
            id="venue-images"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
          />
          <label htmlFor="venue-images" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Drag and drop images here
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              or click to browse your files
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              <Upload className="w-4 h-4" />
              Choose Images
            </div>
          </label>
        </div>

        {/* Image Preview Grid */}
        {venue.images.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Uploaded Images ({venue.images.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {venue.images.map((image, index) => (
                <div key={image.id || index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={image.url || image}
                      alt={`Venue image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accommodation */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Accommodation</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="accommodation-available"
              checked={venue.accommodation.available}
              onChange={(e) => setVenue({ 
                ...venue, 
                accommodation: { ...venue.accommodation, available: e.target.checked }
              })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="accommodation-available" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Accommodation available on-site
            </label>
          </div>
          
          {venue.accommodation.available && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={venue.accommodation.type}
                  onChange={(e) => setVenue({ 
                    ...venue, 
                    accommodation: { ...venue.accommodation, type: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select type</option>
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="guesthouse">Guest House</option>
                  <option value="resort">Resort</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={venue.accommodation.capacity}
                  onChange={(e) => setVenue({ 
                    ...venue, 
                    accommodation: { ...venue.accommodation, capacity: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Number of guests"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={venue.accommodation.description}
                  onChange={(e) => setVenue({ 
                    ...venue, 
                    accommodation: { ...venue.accommodation, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Describe the accommodation options"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Venue
        </Button>
      </div>
    </form>
  );
}