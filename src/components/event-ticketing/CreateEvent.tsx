import { useState } from 'react';
import { X, Calendar, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import type { Event, EventCategory, Venue, Person } from '../../types/event-ticketing';

interface CreateEventProps {
  onClose: () => void;
  onSave?: (event: Omit<Event, 'id'>) => void;
}

export default function CreateEvent({ onClose, onSave }: CreateEventProps) {
  const [event, setEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    categoryId: '',
    venueId: '',
    host: {
      id: '',
      name: '',
      picture: '',
      role: '',
      bio: ''
    },
    guests: [],
    startDate: '',
    endDate: '',
    images: [],
    status: 'draft',
    tags: [],
    maxAttendees: 0
  });

  const [newTag, setNewTag] = useState('');
  const [newGuest, setNewGuest] = useState<Person>({
    id: '',
    name: '',
    picture: '',
    role: '',
    bio: ''
  });
  const [showGuestForm, setShowGuestForm] = useState(false);

  // Mock data - in real app, these would come from API or state management
  const mockCategories: EventCategory[] = [
    { id: '1', name: 'Music Concert', description: 'Live music performances', icon: '🎵' },
    { id: '2', name: 'Conference', description: 'Professional conferences', icon: '💼' },
    { id: '3', name: 'Sports Event', description: 'Sporting competitions', icon: '🏟️' }
  ];

  const mockVenues: Venue[] = [
    { 
      id: '1', 
      name: 'Madison Square Garden', 
      address: '4 Pennsylvania Plaza',
      city: 'New York',
      country: 'USA',
      capacity: 20000,
      images: [],
      amenities: ['Parking', 'Food Court'],
      contactInfo: { phone: '+1234567890', email: 'info@msg.com' }
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(event);
    }
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !event.tags.includes(newTag.trim())) {
      setEvent({
        ...event,
        tags: [...event.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setEvent({
      ...event,
      tags: event.tags.filter((_, i) => i !== index)
    });
  };

  const addGuest = () => {
    if (newGuest.name.trim()) {
      setEvent({
        ...event,
        guests: [...event.guests, { ...newGuest, id: Date.now().toString() }]
      });
      setNewGuest({ id: '', name: '', picture: '', role: '', bio: '' });
      setShowGuestForm(false);
    }
  };

  const removeGuest = (index: number) => {
    setEvent({
      ...event,
      guests: event.guests.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Event</h2>
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
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={event.title}
                  onChange={(e) => setEvent({ ...event, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={event.description}
                  onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Describe your event..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Category *
                  </label>
                  <select
                    required
                    value={event.categoryId}
                    onChange={(e) => setEvent({ ...event, categoryId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select a category</option>
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Venue *
                  </label>
                  <select
                    required
                    value={event.venueId}
                    onChange={(e) => setEvent({ ...event, venueId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select a venue</option>
                    {mockVenues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name} - {venue.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Date and Capacity */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Schedule & Capacity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={event.startDate}
                  onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:[&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={event.endDate}
                  onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:[&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Attendees *
                </label>
                <input
                  type="number"
                  required
                  value={event.maxAttendees}
                  onChange={(e) => setEvent({ ...event, maxAttendees: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Maximum attendees"
                />
              </div>
            </div>
          </div>

          {/* Event Host */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Event Host</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Host Name *
                </label>
                <input
                  type="text"
                  required
                  value={event.host.name}
                  onChange={(e) => setEvent({
                    ...event,
                    host: { ...event.host, name: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Host name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Host Role
                </label>
                <input
                  type="text"
                  value={event.host.role}
                  onChange={(e) => setEvent({
                    ...event,
                    host: { ...event.host, role: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Event Organizer, CEO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Host Picture URL
                </label>
                <input
                  type="url"
                  value={event.host.picture}
                  onChange={(e) => setEvent({
                    ...event,
                    host: { ...event.host, picture: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="https://example.com/host-photo.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Host Bio
                </label>
                <textarea
                  value={event.host.bio}
                  onChange={(e) => setEvent({
                    ...event,
                    host: { ...event.host, bio: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Brief bio about the host..."
                />
              </div>
            </div>
          </div>

          {/* Event Guests */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Event Guests</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {event.guests.map((guest, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {guest.picture && (
                      <img
                        src={guest.picture}
                        alt={guest.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{guest.name}</p>
                      {guest.role && <p className="text-xs text-gray-600 dark:text-gray-400">{guest.role}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Trash2 className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowGuestForm(true)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-white dark:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                  Add Guest
                </button>
              </div>

              {showGuestForm && (
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Add Guest</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newGuest.name}
                      onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Guest name *"
                    />
                    <input
                      type="text"
                      value={newGuest.role}
                      onChange={(e) => setNewGuest({ ...newGuest, role: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Role/Title"
                    />
                    <input
                      type="url"
                      value={newGuest.picture}
                      onChange={(e) => setNewGuest({ ...newGuest, picture: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Photo URL"
                    />
                    <div className="flex gap-2">
                      <Button type="button" onClick={addGuest} size="sm">
                        Add
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowGuestForm(false)}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Event Images</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-gray-50 dark:bg-gray-800">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Upload event images</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click to browse or drag and drop</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tags</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tag (e.g., music, live, concert)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
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
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}