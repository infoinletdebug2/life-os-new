import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { EventTicket, TicketAdvantage, Event } from '../../types/event-ticketing';

interface CreateTicketFormProps {
  onSave?: (ticket: Omit<EventTicket, 'id'>) => void;
}

export default function CreateTicketForm({ onSave }: CreateTicketFormProps) {
  const [ticket, setTicket] = useState<Omit<EventTicket, 'id'>>({
    eventId: '',
    name: '',
    description: '',
    price: 0,
    currency: 'USD',
    quantity: 0,
    availableFrom: '',
    availableUntil: '',
    advantages: [],
    status: 'available'
  });

  const [newAdvantage, setNewAdvantage] = useState<TicketAdvantage>({
    id: '',
    title: '',
    description: ''
  });
  const [showAdvantageForm, setShowAdvantageForm] = useState(false);

  // Mock events data - in real app, this would come from API or state management
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Summer Music Festival 2024',
      description: 'A great music festival',
      categoryId: '1',
      venueId: '1',
      host: { id: '1', name: 'Festival Organizer', picture: '' },
      guests: [],
      startDate: '2024-07-15T18:00',
      endDate: '2024-07-17T23:00',
      images: [],
      status: 'published',
      tags: ['music', 'festival'],
      maxAttendees: 5000
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference',
      categoryId: '2',
      venueId: '2',
      host: { id: '2', name: 'Tech Corp', picture: '' },
      guests: [],
      startDate: '2024-08-20T09:00',
      endDate: '2024-08-20T18:00',
      images: [],
      status: 'published',
      tags: ['tech', 'conference'],
      maxAttendees: 1000
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(ticket);
  };

  const addAdvantage = () => {
    if (newAdvantage.title.trim()) {
      setTicket({
        ...ticket,
        advantages: [...ticket.advantages, { ...newAdvantage, id: Date.now().toString() }]
      });
      setNewAdvantage({ id: '', title: '', description: '' });
      setShowAdvantageForm(false);
    }
  };

  const removeAdvantage = (index: number) => {
    setTicket({
      ...ticket,
      advantages: ticket.advantages.filter((_, i) => i !== index)
    });
  };

  const selectedEvent = mockEvents.find(event => event.id === ticket.eventId);

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Event Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Select Event</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Event *
          </label>
          <select
            required
            value={ticket.eventId}
            onChange={(e) => setTicket({ ...ticket, eventId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select an event</option>
            {mockEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title} - {new Date(event.startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">{selectedEvent.title}</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">{selectedEvent.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-blue-600 dark:text-blue-300">
              <span>📅 {new Date(selectedEvent.startDate).toLocaleDateString()}</span>
              <span>👥 Max: {selectedEvent.maxAttendees} attendees</span>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Ticket Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Name *
            </label>
            <input
              type="text"
              required
              value={ticket.name}
              onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., VIP Pass, General Admission, Early Bird"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quantity Available *
            </label>
            <input
              type="number"
              required
              min="1"
              value={ticket.quantity}
              onChange={(e) => setTicket({ ...ticket, quantity: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Number of tickets available"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            required
            value={ticket.description}
            onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Describe what this ticket includes..."
          />
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={ticket.price}
              onChange={(e) => setTicket({ ...ticket, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency *
            </label>
            <select
              required
              value={ticket.currency}
              onChange={(e) => setTicket({ ...ticket, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status *
            </label>
            <select
              required
              value={ticket.status}
              onChange={(e) => setTicket({ ...ticket, status: e.target.value as 'available' | 'sold_out' | 'coming_soon' })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="available">Available</option>
              <option value="sold_out">Sold Out</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Availability Period */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Availability Period</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available From *
            </label>
            <input
              type="datetime-local"
              required
              value={ticket.availableFrom}
              onChange={(e) => setTicket({ ...ticket, availableFrom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Until *
            </label>
            <input
              type="datetime-local"
              required
              value={ticket.availableUntil}
              onChange={(e) => setTicket({ ...ticket, availableUntil: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>

      {/* Ticket Advantages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Ticket Advantages</h3>
          <button
            type="button"
            onClick={() => setShowAdvantageForm(!showAdvantageForm)}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Add Advantage
          </button>
        </div>

        {showAdvantageForm && (
          <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newAdvantage.title}
                  onChange={(e) => setNewAdvantage({ ...newAdvantage, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="e.g., VIP Lounge Access, Free Drinks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newAdvantage.description}
                  onChange={(e) => setNewAdvantage({ ...newAdvantage, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Describe this advantage..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addAdvantage}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdvantageForm(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {ticket.advantages.map((advantage, index) => (
            <div key={advantage.id} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{advantage.title}</h4>
                {advantage.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{advantage.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeAdvantage(index)}
                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Ticket
        </Button>
      </div>
    </form>
  );
}