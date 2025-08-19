import { useState } from 'react';
import { Calendar, MapPin, Tag, Ticket } from 'lucide-react';
import CreateEvent from '../components/event-ticketing/CreateEvent';
import CreateVenue from '../components/event-ticketing/CreateVenue';
import CreateEventCategory from '../components/event-ticketing/CreateEventCategory';
import CreateEventTicket from '../components/event-ticketing/CreateEventTicket';
import EventsList from '../components/event-ticketing/EventsList';
import VenuesList from '../components/event-ticketing/VenuesList';
import CategoriesList from '../components/event-ticketing/CategoriesList';
import TicketsList from '../components/event-ticketing/TicketsList';

type ModalType = 'event' | 'venue' | 'category' | 'ticket' | null;
type TabType = 'events' | 'venues' | 'categories' | 'tickets';

export default function EventTicketing() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeTab, setActiveTab] = useState<TabType>('events');

  const options = [
    {
      id: 'event',
      title: 'Create Event',
      description: 'Set up a new event with hosts, guests, and all details',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'venue',
      title: 'Create Venue',
      description: 'Add a new venue with location, capacity, and amenities',
      icon: MapPin,
      color: 'green'
    },
    {
      id: 'category',
      title: 'Create Event Category',
      description: 'Define new event categories for better organization',
      icon: Tag,
      color: 'purple'
    },
    {
      id: 'ticket',
      title: 'Create Event Ticket',
      description: 'Design tickets with different advantages and pricing',
      icon: Ticket,
      color: 'orange'
    }
  ];

  const renderModal = () => {
    switch (activeModal) {
      case 'event':
        return <CreateEvent onClose={() => setActiveModal(null)} />;
      case 'venue':
        return <CreateVenue onClose={() => setActiveModal(null)} />;
      case 'category':
        return <CreateEventCategory onClose={() => setActiveModal(null)} />;
      case 'ticket':
        return <CreateEventTicket onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-300 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40',
      green: 'border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/40',
      purple: 'border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40',
      orange: 'border-orange-300 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/40'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Event Ticketing Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your events, venues, categories, and tickets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className={`p-6 cursor-pointer transition-all duration-200 border-2 rounded-xl shadow ${getColorClasses(option.color)} bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-xl`}
              onClick={() => setActiveModal(option.id as ModalType)}
            >
              <div className="text-center">
                <div className="mb-4">
                  <Icon className={`w-12 h-12 mx-auto ${getIconColorClasses(option.color)}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {renderModal()}

      {/* Tabbed Lists Section */}
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('venues')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'venues'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Venues
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'categories'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Categories
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tickets'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                Tickets
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'events' && <EventsList />}
          {activeTab === 'venues' && <VenuesList />}
          {activeTab === 'categories' && <CategoriesList />}
          {activeTab === 'tickets' && <TicketsList />}
        </div>
      </div>
    </div>
  );
}