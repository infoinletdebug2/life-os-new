import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bed,
  Plus,
  Settings,
  Tag,
  Grid3X3,
  Eye,
  BarChart3,
  Wrench,
  CheckCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoomManagementLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const roomSubMenus = [
  {
    id: 'overview',
    label: 'Room Overview',
    icon: Bed,
    path: '/hotel/rooms',
    description: 'Manage all rooms and availability'
  },
  {
    id: 'add',
    label: 'Add Room',
    icon: Plus,
    path: '/hotel/rooms/add',
    description: 'Create new room'
  },
  {
    id: 'types',
    label: 'Room Types',
    icon: Tag,
    path: '/hotel/rooms/types',
    description: 'Manage room type categories'
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: Grid3X3,
    path: '/hotel/rooms/categories',
    description: 'Configure room categories'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/hotel/rooms/analytics',
    description: 'Room performance and insights'
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    icon: Wrench,
    path: '/hotel/rooms/maintenance',
    description: 'Track room maintenance'
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    icon: CheckCircle,
    path: '/hotel/rooms/housekeeping',
    description: 'Manage cleaning schedules'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/hotel/rooms/settings',
    description: 'Room management configuration'
  }
];

export function RoomManagementLayout({ children, title, description }: RoomManagementLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DashboardLayout currentView="rooms" selectedCategory="travel">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Room Management
              </h1>
              <p className="text-gray-400 mt-1">
                Comprehensive room management system for your hotel
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/hotel/rooms/add')}
                className="gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                Quick Add Room
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}