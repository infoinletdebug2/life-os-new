import { createElement } from 'react';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  Wifi,
  Waves,
  Building2,
  Users,
  MapPin,
  Coffee,
  Utensils,
  Car,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'inactive':
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
    case 'maintenance':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    case 'closed':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const getStatusIcon = (status: string) => {
  const iconProps = { className: "w-3 h-3" };
  
  switch (status) {
    case 'active':
      return createElement(CheckCircle, iconProps);
    case 'inactive':
      return createElement(Clock, iconProps);
    case 'maintenance':
      return createElement(AlertCircle, iconProps);
    case 'closed':
      return createElement(AlertCircle, iconProps);
    default:
      return createElement(Clock, iconProps);
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getAmenityIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    wifi: Wifi,
    spa: Waves,
    business: Building2,
    fitness: Users,
    garden: MapPin,
    coffee: Coffee,
    restaurant: Utensils,
    parking: Car
  };
  return icons[iconName] || Building2;
};

export const renderStarRating = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      createElement(Star, {
        key: i,
        className: cn(
          "w-3 h-3",
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        )
      })
    );
  }
  
  return createElement('div', { className: 'flex items-center gap-0.5' }, ...stars);
};