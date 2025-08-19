import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Shield, User, Hotel, BarChart3, Bed, Calendar, Users, Settings, Star, CreditCard, MapPin, Tag, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const adminMenuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Users Management' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'settings', label: 'System Settings' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
];

const userMenuItems: MenuItem[] = [
  { id: 'profile', label: 'My Profile' },
  { id: 'bookings', label: 'My Bookings' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'history', label: 'Booking History' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'notifications', label: 'Notifications' },
];

interface LeftSidebarProps {
  isCollapsed: boolean;
  currentView?: string;
}

export function LeftSidebar({ isCollapsed }: LeftSidebarProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['admin', 'user']);
  const [selectedItem, setSelectedItem] = useState<string>('');

  // Hotel management menu items
  const hotelMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/hotel/dashboard' },
    { id: 'properties', label: 'Properties', icon: Hotel, path: '/hotel/properties' },
    { id: 'rooms', label: 'Room Management', icon: Bed, path: '/hotel/rooms' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/hotel/bookings' },
    { id: 'guests', label: 'Guest Management', icon: Users, path: '/hotel/guests' },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star, path: '/hotel/reviews' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/hotel/payments' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/hotel/settings' },
  ];

  // Event ticketing menu items
  const eventTicketingMenuItems = [
    { id: 'events', label: 'Events', icon: Calendar, path: '/travel/event-ticketing/events' },
    { id: 'venues', label: 'Venues', icon: MapPin, path: '/travel/event-ticketing/venues' },
    { id: 'categories', label: 'Event Categories', icon: Tag, path: '/travel/event-ticketing/categories' },
    { id: 'tickets', label: 'Event Tickets', icon: Ticket, path: '/travel/event-ticketing/tickets' },
  ];

  const isHotelRoute = location.pathname.startsWith('/hotel');
  const isEventTicketingRoute = location.pathname.startsWith('/travel/event-ticketing');

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderMenuItem = (item: MenuItem, isNested = false) => (
    <li key={item.id}>
      <button
        onClick={() => setSelectedItem(item.id)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200",
          isNested && "ml-4",
          selectedItem === item.id
            ? "bg-primary text-primary-foreground shadow-md"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
      {item.children && (
        <ul className="mt-1 space-y-1">
          {item.children.map(child => renderMenuItem(child, true))}
        </ul>
      )}
    </li>
  );

  const renderHotelMenuItem = (item: any) => {
    const IconComponent = item.icon;
    const isSelected = location.pathname === item.path || 
                     (item.path === '/hotel/dashboard' && location.pathname === '/hotel');
    
    return (
      <li key={item.id}>
        <button
          onClick={() => navigate(item.path)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
            isSelected
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <IconComponent className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      </li>
    );
  };

  const renderEventTicketingMenuItem = (item: any) => {
    const IconComponent = item.icon;
    const isSelected = location.pathname === item.path;
    
    return (
      <li key={item.id}>
        <button
          onClick={() => navigate(item.path)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
            isSelected
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <IconComponent className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      </li>
    );
  };

  if (isCollapsed) return null;

  return (
    <div className="w-64 glass backdrop-blur-xl flex flex-col animate-fadeInLeft">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {isHotelRoute ? 'Hotel Management' : isEventTicketingRoute ? 'Event Ticketing' : 'System Controls'}
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {isHotelRoute ? (
          /* Hotel Management Navigation */
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Hotel Operations
            </h4>
            <ul className="space-y-1">
              {hotelMenuItems.map(item => renderHotelMenuItem(item))}
            </ul>
          </div>
        ) : isEventTicketingRoute ? (
          /* Event Ticketing Navigation */
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Event Management
            </h4>
            <ul className="space-y-1">
              {eventTicketingMenuItems.map(item => renderEventTicketingMenuItem(item))}
            </ul>
          </div>
        ) : (
          /* Default Admin/User Panels */
          <>
            {/* Admin Panel */}
            <div>
              <Button
                variant="ghost"
                onClick={() => toggleSection('admin')}
                className="w-full justify-between p-2 h-auto hover:bg-accent/50"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm font-medium">
                    {intl.formatMessage({ id: 'admin.panel' })}
                  </span>
                </div>
                {expandedSections.includes('admin') ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
              {expandedSections.includes('admin') && (
                <ul className="mt-2 space-y-1 animate-accordion-down">
                  {adminMenuItems.map(item => renderMenuItem(item))}
                </ul>
              )}
            </div>

            {/* User Panel */}
            <div>
              <Button
                variant="ghost"
                onClick={() => toggleSection('user')}
                className="w-full justify-between p-2 h-auto hover:bg-accent/50"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium">
                    {intl.formatMessage({ id: 'user.panel' })}
                  </span>
                </div>
                {expandedSections.includes('user') ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
              {expandedSections.includes('user') && (
                <ul className="mt-2 space-y-1 animate-accordion-down">
                  {userMenuItems.map(item => renderMenuItem(item))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}