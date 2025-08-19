import { 
  CheckCircle,
  UserCheck,
  Sparkles,
  Wrench,
  Ban,
  AlertCircle,
  Wifi,
  Mountain,
  Bath,
  Coffee,
  Wind,
  Tv,
  Users,
  Home
} from 'lucide-react';
import { createElement } from 'react';
import type { RoomStatus } from '@/types/hotel/room/room';

export const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case 'available':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'occupied':
      return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
    case 'housekeeping':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    case 'maintenance':
      return 'text-orange-600 dark:text-orange-400 bg-orange-500/10';
    case 'out-of-order':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const getStatusIcon = (status: RoomStatus) => {
  const iconProps = { className: "w-4 h-4" };
  
  switch (status) {
    case 'available':
      return createElement(CheckCircle, iconProps);
    case 'occupied':
      return createElement(UserCheck, iconProps);
    case 'housekeeping':
      return createElement(Sparkles, iconProps);
    case 'maintenance':
      return createElement(Wrench, iconProps);
    case 'out-of-order':
      return createElement(Ban, iconProps);
    default:
      return createElement(AlertCircle, iconProps);
  }
};

export const getAmenityIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    wifi: Wifi,
    view: Mountain,
    bath: Bath,
    bar: Coffee,
    ac: Wind,
    coffee: Coffee,
    tv: Tv,
    accessible: Users
  };
  return icons[iconName] || Home;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};