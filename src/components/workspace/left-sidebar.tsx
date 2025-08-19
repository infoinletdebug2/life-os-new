import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Shield, User, BarChart3, Bed, Calendar, Users, Settings, Star, CreditCard, Plus, Tag, Grid3X3, Eye, CheckCircle, Clock, FileText, DollarSign } from 'lucide-react';
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
  const [expandedHotelSections, setExpandedHotelSections] = useState<string[]>(['rooms', 'bookings']);
  const [selectedItem, setSelectedItem] = useState<string>('');

  // Room management sub-menu items
  const roomSubMenuItems = [
    { id: 'room-overview', label: 'Room Overview', icon: Bed, path: '/hotel/rooms' },
    { id: 'add-room', label: 'Add Room', icon: Plus, path: '/hotel/rooms/add' },
    { id: 'room-types', label: 'Room Types', icon: Tag, path: '/hotel/rooms/types' },
    { id: 'room-categories', label: 'Categories', icon: Grid3X3, path: '/hotel/rooms/categories' },
  ];

  // Booking management sub-menu items
  const bookingSubMenuItems = [
    { id: 'booking-overview', label: 'All Bookings', icon: Calendar, path: '/hotel/bookings' },
    { id: 'new-booking', label: 'New Booking', icon: Plus, path: '/hotel/bookings/new' },
    { id: 'reservations', label: 'Reservations', icon: Clock, path: '/hotel/bookings/reservations' },
    { id: 'check-ins', label: 'Check-ins', icon: CheckCircle, path: '/hotel/bookings/check-ins' },
    { id: 'check-outs', label: 'Check-outs', icon: CheckCircle, path: '/hotel/bookings/check-outs' },
    { id: 'agreements', label: 'Agreements', icon: FileText, path: '/hotel/bookings/agreements' },
    { id: 'payments', label: 'Payments', icon: DollarSign, path: '/hotel/bookings/payments' },
  ];

  // Hotel management menu items
  const hotelMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/hotel/dashboard' },
    { 
      id: 'rooms', 
      label: 'Room Management', 
      icon: Bed, 
      path: '/hotel/rooms',
      hasSubMenu: true,
      subMenu: roomSubMenuItems
    },
    { 
      id: 'bookings', 
      label: 'Booking Management', 
      icon: Calendar, 
      path: '/hotel/bookings',
      hasSubMenu: true,
      subMenu: bookingSubMenuItems
    },
    { id: 'guests', label: 'Customer Management', icon: Users, path: '/hotel/guests' },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star, path: '/hotel/reviews' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/hotel/payments' },
    { id: 'settings', label: 'Hotel Settings', icon: Settings, path: '/hotel/settings' },
  ];

  const isHotelRoute = location.pathname.startsWith('/hotel');

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleHotelSection = (section: string) => {
    setExpandedHotelSections(prev =>
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
    const isRoomRoute = location.pathname.startsWith('/hotel/rooms');
    const isBookingRoute = location.pathname.startsWith('/hotel/bookings');
    const isExpanded = expandedHotelSections.includes(item.id);
    
    return (
      <li key={item.id}>
        <div className="flex items-center">
          <button
            onClick={() => item.hasSubMenu ? toggleHotelSection(item.id) : navigate(item.path)}
            className={cn(
              "flex-1 flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
              (isSelected || (item.id === 'rooms' && isRoomRoute) || (item.id === 'bookings' && isBookingRoute))
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {/* new */}
            <IconComponent className="w-4 h-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.hasSubMenu && (
              <div className="ml-auto">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            )}
          </button>
          {!item.hasSubMenu && (
            <button
              onClick={() => navigate(item.path)}
              className="p-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Eye className="w-3 h-3" />
            </button>
          )}
        </div>
        
        {/* Sub-menu items */}
        {item.hasSubMenu && isExpanded && item.subMenu && (
          <ul className="mt-2 ml-4 space-y-1 border-l border-border/30 pl-3">
            {item.subMenu.map((subItem: any) => {
              const SubIconComponent = subItem.icon;
              const isSubSelected = location.pathname === subItem.path;
              
              return (
                <li key={subItem.id}>
                  <button
                    onClick={() => navigate(subItem.path)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-all duration-200",
                      isSubSelected
                        ? "bg-primary/20 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <SubIconComponent className="w-3 h-3" />
                    <span>{subItem.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  if (isCollapsed) return null;

  return (
    <div className="w-64 glass backdrop-blur-xl flex flex-col animate-fadeInLeft">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {isHotelRoute ? 'Hotel Management' : 'System Controls'}
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