import { useState } from 'react';
import { X, Ticket, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { EventTicket, TicketAdvantage, Event } from '../../types/event-ticketing';

interface CreateEventTicketProps {
  onClose: () => void;
  onSave?: (ticket: Omit<EventTicket, 'id'>) => void;
}

export default function CreateEventTicket({ onClose, onSave }: CreateEventTicketProps) {
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
      description: 'Latest in technology',
      categoryId: '2',
      venueId: '1',
      host: { id: '2', name: 'Tech Corp', picture: '' },
      guests: [],
      startDate: '2024-08-20T09:00',
      endDate: '2024-08-21T17:00',
      images: [],
      status: 'published',
      tags: ['tech', 'conference'],
      maxAttendees: 1000
    }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(ticket);
    }
    onClose();
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
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Ticket className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Event Ticket</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                  value={ticket.quantity}
                  onChange={(e) => setTicket({ ...ticket, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Number of tickets"
                />
              </div>
              <div className="md:col-span-2">
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
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  required
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
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Availability</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Ticket Advantages</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                {ticket.advantages.map((advantage, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{advantage.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{advantage.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAdvantage(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowAdvantageForm(true)}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors w-full justify-center bg-white dark:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                  Add Advantage
                </button>
              </div>

              {showAdvantageForm && (
                <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Add Ticket Advantage</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newAdvantage.title}
                      onChange={(e) => setNewAdvantage({ ...newAdvantage, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Advantage title (e.g., Front Row Seating, Meet & Greet)"
                    />
                    <textarea
                      value={newAdvantage.description}
                      onChange={(e) => setNewAdvantage({ ...newAdvantage, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe this advantage in detail..."
                    />
                    <div className="flex gap-2">
                      <Button type="button" onClick={addAdvantage} size="sm">
                        Add Advantage
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAdvantageForm(false)}
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

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Status</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ticket Status *
              </label>
              <select
                required
                value={ticket.status}
                onChange={(e) => setTicket({ ...ticket, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="available">Available</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="sold_out">Sold Out</option>
              </select>
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
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}