import { useState } from 'react';
import { X, MapPin, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import type { Venue } from '../../types/event-ticketing';

interface CreateVenueProps {
  onClose: () => void;
  onSave?: (venue: Omit<Venue, 'id'>) => void;
}

export default function CreateVenue({ onClose, onSave }: CreateVenueProps) {
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
    if (onSave) {
      onSave(venue);
    }
    onClose();
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

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-background-secondary border border-gray-200 dark:border-dark-border shadow-2xl rounded-xl">
        <div className="sticky top-0 bg-white dark:bg-dark-background-secondary border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Create Venue</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  value={venue.name}
                  onChange={(e) => setVenue({ ...venue, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="e.g., Madison Square Garden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Capacity *
                </label>
                <input
                  type="number"
                  required
                  value={venue.capacity}
                  onChange={(e) => setVenue({ ...venue, capacity: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="Maximum attendees"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Location</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={venue.address}
                  onChange={(e) => setVenue({ ...venue, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={venue.city}
                    onChange={(e) => setVenue({ ...venue, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={venue.country}
                    onChange={(e) => setVenue({ ...venue, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Images</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-dark-background-primary">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Upload venue images</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">Click to browse or drag and drop</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Amenities</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add amenity (e.g., Parking, WiFi, AC)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              />
              <Button type="button" onClick={addAmenity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {venue.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Accommodation</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={venue.accommodation?.available}
                  onChange={(e) => setVenue({
                    ...venue,
                    accommodation: {
                      ...venue.accommodation!,
                      available: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Accommodation available
                </span>
              </label>

              {venue.accommodation?.available && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                      Accommodation Type
                    </label>
                    <input
                      type="text"
                      value={venue.accommodation.type}
                      onChange={(e) => setVenue({
                        ...venue,
                        accommodation: {
                          ...venue.accommodation!,
                          type: e.target.value
                        }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                      placeholder="e.g., Hotel, Hostel, Apartments"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                      Accommodation Capacity
                    </label>
                    <input
                      type="number"
                      value={venue.accommodation.capacity}
                      onChange={(e) => setVenue({
                        ...venue,
                        accommodation: {
                          ...venue.accommodation!,
                          capacity: parseInt(e.target.value) || 0
                        }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                      placeholder="Number of guests"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                      Accommodation Description
                    </label>
                    <textarea
                      value={venue.accommodation.description}
                      onChange={(e) => setVenue({
                        ...venue,
                        accommodation: {
                          ...venue.accommodation!,
                          description: e.target.value
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                      placeholder="Describe the accommodation options..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="Email address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={venue.contactInfo.website}
                  onChange={(e) => setVenue({
                    ...venue,
                    contactInfo: { ...venue.contactInfo, website: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-background-primary text-light-text-primary dark:text-dark-text-primary"
                  placeholder="https://venue-website.com"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Venue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}