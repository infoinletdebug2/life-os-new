import { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import type { Event, EventCategory, Venue, Person } from '../../types/event-ticketing';

interface CreateEventFormProps {
  onSave?: (event: Omit<Event, 'id'>) => void;
}

export default function CreateEventForm({ onSave }: CreateEventFormProps) {
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

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(event);
  };

  const addGuest = () => {
    const newGuest: Person = {
      id: Date.now().toString(),
      name: '',
      picture: '',
      role: '',
      bio: ''
    };
    setEvent({ ...event, guests: [...event.guests, newGuest] });
  };

  const removeGuest = (index: number) => {
    const updatedGuests = event.guests.filter((_, i) => i !== index);
    setEvent({ ...event, guests: updatedGuests });
  };

  const updateGuest = (index: number, updatedGuest: Person) => {
    const updatedGuests = [...event.guests];
    updatedGuests[index] = updatedGuest;
    setEvent({ ...event, guests: updatedGuests });
  };

  const addTag = () => {
    if (tagInput.trim() && !event.tags.includes(tagInput.trim())) {
      setEvent({ ...event, tags: [...event.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEvent({ ...event, tags: event.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
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
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Describe your event"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              required
              value={event.categoryId}
              onChange={(e) => setEvent({ ...event, categoryId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select a category</option>
              <option value="1">Music & Concerts</option>
              <option value="2">Sports & Recreation</option>
              <option value="3">Arts & Culture</option>
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
              <option value="1">Madison Square Garden</option>
              <option value="2">Central Park</option>
              <option value="3">Brooklyn Bridge</option>
            </select>
          </div>
        </div>
      </div>

      {/* Host Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Host Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Host Name *
            </label>
            <input
              type="text"
              required
              value={event.host.name}
              onChange={(e) => setEvent({ ...event, host: { ...event.host, name: e.target.value } })}
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
              onChange={(e) => setEvent({ ...event, host: { ...event.host, role: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Event Organizer"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Host Bio
            </label>
            <textarea
              value={event.host.bio}
              onChange={(e) => setEvent({ ...event, host: { ...event.host, bio: e.target.value } })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Brief bio about the host"
            />
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
              min="1"
              value={event.maxAttendees}
              onChange={(e) => setEvent({ ...event, maxAttendees: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Maximum number of attendees"
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Special Guests</h3>
          <button
            type="button"
            onClick={addGuest}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Add Guest
          </button>
        </div>
        
        {event.guests.map((guest, index) => (
          <div key={guest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Guest {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
              >
                <Trash2 className="w-3 h-3 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={guest.name}
                onChange={(e) => updateGuest(index, { ...guest, name: e.target.value })}
                placeholder="Guest name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                value={guest.role || ''}
                onChange={(e) => updateGuest(index, { ...guest, role: e.target.value })}
                placeholder="Role/Title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tags</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Status</h3>
        <select
          value={event.status}
          onChange={(e) => setEvent({ ...event, status: e.target.value as 'draft' | 'published' | 'cancelled' })}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Event
        </Button>
      </div>
    </form>
  );
}