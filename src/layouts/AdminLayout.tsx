import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  Calendar, 
  BedDouble, 
  Users, 
  DollarSign, 
  UserCheck, 
  FileText, 
  Settings, 
  Menu, 
  Bell, 
  Search,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Globe,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: number;
  subItems?: MenuItem[];
}

const navigationItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    path: '/hotel/dashboard',
  },
  {
    id: 'properties',
    label: 'Properties',
    icon: Building2,
    path: '/hotel/properties',
    subItems: [
      { id: 'property-list', label: 'All Properties', icon: Building2, path: '/hotel/properties' },
      { id: 'property-add', label: 'Add Property', icon: Building2, path: '/hotel/properties/add' },
    ]
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    path: '/hotel/bookings',
    badge: 12,
    subItems: [
      { id: 'all-bookings', label: 'All Bookings', icon: Calendar, path: '/hotel/bookings' },
      { id: 'arrivals', label: 'Arrivals', icon: Calendar, path: '/hotel/bookings/arrivals' },
      { id: 'departures', label: 'Departures', icon: Calendar, path: '/hotel/bookings/departures' },
      { id: 'calendar', label: 'Calendar View', icon: Calendar, path: '/hotel/bookings/calendar' },
    ]
  },
  {
    id: 'rooms',
    label: 'Rooms & Inventory',
    icon: BedDouble,
    path: '/hotel/rooms',
    subItems: [
      { id: 'room-list', label: 'Room Management', icon: BedDouble, path: '/hotel/rooms' },
      { id: 'housekeeping', label: 'Housekeeping', icon: BedDouble, path: '/hotel/rooms/housekeeping' },
      { id: 'maintenance', label: 'Maintenance', icon: BedDouble, path: '/hotel/rooms/maintenance' },
    ]
  },
  {
    id: 'guests',
    label: 'Guests',
    icon: Users,
    path: '/hotel/guests',
  },
  {
    id: 'revenue',
    label: 'Revenue Management',
    icon: DollarSign,
    path: '/hotel/revenue',
    subItems: [
      { id: 'pricing', label: 'Rate Management', icon: DollarSign, path: '/hotel/revenue/pricing' },
      { id: 'analytics', label: 'Revenue Analytics', icon: DollarSign, path: '/hotel/revenue/analytics' },
      { id: 'forecasting', label: 'Forecasting', icon: DollarSign, path: '/hotel/revenue/forecasting' },
    ]
  },
  {
    id: 'staff',
    label: 'Staff Management',
    icon: UserCheck,
    path: '/hotel/staff',
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: FileText,
    path: '/hotel/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/hotel/settings',
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking received', time: '2m ago', unread: true },
    { id: 2, message: 'Room 301 maintenance completed', time: '15m ago', unread: false },
    { id: 3, message: 'Guest checkout - Room 205', time: '1h ago', unread: false },
  ]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const getCurrentMenuItem = (path: string): MenuItem | null => {
    for (const item of navigationItems) {
      if (item.path === path) return item;
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === path) return item;
        }
      }
    }
    return null;
  };

  const currentMenuItem = getCurrentMenuItem(location.pathname);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const unreadNotifications = notifications.filter(n => n.unread).length;

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-cyan-500/5 dark:to-cyan-500/10 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="glass backdrop-blur-xl flex flex-col border-r border-white/10"
      >
        {/* Logo & Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-cyan rounded-lg blur-md opacity-70" />
              <div className="relative w-10 h-10 rounded-lg bg-gradient-cyan flex items-center justify-center text-white font-bold shadow-lg">
                H
              </div>
            </div>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Hotel Admin
                </h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentMenuItem?.id === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isDropdownOpen = activeDropdown === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (hasSubItems && !sidebarCollapsed) {
                        setActiveDropdown(isDropdownOpen ? null : item.id);
                      } else {
                        navigate(item.path);
                        setActiveDropdown(null);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-primary shadow-lg"
                        : "hover:bg-white/10 dark:hover:bg-white/5"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.label}
                        </span>
                        
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        
                        {hasSubItems && (
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform",
                            isDropdownOpen && "rotate-180"
                          )} />
                        )}
                      </>
                    )}
                  </button>

                  {/* Sub Items */}
                  <AnimatePresence>
                    {hasSubItems && !sidebarCollapsed && isDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 mt-2 space-y-1 overflow-hidden"
                      >
                        {item.subItems?.map((subItem) => {
                          const SubIconComponent = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          
                          return (
                            <li key={subItem.id}>
                              <button
                                onClick={() => navigate(subItem.path)}
                                className={cn(
                                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                  isSubActive
                                    ? "bg-primary/20 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5"
                                )}
                              >
                                <SubIconComponent className="w-4 h-4" />
                                {subItem.label}
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 glass backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-10 h-10"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold">
                {currentMenuItem?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 w-64 bg-white/10 dark:bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              <AnimatePresence>
                {activeDropdown === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-80 z-50"
                  >
                    <GlassCard className="p-4">
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "p-2 rounded-lg text-sm",
                              notification.unread ? "bg-primary/10" : "bg-white/5"
                            )}
                          >
                            <p className={cn(
                              notification.unread ? "font-medium" : "text-muted-foreground"
                            )}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                className="flex items-center gap-2 px-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <span className="hidden md:block text-sm font-medium">Admin</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {activeDropdown === 'user' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 z-50"
                  >
                    <GlassCard className="p-2">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/10 dark:hover:bg-white/5">
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/10 dark:hover:bg-white/5">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-white/10 dark:hover:bg-white/5">
                        <Globe className="w-4 h-4" />
                        Language
                      </button>
                      <hr className="my-2 border-white/10" />
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/20 text-red-500">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}