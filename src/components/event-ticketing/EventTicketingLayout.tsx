import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Tag, Ticket } from 'lucide-react';

interface EventTicketingLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    name: 'Events',
    href: '/travel/event-ticketing/events',
    icon: Calendar,
  },
  {
    name: 'Venues',
    href: '/travel/event-ticketing/venues',
    icon: MapPin,
  },
  {
    name: 'Event Categories',
    href: '/travel/event-ticketing/categories',
    icon: Tag,
  },
  {
    name: 'Event Tickets',
    href: '/travel/event-ticketing/tickets',
    icon: Ticket,
  },
];

export default function EventTicketingLayout({ children }: EventTicketingLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Event Ticketing
          </h1>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-r-2 border-orange-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}